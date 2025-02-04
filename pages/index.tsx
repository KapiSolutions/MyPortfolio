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
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    router.prefetch("/projects/[pid]");
  }, [router]);

  const t = {
    en: {
      desc: "KapiSolutions is a Polish company founded in 2020. Our main goal is to meet the clients expectations by offering professional solutions in the field of design and production of devices and machines. As a company, we also specialize in designing web applications, 3D printing and widely understood automation. Thanks to our extensive experience in many industries and technologies, the quality of our products is at the highest level. We approach each client individually, correlating the requirements with our experience and creativity. The process of designing and implementing new solutions almost always encounters some difficulties, but these are not problems for us, but challenges that we take on with pleasure!",
    },
    pl: {
      desc: "Kapisolutions to polska firma założona w 2020r. Naszym głównym celem jest wychodzenie na przeciw oczekiwaniom rynkowym oferując profesjonalne rozwiązania z zakresu IT oraz mechatroniki. Jako firma specjalizujemy się również w projektowaniu aplikacji webowych, platform e-commerce, druku 3D oraz szeroko pojętej automatyce. Dzięki bogatemu doświadczeniu w wielu gałęziach przemysłu i technologii jakość naszych produktów plasuje się na najwyższym poziomie. Do każdego klienta podchodzimy indywidualnie korelując stawiane wymagania z naszym doświadczeniem i kreatywnością. Proces projektowania i wdrażania nowych rozwiązań niemal zawsze spotyka się z pewnymi trudnościami, lecz nie są to dla nas problemy, a wyzwania, które z przyjemnością podejmujemy!",
    },
  };
  return (
    <>
      <NextSeo
        title="Kapisolutions"
        canonical={`${baseUrl}/${locale}`}
        description={t[locale].desc}
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
          description: t[locale].desc,
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
