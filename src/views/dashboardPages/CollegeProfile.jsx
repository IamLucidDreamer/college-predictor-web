import React from "react";

const CollegeProfile = () => {
  return (
    <div class="bg-gray-100">
      <div className="bg-blue-900 p-20 pb-10 text-white text-center">
        <img className="mx-auto w-40 h-40 border-4 border-white" src="https://img.collegepravesh.com/2016/06/IIT-Bhubaneswar-Logo.png" alt="" />
        <h1 className="mt-5 text-2xl font-semibold">Indian Institute of Technology, Bhubaneswar</h1>
        <h2 className="mt-2 text-xs">Indian Institute of Technology, Argul Campus, Jatani, Khordha, Bhubaneswar, Odisha - 752050</h2>
      </div>
      <div class="container mx-auto my-5 p-5">
        <div class="md:flex no-wrap md:-mx-2 ">
          <div class="w-full md:w-3/12 md:mx-2">
            <div class="bg-white p-3 border-t-4 border-green-400 font-semibold text-gray-900 text-xl leading-8">
              <span>CONNECTIVITY (HOW TO REACH)</span>
              <div className="mt-2 text-sm font-normal">
                <h2>Biju Patnaik International Airport, Bhubaneswar</h2>
                <span className="text-gray-500">26 km</span>
              </div>
              <div className="mt-2 text-sm font-normal">
                <h2>Khurda Road Junction</h2>
                <span className="text-gray-500">6 km</span>
              </div>
              <div className="mt-2 text-sm font-normal">
                <h2>Bhubaneswar Railway Station</h2>
                <span className="text-gray-500">28 km</span>
              </div>
            </div>

            <div class="my-4"></div>

            <div class="bg-white p-3 hover:shadow">
              <div class="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8">
                <span class="text-green-500">
                  <svg
                    class="h-5 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </span>
                <span>INSTITUTE FEE</span>
              </div>
              <div className="mt-2">
                <h2 className="text-sm">Caution Money (One Time, Refundable)</h2>
                <span className="text-teal-600">₹5,000</span>
                <h2 className="text-sm">One Time Fees</h2>
                <span className="text-teal-600">₹3,900</span>
                <h2 className="text-sm">Tuition Fee (per Semester)</h2>
                <span className="text-teal-600">₹1,00,000</span>
                <h2 className="text-sm">Other fees (per Semester)</h2>
                <span className="text-teal-600">₹4,500</span>
                <h2 className="text-sm">Annual Fees</h2>
                <span className="text-teal-600">₹2,390</span>
              </div>
            </div>

            <div class="mt-4 bg-white p-3 hover:shadow">
              <div class="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8">
                <span class="text-green-500">
                  <svg
                    class="h-5 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </span>
                <span>HOSTEL FEE</span>
              </div>
              <div className="mt-2">
                <h2 className="text-sm">Hostel Caution Money (One Time, Refundable)</h2>
                <span className="text-teal-600">₹4,000</span>
                <h2 className="text-sm">Mess Caution Money (One Time, Refundable)</h2>
                <span className="text-teal-600">₹3,000</span>
                <h2 className="text-sm">One Time Fees</h2>
                <span className="text-teal-600">₹2,000</span>
                <h2 className="text-sm">Hostel Seat Rent (per Semester)</h2>
                <span className="text-teal-600">₹500</span>
                <h2 className="text-sm">Electricity & Water charges (per Semester)</h2>
                <span className="text-teal-600">₹1,500</span>
                <h2 className="text-sm">Other fees (per Semester)</h2>
                <span className="text-teal-600">₹8,500</span>
                <h2 className="text-sm">Mess Advance (per Semester)</h2>
                <span className="text-teal-600">₹14,000</span>
              </div>
            </div>
          </div>

          <div class="w-full md:w-9/12 mx-2 h-64">
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
                    <div class="px-4 py-2">Indian Institute of Technology, Bhubaneswar</div>
                  </div>
                  <div class="grid grid-cols-2">
                    <div class="px-4 py-2 font-semibold">Also Known As</div>
                    <div class="px-4 py-2">IIT BBS</div>
                  </div>
                  <div class="grid grid-cols-2">
                    <div class="px-4 py-2 font-semibold">Institute Type</div>
                    <div class="px-4 py-2">Government</div>
                  </div>
                  <div class="grid grid-cols-2">
                    <div class="px-4 py-2 font-semibold">Established</div>
                    <div class="px-4 py-2">2008</div>
                  </div>
                  <div class="grid grid-cols-2">
                    <div class="px-4 py-2 font-semibold">Location</div>
                    <div class="px-4 py-2">Bhubaneswar, Odisha</div>
                  </div>
                </div>
              </div>
              <button class="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">
                Show Full Information
              </button>
            </div>

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
                    <li>
                      <div class="text-teal-600">Civil Engineering</div>
                    </li>
                    <li>
                      <div class="text-teal-600">Computer Science and Engineering</div>
                    </li>
                    <li>
                      <div class="text-teal-600">Electrical Engineering</div>
                    </li>
                    <li>
                      <div class="text-teal-600">Electronics and Communication Engineering</div>
                    </li>
                    <li>
                      <div class="text-teal-600">Mechanical Engineering</div>
                    </li>
                    <li>
                      <div class="text-teal-600">Metallurgical and Materials Engineering</div>
                    </li>
                  </ul>
                </div>
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
                        <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
                        <path
                          fill="#fff"
                          d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                        />
                      </svg>
                    </span>
                    <span class="tracking-wide">TOP RECRUITERS</span>
                  </div>
                  <div className="flex gap-12">
                    <ul class="list-inside space-y-2">
                      <li>
                        <div class="text-teal-600">Adobe</div>
                      </li>
                      <li>
                        <div class="text-teal-600">Amazon</div>
                      </li>
                      <li>
                        <div class="text-teal-600">BEL</div>
                      </li>
                      <li>
                        <div class="text-teal-600">Byjus</div>
                      </li>
                      <li>
                        <div class="text-teal-600">C-DAC</div>
                      </li>
                      <li>
                        <div class="text-teal-600">D.E.Shaw</div>
                      </li>
                      <li>
                        <div class="text-teal-600">Flipkart</div>
                      </li>
                      <li>
                        <div class="text-teal-600">FlyFin</div>
                      </li>
                      <li>
                        <div class="text-teal-600">GAIL</div>
                      </li>
                    </ul>
                    <ul class="list-inside space-y-2">
                      <li>
                        <div class="text-teal-600">Adobe</div>
                      </li>
                      <li>
                        <div class="text-teal-600">Amazon</div>
                      </li>
                      <li>
                        <div class="text-teal-600">BEL</div>
                      </li>
                      <li>
                        <div class="text-teal-600">Byjus</div>
                      </li>
                      <li>
                        <div class="text-teal-600">C-DAC</div>
                      </li>
                      <li>
                        <div class="text-teal-600">D.E.Shaw</div>
                      </li>
                      <li>
                        <div class="text-teal-600">Flipkart</div>
                      </li>
                      <li>
                        <div class="text-teal-600">FlyFin</div>
                      </li>
                      <li>
                        <div class="text-teal-600">GAIL</div>
                      </li>
                    </ul>
                  </div>
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
