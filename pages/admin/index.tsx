import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { UserProfile } from "@auth0/nextjs-auth0/client";

type ProfileProps = { user: UserProfile };

export default function AdminPage({ user }: ProfileProps): JSX.Element {
    // console.log(user);
  return (
    <>
      <h3>
           Welcome {user.name}! <a href="/api/auth/logout"> - Logout</a>
      </h3>
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
