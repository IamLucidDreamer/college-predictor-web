import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";

import CustomValidationErrorMessage from "../../components/errors/CustomValidationErrorMessage";
import { signup } from "../../services/authService";
import { toast } from "react-toastify";
import AuthLayout from "../layout/AuthLayout";
import AppLogo from "../../components/images/AppLogo";
import image from "../../assets/images/signup.jpg";

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
  const { status } = response;
  if (status >= 200 && status < 300) {
    toast.success("Login Was Success");
    // localStorage.setItem("authToken", response?.data?.token);
    window.location.replace("/login");
  }
  toast.error(response?.error?.data?.error);
};

const SignUp = () => {
  return (
    <>
      <AuthLayout
        imageLink={image}
        title={""}
        description={""}
        form={
          <div className="w-11/12 lg:w-10/12 xl:w-2/3 max-w-2xl flex flex-col items-center justify-center">
            <AppLogo
              width={"250px"}
              height={"250px"}
              classname={"mx-auto mb-4"}
            />
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
          </div>
        }
      />
    </>
  );
};

export default SignUp;
