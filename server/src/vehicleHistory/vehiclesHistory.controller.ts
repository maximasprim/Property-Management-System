import { Context } from "hono";
import { vehiclesHistoryService, getVehiclesHistoryService, createVehiclesHistoryService, updateVehiclesHistoryService, deleteVehiclesHistoryService} from "./vehiclesHistory.service";




export const listVehiclesHistory = async (c: Context) =>{
  const data = await vehiclesHistoryService();
  if ( data == null){
    return c.text("VehiclesHistory not Found", 404)
  }
    return c.json(data, 200);
}

export const getSingleVehiclesHistory = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  const history = await getVehiclesHistoryService(id);
  if (history == undefined){
      return c.text("history not found!", 404);
  }
  return c.json(history, 200);
} 

export const createVehiclesHistory = async (c: Context) => {
  try{
    const history = await c.req.json();
    const createdVehiclesHistory = await createVehiclesHistoryService(history);
   if (!createdVehiclesHistory){
    return c.text("history not created!", 404)
   }
    return c.json(createdVehiclesHistory, 201);
} catch (error: any){
    return c.json({error: error?.message}, 400)
}
}

export const updateVehiclesHistory = async (c: Context) => {
  try{
  const id = parseInt(c.req.param("id"));
  console.log
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  const history = await c.req.json();
  console.log(history)
  //search for history
  const foundhistory = await getVehiclesHistoryService(id);
  if (foundhistory == undefined) 
      return c.text("history not found!", 404);
  //get the data and update
  const res = await updateVehiclesHistoryService(id, history);
  //return the updated history
if (!res ) return c.text("history not updated!", 404);


    return c.json({msg: res}, 201);

} catch (error: any){
    return c.json({error: error?.message}, 400)
}
}

//delete history
export const deleteVehiclesHistory =  async (c: Context) => {
  const id = Number(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  try{

 //search for the history
 const history = await getVehiclesHistoryService(id);
 if (history == undefined) 
     return c.text("VehiclesHistory not found!👽", 404);
  //delete the history
  const res = await deleteVehiclesHistoryService(id);
  if (!res) return c.text("VehiclesHistory not deleted!👽", 404);

  return c.json({msg: res}, 201);

  }catch(error: any){
      return c.json({error: error?.message}, 400)
  }
}

//history relations

// export const listVehiclesHistoryWithBookings = async (c: Context) =>{
//   const data = await getVehiclesHistoryWithBookingsService();
//   if ( data == null){
//     return c.text("history not Found", 404)
//   }
//     return c.json(data, 200);
// }

// export const listsinglehistorywithBooking = async (c: Context) =>{
//   const id = parseInt(c.req.param("id"));
//   const data = await getSingleVehiclesHistoryWithBookingService(id);
//   if ( data == null){
//     return c.text("history not Found", 404)
//   }
//     return c.json(data, 200);
// }

// export const listVehiclesHistoryWithTickets = async (c: Context) =>{
//   const data = await getVehiclesHistoryWithTicketsService();
//   if ( data == null){
//     return c.text("history not Found", 404)
//   }
//     return c.json(data, 200);
// }
// export const listSingleVehiclesHistoryWithTickets = async (c: Context) =>{
//   const id = parseInt(c.req.param("id"));
//   const data = await getSingleVehiclesHistoryWithTicketsService(id);
//   if ( data == null){
//     return c.text("history not Found", 404)
//   }
//     return c.json(data, 200);
// }
