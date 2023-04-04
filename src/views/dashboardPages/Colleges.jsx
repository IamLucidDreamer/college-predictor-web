import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { serverUnauth } from "../../helpers/apiCall";
import Updates from "../layout/Updates";
import dayjs from "dayjs";

const Colleges = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    serverUnauth
      .get(`/blog/get-all`)
      .then((res) => {
        setData(res?.data?.data?.blogs);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="p-4 sm:p-8 mx-auto container">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-3xl font-bold leading-none text-secondary mt-2">
          Blogs
        </h5>
      </div>
      <div className="flex justify-between items-start gap-6">
        <div className="w-full lg:w-3/4 flex flex-col gap-8">
          {data?.map((val) => {
            return (
              <CollgeCard
                title={val?.title}
                description={val?.description}
                image={val?.image}
                createdAt={val?.createdAt}
              />
            );
          })}
        </div>
        <Updates />
      </div>
    </div>
  );
};

export default Colleges;

const CollgeCard = ({ title, description, image, createdAt }) => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col rounded-lg bg-white shadow-md md:max-w-5xl md:flex-row">
        <img
          className="h-96 w-full rounded-t-lg object-cover md:h-auto md:w-60 md:rounded-none md:rounded-l-lg"
          src={image}
          alt=""
        />
        <div className="flex flex-col justify-start p-6">
          <p className="text-secondary font-semibold text-2xl mb-4">{title}</p>
          <p className="mb-4 text-base text-secondary">{description}</p>
          <p className="text-sm text-gray-700 truncate">
            {dayjs(createdAt).format("YYYY-MM-DD  HH:mm")}
          </p>
        </div>
      </div>
    </div>
  );
};
