// import { NextApiResponse } from "next";
import { NextResponse } from "next/server";
// import { NextRequest } from "next/server";
// import ChunkerModel, { Chunker } from "@/models/chunker";
// import transformObjectIds from "@/lib/utils/db";
// import ApiResponse from "@/lib/types/api";

// type GetResponse = ApiResponse<Chunker[]>

export async function GET() {

    return NextResponse.json({message: "Hello World"})
    // try {
    //     let chunkers = await ChunkerModel.find({}).lean()
    //     chunkers = chunkers.map(c=> transformObjectIds(c))
    //     return NextResponse.json(chunkers)
    // } catch (error) {
    //     return NextResponse.json({error: error}, {status: 500})
    // }
}