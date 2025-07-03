"use server";

import connectDB, { collectionNames } from "./connectDB";

const getSharedDocuments = async (email, limit) => {
  try {
    if (!email) return [];
    const documentCOllection = connectDB(collectionNames.DOCUMENTS);
    const sharedDocs = await documentCOllection
      .find({ owners: email })
      .limit(limit)
      .sort({ _id: -1 })
      .toArray();
    return sharedDocs;
  } catch (error) {
    console.error("A database error occurred during getting shared documents");
  }
  return;
};

export default getSharedDocuments;
