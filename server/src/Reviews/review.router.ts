import { Hono } from "hono";
import { createReview, getSingleReview, listReviews, updateReview, deleteReview} from "./review.controller";
import {zValidator} from "@hono/zod-validator"
import { type Context } from "hono";
import { reviewSchema } from "../validators";
// import { adminRoleAuth,reviewRoleAuth,bothRolesAuth } from "../middleware/Auth";



//creating hono instance

export const reviewRouter = new Hono();

// get states
reviewRouter.get("/reviews",listReviews)

//get a single review    

reviewRouter.get("/reviews/:id", getSingleReview)

// 

//create a review

reviewRouter.post("/reviews", zValidator('json', reviewSchema, (results, c) => {
  if (!results.success){
      return c.json(results.error, 400)
  }
}),createReview)

//update review

reviewRouter.put("/reviews/:id", updateReview)

// delete Driver
reviewRouter.delete("/reviews/:id", deleteReview)

//get reviews with bookings
// reviewRouter.get("/reviewsWithBookings", listReviewWithBookings)
// // reviewRouter.get("/reviews/withBookings/:id", listReviewWithBookings)
// reviewRouter.get("/reviews/withBookings/:id", listsinglereviewwithBooking)

// reviewRouter.get("/reviewsWithTickets", listReviewWithTickets)  
// reviewRouter.get("/reviews/singleReviewWithTickets/:id", listSingleReviewWithTickets)  