import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { server } from "../../helpers/apiCall";
import { useLocation } from "react-router-dom";

const CollegeProfile = () => {
  const location = useLocation();
  console.log(location, "hello");

  const [data, setData] = useState(location.state.data);
  const searchParams = new URLSearchParams(document.location.search);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    if (!location.state.data) {
      server
        .get(`college/get/${searchParams.get("collegeId")}`)
        .then((res) => setData(res.data.data.College[0], "This is res"))
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="bg-gray-100 w-full">
      <div className="relative">
        <img
          style={{ maxHeight: "400px" }}
          className="object-cover w-full"
          src={data?.collegeCover}
          alt=""
        />
        <div className="absolute w-full -bottom-20">
          <img
            className="mx-auto w-40 h-40 shadow-lg border-white"
            src={data?.collegeIcon}
            alt=""
          />
        </div>
      </div>
      <h1 className="text-2xl font-semibold text-center mt-28">
        {data?.displayName || data?.collegeName}
      </h1>
      {/* <h2 className="mt-2 text-xs">Indian Institute of Technology, Argul Campus, Jatani, Khordha, Bhubaneswar, Odisha - 752050</h2> */}
      <div class="container mx-auto my-5 p-5">
        <div class="md:flex no-wrap md:-mx-2 ">
          <div class="w-full mx-2">
            <div class="bg-white p-3 shadow-sm rounded-sm">
              <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                <span clas="text-green-500">
                  <svg
                    class="h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </span>
                <span class="tracking-wide">About</span>
              </div>
              <div class="text-gray-700">
                <div class="grid md:grid-cols-2 text-sm">
                  <div class="grid grid-cols-2">
                    <div class="px-4 py-2 font-semibold">Institute Name</div>
                    <div class="px-4 py-2">{data.collegeName}</div>
                  </div>
                  <div class="grid grid-cols-2">
                    <div class="px-4 py-2 font-semibold">Also Known As</div>
                    <div class="px-4 py-2">{data.collegeTag}</div>
                  </div>
                  <div class="grid grid-cols-2">
                    <div class="px-4 py-2 font-semibold">Institute Type</div>
                    <div class="px-4 py-2">{data.collegeType}</div>
                  </div>
                  <div class="grid grid-cols-2">
                    <div class="px-4 py-2 font-semibold">Established</div>
                    <div class="px-4 py-2">{data.estYear}</div>
                  </div>
                  <div class="grid grid-cols-2">
                    <div class="px-4 py-2 font-semibold">Location</div>
                    <div class="px-4 py-2">{data.state}</div>
                  </div>
                  <div class="grid grid-cols-2">
                    <div class="px-4 py-2 font-semibold">Contact Number</div>
                    <div class="px-4 py-2">{data.contactNumber}</div>
                  </div>
                  <div class="grid grid-cols-2">
                    <div class="px-4 py-2 font-semibold">Hotness Score</div>
                    <div class="px-4 py-2">{data.hotnessScore}</div>
                  </div>
                  <div class="grid grid-cols-2">
                    <div class="px-4 py-2 font-semibold">Ranking</div>
                    <div class="px-4 py-2">{data.ranking}</div>
                  </div>
                  <div class="grid grid-cols-2">
                    <div class="px-4 py-2 font-semibold">Website</div>
                    <div class="px-4 py-2">{data.website}</div>
                  </div>
                </div>
              </div>
            </div>

            {data?.campusPhotos?.length > 0 && (
              <div class="bg-white p-3 shadow-sm rounded-sm">
                <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                  <span clas="text-green-500">
                    <svg
                      class="h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </span>
                  <span class="tracking-wide">Campus Photos</span>
                </div>
                <div className="mt-2">
                  {data?.campusPhotos?.map((item) => (
                    <img
                      key={item}
                      className="border w-40 h-40"
                      src={item}
                      alt=""
                    />
                  ))}
                </div>
              </div>
            )}

            <div class="my-4"></div>

            <div class="bg-white p-3 shadow-sm rounded-sm">
              <div class="grid grid-cols-2">
                <div>
                  <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                    <span clas="text-green-500">
                      <svg
                        class="h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </span>
                    <span class="tracking-wide">COURSES OFFERED</span>
                  </div>
                  <ul class="list-inside space-y-2">
                    {data?.coursesOffered?.map((item) => (
                      <li key={item?.value}>
                        <div class="text-teal-600">{item?.value}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeProfile;
