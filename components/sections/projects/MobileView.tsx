import React, { useState } from "react";
import { Grid, Button, Container } from "@mui/material";
import ProjectPaper from "../../ProjectPaper";
import { Projects } from "@/interfaces/projects";
import { useRouter } from "next/router";
import { Locale } from "@/interfaces/main";

//Define Types
type Props = {
  projects: Projects;
};

const MobileView = ({ projects }: Props): JSX.Element => {
  const router = useRouter();
  const locale = (router.locale || "en") as Locale;
  const [howMany, setHowMany] = useState(3);

  const t = {
    en: {
      showMore: "Show more",
    },
    pl: {
      showMore: "Więcej",
    },
  };
  return (
    <Grid container spacing={2}>
      {projects.slice(0, howMany).map((project, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <ProjectPaper project={project} />
        </Grid>
      ))}
      <Container sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Button
          variant="text"
          color="inherit"
          onClick={() => setHowMany(howMany >= projects.length ? projects.length : howMany + 2)}
        >
          {t[locale].showMore}
        </Button>
      </Container>
    </Grid>
  );
};

export default MobileView;
