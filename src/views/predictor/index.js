import React, { useEffect, useState } from "react";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import Select from 'react-select'
import { serverUnauth } from "../../helpers/apiCall";
import { toast } from "react-toastify";

const Predictor = () => {

    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)
    const [lastClick, setLastClick] = useState("")
    const [predictData, setPredictData] = useState([])


    // Need To refactor this Function.
    const handleSubmit = (values) => {
        console.log(values, " fromValues 2");
        if (!values.rank || values.rank <= 0) {
            toast.error("Please Enter Correct Rank")
            return
        }
        if (values.gender.length === 0) {
            toast.error("Please Select Gender")
            return
        }
        if (values.seatType.length === 0) {
            toast.error("Please Select Seat Type")
            return
        }
        if (values.quota.length === 0) {
            toast.error("Please Select Quota")
            return
        }
        const reqObject = {}
        for (const [key, value] of Object.entries(values)) {
            if (value.length !== 0) {
                reqObject[key] = value
            }
        }
        console.log(reqObject, "reqObject");
        serverUnauth.post(`/predict-josa`, reqObject)
            .then((res) => { console.log(res.data); setPredictData([...res.data.data]) })
            .catch((err) => { console.log(err) })
    };

    const handleSelectClick = (values, clickedField) => {
        console.log(clickedField, "Same Hii");
        const dataObject = {
            instituteType: [],
            instituteName: [],
            programName: [],
            quota: [],
            seatType: [],
            gender: [],
            round: [],
        }
        setLoading(true)
        if (clickedField !== lastClick) {
            delete values.rank;
            serverUnauth.post(`/josa-dropdown`, values)
                .then((res) => {
                    const data = res.data.data
                    data?.map((val, index) =>
                        Object.keys(val).map((val2) => {
                            dataObject[val2].push(val[val2])
                        })
                    )
                    Object.keys(dataObject).map(key => {
                        dataObject[key] = dataObject[key].filter((item, index) => dataObject[key].indexOf(item) === index).sort();
                    })
                })
                .catch((err) => { console.log(err) })
                .finally(() => { setLastClick(clickedField); setLoading(false) })
        } else {
            setLoading(false)
            return
        }
        setData(dataObject)
    }

    console.log(loading, "hiii");

    return (
        <Formik
            initialValues={{
                instituteType: data?.instituteType || [],
                instituteName: data?.instituteName || [],
                programName: data?.programName || [],
                quota: data?.quota || [],
                seatType: data?.seatType || [],
                gender: data?.gender || [],
                round: data?.round || [],
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
                                if (val === "rank") {
                                    return
                                }
                                return (
                                    <button
                                        className="bg-gray-200 p-2 w-10/12 md:w-8/12 xl:w-6/12 my-3 rounded-full mx-auto"
                                        onClick={() => { handleSelectClick(values, Object.keys(values)[index]); }}>
                                        <div>{val}</div>
                                        <Select
                                            // classNames={{
                                            //     control: (state) =>
                                            //         state ? 'border-red-600' : 'border-grey-300',
                                            // }}
                                            isLoading={loading}
                                            key={val}
                                            isMulti
                                            options={data[val]?.map(val => { return { value: val, label: val } })}
                                            onChange={(e) => setFieldValue(val, e.map(ele => { return ele.value }))}
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

export default Predictor;
