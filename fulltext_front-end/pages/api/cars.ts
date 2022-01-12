import { NextApiRequest, NextApiResponse } from "next";
import { createCar } from "../../lib/redis";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = await createCar(req.body);
  res.status(200).json({ id });
}
