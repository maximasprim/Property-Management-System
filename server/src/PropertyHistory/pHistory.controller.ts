import { Context } from "hono";
import { propertyHistoryService, getPropertyHistoryService, createPropertyHistoryService, updatePropertyHistoryService, deletePropertyHistoryService} from "./pHistory.service";




export const listPropertyHistory = async (c: Context) =>{
  const data = await propertyHistoryService();
  if ( data == null){
    return c.text("PropertyHistory not Found", 404)
  }
    return c.json(data, 200);
}

export const getSinglePropertyHistory = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  const history = await getPropertyHistoryService(id);
  if (history == undefined){
      return c.text("history not found!", 404);
  }
  return c.json(history, 200);
} 

export const createPropertyHistory = async (c: Context) => {
  try{
    const history = await c.req.json();
    const createdPropertyHistory = await createPropertyHistoryService(history);
   if (!createdPropertyHistory){
    return c.text("history not created!", 404)
   }
    return c.json(createdPropertyHistory, 201);
} catch (error: any){
    return c.json({error: error?.message}, 400)
}
}

export const updatePropertyHistory = async (c: Context) => {
  try{
  const id = parseInt(c.req.param("id"));
  console.log
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  const history = await c.req.json();
  console.log(history)
  //search for history
  const foundhistory = await getPropertyHistoryService(id);
  if (foundhistory == undefined) 
      return c.text("history not found!", 404);
  //get the data and update
  const res = await updatePropertyHistoryService(id, history);
  //return the updated history
if (!res ) return c.text("history not updated!", 404);


    return c.json({msg: res}, 201);

} catch (error: any){
    return c.json({error: error?.message}, 400)
}
}

//delete history
export const deletePropertyHistory =  async (c: Context) => {
  const id = Number(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  try{

 //search for the history
 const history = await getPropertyHistoryService(id);
 if (history == undefined) 
     return c.text("PropertyHistory not found!👽", 404);
  //delete the history
  const res = await deletePropertyHistoryService(id);
  if (!res) return c.text("PropertyHistory not deleted!👽", 404);

  return c.json({msg: res}, 201);

  }catch(error: any){
      return c.json({error: error?.message}, 400)
  }
}

//history relations

// export const listPropertyHistoryWithBookings = async (c: Context) =>{
//   const data = await getPropertyHistoryWithBookingsService();
//   if ( data == null){
//     return c.text("history not Found", 404)
//   }
//     return c.json(data, 200);
// }

// export const listsinglehistorywithBooking = async (c: Context) =>{
//   const id = parseInt(c.req.param("id"));
//   const data = await getSinglePropertyHistoryWithBookingService(id);
//   if ( data == null){
//     return c.text("history not Found", 404)
//   }
//     return c.json(data, 200);
// }

// export const listPropertyHistoryWithTickets = async (c: Context) =>{
//   const data = await getPropertyHistoryWithTicketsService();
//   if ( data == null){
//     return c.text("history not Found", 404)
//   }
//     return c.json(data, 200);
// }
// export const listSinglePropertyHistoryWithTickets = async (c: Context) =>{
//   const id = parseInt(c.req.param("id"));
//   const data = await getSinglePropertyHistoryWithTicketsService(id);
//   if ( data == null){
//     return c.text("history not Found", 404)
//   }
//     return c.json(data, 200);
// }
