"use server";
import connectDB, { collectionNames } from "./connectDB";

const getRecentDocuments = async (email) => {
  try {
    if (!email) return [];
    const documentCOllection = connectDB(collectionNames.DOCUMENTS);
    const query = { $or: [{ author: email }, { owners: email }] };
    const recentDocuments = await documentCOllection
      .find(query)
      .sort({ _id: -1 })
      .limit(10)
      .toArray();
    return recentDocuments;
  } catch (error) {
    console.log("A database error occurred during getting recent documents");
  }
};

export default getRecentDocuments;
