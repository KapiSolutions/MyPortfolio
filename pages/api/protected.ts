import type { NextApiRequest, NextApiResponse } from "next";
import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

type Data = {
  session: string;
  id?: string;
  nickname?: string;
};
type Error = {
  error: string;
  description?: any;
};

async function handle(req: NextApiRequest, res: NextApiResponse<Data | Error>) {
  try {
    const session = await getSession(req, res);
    if (session) {
      const user = session.user;
      res.status(200).json({
        session: "true",
        id: user.sub,
        nickname: user.nickname,
      });
    } else {
      res.status(500).json({ error: "Unable to fetch session" });
    }
  } catch (e: any) {
    res.status(500).json({ error: "Unable to fetch session", description: e });
  }
}

// withApiAuthRequired checks if the session is authenticated, if yes then handle function is called
export default withApiAuthRequired(handle);
