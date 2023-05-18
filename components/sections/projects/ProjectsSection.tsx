import React from "react";
import Typography from "@mui/material/Typography";
import { Box, Container, useTheme, useMediaQuery } from "@mui/material";
import { Projects } from "@/interfaces/projects";
import MobileView from "./MobileView";
import DesktopView from "./DesktopView";
import TechCarousel from "./TechCarousel";

//Define Types
type Props = {
  projects: Projects;
};

const ProjectsSection = ({ projects }: Props): JSX.Element => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    defaultMatches: true,
  });

  return (
    <Box sx={{ width: "100vw", minHeight: "90vh" }} name="projectsSection" component="section">
      <Container sx={{ minHeight: "70vh" }}>
        <Typography variant="h3" sx={{ mb: 1 }}>
          <Typography variant="h4" component="span" color="text.disabled">
            my
          </Typography>
          Works
        </Typography>
        <Box>{isMobile ? <MobileView projects={projects} /> : <DesktopView projects={projects} />}</Box>
      </Container>

      <TechCarousel />
    </Box>
  );
};

export default ProjectsSection;
