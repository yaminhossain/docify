import updateUserProfile from "@/lib/updateUserProfile";
import { signOut } from "next-auth/react";
import Swal from "sweetalert2";

const UserProfileUpdatingForm = ({ userData }) => {

  const formSubmissionHandler = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    // const password = form.password.value;
    const image = form.image.value;
    const updatedUserData = { name, email, image };
    // console.log("Updated user data", updatedUserData);
    const result = await updateUserProfile(updatedUserData);
    console.log("result", result);
    if (result?.modifiedCount > 0) {
      Swal.fire({
        title: "Profile updated successfully",
        text: "Please login again to see the changes!",
        icon: "success",
      }).then((result) => {
        if (result.isConfirmed) {
          signOut();
        }
      });
    }
  };
  return (
    <form onSubmit={formSubmissionHandler}>
      {/* ---------name--------- */}
      <div>
        <label htmlFor="name" className="font-bold">
          Full name:
        </label>
        <br />
        <input
          required
          type="text"
          name="name"
          defaultValue={userData?.data?.user?.name}
          placeholder="Enter your name"
          className="w-full border border-gray-400 p-2 my-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
        />
      </div>
      {/* ----------email-------- */}
      <div>
        <label htmlFor="email" className="font-bold">
          Email:
        </label>
        <br />
        <input
          readOnly
          type="email"
          name="email"
          defaultValue={userData?.data?.user?.email}
          placeholder="Enter your email"
          className="w-full border p-2 my-3 rounded-md border-gray-200 bg-gray-50 text-gray-500 focus:outline-none"
        />
      </div>
      {/* ----------Password-------- */}
      {/* <div>
        <label htmlFor="email" className="font-bold">
          Password:
        </label>
        <br />
        <input
          required
          type="password"
          name="password"
          placeholder="Enter a strong password"
          className="w-full border border-gray-400 p-2 my-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
        />
      </div> */}
      {/* ----------Profile photo-------- */}
      <div>
        <label htmlFor="image" className="font-bold">
          Profile photo URL
        </label>
        <br />
        <input
          required
          type="text"
          name="image"
          defaultValue={userData?.data?.user?.image}
          placeholder="Enter a photo URL"
          className="w-full border border-gray-400 p-2 my-3 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
        />
      </div>
      <button
        type="submit"
        className="cursor-pointer w-full bg-indigo-500 text-white hover:bg-indigo-600 p-2 rounded-lg "
      >
        Update profile
      </button>
    </form>
  );
};

export default UserProfileUpdatingForm;
