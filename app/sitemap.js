// import type { MetadataRoute } from "next";
import prisma from "@/helpers/db";

export const revalidate = 3600;

async function getChunkers() {
  const chunkers = await prisma.chunker.findMany({
    where: { published: true },
    orderBy: { yt_channel_name: "asc" },
    include: { videos: true },
  });
  return chunkers;
}

export default async function sitemap() {
  const chunkers = await getChunkers();

  const chunkerUrls = chunkers.map((chunker) => ({
    url: `https://osrschunkers.com/${chunker.slug}`,
    lastModified: chunker.updatedAt.toISOString(),
    changeFrequency: "daily",
    priority: 0.5,
  }));

  return [
    {
      url: "https://osrschunkers.com",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...chunkerUrls,
  ];
}
