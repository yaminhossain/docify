"use server";

import connectDB, { collectionNames } from "@/lib/connectDB";

const socialProviderUsers = async (payload) => {
  const usersCollection = connectDB(collectionNames.USERS);
  try {
    // Using providerAccountId for query because not all provider provides email after log in
    const isExists = await usersCollection.findOne({
      providerAccountId: payload.providerAccountId,
    });
    if (!isExists) {
      await usersCollection.insertOne(payload);
      return {
        status: "success",
        message: "User account created successfully",
      };
    }
  } catch (error) {
    return { status: "failed", message: "Database error" };
  }
  return {
    status: "success",
    message: "User already existed",
  };
};

export default socialProviderUsers;
