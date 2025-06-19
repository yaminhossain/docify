import signUpAndLoginAnimation from "@/../public/animations/signUpAndLoginAnimation.json";
import LottieAnimation from "@/components/LottieAnimation/LottieAnimation";
// import SocialLogin from "@/components/SocialLogin/SocialLogin";
import Link from "next/link";
import SignUpPageForm from "./Components/SignUpPageForm";

const SignUpPage = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-center text-4xl text-gray-700 font-semibold py-6">
        Sign Up
      </h1>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 flex justify-center items-center">
          <LottieAnimation
            animationData={signUpAndLoginAnimation}
          ></LottieAnimation>
        </div>
        <div className="flex-1 p-4">
          <SignUpPageForm></SignUpPageForm>
          {/* ======social login======== */}
          {/* <SocialLogin></SocialLogin> */}
          {/* ========Create a new account========= */}
          <p className="my-4 text-center">Already have an account, <Link href={"/signin"} className="text-indigo-500 font-semibold underline">Log In</Link></p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
