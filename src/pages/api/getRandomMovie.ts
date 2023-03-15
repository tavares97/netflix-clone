import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import serverAuth from "../../../lib/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") return res.status(405).end();

  try {
    await serverAuth(req);

    const movieCount = await prisma.movie.count();
    const randomId = Math.floor(Math.random() * movieCount);

    const randomMovie = await prisma.movie.findMany({
      take: 1,
      skip: randomId,
    });

    return res.status(200).json(randomMovie[0]);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
