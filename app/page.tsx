import prisma from "@/helpers/db";
import Link from "next/link";
import Image from "next/image";

export const revalidate = 60;

async function getChunkers() {
  const chunkers = await prisma.chunker.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });
  return chunkers;
}

export default async function Home() {
  const chunkers = await getChunkers();

  return (
    <main className="w-full flex flex-col items-center justify-center p-5">
      <h2 className="w-[300px] text-2xl bg-gray-800 p-5 rounded-md text-center">
        Recent Uploads
      </h2>
      <hr className="w-full border-gray-800 border-t-2" />
      <h2 className="w-[300px] text-2xl bg-gray-800 p-5 rounded-md text-center">
        Browse Chunkers
      </h2>
      <table className="w-full">
        <tbody>
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
              <td>First Episode</td>
              <td>Most Recent Episode </td>
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
