import ProjectTemplate from "@/components/admin/projects/ProjectTemplate";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { Typography, Box, Container, useTheme, useMediaQuery } from "@mui/material";
import type { Project } from "@/utils/schema/project";
import { connectDB, client } from "@/utils/mongodb";
import { ObjectId } from "mongodb";
import BreadCrumbs from "@/components/BreadCrumbs";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { getTranslation, type Locale, type Tkey } from "@/utils/i18n";

type Props = { project: Project | null };

export default function AdminNewProjectPage({ project }: Props): JSX.Element {
  const router = useRouter();
  const locale = router.locale as Locale;
  const t = (key: Tkey) => getTranslation(locale, key);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    defaultMatches: true,
  });

  const breadcrumbs = [
    { name: t("projects.manage.header"), path: "/admin/projects#main" },
    { name: project ? project.title[locale] : "404", path: `admin/projects/${project?._id}` },
  ];
  return (
    <>
      <NextSeo title={`Kapisolutions | ${t("project.edit.header")}`} nofollow={true} />

      <Box sx={{ mt: 5, ml: 2 }}>
        <BreadCrumbs items={breadcrumbs} />
      </Box>
      <Container>
        <Typography variant="h4" align={isMobile ? "center" : "left"}>
          {t("project.edit.header")}
        </Typography>
        {project ? <ProjectTemplate project={project} /> : t("project.not-found")}
      </Container>
    </>
  );
}

export const getServerSideProps = withPageAuthRequired({
  // withPageAuthRequired checks if the session is authenticated, if not then redirect to Auth0 login page
  async getServerSideProps(context) {
    const id: string | undefined = Array.isArray(context.params?.pid) ? context.params?.pid[0] : context.params?.pid;
    if (!id || !ObjectId.isValid(id)) {
      return {
        props: {
          project: null,
        },
      };
    }
    try {
      await connectDB();
      const db = client.db("Data");
      const collection = db.collection("projects");
      const project = await collection.findOne({ _id: new ObjectId(id) });
      return {
        props: {
          project: JSON.parse(JSON.stringify(project)),
        },
      };
    } catch (error) {
      console.log(error);
      return {
        props: {
          project: null,
        },
      };
    } finally {
      client.close();
    }
  },
});
