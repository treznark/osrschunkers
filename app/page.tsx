import prisma from "@/helpers/db";
import Link from "next/link";
import Image from "next/image";
import YouTube from "@/components/YouTube";

export const revalidate = 60;

async function getChunkers() {
  const chunkers = await prisma.chunker.findMany({
    where: { published: true },
    orderBy: { yt_channel_name: "asc" },
    include: { videos: true },
  });
  return chunkers;
}

async function getRecentUploads() {
  const videos = await prisma.video.findMany({
    orderBy: { yt_video_published_at: "desc" },
    take: 16,
    include: { chunker: true },
  });
  return videos;
}

export default async function Home() {
  const chunkers = await getChunkers();
  const recentUploads = await getRecentUploads();

  return (
    <main className="w-full flex flex-col gap-5 p-5">
      <section className="w-full flex flex-col gap-5 items-center justify-center border-gray-800 border-b-4 pb-10">
        <h2 className="w-[350px] text-2xl bg-gray-800 p-5 rounded-md text-center">
          Recent Chunk Videos
        </h2>
        <ul className="flex flex-wrap gap-5 items-center justify-center">
          {recentUploads.map((video) => (
            <li
              key={video.id}
              className="flex flex-col p-2 bg-gray-800 rounded-md gap-2"
            >
              <YouTube id={video.yt_video_id} title={video.yt_video_title} />
              <div className="w-[300px] flex flex-col gap-1">
                <p className="line-clamp-2">{video.yt_video_title}</p>
                <div className="flex items-center justify-between">
                  <p>
                    <Link href={`/${video.chunker.slug}`}>
                      {video.chunker.yt_channel_name}
                    </Link>
                  </p>
                  <p className="text-gray-600">
                    {video.yt_video_published_at.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <section className="w-full flex flex-col gap-5 items-center justify-center border-gray-800 pb-10">
        <h2 className="w-[350px] text-2xl bg-gray-800 p-5 rounded-md text-center">
          Browse All Chunkers
        </h2>
        <table className="table-cell md:table md:w-5/6 text-sm md:text-base">
          <thead>
            <tr>
              <th className="hidden lg:table-cell">
                <p>VIEW CHUNKER</p>
              </th>
              <th className="lg:hidden">
                <p>VIEW</p>
              </th>
              <th>
                <p>CHANNEL NAME</p>
              </th>
              <th className="hidden lg:table-cell">
                <p>STARTING CHUNK</p>
              </th>
              <th className="hidden lg:table-cell">
                <p>VIDEO COUNT</p>
              </th>
              <th className="table-cell lg:hidden">
                <p>VIDS</p>
              </th>
              <th className="hidden lg:table-cell">
                <p>SUB COUNT</p>
              </th>
              <th className="table-cell lg:hidden">
                <p>SUBS</p>
              </th>
              <th>
                <p>RULESET</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {chunkers.map((chunker) => (
              <tr key={chunker.id} className="gap-1">
                <td>
                  <Link href={`/${chunker.slug}`} className="text-slate-50">
                    <button className="block lg:hidden bg-blue-500 hover:bg-blue-600 px-2 py-1 rounded-md">
                      <Image
                        src="/img/external.png"
                        alt="link icon"
                        width={16}
                        height={16}
                        className=""
                      />
                    </button>
                    <button className="hidden lg:block bg-blue-500 rounded-md px-2 py-1 hover:bg-blue-600 text-sm">
                      View Chunker ››
                    </button>
                  </Link>
                </td>
                <td>{chunker.yt_channel_name}</td>
                <td className="hidden lg:table-cell">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/img/chunk.png"
                      alt="chunk"
                      width={16}
                      height={16}
                    />
                    {chunker.starting_chunk}
                  </div>
                </td>
                <td>{chunker.videos.length}</td>
                <td>
                  {chunker.yt_subscriber_count.toLocaleString("en-US", {
                    maximumFractionDigits: 2,
                    notation: "compact",
                    compactDisplay: "short",
                  })}
                </td>
                {chunker.ruleset === "Supreme" && <td>👑 {chunker.ruleset}</td>}
                {chunker.ruleset === "Extreme" && <td>💥 {chunker.ruleset}</td>}
                {chunker.ruleset === "Vanilla/Casual" && (
                  <td>🛋️ {chunker.ruleset}</td>
                )}
                {chunker.ruleset === "Specialized" && (
                  <td>💫 {chunker.ruleset}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
