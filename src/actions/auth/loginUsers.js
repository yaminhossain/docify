"use server";

import connectDB, { collectionNames } from "@/lib/connectDB";
import bcrypt from "bcrypt";

const loginUsers = async ({ email: actionEmail, password: actionPassword }) => {
  const usersCollection = connectDB(collectionNames.USERS);
  try {
    const query = { email: actionEmail };
    const user = await usersCollection.findOne(query);
    const validPassword = await bcrypt.compare(actionPassword, user?.password);

    if (validPassword) {
      return { status: "success", user };
    } else {
      return { status: "unknown", message: "There is no such user" };
    }
  } catch (e) {
    return { status: "error", message: "database error" };
  }
};

export default loginUsers;
