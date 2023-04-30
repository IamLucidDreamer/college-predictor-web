import React from "react";
import coverImage from "../../assets/images/profile_cover.jpg";
import Footer from "../../components/shared/Footer";
import Header from "../../components/shared/Header";
import { useSelector } from "react-redux";
import { useState } from "react";
import { PencilAltIcon } from "@heroicons/react/outline";
import { server } from "../../helpers/apiCall";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const [edit, setEdit] = useState(false);
  const [img, setImg] = useState([]);
  const [src, setSrc] = useState(coverImage);
  const [val, setVal] = useState({
    name: user?.name,
    dob: user?.dob,
    email: user?.email,
    gender: user?.gender,
    address: user?.address,
    phone: user?.phoneNumber,
    examType: user?.examType,
    tenthMark: user?.tenthMark,
    twelthMarks: user?.twelthMarks,
  });

  console.log(user, "This is img");

  const convertImage = (e) => {
    setImg(e.target.files[0]);
    setSrc(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = () => {
    const form = new FormData();
    form.append("name", val.name);
    form.append("dob", val.dob);
    form.append("gender", val.gender);
    form.append("address", val.address);
    form.append("examType", val.examType);
    form.append("tenthMark", val.tenthMark);
    form.append("twelthMarks", val.twelthMarks);
    form.append("profileImage", img);

    server.post('/user/update', form)
    .then((res) => console.log(res,"This is res"))
    .catch((err) => console.log(err))
  }

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
          <div className="relative w-fit">
            <img
              src={src}
              className="rounded-full w-32 h-32 lg:w-52 lg:h-52 -mt-16 lg:-mt-28 border-8 border-white"
            />
            {edit ? (
              <label forHtml="file">
                <PencilAltIcon className="w-8 text-blue-500 absolute bottom-3 right-3 lg:bottom-5 lg:right-5" />
                <input
                  hidden
                  accept="image/*"
                  multiple={false}
                  type="file"
                  onChange={(e) => convertImage(e)}
                />
              </label>
            ) : null}
          </div>
          <div className="text-right px-1 lg:px-4">
            {!edit ? (
              <button
                className="bg-blue-500 text-white p-2 px-4 rounded-md"
                onClick={() => setEdit(!edit)}
              >
                Edit Details
              </button>
            ) : null}
            {edit ? (
              <button
                className="bg-green-500 text-white p-2 px-4 rounded-md"
                onClick={() => handleSubmit()}
              >
                Save Changes
              </button>
            ) : null}
          </div>
          <div className="px-1 lg:px-4 flex flex-wrap gap-5 w-1/2">
            <div className="my-2 w-60">
              <h1 className="text-gray-500">Name</h1>
              <input
                disabled={!edit}
                className={`w-full font-semibold text-lg bg-transparent p-1 border rounded-md focus:outline-blue-700 ${
                  edit ? "border-blue-500" : "border-transparent"
                }`}
                value={val.name}
                onChange={(e) => setVal({ ...val, name: e.target.value })}
              />
            </div>
            <div className="my-2 w-60">
              <h1 className="text-gray-500">Date of Birth</h1>
              <input
                disabled={!edit}
                className={`w-full font-semibold text-lg bg-transparent p-1 border rounded-md focus:outline-blue-700 ${
                  edit ? "border-blue-500" : "border-transparent"
                }`}
                value={val.dob}
                onChange={(e) => setVal({ ...val, dob: e.target.value })}
              />
            </div>
            <div className="my-2 w-60">
              <h1 className="text-gray-500">Gender</h1>
              <select
                value={val.gender}
                disabled={!edit}
                onChange={(e) => setVal({ ...val, gender: e })}
                className={`w-full font-semibold text-lg bg-transparent p-1 border rounded-md focus:outline-blue-700 ${
                  edit ? "border-blue-500" : "border-transparent"
                }`}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="my-2 w-60">
              <h1 className="text-gray-500">Address</h1>
              <input
                disabled={!edit}
                className={`w-full font-semibold text-lg bg-transparent p-1 border rounded-md focus:outline-blue-700 ${
                  edit ? "border-blue-500" : "border-transparent"
                }`}
                value={val.address}
                onChange={(e) => setVal({ ...val, address: e.target.value })}
              />
            </div>
            <div className="my-2 w-60">
              <h1 className="text-gray-500">Email</h1>
              <input
                disabled={true}
                className={`w-full font-semibold text-lg bg-transparent p-1 rounded-md focus:outline-blue-700`}
                value={val.email}
              />
            </div>
            <div className="my-2 w-60">
              <h1 className="text-gray-500">Phone Number</h1>
              <input
                disabled={true}
                className={`w-full font-semibold text-lg bg-transparent p-1 rounded-md focus:outline-blue-700`}
                value={val.phone}
              />
            </div>
            <div className="my-2 w-60">
              <h1 className="text-gray-500">Exam</h1>
              <select
                value={val.examType}
                disabled={!edit}
                onChange={(e) => setVal({ ...val, examType: e })}
                className={`w-full font-semibold text-lg bg-transparent p-1 border rounded-md focus:outline-blue-700 ${
                  edit ? "border-blue-500" : "border-transparent"
                }`}
              >
                <option value={1}>JEE</option>
                <option value={2}>NEET</option>
              </select>
            </div>
            {user?.tenthMark && (
              <div className="my-2 w-60">
                <h1 className="text-gray-500">10th Marks (%)</h1>
                <input
                  disabled={!edit}
                  className={`w-full font-semibold text-lg bg-transparent p-1 border rounded-md focus:outline-blue-700 ${
                    edit ? "border-blue-500" : "border-transparent"
                  }`}
                  value={val.tenthMark}
                  onChange={(e) => setVal({ ...val, tenthMark: e.target.value })}
                />
              </div>
            )}
            {user?.twelthMarks && (
              <div className="my-2 w-60">
                <h1 className="text-gray-500">12th Marks (%)</h1>
                <input
                  disabled={!edit}
                  className={`w-full font-semibold text-lg bg-transparent p-1 border rounded-md focus:outline-blue-700 ${
                    edit ? "border-blue-500" : "border-transparent"
                  }`}
                  value={val.twelthMarks}
                  onChange={(e) => setVal({ ...val, twelthMarks: e.target.value })}
                />
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
