import ProjectTemplate from "@/components/admin/projects/ProjectTemplate";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { Typography, Container, useTheme, useMediaQuery } from "@mui/material";
import type { Project } from "@/schema/project";
import type { Locale } from "@/interfaces/main";
import { connectDB, client } from "@/utils/mongodb";
import { ObjectId } from "mongodb";

// Define types
type Props = { project: Project | null };

export default function AdminNewProjectPage({ project }: Props): JSX.Element {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    defaultMatches: true,
  });
  return (
    <Container>
      <Typography variant="h4" align={isMobile ? "center" : "left"}>
        Edit Project
      </Typography>
      {project ? <ProjectTemplate project={project} /> : null}
    </Container>
  );
}

export const getServerSideProps = withPageAuthRequired({
  // withPageAuthRequired checks if the session is authenticated, if not then redirect to Auth0 login page
  async getServerSideProps(context) {
    const dbName = "Data";
    const projectsCollection = "projects";
    let project = null;
    
    const productName = context.params?.pid ? context.params?.pid.toString().replaceAll("-", " ") : "";
    const { id }: { id?: string } = context.query;
    if (id && ObjectId.isValid(id)) {
      try {
        // Connect to MongoDB
        await connectDB();
        // Access the specified database and collection
        const db = client.db(dbName);
        const collection = db.collection(projectsCollection);
        // Retrieve all documents in the collection
        project = await collection.findOne({ _id: new ObjectId(id) });
      } catch (error) {
        console.log(error);
      }
    }

    return {
      props: {
        project: JSON.parse(JSON.stringify(project)),
      },
    };
  },
});
