import { ArrowRightIcon, BookOpenIcon } from "@heroicons/react/outline";

import Header from "../../components/shared/Header";
import heroBg from "../../assets/images/about_hero.avif";
import Footer from "../../components/shared/Footer";

const Hero = () => (
  <>
    <Header />
    <div className="relative pt-16 pb-32 flex content-center items-center justify-center z-10 min-h-screen">
      <div
        className="absolute top-0 w-full h-full bg-center bg-cover"
        style={{
          backgroundImage: `url(${heroBg})`,
        }}
      >
        <span
          id="blackOverlay"
          className="w-full h-full absolute opacity-75 bg-black"
        ></span>
      </div>
      <div className="container relative mx-auto">
        <div className="items-center flex flex-wrap">
          <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
            <div className="pr-12">
              <h1 className="text-white font-semibold text-5xl">About US</h1>
              <p className="mt-4 text-lg text-gray-300">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero
                tempore voluptatem delectus quae, dolorem rerum maiores quia
                quis alias adipisci aperiam eos illo itaque distinctio
                quibusdam, aut iste natus enim.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <section className="py-20 bg-white -mt-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center mt-32">
          <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
            <div className="text-gray-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-primary">
              <BookOpenIcon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-3xl mb-2 font-semibold leading-normal">
              Some Title
            </h3>
            <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-gray-700">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem
              ipsum dolor sit amet consectetur adipisicing elit.
            </p>
            <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe
              repellendus incidunt veniam obcaecati doloribus amet sit aliquid
              atque, quo suscipit repudiandae quis nemo laborum, ipsum ut
              accusamus architecto dicta voluptatem.
            </p>
            <a
              href=""
              className="font-bold text-gray-800 mt-8 flex gap-2 items-center"
            >
              Contact Us
              <ArrowRightIcon className="text-primary w-5 h-5" />
            </a>
          </div>

          <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
            <div className="relative flex flex-col min-w-0 break-words  w-full mb-6 shadow-lg rounded-lg bg-primary">
              <img
                alt="..."
                src={heroBg}
                className="w-full align-middle rounded-t-lg"
              />
              <blockquote className="relative p-8 mb-4">
                <svg
                  preserveAspectRatio="none"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 583 95"
                  className="absolute left-0 w-full block"
                  style={{
                    height: "95px",
                    top: "-94px",
                  }}
                >
                  <polygon
                    points="-30,95 583,95 583,65"
                    className="text-primary fill-current"
                  ></polygon>
                </svg>
                <h4 className="text-xl font-bold text-white">Nikhil Sachan</h4>
                <p className="text-md font-light mt-2 text-white">
                  The Arctic Ocean freezes every winter and much of the sea-ice
                  then thaws every summer, and that process will continue
                  whatever happens.
                </p>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="pt-20 pb-48 bg-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center text-center mb-24">
          <div className="w-full lg:w-6/12 px-4">
            <h2 className="text-4xl font-semibold">Here are our heroes</h2>
            <p className="text-lg leading-relaxed m-4 text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
              culpa vero ab at aspernatur deserunt sed voluptatum iure?
              Dignissimos, voluptates mollitia! Exercitationem aliquid
              architecto corporis minima, maiores perferendis reiciendis! Ad?
            </p>
          </div>
        </div>
        <div className="flex flex-wrap">
          <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
            <div className="px-6">
              <img
                alt="..."
                src={heroBg}
                className="shadow-lg rounded-full max-w-full mx-auto"
                style={{ maxWidth: "120px" }}
              />
              <div className="pt-6 text-center">
                <h5 className="text-xl font-bold">Nikhil Sachan</h5>
                <p className="mt-1 text-sm text-gray-500 uppercase font-semibold">
                  Founder and CEO
                </p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
            <div className="px-6">
              <img
                alt="..."
                src={heroBg}
                className="shadow-lg rounded-full max-w-full mx-auto"
                style={{ maxWidth: "120px" }}
              />
              <div className="pt-6 text-center">
                <h5 className="text-xl font-bold">Member Name</h5>
                <p className="mt-1 text-sm text-gray-500 uppercase font-semibold">
                  Title Here
                </p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
            <div className="px-6">
              <img
                alt="..."
                src={heroBg}
                className="shadow-lg rounded-full max-w-full mx-auto"
                style={{ maxWidth: "120px" }}
              />
              <div className="pt-6 text-center">
                <h5 className="text-xl font-bold">Member Name</h5>
                <p className="mt-1 text-sm text-gray-500 uppercase font-semibold">
                  Title Here
                </p>
              </div>
            </div>
          </div>
          <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
            <div className="px-6">
              <img
                alt="..."
                src={heroBg}
                className="shadow-lg rounded-full max-w-full mx-auto"
                style={{ maxWidth: "120px" }}
              />
              <div className="pt-6 text-center">
                <h5 className="text-xl font-bold">Member Name</h5>
                <p className="mt-1 text-sm text-gray-500 uppercase font-semibold">
                  Title Here
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer />
  </>
);

export default Hero;
