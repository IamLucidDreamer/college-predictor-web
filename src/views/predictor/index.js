import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import Select from 'react-select'

const feilds = [
    { displayName: "Institute Type", key: "instituteType" },
    { displayName: "Institute Name", key: "instituteName" },
    { displayName: "Program Name", key: "programName" },
    { displayName: "Quota", key: "quota" },
    { displayName: "Seat Type", key: "seatType" },
    { displayName: "Round", key: "round" },
]

const handleSignUp = (values) => {
    console.log(values, "hello world");
};

const SignUp = () => {
    return (
        <Formik
            initialValues={{
                instituteType: [],
                instituteName: [],
                programName: [],
                quota: [],
                seatType: [],
                round: []
            }}
            validationSchema={signUpalidation}
            onSubmit={(values) => handleSignUp(values)}
        >
            {({ values, touched, errors, handleChange, handleSubmit }) => {
                return (
                    <>
                        <input
                            id="email"
                            placeholder="name@example.com"
                            type="email"
                            value={values.email}
                            onChange={handleChange}
                        />
                        <CustomValidationErrorMessage
                            show={touched.email && errors.email ? true : false}
                            error={errors.email}
                        />
                        <input
                            id="password"
                            placeholder="Password"
                            type="password"
                            value={values.password}
                            onChange={handleChange}
                        />
                        <CustomValidationErrorMessage
                            show={touched.password && errors.password ? true : false}
                            error={errors.password}
                        />
                        <button type="submit" onClick={handleSubmit}>
                            Login
                        </button>
                    </>
                );
            }}
        </Formik>
    );
};

export default SignUp;
