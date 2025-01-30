import { Context } from "hono";
import { housesService, getHouseService, createHouseService, updateHouseService, deleteHouseService} from "./houses.service";




export const listHouses = async (c: Context) =>{
  const data = await housesService();
  if ( data == null){
    return c.text("House not Found", 404)
  }
    return c.json(data, 200);
}

export const getSingleHouse = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  const house = await getHouseService(id);
  if (house == undefined){
      return c.text("house not found!", 404);
  }
  return c.json(house, 200);
} 

export const createHouse = async (c: Context) => {
  try {
    const house = await c.req.json(); // Expect JSON request

    if (!house) {
      return c.json({ error: "Missing house data in request" }, 400);
    }

    // Validate required fields
    const requiredFields = [
      "owner_id",
      "address",
      "name",
      "number_of_rooms",
      "size",
      "price",
      "status",
      "year_built",
      "images",
    ];
    for (const field of requiredFields) {
      if (!(field in house)) {
        return c.json({ error: `Missing required field: ${field}` }, 400);
      }
    }

    // Ensure images is an array
    if (!Array.isArray(house.images)) {
      return c.json({ error: "Images must be an array of URLs" }, 400);
    }

    // Pass house to service function
    const createdHouse = await createHouseService(house);

    if (!createdHouse) {
      return c.text("House not created!", 404);
    }

    return c.json(createdHouse, 201);
  } catch (error: any) {
    console.error("Error creating house:", error);
    return c.json({ error: error?.message }, 400);
  }
};

export const updateHouse = async (c: Context) => {
  try{
  const id = parseInt(c.req.param("id"));
  console.log
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  const house = await c.req.json();
  console.log(house)
  //search for house
  const foundhouse = await getHouseService(id);
  if (foundhouse == undefined) 
      return c.text("house not found!", 404);
  //get the data and update
  const res = await updateHouseService(id, house);
  //return the updated house
if (!res ) return c.text("house not updated!", 404);


    return c.json({msg: res}, 201);

} catch (error: any){
    return c.json({error: error?.message}, 400)
}
}

//delete house
export const deleteHouse =  async (c: Context) => {
  const id = Number(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  try{

 //search for the house
 const house = await getHouseService(id);
 if (house == undefined) 
     return c.text("House not found!👽", 404);
  //delete the house
  const res = await deleteHouseService(id);
  if (!res) return c.text("House not deleted!👽", 404);

  return c.json({msg: res}, 201);

  }catch(error: any){
      return c.json({error: error?.message}, 400)
  }
}

//house relations

// export const listHouseWithBookings = async (c: Context) =>{
//   const data = await getHouseWithBookingsService();
//   if ( data == null){
//     return c.text("house not Found", 404)
//   }
//     return c.json(data, 200);
// }

// export const listsinglehousewithBooking = async (c: Context) =>{
//   const id = parseInt(c.req.param("id"));
//   const data = await getSingleHouseWithBookingService(id);
//   if ( data == null){
//     return c.text("house not Found", 404)
//   }
//     return c.json(data, 200);
// }

// export const listHouseWithTickets = async (c: Context) =>{
//   const data = await getHouseWithTicketsService();
//   if ( data == null){
//     return c.text("house not Found", 404)
//   }
//     return c.json(data, 200);
// }
// export const listSingleHouseWithTickets = async (c: Context) =>{
//   const id = parseInt(c.req.param("id"));
//   const data = await getSingleHouseWithTicketsService(id);
//   if ( data == null){
//     return c.text("house not Found", 404)
//   }
//     return c.json(data, 200);
// }
