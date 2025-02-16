import { Context } from "hono";
import { vehiclesService, getVehiclesService, createVehicleService, updateVehiclesService, deleteVehiclesService ,getVehiclesWithHistoryService } from "./vehicles.service";




export const listVehicles = async (c: Context) =>{
  const data = await vehiclesService();
  if ( data == null){
    return c.text("vehicle not Found", 404)
  }
    return c.json(data, 200);
}

export const getSingleVehicle = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  const vehicle = await getVehiclesService(id);
  if (vehicle == undefined){
      return c.text("vehicle not found!", 404);
  }
  return c.json(vehicle, 200);
} 

export const createVehicle = async (c: Context) => {
  try {
    const vehicle = await c.req.json(); // Expect JSON request

    if (!vehicle) {
      return c.json({ error: "Missing vehicle data in request" }, 400);
    }

    // Validate required fields
    const requiredFields = [
      "make",
      "model",
      "year",
      "vin",
      "status",
      "price",
      "mileage",
      "fuel_type",
      "location",
      "images",
    ];
    for (const field of requiredFields) {
      if (!(field in vehicle)) {
        return c.json({ error: `Missing required field: ${field}` }, 400);
      }
    }

    // Ensure images is an array
    if (!Array.isArray(vehicle.images)) {
      return c.json({ error: "Images must be an array of URLs" }, 400);
    }

    // Pass vehicle to service function
    const createdvehicle = await createVehicleService(vehicle);

    if (!createdvehicle) {
      return c.text("vehicle not created!", 404);
    }

    return c.json(createdvehicle, 201);
  } catch (error: any) {
    console.error("Error creating vehicle:", error);
    return c.json({ error: error?.message }, 400);
  }
};

export const updateVehicle = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  const vehicle = await c.req.json();
  try{
  //search for vehicle
  const foundvehicle = await getVehiclesService(id);
  if (foundvehicle == undefined) 
      return c.text("vehicle not found!", 404);
  //get the data and update
  const res = await updateVehiclesService(id, vehicle);
  //return the updated vehicle
  if (!res )
    return c.text("vehicle not updated!", 404); 
    return c.json({msg: res}, 201);

} catch (error: any){
    return c.json({error: error?.message}, 400)
}
}

//delete vehicle
export const deleteVehicle =  async (c: Context) => {
  const id = Number(c.req.param("id"));
  if (isNaN(id)) 
      return c.text("invalid ID!", 400);

  try{

 //search for the vehicle
 const vehicle = await getVehiclesService(id);
 if (vehicle == undefined) 
     return c.text("vehicle not found!👽", 404);
  //delete the vehicle
  const res = await deleteVehiclesService(id);
  if (!res) return c.text("vehicle not deleted!👽", 404);

  return c.json({msg: res}, 201);

  }catch(error: any){
      return c.json({error: error?.message}, 400)
  }
}

export const listVehiclesWithHistories = async (c: Context) =>{
  const data = await getVehiclesWithHistoryService();
  if ( data == null){
    return c.text("user not Found", 404)
  }
    return c.json(data, 200);
}

// export const listsingleuserwithBooking = async (c: Context) =>{
//   const id = parseInt(c.req.param("id"));
//   const data = await getSingleUserWithBookingService(id);
//   if ( data == null){
//     return c.text("user not Found", 404)
//   }
//     return c.json(data, 200);
// }