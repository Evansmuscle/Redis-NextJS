import { NextApiRequest, NextApiResponse } from "next";
import { searchCars } from "../../lib/redis";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const query = req.query.query;
  console.log(query);

  if (!(query instanceof Array)) {
    const cars = await searchCars(query);
    res.status(200).json({ cars });
  }
}
