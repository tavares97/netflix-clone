import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //accepts only post requests
  if (req.method !== "POST") return res.status(405).end();

  try {
    //gets data from body
    const { email, username, password } = req.body;

    //Checks if email is already in use
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser)
      return res.status(422).json({ error: "Email already taken!" });

    //if user is new hash the password and save the user to DB
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        hashedPassword,
        username,
        image: "",
        emailVerified: new Date(),
      },
    });

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
