import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import { Formik } from 'formik';
import { serverUnauth } from "../../../helpers/apiCall";
import { toast } from "react-toastify";

const NeetIndex = () => {
    const [activeType, setActiveType] = useState(0)
    const [activeCategoryType, setActiveCategoryType] = useState(0)
    return (
        <div className='m-4 bg-gray-100 shadow-md rounded-lg'>
            <div className='flex'>
                <button
                    onClick={() => setActiveType(1)}
                    className={`w-1/2 text-center text-2xl py-2 rounded-tl-lg ${activeType === 1 ? "bg-primary text-white" : ""}`}>
                    MBBS / BHMS / Bsc. Nursing
                </button>
                <button
                    onClick={() => setActiveType(2)}
                    className={`w-1/2 text-center text-2xl py-2 rounded-tr-lg ${activeType === 2 ? "bg-primary text-white" : ""}`}>
                    Ayush
                </button>
            </div>

            <div className='p-4 my-4'>
                {activeType === 1 &&
                    <div className='flex gap-2'>
                        <button onClick={() => setActiveCategoryType(1)}
                            className={`w-1/2 text-center text-2xl py-2 rounded-lg ${activeCategoryType === 1 ? "bg-primary text-white" : ""}`}>
                            All India
                        </button>
                        <button onClick={() => setActiveCategoryType(2)}
                            className={`w-1/2 text-center text-2xl py-2 rounded-lg ${activeCategoryType === 2 ? "bg-primary text-white" : ""}`}>
                            State Counciling
                        </button>
                        <button onClick={() => setActiveCategoryType(3)}
                            className={`w-1/2 text-center text-2xl py-2 rounded-lg ${activeCategoryType === 3 ? "bg-primary text-white" : ""}`}>
                            Others
                        </button>
                    </div>
                }
                {activeCategoryType === 1 &&
                    <Predictor />
                }
                {activeCategoryType === 2 &&
                    <PredictorStateUttarPradesh />
                }
            </div>
        </div>
    )
}

export default NeetIndex


const Predictor = () => {

    const [masterData, setMasterData] = useState([])
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)
    const [predictData, setPredictData] = useState([])

    const getFeidlValue = (formKey, formValue, fieldValue) => {
        console.log(formKey, "hello");
        delete formValue["rank"]
        const dataObject = { ...formValue }
        Object.keys(dataObject).map(val => dataObject[val].length === 0 ? delete dataObject[val] : null)
        if (!dataObject[formKey]) {
            dataObject[formKey] = fieldValue
        }
        else {
            dataObject[formKey] = []
        }
        setLoading(true)
        serverUnauth.post(`/neet-dropdown`, dataObject)
            .then((res) => {
                console.log(res?.data, "hiiiiiiasdf");
                setMasterData(res?.data?.data)
                const dataSet = res?.data?.data
                const newObject = {}
                dataSet.map((val, index) =>
                    Object.keys(val).map((val1) => {
                        if (val1 in newObject) {
                            newObject[val1].push(dataSet[index][val1])
                        }
                        else {
                            newObject[val1] = [dataSet[index][val1]]
                        }
                    }
                    ))
                console.log(newObject, "new");
                Object.keys(newObject).map(val => newObject[val] = newObject[val].filter((item,
                    index) => newObject[val].indexOf(item) === index))
                console.log(newObject, "hello world");
                setData(newObject)
            })
            .catch((err) => { console.log(err) })
            .finally(() => { setLoading(false) })
    }
    console.log(data, "data");

    // Need To refactor this Function.
    const handleSubmit = (values) => {
        const reqObject = {}
        for (const [key, value] of Object.entries(values)) {
            if (value.length !== 0) {
                reqObject[key] = value
            }
        }
        console.log(reqObject, "reqObject");
        serverUnauth.post(`/predict-neet`, reqObject)
            .then((res) => { console.log(res.data); setPredictData([...res.data.data]) })
            .catch((err) => { console.log(err) })
    };

    // const handleSelectClick = (values, clickedField) => {
    //     console.log(clickedField, "Same Hii");
    //     const dataObject = {
    //         instituteType: [],
    //         instituteName: [],
    //         programName: [],
    //         quota: [],
    //         seatType: [],
    //         gender: [],
    //         round: [],
    //     }
    //     setLoading(true)
    //     if (clickedField !== lastClick) {
    //     delete values.rank;
    //     serverUnauth.post(`/neet-dropdown`, values)
    //         .then((res) => {
    //             const data = res.data.data
    //             data?.map((val, index) =>
    //                 Object.keys(val).map((val2) => {
    //                     dataObject[val2].push(val[val2])
    //                 })
    //             )
    //             Object.keys(dataObject).map(key => {
    //                 dataObject[key] = dataObject[key].filter((item, index) => dataObject[key].indexOf(item) === index).sort();
    //             })
    //         })
    //         .catch((err) => { console.log(err) })
    //         .finally(() => {
    //             setLastClick(clickedField);
    //             setLoading(false)
    //         })
    //     } else {
    //         setLoading(false)
    //         return
    //     }
    //     setData(dataObject)
    // }

    const updatedFieldValue = (masterData, values) => {
        const dataSet = masterData
        const newObject = {}
        for (let index = 0; index < dataSet.length; index++) {
            Object.keys(values).map(
                valueKey => {
                    if (valueKey !== "rank") {
                        if (values[valueKey].includes(dataSet[index][valueKey]) || values[valueKey].length === 0) {
                            console.log(dataSet[index])
                            if (valueKey in newObject) {
                                newObject[valueKey].push(dataSet[index][valueKey])
                            }
                            else {
                                newObject[valueKey] = [dataSet[index][valueKey]]
                            }
                        }
                    }
                }
            )
        }
        Object.keys(newObject).map(val => newObject[val] = newObject[val].filter((item,
            index) => newObject[val].indexOf(item) === index))
        console.log(newObject, "hello world");
        setData(newObject)
    }

    console.log(data, "hii data");

    return (
        <Formik
            initialValues={{
                course: [],
                round: [],
                allottedPH: [],
                quota: [],
                allottedCategory: [],
                instituteName: [],
                rank: 0,
            }}
            // validationSchema={signUpalidation}
            onSubmit={(values) => handleSubmit(values)}
        >
            {({ values, handleSubmit, setFieldValue, }) => {
                return (
                    <div className="flex flex-col">
                        <h1 className="text-xl p-6">Basic Predictor</h1>
                        {
                            Object.keys(values)?.map((val, index) => {
                                console.log(val, index);
                                if (val === "rank") {
                                    return
                                }
                                return (
                                    <button
                                        className="bg-gray-200 p-2 w-10/12 md:w-8/12 xl:w-6/12 my-3 rounded-full mx-auto">
                                        <div>{val}</div>
                                        <Select
                                            onMenuOpen={() => getFeidlValue(val, values, values[val])}
                                            isLoading={loading}
                                            key={val}
                                            isMulti
                                            options={data[val]?.map(value => { return { value: value, label: value } })}
                                            onChange={(e) => {
                                                setFieldValue(val, e.map(ele => { return ele.value }))
                                                updatedFieldValue(masterData, values);
                                            }
                                            }
                                        />
                                    </button>
                                )
                            })
                        }
                        <input type="number" onChange={e => setFieldValue("rank", e.target.value)} className="block mx-auto my-3 broder-2 border-green-400 focus:border-2 focus:border-red-300 bg-gray-200 rounded-full p-2 " />
                        <button type="submit" onClick={handleSubmit} className="p-2.5 text-lg rounded-full bg-secondary text-white w-36 mx-auto  my-3">
                            Predict
                        </button>
                        {
                            predictData.length !== 0 && predictData?.map((val, index) => {
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
                                )
                            })
                        }
                    </div>
                );
            }}
        </Formik>
    );
};



const PredictorStateUttarPradesh = () => {

    const [masterData, setMasterData] = useState([])
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)
    const [predictData, setPredictData] = useState([])

    const getFeidlValue = (formKey, formValue, fieldValue) => {
        console.log(formKey, "hello");
        delete formValue["rank"]
        const dataObject = { ...formValue }
        Object.keys(dataObject).map(val => dataObject[val].length === 0 ? delete dataObject[val] : null)
        if (!dataObject[formKey]) {
            dataObject[formKey] = fieldValue
        }
        else {
            dataObject[formKey] = []
        }
        setLoading(true)
        serverUnauth.post(`/neet-dropdown/state/uttar-pradesh`, dataObject)
            .then((res) => {
                console.log(res?.data, "hiiiiiiasdf");
                setMasterData(res?.data?.data)
                const dataSet = res?.data?.data
                const newObject = {}
                dataSet.map((val, index) =>
                    Object.keys(val).map((val1) => {
                        if (val1 in newObject) {
                            newObject[val1].push(dataSet[index][val1])
                        }
                        else {
                            newObject[val1] = [dataSet[index][val1]]
                        }
                    }
                    ))
                console.log(newObject, "new");
                Object.keys(newObject).map(val => newObject[val] = newObject[val].filter((item,
                    index) => newObject[val].indexOf(item) === index))
                console.log(newObject, "hello world");
                setData(newObject)
            })
            .catch((err) => { console.log(err) })
            .finally(() => { setLoading(false) })
    }
    console.log(data, "data");

    // Need To refactor this Function.
    const handleSubmit = (values) => {
        const reqObject = {}
        for (const [key, value] of Object.entries(values)) {
            if (value.length !== 0) {
                reqObject[key] = value
            }
            else{
                reqObject[key] = []
            }
        }
        console.log(reqObject, "reqObject");
        serverUnauth.post(`/predict-neet/state/uttar-pradesh`, reqObject)
            .then((res) => { console.log(res.data); setPredictData([...res.data.data]) })
            .catch((err) => { console.log(err) })
    };

    // const handleSelectClick = (values, clickedField) => {
    //     console.log(clickedField, "Same Hii");
    //     const dataObject = {
    //         instituteType: [],
    //         instituteName: [],
    //         programName: [],
    //         quota: [],
    //         seatType: [],
    //         gender: [],
    //         round: [],
    //     }
    //     setLoading(true)
    //     if (clickedField !== lastClick) {
    //     delete values.rank;
    //     serverUnauth.post(`/neet-dropdown`, values)
    //         .then((res) => {
    //             const data = res.data.data
    //             data?.map((val, index) =>
    //                 Object.keys(val).map((val2) => {
    //                     dataObject[val2].push(val[val2])
    //                 })
    //             )
    //             Object.keys(dataObject).map(key => {
    //                 dataObject[key] = dataObject[key].filter((item, index) => dataObject[key].indexOf(item) === index).sort();
    //             })
    //         })
    //         .catch((err) => { console.log(err) })
    //         .finally(() => {
    //             setLastClick(clickedField);
    //             setLoading(false)
    //         })
    //     } else {
    //         setLoading(false)
    //         return
    //     }
    //     setData(dataObject)
    // }

    const updatedFieldValue = (masterData, values) => {
        const dataSet = masterData
        const newObject = {}
        for (let index = 0; index < dataSet.length; index++) {
            Object.keys(values).map(
                valueKey => {
                    if (valueKey !== "rank") {
                        if (values[valueKey].includes(dataSet[index][valueKey]) || values[valueKey].length === 0) {
                            console.log(dataSet[index])
                            if (valueKey in newObject) {
                                newObject[valueKey].push(dataSet[index][valueKey])
                            }
                            else {
                                newObject[valueKey] = [dataSet[index][valueKey]]
                            }
                        }
                    }
                }
            )
        }
        Object.keys(newObject).map(val => newObject[val] = newObject[val].filter((item,
            index) => newObject[val].indexOf(item) === index))
        console.log(newObject, "hello world");
        setData(newObject)
    }

    console.log(data, "hii data");

    return (
        <Formik
            initialValues={{
                round: [],
                course: [],
                instituteType: [],
                allottedCategory: [],
                instituteName: [],
                rank: 0
            }}
            // validationSchema={signUpalidation}
            onSubmit={(values) => handleSubmit(values)}
        >
            {({ values, handleSubmit, setFieldValue, }) => {
                return (
                    <div className="flex flex-col">
                        <h1 className="text-xl p-6">Basic Predictor</h1>
                        {
                            Object.keys(values)?.map((val, index) => {
                                console.log(val, index);
                                if (val === "rank") {
                                    return
                                }
                                return (
                                    <button
                                        className="bg-gray-200 p-2 w-10/12 md:w-8/12 xl:w-6/12 my-3 rounded-full mx-auto">
                                        <div>{val}</div>
                                        <Select
                                            onMenuOpen={() => getFeidlValue(val, values, values[val])}
                                            isLoading={loading}
                                            key={val}
                                            isMulti
                                            options={data[val]?.map(value => { return { value: value, label: value } })}
                                            onChange={(e) => {
                                                setFieldValue(val, e.map(ele => { return ele.value }))
                                                updatedFieldValue(masterData, values);
                                            }
                                            }
                                        />
                                    </button>
                                )
                            })
                        }
                        <input type="number" onChange={e => setFieldValue("rank", e.target.value)} className="block mx-auto my-3 broder-2 border-green-400 focus:border-2 focus:border-red-300 bg-gray-200 rounded-full p-2 " />
                        <button type="submit" onClick={handleSubmit} className="p-2.5 text-lg rounded-full bg-secondary text-white w-36 mx-auto  my-3">
                            Predict
                        </button>
                        {
                            predictData.length !== 0 && predictData?.map((val, index) => {
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
                                )
                            })
                        }
                    </div>
                );
            }}
        </Formik>
    );
};
