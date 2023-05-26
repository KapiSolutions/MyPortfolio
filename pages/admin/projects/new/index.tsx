import ProjectTemplate from "@/components/admin/projects/ProjectTemplate";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { UserProfile } from "@auth0/nextjs-auth0/client";
import { Typography, Container, Box,TextField, useTheme, useMediaQuery } from "@mui/material";

type ProfileProps = { user: UserProfile };

export default function AdminNewProjectPage({ user }: ProfileProps): JSX.Element {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    defaultMatches: true,
  });
  return (
    <Container>
      <Typography variant="h4" align={isMobile ? "center" : "left"}>
        New Project!
      </Typography>
      <ProjectTemplate project={null}/>
    </Container>
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
