import db from "../Drizzle/db";
import { eq } from "drizzle-orm";
import { TIReviews,TSReviews,reviewsTable } from "../Drizzle/schema";



export const reviewsService = async ():Promise<TSReviews[] | null> =>{
    return await db.query.reviewsTable.findMany();

}

export const getReviewService = async (id: number): Promise<TSReviews | undefined> => {
    return await db.query.reviewsTable.findFirst({
        where: eq(reviewsTable.review_id, id)
    })
}

export const createReviewService = async (review: TIReviews): Promise<TIReviews> => {
    await db.insert(reviewsTable).values(review)
    return review;
}

export const updateReviewService = async (id: number, review: TIReviews) => {
    await db.update(reviewsTable).set(review).where(eq(reviewsTable.review_id, id))
    return review;
}

export const deleteReviewService = async (id: number) => {
    await db.delete(reviewsTable).where(eq(reviewsTable.review_id, id))
    return "Review deleted successfully";
}

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