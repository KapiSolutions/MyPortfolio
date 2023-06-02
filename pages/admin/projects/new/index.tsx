import BreadCrumbs from "@/components/BreadCrumbs";
import ProjectTemplate from "@/components/admin/projects/ProjectTemplate";
import type { Locale } from "@/interfaces/main";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { UserProfile } from "@auth0/nextjs-auth0/client";
import { Typography, Container, Box, useTheme, useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";

type ProfileProps = { user: UserProfile };

export default function AdminNewProjectPage({ user }: ProfileProps): JSX.Element {
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
    default: {},
  };
  const breadcrumbs = [
    { name: t[locale].prev, path: "/admin/projects#main" },
    { name: t[locale].h1, path: "/admin/projects/new" },
  ];
  return (
    <>
      <Box sx={{ mt: 5, ml: 2 }}>
        <BreadCrumbs items={breadcrumbs} />
      </Box>
      <Container>
        <Typography variant="h4" align={isMobile ? "center" : "left"}>
          New Project!
        </Typography>
        <ProjectTemplate project={null} />
      </Container>
    </>
  );
}

export const getServerSideProps = withPageAuthRequired({
  // withPageAuthRequired checks if the session is authenticated, if not then redirect to Auth0 login page
  async getServerSideProps(ctx) {
    // const session = await getSession(ctx.req, ctx.res);

    // custom props are augmented with the session user object
    return {
      props: {
        // customProp: 'val',
      },
    };
  },
});
