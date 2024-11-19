import Link from "next/link";
const MainHeader = () => {
  return (
    <header className="w-full flex flex-row items-center justify-between text-white px-3 pt-2">
      <Link href="/" className="text-white">
        <div className="flex flex-col">
          <h1 className="m-0 leading-none">OSRS Chunkers</h1>
          <p className="m-0 text-xs">
            Follow and Discover OSRS One Chunk Accounts
          </p>
        </div>
      </Link>
    </header>
  );
};

export default MainHeader;
