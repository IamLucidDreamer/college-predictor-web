import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import OTPInput, { ResendOTP } from "otp-input-react";
import { toast } from "react-toastify";

import CustomValidationErrorMessage from "../../components/errors/CustomValidationErrorMessage";
import Loader from "../../components/loader/index";
import { signup } from "../../services/authService";
import AuthLayout from "../layout/AuthLayout";
import AppLogo from "../../components/images/AppLogo";
import image from "../../assets/images/login.png";
import { Link, useLocation, useNavigate } from "react-router-dom";

const loginValidation = Yup.object({
  otp: Yup.string()
    .min(6, "OTP must be 6 digits")
    .required("The OTP is required"),
});

const VerifyOTP = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!state) {
      navigate("/signup");
    }
  }, []);

  const handleSignUp = async (values) => {
    setLoading(true);
    const data = { ...state.values, ...values };
    try {
      const response = await signup(data);
      const { status } = response;
      if (status >= 200 && status < 300) {
        toast.success("Signup was Successfull");
        localStorage.setItem("authToken", response?.data?.token);
        navigate("/dashboard");
        toast.success("Welcome to Career Kick");
      }
    } catch (err) {
      console.error("Error : ", err);
      toast.error(err?.message || "Something went Wrong");
    }
    setLoading(false);
  };

  return (
    <>
      <AuthLayout
        show={true}
        imageLink={image}
        title={"Sign In"}
        description={
          "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt sapiente ducimus."
        }
        form={
          <div className="w-11/12 lg:w-10/12 xl:w-2/3 max-w-2xl flex flex-col items-center justify-center">
            <AppLogo
              width={"250px"}
              height={"250px"}
              classname={"mx-auto mb-4"}
            />
            <Formik
              initialValues={{
                otp: "",
              }}
              validationSchema={loginValidation}
              onSubmit={(values) => handleSignUp(values)}
            >
              {({
                values,
                touched,
                errors,
                setFieldValue,
                handleChange,
                handleSubmit,
              }) => {
                return (
                  <>
                    <div className="w-11/12 ">
                      <h1 className="text-lg text-secondary">
                        {`Enter the OTP sent to : ${
                          state?.values?.countryCode || ""
                        }${state?.values?.phoneNumber || ""}`}
                      </h1>
                      <div className="text-secondary items-center rounded-full my-3">
                        <OTPInput
                          style={{
                            justifyContent: "space-between",
                            gap: 25,
                          }}
                          inputStyles={{
                            backgroundColor: "#e5e7eb",
                            width: "100%",
                            margin: "0px",
                            borderRadius: 5,
                          }}
                          value={values.otp}
                          onChange={(e) => {
                            setFieldValue("otp", e);
                          }}
                          autoFocus
                          OTPLength={6}
                          otpType="number"
                          disabled={false}
                          secure
                        />
                      </div>
                      <CustomValidationErrorMessage
                        show={touched.otp && errors.otp ? true : false}
                        error={errors.otp}
                      />
                    </div>
                    <button
                      className="p-2.5 text-lg rounded-full bg-secondary text-white w-11/12  my-3"
                      type="submit"
                      onClick={handleSubmit}
                      disabled={loading}
                    >
                      {loading ? <Loader width={25} height={25} /> : "Verify"}
                    </button>
                    <div className="text-sm">
                      <ResendOTP
                        onResendClick={() => console.log("Resend clicked")}
                      />
                    </div>
                    <div className="text-sm my-3">
                      Already have an account ?{" "}
                      <Link to={"/signup"}>Sign Up</Link>
                    </div>
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

export default VerifyOTP;
