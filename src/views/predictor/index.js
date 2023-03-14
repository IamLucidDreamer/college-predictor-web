import React, { useEffect, useState } from "react";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import Select from 'react-select'
import { serverUnauth } from "../../helpers/apiCall";

const Predictor = () => {

    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)
    const [lastClick, setLastClick] = useState("")
    const [predictData, setPredictData] = useState([])


    const handleSubmit = (values) => {
        console.log(values, " fromValues 2");
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
        setLoading(true)
        if (clickedField !== lastClick) {
            const dataObject = {
                instituteType: [],
                instituteName: [],
                programName: [],
                quota: [],
                seatType: [],
                gender: [],
                round: [],
            }
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
                    setData(dataObject)
                })
                .catch((err) => { console.log(err) })
                .finally(() => { setLastClick(clickedField); setLoading(false) })
        } else {
            setLoading(false)
            return
        }
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
                        {
                            Object.keys(values)?.map((val, index) => {
                                if (val === "rank") {
                                    return
                                }
                                return (
                                    <button onClick={() => { handleSelectClick(values, Object.keys(values)[index]) }}>
                                        <Select
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
                        <input type="number" onChange={e => setFieldValue("rank", e.target.value)} className="block mx-auto my-3 broder-2 border-green-400 focus:border-2 focus:border-red-300 bg-gray-200" />
                        <button type="submit" onClick={handleSubmit} className="mx-auto block">
                            Predict
                        </button>
                        <button onClick={() => { localStorage.clear(); window.location.replace("/") }} className="mx-auto block">
                            Logout
                        </button>
                        {
                            predictData.length !== 0 && predictData?.map(val => {
                                return (
                                    <div className="flex gap-5">
                                        <div>{val.instituteName}</div>
                                        <div>{val.instituteType}</div>
                                        <div>{val.quota}</div>
                                        <div>{val.seatType}</div>
                                        <div>{val.programName}</div>
                                        <div>{val.closingRank}</div>
                                    </div>
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
