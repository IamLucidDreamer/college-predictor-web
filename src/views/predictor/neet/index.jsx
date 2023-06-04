import React, { useEffect, useState } from "react";
// import ReactToPdf from "react-to-pdf";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import Select from "react-select";
import { Formik } from "formik";
import * as Yup from "yup";
import { serverUnauth } from "../../../helpers/apiCall";
import { toast } from "react-toastify";
import {
  getFeidlValue,
  getFeildColor,
  updatedFieldValue,
} from "../../../helpers/predictor";
import Loader from "../../../components/loader/index";

// Images
import mbbsImage from "../../../assets/images/test_mbbs.webp";
import MainHeading from "../../../components/shared/MainHeading";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import PdfDownloader from "../../../components/shared/PdfViewer";

const NeetIndex = () => {
  const [activeType, setActiveType] = useState(0);
  const [activeCategoryType, setActiveCategoryType] = useState(0);

  return (
    <>
      <div className="m-2 lg:m-4 shadow-lg rounded-lg bg-white">
        {activeType === 0 && false && (
          <div className="p-4 mb-4">
            <h1 className="text-2xl mt-2 mb-4 text-secondary font-semibold">
              About Neet Counselling
            </h1>
            <p className="text-secondary">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <h1 className="text-2xl mt-4 mb-2 text-secondary font-semibold">
              How it works ?
            </h1>
            <p className="text-secondary">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <h1 className="text-2xl mt-4 mb-2 text-secondary font-semibold">
              Wanna Contact us ?
            </h1>
            <p className="text-secondary">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        )}
      </div>
      <div className="m-2 lg:m-4 shadow-lg rounded-lg bg-white">
        <div className="p-4 pb-0 flex gap-3 items-center mb-2">
          {activeType !== 0 && (
            <button onClick={() => setActiveType(0)}>
              <ArrowLeftIcon className="w-5 h-5" />
            </button>
          )}
          <h1 className="text-2xl text-secondary font-semibold">
            Select Exam Type
          </h1>
        </div>
        <div className="flex items-center justify-center">
          <div
            className={`duration-500 ${
              activeType !== 1
                ? activeType === 2
                  ? "w-0"
                  : "w-1/2"
                : "w-full rounded-lg"
            }`}
            style={{ backgroundImage: `url(${mbbsImage})` }}
          >
            <button
              onClick={() => setActiveType(1)}
              className={`h-32 md:h-96 w-full text-xl md:text-3xl bg-no-repeat bg-cover bg-center bg-primary bg-opacity-60 text-white font-semibold ${
                activeType === 2 ? "hidden" : ""
              } `}
            >
              MBBS / BDS / BSc.
            </button>
          </div>
          <div
            className={`duration-500 ${
              activeType !== 2
                ? activeType === 1
                  ? "w-0"
                  : "w-1/2"
                : "w-full rounded-lg"
            }`}
            style={{ backgroundImage: `url(${mbbsImage})` }}
          >
            <button
              onClick={() => setActiveType(2)}
              className={`h-32 md:h-96 w-full text-xl md:text-3xl bg-no-repeat bg-cover bg-center bg-secondary bg-opacity-60 text-white font-semibold ${
                activeType === 1 ? "hidden" : ""
              }`}
            >
              Ayush
            </button>
          </div>
        </div>

        {/* <div className="my-4 px-2">
          {activeType === 1 && (
            <div className="flex gap-2">
              <button
                onClick={() => setActiveCategoryType(1)}
                className={`w-1/3 text-center text-base lg:text-2xl py-2 rounded-lg ${
                  activeCategoryType === 1 ? "bg-primary text-white" : ""
                }`}
              >
                All India
              </button>
              <button
                onClick={() => setActiveCategoryType(2)}
                className={`w-1/3 text-center text-base lg:text-2xl py-2 rounded-lg ${
                  activeCategoryType === 2 ? "bg-primary text-white" : ""
                }`}
              >
                State
              </button>
              <button
                onClick={() => setActiveCategoryType(3)}
                className={`w-1/3 text-center text-base lg:text-2xl py-2 rounded-lg ${
                  activeCategoryType === 3 ? "bg-primary text-white" : ""
                }`}
              >
                Others
              </button>
            </div>
          )} */}
        {activeType === 1 && (
          <>
            <div className="text-secondary p-2 md:p-4 flex flex-col gap-2">
              <p>
                All the NEET Under Graduate (MBBS/BDS) aspirant candidates are
                hereby informed that counseling for All India Quota seats/
                Institutional Quota/ Domicile (internal candidates) of Central
                Universities (Aligarh Muslim University/ Banaras Hindu
                University/ University of Delhi/Faculty of Dentistry, Jamia
                Millia Islamia, Delhi), (wards of ESIC insured persons) seats of
                colleges under Employee State Insurance Corporation and Armed
                Forces Medical College, Pune for the Under graduate session
                2019-20 will be conducted by Medical Counseling Committee/
                Directorate General of Health Services, Ministry of Health and
                Family Welfare, Government of India.
              </p>
              <p>
                For participation in Institutional Quota (internal) seats of
                Central Universities (Aligarh Muslim University/ Banaras Hindu
                University/ University of Delhi/ Faculty of Dentistry, Jamia
                Millia Islamia, Delhi), internal quota seats of colleges under
                Employee State Insurance Corporation and Armed Forces Medical
                College, Pune, candidates are required to go for registration at
                official website of Medical Counseling Committee{" "}
                <a
                  href="https://www.mcc.nic.in"
                  target="_blank"
                  className="text-blue-600"
                >
                  (www.mcc.nic.in)
                </a>
                . Candidates of Andhra Pradesh and Telangana would be eligible
                for participation against the 15% All India Quota seats.
              </p>
              <p>
                Candidates to note that Non- Refundable registration counseling
                fees and refundable tuition fees have to be paid by the
                candidate at the time of registration. Reservation of seats
                under PH Category has been increased from 3% to 5% and the 21
                Benchmark Disabilities as envisaged under the regulations of
                “THE RIGHTS OF PERSONS WITH DISABILITIES ACT 2016” are included
                under the PH category for participation. For range of 21
                benchmark intellectual disabilities please visit{" "}
                <a
                  href="https://mcc.nic.in/#/home"
                  target="_blank"
                  className="text-blue-600"
                >
                  https://mcc.nic.in/#/home
                </a>
              </p>
            </div>
            <PredictorAllIndia
              initialValues={{
                examType: [],
                year: [],
                course: [],
                round: [],
                allottedPH: [],
                quota: [],
                allottedCategory: [],
                instituteName: [],
                rank: 0,
              }}
              displayValues={[
                "year",
                "course",
                "round",
                "instituteType",
                "allottedCategory",
                "closingRank",
                "percentage",
              ]}
            />
          </>
        )}
        {/*  )} */}
      </div>
      {/* </div> */}
    </>
  );
};

export default NeetIndex;

const PredictorAllIndia = ({ initialValues, displayValues }) => {
  const [masterData, setMasterData] = useState([]);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [predictData, setPredictData] = useState({});
  const [predictLoading, setpredictLoading] = useState(false);
  const [predictorRan, setPredictorRan] = useState(false);

  // Need To refactor this Function.
  const handleSubmit = (values) => {
    setpredictLoading(true);
    const reqObject = {};
    for (const [key, value] of Object.entries(values)) {
      if (value.length !== 0) {
        reqObject[key] = value;
      }
    }
    if (reqObject.examType.length === 0) {
      toast.warning("Please Select a Valida Exam Type");
      return;
    }
    serverUnauth
      .post("/predict-neet", reqObject)
      .then((res) => {
        const data = res?.data?.data;
        const newArr = [];
        const newObject = {};
        data.map((val) => {
          if (!newArr?.includes(val?.instituteName)) {
            const instituteName = val?.instituteName;
            newArr.push(instituteName);
            delete val["instituteName"];
            newObject[instituteName] = [val];
          } else {
            newObject[val?.instituteName].push(val);
          }
        });
        setPredictData(newObject);
        setPredictorRan(true);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setpredictLoading(false));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Object.entries(predictData);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setPredictData(Object.fromEntries(items));
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          rank: Yup.string().required("This field is Required"),
        })}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ values, handleSubmit, setFieldValue, touched, errors }) => {
          return (
            <div
              className="flex flex-col my-3 mx-auto"
              data-aos="fade-up"
              data-aos-offset="100"
            >
              {Object.keys(values)?.map((val, index) => {
                if (val === "rank") {
                  return;
                }
                return (
                  <div className="p-2 w-full md:w-8/12 xl:w-6/12 rounded-full mx-auto">
                    <h1 className="text-left my-1 font-semibold">
                      {val
                        .replace(/([A-Z])/g, " $1")
                        .charAt(0)
                        .toUpperCase() +
                        val.replace(/([A-Z])/g, " $1").slice(1)}
                    </h1>
                    <Select
                      onMenuOpen={() =>
                        getFeidlValue(
                          val,
                          values,
                          values[val],
                          setLoading,
                          setData,
                          setMasterData,
                          "/neet-dropdown"
                        )
                      }
                      isLoading={loading}
                      key={val}
                      placeholder={`Select ${
                        val
                          .replace(/([A-Z])/g, " $1")
                          .charAt(0)
                          .toUpperCase() +
                        val.replace(/([A-Z])/g, " $1").slice(1)
                      }`}
                      isMulti
                      options={data[val]?.map((value) => {
                        return { value: value, label: value };
                      })}
                      onChange={(e) => {
                        setFieldValue(
                          val,
                          e.map((ele) => {
                            return ele.value;
                          })
                        );
                        updatedFieldValue(masterData, values, setData);
                      }}
                    />
                  </div>
                );
              })}
              <div className="p-2 w-full md:w-8/12 xl:w-6/12 rounded-full mx-auto">
                <h1 className="text-left my-1 font-semibold">Rank</h1>
                <input
                  type="number"
                  placeholder="Enter Rank"
                  onChange={(e) => setFieldValue("rank", e.target.value)}
                  className="block w-full border-2 border-gray-200 rounded px-3 py-1.5 "
                />
                {touched.rank && errors.rank && (
                  <h1 className="text-sm text-red-300 mt-2">{errors.rank}</h1>
                )}
                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={predictLoading}
                  className="text-base lg:text-lg rounded-lg bg-secondary text-white py-2 my-3 w-full mt-10"
                >
                  {predictLoading ? (
                    <Loader width={25} height={25} />
                  ) : (
                    "Predict"
                  )}
                </button>
              </div>
              <div>
                <>
                  <PdfDownloader />
                </>
                {Object.keys(predictData).length > 0 || !predictorRan ? (
                  <div className="overflow-x-scroll mt-4">
                    <div className="flex justify-between bg-gray-100 items-center">
                      {Object.keys(predictData)?.length > 0 &&
                        displayValues?.map((val, index) => {
                          if (val === "rank") {
                            return;
                          }
                          return (
                            <div className="p-2 w-auto rounded-full mx-auto font-semibold">
                              <h1
                                style={{
                                  minWidth: "120px",
                                  maxWidth: "120px",
                                }}
                                className="text-center"
                              >
                                {val
                                  .replace(/([A-Z])/g, " $1")
                                  .charAt(0)
                                  .toUpperCase() +
                                  val.replace(/([A-Z])/g, " $1").slice(1)}
                              </h1>
                            </div>
                          );
                        })}
                    </div>
                    <Droppable droppableId="Data-Table">
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className="flex flex-col gap-2"
                          style={{ minWidth: "fit-content" }}
                        >
                          <h1>{provided.placeholder}</h1>
                          {Object.entries(predictData).map((value, index) => {
                            const key = value[0];
                            const val = value[1];
                            return (
                              <Draggable
                                draggableId={key}
                                index={index}
                                key={key}
                              >
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="p-1 lg:p-4 m-1 shadow-lg rounded-lg"
                                  >
                                    <div className="flex items-center justify-start gap-4">
                                      <div className="font-semibold">
                                        {index + 1} )
                                      </div>
                                      <div className="w-10/12 font-semibold">
                                        {key}
                                      </div>
                                    </div>
                                    {val.map((valMap) => (
                                      <div
                                        className="flex gap-2 justify-between lg:gap-5 my-2 pl-5 border-b-2 py-0.5 px-1 w-full"
                                        style={{
                                          boxShadow: `0 1px 2px 0 ${getFeildColor(
                                            valMap?.percentage
                                          )}`,
                                        }}
                                      >
                                        {Object.keys(predictData)?.length > 0 &&
                                          displayValues?.map(
                                            (colData, index) => {
                                              return (
                                                <div className="p-1">
                                                  <h1
                                                    style={{
                                                      minWidth: "120px",
                                                      maxWidth: "120px",
                                                    }}
                                                    className="text-center truncate"
                                                  >
                                                    {valMap[colData]}
                                                  </h1>
                                                </div>
                                              );
                                            }
                                          )}
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </Draggable>
                            );
                          })}
                        </div>
                      )}
                    </Droppable>
                  </div>
                ) : (
                  <h1 className="text-3xl font-semibold">Top Colleges</h1>
                )}
              </div>
            </div>
          );
        }}
      </Formik>
    </DragDropContext>
  );
};