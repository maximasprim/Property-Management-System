import { Context } from "hono";
import { landHistoryService, getLandHistoryService, createLandHistoryService, updateLandHistoryService, deleteLandHistoryService} from "./landHistory.service";




export const listLandHistory = async (c: Context) =>{
  const data = await landHistoryService();
  if ( data == null){
    return c.text("LandHistory not Found", 404)
  }
    return c.json(data, 200);
}

export const getSingleLandHistory = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  const history = await getLandHistoryService(id);
  if (history == undefined){
      return c.text("history not found!", 404);
  }
  return c.json(history, 200);
} 

export const createLandHistory = async (c: Context) => {
  try{
    const history = await c.req.json();
    const createdLandHistory = await createLandHistoryService(history);
   if (!createdLandHistory){
    return c.text("history not created!", 404)
   }
    return c.json(createdLandHistory, 201);
} catch (error: any){
    return c.json({error: error?.message}, 400)
}
}

export const updateLandHistory = async (c: Context) => {
  try{
  const id = parseInt(c.req.param("id"));
  console.log
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  const history = await c.req.json();
  console.log(history)
  //search for history
  const foundhistory = await getLandHistoryService(id);
  if (foundhistory == undefined) 
      return c.text("history not found!", 404);
  //get the data and update
  const res = await updateLandHistoryService(id, history);
  //return the updated history
if (!res ) return c.text("history not updated!", 404);


    return c.json({msg: res}, 201);

} catch (error: any){
    return c.json({error: error?.message}, 400)
}
}

//delete history
export const deleteLandHistory =  async (c: Context) => {
  const id = Number(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  try{

 //search for the history
 const history = await getLandHistoryService(id);
 if (history == undefined) 
     return c.text("LandHistory not found!👽", 404);
  //delete the history
  const res = await deleteLandHistoryService(id);
  if (!res) return c.text("LandHistory not deleted!👽", 404);

  return c.json({msg: res}, 201);

  }catch(error: any){
      return c.json({error: error?.message}, 400)
  }
}

//history relations

// export const listLandHistoryWithBookings = async (c: Context) =>{
//   const data = await getLandHistoryWithBookingsService();
//   if ( data == null){
//     return c.text("history not Found", 404)
//   }
//     return c.json(data, 200);
// }

// export const listsinglehistorywithBooking = async (c: Context) =>{
//   const id = parseInt(c.req.param("id"));
//   const data = await getSingleLandHistoryWithBookingService(id);
//   if ( data == null){
//     return c.text("history not Found", 404)
//   }
//     return c.json(data, 200);
// }

// export const listLandHistoryWithTickets = async (c: Context) =>{
//   const data = await getLandHistoryWithTicketsService();
//   if ( data == null){
//     return c.text("history not Found", 404)
//   }
//     return c.json(data, 200);
// }
// export const listSingleLandHistoryWithTickets = async (c: Context) =>{
//   const id = parseInt(c.req.param("id"));
//   const data = await getSingleLandHistoryWithTicketsService(id);
//   if ( data == null){
//     return c.text("history not Found", 404)
//   }
//     return c.json(data, 200);
// }
