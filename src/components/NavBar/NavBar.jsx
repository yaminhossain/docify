"use client";
import Link from "next/link";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaHome, FaRegUser } from "react-icons/fa";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <nav className="flex flex-col gap-6 justify-center fixed h-full top-0 p-2 bg-white shadow-lg w-14">
      <Link
        href={"/"}
        className={`flex flex-col items-center text-neutral-700 ${
          pathname === "/" && "bg-indigo-500 text-white rounded-md p-2"
        }`}
        title="Home"
      >
        <FaHome className="text-2xl font-bold"></FaHome>
      </Link>
      <Link
        href={"/documents"}
        className={`flex flex-col items-center text-neutral-700 ${
          pathname.startsWith("/documents") &&
          "bg-indigo-500 text-white rounded-md p-2"
        }`}
        title="Documents"
      >
        <IoDocumentTextOutline className="text-2xl font-bold" />
      </Link>
      <Link
        href={"/profile"}
        className="flex flex-col items-center text-neutral-700"
        title="profile"
      >
        <FaRegUser className="text-2xl font-bold " />
      </Link>
    </nav>
  );
};

export default NavBar;
