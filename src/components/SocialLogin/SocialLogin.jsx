"use client";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

const SocialLogin = () => {
  const socialLoginHandler = (socialService) => {
    signIn(socialService);
  };
  return (
    <div className="mt-3">
      <p className="text-center text-gray-600">Or, Sign in with</p>
      <div className="mt-5">
        {/* ------------Google------------- */}
        <button
          className="rounded-md w-full p-2 border border-indigo-400 cursor-pointer hover:bg-indigo-700 hover:text-white flex justify-center items-center gap-3 group"
          onClick={() => socialLoginHandler("google")}
        >
          <FcGoogle className="text-2xl" /><span className="font-bold text-gray-700 group-hover:text-white">Log in with Google</span>
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
