import React from "react";
import coverImage from "../../assets/images/profile_cover.jpg";
import Footer from "../../components/shared/Footer";
import Header from "../../components/shared/Header";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((state) => state.user);
  return (
    <div className="w-full">
      <Header />
      <div
        className="h-36 lg:h-60 w-full bg-no-repeat bg-center bg-cover"
        style={{
          backgroundImage: `url(${coverImage})`,
        }}
      ></div>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="border-2 border-white">
          <img
            src={coverImage}
            className="rounded-full w-32 h-32 lg:w-52 lg:h-52 -mt-16 lg:-mt-28 border-8 border-white"
          />
          <div className="text-right px-1 lg:px-4">
            <button className="bg-blue-500 text-white p-2 px-4 rounded-md">
              Edit Details
            </button>
          </div>
          <div className="px-1 lg:px-4 flex flex-wrap w-1/2">
            <div className="my-2 w-[15rem]">
              <h1 className="text-gray-500">Name</h1>
              <h1 className="font-semibold text-lg">{user?.name}</h1>
            </div>
            <div className="my-2 w-[15rem]">
              <h1 className="text-gray-500">Email</h1>
              <h1 className="font-semibold text-lg">{user?.email}</h1>
            </div>
            <div className="my-2 w-[15rem]">
              <h1 className="text-gray-500">Phone Number</h1>
              <h1 className="font-semibold text-lg">{user?.phoneNumber}</h1>
            </div>
            <div className="my-2 w-[15rem]">
              <h1 className="text-gray-500">Exam</h1>
              <h1 className="font-semibold text-lg">
                {user?.examType == 1 ? "JEE" : "NEET"}
              </h1>
            </div>
            {user?.tenthMark && (
              <div className="my-2 w-[15rem]">
                <h1 className="text-gray-500">10th Marks</h1>
                <h1 className="font-semibold text-lg">{user?.tenthMark}%</h1>
              </div>
            )}
            {user?.twelthMarks && (
              <div className="my-2 w-[15rem]">
                <h1 className="text-gray-500">12th Marks</h1>
                <h1 className="font-semibold text-lg">{user?.twelthMarks}%</h1>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
