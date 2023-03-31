import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { serverUnauth } from "../../helpers/apiCall";
import Updates from "../layout/Updates";

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
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-2xl font-bold leading-none text-secondary my-2">
          Blogs
        </h5>
      </div>
      <div className="flex justify-between items-start gap-6">
        <div className="w-full lg:w-3/4 flex flex-col gap-16">
          {data?.map((val) => {
            return (
              <BlogCard
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

export default BlogPage;

const BlogCard = ({ title, description, image, createdAt }) => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col rounded-lg bg-white shadow-lg md:max-w-5xl md:flex-row">
        <img
          className="h-96 w-full rounded-t-lg object-cover md:h-auto md:w-60 md:rounded-none md:rounded-l-lg"
          src={image}
          alt=""
        />
        <div className="flex flex-col justify-start p-6">
          <h5 className="mb-2 text-xl font-medium text-neutral-800">{title}</h5>
          <p className="mb-4 text-base text-neutral-600">{description}</p>
          <p className="text-xs text-neutral-500">{createdAt}</p>
        </div>
      </div>
    </div>
  );
};
