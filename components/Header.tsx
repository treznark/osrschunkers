import Link from "next/link";
import Image from "next/image";

const MainHeader = () => {
  return (
    <header className="w-full flex flex-row items-center justify-between bg-slate-800 text-white px-3 py-2">
      <Link href="/" className="text-white">
        <div className="flex flex-row items-center gap-2">
          <Image
            src="/icon.png"
            alt="OSRS Chunkers"
            width={50}
            height={50}
            className="rounded-md"
          />
          <div className="flex flex-col">
            <h1 className="m-0 leading-none">OSRS Chunkers</h1>
            <p className="m-0 text-xs">
              Follow and Discover OSRS One Chunk Accounts
            </p>
          </div>
        </div>
      </Link>
    </header>
  );
};

export default MainHeader;
