import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { UserProfile } from "@auth0/nextjs-auth0/client";
import { Typography } from "@mui/material";
import Link from "next/link";

type ProfileProps = { user: UserProfile };

export default function AdminPage({ user }: ProfileProps): JSX.Element {
  // console.log(user);
  return (
    <Typography variant="body1" sx={{m:4, mt:0}}>
      Welcome {user.name}! <Link href="/api/auth/logout"> - Logout</Link>
    </Typography>
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
