import { authenticationsTable,usersTable, TIAuthentications, TSAuthentications } from "../Drizzle/schema";
import db from "../Drizzle/db";
import { sql } from "drizzle-orm";
import { mailFunction } from "../mail"

export const createAuthUserService = async (user: any) => {
    try {
      // Insert user into `users` table
      const createdUser = await db.insert(usersTable).values({
        full_name: user.username,
        email: user.email,
        contact_phone: user.contact_phone,
        address: user.address,
        role: user.role || 'user'
      }).returning();
  
      // Extract the created user ID
      const userId = createdUser[0].user_id;
  
      // Insert user into `auth_user` table
      await db.insert(authenticationsTable).values({
        user_id: userId,
        password: user.password,
        username: user.username,
        role:user.role
      }).returning();
  
      // Ensure username is defined and of type string before calling mailFunction
      if (!user.email || typeof user.email !== "string") {
        throw new Error("Invalid email");
      }
  
      // ✅ Send welcome email to the registering user
      await mailFunction(
        user.email, // 👈 Use email instead of username here
        "Welcome to TrueEstate Property Management",
        "welcome-email",
        { username: user.username, password: user.password }
      );
  
      console.log("Authservices: Sent welcome email");
  
      return createdUser[0]; // Return the created user
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("User creation failed");
    }
  };

  export const userloginService = async (user: TSAuthentications) =>{
    const { username, password } = user;
    return await db.query.authenticationsTable.findFirst({
      columns:{
          auth_id: true,
          user_id: true,
          username: true,
          role: true,
          password: true
      }, where: sql` ${authenticationsTable.username} = ${username}`,
      with: {
          user: {
              columns:{
                user_id: true,
                  full_name: true,
                  email: true,
                  contact_phone: true,
                  address: true,
                  role: true,
              }
          }
      }
  
    })
  }