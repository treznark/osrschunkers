import prisma from "@/helpers/db";
import Link from "next/link";
import Image from "next/image";
import YouTube from "@/components/YouTube";

export const revalidate = 60;

async function getChunkers() {
  const chunkers = await prisma.chunker.findMany({
    where: { published: true },
    orderBy: { osrs_username: "asc" },
    include: { videos: true },
  });
  return chunkers;
}

async function getRecentUploads() {
  const videos = await prisma.video.findMany({
    orderBy: { yt_video_published_at: "desc" },
    take: 12,
    include: { chunker: true },
  });
  return videos;
}

// async function getNewestChunkers() {
//   const newestChunkers = await prisma.chunker.findMany({
//     orderBy: { createdAt: "desc" },
//     take: 10,
//     include: { videos: true },
//   });
//   return newestChunkers;
// }

// async function getMostPopularChunkers() {
//   const mostPopularChunkers = await prisma.chunker.findMany({
//     orderBy: { yt_subscriber_count: "desc" },
//     take: 10,
//     include: { videos: true },
//   });
//   return mostPopularChunkers;
// }

export default async function Home() {
  const chunkers = await getChunkers();
  const recentUploads = await getRecentUploads();
  // const newestChunkers = await getNewestChunkers();
  // const mostPopularChunkers = await getMostPopularChunkers();
  // console.log(
  //   "CHUNKERS",
  //   chunkers[3].videos.reduce((r, o) =>
  //     o.yt_video_published_at < r.yt_video_published_at ? o : r
  //   )
  // );

  return (
    <main className="w-full flex flex-col gap-5 p-5">
      <section className="w-full flex flex-col items-center justify-center border-gray-800 border-b-4 pb-10">
        <h2 className="w-[350px] text-2xl bg-gray-800 p-5 rounded-md text-center">
          Latest Chunk Videos
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
      {/* <section className="w-full flex flex-col items-center justify-center border-gray-800 border-b-4 pb-10">
        <h2 className="w-[350px] text-2xl bg-gray-800 p-5 rounded-md text-center">
          Newest Chunkers
        </h2>
        <table className="w-full">
          <thead>
            <tr>
              <th>
                <p>OSRS USERNAME</p>
              </th>
              <th>
                <p>STARTING CHUNK</p>
              </th>
              <th>
                <p>FIRST EPISODE</p>
              </th>
              <th>
                <p>RECENT EPISODE</p>
              </th>
              <th>
                <p>YOUTUBE CHANNEL</p>
              </th>
              <th>
                <p>SUB COUNT</p>
              </th>
              <th>
                <p>RULESET</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {newestChunkers.map((chunker) => (
              <tr key={chunker.yt_channel_name} className="gap-1">
                <td>
                  <Link
                    href={`https://secure.runescape.com/m=hiscore_oldschool/hiscorepersonal?user1=${chunker.osrs_username}`}
                  >
                    {chunker.osrs_username}
                  </Link>
                </td>
                <td className="flex items-center gap-2">
                  <Image
                    src="/img/chunk.png"
                    alt="chunk"
                    width={16}
                    height={16}
                  />
                  {chunker.starting_chunk}
                </td>
                {chunker.videos?.length > 0 && (
                  <td>
                    {
                      chunker?.videos?.reduce((r, o) =>
                        o.yt_video_published_at < r.yt_video_published_at
                          ? o
                          : r
                      )?.yt_video_title
                    }
                  </td>
                )}
                {chunker.videos?.length <= 0 && <td></td>}
                {chunker.videos?.length > 0 && (
                  <td>
                    {
                      chunker?.videos?.reduce((r, o) =>
                        o.yt_video_published_at > r.yt_video_published_at
                          ? o
                          : r
                      )?.yt_video_title
                    }
                  </td>
                )}
                {chunker.videos?.length <= 0 && <td></td>}
                <td className="flex items-center gap-2">
                  <Image
                    src="/img/youtube-icon.png"
                    alt="chunk"
                    width={16}
                    height={16}
                  />
                  <Link
                    href={`https://www.youtube.com/@${chunker.yt_channel_id}`}
                  >
                    {chunker.yt_channel_name}
                  </Link>
                </td>
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
      </section> */}
      {/* <section className="w-full flex flex-col items-center justify-center border-gray-800 border-b-4 pb-10">
        <h2 className="w-[350px] text-2xl bg-gray-800 p-5 rounded-md text-center">
          Most Popular Chunkers
        </h2>
        <table className="w-full">
          <thead>
            <tr>
              <th>
                <p>OSRS USERNAME</p>
              </th>
              <th>
                <p>STARTING CHUNK</p>
              </th>
              <th>
                <p>FIRST EPISODE</p>
              </th>
              <th>
                <p>RECENT EPISODE</p>
              </th>
              <th>
                <p>YOUTUBE CHANNEL</p>
              </th>
              <th>
                <p>SUB COUNT</p>
              </th>
              <th>
                <p>RULESET</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {mostPopularChunkers.map((chunker) => (
              <tr key={chunker.yt_channel_name} className="gap-1">
                <td>
                  <Link
                    href={`https://secure.runescape.com/m=hiscore_oldschool/hiscorepersonal?user1=${chunker.osrs_username}`}
                  >
                    {chunker.osrs_username}
                  </Link>
                </td>
                <td className="flex items-center gap-2">
                  <Image
                    src="/img/chunk.png"
                    alt="chunk"
                    width={16}
                    height={16}
                  />
                  {chunker.starting_chunk}
                </td>
                {chunker.videos?.length > 0 && (
                  <td>
                    {
                      chunker?.videos?.reduce((r, o) =>
                        o.yt_video_published_at < r.yt_video_published_at
                          ? o
                          : r
                      )?.yt_video_title
                    }
                  </td>
                )}
                {chunker.videos?.length <= 0 && <td></td>}
                {chunker.videos?.length > 0 && (
                  <td>
                    {
                      chunker?.videos?.reduce((r, o) =>
                        o.yt_video_published_at > r.yt_video_published_at
                          ? o
                          : r
                      )?.yt_video_title
                    }
                  </td>
                )}
                {chunker.videos?.length <= 0 && <td></td>}
                <td className="flex items-center gap-2">
                  <Image
                    src="/img/youtube-icon.png"
                    alt="chunk"
                    width={16}
                    height={16}
                  />
                  <Link
                    href={`https://www.youtube.com/@${chunker.yt_channel_id}`}
                  >
                    {chunker.yt_channel_name}
                  </Link>
                </td>
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
      </section> */}
      <section className="w-full flex flex-col items-center justify-center border-gray-800 pb-10">
        <h2 className="w-[350px] text-2xl bg-gray-800 p-5 rounded-md text-center">
          Browse All Chunkers
        </h2>
        <table className="w-full">
          <thead>
            <tr>
              <th>
                <p>OSRS USERNAME</p>
              </th>
              <th>
                <p>STARTING CHUNK</p>
              </th>
              <th>
                <p>YOUTUBE CHANNEL</p>
              </th>
              <th>
                <p>SUB COUNT</p>
              </th>
              <th>
                <p>RULESET</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {chunkers.map((chunker) => (
              <tr key={chunker.yt_channel_name} className="gap-1">
                <td>
                  <Link
                    href={`https://secure.runescape.com/m=hiscore_oldschool/hiscorepersonal?user1=${chunker.osrs_username}`}
                  >
                    {chunker.osrs_username}
                  </Link>
                </td>
                <td>
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
                <td>
                  <div className="flex items-center gap-2">
                    <Image
                      src="/img/youtube-icon.png"
                      alt="chunk"
                      width={16}
                      height={16}
                    />
                    <Link
                      href={`https://www.youtube.com/@${chunker.yt_channel_id}`}
                    >
                      {chunker.yt_channel_name}
                    </Link>
                  </div>
                </td>
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
