import axios from "axios";
import { db } from "../Drizzle/db";
import { paymentsTable, bookingsTable } from "../Drizzle/schema"; // Ensure bookingsTable is imported
import { eq } from "drizzle-orm";

export class PaymentService {
  async initiatePayment(paymentData: any) {
    const { amount, phoneNumber, propertyType, propertyName, bookingId, buyerId, paymentMethod } = paymentData;

    try {
      const timestamp = this.generateTimestamp();
      if (!process.env.MPESA_SHORTCODE || !process.env.MPESA_PASSKEY) {
        throw new Error("MPESA_SHORTCODE or MPESA_PASSKEY is not defined");
      }
      const password = this.generatePassword(process.env.MPESA_SHORTCODE, process.env.MPESA_PASSKEY, timestamp);
      const accessToken = await this.getMpesaToken();

      const response = await axios.post(
        "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
        {
          BusinessShortCode: process.env.MPESA_SHORTCODE,
          Password: password,
          Timestamp: timestamp,
          TransactionType: "CustomerPayBillOnline",
          Amount: amount,
          PartyA: phoneNumber,
          PartyB: process.env.MPESA_SHORTCODE,
          PhoneNumber: phoneNumber,
          CallBackURL: process.env.MPESA_CALLBACK_URL,
          AccountReference: propertyName,
          TransactionDesc: `Payment for ${propertyType}`,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      const transactionId = response.data.CheckoutRequestID;

      await db.insert(paymentsTable).values({
        property_type: propertyType,
        property_name: propertyName,
        amount,
        booking_id: bookingId,
        buyer_id: buyerId,
        transaction_id: transactionId,
        status: "Pending",
        payment_method: paymentMethod,
      });

      return { message: "Payment initiated successfully", transactionId };
    } catch (error) {
      console.error("Mpesa Payment Error:", error);
      throw new Error("Failed to initiate payment");
    }
  }

  async handleMpesaCallback(callbackData: any) {
    try {
      const { Body } = callbackData;
      const checkoutRequestID = Body?.stkCallback?.CheckoutRequestID;
      const resultCode = Body?.stkCallback?.ResultCode;
      const callbackItems = Body?.stkCallback?.CallbackMetadata?.Item || [];

      if (!checkoutRequestID) {
        throw new Error("Invalid callback data");
      }

      // Extract MpesaReceiptNumber
      const mpesaReceiptNumber = callbackItems.find((item: any) => item.Name === "MpesaReceiptNumber")?.Value;

      // Determine payment status
      const status = resultCode === 0 ? "Completed" : "Failed";

      // Check if the transaction exists in the database
      const existingPayment = await db
        .select()
        .from(paymentsTable)
        .where(eq(paymentsTable.transaction_id, checkoutRequestID))
        .execute();

      if (!existingPayment.length) {
        throw new Error("Payment record not found for this transaction");
      }

      const payment = existingPayment[0];

      // Update the paymentsTable with the correct status
      await db
        .update(paymentsTable)
        .set({ 
          status, 
          transaction_id: mpesaReceiptNumber || checkoutRequestID 
        })
        .where(eq(paymentsTable.transaction_id, checkoutRequestID))
        .execute();

      // If payment is successful, update the booking status to "Confirmed"
      if (status === "Completed") {
        await db
          .update(bookingsTable)
          .set({ status: "Confirmed" })
          .where(eq(bookingsTable.booking_id, payment.booking_id!))
          .execute();
      }

      return { message: "Payment status updated", status };
    } catch (error) {
      console.error("Mpesa Callback Error:", error);
      throw new Error("Failed to process callback");
    }
  }

  private async getMpesaToken() {
    try {
      const credentials = Buffer.from(`${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`).toString("base64");
      const response = await axios.get("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials", {
        headers: {
          Authorization: `Basic ${credentials}`,
        },
      });
      return response.data.access_token;
    } catch (error) {
      console.error("Mpesa Token Error:", error);
      throw new Error("Failed to fetch Mpesa token");
    }
  }

  private generateTimestamp(): string {
    return new Date().toISOString().replace(/[-:TZ]/g, "").slice(0, 14);
  }

  private generatePassword(shortcode: string, passkey: string, timestamp: string): string {
    return Buffer.from(`${shortcode}${passkey}${timestamp}`).toString("base64");
  }
}
