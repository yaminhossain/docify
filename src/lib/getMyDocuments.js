"use server";

import connectDB, { collectionNames } from "./connectDB";

const getMyDocuments = async (email, limit) => {
  try {
    const documentCOllection = connectDB(collectionNames.DOCUMENTS);
    const myDocs = await documentCOllection
      .find({ author: email })
      .limit(limit)
      .sort({ _id: -1 })
      .toArray();
    return myDocs;
  } catch (error) {
    console.error("A database error occurred during getting my documents");
  }
  return;
};

export default getMyDocuments;
