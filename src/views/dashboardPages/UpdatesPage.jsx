import React, { useEffect, useState } from "react";
import { serverUnauth } from "../../helpers/apiCall";
import * as dayjs from "dayjs";

const DashboardUpdates = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    serverUnauth
      .get(`/updates/get-all`)
      .then((res) => {
        setData(res?.data?.data?.updates);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="p-4 sm:p-8 mx-auto container">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-3xl font-bold leading-none text-secondary mt-2">
          Latest Updates
        </h5>
      </div>
      <div className="flex flex-col gap-6 my-2">
        {data?.map((val) => {
          return (
            <Card
              title={val?.title}
              description={val?.description}
              imageMain={val?.imageMain}
              document={val?.document}
              createdAt={val?.createdAt}
            />
          );
        })}
      </div>
      {/* <button
        onClick={() => {}}
        className="text-secondary font-semibold text-lg text-center w-full mt-4"
      >
        See Older
      </button> */}
    </div>
  );
};

export default DashboardUpdates;

const Card = ({ title, description, imageMain, document, createdAt }) => {
  return (
    <div className="bg-white shadow-md rounded-lg py-2 px-2 md:px-4 lg:px-6">
      <div className="flow-root">
        <div role="list" className="divide-y divide-gray-200">
          <div className="py-3 sm:py-4">
            <div className="flex flex-col lg:flex-row items-center gap-4">
              <div className="flex-shrink-0">
                <img
                  className="w-28 h-28 rounded-2xl object-cover"
                  src={imageMain}
                  alt="Lana image"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-secondary font-semibold text-xl mb-4">
                  {title}
                </p>
                <p className="font-medium text-secondaryr mb-2 ">{description}</p>
                <p className="text-sm text-gray-700 truncate">
                  {dayjs(createdAt).format(
                    "YYYY-MM-DD  HH:mm"
                  )}
                </p>
              </div>
              {document && (
                <a
                  href={document}
                  target="_blank"
                  className="text-base lg:text-lg rounded-lg bg-secondary text-white py-2 w-full lg:w-40 text-center "
                >
                  View
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
