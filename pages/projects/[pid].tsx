import { GetStaticPropsContext, GetStaticPathsContext } from "next";
import { Container, Box } from "@mui/material";
import type { Locale } from "@/interfaces/main";
import type { Project } from "@/schema/project";
import { connectDB, client } from "@/utils/mongodb";
import { ObjectId } from "mongodb";
import { useRouter } from "next/router";
import ProjectOverview from "@/components/ProjectOverview";
import BreadCrumbs from "@/components/BreadCrumbs";
import { NextSeo, ArticleJsonLd } from "next-seo";

// Define types
type Props = { project: Project | null };

export default function ProjectOverviewPage({ project }: Props): JSX.Element {
  const router = useRouter();
  const locale = (router.locale || "en") as Locale;
  const breadcrumbs = [{ name: project ? project.title[locale] : "404", path: `/projects/${project?._id}` }];
  return (
    <>
      <NextSeo
        title={`JK Portfolio | ${project?.title[locale]}`}
        canonical={`https://www.brightlightgypsy.pl/${locale}`}
        description={project?.description[locale]}
        languageAlternates={[
          {
            hrefLang: "en",
            href: `https://kapisolutions.vercel.app/en/projects/${project?._id}`,
          },
          {
            hrefLang: "pl",
            href: `https://kapisolutions.vercel.app/pl/projects/${project?._id}`,
          },
          {
            hrefLang: "x-default",
            href: `https://kapisolutions.vercel.app/projects/${project?._id}`,
          },
        ]}
      />
      <ArticleJsonLd
        type="BlogPosting"
        url={`https://kapisolutions.vercel.app/${locale}${router.asPath}`}
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
      <Container maxWidth="md">{project ? <ProjectOverview project={project} /> : "Project doesnt exist."}</Container>
    </>
  );
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
