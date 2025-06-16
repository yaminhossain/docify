"use client";

const CreateAndJoinDocument = () => {
  return (
    <div className="max-w-2/4 w-full flex gap-2">
      <button className="border border-indigo-500 bg-white hover:bg-indigo-500 hover:text-white transition p-5 rounded-full cursor-pointer flex-1">
        Join an Existing Document
      </button>
      <button className="bg-indigo-500 hover:bg-indigo-400 transition text-white p-5 rounded-full cursor-pointer flex-1">
        {" "}
        New Document
      </button>
    </div>
  );
};

export default CreateAndJoinDocument;
