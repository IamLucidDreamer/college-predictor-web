import React, { Fragment, useState } from "react";
import AppLogo from "../images/AppLogo";
import { Transition, Dialog } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { clearAuth } from "../../helpers/auth";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate()

  const [open, setOpen] = useState(false);

  return (
    <div className="bg-primary shadow-lg">
      <div className="container mx-auto px-2 lg:px-10 py-3">
        <div className="flex items-center justify-between">
          <AppLogo width={"175px"} logotType={2} />
          <nav className=" hidden  lg:flex gap-16 text-white font-semibold">
            <button>Colleges</button>
            <button>Blogs</button>
            <button>Updates</button>
            <button>About</button>
            <div>UserName</div>
          </nav>
          <button
            className="lg:hidden h-7 flex flex-col justify-between items-stretch"
            onClick={() => setOpen(true)}
          >
            <div className="w-8 h-1 bg-white" />
            <div className="w-8 h-1 bg-white" />
            <div className="w-8 h-1 bg-white" />
          </button>
        </div>
      </div>
      <DrawerMenu openModal={open} closeModal={() => setOpen(false)} navigate={navigate} />
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
                    <button onclick={() =>{ clearAuth() ; navigate("/") }} className="my-8">
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
