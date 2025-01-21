import db from "../Drizzle/db";
import { eq } from "drizzle-orm";
import { TILocations,TSLocations,locationsTable } from "../Drizzle/schema";



export const locationService = async ():Promise<TSLocations[] | null> =>{
    return await db.query.locationsTable.findMany();

}

export const getLocationService = async (address: string): Promise<TSLocations | undefined> => {
    return await db.query.locationsTable.findFirst({
        where: eq(locationsTable.address, address)
    })
}

export const createLocationService = async (location: TILocations): Promise<TILocations> => {
    await db.insert(locationsTable).values(location)
    return location;
}

export const updateLocationService = async (address: string, location: TILocations) => {
    await db.update(locationsTable).set(location).where(eq(locationsTable.address, address))
    return location;
}

export const deleteLocationService = async (address: string) => {
    await db.delete(locationsTable).where(eq(locationsTable.address, address))
    return "Location deleted successfully";
}