"use server";

import bcrypt from "bcrypt";
import connectDB, { collectionNames } from "@/lib/connectDB";

const registerUsers = async ({ name, email, confirmPassword: password }) => {
  function getRandom15DigitNumber() {
    return Math.floor(100000000000000 + Math.random() * 900000000000000);
  }
  const insertionData = { name, email, password };
  insertionData.image = "";
  insertionData.coverPhoto = "";
  insertionData.role = "user";
  insertionData.provider = "credentials";
  insertionData.providerAccountId = getRandom15DigitNumber().toString();

  // ======Hashing the password using bcrypt and 10 round of salt=====
  const hashedPassword = await bcrypt.hash(password, 10);
  insertionData.password = hashedPassword;
  console.log("insertion data", insertionData);
  try {
    const usersCollection = connectDB(collectionNames.USERS);
    const existingUser = await usersCollection.findOne({ email: email });
    if (!existingUser) {
      const result = await usersCollection.insertOne(insertionData);
      return { status: "success", userId: result.insertedId.toString() };
    } else {
      return { status: "failed", message: "User already exists" };
    }
  } catch (error) {
    console.log(error);
    return { status: "error", message: "Database error" };
  }
};

export default registerUsers;

// =======MongoDB promise data sending to client side's buffer problem solution in NextJs=======
//---Solution 1-----
// result.insertedId = result.insertedId.toString();
// return result;
// -----Solution2----
// return JSON.parse(JSON.stringify(result));
