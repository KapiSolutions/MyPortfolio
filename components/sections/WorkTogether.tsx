import React from "react";
import { useRouter } from "next/router";
import { Container, Typography, Stack, Box, useTheme, useMediaQuery, Divider } from "@mui/material";
import { Locale } from "@/utils/interfaces/main";
import Link from "next/link";

const WorkTogether = (): JSX.Element => {
  const router = useRouter();
  const locale = (router.locale || "en") as Locale;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    defaultMatches: true,
  });
  const t = {
    en: {
      h1: "Want to work together?",
      p: "Feel free to reach out at",
    },
    pl: {
      h1: "Zapraszam do współpracy",
      p: "Skontaktuj się poprzez",
    },
  };
  const gradient = {
    backgroundImage: theme.palette.mode === "light" ? "linear-gradient(45deg, #0a0a0a, #ffffff)" : "linear-gradient(45deg, #ffffff, #0a0a0a)",
    backgroundSize: "150%",
    backgroundRepeat: "repeat",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    MozBackgroundClip: "text",
    MozTextFillColor: "transparent",
  };
  return (
    <Container name="contactSection">
      <Stack spacing={8} alignItems="center" justifyContent="center" sx={{ height: "90vh" }}>
        <Typography
          variant="h2"
          align="center"
          sx={{ textTransform: "uppercase", fontWeight: "bold", fontSize: isMobile ? "11vw" : "auto" }}
          style={gradient}
        >
          {t[locale].h1}
        </Typography>
        <Stack spacing={2} alignItems="center" justifyContent="center">
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            {t[locale].p}
          </Typography>
          <Link href="mailto:biuro@kapisolutions.pl">
            <Typography variant="h5" sx={{ }}>
              biuro@kapisolutions.pl
            </Typography>
          </Link>
        </Stack>
      </Stack>
    </Container>
  );
};

export default WorkTogether;
