import BreadCrumbs from "@/components/BreadCrumbs";
import ProjectTemplate from "@/components/admin/projects/ProjectTemplate";
import type { Locale } from "@/utils/interfaces/main";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { Typography, Container, Box, useTheme, useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";

export default function AdminNewProjectPage(): JSX.Element {
  const router = useRouter();
  const locale = (router.locale || "en") as Locale;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    defaultMatches: true,
  });
  const t = {
    en: {
      prev: "Menage projects",
      h1: "New Project!",
    },
    pl: {
      prev: "Twoje projekty",
      h1: "Nowy Projekt!",
    },
  };
  const breadcrumbs = [
    { name: t[locale].prev, path: "/admin/projects#main" },
    { name: t[locale].h1, path: "/admin/projects/new" },
  ];
  return (
    <>
      <NextSeo title={`Kapisolutions | ${t[locale].h1}`} nofollow={true} />

      <Box sx={{ mt: 5, ml: 2 }}>
        <BreadCrumbs items={breadcrumbs} />
      </Box>
      <Container>
        <Typography variant="h4" align={isMobile ? "center" : "left"}>
          {t[locale].h1}
        </Typography>
        <ProjectTemplate project={null} />
      </Container>
    </>
  );
}

export const getServerSideProps = withPageAuthRequired();
