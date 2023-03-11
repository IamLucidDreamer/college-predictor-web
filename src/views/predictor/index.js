import React, { useEffect, useState } from "react";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import Select from 'react-select'
import { serverUnauth } from "../../helpers/apiCall";

const fields = [
    { displayName: "Institute Type", key: "instituteType" },
    { displayName: "Institute Name", key: "instituteName" },
    { displayName: "Program Name", key: "programName" },
    { displayName: "Quota", key: "quota" },
    { displayName: "Seat Type", key: "seatType" },
    { displayName: "Round", key: "round" },
]

const Predictor = () => {

    const [data, setData] = useState([])
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

    const apiData = []
    useEffect(() => {
        Promise.all(
            fields.map(async (val, index) => {
                console.log(index);
                await serverUnauth.get(`/josa-dropdown?key=${val.key}`)
                    .then((res) => { apiData.push({ name: val.key, val: res.data.data.map(val => { return { label: val, value: val } }) }) })
                    .catch((err) => { console.log(err) })
            })
        ).then(() => setData([...apiData]))
    }, [])

    return (
        <Formik
            initialValues={{
                instituteType: [],
                instituteName: [],
                programName: [],
                quota: [],
                seatType: [],
                round: [],
                rank: 0,
            }}
            // validationSchema={signUpalidation}
            onSubmit={(values) => handleSubmit(values)}
        >
            {({ values, touched, errors, handleChange, handleSubmit, setFieldValue }) => {
                console.log(values, "formValues");
                return (
                    <>
                        {
                            data?.map(val => {
                                return (
                                    <div>
                                        <Select
                                            onChange={(e) => { console.log(e, "hii"); setFieldValue(val.name, e.map(mapVal => mapVal.value)) }}
                                            isMulti
                                            options={val?.val} />
                                    </div>
                                )
                            })
                        }
                        <input type="number" onChange={e => setFieldValue("rank", e.target.value)} />
                        <button type="submit" onClick={handleSubmit}>
                            Login
                        </button>
                        {
                            predictData.length !== 0 && predictData?.map(val => {
                                return (
                                    <div className="flex gap-5">
                                        <div>{val.instituteName}</div>
                                        <div>{val.instituteType}</div>
                                        <div>{val.quota}</div>
                                         <div>{val.seatType}</div>
                                        <div>{val.closingRank}</div>
                                    </div>
                                )
                            })
                        }
                    </>
                );
            }}
        </Formik>
    );
};

export default Predictor;
