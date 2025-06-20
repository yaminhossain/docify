"use client";
import Link from "next/link";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaHome, FaRegUser } from "react-icons/fa";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col gap-6 justify-center fixed h-full top-0 p-2 bg-white shadow-lg w-14">
      {/* ----Home------ */}
      <div className="relative group">
        <Link
          href={"/"}
          className={`flex flex-col items-center text-neutral-700 ${
            pathname === "/" && "bg-indigo-500 text-white rounded-md p-2"
          }`}
        >
          <FaHome className="text-2xl font-bold"></FaHome>
        </Link>
        {/*-------- tool tips---- */}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 bg-indigo-500 text-white py-1 px-3 mb-2 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <p>Home</p>
        </div>
      </div>

      {/* ------documents------ */}
      <div className="relative group">
        <Link
          href={"/documents"}
          className={`flex flex-col items-center text-neutral-700 ${
            pathname.startsWith("/documents") &&
            "bg-indigo-500 text-white rounded-md p-2"
          }`}
        >
          <IoDocumentTextOutline className="text-2xl font-bold" />
        </Link>
        {/*-------- tool tips---- */}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 bg-indigo-500 text-white py-1 px-3 mb-2 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <p>Documents</p>
        </div>
      </div>
      
      {/* --------profile------- */}
      <div className="relative group">
        <Link
          href={"/profile"}
          className="flex flex-col items-center text-neutral-700"
        >
          <FaRegUser className="text-2xl font-bold " />
        </Link>
        {/*-------- tool tips---- */}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 bg-indigo-500 text-white py-1 px-3 mb-2 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <p>Profile</p>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
