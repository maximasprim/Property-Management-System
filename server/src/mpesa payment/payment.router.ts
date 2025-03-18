import { Hono } from "hono";
import { PaymentController } from "./payment.controller";

const paymentRouter = new Hono();

paymentRouter.post("/initiate", PaymentController.initiatePayment);
paymentRouter.post("/callback", PaymentController.handleMpesaCallback);

export default paymentRouter;
