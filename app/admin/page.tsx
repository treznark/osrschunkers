import db from "@/helpers/db";
import Link from "next/link";
import Button from "@/components/layout/ui/Button";
// import NewChunkerModal from "@/components/admin/NewChunkerModal";

export default async function Admin() {
  const chunkers = await db.chunker.findMany({
    orderBy: { createdAt: "desc" },
  });

  // console.log("CHUNKERS", chunkers);

  return (
    <main className="w-full flex items-center flex-col gap-5 p-5">
      <div className="w-full flex justify-between items-center">
        <h1 className="m-0">Manage Chunkers</h1>
        <div className="input-button">
          <Link href="/admin/new-chunker">
            <Button className="rounded-md py-3 px-5 text-slate-50 text-xl bg-blue-500 hover:bg-blue-600">
              + NEW CHUNKER
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex w-4/5">
        <input
          // type={`${show ? "text" : "password"}`}
          className="w-full py-4 px-6 text-lg text-slate-50 bg-slate-800 border-2 border-solid border-slate-600 focus:outline-none"
          placeholder="Filter Chunkers"
          // {...register("cpassword")}
        />
        <span
          className="icon flex items-center justify-center px-4 text-2xl text-slate-800 bg-slate-600 cursor-pointer min-w-[60px]"
          // onClick={() => setShow(!show)}
        >
          {/* {show && <FontAwesomeIcon icon={faEye} />} */}
          {/* {!show && <FontAwesomeIcon icon={faEyeSlash} />} */}
        </span>
      </div>
      <ul className="w-full">
        {chunkers.map((chunker) => (
          <li key={chunker.id} className="flex justify-between">
            {chunker.osrs_username}
            <div className="flex gap-5">
              <Link href={`/admin/${chunker.slug}`}>
                <button>View</button>
              </Link>
              <Link href={`/admin/${chunker.slug}/edit`}>
                <button>Edit</button>
              </Link>
            </div>
          </li>
        ))}
      </ul>
      {/* <NewChunkerModal /> */}
    </main>
  );
}
