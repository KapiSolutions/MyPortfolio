import type { NextApiRequest, NextApiResponse } from "next";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";

async function handle(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method === "POST") {
    const { paths } = req.body;

    try {
      await Promise.all(
        paths.map(async (path: string) => {
          await res.revalidate(path);
          // if (process.env.NODE_ENV == "production") {
          //   await res.revalidate("/pl" + path);
          //   await res.revalidate("/en" + path);
          // }
        })
      );

      res.status(200).json({ revalidated: true });
    } catch (error) {
      console.log(error);
      res.status(500).end("Error revalidating");
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}

// withApiAuthRequired checks if the session is authenticated, if yes then handle function is called
export default withApiAuthRequired(handle);
