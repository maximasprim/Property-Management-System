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

  const user = await getPropertyHistoryService(id);
  if (user == undefined){
      return c.text("user not found!", 404);
  }
  return c.json(user, 200);
} 

export const createPropertyHistory = async (c: Context) => {
  try{
    const user = await c.req.json();
    const createdPropertyHistory = await createPropertyHistoryService(user);
   if (!createdPropertyHistory){
    return c.text("user not created!", 404)
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

  const user = await c.req.json();
  console.log(user)
  //search for user
  const founduser = await getPropertyHistoryService(id);
  if (founduser == undefined) 
      return c.text("user not found!", 404);
  //get the data and update
  const res = await updatePropertyHistoryService(id, user);
  //return the updated user
if (!res ) return c.text("user not updated!", 404);


    return c.json({msg: res}, 201);

} catch (error: any){
    return c.json({error: error?.message}, 400)
}
}

//delete user
export const deletePropertyHistory =  async (c: Context) => {
  const id = Number(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  try{

 //search for the user
 const user = await getPropertyHistoryService(id);
 if (user == undefined) 
     return c.text("PropertyHistory not found!👽", 404);
  //delete the user
  const res = await deletePropertyHistoryService(id);
  if (!res) return c.text("PropertyHistory not deleted!👽", 404);

  return c.json({msg: res}, 201);

  }catch(error: any){
      return c.json({error: error?.message}, 400)
  }
}

//user relations

// export const listPropertyHistoryWithBookings = async (c: Context) =>{
//   const data = await getPropertyHistoryWithBookingsService();
//   if ( data == null){
//     return c.text("user not Found", 404)
//   }
//     return c.json(data, 200);
// }

// export const listsingleuserwithBooking = async (c: Context) =>{
//   const id = parseInt(c.req.param("id"));
//   const data = await getSinglePropertyHistoryWithBookingService(id);
//   if ( data == null){
//     return c.text("user not Found", 404)
//   }
//     return c.json(data, 200);
// }

// export const listPropertyHistoryWithTickets = async (c: Context) =>{
//   const data = await getPropertyHistoryWithTicketsService();
//   if ( data == null){
//     return c.text("user not Found", 404)
//   }
//     return c.json(data, 200);
// }
// export const listSinglePropertyHistoryWithTickets = async (c: Context) =>{
//   const id = parseInt(c.req.param("id"));
//   const data = await getSinglePropertyHistoryWithTicketsService(id);
//   if ( data == null){
//     return c.text("user not Found", 404)
//   }
//     return c.json(data, 200);
// }
