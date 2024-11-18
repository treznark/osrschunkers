import prisma from "@/helpers/db";
// import Link from "next/link";
// import Button from "@/components/layout/ui/Button";
// import { revalidatePath } from "next/cache";

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
    <main className="w-full p-5">
      <h1>Browse OSRS Chunk Locked Creators - Coming Soon</h1>

      {chunkers.map((chunker) => (
        <div key={chunker.id}>{chunker.osrs_username}</div>
      ))}

      {/* <h1>OSRS Chunk Locked YouTube Series</h1>

      <h2>Extreme</h2>
      <table className="w-full">
        <tbody>
          <tr>
            <th>OSRS Username</th>
            <th>Starting Chunk</th>
            <th>YouTube Channel Name</th>
          </tr>
          {chunkers
            .filter((chunker) => chunker.ruleset === "Extreme")
            .map((chunker) => (
              <tr key={chunker.yt_channel_name}>
                <td>
                  <Link
                    href={`https://secure.runescape.com/m=hiscore_oldschool/hiscorepersonal?user1=${chunker.osrs_username}`}
                  >
                    {chunker.osrs_username}
                  </Link>
                </td>
                <td>{chunker.starting_chunk}</td>
                <td>
                  <Link href={chunker.yt_channel_link}>
                    {chunker.yt_channel_name}
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <h2>Vanilla/Casual</h2>
      <table className="w-full">
        <tbody>
          <tr>
            <th>OSRS Username</th>
            <th>Starting Chunk</th>
            <th>YouTube Channel Name</th>
          </tr>
          {chunkers
            .filter((chunker) => chunker.ruleset === "Vanilla/Casual")
            .map((chunker) => (
              <tr key={chunker.yt_channel_name}>
                <td>
                  <Link
                    href={`https://secure.runescape.com/m=hiscore_oldschool/hiscorepersonal?user1=${chunker.osrs_username}`}
                  >
                    {chunker.osrs_username}
                  </Link>
                </td>
                <td>{chunker.starting_chunk}</td>
                <td>
                  <Link href={chunker.yt_channel_link}>
                    {chunker.yt_channel_name}
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <h2>Supreme</h2>
      <table className="w-full">
        <tbody>
          <tr>
            <th>OSRS Username</th>
            <th>Starting Chunk</th>
            <th>YouTube Channel Name</th>
          </tr>
          {chunkers
            .filter((chunker) => chunker.ruleset === "Supreme")
            .map((chunker) => (
              <tr key={chunker.yt_channel_name}>
                <td>
                  <Link
                    href={`https://secure.runescape.com/m=hiscore_oldschool/hiscorepersonal?user1=${chunker.osrs_username}`}
                  >
                    {chunker.osrs_username}
                  </Link>
                </td>
                <td>{chunker.starting_chunk}</td>
                <td>
                  <Link href={chunker.yt_channel_link}>
                    {chunker.yt_channel_name}
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <h2>Specialized</h2>
      <table className="w-full">
        <tbody>
          <tr>
            <th>OSRS Username</th>
            <th>Starting Chunk</th>
            <th>YouTube Channel Name</th>
          </tr>
          {chunkers
            .filter((chunker) => chunker.ruleset === "Specialized")
            .map((chunker) => (
              <tr key={chunker.yt_channel_name}>
                <td>
                  <Link
                    href={`https://secure.runescape.com/m=hiscore_oldschool/hiscorepersonal?user1=${chunker.osrs_username}`}
                  >
                    {chunker.osrs_username}
                  </Link>
                </td>
                <td>{chunker.starting_chunk}</td>
                <td>
                  <Link href={chunker.yt_channel_link}>
                    {chunker.yt_channel_name}
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table> */}
    </main>
  );
}
