import { MongoClient, ServerApiVersion } from "mongodb";
const uri = process.env.MONGO_URI || "";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const connectDB = async (): Promise<void> => {
  try {
    await client.connect();
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export { connectDB, client };
