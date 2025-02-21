"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReview = exports.updateReview = exports.createReview = exports.getSingleReview = exports.listReviews = void 0;
const review_service_1 = require("./review.service");
const listReviews = async (c) => {
    const data = await (0, review_service_1.reviewsService)();
    if (data == null) {
        return c.text("Review not Found", 404);
    }
    return c.json(data, 200);
};
exports.listReviews = listReviews;
const getSingleReview = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("invalid ID!", 400);
    const review = await (0, review_service_1.getReviewService)(id);
    if (review == undefined) {
        return c.text("review not found!", 404);
    }
    return c.json(review, 200);
};
exports.getSingleReview = getSingleReview;
const createReview = async (c) => {
    try {
        const review = await c.req.json();
        const createdReview = await (0, review_service_1.createReviewService)(review);
        if (!createdReview) {
            return c.text("review not created!", 404);
        }
        return c.json(createdReview, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createReview = createReview;
const updateReview = async (c) => {
    try {
        const id = parseInt(c.req.param("id"));
        console.log;
        if (isNaN(id))
            return c.text("invalid ID!", 400);
        const review = await c.req.json();
        console.log(review);
        //search for review
        const foundreview = await (0, review_service_1.getReviewService)(id);
        if (foundreview == undefined)
            return c.text("review not found!", 404);
        //get the data and update
        const res = await (0, review_service_1.updateReviewService)(id, review);
        //return the updated review
        if (!res)
            return c.text("review not updated!", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateReview = updateReview;
//delete review
const deleteReview = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("invalid ID!", 400);
    try {
        //search for the review
        const review = await (0, review_service_1.getReviewService)(id);
        if (review == undefined)
            return c.text("Review not found!👽", 404);
        //delete the review
        const res = await (0, review_service_1.deleteReviewService)(id);
        if (!res)
            return c.text("Review not deleted!👽", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteReview = deleteReview;
//review relations
// export const listReviewWithBookings = async (c: Context) =>{
//   const data = await getReviewWithBookingsService();
//   if ( data == null){
//     return c.text("review not Found", 404)
//   }
//     return c.json(data, 200);
// }
// export const listsinglereviewwithBooking = async (c: Context) =>{
//   const id = parseInt(c.req.param("id"));
//   const data = await getSingleReviewWithBookingService(id);
//   if ( data == null){
//     return c.text("review not Found", 404)
//   }
//     return c.json(data, 200);
// }
// export const listReviewWithTickets = async (c: Context) =>{
//   const data = await getReviewWithTicketsService();
//   if ( data == null){
//     return c.text("review not Found", 404)
//   }
//     return c.json(data, 200);
// }
// export const listSingleReviewWithTickets = async (c: Context) =>{
//   const id = parseInt(c.req.param("id"));
//   const data = await getSingleReviewWithTicketsService(id);
//   if ( data == null){
//     return c.text("review not Found", 404)
//   }
//     return c.json(data, 200);
// }
