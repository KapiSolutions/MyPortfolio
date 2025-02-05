import React, { useState } from "react";
import { Button, Stack } from "@mui/material";
import ProjectPaper from "../../ProjectPaper";
import type { Projects } from "@/utils/schema/project";
import { useRouter } from "next/router";
import { getTranslation, type Locale, type Tkey } from "@/utils/i18n";

type Props = {
  projects: Projects;
};

const MobileView = ({ projects }: Props): JSX.Element => {
  const router = useRouter();
  const locale = router.locale as Locale;
  const t = (key: Tkey) => getTranslation(locale, key);
  const initSlides = 3;
  const [howMany, setHowMany] = useState(initSlides);

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
        {howMany >= projects.length ? t("projects.mobile.hide") : t("projects.mobile.show-more")}
      </Button>
    </Stack>
  );
};

export default MobileView;
