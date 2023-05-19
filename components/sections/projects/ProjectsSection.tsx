import React from "react";
import Typography from "@mui/material/Typography";
import { Box, Container, useTheme, useMediaQuery } from "@mui/material";
import { Projects } from "@/interfaces/projects";
import MobileView from "./MobileView";
import DesktopView from "./DesktopView";
import TechCarousel from "./TechCarousel";
import { useRouter } from "next/router";
import { Locale } from "@/interfaces/main";

//Define Types
type Props = {
  projects: Projects;
};

const ProjectsSection = ({ projects }: Props): JSX.Element => {
  const router = useRouter();
  const locale = (router.locale || "en") as Locale;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    defaultMatches: true,
  });

  const t = {
    en: {
      sectionName: "Projects",
    },
    pl: {
      sectionName: "Projekty",
    },
    default: {}
  };
  return (
    <Box sx={{ width: "100vw", minHeight: "90vh" }} name="projectsSection" component="section">
      <Container sx={{ minHeight: "70vh" }}>
        <Typography variant="h3" sx={{ mb: 1, mt: 1 }}>
          {t[locale].sectionName}
        </Typography>
        <Box>{isMobile ? <MobileView projects={projects} /> : <DesktopView projects={projects} />}</Box>
      </Container>

      <TechCarousel />
    </Box>
  );
};

export default ProjectsSection;
