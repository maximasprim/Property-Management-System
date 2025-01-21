import db from "../Drizzle/db";
import { eq } from "drizzle-orm";
import {TIVehicles,TSVehicles,vehiclesTable } from "../Drizzle/schema";



export const vehiclesService = async ():Promise<TSVehicles[] | null> =>{
    return await db.query.vehiclesTable.findMany();

}

export const getVehiclesService = async (id: number): Promise<TSVehicles | undefined> => {
    return await db.query.vehiclesTable.findFirst({
        where: eq(vehiclesTable.vehicle_id, id)
    })
}

export const createVehiclesService = async (vehicles: TIVehicles): Promise<TIVehicles> => {
    await db.insert(vehiclesTable).values(vehicles)
    return vehicles;
}

export const updateVehiclesService = async (id: number, vehicles: TIVehicles) => {
    await db.update(vehiclesTable).set(vehicles).where(eq(vehiclesTable.vehicle_id, id))
    return "vehicle updated successfully";
}

export const deleteVehiclesService = async (id: number) => {
    await db.delete(vehiclesTable).where(eq(vehiclesTable.vehicle_id, id))
    return "vehicle deleted successfully";
}