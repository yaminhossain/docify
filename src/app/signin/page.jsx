import signUpAndLoginAnimation from "@/../public/animations/signUpAndLoginAnimation.json";
import LottieAnimation from "@/components/LottieAnimation/LottieAnimation";
import SignInPageForm from "./Components/SignInPageForm";
// import SocialLogin from "@/components/SocialLogin/SocialLogin";
import Link from "next/link";
const SignInPage = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-center text-4xl text-gray-700 font-semibold py-6">
        Login
      </h1>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 flex justify-center items-center">
          <LottieAnimation
            animationData={signUpAndLoginAnimation}
          ></LottieAnimation>
        </div>
        <div className="flex-1 p-4">
          <SignInPageForm></SignInPageForm>
          {/* ======social login======== */}
          {/* <SocialLogin></SocialLogin> */}
          {/* ========Create a new account========= */}
          <p className="my-4 text-center">Don't have an account, <Link href={"/signup"} className="text-indigo-500 font-semibold underline">Sing Up</Link></p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
