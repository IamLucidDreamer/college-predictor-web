import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { server } from "../../helpers/apiCall";
import { useLocation } from "react-router-dom";

const CollegeProfile = () => {
  const location = useLocation();

  const [data, setData] = useState(location?.state?.data || {});
  const searchParams = new URLSearchParams(document.location.search);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    if (!location?.state?.data) {
      server
        .get(`college/get/${searchParams.get("collegeId")}`)
        .then((res) => setData(res?.data?.data?.College[0], "This is res"))
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="bg-gray-100 w-full">
      <div className="relative">
        <img
          style={{ maxHeight: "300px" }}
          className="object-cover w-full"
          src={data?.collegeCover}
          alt=""
        />
        <div className="absolute w-full -bottom-16 sm:-bottom-20">
          <img
            className="mx-auto w-32 sm:w-40 h-32 sm:h-40 shadow-lg border-white bg-white rounded"
            src={data?.collegeIcon}
            alt=""
          />
        </div>
      </div>
      <h1 className="text-xl md:text-2xl font-semibold text-center mt-20 sm:mt-28">
        {data?.displayName || data?.collegeName}
      </h1>
      
      <div class="container mx-auto my-5">
        <div class="md:flex no-wrap md:-mx-2 ">
          <div class="w-full mx-2">
            <div class="bg-white px-1 py-3 md:p-3 shadow rounded">
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
                  {data.collegeName && (
                    <div class="grid grid-cols-2">
                      <div class="px-2 md:px-4 py-2 font-semibold">
                        Institute Name
                      </div>
                      <div class="px-2 md:px-4 py-2">{data.collegeName}</div>
                    </div>
                  )}
                  {data.displayName && (
                    <div class="grid grid-cols-2">
                      <div class="px-2 md:px-4 py-2 font-semibold">
                        Also Known as Name
                      </div>
                      <div class="px-2 md:px-4 py-2">{data.displayName}</div>
                    </div>
                  )}
                  {data.collegeTag && (
                    <div class="grid grid-cols-2">
                      <div class="px-2 md:px-4 py-2 font-semibold">
                        College Tag
                      </div>
                      <div class="px-2 md:px-4 py-2">{data.collegeTag}</div>
                    </div>
                  )}
                  {data.collegeType && (
                    <div class="grid grid-cols-2">
                      <div class="px-2 md:px-4 py-2 font-semibold">
                        College Type
                      </div>
                      <div class="px-2 md:px-4 py-2">{data.collegeType}</div>
                    </div>
                  )}
                  {data.estYear && (
                    <div class="grid grid-cols-2">
                      <div class="px-2 md:px-4 py-2 font-semibold">
                        Establishment Year
                      </div>
                      <div class="px-2 md:px-4 py-2">{data.estYear}</div>
                    </div>
                  )}
                  {data.city && (
                    <div class="grid grid-cols-2">
                      <div class="px-2 md:px-4 py-2 font-semibold">City</div>
                      <div class="px-2 md:px-4 py-2">{data.city}</div>
                    </div>
                  )}
                  {data.state && (
                    <div class="grid grid-cols-2">
                      <div class="px-2 md:px-4 py-2 font-semibold">State</div>
                      <div class="px-2 md:px-4 py-2">{data.state}</div>
                    </div>
                  )}
                  {data.state && data.city && data.address && (
                    <div class="grid grid-cols-2">
                      <div class="px-2 md:px-4 py-2 font-semibold">Address</div>
                      <div class="px-2 md:px-4 py-2">
                        {data.address}, {data.city}, {data.state}
                      </div>
                    </div>
                  )}
                  {data.ranking && (
                    <div class="grid grid-cols-2">
                      <div class="px-2 md:px-4 py-2 font-semibold">Ranking</div>
                      <div class="px-2 md:px-4 py-2">{data.ranking}</div>
                    </div>
                  )}
                  {data.contactNumber && (
                    <div class="grid grid-cols-2">
                      <div class="px-2 md:px-4 py-2 font-semibold">
                        Phone Number
                      </div>
                      <div class="px-2 md:px-4 py-2">{data.contactNumber}</div>
                    </div>
                  )}
                  {data.website && (
                    <div class="grid grid-cols-2">
                      <div class="px-2 md:px-4 py-2 font-semibold">Website</div>
                      <div class="px-2 md:px-4 py-2">{data.website}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {data?.campusPhotos?.length > 0 && (
              <div class="bg-white px-1 py-3 md:p-3 shadow rounded my-5">
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
                <div className="m-2 md:m-4 flex flex-wrap gap-2 md:gap-4">
                  {data?.campusPhotos?.map((item) => (
                    <img
                      key={item}
                      className="shadow rounded w-40 h-40 object-cover"
                      src={item}
                      alt=""
                    />
                  ))}
                </div>
              </div>
            )}

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
