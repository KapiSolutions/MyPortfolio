import React from "react";
import { useRouter } from "next/router";
import { Container, Typography } from "@mui/material";
import { Locale } from "@/interfaces/main";

const AboutMeSection = (): JSX.Element => {
  const router = useRouter();
  const locale = (router.locale || "en") as Locale;
  const t = {
    en: {
      h: "About Me Section",
    },
    pl: {
      h: "About Me Section",
    },
  };
  return (
    <Container >
      <Typography variant="h2">{t[locale]?.h}</Typography>
    </Container>
  );
};

export default AboutMeSection;
