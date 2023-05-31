const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.MONGO_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const connectDB = async (): Promise<void> => {
  try {
    // Connect the client to the server
    await client.connect();
    // console.log("MongoDB connected");
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export { connectDB, client };
