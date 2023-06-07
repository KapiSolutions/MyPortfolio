import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { Typography, Container, Stack, Grid, Divider, Box, Button, useTheme, useMediaQuery } from "@mui/material";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ProjectItem from "@/components/admin/projects/ProjectItem";
import { useRouter } from "next/router";
import type { Locale } from "@/utils/interfaces/main";
import type { Projects } from "@/utils/schema/project";
import Link from "next/link";
import { connectDB, client } from "@/utils/mongodb";
import BreadCrumbs from "@/components/BreadCrumbs";
import { NextSeo } from "next-seo";

type Props = {
  projects: Projects;
};

export default function AdminProjectsPage({ projects }: Props): JSX.Element {
  const router = useRouter();
  const locale = (router.locale || "en") as Locale;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    defaultMatches: true,
  });

  const t = {
    en: {
      h1: "Menage projects",
      addButton: "Add New!",
      title: "Title",
      date: "Date",
      actions: "Actions",
      deleteButton: "Delete",
      editButton: "Edit",
    },
    pl: {
      h1: "Twoje projekty",
      addButton: "Dodaj nowy!",
      title: "Tytuł",
      date: "Data",
      actions: "Opcje",
    },
    default: {},
  };
  const breadcrumbs = [{ name: t[locale].h1, path: "/admin/projects" }];
  return (
    <>
      <NextSeo title={`JK Portfolio | ${t[locale].h1}`} nofollow={true} />

      <Box sx={{ mt: 5, ml: 2 }}>
        <BreadCrumbs items={breadcrumbs} />
      </Box>
      <Container>
        <Typography variant="h4" align={isMobile ? "center" : "left"}>
          {t[locale].h1}
        </Typography>
        <Box display="flex" justifyContent="flex-end" sx={{ mt: 4 }}>
          <Link href="/admin/projects/new#main">
            <Button variant="outlined" color="inherit" size="large" sx={{ width: isMobile ? "100%" : "auto" }}>
              <PostAddIcon sx={{ mr: 1 }} />
              {t[locale].addButton}
            </Button>
          </Link>
        </Box>

        {/* Title Bar */}
        <Grid container spacing={2} wrap="nowrap" sx={{ mt: 2 }}>
          <Grid item xs={9} sm={5} lg={9}>
            <Typography variant="body1">{t[locale].title}</Typography>
          </Grid>
          {isMobile ? null : (
            <Grid item sm={3} lg={1}>
              <Typography variant="body1">{t[locale].date}</Typography>
            </Grid>
          )}
          <Grid item xs={3} sm={4} lg={2}>
            <Box display="flex">
              <Typography variant="body1">{t[locale].actions}</Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Items */}
        <Stack direction="column" spacing={3} sx={{ mt: 2 }}>
          <Divider orientation="horizontal" flexItem />
          {projects.map((project, idx) => (
            <ProjectItem key={idx} project={project} />
          ))}
        </Stack>
      </Container>
    </>
  );
}

export const getServerSideProps = withPageAuthRequired({
  // withPageAuthRequired checks if the session is authenticated, if not then redirect to Auth0 login page
  async getServerSideProps(context) {
    const dbName = "Data";
    const projectsCollection = "projects";
    let sortedProjects = null;

    function parseDate(input: string) {
      const parts = input.match(/(\d+)/g);
      if (parts !== null && parts.length === 3) {
        const year = parseInt(parts[2], 10);
        const month = parseInt(parts[1], 10) - 1;
        const day = parseInt(parts[0], 10);
        return new Date(year, month, day).getTime();
      } else {
        return 0;
      }
    }
    try {
      // Connect to MongoDB
      await connectDB();
      // Access the specified database and collection
      const db = client.db(dbName);
      const collection = db.collection(projectsCollection);
      // Retrieve all documents in the collection
      const projects = await collection.find().toArray();
      // Sort documents by date
      sortedProjects = projects.sort(
        (a: { date: string }, b: { date: string }) => parseDate(b.date) - parseDate(a.date)
      );
    } catch (error) {
      console.log(error);
    } finally {
      // Close the MongoDB connection
      client.close();
    }
    return {
      props: {
        projects: JSON.parse(JSON.stringify(sortedProjects)),
      },
    };
  },
});
