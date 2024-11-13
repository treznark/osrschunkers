import dbConnect from "@/helpers/dbConnect";
import { NextApiRequest, NextApiResponse } from "next";
import ChunkerModel, {Chunker} from "@/models/chunker";
import { ApiResponse } from "@/types/api";
import { transformObjectIds } from "@/helpers/db";
import getServerSession from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

type GetResponse = ApiResponse<Chunker[]>

const handleGet = async (req: NextApiRequest, res: NextApiResponse<GetResponse>) => {
    const session = await getServerSession(req, res, authOptions)
    if (!session || session.user.role !== "admin") {
        return res.status(401).json({ error: "Unauthorized" })
    }

    try {
        let chunkers = await ChunkerModel.find({}).lean() as Chunker[];
        chunkers = chunkers.map(n => transformObjectIds(n));
        res.status(200).json({ data: chunkers })
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" })
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<GetResponse>) {
    await dbConnect()
    switch (req.method) {
        case "GET": 
            return handleGet(req, res);
        default: 
            res.setHeader("Allow", ["GET"]);
            return res.status(405).json({ error: "Method Not Allowed" })
    }
}