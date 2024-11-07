import dbConnect from "@/helpers/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";
import { hashPassword } from "@/helpers/auth";
import UserModel, { User } from "@/models/user";
import { ApiResponse } from "@/types/api";
import { transformObjectIds } from "@/helpers/db";

type PostResponse = ApiResponse<User>;

const handlePost = async (req: NextApiRequest, res: NextApiResponse<PostResponse>) => {
  const data = req.body;
  const { email, password, username, provider } = data;

  if (await UserModel.findOne({ email: email })) {
    res.status(422).json({
      // TODO: Refactor these from strings
      error: "A user with that email already exists." });
    return;
  }

  if (await UserModel.findOne({ username: username })) {
    res
      .status(422)
      .json({
        // TODO: Refactor these from strings
        error: "A user with that username already exists.",
      });
    return;
  }

  const hashedPassword = await hashPassword(password);

  let user = (await UserModel.create({
    username: username,
    email: email,
    password: hashedPassword,
    role: "user",
    provider: provider,
  })).toObject() as User;
  user = transformObjectIds(user);
  res.status(201).json({ data: user });
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  switch (req.method) {
    case "POST":
      return handlePost(req, res);
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).json({ error: "Method not allowed" });
      break;
  }
}

export default handler;
