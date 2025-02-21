"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReviewService = exports.updateReviewService = exports.createReviewService = exports.getReviewService = exports.reviewsService = void 0;
const db_1 = __importDefault(require("../Drizzle/db"));
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("../Drizzle/schema");
const reviewsService = async () => {
    return await db_1.default.query.reviewsTable.findMany();
};
exports.reviewsService = reviewsService;
const getReviewService = async (id) => {
    return await db_1.default.query.reviewsTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.reviewsTable.review_id, id)
    });
};
exports.getReviewService = getReviewService;
const createReviewService = async (review) => {
    await db_1.default.insert(schema_1.reviewsTable).values(review);
    return review;
};
exports.createReviewService = createReviewService;
const updateReviewService = async (id, review) => {
    await db_1.default.update(schema_1.reviewsTable).set(review).where((0, drizzle_orm_1.eq)(schema_1.reviewsTable.review_id, id));
    return review;
};
exports.updateReviewService = updateReviewService;
const deleteReviewService = async (id) => {
    await db_1.default.delete(schema_1.reviewsTable).where((0, drizzle_orm_1.eq)(schema_1.reviewsTable.review_id, id));
    return "Review deleted successfully";
};
exports.deleteReviewService = deleteReviewService;
// export const getReviewWithBookingsService = async (): Promise<
//   TSReviews[] | null
// > => {
//   return await db.query.reviewsTable.findMany({
//     with: {
//       bookings: {
//         columns: {
//           booking_id: true,
//           vehicle_id: true,
//           location_id: true,
//           booking_date: true,
//           return_date: true,
//           total_amount: true,
//         },
//       },
//     },
//   });
// };
// export const getSingleReviewWithBookingService = async (id:number): Promise<TSReviews[] | null> =>{
//     return await db.query.reviewsTable.findMany({
//         where: eq(reviewsTable.review_id,id),
//         with:{
//             bookings: {
//                 columns: {
//                   booking_id: true,
//                   vehicle_id: true,
//                   location_id: true,
//                   booking_date: true,
//                   return_date: true,
//                   total_amount: true,
//                 },
//               },
//             }
//     })
// }
// export const getReviewWithTicketsService = async (): Promise<
//   TSReviews[] | null
// > => {
//   return await db.query.reviewsTable.findMany({
//     with: {
//       supportTickets: {
//         columns: {
//           ticket_id: true,
//           review_id: true,
//           subject: true,
//           description: true,
//           status: true
//         },
//       },
//     },
//   });
// };
// export const getSingleReviewWithTicketsService = async (id:number): Promise<
//   TSReviews[] | null
// > => {
//   return await db.query.reviewsTable.findMany({
//     where: eq(reviewsTable.review_id,id),
//     with: {
//       supportTickets: {
//         columns: {
//           ticket_id: true,
//           review_id: true,
//           subject: true,
//           description: true,
//           status: true,
//           created_at:true,
//           updated_at:true
//         },
//       },
//     },
//   });
// };
