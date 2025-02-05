import { GetStaticPropsContext, GetStaticPathsContext } from "next";
import { Container, Box } from "@mui/material";
import type { Project } from "@/utils/schema/project";
import { connectDB, client } from "@/utils/mongodb";
import { ObjectId } from "mongodb";
import { useRouter } from "next/router";
import ProjectOverview from "@/components/ProjectOverview";
import BreadCrumbs from "@/components/BreadCrumbs";
import { NextSeo, ArticleJsonLd } from "next-seo";
import { getTranslation, type Tkey, type Locale } from "@/utils/i18n";

type Props = { project: Project | null; prevID: string; nextID: string };

export default function ProjectOverviewPage({ project, prevID, nextID }: Props): JSX.Element {
  const router = useRouter();
  const locale = router.locale as Locale;
  const t = (key: Tkey) => getTranslation(locale, key);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const breadcrumbs = [{ name: project ? project.title[locale] : "404", path: `/projects/${project?._id}` }];
  return (
    <>
      {project ? (
        <>
          <NextSeo
            title={`Kapisolutions | ${project.title[locale]}`}
            canonical={`${baseUrl}/${locale}/projects/${project._id}`}
            description={project.description[locale]}
            languageAlternates={[
              {
                hrefLang: "en",
                href: `${baseUrl}/projects/${project._id}`,
              },
              {
                hrefLang: "pl",
                href: `${baseUrl}/pl/projects/${project._id}`,
              },
              {
                hrefLang: "x-default",
                href: `${baseUrl}/projects/${project._id}`,
              },
            ]}
          />

          <ArticleJsonLd
            type="BlogPosting"
            url={`${baseUrl}/${locale}${router.asPath}`}
            title={project.title[locale]}
            images={[project.image]}
            datePublished={project.date}
            dateModified={project.date}
            authorName="Jakub Kapturkiewicz"
            description={project.description[locale]}
          />
        </>
      ) : (
        <NextSeo title={"Kapisolutions | 404"} />
      )}

      <Box sx={{ mt: 5, ml: 2 }}>
        <BreadCrumbs items={breadcrumbs} />
      </Box>
      <Container maxWidth="md">
        {project ? <ProjectOverview project={project} prevID={prevID} nextID={nextID} /> : t("project.not-found")}
      </Container>
    </>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const id = context.params?.pid;
  const defProps = { project: null, prevID: "", nextID: "" };

  if (!id || !ObjectId.isValid(id as string)) {
    return { props: defProps, revalidate: false };
  }
  try {
    await connectDB();
    const db = client.db("Data");
    const collection = db.collection("projects");
    const project = await collection.findOne({ _id: new ObjectId(id as string) });

    if (!project) {
      return { props: defProps, revalidate: false };
    }

    const projects = await collection.find().toArray();
    // Sort projects by date
    const sortedProjects = projects.sort((a, b) => {
      const dateA = new Date(a.date.split(".").reverse().join("-"));
      const dateB = new Date(b.date.split(".").reverse().join("-"));
      return dateB.getTime() - dateA.getTime();
    });

    // find previous and next id of the project (for navigation)
    const actID = sortedProjects.findIndex((item) => item._id?.toString() === id);
    const prevID = actID > 0 ? sortedProjects[actID - 1]._id : sortedProjects[sortedProjects.length - 1]._id;
    const nextID = actID < sortedProjects.length - 1 ? sortedProjects[actID + 1]._id : sortedProjects[0]._id;

    return {
      props: {
        project: JSON.parse(JSON.stringify(project)),
        prevID: prevID.toString(),
        nextID: nextID.toString(),
      },
      revalidate: false, //on demand revalidation
    };
  } catch (error) {
    console.log(error);
    return { props: defProps, revalidate: false };
  }
}

export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  try {
    await connectDB();
    const db = client.db("Data");
    const collection = db.collection("projects");
    const projects = await collection.find().toArray();

    const documentIds = projects.map((doc) => doc._id.toString());
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
  } catch (error) {
    console.error("Error generating static paths:", error);
    return {
      paths: [],
      fallback: "blocking",
    };
  }
}
