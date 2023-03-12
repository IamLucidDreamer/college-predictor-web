import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";

import CustomValidationErrorMessage from "../../components/errors/CustomValidationErrorMessage";
import { login } from "../../services/authService";
import { toast } from "react-toastify";

const loginValidation = Yup.object({
  email: Yup.string()
    .email("Not a Valid Email Address")
    .required("The Email Address is required"),
  password: Yup.string()
    .required("Password field is required")
    .min(8, "The Password lenght should be atleast 8 characters"),
});

const handleLogin = async (values) => {
  const response = await login(values.email, values.password);
  const { status } = response;
  if (status >= 200 && status < 300) {
    toast.success("Login Was Success");
    localStorage.setItem("authToken", response?.data?.token);
    window.location.replace("/predictor");
  }
  toast.error(response?.error?.data?.error);
};

const Login = () => {
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        rememberMe: false,
      }}
      validationSchema={loginValidation}
      onSubmit={(values) => handleLogin(values)}
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

export default Login;
