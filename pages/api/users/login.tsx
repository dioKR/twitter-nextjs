import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../lib/server/db";
import withHandler, { ResponseType } from "../../../lib/server/withHandler";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { email, password } = req.body;
  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (user) console.log("found it.");
  if (!user) {
    console.log("Did not find.");
    return res.status(400).json({ ok: false });
    // user = await client.user.create({
    //   data: {
    //     name: "Anonymous",
    //     email,
    //   },
    // });
  }

  return res.json({
    ok: true,
  });
}

export default withHandler("POST", handler);
