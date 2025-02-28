import { Context } from "hono";
import { landService, getLandService, createLandService, updateLandService, deleteLandService,getLandsWithHistoryService} from "./lands.service";




export const listLand = async (c: Context) =>{
  const data = await landService();
  if ( data == null){
    return c.text("Land not Found", 404)
  }
    return c.json(data, 200);
}

export const getSingleLand = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  const land = await getLandService(id);
  if (land == undefined){
      return c.text("land not found!", 404);
  }
  return c.json(land, 200);
} 

export const createLand = async (c: Context) => {
  try {
    const land = await c.req.json(); // Expect JSON request

    if (!land) {
      return c.json({ error: "Missing land data in request" }, 400);
    }

    // Validate required fields
    const requiredFields = [
      "location",
      "size",
      "price",
      "status",
      "land_type",
      "images",
    ];
    for (const field of requiredFields) {
      if (!(field in land)) {
        return c.json({ error: `Missing required field: ${field}` }, 400);
      }
    }

    // Ensure images is an array
    if (!Array.isArray(land.images)) {
      return c.json({ error: "Images must be an array of URLs" }, 400);
    }

    // Pass land to service function
    const createdLand = await createLandService(land);

    if (!createdLand) {
      return c.text("Land not created!", 404);
    }

    return c.json(createdLand, 201);
  } catch (error: any) {
    console.error("Error creating land:", error);
    return c.json({ error: error?.message }, 400);
  }
};

export const updateLand = async (c: Context) => {
  try{
  const id = parseInt(c.req.param("id"));
  console.log
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  const land = await c.req.json();
  console.log(land)
  //search for land
  const foundland = await getLandService(id);
  if (foundland == undefined) 
      return c.text("land not found!", 404);
  //get the data and update
  const res = await updateLandService(id, land);
  //return the updated land
if (!res ) return c.text("land not updated!", 404);


    return c.json({msg: res}, 201);

} catch (error: any){
    return c.json({error: error?.message}, 400)
}
}

//delete land
export const deleteLand =  async (c: Context) => {
  const id = Number(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  try{

 //search for the land
 const land = await getLandService(id);
 if (land == undefined) 
     return c.text("Land not found!👽", 404);
  //delete the land
  const res = await deleteLandService(id);
  if (!res) return c.text("Land not deleted!👽", 404);

  return c.json({msg: res}, 201);

  }catch(error: any){
      return c.json({error: error?.message}, 400)
  }
}
export const listLandsWithHistories = async (c: Context) =>{
  const data = await getLandsWithHistoryService();
  if ( data == null){
    return c.text("user not Found", 404)
  }
    return c.json(data, 200);
}


//land relations

// export const listLandWithBookings = async (c: Context) =>{
//   const data = await getLandWithBookingsService();
//   if ( data == null){
//     return c.text("land not Found", 404)
//   }
//     return c.json(data, 200);
// }

// export const listsinglelandwithBooking = async (c: Context) =>{
//   const id = parseInt(c.req.param("id"));
//   const data = await getSingleLandWithBookingService(id);
//   if ( data == null){
//     return c.text("land not Found", 404)
//   }
//     return c.json(data, 200);
// }

// export const listLandWithTickets = async (c: Context) =>{
//   const data = await getLandWithTicketsService();
//   if ( data == null){
//     return c.text("land not Found", 404)
//   }
//     return c.json(data, 200);
// }
// export const listSingleLandWithTickets = async (c: Context) =>{
//   const id = parseInt(c.req.param("id"));
//   const data = await getSingleLandWithTicketsService(id);
//   if ( data == null){
//     return c.text("land not Found", 404)
//   }
//     return c.json(data, 200);
// }
