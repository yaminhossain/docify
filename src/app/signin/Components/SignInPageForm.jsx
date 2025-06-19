"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { LuEyeClosed } from "react-icons/lu";
import { FaEye } from "react-icons/fa6";
import ReCAPTCHA from "react-google-recaptcha";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const SignInPageForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const [passwordSeen, setPasswordSeen] = useState(false); // For eye button in password field
  const [recaptchaValidation, setRecaptchaValidation] = useState(false);
  const router = useRouter();

  //=======Google reCAPTCHA handler============
  const captchaHandler = (value) => {
    if (value) {
      setRecaptchaValidation(true);
    } else {
      setRecaptchaValidation(false);
    }
  };

  //=================Form submission handler=============
  const formHandler = async (data) => {
    const email = data.email;
    const password = data.password;
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/",
      });
      // console.log("SignIn() function result for credential", result);
      if (result.ok) {
        reset();
        router.push("/");
      } else {
        toast.error("Log in failed", {
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form onSubmit={handleSubmit(formHandler)} className="py-4">
      {/* =====email field====== */}
      <div>
        <label className="my-3 font-semibold text-gray-700">Email</label> <br />
        <input
          {...register("email")}
          className="border border-gray-300 p-4 w-full rounded-lg mt-3 focus:outline-0"
          placeholder="Enter your email"
          type="email"
          required
        />
      </div>
      {/* =====password field====== */}
      <div className="my-6">
        <label className="my-3 font-semibold text-gray-700">Password</label>{" "}
        <br />
        <div className="relative mt-3">
          <input
            {...register("password")}
            className="border border-gray-300 p-4 w-full  rounded-lg focus:outline-0"
            placeholder="Enter your password"
            type={`${passwordSeen ? "text" : "password"}`}
            required
          />
          {passwordSeen ? (
            <div onClick={() => setPasswordSeen(false)}>
              <FaEye className="text-xl md:text-2xl text-gray-800 absolute right-2 bottom-1/2 top-1/2 -translate-y-1/2 cursor-pointer" />
            </div>
          ) : (
            <div onClick={() => setPasswordSeen(true)}>
              <LuEyeClosed className="text-xl md:text-2xl text-gray-800 absolute right-2 bottom-1/2 top-1/2 -translate-y-1/2 cursor-pointer" />
            </div>
          )}
        </div>
      </div>
      {/* -----Google reCaptcha-------------- */}
      <div className="mb-2">
        <ReCAPTCHA
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
          onChange={captchaHandler}
          onExpired={captchaHandler}
        />
      </div>
      {/* ---------Form submission button-------- */}
      {recaptchaValidation ? (
        <button type="submit" className="bg-indigo-500 py-4 rounded-md text-white font-bold cursor-pointer w-full transition">
          Log In
        </button>
      ) : (
        <button
          type="submit"
          className="bg-indigo-500 opacity-50 py-4 rounded-md text-white font-bold cursor-not-allowed w-full transition"
          disabled
        >
          Log In
        </button>
      )}
    </form>
  );
};

export default SignInPageForm;
