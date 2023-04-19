import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { serverUnauth } from "../../helpers/apiCall";
import Updates from "../layout/Updates";
import dayjs from "dayjs";
import { truncate } from "../../helpers";
import MainHeading from "../../components/shared/MainHeading";
import { useNavigate } from "react-router-dom";

const BlogPage = () => {
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
        <MainHeading text={"Blogs"} />
      </div>
      <div className="flex justify-between items-start gap-6">
        <div className="w-full lg:w-3/4 flex flex-col gap-y-8">
          {data?.map((val) => {
            return (
              <BlogCard
                title={val?.title}
                description={val?.description}
                imageSecondary={val?.imageSecondary}
                createdAt={val?.createdAt}
                id={val?._id}
              />
            );
          })}
        </div>
        <Updates />
      </div>
    </div>
  );
};

export default BlogPage;

const BlogCard = ({ title, description, imageSecondary, id, createdAt }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col rounded-lg bg-white shadow-md md:max-w-5xl md:flex-row w-full">
      <img
        className="h-72 rounded-t-lg object-cover md:w-60  md:rounded-none md:rounded-l-lg"
        src={imageSecondary}
        alt=""
      />
      <div className="flex flex-col justify-start p-6 w-full">
        <p className="text-secondary font-semibold text-2xl mb-4 text-justify">
          {title}
        </p>
        <p className="mb-4 text-base text-secondary text-justify">
          {truncate(description)}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <p
            className="text-sm text-gray-700 border-secondary border-opacity-20 rounded-full py-1 px-2"
            style={{ borderWidth: "1px" }}
          >
            {dayjs(createdAt).format("YYYY-MM-DD  HH:mm")}
          </p>
          <button
            className="bg-primary px-2.5 py-1.5 rounded-lg text-white font-semibold text-sm"
            onClick={() => navigate(`/dashboard/blogs/${id}`)}
          >
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};
