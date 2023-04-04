import React, { Fragment, useEffect, useState } from "react";
import AppLogo from "../images/AppLogo";
import { Transition, Dialog } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { clearAuth } from "../../helpers/auth";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const user = useSelector((state) => state?.user);

  return (
    <div className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-2 lg:px-10 py-3">
        <div className="flex items-center justify-between">
          <Link to={"/dashboard"}>
            <AppLogo logotType={1} width={"175px"} />
          </Link>
          <nav className="hidden lg:flex gap-10 text-secondary font-semibold items-center uppercase">
            <Link to={"/dashboard/predictor"}>
              <button className="uppercase border-b-2 border-white hover:border-primary duration-300">
                Predictor
              </button>
            </Link>
            <Link to={"/dashboard/colleges"}>
              <button className="uppercase border-b-2 border-white hover:border-primary duration-300">
                Colleges
              </button>
            </Link>
            <Link to={"/dashboard/blogs"}>
              <button className="uppercase border-b-2 border-white hover:border-primary duration-300">
                Blogs
              </button>
            </Link>
            <Link to={"/dashboard/updates"}>
              <button className="uppercase border-b-2 border-white hover:border-primary duration-300">
                Updates
              </button>
            </Link>
            <Link to={"/about"}>
              <button className="uppercase border-b-2 border-white hover:border-primary duration-300">
                About
              </button>
            </Link>
            <div className="flex gap-2 items-center capitalize rounded-full border-2 border-secondary border-opacity-50 text-sm group w-32 duration-500">
              <h1 className="group-hover:hidden group-hover:pl-0 pl-2 truncate w-24 duration-500">
                {user?.name}
              </h1>
              <img
                src={
                  "https://documents-careerkick.s3.ap-south-1.amazonaws.com/my image.jfif"
                }
                className="w-8 h-8 rounded-full"
              />
              <h1 className="hidden group-hover:block group-hover:pl-0 pl-2 truncate w-24">
                Logout
              </h1>
            </div>
          </nav>
          <button
            className="lg:hidden h-7 flex flex-col justify-between items-stretch"
            onClick={() => setOpen(true)}
          >
            <div className="w-8 h-1 bg-secondary" />
            <div className="w-8 h-1 bg-secondary" />
            <div className="w-8 h-1 bg-secondary" />
          </button>
        </div>
      </div>
      <DrawerMenu
        openModal={open}
        closeModal={() => setOpen(false)}
        navigate={navigate}
      />
    </div>
  );
};

export default Header;

const DrawerMenu = ({ openModal, closeModal, navigate }) => {
  return (
    <Transition show={openModal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-hidden"
        onClose={closeModal}
      >
        <div className="absolute inset-0  overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity w-auto" />
          </Transition.Child>

          <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="min-h-screen bg-white w-96">
                <div className="my-4 mx-6">
                  <div className="w-full">
                    <XIcon
                      className="w-8 h-8 text-secondary ml-auto self-end"
                      onClick={closeModal}
                    />
                  </div>
                  <nav className="flex flex-col text-secondary font-semibold text-xl">
                    <button className="my-4">Colleges</button>
                    <button className="my-4">Blogs</button>
                    <button className="my-4">Updates</button>
                    <button className="my-4">About</button>
                    <button className="my-4">Profile</button>
                    <button
                      onClick={() => {
                        clearAuth();
                        navigate("/");
                      }}
                      className="z-50 my-8 hover:bg-red-500"
                    >
                      Logout
                    </button>
                  </nav>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
