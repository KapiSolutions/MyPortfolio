import { NextApiRequest, NextApiResponse } from "next";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { connectDB, client } from "@/utils/mongodb";
import { ObjectId } from "mongodb";

async function handle(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === "GET") {
    // Extract the the request query parameters
    const { dbName, collectionName, id }: { dbName?: string; collectionName?: string; id?: string } = req.query;
    // Validate the database name, collection name, and ID format
    if (!dbName || !collectionName || !id || !ObjectId.isValid(id)) {
      res.status(400).json({ error: "Invalid parameters" });
      return;
    }

    try {
      // Connect to MongoDB
      await connectDB();
      // Access the specified database and collection
      const db = client.db(dbName);
      const collection = db.collection(collectionName);
      // Find the document by ID
      const document = await collection.findOne({ _id: new ObjectId(id) });

      if (!document) {
        res.status(404).json({ error: "Document not found" });
        return;
      }

      res.status(200).json(document);
    } catch (error) {
      console.error("Error retrieving document:", error);
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
