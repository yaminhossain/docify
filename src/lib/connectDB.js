import { MongoClient, ServerApiVersion } from "mongodb";
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.9azss.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const collectionNames = {
  USERS: "users",
};
// =======This function returns a mongodb collection=========
export default function connectDB(collectionName) {
  return client.db(process.env.DATABASE_NAME).collection(collectionName);
}
