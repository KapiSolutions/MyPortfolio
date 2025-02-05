import BreadCrumbs from "@/components/BreadCrumbs";
import ProjectTemplate from "@/components/admin/projects/ProjectTemplate";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { Typography, Container, Box, useTheme, useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import { getTranslation, type Locale, type Tkey } from "@/utils/i18n";

export default function AdminNewProjectPage(): JSX.Element {
  const router = useRouter();
  const locale = router.locale as Locale;
  const t = (key: Tkey) => getTranslation(locale, key);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    defaultMatches: true,
  });

  const breadcrumbs = [
    { name: t("projects.manage.header"), path: "/admin/projects#main" },
    { name: t("project.new.header"), path: "/admin/projects/new" },
  ];
  return (
    <>
      <NextSeo title={`Kapisolutions | ${t("project.new.header")}`} nofollow={true} />

      <Box sx={{ mt: 5, ml: 2 }}>
        <BreadCrumbs items={breadcrumbs} />
      </Box>
      <Container>
        <Typography variant="h4" align={isMobile ? "center" : "left"}>
          {t("project.new.header")}
        </Typography>
        <ProjectTemplate project={null} />
      </Container>
    </>
  );
}

export const getServerSideProps = withPageAuthRequired();
