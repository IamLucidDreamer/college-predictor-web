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
      <div class="bg-gray-50 w-3/4">
        <div class=" px-10 pyb-6 mx-auto">
          <div class="max-w-6xl px-10 py-6 mx-auto bg-gray-50">
            <a
              href="#_"
              class="block transition duration-200 ease-out transform hover:scale-110"
            >
              <img
                class="object-cover w-full shadow-sm"
                src={blogDetail?.imageMain}
              />
            </a>

            <div class="mt-2">
              <a
                href="#"
                class="sm:text-3xl md:text-3xl lg:text-3xl xl:text-4xl font-bold text-purple-500  hover:underline"
              >
                {blogDetail?.title}
              </a>

              {/* <div class="font-light text-gray-600">
                <a href="#" class="flex items-center mt-6 mb-6">
                  <img
                    src="https://avatars.githubusercontent.com/u/71964085?v=4"
                    alt="avatar"
                    class="hidden object-cover w-14 h-14 mx-4 rounded-full sm:block"
                  />
                  <h1 class="font-bold text-gray-700 hover:underline">
                    By James Amos
                  </h1>
                </a>
              </div> */}
            </div>

            <div class="max-w-4xl  mx-auto text-2xl text-gray-700 mt-4">
              <div>
                <p class="mt-2 p-8 whitespace-pre-line">
                  {blogDetail?.description}
                </p>
              </div>
            </div>
          </div>

          <h2 class="text-2xl mt-4 text-gray-500 font-bold text-center">
            Related Posts
          </h2>
          <div class="flex grid h-full grid-cols-12 gap-10 pb-10 mt-8 sm:mt-16">
            <div class="grid grid-cols-12 col-span-12 gap-7">
              <div class="flex flex-col items-start col-span-12 overflow-hidden shadow-sm rounded-xl md:col-span-6 lg:col-span-4">
                <a
                  href="#_"
                  class="block transition duration-200 ease-out transform hover:scale-110"
                >
                  <img
                    class="object-cover w-full shadow-sm h-full"
                    src={
                      "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1951&amp;q=80"
                    }
                  />
                </a>
                <div class="relative flex flex-col items-start px-6 bg-white border border-t-0 border-gray-200 py-7 rounded-b-2xl">
                  <div class="bg-indigo-400 absolute top-0 -mt-3 flex items-center px-3 py-1.5 leading-none w-auto inline-block rounded-full text-xs font-medium uppercase text-white inline-block">
                    <span>Flask</span>
                  </div>
                  <h2 class="text-base text-gray-500 font-bold sm:text-lg md:text-xl">
                    <a href="#_">
                      Oauth using facebook with flask,mysql,vuejs and tailwind
                      css
                    </a>
                  </h2>
                  <p class="mt-2 text-sm text-gray-500">
                    Learn how to authenticate users to your application using
                    facebook.
                  </p>
                </div>
              </div>

              <div class="flex flex-col items-start col-span-12 overflow-hidden shadow-sm rounded-xl md:col-span-6 lg:col-span-4">
                <a
                  href="#_"
                  class="block transition duration-200 ease-out transform hover:scale-110"
                >
                  <img
                    class="object-cover w-full shadow-sm h-full"
                    src={
                      "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1951&amp;q=80"
                    }
                  />
                </a>
                <div class="relative flex flex-col items-start px-6 bg-white border border-t-0 border-gray-200 py-7 rounded-b-2xl">
                  <div class="bg-red-400 absolute top-0 -mt-3 flex items-center px-3 py-1.5 leading-none w-auto inline-block rounded-full text-xs font-medium uppercase text-white inline-block">
                    <span>Django</span>
                  </div>
                  <h2 class="text-base text-gray-500 font-bold sm:text-lg md:text-xl">
                    <a href="#_">
                      Authenticating users with email verification in Django
                      apps
                    </a>
                  </h2>
                  <p class="mt-2 text-sm text-gray-500">
                    Learn how to authenticate users to your web application by
                    sending secure links to their email box.
                  </p>
                </div>
              </div>

              <div class="flex flex-col items-start col-span-12 overflow-hidden shadow-sm rounded-xl md:col-span-6 lg:col-span-4">
                <a
                  href="#_"
                  class="block transition duration-200 ease-out transform hover:scale-110"
                >
                  <img
                    class="object-cover w-full shadow-sm h-full"
                    src={
                      "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1951&amp;q=80"
                    }
                  />
                </a>
                <div class="relative flex flex-col items-start px-6 bg-white border border-t-0 border-gray-200 py-7 rounded-b-2xl">
                  <div class="bg-purple-500 absolute top-0 -mt-3 flex items-center px-3 py-1.5 leading-none w-auto inline-block rounded-full text-xs font-medium uppercase text-white inline-block">
                    <span>Flask</span>
                  </div>
                  <h2 class="text-base text-gray-500 font-bold sm:text-lg md:text-xl">
                    <a href="#_">
                      Creating user registration and authentication system in
                      flask
                    </a>
                  </h2>
                  <p class="mt-2 text-sm text-gray-500">
                    Learn how to authenticate users to your application using
                    flask and mysql db.
                  </p>
                </div>
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
