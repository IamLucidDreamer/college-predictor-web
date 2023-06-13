import React, { useRef, useEffect, useState } from "react";

import Corousal from "nuka-carousel";
import { gsap } from "gsap";

import Header from "../../components/shared/Header";
import Footer from "../../components/shared/Footer";

import homeHeroBG from "../../assets/images/home_bg.jpg";
import counsillingBg from "../../assets/images/counselling_bg.jpg";

import LoadingIndication from "../../components/loader/index";
import { serverUnauth } from "../../helpers/apiCall";
import {
  AcademicCapIcon,
  BookOpenIcon,
  ChartBarIcon,
  ChartPieIcon,
  DocumentIcon,
  NewspaperIcon,
  ViewListIcon,
} from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";
import { CollgeCard } from "./Colleges";

const HomePage = () => {
  const navigate = useNavigate();

  const [updates, setUpdates] = useState([]);
  const [college, setCollege] = useState([]);
  const [search, setSearch] = useState("");
  const [searchCollege, setSearchCollege] = useState([]);
  const [loadingSearchCollege, setLoadingSearchCollege] = useState(false);

  const myRef = useRef(null);

  const getSearchData = () => {
    serverUnauth
      .post(`/college/search?limit=2`, { name: search })
      .then((res) => {
        setSearchCollege(res?.data?.data?.College);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoadingSearchCollege(false));
  };

  useEffect(() => {
    setLoadingSearchCollege(true);
    const timerId = setTimeout(() => {
      getSearchData();
    }, 1000);
    return () => clearTimeout(timerId);
  }, [search]);

  useEffect(() => {
    requestCaller();
    gsap.from(myRef.current, {
      duration: 1,
      ease: "power2.out",
      opacity: 0,
      y: "-30%",
    });
  }, []);

  const requestCaller = () => {
    serverUnauth
      .get(`/updates/get-all`)
      .then((res) => {
        setUpdates(res?.data?.data?.updates);
      })
      .catch((err) => {
        console.log(err);
      });
    serverUnauth
      .get(`/college/get-all`)
      .then((res) => {
        setCollege(res?.data?.data?.College);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Header />
      <div
        ref={myRef}
        className="bg-no-repeat bg-center bg-cover z-10 relative"
        style={{
          borderBottomRightRadius: "70px",
          borderBottomLeftRadius: "70px",
          backgroundImage: `url(${homeHeroBG})`,
        }}
      >
        <div
          className="bg-primary bg-opacity-75 flex items-center justify-center"
          style={{
            borderBottomRightRadius: "70px",
            borderBottomLeftRadius: "70px",
          }}
        >
          <div
            className="min-h-[80vh] flex flex-col gap-10 items-center justify-center md:max-w-xl lg:max-w-3xl p-4 md:p-8 lg:p-16"
            data-aos="flip-up"
          >
            <h1
              className="text-2xl sm:text-5xl text-white font-semibold text-center"
              data-aos="flip-up"
            >
              Search for Colleges Across India
            </h1>
            <div className="relative w-full lg:w-3/4 flex items-center justify-between gap-2 bg-white p-3 rounded-xl">
              <input
                className="focus:outline-none w-full"
                type="text"
                placeholder="Search for Colleges Across India..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="text-sm text-secondary">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </button>
              {search.length > 0 && (
                <div
                  className="bg-white rounded-lg absolute w-full top-14 left-0 shadow-lg"
                  data-aos="fade-up"
                  style={{ zIndex: 999999 }}
                >
                  {searchCollege.length > 0 && !loadingSearchCollege ? (
                    searchCollege.map((val) => (
                      <div className="bg-white p-2 rounded-lg m-1 hover:bg-gray-100">
                        <button
                          style={{ width: "100%" }}
                          className="text-left"
                          onClick={() =>
                            navigate(`/dashboard/colleges/${val?._id}`, {
                              state: { data: val },
                            })
                          }
                        >
                          {val?.displayName}
                        </button>
                      </div>
                    ))
                  ) : loadingSearchCollege ? (
                    <div className="p-2">
                      <LoadingIndication width={30} height={30} />
                    </div>
                  ) : (
                    <h1 className="text-base text-secondary p-2">
                      No Colleges Found
                    </h1>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-screen-lg -mt-24 z-50 relative">
        <h2
          className="text-center text-white text-xl sm:text-3xl mb-4 font-semibold"
          data-aos="fade-up"
        >
          Latest Updates & Notifications
        </h2>
        {updates.length !== 0 && (
          <Corousal
            defaultControlsConfig={{ nextButtonText: ">", prevButtonText: "<" }}
            autoplay={true}
            autoplayInterval={6000}
            wrapAround={true}
            dragging={true}
            cellAlign="center"
            slidesToShow={window.innerWidth > 768 ? 3 : 1}
            className=""
          >
            {updates.map((val) => (
              <UpdateCards updates={val} />
            ))}
          </Corousal>
        )}
      </div>
      <div
        className="my-10 text-center py-16 max-w-screen-xl mx-auto text-secondary"
        data-aos="fade-up"
        data-aos-offset="70"
      >
        <h1 className="font-semibold text-3xl">
          India's Leading Education Portal for all you{" "}
          <span className="font-semibold text-primary">academic needs</span>
        </h1>
        <h2 className="mt-2">
          Discover the world of higher education with comprehensive information
          for your academic journey
        </h2>
        <div className="mt-10 flex flex-col md:flex-row justify-center gap-6 m-6">
          <div
            className="lg:w-1/4 bg-gray-200 p-8 py-16 rounded-lg shadow-secondary"
            data-aos="flip-up"
            data-aos-offset="80"
          >
            <h2
              className="font-semibold text-lg mb-4 capitalize"
              data-aos="fade-up"
              data-aos-offset="120"
            >
              Expert counsellors
            </h2>
            <p data-aos="fade-up" data-aos-offset="120">
              A team of expert counsellors is here to assist aspirants for their
              booming medical journey.
            </p>
          </div>
          <div
            className="lg:w-1/4 bg-gray-200 p-8 py-16 rounded-lg shadow-secondary capitalize"
            data-aos="flip-up"
            data-aos-offset="160"
          >
            <h2
              className="font-semibold text-lg mb-4"
              data-aos="fade-up"
              data-aos-offset="160"
            >
              Free rank & college predictor
            </h2>
            <p data-aos="fade-up" data-aos-offset="160">
              Free rank and college predictors help to analyse and find the best
              institutes
            </p>
          </div>
          <div
            className="lg:w-1/4 bg-gray-200 p-8 py-16 rounded-lg shadow-secondary capitalize"
            data-aos="flip-up"
            data-aos-offset="240"
          >
            <h2
              className="font-semibold text-lg mb-4"
              data-aos="fade-up"
              data-aos-offset="200"
            >
              Free E-books
            </h2>
            <p data-aos="fade-up" data-aos-offset="200">
              Entire knowledge about NEET Counselling can be found from our
              informative e-books.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center p-5 bg-gray-200 pt-20 pb-28 text-secondary">
        <div data-aos="fade-up" data-aos-offset="10">
          <h1 className="font-semibold text-3xl">Counselling</h1>
          <h2 className="mt-2">
            Ease your biggest doubts with personalized Video Counselling from
            our Curated Experts
          </h2>
        </div>
        <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-3">
          <div
            className="w-full md:w-2/3 lg:w-1/2 relative"
            data-aos="fade-up"
            data-aos-offset="10"
          >
            <img className="rounded-lg" src={counsillingBg} alt="" />
            <div
              className="mt-4 sm:mt-0 relative sm:absolute sm:bottom-14 sm:-left-8 p-3 w-full sm:w-96 bg-white rounded-lg flex items-center gap-2 shadow-xl"
              data-aos="fade-right"
              data-aos-offset="100"
            >
              <AcademicCapIcon className="w-28 h-28 text-primary" />
              <div>
                <h2 className="font-bold text-left">Career Counselling</h2>
                <p className="text-sm text-left">
                  Helps you to know and understand yourself in order to make
                  Career, Educational, and Life Decisions
                </p>
              </div>
            </div>
          </div>
          <div className="text-left flex flex-col gap-4 overflow-hidden">
            <div
              className="p-1 w-full sm:w-96 bg-white rounded-lg flex items-center gap-2 shadow-xl"
              data-aos="fade-left"
              data-aos-offset="100"
            >
              <BookOpenIcon className="w-28 h-28 text-primary" />
              <div>
                <h2 className="font-bold">Educational Counselling</h2>
                <p className="text-sm">
                  Provides assistance and guidance to students in making the
                  right choices in their studies.
                </p>
              </div>
            </div>
            <div
              className="p-1 w-full sm:w-96 bg-white rounded-lg flex items-center gap-2 shadow-xl"
              data-aos="fade-left"
              data-aos-offset="100"
            >
              <ChartPieIcon className="w-28 h-28 text-primary" />
              <div>
                <h2 className="font-bold">Psychometric Testing</h2>
                <p className="text-sm">
                  Analyses Capabilities, Aptitude, and also understand of which
                  career field is suitable for him.
                </p>
              </div>
            </div>
            <div
              className="p-1 w-full sm:w-96 bg-white rounded-lg flex items-center gap-2 shadow-xl"
              data-aos="fade-left"
              data-aos-offset="100"
            >
              <NewspaperIcon className="w-28 h-28 text-primary" />
              <div>
                <h2 className="font-bold">Course Selection</h2>
                <p className="text-sm">
                  Stimulates students to focus on learning more about the field
                  they are interested in to study in a College/University.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="py-20 text-center p-5 max-w-screen-xl mx-auto text-secondary"
        data-aos="fade-up"
      >
        <h1 className="font-semibold text-3xl">Top Colleges</h1>
        <div className="mt-10">
          {college.length !== 0 && (
            <Corousal
              defaultControlsConfig={{
                nextButtonText: ">",
                prevButtonText: "<",
              }}
              autoplay={true}
              autoplayInterval={6000}
              wrapAround={true}
              dragging={true}
              cellAlign="center"
              slidesToShow={window.innerWidth > 768 ? 3 : 1}
              className=""
              style={{ justifyContent: "space-between", gap: "100px" }}
            >
              {college?.map((val) => (
                <CollgeCard
                  data={val}
                  coverImage={val.collegeCover}
                  collegeIcon={val.collegeIcon}
                  collegeName={val.displayName || val.collegeName}
                  location={`${val.city}, ${val.state}`}
                />
              ))}
            </Corousal>
          )}
        </div>
      </div>

      {/* Download App Section */}
      <div className="bg-primary bg-opacity-20 w-full py-20 text-secondary">
        <div
          className="p-4 w-full text-center sm:p-8"
          data-aos="fade-up"
          data-aos-offset="100"
        >
          <h3 className="mb-2 text-3xl font-semibold text-secondary">
            Download the CareerKick App
          </h3>
          <p className="mb-5 text-base text-secondary sm:text-lg">
            Regular exam updates, QnA, Predictors, College Applications &
            E-books now on your Mobile
          </p>
          <div className="flex justify-center items-center space-y-0 space-x-8">
            <a
              onClick={() => window.alert("Comming soon on APP store")}
              data-aos="flip-right"
              data-aos-offset="100"
              className="w-[150px] sm:w-auto flex bg-secondary hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 text-white rounded-lg items-center justify-center px-4 py-2.5"
            >
              <svg
                className="mr-2 md:mr-3 w-5 h-5 sm:w-7 sm:h-7"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="apple"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
              >
                <path
                  fill="currentColor"
                  d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
                ></path>
              </svg>
              <div className="text-left">
                <div className="mb-1 text-xs">Get it On</div>
                <div className="-mt-1 font-sans text-sm font-semibold">
                  App Store
                </div>
              </div>
            </a>
            <a
              data-aos="flip-left"
              data-aos-offset="100"
              target="_blank"
              href="https://play.google.com/store/apps/details?id=in.careerkick"
              className=" w-[150px] sm:w-auto flex bg-secondary hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 text-white rounded-lg items-center justify-center px-4 py-2.5"
            >
              <svg
                className="mr-2 md:mr-3 w-5 h-5 sm:w-7 sm:h-7"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="google-play"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"
                ></path>
              </svg>
              <div className="text-left">
                <div className="mb-1 text-xs">Get in on</div>
                <div className="-mt-1 font-sans text-sm font-semibold">
                  Google Play
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
      {/* REview Section */}
      <div className="py-20 bg-white text-secondary">
        <div
          className="mx-auto text-center md:max-w-xl lg:max-w-3xl"
          data-aos="fade-up"
          data-aos-offset="50"
        >
          <h3 className="mb-6 text-3xl font-bold">What our Students Say</h3>
        </div>

        <div className="mx-auto max-w-screen-xl my-8">
          <Corousal
            defaultControlsConfig={{
              nextButtonText: ">",
              prevButtonText: "<",
            }}
            autoplay={true}
            autoplayInterval={6000}
            wrapAround={true}
            dragging={true}
            cellAlign="center"
            slidesToShow={window.innerWidth > 768 ? 3 : 1}
            className=""
          >
            <div
              className="mb-12 md:mb-0 mx-6"
              data-aos="flip-up"
              data-aos-offset="100"
            >
              <div className="mb-6 flex justify-center">
                <img
                  src="https://lh3.googleusercontent.com/a-/AD_cMMSzxbuNI8smakH-HeX_oQtV1uBweSaLLXXOGUzijug=w45-h45-p-rp-mo-ba4-br100"
                  className="w-32 rounded-full shadow-lg"
                />
              </div>
              <h5 className="mb-4 text-xl font-semibold">Abhinav Pandey</h5>
              <p className="mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="inline-block h-7 w-7 pr-2"
                  viewBox="0 0 24 24"
                >
                  <path d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z" />
                </svg>
                One of the best counseling services. They are very supportive
                and very well behaved. One can contact them anytime for help and
                they are eagerly ready to help you out.
                <br /> My experience was excellent with their service. I would
                highly recommend you to hire counselor if you are seeking for
                admission in any course in any college.
              </p>
            </div>

            <div
              className="mb-12 md:mb-0 mx-6"
              data-aos="flip-up"
              data-aos-offset="100"
            >
              <div className="mb-6 flex justify-center">
                <img
                  src="https://lh3.googleusercontent.com/a-/AD_cMMQp89Tb7K3suRUFcPwFy1iSOfvVw0TiUiDrQsmI=w75-h75-p-rp-mo-br100"
                  className="w-32 rounded-full shadow-lg"
                />
              </div>
              <h5 className="mb-4 text-xl font-semibold">Abhishek Tiwari</h5>
              <p className="mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="inline-block h-7 w-7 pr-2"
                  viewBox="0 0 24 24"
                >
                  <path d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z" />
                </svg>
                From my experience I will say that they provide the best
                counselling service.
                <br />
                Your allotted counsellor will help you all the time until you
                get admitted into the college . They clear all your doubt
                everything no matter how many questions and doubt you made ,they
                are always there to help in your counselling.
              </p>
            </div>

            <div
              className="mb-12 md:mb-0 mx-6"
              data-aos="flip-up"
              data-aos-offset="100"
            >
              <div className="mb-6 flex justify-center">
                <img
                  src="https://lh3.googleusercontent.com/a-/AD_cMMQHAYhQgMhKSbmh_I9SZNWGxoAS2VXtH8nVLwoMRg=w45-h45-p-c0x00000000-rp-mo-br100"
                  className="w-32 rounded-full shadow-lg"
                />
              </div>
              <h5 className="mb-4 text-xl font-semibold">Shivansh Verma</h5>
              <p className="mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="inline-block h-7 w-7 pr-2"
                  viewBox="0 0 24 24"
                >
                  <path d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275zm-13 0c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.742-4.38 5.746 2.491.392 4.396 2.547 4.396 5.149 0 3.182-2.584 4.979-5.199 4.979-3.015 0-5.801-2.305-5.801-6.275z" />
                </svg>
                I would like to thank Careerkick Services for supporting I have
                a good experience in careerkick services Careerkick Services is
                one the best counseling provider platforms Thank u once again
                for guiding me in whole admission process.
              </p>
            </div>
          </Corousal>
        </div>
      </div>

      <div className="text-center py-16 bg-gray-200 text-secondary">
        <h1
          className="font-semibold text-3xl"
          data-aos="fade-up"
          data-aos-offset="10"
        >
          Our <span className="font-semibold text-primary">Products</span>
        </h1>
        <div className="mt-10 flex flex-col md:flex-row justify-center gap-4 lg:gap-8 m-4">
          <div
            onClick={() => navigate("/dashboard/colleges")}
            className="lg:w-40 bg-white p-4 py-8 rounded-lg font-medium hover:cursor-pointer"
            data-aos="flip-down"
            data-aos-offset="10"
          >
            <ChartBarIcon className="w-12 h-12 text-secondary mx-auto" />
            <h2 className="shadow-secondary text-secondary text-xl mt-2">
              College Review
            </h2>
          </div>
          <div
            onClick={() => navigate("/dashboard/colleges")}
            className="lg:w-40 bg-white p-4 py-8 rounded-lg font-medium hover:cursor-pointer"
            data-aos="flip-down"
            data-aos-offset="40"
          >
            <AcademicCapIcon className="w-12 h-12 text-secondary mx-auto" />
            <h2 className="shadow-secondary text-secondary text-xl mt-2">
              College Compare
            </h2>
          </div>
          <div
            onClick={() => navigate("/dashboard/colleges")}
            className="lg:w-40 bg-white p-4 py-8 rounded-lg font-medium hover:cursor-pointer"
            data-aos="flip-down"
            data-aos-offset="70"
          >
            <ViewListIcon className="w-12 h-12 text-secondary mx-auto" />
            <h2 className="shadow-secondary text-secondary text-xl mt-2">
              College List
            </h2>
          </div>
          <div
            onClick={() => navigate("/dashboard/predictor")}
            className="lg:w-40 bg-white p-4 py-8 rounded-lg font-medium hover:cursor-pointer"
            data-aos="flip-down"
            data-aos-offset="110"
          >
            <DocumentIcon className="w-12 h-12 text-secondary mx-auto" />
            <h2 className="shadow-secondary text-secondary text-xl mt-2">
              College Cut-Off
            </h2>
          </div>
          <div
            onClick={() => navigate("/dashboard/colleges")}
            className="lg:w-40 bg-white p-4 py-8 rounded-lg font-medium hover:cursor-pointer"
            data-aos="flip-down"
            data-aos-offset="140"
          >
            <ViewListIcon className="w-12 h-12 text-secondary mx-auto" />
            <h2 className="shadow-secondary text-secondary text-xl mt-2">
              College Application
            </h2>
          </div>
        </div>
      </div>

      {/* Client Section */}
      {/* <section className="bg-white">
        <div
          className="py-8 lg:py-16 mx-auto max-w-screen-xl"
          data-aos="fade-up"
          data-aos-offset="50"
        >
          <h2 className="mb-8 lg:mb-16 text-3xl font-semibold tracking-tight leading-tight text-center text-gray-900 md:text-4xl">
            Our Associate{" "}
            <span className="text-primary font-bold"> Partners </span>
          </h2>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 lg:gap-20">
            <img
              src={
                "https://careerkick.in/wp-content/uploads/2023/03/manipal-1.png"
              }
              className="max-h-16"
            />
            <img
              src={
                "https://careerkick.in/wp-content/uploads/2023/03/UPES-1.png"
              }
              className="max-h-16"
            />
            <img
              src={"https://careerkick.in/wp-content/uploads/2023/03/SRM-1.png"}
              className="max-h-16"
            />
            <img
              src={"https://careerkick.in/wp-content/uploads/2023/03/LPU-2.png"}
              className="max-h-16"
            />
            <img
              src={
                "https://careerkick.in/wp-content/uploads/2023/03/bennett-1.png"
              }
              className="max-h-16"
            />
          </div>
        </div>
      </section> */}
      <section className="bg-white">
        <div
          className="py-8 lg:py-16 mx-auto max-w-screen-xl"
          data-aos="fade-up"
          data-aos-offset="50"
        >
          <h2 className="mb-8 lg:mb-16 text-3xl font-semibold tracking-tight leading-tight text-center text-gray-900 md:text-4xl">
            Our <span className="text-primary font-bold"> Achievements </span>
          </h2>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 lg:gap-20">
            <div className="bg-primary p-4 rounded-2xl">
              <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-6 justify-between w-full">
                <div className="p-4">
                  <h1 className="text-white text-3xl font-semibold">
                    5000+ College Alloted
                  </h1>
                </div>
                <div className="p-4">
                  <h1 className="text-white text-3xl font-semibold">
                    250000+ Students Guided
                  </h1>
                </div>
                <div className="p-4">
                  <h1 className="text-white text-3xl font-semibold">
                    500+ College Tie-Ups
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default HomePage;

const UpdateCards = ({ updates }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("/dashboard/updates")}
      className={`bg-white rounded-lg p-3 mx-2 border-b-4 border-primary z-30 duration-500 hover:cursor-pointer ${
        updates ? "opacity-100" : "opacity-0"
      }`}
      data-aos="flip-up"
    >
      <div className="flex overflow-hidden gap-2 items-center">
        <img
          className="w-14 h-14 rounded-full"
          src={updates?.imageMain}
          alt=""
        />
        <div className="">
          <h2 className="font-bold text-sm truncate">{updates?.title}</h2>
          <p className="text-xs truncate">{updates?.description}</p>
        </div>
      </div>
    </div>
  );
};
