"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_server_1 = require("@hono/node-server");
const hono_1 = require("hono");
const user_router_1 = require("./Users/user.router");
const vehicles_router_1 = require("./Vehicles/vehicles.router");
const location_router_1 = require("./Location and branches/location.router");
const Bookings_router_1 = require("./Bookings/Bookings.router");
const payments_router_1 = require("./Payments/payments.router");
const houses_router_1 = require("./Houses/houses.router");
const houseHistory_router_1 = require("./Houses_History/houseHistory.router");
const lands_router_1 = require("./Lands/lands.router");
const auth_router_1 = require("./Authentication/auth.router");
const landHistory_router_1 = require("./Land_History/landHistory.router");
const vehiclesHistory_router_1 = require("./vehicleHistory/vehiclesHistory.router");
const review_router_1 = require("./Reviews/review.router");
const cors_1 = require("hono/cors");
const app = new hono_1.Hono();
//enable cors
app.use((0, cors_1.cors)());
app.use('*', (0, cors_1.cors)());
app.use((0, cors_1.cors)({
    origin: '*',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
}));
app.get('/', (c) => {
    return c.text('Hello Hono!');
});
const port = 3000;
console.log(`Server is running on http://localhost:${port}`);
(0, node_server_1.serve)({
    fetch: app.fetch,
    port
});
app.route('/', user_router_1.userRouter);
app.route('/', vehicles_router_1.vehiclesRouter);
app.route('/', location_router_1.locationRouter);
app.route('/', Bookings_router_1.bookingsRouter);
app.route('/', payments_router_1.paymentsRouter);
app.route('/', houses_router_1.houseRouter);
app.route('/', houseHistory_router_1.houseHistoryRouter);
app.route('/', lands_router_1.landRouter);
app.route('/', auth_router_1.authRouter);
app.route('/', landHistory_router_1.landHistoryRouter);
app.route('/', vehiclesHistory_router_1.vehiclesHistoryRouter);
app.route('/', review_router_1.reviewRouter);
