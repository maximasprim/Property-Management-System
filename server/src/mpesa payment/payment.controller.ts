import { PaymentService } from "./payment.service";
import { Context } from "hono";

const paymentService = new PaymentService();

export class PaymentController {
  static async initiatePayment(c: Context) {
    try {
      const paymentData = await c.req.json();
      const response = await paymentService.initiatePayment(paymentData);
      return c.json(response, 200);
    } catch (error) {
      return c.json({ error: (error as Error).message }, 500);
    }
  }

  static async handleMpesaCallback(c: Context) {
    try {
      const callbackData = await c.req.json();
      const response = await paymentService.handleMpesaCallback(callbackData);
      return c.json(response, 200);
    } catch (error) {
      return c.json({ error:(error as Error ).message }, 500);
    }
  }
}
