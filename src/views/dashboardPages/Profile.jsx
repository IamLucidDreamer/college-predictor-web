import React from "react";
import coverImage from "../../assets/images/profile_cover.jpg";

const Profile = () => {
  return (
    <div className="w-full">
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
          <div className="px-1 lg:px-4">
            <div className="my-2">
              <h1 className="font-semibold">Name</h1>
              <h1 className="font-semibold text-lg">Manas Shukla</h1>
            </div>
            <div className="my-2">
              <h1 className="font-semibold">Email</h1>
              <h1 className="font-semibold text-lg">manashukla@gmail.com</h1>
            </div>
            <div className="my-2">
              <h1 className="font-semibold">Phone Number</h1>
              <h1 className="font-semibold text-lg">9569050543</h1>
            </div>
            <div className="my-2">
              <h1 className="font-semibold">Exam</h1>
              <h1 className="font-semibold text-lg">Neet</h1>
            </div>
            <div className="my-2">
              <h1 className="font-semibold">10th Marks</h1>
              <h1 className="font-semibold text-lg">90%</h1>
            </div>
            <div className="my-2">
              <h1 className="font-semibold">12th Marks</h1>
              <h1 className="font-semibold text-lg">90%</h1>
            </div>
            <div className="my-2">
              <h1 className="font-semibold">Home State</h1>
              <h1 className="font-semibold text-lg">U.P.</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
