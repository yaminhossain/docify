"use server";

import connectDB, { collectionNames } from "./connectDB";

const updateUserProfile = async (data) => {
  const { name, email, image } = data;
  console.log("Updated user data", name, email, image);

  const usersCollection = connectDB(collectionNames.USERS);
  const filter = { email };
  const updateDoc = {
    $set: {
      name,
      image,
    },
  };
  const result = await usersCollection.updateOne(filter, updateDoc);
  return result;
};

export default updateUserProfile;
