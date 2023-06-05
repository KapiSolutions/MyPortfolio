import BreadCrumbs from "@/components/BreadCrumbs";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { UserProfile } from "@auth0/nextjs-auth0/client";
import { Typography, Box } from "@mui/material";
import { NextSeo } from "next-seo";

type ProfileProps = { user: UserProfile };

export default function AdminPage({ user }: ProfileProps): JSX.Element {
  // console.log(user);
  const breadcrumbs = [{ name: "Login Page", path: "/admin" }];
  return (
    <>
      <NextSeo title="JK Portfolio | Successful Login!" nofollow={true} />

      <Box sx={{ mt: 5, ml: 2 }}>
        <BreadCrumbs items={breadcrumbs} />
        <Typography variant="body1">
          {/* Welcome {user.name}! <a href="/api/auth/logout"> - Logout</a> */}
          Welcome back!
        </Typography>
      </Box>
    </>
  );
}

export const getServerSideProps = withPageAuthRequired();
