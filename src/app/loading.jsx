import Spinners from "@/components/Spinners/Spinners";


const loading = () => {
  return (
    <div className="h-screen w-full bg-white/90 flex justify-center items-center fixed top-0 left-0 z-40">
      <Spinners></Spinners>
    </div>
  );
};

export default loading;
