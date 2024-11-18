import db from "@/helpers/db";

type Params = Promise<{ slug: string }>;

export default async function ChunkerPage({ params }: { params: Params }) {
  const { slug } = await params;

  const chunker = await db.chunker.findUnique({
    where: { slug: slug },
  });

  return (
    <div>
      <p>slug: {slug}</p>
      <p>chunker: {chunker?.yt_channel_name}</p>
    </div>
  );
}
