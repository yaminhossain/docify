"use server";
import connectDB, { collectionNames } from "./connectDB";

const shareDocWithUser = async (email, id) => {
  console.log("Email & Id", email, id);
  try {
    const userCollection = connectDB(collectionNames.USERS);
    const documentsCollection = connectDB(collectionNames.DOCUMENTS);

    // find user
    const user = await userCollection.findOne({ email });
    console.log("user", user);
    if (user === null) {
      return null;
    }

    // if user exists then update the document owner
    const filter = { documentId: id };
    const updateDoc = {
      $addToSet: { owners: email },
    };
    const result = await documentsCollection.updateOne(filter, updateDoc);
    return result;
  } catch (e) {
    console.log("database ran into some error");
  }
};

export default shareDocWithUser;
