import { GetStaticPropsContext, GetStaticPathsContext } from "next";
import { Container } from "@mui/material";
import type { Project } from "@/schema/project";
import { connectDB, client } from "@/utils/mongodb";
import { ObjectId } from "mongodb";
import ProjectOverview from "@/components/ProjectOverview";

// Define types
type Props = { project: Project | null };

export default function ProjectOverviewPage({ project }: Props): JSX.Element {
  return <Container maxWidth="md">{project ? <ProjectOverview project={project} /> : "Project doesnt exist."}</Container>;
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const dbName = "Data";
  const projectsCollection = "projects";
  let project = null;
  const id = context.params?.pid ? context.params?.pid : "";

  if (id && ObjectId.isValid(id as string)) {
    try {
      // Connect to MongoDB
      await connectDB();
      // Access the specified database and collection
      const db = client.db(dbName);
      const collection = db.collection(projectsCollection);
      // Retrieve all documents in the collection
      project = await collection.findOne({ _id: new ObjectId(id as string) });
    } catch (error) {
      console.log(error);
    }
  }

  return {
    props: {
      project: JSON.parse(JSON.stringify(project)),
    },
    revalidate: false, //on demand revalidation
  };
}

export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  const dbName = "Data";
  const projectsCollection = "projects";
  let documentIds = [];
  try {
    // Connect to MongoDB
    await connectDB();
    // Access the specified database and collection
    const db = client.db(dbName);
    const collection = db.collection(projectsCollection);
    // Retrieve all documents from the collection
    const documents = await collection.find().toArray();

    // Extract the IDs of each document
    documentIds = documents.map((doc: { _id: string }) => doc._id.toString());
  } catch (error) {
    console.log(error);
  }
  return {
    paths: documentIds.flatMap((doc: string) => {
      return (locales ?? []).map((locale) => {
        return {
          params: { pid: doc },
          locale: locale,
        };
      });
    }),
    fallback: "blocking",
  };
}
