import prisma from "@/helpers/db";
import Link from "next/link";
import YouTube from "@/components/YouTube";
import Image from "next/image";

async function getChunker(slug: string) {
  const chunker = await prisma.chunker.findUnique({
    where: { slug },
    include: { videos: true },
  });
  return chunker;
}

type Params = Promise<{ slug: string }>;

export default async function ChunkerPage({ params }: { params: Params }) {
  const { slug } = await params;

  // console.log("SLUG", slug);
  const chunker = await getChunker(slug);
  // console.log("CHUNKER", chunker);
  const sortedVideos = chunker?.videos?.sort(function (a, b) {
    return (
      b.yt_video_published_at.valueOf() - a.yt_video_published_at.valueOf()
    );
  });

  // console.log("SORTED VIDEOS", sortedVideos);

  return (
    <main className="w-full flex flex-col gap-5 p-5">
      <div className="w-full flex flex-col gap-10 justify-center items-center">
        <div className="flex flex-col justify-center items-center bg-gray-800 px-8 pb-8 rounded-md">
          <h1 className="w-[350px] text-4xl p-5 rounded-md text-center m-0">
            {chunker?.yt_channel_name}
          </h1>
          <div className="w-full flex flex-col xl:flex-row gap-5 items-center justify-center xl:flex xl:justify-between">
            <Link
              href={`https://www.youtube.com/@${chunker?.yt_channel_id}`}
              className="text-slate-50"
              rel="noopener noreferrer"
              target="_blank"
            >
              <div className="h-[40px] w-[250px] flex flex-row gap-2 items-center justify-center bg-red-600 rounded-lg font-bold">
                <Image
                  src="/img/youtube-icon-white.png"
                  alt="YouTube Logo"
                  width={32}
                  height={32}
                />
                <span>YouTube</span>
                <span className="text-black">
                  {chunker?.yt_subscriber_count.toLocaleString("en-US", {
                    maximumFractionDigits: 2,
                    notation: "compact",
                    compactDisplay: "short",
                  })}{" "}
                  Subs
                </span>
              </div>
            </Link>
            <Link
              href={`https://secure.runescape.com/m=hiscore_oldschool/hiscorepersonal?user1=${chunker?.osrs_username}`}
            >
              <div className="h-[40px] w-[250px] flex items-center justify-center bg-amber-300 rounded-lg font-bold text-black">
                {chunker?.osrs_username} - OSRS Hiscores
              </div>
            </Link>
            <div className="h-[40px] w-[250px] flex items-center justify-center gap-2 font-bold bg-gray-900 border-2 border-white rounded-lg ">
              <Image src="/img/chunk.png" alt="chunk" width={16} height={16} />
              {chunker?.starting_chunk}
            </div>
            {chunker?.ruleset === "Supreme" && (
              <div className="h-[40px] w-[250px] flex items-center justify-center gap-2 font-bold bg-gray-900 border-2 border-white rounded-lg">
                Ruleset: 👑 {chunker?.ruleset}
              </div>
            )}
            {chunker?.ruleset === "Extreme" && (
              <div className="h-[40px] w-[250px] flex items-center justify-center gap-2 font-bold bg-gray-900 border-2 border-white rounded-lg">
                Ruleset: 💥 {chunker?.ruleset}
              </div>
            )}
            {chunker?.ruleset === "Vanilla/Casual" && (
              <div className="h-[40px] w-[250px] flex items-center justify-center gap-2 font-bold bg-gray-900 border-2 border-white rounded-lg">
                Ruleset: 🛋️ {chunker?.ruleset}
              </div>
            )}
            {chunker?.ruleset === "Specialized" && (
              <div className="h-[40px] w-[250px] flex items-center justify-center gap-2 font-bold bg-gray-900 border-2 border-white rounded-lg">
                Ruleset: 💫 {chunker?.ruleset}
              </div>
            )}
          </div>
        </div>
        <h2 className="w-[350px] text-2xl bg-gray-800 p-5 rounded-md text-center">
          One Chunk Videos
        </h2>
        <ul className="flex flex-wrap gap-5 items-center justify-center">
          {sortedVideos?.map((video) => (
            <li
              key={video.id}
              className="flex flex-col p-2 bg-gray-800 rounded-md gap-2"
            >
              <YouTube id={video.yt_video_id} title={video.yt_video_title} />
              <div className="w-[300px] flex flex-col gap-1">
                <p className="line-clamp-2">{video.yt_video_title}</p>
                <div className="flex items-center justify-between">
                  <p>{chunker?.yt_channel_name}</p>
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
      </div>
    </main>
  );
}
