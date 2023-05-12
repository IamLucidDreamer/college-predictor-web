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

// Images
import mbbsImage from "../../../assets/images/test_mbbs.webp";

const NeetIndex = () => {
  const [activeType, setActiveType] = useState(0);
  const [activeCategoryType, setActiveCategoryType] = useState(0);

  return (
    <>
      <div className="m-2 mb-8 lg:m-4 shadow-lg rounded-lg bg-white">
        {activeType === 0 && (
          <div className="p-4">
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
        <h1 className="text-2xl mt-4 mb-2 text-secondary font-semibold p-4 pb-0">
          Select Exam Type
        </h1>
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

        <div className="my-4 px-2">
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
          )}
          {activeType === 1 && activeCategoryType === 1 && (
            <PredictorAllIndia
              initialValues={{
                examType: ["NEET/All India"],
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
          )}
          {activeType === 1 && activeCategoryType === 2 && (
            <PredictorStateUttarPradesh
              initialValues={{
                examType: ["NEET/Uttar Pradesh"],
                year: [],
                course: [],
                round: [],
                allottedCategory: [],
                instituteType: [],
                instituteName: [],
                rank: 0,
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default NeetIndex;

const PredictorAllIndia = ({ initialValues, displayValues }) => {
  const [masterData, setMasterData] = useState([]);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [predictData, setPredictData] = useState({});

  // Need To refactor this Function.
  const handleSubmit = (values) => {
    const reqObject = {};
    for (const [key, value] of Object.entries(values)) {
      if (value.length !== 0) {
        reqObject[key] = value;
      }
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
      })
      .catch((err) => {
        console.log(err);
      });
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
        // validationSchema={predictorValidation}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ values, handleSubmit, setFieldValue }) => {
          return (
            <div className="flex flex-col my-3">
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
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="text-base lg:text-lg rounded-lg bg-secondary text-white py-2 my-3 w-full mt-10"
                >
                  Predict
                </button>
              </div>
              {/* <ReactToPdf scale={0.85}>
                {({ toPdf, targetRef }) => ( */}
              <div>
                {/* {Object.entries(predictData).length !== 0 && (
                      <button
                        onClick={toPdf}
                        className="text-base lg:text-lg rounded-lg bg-secondary text-white py-2 my-3 w-4/12 mt-10"
                      >
                        {" "}
                        TO PDF
                      </button>
                    )} */}
                <div className="overflow-x-scroll">
                  <div className="flex justify-between">
                    {Object.keys(predictData)?.length > 0 &&
                      displayValues?.map((val, index) => {
                        if (val === "rank") {
                          return;
                        }
                        return (
                          <div className="p-2 w-full md:w-8/12 xl:w-6/12 rounded-full mx-auto font-semibold">
                            <h1 style={{ minWidth: "50px" }}>
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
                      <div ref={provided.innerRef} {...provided.droppableProps}>
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
                                  className="p-2 lg:p-4 m-2 lg:m-4 shadow-lg rounded-lg"
                                >
                                  <div className="flex items-center justify-start gap-4">
                                    <div className="font-semibold">
                                      {index + 1}
                                    </div>
                                    <div className="w-10/12 font-semibold">
                                      {key}
                                    </div>
                                  </div>
                                  {val.map((valMap) => (
                                    <div
                                      className="flex gap-2 justify-between lg:gap-5 my-2 pl-5 border-b-2 py-0.5 px-1"
                                      style={{
                                        boxShadow: `0 1px 2px 0 ${getFeildColor(
                                          valMap?.percentage
                                        )}`,
                                      }}
                                    >
                                      <div className="flex justify-between items-start w-full">
                                        {Object.keys(predictData)?.length > 0 &&
                                          displayValues?.map(
                                            (colData, index) => {
                                              return (
                                                <div
                                                  className="p-2 w-full md:w-8/12 xl:w-6/12 rounded-full mx-auto font-semibold"
                                                  style={{ minWidth: "50px" }}
                                                >
                                                  <h1>{valMap[colData]}</h1>
                                                </div>
                                              );
                                            }
                                          )}
                                      </div>
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
              </div>
              {/* )}
              </ReactToPdf> */}
            </div>
          );
        }}
      </Formik>
    </DragDropContext>
  );
};

const PredictorStateUttarPradesh = ({
  initialValues,
  requiredValues,
  apiRoute,
}) => {
  const [masterData, setMasterData] = useState([]);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [predictData, setPredictData] = useState({});

  // Need To refactor this Function.
  const handleSubmit = (values) => {
    const reqObject = {};
    for (const [key, value] of Object.entries(values)) {
      if (value.length !== 0) {
        reqObject[key] = value;
      }
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
      })
      .catch((err) => {
        console.log(err);
      });
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
        // validationSchema={predictorValidation}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ values, handleSubmit, setFieldValue }) => {
          return (
            <div className="flex flex-col my-3">
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
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="text-base lg:text-lg rounded-lg bg-secondary text-white py-2 my-3 w-full mt-10"
                >
                  Predict
                </button>
              </div>
              {/* <ReactToPdf scale={0.85}>
                {({ toPdf, targetRef }) => ( */}
              <div>
                {/* {Object.entries(predictData).length !== 0 && (
                      <button
                        onClick={toPdf}
                        className="text-base lg:text-lg rounded-lg bg-secondary text-white py-2 my-3 w-4/12 mt-10"
                      >
                        {" "}
                        TO PDF
                      </button>
                    )} */}
                <div>
                  <div className="flex justify-between">
                    <div className="w-3/12">Qouta</div>
                    <div className="w-1/12">Alloted PH</div>
                    <div className="w-2/12">Allotted Category</div>
                    <div className="w-1/12">Round</div>
                    <div className="w-2/12">Course</div>
                    <div className="w-2/12">Closing Rank</div>
                    <div className="w-1/12">Percentage </div>
                  </div>
                  <Droppable droppableId="Data-Table">
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.droppableProps}>
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
                                  className="p-2 lg:p-4 m-2 lg:m-4 shadow-lg rounded-lg"
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
                                      className="flex gap-2 justify-between lg:gap-5 my-2 pl-5 border-b-2 py-0.5 px-1"
                                      style={{
                                        boxShadow: `0 1px 2px 0 ${getFeildColor(
                                          valMap?.percentage
                                        )}`,
                                      }}
                                    >
                                      <div className="w-3/12">
                                        {valMap.quota}
                                      </div>
                                      <div className="w-1/12">
                                        {valMap.allottedPH}
                                      </div>
                                      <div className="w-2/12">
                                        {valMap.allottedCategory}
                                      </div>
                                      <div className="w-1/12">
                                        {valMap.round}
                                      </div>
                                      <div className="w-2/12">
                                        {valMap.course}
                                      </div>
                                      <div className="w-2/12">
                                        {valMap.closingRank}
                                      </div>
                                      <div className="w-1/12">
                                        {valMap.percentage}%{" "}
                                      </div>
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
              </div>
              {/* )}
              </ReactToPdf> */}
            </div>
          );
        }}
      </Formik>
    </DragDropContext>
  );
};
