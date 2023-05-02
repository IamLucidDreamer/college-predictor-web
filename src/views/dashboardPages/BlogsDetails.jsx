import React, { useEffect, useState } from "react";
import BlogsSidebar from "../layout/BlogsSidebar";
import { serverUnauth } from "../../helpers/apiCall";
import { useParams } from "react-router-dom";

const BlogsDetails = () => {
  const { blogId } = useParams();
  const [blogDetail, setBlogDetails] = useState();

  useEffect(() => {
    serverUnauth
      .get(`/blog/get/${blogId}`)
      .then((res) => {
        setBlogDetails(res?.data?.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="flex items-start justify-between gap-4 mt-12">
      <div className="bg-gray-50 w-3/4">
        <div className=" px-10 pyb-6 mx-auto">
          <div className="max-w-6xl px-10 py-6 mx-auto bg-gray-50">
            <a href="#_" className="block transition duration-200 ease-out">
              <img
                className="object-cover w-full shadow-sm"
                src={blogDetail?.imageMain}
                style={{ maxHeight: "600px" }}
              />
            </a>

            <div className="mt-4">
              <a
                href="#"
                className="sm:text-3xl md:text-3xl lg:text-3xl xl:text-4xl font-bold text-secondary  hover:underline"
              >
                {blogDetail?.title}
              </a>

              {/* <div className="font-light text-gray-600">
                <a href="#" className="flex items-center mt-6 mb-6">
                  <img
                    src="https://avatars.githubusercontent.com/u/71964085?v=4"
                    alt="avatar"
                    className="hidden object-cover w-14 h-14 mx-4 rounded-full sm:block"
                  />
                  <h1 className="font-bold text-gray-700 hover:underline">
                    By James Amos
                  </h1>
                </a>
              </div> */}
            </div>

            <div className="max-w-4xl  mx-auto text-2xl text-gray-700 mt-4">
              <div>
                <p className="mt-2 p-8 whitespace-pre-line">
                  {blogDetail?.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <BlogsSidebar />
    </div>
  );
};

export default BlogsDetails;
