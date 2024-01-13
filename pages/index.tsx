import React, { useEffect } from "react";
import { Stack } from "@mui/material";
import ProjectsSection from "@/components/sections/projects/ProjectsSection";
import carrier from "@/tmp/carrier.json";
import BookBoxSection from "@/components/sections/bookBox/BookBoxSection";
import CarrierSection from "@/components/sections/carrier/CarrierSection";
import { connectDB, client } from "@/utils/mongodb";
import type { Projects } from "@/utils/schema/project";
import type { Locale } from "@/utils/interfaces/main";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import WorkTogether from "@/components/sections/WorkTogether";

type Props = {
  projects: Projects;
};

export default function Home({ projects }: Props) {
  const router = useRouter();
  const locale = (router.locale || "pl") as Locale;
  useEffect(() => {
    // Prefetch the project pages
    router.prefetch("/projects/[pid]");
  }, [router]);

  const t = {
    en: {
      desc: "KapiSolutions is a Polish company founded in 2020. Our main goal is to meet the clients expectations by offering professional solutions in the field of design and production of devices and machines. As a company, we also specialize in designing web applications, 3D printing and widely understood automation. Thanks to our extensive experience in many industries and technologies, the quality of our products is at the highest level. We approach each client individually, correlating the requirements with our experience and creativity. The process of designing and implementing new solutions almost always encounters some difficulties, but these are not problems for us, but challenges that we take on with pleasure!",
    },
    pl: {
      desc: "Kapisolutions to polska firma założona w 2020r. Naszym głównym celem jest wychodzenie na przeciw oczekiwaniom rynkowym oferując profesjonalne rozwiązania z zakresu IT oraz mechatroniki. Jako firma specjalizujemy się również w projektowaniu aplikacji webowych, platform e-commerce, druku 3D oraz szeroko pojętej automatyce. Dzięki bogatemu doświadczeniu w wielu gałęziach przemysłu i technologii jakość naszych produktów plasuje się na najwyższym poziomie. Do każdego klienta podchodzimy indywidualnie korelując stawiane wymagania z naszym doświadczeniem i kreatywnością. Proces projektowania i wdrażania nowych rozwiązań niemal zawsze spotyka się z pewnymi trudnościami, lecz nie są to dla nas problemy, a wyzwania, które z przyjemnością podejmujemy!",
    },
    default:
      "Kapisolutions to polska firma założona w 2020r. Naszym głównym celem jest wychodzenie na przeciw oczekiwaniom rynkowym oferując profesjonalne rozwiązania z zakresu IT oraz mechatroniki. Jako firma specjalizujemy się również w projektowaniu aplikacji webowych, platform e-commerce, druku 3D oraz szeroko pojętej automatyce. Dzięki bogatemu doświadczeniu w wielu gałęziach przemysłu i technologii jakość naszych produktów plasuje się na najwyższym poziomie. Do każdego klienta podchodzimy indywidualnie korelując stawiane wymagania z naszym doświadczeniem i kreatywnością. Proces projektowania i wdrażania nowych rozwiązań niemal zawsze spotyka się z pewnymi trudnościami, lecz nie są to dla nas problemy, a wyzwania, które z przyjemnością podejmujemy!",
  };
  return (
    <>
      <NextSeo
        title="Kapisolutions"
        canonical={`https://www.kapisolutions.pl/${locale ? locale : "pl"}`}
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
            href: "https://www.kapisolutions.pl/pl",
          },
        ]}
        openGraph={{
          type: "website",
          url: `https://www.kapisolutions.pl/${locale ? locale : "pl"}`,
          title: "Kapisolutions",
          description: t[locale].desc,
          images: [
            {
              url: "https://storage.googleapis.com/portfolio-kapisolutions-storage/other/bookbox_library.jpg",
              width: 905,
              height: 1280,
              alt: "Bookbox Library - Kapisolutions",
            },
            {
              url: "https://www.example.ie/og-image-2.jpg",
              width: 1080,
              height: 600,
              alt: "Kapisolutions logo",
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
