import prisma from "@/helpers/db";

async function getChunker(slug: string) {
  const chunker = await prisma.chunker.findUnique({ where: { slug } });
  return chunker;
}

type Params = Promise<{ slug: string }>;

export default async function ChunkerPage({ params }: { params: Params }) {
  const { slug } = await params;

  console.log("SLUG", slug);
  const chunker = await getChunker(slug);

  return (
    <main>
      <div>
        <p>{chunker?.yt_channel_name}</p>
      </div>
    </main>
  );
}
