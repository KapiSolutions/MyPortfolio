import { NextApiRequest, NextApiResponse } from "next";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { connectDB, client } from "@/utils/mongodb";

async function handle(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === "GET") {
    // Extract the the request query parameters
    const { dbName, collectionName }: { dbName?: string; collectionName?: string } = req.query;
    // Validate the database name and collection name
    if (!dbName || !collectionName) {
      res.status(400).json({ error: "Invalid parameters" });
      return;
    }

    try {
      // Connect to MongoDB
      await connectDB();
      // Access the specified database and collection
      const db = client.db(dbName);
      const collection = db.collection(collectionName);
      // Retrieve all documents in the collection
      const documents = await collection.find().toArray();

      if (documents.length === 0) {
        res.status(404).json({ error: "Documents not found" });
        return;
      }

      res.status(200).json(documents);
    } catch (error) {
      console.error("Error retrieving documents:", error);
      res.status(500).json({ error: "Server error" });
    } finally {
      // Close the MongoDB connection
      client.close();
    }
  } else {
    res.setHeader("Allow", "GET");
    res.status(405).end("Method Not Allowed");
  }
}

// withApiAuthRequired checks if the session is authenticated, if yes then handle function is called
export default withApiAuthRequired(handle);
