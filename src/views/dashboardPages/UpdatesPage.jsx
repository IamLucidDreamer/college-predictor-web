import React, { useEffect, useState } from "react";
import { serverUnauth } from "../../helpers/apiCall";

const DashboardUpdates = () => {
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
    <div className="p-4 sm:p-8 mx-auto container">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-2xl font-bold leading-none text-secondary mt-2">
          Latest Updates
        </h5>
      </div>
      <div className="flex flex-col gap-6">
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
    </div>
  );
};

export default DashboardUpdates;

const Card = ({ title, description, image, document, createdAt }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-3">
      <div className="flow-root">
        <div role="list" className="divide-y divide-gray-200">
          <div className="py-3 sm:py-4">
            <div className="flex flex-col lg:flex-row items-center gap-4">
              <div className="flex-shrink-0">
                <img
                  className="w-12 h-12 rounded-full"
                  src={image}
                  alt="Lana image"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-secondary font-semibold">{title}</p>
                <p className="text-sm font-medium text-gray-900">
                  {description}
                </p>
                <p className="text-sm text-gray-500 truncate">{createdAt}</p>
              </div>
              <a
                href={document}
                target="_blank"
                className="text-base lg:text-lg rounded-lg bg-secondary text-white py-2 w-60 text-center "
              >
                View
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
