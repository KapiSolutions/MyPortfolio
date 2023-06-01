import { NextApiRequest, NextApiResponse } from "next";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { connectDB, client } from "@/utils/mongodb";
import configTemplate from "@/schema/project";

async function handle(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === "POST") {
    const { schema } = configTemplate("en");
    try {
      // Connect to MongoDB
      await connectDB();

      // Access the database and collection
      const db = client.db("Data");
      const collection = db.collection("projects");

      // Extract data from the request body
      const { newProject } = req.body;
      // Validate incoming data
      await schema.validate(newProject);

      // Insert the document into the collection
      const result = await collection.insertOne(newProject);
      res.status(200).json(result);
    } catch (error) {
      console.error("Error uploading data:", error);
      res.status(500).json({ error: "Server error" });
    } finally {
      // Close the MongoDB connection
      client.close();
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}

// withApiAuthRequired checks if the session is authenticated, if yes then handle function is called
export default withApiAuthRequired(handle);
