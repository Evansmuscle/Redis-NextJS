import { NextApiRequest, NextApiResponse } from "next";
import { createIndex } from "../../lib/redis";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  await createIndex();
  res.status(200).send("ok");
}
