import React, { useState } from "react";
import { Button, Container, Stack } from "@mui/material";
import ProjectPaper from "../../ProjectPaper";
import type { Projects } from "@/utils/schema/project";
import { useRouter } from "next/router";
import type { Locale } from "@/utils/interfaces/main";

//Define Types
type Props = {
  projects: Projects;
};

const MobileView = ({ projects }: Props): JSX.Element => {
  const router = useRouter();
  const locale = (router.locale || "en") as Locale;
  const initSlides = 3;
  const [howMany, setHowMany] = useState(initSlides);

  const t = {
    en: {
      showMore: "Show more",
      hide: "Hide",
    },
    pl: {
      showMore: "Więcej",
      hide: "Zwiń",
    },
  };

  return (
    <Stack spacing={2}>
      {projects.slice(0, howMany).map((project, index) => (
        <ProjectPaper project={project} key={index} />
      ))}

      <Button
        variant="text"
        color="inherit"
        onClick={() => setHowMany(howMany >= projects.length ? initSlides : howMany + 2)}
      >
        {howMany >= projects.length ? t[locale].hide : t[locale].showMore}
      </Button>
    </Stack>
  );
};

export default MobileView;
