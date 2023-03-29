import React from "react";
import Updates from "../layout/Updates";

const BlogPage = () => {
  return (
    <div className="text-4x">
      <div className="flex justify-between items-start gap-6 m-2 lg:m-6">
        <div className="w-full lg:w-3/4 flex flex-col gap-16">
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
        </div>
        <Updates />
      </div>
    </div>
  );
};

export default BlogPage;

const BlogCard = () => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col rounded-lg bg-white shadow-lg md:max-w-5xl md:flex-row">
        <img
          className="h-96 w-full rounded-t-lg object-cover md:h-auto md:w-60 md:rounded-none md:rounded-l-lg"
          src="https://mdbootstrap.com/wp-content/uploads/2020/06/vertical.jpg"
          alt=""
        />
        <div className="flex flex-col justify-start p-6">
          <h5 className="mb-2 text-xl font-medium text-neutral-800">
            Card title
          </h5>
          <p className="mb-4 text-base text-neutral-600">
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.
          </p>
          <p className="text-xs text-neutral-500">Last updated 3 mins ago</p>
        </div>
      </div>
    </div>
  );
};
