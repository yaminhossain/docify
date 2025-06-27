"use server";
import connectDB, { collectionNames } from "./connectDB";

const shareDocWithUser = async (email) => {
  const userCollection = connectDB(collectionNames.USERS);
  const user = await userCollection.findOne({ email });
  console.log("user",user);
  if(user===null){
    return null;
  }
};

export default shareDocWithUser;
