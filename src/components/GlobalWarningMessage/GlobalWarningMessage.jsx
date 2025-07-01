"use client";
import { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";
import { IoWarningOutline } from "react-icons/io5";

const GlobalWarningMessage = () => {
  const [visibility, setVisibility] = useState(true);
  
  useEffect(() => {
    const closingTime = setInterval(() => {
      setVisibility(false);
    }, 60000);
    return () => {
      clearInterval(closingTime);
    };
  }, []);
  return (
    <div className={`justify-between ${visibility ? "flex " : "hidden"}`}>
      <p
        className={`text-justify bg-amber-100 text-amber-600 p-2 ms-[57px] grow`}
      >
        <IoWarningOutline className="text-lg inline" /> Warning: Server side is
        deployed to <strong>Render</strong>. Render's free instance spins down
        with inactivity, which can delay requests by 50 seconds or more. So, for
        few buttons on their initial request you might need to click{" "}
        <strong>more than once</strong> in one go to view the expected result.
      </p>
      <button
        className="bg-amber-100 text-amber-600 cursor-pointer pe-2"
        onClick={() => {
          setVisibility(false);
        }}
      >
        <FaXmark />
      </button>
    </div>
  );
};

export default GlobalWarningMessage;
