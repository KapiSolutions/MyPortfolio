import { NextApiRequest, NextApiResponse } from "next";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { connectDB, client } from "@/utils/mongodb";
import { ObjectId } from "mongodb";
import configTemplate from "@/schema/project";

async function handle(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === "PUT") {
    const { schema } = configTemplate("en");
    const { updates } = req.body;
    try {
      // Validate incoming data
      await schema.validate(updates);
      const docId = updates._id;
      // Validate the doc ID format
      if (!docId || !ObjectId.isValid(docId)) {
        res.status(400).json({ error: "Invalid document ID" });
        return;
      }
      // Connect to MongoDB
      await connectDB();
      // Access the database and collection
      const db = client.db("Data");
      const collection = db.collection("projects");

      // Get existing document by specified id
      const existingDocument = await collection.findOne({ _id: docId });
      if (!existingDocument) {
        return res.status(404).json({ message: "Document not found" });
      }

      // Find the fields that have new values and are different from the existing values
      const updatedFields = Object.entries(updates).reduce((acc: Record<string, any>, [key, value]) => {
        if (existingDocument[key] !== value) {
          acc[key] = value;
        }
        return acc;
      }, {});

      // Check if there is any difference between the existing document and the update
      if (Object.keys(updatedFields).length === 0) {
        return res.status(200).json({ message: "No changes to update" });
      }

      // Update the document with the updated fields
      const result = await collection.updateOne({ _id: docId }, { $set: updatedFields });
      if (result.modifiedCount === 1) {
        return res.status(200).json({ message: "Document updated successfully" });
      } else {
        return res.status(500).json({ message: "Failed to update document" });
      }
    } catch (error) {
      console.error("Error uploading data:", error);
      res.status(500).json({ error: "Server error" });
    } finally {
      // Close the MongoDB connection
      client.close();
    }
  } else {
    res.setHeader("Allow", "PUT");
    res.status(405).end("Method Not Allowed");
  }
}

// withApiAuthRequired checks if the session is authenticated, if yes then handle function is called
export default withApiAuthRequired(handle);
