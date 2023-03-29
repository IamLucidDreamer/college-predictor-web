import React from "react";

const Updates = () => {
  return (
    <div className="hidden lg:block w-1/4 max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow-xl sm:p-8">
      <div class="flex items-center justify-between mb-4">
        <h5 class="text-xl font-bold leading-none text-gray-900">
          Latest Updates
        </h5>
        <a
          href="#"
          class="text-sm font-medium text-blue-600 hover:underline"
        >
          View all
        </a>
      </div>
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  );
};

export default Updates;

const Card = () => {
  return (
    <div class="">
      <div class="flow-root">
        <ul role="list" class="divide-y divide-gray-200">
          <li class="py-3 sm:py-4">
            <div class="flex items-center space-x-4">
              <div class="flex-shrink-0">
                <img
                  class="w-8 h-8 rounded-full"
                  src="/docs/images/people/profile-picture-4.jpg"
                  alt="Lana image"
                />
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate">
                  Lana Byrd
                </p>
                <p class="text-sm text-gray-500 truncate">
                  email@windster.com
                </p>
              </div>
              <div class="inline-flex items-center text-base font-semibold text-gray-900">
                $367
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};
