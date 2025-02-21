"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewRouter = void 0;
const hono_1 = require("hono");
const review_controller_1 = require("./review.controller");
const zod_validator_1 = require("@hono/zod-validator");
const validators_1 = require("../validators");
// import { adminRoleAuth,reviewRoleAuth,bothRolesAuth } from "../middleware/Auth";
//creating hono instance
exports.reviewRouter = new hono_1.Hono();
// get states
exports.reviewRouter.get("/reviews", review_controller_1.listReviews);
//get a single review    
exports.reviewRouter.get("/reviews/:id", review_controller_1.getSingleReview);
// 
//create a review
exports.reviewRouter.post("/reviews", (0, zod_validator_1.zValidator)('json', validators_1.reviewSchema, (results, c) => {
    if (!results.success) {
        return c.json(results.error, 400);
    }
}), review_controller_1.createReview);
//update review
exports.reviewRouter.put("/reviews/:id", review_controller_1.updateReview);
// delete Driver
exports.reviewRouter.delete("/reviews/:id", review_controller_1.deleteReview);
//get reviews with bookings
// reviewRouter.get("/reviewsWithBookings", listReviewWithBookings)
// // reviewRouter.get("/reviews/withBookings/:id", listReviewWithBookings)
// reviewRouter.get("/reviews/withBookings/:id", listsinglereviewwithBooking)
// reviewRouter.get("/reviewsWithTickets", listReviewWithTickets)  
// reviewRouter.get("/reviews/singleReviewWithTickets/:id", listSingleReviewWithTickets)  
