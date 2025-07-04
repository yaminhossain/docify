"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import defaultUserImage from "@/../public/icons/defaultUser.png";
import UserProfileUpdatingForm from "./Components/UserProfileUpdatingForm";

const ProfilePage = () => {
  const userData = useSession();

  console.log("user data from profile section", userData);
  return (
    <div className="mt-4 p-4 shadow-lg min-h-[50vh] rounded-lg max-w-7xl mx-auto flex flex-col gap-2">
      <p className="text-2xl font-bold">User Profile</p>
      {/* =======Content Container====== */}
      <div className="flex flex-col md:flex-row gap-2">
        {/* ----------left side content--------- */}
        <div className="border border-gray-200 rounded-lg p-2 w-full grow flex flex-col gap-2 justify-center items-center bg-gray-100">
          <p className="text-center text-xl font-semibold my-2">
            {userData?.data?.user?.name || "User name"}
          </p>
          {/* -----profile image----- */}
          <div className="w-32 h-32 md:w-40 md:h-40 lg:w-60 lg:h-60 relative">
            <Image
              src={userData?.data?.user?.image || defaultUserImage}
              fill
              alt="user profile picture"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain rounded-full"
            />
          </div>
        </div>
        {/* ----------right side content-------- */}
        <div className="border border-gray-200 rounded-lg p-4 w-full h-full">
          <p className="text-2xl mb-1">User Data</p>
          <UserProfileUpdatingForm
            userData={userData}
          ></UserProfileUpdatingForm>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
