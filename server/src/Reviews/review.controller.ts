import { Context } from "hono";
import { reviewsService, getReviewService, createReviewService, updateReviewService, deleteReviewService} from "./review.service";




export const listReviews = async (c: Context) =>{
  const data = await reviewsService();
  if ( data == null){
    return c.text("Review not Found", 404)
  }
    return c.json(data, 200);
}

export const getSingleReview = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  const review = await getReviewService(id);
  if (review == undefined){
      return c.text("review not found!", 404);
  }
  return c.json(review, 200);
} 

export const createReview = async (c: Context) => {
  try{
    const review = await c.req.json();
    const createdReview = await createReviewService(review);
   if (!createdReview){
    return c.text("review not created!", 404)
   }
    return c.json(createdReview, 201);
} catch (error: any){
    return c.json({error: error?.message}, 400)
}
}

export const updateReview = async (c: Context) => {
  try{
  const id = parseInt(c.req.param("id"));
  console.log
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  const review = await c.req.json();
  console.log(review)
  //search for review
  const foundreview = await getReviewService(id);
  if (foundreview == undefined) 
      return c.text("review not found!", 404);
  //get the data and update
  const res = await updateReviewService(id, review);
  //return the updated review
if (!res ) return c.text("review not updated!", 404);


    return c.json({msg: res}, 201);

} catch (error: any){
    return c.json({error: error?.message}, 400)
}
}

//delete review
export const deleteReview =  async (c: Context) => {
  const id = Number(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  try{

 //search for the review
 const review = await getReviewService(id);
 if (review == undefined) 
     return c.text("Review not found!👽", 404);
  //delete the review
  const res = await deleteReviewService(id);
  if (!res) return c.text("Review not deleted!👽", 404);

  return c.json({msg: res}, 201);

  }catch(error: any){
      return c.json({error: error?.message}, 400)
  }
}

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
