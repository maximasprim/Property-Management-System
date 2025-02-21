"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPayment = exports.deletePayment = exports.updatePayment = exports.getSinglePayment = exports.listPayments = void 0;
const payments_service_1 = require("./payments.service");
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_API_KEY, {
    apiVersion: '2024-06-20',
});
const listPayments = async (c) => {
    const data = await (0, payments_service_1.paymentsService)();
    if (data == null) {
        return c.text("Payment not Found", 404);
    }
    return c.json(data, 200);
};
exports.listPayments = listPayments;
const getSinglePayment = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("invalid ID!", 400);
    const payment = await (0, payments_service_1.getPaymentsService)(id);
    if (payment == undefined) {
        return c.text(" not found!", 404);
    }
    return c.json(payment, 200);
};
exports.getSinglePayment = getSinglePayment;
// export const createPayment = async (c: Context) => {
//   try{
//     const payment = await c.req.json();
//     const createdPayment = await createPaymentsService(payment);
//    if (!createdPayment){
//     return c.text("Payment not created!", 404)
//    }
//     return c.json(createdPayment, 201);
// } catch (error: any){
//     return c.json({error: error?.message}, 400)
// }
// }
const updatePayment = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("invalid ID!", 400);
    const payment = await c.req.json();
    try {
        //search for user
        const foundPayment = await (0, payments_service_1.getPaymentsService)(id);
        if (foundPayment == undefined)
            return c.text("Payment not found!", 404);
        //get the data and update
        const res = await (0, payments_service_1.updatePaymentsService)(id, payment);
        //return the updated user
        if (!res)
            return c.text("payment not updated!", 404);
        return c.json(res, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updatePayment = updatePayment;
//delete city
const deletePayment = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("invalid ID!", 400);
    try {
        //search for the user
        const payment = await (0, payments_service_1.getPaymentsService)(id);
        if (payment == undefined)
            return c.text("Payment not found!👽", 404);
        //delete the user
        const res = await (0, payments_service_1.deletePaymentsService)(id);
        if (!res)
            return c.text("Payments not deleted!👽", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deletePayment = deletePayment;
//payments with stripe
// export const createPaymentWithStripe = async (c: Context) => {
//   try {
//     const { amount } = await c.req.json();
//     console.log('Received amount:',amount)
//     if (!amount) {
//       throw new Error('Amount is required');
//     }
//     const paymentIntent = await createPaymentIntent(amount);
//     console.log('Created payment intent:', paymentIntent);
//     return c.json({ clientSecret: paymentIntent.client_secret }, 200);
//   } catch (error: any) {
//     console.error('Error creating payment with Stripe:', error);
//     return c.json({ error: error.message }, 400);
//   }
// };
//
const paymentService = (0, payments_service_1.createPaymentService)();
exports.createPayment = {
    async createCheckoutSession(c) {
        try {
            const { booking_id, amount } = await c.req.json();
            console.log(` Check if id and amount is being received: ${booking_id}, amount: ${amount}`);
            const session = await paymentService.createCheckoutSession(booking_id, amount);
            return c.json({ sessionId: session.id, checkoutUrl: session.url });
        }
        catch (error) {
            console.error("Error creating checkout session:", error);
            return c.json({ success: false, error: "Failed to create checkout session" }, 500);
        }
    },
    //testing of checkout session
    async testCreateCheckoutSession(c) {
        try {
            // For testing, we'll use hardcoded values
            const booking_id = 1;
            const amount = 10000; // $100
            const checkout = `Testing checkout session inpts for bookingId: ${booking_id}, amount: ${amount}`;
            console.log(checkout);
            const session = await paymentService.createCheckoutSession(booking_id, amount);
            ///trying to update data on mytables once successful
            await paymentService.handleSuccessfulPayment(session.id);
            return c.json({
                success: true,
                sessionId: session.id,
                checkoutUrl: session.url,
            });
        }
        catch (error) {
            console.error("Error creating checkout session:", error);
            return c.json({ success: false, error: "Failed to create checkout session" }, 500);
        }
    },
    ///end of test
    async handleWebhook(c) {
        const sig = c.req.header("stripe-signature");
        const rawBody = await c.req.raw.text();
        try {
            const event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
            if (event.type === "checkout.session.completed") {
                const session = event.data.object;
                await paymentService.handleSuccessfulPayment(session.id);
            }
            return c.json({ received: true });
        }
        catch (err) {
            console.error(err);
            return c.json({ error: "Webhook error" }, 400);
        }
    },
};
