"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentsRouter = void 0;
const hono_1 = require("hono");
const payments_controller_1 = require("./payments.controller");
//creating hono instance
exports.paymentsRouter = new hono_1.Hono();
//get states
exports.paymentsRouter.get("/payments", payments_controller_1.listPayments);
//get a single Driver    
exports.paymentsRouter.get("/payments/:id", payments_controller_1.getSinglePayment);
//create State
// paymentsRouter.post("/payments", zValidator('json', paymentsSchema, (results, c) => {
//   if (!results.success){
//       return c.json(results.error, 400)
//   }
// }) ,createPayment)
//update Driver
exports.paymentsRouter.put("/payments/:id", payments_controller_1.updatePayment);
// delete Driver
exports.paymentsRouter.delete("/payments/:id", payments_controller_1.deletePayment);
// paymentsRouter.post("/paymentsWithstripe", createPaymentWithStripe)
exports.paymentsRouter.post("/create-checkout-session", payments_controller_1.createPayment.createCheckoutSession);
exports.paymentsRouter.post("/webhook", payments_controller_1.createPayment.handleWebhook);
exports.paymentsRouter.get("/test-checkout-session", payments_controller_1.createPayment.testCreateCheckoutSession);
