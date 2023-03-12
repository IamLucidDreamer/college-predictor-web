import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";

import CustomValidationErrorMessage from "../../components/errors/CustomValidationErrorMessage";
import { signup } from "../../services/authService";

const signUpalidation = Yup.object({
  email: Yup.string()
    .email("Not a Valid Email Address")
    .required("The Email Address is required"),
  password: Yup.string()
    .required("Password field is required")
    .min(8, "The Password lenght should be atleast 8 characters"),
});

const handleSignUp = async (values) => {
  const response = await signup(values.email, values.password);
};

const SignUp = () => {
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
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
              SignUp
            </button>
          </>
        );
      }}
    </Formik>
  );
};

export default SignUp;
