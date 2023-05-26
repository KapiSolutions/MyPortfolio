import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { UserProfile } from "@auth0/nextjs-auth0/client";
import { Typography, Container, Stack, Grid, Divider, Box, Button, useTheme, useMediaQuery } from "@mui/material";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ProjectItem from "@/components/admin/projects/ProjectItem";
import projects from "@/tmp/projects.json"; //!Temporary import
import Link from "next/link";

type ProfileProps = { user: UserProfile };

export default function AdminProjectsPage({ user }: ProfileProps): JSX.Element {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"), {
    defaultMatches: true,
  });
  return (
    <Container>
      <Typography variant="h4" align={isMobile ? "center" : "left"}>
        Menage projects
      </Typography>
      <Box display="flex" justifyContent="flex-end" sx={{ mt: 4 }}>
        <Link href="/admin/projects/new#main">
          <Button variant="outlined" color="inherit" size="large" sx={{ width: isMobile ? "100%" : "auto" }}>
            <PostAddIcon sx={{ mr: 1 }} />
            Add New!
          </Button>
        </Link>
      </Box>

      {/* Title Bar */}
      <Grid container spacing={2} wrap="nowrap" sx={{ mt: 2 }}>
        <Grid item xs={9} sm={5} lg={9}>
          <Typography variant="body1">Title</Typography>
        </Grid>
        {isMobile ? null : (
          <Grid item sm={3} lg={1}>
            <Typography variant="body1">Number</Typography>
          </Grid>
        )}
        <Grid item xs={3} sm={4} lg={2}>
          <Box display="flex">
            <Typography variant="body1">Opcje</Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Items */}
      <Stack direction="column" spacing={3} sx={{ mt: 2 }}>
        <Divider orientation="horizontal" flexItem />
        {projects.map((project, idx) => (
          <ProjectItem key={idx} project={project} />
        ))}
      </Stack>
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
