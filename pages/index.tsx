import React, { useEffect } from "react";
import { Stack, Box } from "@mui/material";
import ProjectsSection from "@/components/sections/projects/ProjectsSection";
import carrier from "@/tmp/carrier.json";
import BookBoxSection from "@/components/sections/bookBox/BookBoxSection";
import CarrierSection from "@/components/sections/carrier/CarrierSection";
// import AboutMeSection from "@/components/sections/aboutMe/AboutMeSection";
import { connectDB, client } from "@/utils/mongodb";
import type { Projects } from "@/utils/schema/project";
import type { Locale } from "@/utils/interfaces/main";
import BreadCrumbs from "@/components/BreadCrumbs";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import WorkTogether from "@/components/sections/WorkTogether";

type Props = {
  projects: Projects;
};
export default function Home({ projects }: Props) {
  const router = useRouter();
  const locale = (router.locale || "en") as Locale;
  useEffect(() => {
    // Prefetch the project pages
    router.prefetch("/projects/[pid]");
  }, [router]);

  const t = {
    en: {
      desc: "Gain insight into my recent projects and discover how I've combined my expertise in both software development and mechatronics to deliver reliable and cutting-edge solutions.",
    },
    pl: {
      desc: "Zapoznaj się z moimi ostatnimi projektami i odkryj, w jaki sposób połączyłem swoją wiedzę z zakresu tworzenia oprogramowania i mechatroniki, aby dostarczać niezawodne, najnowocześniejsze rozwiązania.",
    },
    default: {},
  };
  return (
    <>
      <NextSeo
        title="Kapisolutions"
        canonical={`https://www.kapisolutions.pl/${locale}`}
        description={t[locale].desc}
        languageAlternates={[
          {
            hrefLang: "en",
            href: "https://www.kapisolutions.pl/en",
          },
          {
            hrefLang: "pl",
            href: "https://www.kapisolutions.pl/pl",
          },
          {
            hrefLang: "x-default",
            href: "https://www.kapisolutions.pl",
          },
        ]}
        additionalMetaTags={[
          {
            name: "google-site-verification",
            content: "ZLBkwVLkikeGku687CjdWRlUAjhiD51qPa03EFFlH9k",
          },
        ]}
      />
      <Box sx={{ ml: 2 }}>
        <BreadCrumbs items={null} />
      </Box>
      <Stack direction="column" spacing={5} justifyContent="center" alignItems="center">
        <ProjectsSection projects={projects} />
        <BookBoxSection />
        <CarrierSection carrier={carrier} />
        {/* <AboutMeSection /> */}
        <WorkTogether />
      </Stack>
    </>
  );
}

export async function getStaticProps() {
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
    sortedProjects = projects.sort((a: { date: string }, b: { date: string }) => parseDate(b.date) - parseDate(a.date));
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
    revalidate: false, //on demand revalidation
  };
}
