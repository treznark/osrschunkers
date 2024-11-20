import prisma from "@/helpers/db";
import Link from "next/link";
import Image from "next/image";

export const revalidate = 60;

async function getChunkers() {
  const chunkers = await prisma.chunker.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    include: { videos: true },
  });
  return chunkers;
}

async function getRecentUploads() {
  const videos = await prisma.video.findMany({
    orderBy: { yt_video_published_at: "desc" },
    take: 10,
    include: { chunker: true },
  });
  return videos;
}

async function getNewestChunkers() {
  const newestChunkers = await prisma.chunker.findMany({
    orderBy: { createdAt: "desc" },
    take: 10,
    include: { videos: true },
  });
  return newestChunkers;
}

async function getMostPopularChunkers() {
  const mostPopularChunkers = await prisma.chunker.findMany({
    orderBy: { yt_subscriber_count: "desc" },
    take: 10,
    include: { videos: true },
  });
  return mostPopularChunkers;
}

export default async function Home() {
  const chunkers = await getChunkers();
  const recentUploads = await getRecentUploads();
  const newestChunkers = await getNewestChunkers();
  const mostPopularChunkers = await getMostPopularChunkers();
  // console.log(
  //   "CHUNKERS",
  //   chunkers[3].videos.reduce((r, o) =>
  //     o.yt_video_published_at < r.yt_video_published_at ? o : r
  //   )
  // );

  return (
    <main className="w-full flex flex-col items-center justify-center p-5">
      <h2 className="w-[350px] text-2xl bg-gray-800 p-5 rounded-md text-center">
        Recent Uploads
      </h2>
      <table className="w-full">
        <thead>
          <tr>
            <th>
              <p>TITLE</p>
            </th>
            <th>
              <p>DATE</p>
            </th>
            <th>
              <p>CHUNKER</p>
            </th>
          </tr>
        </thead>
        <tbody>
          {recentUploads.map((video) => (
            <tr key={video.id}>
              <td>
                <Link
                  href={`https://www.youtube.com/watch?v=${video.yt_video_id}`}
                >
                  {video.yt_video_title}
                </Link>
              </td>
              <td>
                {video.yt_video_published_at.toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </td>
              <td>
                <Link
                  href={`https://www.youtube.com/watch?v=${video.yt_video_id}`}
                >
                  {video.chunker.yt_channel_name}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <hr className="w-full border-gray-800 border-t-2" />
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
              <p>SUBSCRIBER COUNT</p>
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
                      o.yt_video_published_at < r.yt_video_published_at ? o : r
                    )?.yt_video_title
                  }
                </td>
              )}
              {chunker.videos?.length <= 0 && <td></td>}
              {chunker.videos?.length > 0 && (
                <td>
                  {
                    chunker?.videos?.reduce((r, o) =>
                      o.yt_video_published_at > r.yt_video_published_at ? o : r
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
              <td>{chunker.yt_subscriber_count}</td>
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
      <hr className="w-full border-gray-800 border-t-2" />
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
              <p>SUBSCRIBER COUNT</p>
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
                      o.yt_video_published_at < r.yt_video_published_at ? o : r
                    )?.yt_video_title
                  }
                </td>
              )}
              {chunker.videos?.length <= 0 && <td></td>}
              {chunker.videos?.length > 0 && (
                <td>
                  {
                    chunker?.videos?.reduce((r, o) =>
                      o.yt_video_published_at > r.yt_video_published_at ? o : r
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
              <td>{chunker.yt_subscriber_count}</td>
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
      <hr className="w-full border-gray-800 border-t-2" />
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
              <p>FIRST EPISODE</p>
            </th>
            <th>
              <p>RECENT EPISODE</p>
            </th>
            <th>
              <p>YOUTUBE CHANNEL</p>
            </th>
            <th>
              <p>SUBSCRIBER COUNT</p>
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
              <td className="flex items-center gap-2">
                <Image
                  src="/img/chunk.png"
                  alt="chunk"
                  width={16}
                  height={16}
                />
                {chunker.starting_chunk}
              </td>
              {chunker.videos.length > 0 && (
                <td>
                  {
                    chunker?.videos?.reduce((r, o) =>
                      o.yt_video_published_at < r.yt_video_published_at ? o : r
                    )?.yt_video_title
                  }
                </td>
              )}
              {chunker.videos.length <= 0 && <td></td>}
              {chunker.videos.length > 0 && (
                <td>
                  {
                    chunker?.videos?.reduce((r, o) =>
                      o.yt_video_published_at > r.yt_video_published_at ? o : r
                    )?.yt_video_title
                  }
                </td>
              )}
              {chunker.videos.length <= 0 && <td></td>}
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
              <td>{chunker.yt_subscriber_count}</td>
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
    </main>
  );
}
