"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPaymentService = exports.deletePaymentsService = exports.updatePaymentsService = exports.createPaymentsService = exports.getPaymentsService = exports.paymentsService = void 0;
const db_1 = __importDefault(require("../Drizzle/db"));
const drizzle_orm_1 = require("drizzle-orm");
const stripe_1 = __importDefault(require("../stripe"));
const schema_1 = require("../Drizzle/schema");
const paymentsService = async () => {
    return await db_1.default.query.paymentsTable.findMany();
};
exports.paymentsService = paymentsService;
const getPaymentsService = async (id) => {
    return await db_1.default.query.paymentsTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.paymentsTable.payment_id, id)
    });
};
exports.getPaymentsService = getPaymentsService;
const createPaymentsService = async (payment) => {
    await db_1.default.insert(schema_1.paymentsTable).values(payment);
    return payment;
};
exports.createPaymentsService = createPaymentsService;
const updatePaymentsService = async (id, payment) => {
    await db_1.default.update(schema_1.paymentsTable).set(payment).where((0, drizzle_orm_1.eq)(schema_1.paymentsTable.payment_id, id));
    return payment;
};
exports.updatePaymentsService = updatePaymentsService;
const deletePaymentsService = async (id) => {
    await db_1.default.delete(schema_1.paymentsTable).where((0, drizzle_orm_1.eq)(schema_1.paymentsTable.payment_id, id));
    return "Payment deleted successfully";
};
exports.deletePaymentsService = deletePaymentsService;
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
const createPaymentService = () => {
    return {
        async createCheckoutSession(booking_id, amount) {
            const session = await stripe_1.default.checkout.sessions.create({
                payment_method_types: ["card"],
                line_items: [
                    {
                        price_data: {
                            currency: "usd",
                            product_data: {
                                name: "Car Booking",
                            },
                            unit_amount: amount * 100, // change amount to cents
                        },
                        quantity: 1,
                    },
                ],
                mode: "payment",
                success_url: process.env.FRONTEND_URL + "/paymentsuccess",
                cancel_url: process.env.FRONTEND_URL + "/paymentcancel",
                metadata: {
                    booking_id: booking_id.toString(),
                },
            });
            const payment_intent = await stripe_1.default.paymentIntents.create({
                amount: Number(amount) * 100,
                currency: 'usd',
                metadata: { booking_id: booking_id.toString() },
            });
            await db_1.default.update(schema_1.bookingsTable).set({ status: "confirmed" }).where((0, drizzle_orm_1.eq)(schema_1.bookingsTable.booking_id, booking_id));
            const property_id = 1; // or assign the appropriate value
            const buyer_id = 1; // or assign the appropriate value
            await db_1.default.insert(schema_1.paymentsTable).values({ property_type: "land || vehicle || house", property_id: property_id, amount: amount, booking_id, buyer_id, status: "payed", payment_method: 'credit card', transaction_id: payment_intent.id, }).execute();
            return session;
        },
        async handleSuccessfulPayment(session_id) {
            const session = await stripe_1.default.checkout.sessions.retrieve(session_id);
            const booking_id = parseInt(session.metadata.booking_id);
            const amount_total = session.amount_total;
            if (amount_total === null) {
                throw new Error("session.amount_total is null");
            }
        },
    };
};
exports.createPaymentService = createPaymentService;
