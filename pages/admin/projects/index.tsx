import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { Typography, Container, Stack, Grid, Divider, Box, Button, useTheme, useMediaQuery } from "@mui/material";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ProjectItem from "@/components/admin/projects/ProjectItem";
import { useRouter } from "next/router";
import type { Projects } from "@/utils/schema/project";
import Link from "next/link";
import { connectDB, client } from "@/utils/mongodb";
import BreadCrumbs from "@/components/BreadCrumbs";
import { NextSeo } from "next-seo";
import { getTranslation, type Locale, type Tkey } from "@/utils/i18n";

type Props = {
  projects: Projects;
};

export default function AdminProjectsPage({ projects }: Props): JSX.Element {
  const router = useRouter();
  const locale = router.locale as Locale;
  const t = (key: Tkey) => getTranslation(locale, key);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    defaultMatches: true,
  });

  const breadcrumbs = [{ name: t("projects.manage.header"), path: "/admin/projects" }];
  return (
    <>
      <NextSeo title={`Kapisolutions | ${t("projects.manage.header")}`} nofollow={true} />

      <Box sx={{ mt: 5, ml: 2 }}>
        <BreadCrumbs items={breadcrumbs} />
      </Box>
      <Container>
        <Typography variant="h4" align={isMobile ? "center" : "left"}>
          {t("projects.manage.header")}
        </Typography>
        <Box display="flex" justifyContent="flex-end" sx={{ mt: 4 }}>
          <Link href="/admin/projects/new#main">
            <Button variant="outlined" color="inherit" size="large" sx={{ width: isMobile ? "100%" : "auto" }}>
              <PostAddIcon sx={{ mr: 1 }} />
              {t("projects.manage.add-new")}
            </Button>
          </Link>
        </Box>

        {/* Title Bar */}
        <Grid container spacing={2} wrap="nowrap" sx={{ mt: 2 }}>
          <Grid item xs={9} sm={5} lg={9}>
            <Typography variant="body1">{t("projects.manage.title")}</Typography>
          </Grid>
          {isMobile ? null : (
            <Grid item sm={3} lg={1}>
              <Typography variant="body1">{t("projects.manage.date")}</Typography>
            </Grid>
          )}
          <Grid item xs={3} sm={4} lg={2}>
            <Box display="flex">
              <Typography variant="body1">{t("projects.manage.actions")}</Typography>
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
    try {
      await connectDB();
      const db = client.db("Data");
      const collection = db.collection("projects");

      const projects = await collection.find().toArray();
      // Sort projects by date
      const sortedProjects = projects.sort((a, b) => {
        const dateA = new Date(a.date.split(".").reverse().join("-"));
        const dateB = new Date(b.date.split(".").reverse().join("-"));
        return dateB.getTime() - dateA.getTime();
      });
      return {
        props: {
          projects: JSON.parse(JSON.stringify(sortedProjects)),
        },
      };
    } catch (error) {
      console.log(error);
      return {
        props: {
          projects: null,
        },
      };
    } finally {
      await client.close();
    }
  },
});
