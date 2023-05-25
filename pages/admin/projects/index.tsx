import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { UserProfile } from "@auth0/nextjs-auth0/client";
import { Typography, Container, useTheme, useMediaQuery } from "@mui/material";

type ProfileProps = { user: UserProfile };

export default function AdminProjectsPage({ user }: ProfileProps): JSX.Element {
  // console.log(user);
  return (
    <Container>
      <Typography variant="h2">
        Admin-projects
      </Typography>
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
