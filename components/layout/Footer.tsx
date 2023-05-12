import React from "react";
import Link from "next/link";
import { Container, Typography, Stack, Divider, useTheme, useMediaQuery } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Locale } from "@/interfaces/main";
//Define Types:
type Props = {
  locale: Locale;
};

const Footer = ({ locale }: Props): JSX.Element => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    defaultMatches: true,
  });

  const t = {
    en: {
      rights: "All rights reserved.",
    },
    pl: {
      rights: "Wszelkie prawa zastrzeżone.",
    },
  };

  return (
    <Container name="footer" component="footer" sx={{ pb: 3 }}>
      <Divider orientation="horizontal" flexItem sx={{ mb: 3 }} />
      <Stack direction={isMobile ? "column-reverse" : "row"} justifyContent="space-between" alignItems="center">
        <Typography variant="caption" display="block" align="left" mt={isMobile ? 2 : 0}>
          ©{new Date().getFullYear()} {t[locale]?.rights}
        </Typography>
        <Stack
          direction="row"
          justifyContent="right"
          alignItems="center"
          spacing={2}
          divider={<Divider orientation="vertical" flexItem />}
          component="nav"
        >
          <Link
            href="https://www.linkedin.com/in/jakub-kapturkiewicz-147442109/"
            passHref
            style={{ display: "flex", alignItems: "center", gap: 2 }}
            className="Hover"
          >
            <LinkedInIcon fontSize="small" /> <Typography variant="caption">LinkedIn</Typography>
          </Link>
          <Link
            href="https://github.com/KapiSolutions"
            passHref
            style={{ display: "flex", alignItems: "center", gap: 2 }}
            className="Hover"
          >
            <GitHubIcon fontSize="small" /> <Typography variant="caption">GitHub</Typography>
          </Link>

          <Link
            href="mailto:biuro@kapisolutions.pl"
            className="Hover"
            style={{ display: "flex", alignItems: "center", gap: 2 }}
          >
            <AlternateEmailIcon fontSize="small" /> <Typography variant="caption">E-mail</Typography>
          </Link>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Footer;
