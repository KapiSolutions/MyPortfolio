import Head from "next/head";
import React, { useEffect } from "react";
import { GetStaticPropsContext } from "next";
import { Stack, Box } from "@mui/material";
import ProjectsSection from "@/components/sections/projects/ProjectsSection";
import carrier from "@/tmp/carrier.json";
import BookBoxSection from "@/components/sections/bookBox/BookBoxSection";
import CarrierSection from "@/components/sections/carrier/CarrierSection";
import AboutMeSection from "@/components/sections/aboutMe/AboutMeSection";
import { connectDB, client } from "@/utils/mongodb";
import type { Projects } from "@/utils/schema/project";
import type { Locale } from "@/utils/interfaces/main";
import BreadCrumbs from "@/components/BreadCrumbs";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";

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
        title="JK Portfolio"
        canonical={`https://www.brightlightgypsy.pl/${locale}`}
        description={t[locale].desc}
        languageAlternates={[
          {
            hrefLang: "en",
            href: "https://kapisolutions.vercel.app/en",
          },
          {
            hrefLang: "pl",
            href: "https://kapisolutions.vercel.app/pl",
          },
          {
            hrefLang: "x-default",
            href: "https://kapisolutions.vercel.app",
          },
        ]}
      />
      <Box sx={{ ml: 2 }}>
        <BreadCrumbs items={null} />
      </Box>
      <Stack direction="column" spacing={3} justifyContent="center" alignItems="center">
        <ProjectsSection projects={projects} />
        <BookBoxSection />
        <CarrierSection carrier={carrier} />
        <AboutMeSection />
      </Stack>
    </>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  // Get all products
  const dbName = "Data";
  const projectsCollection = "projects";
  const carrierCollection = "carrier";
  let projects = null;

  try {
    // Connect to MongoDB
    await connectDB();
    // Access the specified database and collection
    const db = client.db(dbName);
    const collection = db.collection(projectsCollection);
    // Retrieve all documents in the collection
    projects = await collection.find().toArray();
  } catch (error) {
    console.log(error);
  }
  return {
    props: {
      projects: JSON.parse(JSON.stringify(projects)),
    },
    revalidate: false, //on demand revalidation
  };
}
