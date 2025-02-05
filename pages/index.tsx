import React, { useEffect } from "react";
import { Stack } from "@mui/material";
import ProjectsSection from "@/components/sections/projects/ProjectsSection";
import carrier from "@/tmp/carrier.json";
import BookBoxSection from "@/components/sections/bookBox/BookBoxSection";
import CarrierSection from "@/components/sections/carrier/CarrierSection";
import { connectDB, client } from "@/utils/mongodb";
import type { Projects } from "@/utils/schema/project";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import WorkTogether from "@/components/sections/WorkTogether";
import { getTranslation, Locale, Tkey } from "@/utils/i18n";

type Props = {
  projects: Projects;
};

export default function Home({ projects }: Props) {
  const router = useRouter();
  const locale = router.locale as Locale;
  const t = (key: Tkey) => getTranslation(locale, key);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    router.prefetch("/projects/[pid]");
  }, [router]);

  return (
    <>
      <NextSeo
        title="Kapisolutions"
        canonical={`${baseUrl}/${locale}`}
        description={t("main.desc")}
        languageAlternates={[
          {
            hrefLang: "en",
            href: `${baseUrl}`,
          },
          {
            hrefLang: "pl",
            href: `${baseUrl}/pl`,
          },
          {
            hrefLang: "x-default",
            href: `${baseUrl}`,
          },
        ]}
        openGraph={{
          type: "website",
          url: `${baseUrl}/${locale}`,
          title: "Kapisolutions",
          description: t("main.desc"),
          images: [
            {
              url: "https://storage.googleapis.com/portfolio-kapisolutions-storage/other/bookbox_library.jpg",
              width: 905,
              height: 1280,
              alt: "Bookbox Library - Kapisolutions",
            },
          ],
        }}
      />

      <Stack direction="column" spacing={5} justifyContent="center" alignItems="center" sx={{ mt: 2 }}>
        <ProjectsSection projects={projects} />
        <BookBoxSection />
        <CarrierSection carrier={carrier} />
        <WorkTogether />
      </Stack>
    </>
  );
}

export const getStaticProps = async () => {
  try {
    await connectDB();
    const db = client.db("Data");
    const collection = db.collection("projects");

    const projects = await collection.find({}).toArray();

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
      revalidate: false,
    };
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return {
      props: {
        projects: [],
      },
      revalidate: false,
    };
  } finally {
    await client.close();
  }
};
