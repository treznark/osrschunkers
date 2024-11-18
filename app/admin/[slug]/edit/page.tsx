import db from "@/helpers/db";
// import Link from "next/link";
//
// type tParams = Promise<{ slug: string }>;

export default async function EditChunker({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  // console.log("SLUG", slug);

  const chunker = await db.chunker.findUnique({
    where: { slug: slug },
  });

  //   console.log("PARAMS", params);

  return (
    <main className="w-full p-5">
      <h1>Edit Chunker: {slug}</h1>
      <div>{chunker?.osrs_username}</div>
      {/* <ul>
        {chunkers.map((chunker) => (
          <li key={chunker.id}><Link href="">{chunker.osrs_username}</Link></li>
        ))}
      </ul> */}
    </main>
  );
}
