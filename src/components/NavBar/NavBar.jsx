"use client";
import Link from "next/link";
import { IoDocumentTextOutline } from "react-icons/io5";
import { FaHome, FaRegUser } from "react-icons/fa";

const NavBar = () => {
  return (
    <div className="flex flex-col gap-6 justify-center fixed h-full top-0 p-2 bg-white shadow-lg">
      <Link href={"/"} className="flex flex-col items-center text-neutral-700">
        <FaHome className="text-2xl font-bold"></FaHome>
        <span className="text-sm font-bold">Home</span>
      </Link>
      <Link
        href={"/documents"}
        className=" flex flex-col items-center text-neutral-700"
      >
        <IoDocumentTextOutline className="text-2xl font-bold" />
       
        <span className="text-sm font-bold">Docs</span>
      </Link>
      <Link
        href={"/profile"}
        className="flex flex-col items-center text-neutral-700"
      >
        <FaRegUser className="text-2xl font-bold " />
        <span className="text-sm font-bold">Profile</span>
      </Link>
    </div>
  );
};

export default NavBar;
