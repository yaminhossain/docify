"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import PasswordValidation from "./PasswordValidation";
import { LuEyeClosed } from "react-icons/lu";
import { FaEye } from "react-icons/fa6";
import registerUsers from "@/actions/auth/registerUsers";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const SignUpPageForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const [confirmPasswordOnFocus, setConfirmPasswordOnFocus] = useState(false);
  const [passwordSeen, setPasswordSeen] = useState(false);
  const router = useRouter();

  // ========Password field value============
  const [passwordValue, setPasswordValue] = useState("");

  // =======Password validity check for all validation========
  const [isValidPassword, setIsValidPassword] = useState(false);

  // ============Form submission handler=========
  const formHandler = (data) => {
    const result = registerUsers(data);
    result.then((data) => {
      if (data.status === "failed") {
        toast.error(data.message, {
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else if (data.status === "error") {
        toast.warn(data.message, {
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else if (data.status === "success" && data.userId) {
        toast.success("User account has been created successfully", {
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        reset();
        router.push("/signin");
      }
    });
  };

  // ==========Password Field on Focus=================
  const passwordFieldHandled = (e) => {
    setPasswordValue(e.target.value);
  };
  // ==========Confirm Password Field Event Handler=================
  const confirmPasswordFieldHandler = (e) => {
    const confirmPasswordValue = e.target.value;
    // -----Setting Password validity-----
    if (
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(
        passwordValue
      ) &&
      passwordValue === confirmPasswordValue
    ) {
      setIsValidPassword(true);
    } else {
      setIsValidPassword(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(formHandler)} className="py-4">
      {/* =====name field====== */}
      <div className="mb-6">
        <label className="my-3 font-semibold text-gray-700">Name</label> <br />
        <input
          {...register("name")}
          className="border border-gray-300 p-4 w-full rounded-lg mt-3 focus:outline-0"
          placeholder="Enter your name"
          type="text"
          required
        />
      </div>
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
            className="border border-gray-300 p-4 w-full  rounded-lg  focus:outline-0"
            placeholder="Enter a strong password"
            type={`${passwordSeen ? "text" : "password"}`}
            onChange={passwordFieldHandled}
            required
          />
          {/* eye button */}
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
      {/* ==========Password Validation=============== */}
      <PasswordValidation passwordValue={passwordValue}></PasswordValidation>

      {/* ========confirm password field====== */}
      <div className="my-6">
        <label className="my-3 font-semibold text-gray-700">
          Confirm Password
        </label>{" "}
        <br />
        <div className="relative mt-3 ">
          <input
            {...register("confirmPassword")}
            className="border border-gray-300 p-4 mt-3 w-full rounded-lg focus:outline-0"
            placeholder="Enter your password again"
            type={`${passwordSeen ? "text" : "password"}`}
            onChange={confirmPasswordFieldHandler}
            onFocus={() => setConfirmPasswordOnFocus(true)}
            required
          />
          {/* eye button */}
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
        {confirmPasswordOnFocus && (
          <div>
            {isValidPassword ? (
              <p className="text-green-400 mt-1.5">Good to go!</p>
            ) : (
              <p className="text-red-400 mt-1.5">Password did not match!</p>
            )}
          </div>
        )}
      </div>
      {/* ===========Sign Up button======================= */}
      {isValidPassword ? (
        <button
          type="submit"
          className="bg-indigo-500 py-4 rounded-md text-white font-bold cursor-pointer w-full transition"
        >
          Sign Up
        </button>
      ) : (
        <button
          type="submit"
          className="bg-indigo-500 opacity-50 py-4 rounded-md text-white font-bold cursor-not-allowed w-full transition"
          disabled
        >
          Sign Up
        </button>
      )}
    </form>
  );
};

export default SignUpPageForm;
