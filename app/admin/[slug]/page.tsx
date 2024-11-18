import db from "@/helpers/db";
// import Link from "next/link";

type Params = Promise<{ slug: string }>;

export default async function EditChunker({ params }: { params: Params }) {
  const { slug } = await params;

  const chunker = await db.chunker.findUnique({
    where: { slug: slug },
  });

  //   console.log("PARAMS", params);

  return (
    <main className="w-full p-5">
      <h1>Viewing Chunker: {slug}</h1>
      <div>{chunker?.osrs_username}</div>
    </main>
  );
}
