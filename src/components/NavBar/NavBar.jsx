"use client";
import Link from "next/link";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaHome, FaRegUser } from "react-icons/fa";
import { usePathname } from "next/navigation";
import LogOutButton from "./LogOutButton";

const NavBar = () => {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col gap-6 justify-center items-center fixed h-full top-0 p-2 bg-white shadow-lg w-14">
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
        <ToolTip name={"Home"} />
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
        <ToolTip name={"Documents"} />
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
        <ToolTip name={"Profile"} />
      </div>

      {/* -----------Log Out-------------- */}
      <div className="relative group">
        <LogOutButton></LogOutButton>
        {/*-------- tool tips---- */}
        <ToolTip name={"Logout"} />
      </div>
    </nav>
  );
};
export default NavBar;

// =======================Tool Tip==============================
const ToolTip = ({ name }) => {
  return (
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 bg-indigo-500 text-white py-1 px-3 mb-2 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
      <p>{name}</p>
    </div>
  );
};
