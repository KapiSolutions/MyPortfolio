import React from "react";
import Typography from "@mui/material/Typography";
import { Box, Container, useTheme, useMediaQuery } from "@mui/material";
import type { Projects } from "@/utils/schema/project";
import MobileView from "./MobileView";
import DesktopView from "./DesktopView";
import TechCarousel from "./TechCarousel";
import { useRouter } from "next/router";
import { getTranslation, type Locale, type Tkey } from "@/utils/i18n";

type Props = {
  projects: Projects;
};

const ProjectsSection = ({ projects }: Props): JSX.Element => {
  const router = useRouter();
  const locale = router.locale as Locale;
  const t = (key: Tkey) => getTranslation(locale, key);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    defaultMatches: true,
  });

  return (
    <Box sx={{ width: "100vw", minHeight: "90vh" }} name="projects" component="section">
      <Container sx={{ minHeight: "70vh" }}>
        <Typography variant="h3" sx={{ textTransform: "uppercase", mb: isMobile ? 2 : 1, mt: 1 }}>
          {t("projects.section.header")}
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
