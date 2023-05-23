import Head from "next/head";
import { Stack } from "@mui/material";
import ProjectsSection from "@/components/sections/projects/ProjectsSection";
import projects from "@/tmp/projects.json";
import carrier from "@/tmp/carrier.json";
import BookBoxSection from "@/components/sections/bookBox/BookBoxSection";
import CarrierSection from "@/components/sections/carrier/CarrierSection";
import AboutMeSection from "@/components/sections/aboutMe/AboutMeSection";

export default function Home() {
  return (
    <>
      <Head>
        <title>Portfolio</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Stack direction="column" spacing={3} justifyContent="center" alignItems="center" sx={{ pt: 2, pb: 4}} >
        <ProjectsSection projects={projects}/>
        <BookBoxSection />
        <CarrierSection carrier={carrier}/>
        <AboutMeSection />
      </Stack>
    </>
  );
}
