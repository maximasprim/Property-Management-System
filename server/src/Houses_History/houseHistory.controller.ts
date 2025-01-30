import { Context } from "hono";
import { propertyHistoryService, getHouseHistoryService, createHouseHistoryService, updateHouseHistoryService, deleteHouseHistoryService} from "./houseHistory.service";




export const listHouseHistory = async (c: Context) =>{
  const data = await propertyHistoryService();
  if ( data == null){
    return c.text("HouseHistory not Found", 404)
  }
    return c.json(data, 200);
}

export const getSingleHouseHistory = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  const history = await getHouseHistoryService(id);
  if (history == undefined){
      return c.text("history not found!", 404);
  }
  return c.json(history, 200);
} 

export const createHouseHistory = async (c: Context) => {
  try{
    const history = await c.req.json();
    const createdHouseHistory = await createHouseHistoryService(history);
   if (!createdHouseHistory){
    return c.text("history not created!", 404)
   }
    return c.json(createdHouseHistory, 201);
} catch (error: any){
    return c.json({error: error?.message}, 400)
}
}

export const updateHouseHistory = async (c: Context) => {
  try{
  const id = parseInt(c.req.param("id"));
  console.log
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  const history = await c.req.json();
  console.log(history)
  //search for history
  const foundhistory = await getHouseHistoryService(id);
  if (foundhistory == undefined) 
      return c.text("history not found!", 404);
  //get the data and update
  const res = await updateHouseHistoryService(id, history);
  //return the updated history
if (!res ) return c.text("history not updated!", 404);


    return c.json({msg: res}, 201);

} catch (error: any){
    return c.json({error: error?.message}, 400)
}
}

//delete history
export const deleteHouseHistory =  async (c: Context) => {
  const id = Number(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  try{

 //search for the history
 const history = await getHouseHistoryService(id);
 if (history == undefined) 
     return c.text("HouseHistory not found!👽", 404);
  //delete the history
  const res = await deleteHouseHistoryService(id);
  if (!res) return c.text("HouseHistory not deleted!👽", 404);

  return c.json({msg: res}, 201);

  }catch(error: any){
      return c.json({error: error?.message}, 400)
  }
}

//history relations

// export const listHouseHistoryWithBookings = async (c: Context) =>{
//   const data = await getHouseHistoryWithBookingsService();
//   if ( data == null){
//     return c.text("history not Found", 404)
//   }
//     return c.json(data, 200);
// }

// export const listsinglehistorywithBooking = async (c: Context) =>{
//   const id = parseInt(c.req.param("id"));
//   const data = await getSingleHouseHistoryWithBookingService(id);
//   if ( data == null){
//     return c.text("history not Found", 404)
//   }
//     return c.json(data, 200);
// }

// export const listHouseHistoryWithTickets = async (c: Context) =>{
//   const data = await getHouseHistoryWithTicketsService();
//   if ( data == null){
//     return c.text("history not Found", 404)
//   }
//     return c.json(data, 200);
// }
// export const listSingleHouseHistoryWithTickets = async (c: Context) =>{
//   const id = parseInt(c.req.param("id"));
//   const data = await getSingleHouseHistoryWithTicketsService(id);
//   if ( data == null){
//     return c.text("history not Found", 404)
//   }
//     return c.json(data, 200);
// }
