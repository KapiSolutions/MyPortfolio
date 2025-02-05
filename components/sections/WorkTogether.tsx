import React from "react";
import { useRouter } from "next/router";
import { Container, Typography, Stack, useTheme, useMediaQuery } from "@mui/material";
import { getTranslation, type Locale, type Tkey } from "@/utils/i18n";
import Link from "next/link";

const WorkTogether = (): JSX.Element => {
  const router = useRouter();
  const locale = router.locale as Locale;
  const t = (key: Tkey) => getTranslation(locale, key);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    defaultMatches: true,
  });

  const gradient = {
    backgroundImage:
      theme.palette.mode === "light"
        ? "linear-gradient(45deg, #0a0a0a, #ffffff)"
        : "linear-gradient(45deg, #ffffff, #0a0a0a)",
    backgroundSize: "150%",
    backgroundRepeat: "repeat",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    MozBackgroundClip: "text",
    MozTextFillColor: "transparent",
  };
  return (
    <Container name="contact" component="section">
      <Stack spacing={8} alignItems="center" justifyContent="center" sx={{ height: "90vh" }}>
        <Typography
          variant="h2"
          align="center"
          sx={{ textTransform: "uppercase", fontWeight: "bold", fontSize: isMobile ? "11vw" : "auto" }}
          style={gradient}
        >
          {t("contact.header")}
        </Typography>
        <Stack spacing={2} alignItems="center" justifyContent="center">
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            {t("contact.paragraph")}
          </Typography>
          <Link href="mailto:biuro@kapisolutions.pl">
            <Typography variant="h5" sx={{}}>
              biuro@kapisolutions.pl
            </Typography>
          </Link>
        </Stack>
      </Stack>
    </Container>
  );
};

export default WorkTogether;
