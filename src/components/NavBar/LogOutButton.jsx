"use client";

import { signOut } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";

const LogOutButton = () => {
  return (
    <button
      className="cursor-pointer"
      onClick={() => {
        signOut();
      }}
    >
      <FiLogOut className="text-2xl" />
    </button>
  );
};

export default LogOutButton;
