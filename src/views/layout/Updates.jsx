import React, { useEffect, useState } from "react";
import { serverUnauth } from "../../helpers/apiCall";

const Updates = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    serverUnauth
      .get(`/updates/get-all`)
      .then((res) => {
        setData(res?.data?.data?.updatess);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="hidden lg:block w-1/4 max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow-xl sm:p-8">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900">
          Latest Updates
        </h5>
        <a href="#" className="text-sm font-medium text-blue-600 hover:underline">
          View all
        </a>
      </div>
      {data?.map((val) => {
        return (
          <Card
            title={val?.title}
            description={val?.description}
            image={val?.image}
            document={val?.document}
            createdAt={val?.createdAt}
          />
        );
      })}
    </div>
  );
};

export default Updates;

const Card = ({ title, description, image, document, createdAt }) => {
  return (
    <div className="">
      <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200">
          <li className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <img
                  className="w-12 h-12 rounded-full"
                  src={image}
                  alt="Lana image"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-secondary font-semibold">
                  {title}
                </p>
                <p className="text-sm font-medium text-gray-900 truncate">
                  {description}
                </p>
                <p className="text-sm text-gray-500 truncate">{createdAt}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};
