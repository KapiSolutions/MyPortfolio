import { GetStaticPropsContext, GetStaticPathsContext } from "next";
import { Container, Box } from "@mui/material";
import type { Locale } from "@/utils/interfaces/main";
import type { Project } from "@/utils/schema/project";
import { connectDB, client } from "@/utils/mongodb";
import { ObjectId } from "mongodb";
import { useRouter } from "next/router";
import ProjectOverview from "@/components/ProjectOverview";
import BreadCrumbs from "@/components/BreadCrumbs";
import { NextSeo, ArticleJsonLd } from "next-seo";

// Define types
type Props = { project: Project | null; prevID: string; nextID: string };

export default function ProjectOverviewPage({ project, prevID, nextID }: Props): JSX.Element {
  const router = useRouter();
  const locale = (router.locale || "en") as Locale;
  const breadcrumbs = [{ name: project ? project.title[locale] : "404", path: `/projects/${project?._id}` }];
  return (
    <>
      <NextSeo
        title={`Kapisolutions | ${project?.title[locale]}`}
        canonical={`https://www.kapisolutions.pl/${locale}`}
        description={project?.description[locale]}
        languageAlternates={[
          {
            hrefLang: "en",
            href: `https://www.kapisolutions.pl/en/projects/${project?._id}`,
          },
          {
            hrefLang: "pl",
            href: `https://www.kapisolutions.pl/pl/projects/${project?._id}`,
          },
          {
            hrefLang: "x-default",
            href: `https://www.kapisolutions.pl/projects/${project?._id}`,
          },
        ]}
      />
      <ArticleJsonLd
        type="BlogPosting"
        url={`https://www.kapisolutions.pl/${locale}${router.asPath}`}
        title={project ? project.title[locale] : "Title"}
        images={[project ? project.image : ""]}
        datePublished={project ? project.date : "2023-05-05T09:00:00+08:00"}
        dateModified={project ? project.date : "2023-05-05T09:00:00+08:00"}
        authorName="Jakub Kapturkiewicz"
        description={project ? project.description[locale] : ""}
      />
      <Box sx={{ mt: 5, ml: 2 }}>
        <BreadCrumbs items={breadcrumbs} />
      </Box>
      <Container maxWidth="md">
        {project ? <ProjectOverview project={project} prevID={prevID} nextID={nextID} /> : "Project doesnt exist."}
      </Container>
    </>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const dbName = "Data";
  const projectsCollection = "projects";
  const id = context.params?.pid ? context.params?.pid : "";
  let project = null;
  let sortedProjects = null;
  let prevID = "";
  let nextID = "";

  if (id && ObjectId.isValid(id as string)) {
    try {
      // Connect to MongoDB
      await connectDB();
      // Access the specified database and collection
      const db = client.db(dbName);
      const collection = db.collection(projectsCollection);
      // Retrieve document by ID in the collection
      project = await collection.findOne({ _id: new ObjectId(id as string) });
      // Retrieve all projects from the collection
      const projects = await collection.find().toArray();
      // Sort projects by date
      sortedProjects = projects.sort(
        (a: { realizationDate: string }, b: { realizationDate: string }) =>
          parseDate(b.realizationDate) - parseDate(a.realizationDate)
      );
      // find previous and next id of the project
      const actID = sortedProjects.findIndex((item: Project) => item._id?.toString() === id);
      prevID = actID > 0 ? sortedProjects[actID - 1]._id : sortedProjects[sortedProjects.length - 1]._id;
      nextID = actID < sortedProjects.length - 1 ? sortedProjects[actID + 1]._id : sortedProjects[0]._id;
    } catch (error) {
      console.log(error);
    }
  }

  function parseDate(input: string) {
    return new Date(input).getTime();
  }

  return {
    props: {
      project: JSON.parse(JSON.stringify(project)),
      prevID: prevID.toString(),
      nextID: nextID.toString(),
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
