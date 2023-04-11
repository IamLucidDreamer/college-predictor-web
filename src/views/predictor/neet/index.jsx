import React, { useEffect, useState } from "react";
import ReactToPdf from "react-to-pdf";
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
    <div className="m-2 lg:m-4 shadow-lg rounded-lg bg-white">
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
            className={`h-96 w-full text-3xl bg-no-repeat bg-cover bg-center bg-primary bg-opacity-60 text-white font-semibold ${
              activeType === 2 ? "hidden" : ""
            } `}
          >
            MBBS / BHMS / Bsc.
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
            className={`h-96 w-full text-3xl bg-no-repeat bg-cover bg-center bg-secondary bg-opacity-60 text-white font-semibold ${
              activeType === 1 ? "hidden" : ""
            }`}
          >
            Ayush
          </button>
        </div>
      </div>

      <div className="my-4">
        {activeType === 1 && (
          <div className="flex gap-2">
            <button
              onClick={() => setActiveCategoryType(1)}
              className={`w-1/2 text-center text-base lg:text-2xl py-2 rounded-lg ${
                activeCategoryType === 1 ? "bg-primary text-white" : ""
              }`}
            >
              All India
            </button>
            <button
              onClick={() => setActiveCategoryType(2)}
              className={`w-1/2 text-center text-base lg:text-2xl py-2 rounded-lg ${
                activeCategoryType === 2 ? "bg-primary text-white" : ""
              }`}
            >
              State
            </button>
            <button
              onClick={() => setActiveCategoryType(3)}
              className={`w-1/2 text-center text-base lg:text-2xl py-2 rounded-lg ${
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
              course: [],
              round: [],
              allottedPH: [],
              quota: [],
              allottedCategory: [],
              instituteName: [],
              rank: 0,
            }}
            requiredValues={["allottedCategory", "rank"]}
            apiRoute={"/predict-neet"}
          />
        )}
        {activeType === 1 && activeCategoryType === 2 && (
          <PredictorStateUttarPradesh />
        )}
      </div>
    </div>
  );
};

export default NeetIndex;

const PredictorAllIndia = ({ initialValues, requiredValues, apiRoute }) => {
  const [masterData, setMasterData] = useState([]);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [predictData, setPredictData] = useState({});

  // const predictorValidation = Yup.object(
  //   console.log(requiredValues.map((val) => {
  //     return (val[val] = Yup.array().min(1, "This field is Required"));
  //   }))
  // );

  // Need To refactor this Function.
  const handleSubmit = (values) => {
    const reqObject = {};
    for (const [key, value] of Object.entries(values)) {
      if (value.length !== 0) {
        reqObject[key] = value;
      }
    }
    console.log(reqObject, "reqObject");
    serverUnauth
      .post(apiRoute, reqObject)
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
        console.log(newObject, "dsf");
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

  console.log(predictData, "hello");

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
                console.log(val, index);
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
              <ReactToPdf scale={0.85}>
                {({ toPdf, targetRef }) => (
                  <div>
                    {Object.entries(predictData).length !== 0 && (
                      <button
                        onClick={toPdf}
                        className="text-base lg:text-lg rounded-lg bg-secondary text-white py-2 my-3 w-4/12 mt-10"
                      >
                        {" "}
                        TO PDF
                      </button>
                    )}
                    <div ref={targetRef}>
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
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
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
                )}
              </ReactToPdf>
            </div>
          );
        }}
      </Formik>
    </DragDropContext>
  );
};

const PredictorStateUttarPradesh = () => {
  const [masterData, setMasterData] = useState([]);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [predictData, setPredictData] = useState([]);

  const getFeidlValue = (formKey, formValue, fieldValue) => {
    console.log(formKey, "hello");
    delete formValue["rank"];
    const dataObject = { ...formValue };
    Object.keys(dataObject).map((val) =>
      dataObject[val].length === 0 ? delete dataObject[val] : null
    );
    if (!dataObject[formKey]) {
      dataObject[formKey] = fieldValue;
    } else {
      dataObject[formKey] = [];
    }
    setLoading(true);
    serverUnauth
      .post(`/neet-dropdown/state/uttar-pradesh`, dataObject)
      .then((res) => {
        console.log(res?.data, "hiiiiiiasdf");
        setMasterData(res?.data?.data);
        const dataSet = res?.data?.data;
        const newObject = {};
        dataSet.map((val, index) =>
          Object.keys(val).map((val1) => {
            if (val1 in newObject) {
              newObject[val1].push(dataSet[index][val1]);
            } else {
              newObject[val1] = [dataSet[index][val1]];
            }
          })
        );
        console.log(newObject, "new");
        Object.keys(newObject).map(
          (val) =>
            (newObject[val] = newObject[val].filter(
              (item, index) => newObject[val].indexOf(item) === index
            ))
        );
        console.log(newObject, "hello world");
        setData(newObject);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  console.log(data, "data");

  // Need To refactor this Function.
  const handleSubmit = (values) => {
    const reqObject = {};
    for (const [key, value] of Object.entries(values)) {
      if (value.length !== 0) {
        reqObject[key] = value;
      } else {
        reqObject[key] = [];
      }
    }
    console.log(reqObject, "reqObject");
    serverUnauth
      .post(`/predict-neet/state/uttar-pradesh`, reqObject)
      .then((res) => {
        console.log(res.data);
        setPredictData([...res.data.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updatedFieldValue = (masterData, values) => {
    const dataSet = masterData;
    const newObject = {};
    for (let index = 0; index < dataSet.length; index++) {
      Object.keys(values).map((valueKey) => {
        if (valueKey !== "rank") {
          if (
            values[valueKey].includes(dataSet[index][valueKey]) ||
            values[valueKey].length === 0
          ) {
            console.log(dataSet[index]);
            if (valueKey in newObject) {
              newObject[valueKey].push(dataSet[index][valueKey]);
            } else {
              newObject[valueKey] = [dataSet[index][valueKey]];
            }
          }
        }
      });
    }
    Object.keys(newObject).map(
      (val) =>
        (newObject[val] = newObject[val].filter(
          (item, index) => newObject[val].indexOf(item) === index
        ))
    );
    console.log(newObject, "hello world");
    setData(newObject);
  };

  console.log(data, "hii data");

  return (
    <Formik
      initialValues={{
        round: [],
        course: [],
        instituteType: [],
        allottedCategory: [],
        instituteName: [],
        rank: 0,
      }}
      // validationSchema={signUpalidation}
      onSubmit={(values) => handleSubmit(values)}
    >
      {({ values, handleSubmit, setFieldValue }) => {
        return (
          <div className="flex flex-col">
            <h1 className="text-xl p-6">Basic Predictor</h1>
            {Object.keys(values)?.map((val, index) => {
              console.log(val, index);
              if (val === "rank") {
                return;
              }
              return (
                <button className="bg-gray-200 p-2 w-10/12 md:w-8/12 xl:w-6/12 my-3 rounded-full mx-auto">
                  <div>{val}</div>
                  <Select
                    onMenuOpen={() => getFeidlValue(val, values, values[val])}
                    isLoading={loading}
                    key={val}
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
                      updatedFieldValue(masterData, values);
                    }}
                  />
                </button>
              );
            })}
            <input
              type="number"
              onChange={(e) => setFieldValue("rank", e.target.value)}
              className="block mx-auto my-3 broder-2 border-green-400 focus:border-2 focus:border-red-300 bg-gray-200 rounded-full p-2 "
            />
            <button
              type="submit"
              onClick={handleSubmit}
              className="p-2.5 text-base rounded-full bg-secondary text-white w-36 mx-auto  my-3"
            >
              Predict
            </button>

            {predictData.length !== 0 &&
              predictData?.map((val, index) => {
                return (
                  // Darg and Drop in this one to rearrange
                  <button className="flex gap-5 p-4 m-4 shadow-lg">
                    <div className="w-1/12">{index + 1}</div>
                    <div className="w-4/12">{val.instituteName}</div>
                    <div className="w-1/12">{val.instituteType}</div>
                    <div className="w-1/12">{val.quota}</div>
                    <div className="w-1/12">{val.seatType}</div>
                    <div className="w-4/12">{val.programName}</div>
                    <div className="w-1/12 bg-red-300">{val.closingRank}</div>
                  </button>
                );
              })}
          </div>
        );
      }}
    </Formik>
  );
};
