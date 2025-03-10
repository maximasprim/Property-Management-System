import db from "../Drizzle/db";
import { eq } from "drizzle-orm";
import stripe from "../stripe";
import { TIPayments,TSPayments,paymentsTable,bookingsTable } from "../Drizzle/schema";



export const paymentsService = async ():Promise<TSPayments[] | null> =>{
    return await db.query.paymentsTable.findMany();

}

export const getPaymentsService = async (id: number): Promise<TSPayments | undefined> => {
    return await db.query.paymentsTable.findFirst({
        where: eq(paymentsTable.payment_id, id)
    })
}

export const createPaymentsService = async (payment: TIPayments): Promise<TIPayments> => {
    await db.insert(paymentsTable).values(payment)
    return payment;
}

export const updatePaymentsService = async (id: number, payment: TIPayments) => {
    await db.update(paymentsTable).set(payment).where(eq(paymentsTable.payment_id, id))
    return payment;
}

export const deletePaymentsService = async (id: number) => {
    await db.delete(paymentsTable).where(eq(paymentsTable.payment_id, id))
    return "Payment deleted successfully";
}

//payments with stripe
// export const createPaymentIntent = async (amount: number, currency: string = 'usd') => {
//     try {
//       const paymentIntent = await stripe.paymentIntents.create({
//         amount,
//         currency:'usd',
//         payment_method_types: ['card'],
//       });
//       console.log(paymentIntent)
//       return paymentIntent;
//     } catch (error) {
//       console.error('Error creating payment intent:', error);
//       throw new Error('Unable to create payment intent');
//     }
//   };

  //

  export const createPaymentService = () => {
    return {
      async createCheckoutSession(booking_id: number, amount: number, buyer_id: number) {
        if (!buyer_id || isNaN(buyer_id)) {
            throw new Error("Valid Buyer ID is required.");
        }
    
        console.log("Received Buyer ID:", buyer_id); // Debugging step
    
        const formattedAmount = Math.round(Number(amount) * 100);
        if (isNaN(formattedAmount)) {
            throw new Error("Invalid amount provided");
        }
    
        try {
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                line_items: [
                    {
                        price_data: {
                            currency: "usd",
                            product_data: { name: "Property Booking" },
                            unit_amount: formattedAmount,
                        },
                        quantity: 1,
                    },
                ],
                mode: "payment",
                success_url: `${process.env.FRONTEND_URL}/paymentsuccess`,
                cancel_url: `${process.env.FRONTEND_URL}/paymentcancel`,
                metadata: { booking_id: booking_id.toString(), buyer_id: buyer_id.toString() },
            });
    
            console.log("Stripe session created:", session);
    
            // Fetch booking details
            const booking = await db.query.bookingsTable.findFirst({
                where: eq(bookingsTable.booking_id, booking_id),
            });
    
            if (!booking) {
                throw new Error("Booking not found");
            }
    
            await db.update(bookingsTable)
                .set({ status: "confirmed" })
                .where(eq(bookingsTable.booking_id, booking_id));
    
            // Insert payment record with correct buyer_id
            await db.insert(paymentsTable).values({
                property_type: booking.property_type,
                property_name: booking.property_name,
                amount: amount,
                booking_id: booking_id,
                buyer_id: buyer_id,  // ✅ Store correct buyer_id
                status: "paid",
                payment_method: "credit card",
                transaction_id: session.id,
            }).execute();
    
            return session;
        } catch (error) {
            console.error("Error creating Stripe session:", error);
            throw new Error("Failed to create checkout session.");
        }
    }
    
,
  
      async handleSuccessfulPayment(session_id: string) {
        const session = await stripe.checkout.sessions.retrieve(session_id);
        const booking_id = parseInt(session.metadata!.booking_id);
        const amount_total = session.amount_total;
        if (amount_total === null) {
          throw new Error("session.amount_total is null");
        }
      },
    };
  };
