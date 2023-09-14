import React from "react";
import Typography from "@mui/material/Typography";
import { Box, Container, useTheme, useMediaQuery } from "@mui/material";
import type { Projects } from "@/utils/schema/project";
import MobileView from "./MobileView";
import DesktopView from "./DesktopView";
import TechCarousel from "./TechCarousel";
import { useRouter } from "next/router";
import { Locale } from "@/utils/interfaces/main";

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
    default: {},
  };
  return (
    <Box sx={{ width: "100vw", minHeight: "90vh" }} name="projects" component="section">
      <Container sx={{ minHeight: "70vh" }}>
        <Typography variant="h3" sx={{ textTransform: "uppercase", mb: isMobile ? 2 : 1, mt: 1 }}>
          {t[locale].sectionName}
        </Typography>
        {projects.length > 0 ? (
          <Box>{isMobile ? <MobileView projects={projects} /> : <DesktopView projects={projects} />}</Box>
        ) : null}
      </Container>

      <TechCarousel />
    </Box>
  );
};

export default ProjectsSection;
