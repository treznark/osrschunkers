import dbConnect from "@/helpers/dbConnect";
import ChunkerModel, { Chunker } from "@/models/chunker";
import { ApiResponse } from "@/types/api";
import { NextApiRequest, NextApiResponse } from "next";
import { transformObjectIds } from "@/helpers/db";

type GetResponse = ApiResponse<Chunker>;
type PutResponse = ApiResponse<Chunker>;
type DeleteResponse = ApiResponse<Chunker>;

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
    const slug = req.query.slug;
    try {
        let chunker = (await ChunkerModel.findOne({ slug }).lean()) as Chunker;
        chunker = transformObjectIds(chunker);
        res.status(200).json({ success: true, data: chunker });
    } catch (error) {
        res.status(500).json({ success: false, error: error });
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();
    switch (req.method) {
        case "GET":
            return handleGet(req, res);
    }
}  