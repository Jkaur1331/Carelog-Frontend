import React, { useState } from "react";
import Threads from "../Threads";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { loginApiCall } from "../store/Services/Auth/index.tsx";
import Loader from "../Reuseable/Loader.jsx";
import { toast } from "react-toastify";
import { useAtom } from "jotai";
import { globalUserType } from "../JotaiStore/index.jsx";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [, setGlobalUserTypeAtom] = useAtom(globalUserType);
  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(
        8,
        "Password must be more than 8 characters long and contain at least 1 uppercase, 1 lowercase, 1 numeric character and 1 special character."
      )
      .required("Password is required"),
    remember: Yup.boolean(),
  });

  const handleSubmit = (values) => {
    setIsLoading(true);
    try {
      loginApiCall({
        body: {
          email: values.email,
          password: values.password,
        },
      })
        .then((res) => {
          localStorage.setItem("accessToken", res.Data.token);
          localStorage.setItem("userId", res.Data.id);
          localStorage.setItem("userType", res?.Data.role);
          setGlobalUserTypeAtom(res?.Data.role);
          toast.success("Logged In Successfully");
          if (res?.Data.role === "Super Admin") {
            navigate("/admin");
          } else {
            navigate("/");
          }
        })
        .catch((err) => {
          console.error("Login failed", err);
          toast.error(err.data.Data);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (error) {
      console.error("Unexpected error", error);
      setIsLoading(false);
      toast.error("Something went wrong");
    }

    console.log("values", values);
  };

  return (
    <div className="login">
      <Loader loading={isLoading} />
      {/* <Threads
        amplitude={2.3}
        distance={0.5}
        enableMouseInteraction={false}
        color={[0, 120, 150]}
      /> */}
      <div className="loginModal">
        <div className="text-center">
          <h1>Welcome Back!</h1>
          <p class="subtitle">
            Log in to continue managing your patients and forms
          </p>
        </div>

        <Formik
          initialValues={{ email: "", password: "", remember: false }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <Field type="email" id="email" name="email" />
                <ErrorMessage name="email" component="div" className="error" />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="password-wrapper">
                  <Field
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                  />
                  <i
                    className={`fa-solid ${
                      showPassword ? "fa-eye" : "fa-eye-slash"
                    } password-icon`}
                    onClick={togglePassword}
                    style={{ color: "#03989e", cursor: "pointer" }}
                  ></i>
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error"
                />
              </div>
              <div className="form-options">
                <div className="remember-me">
                  <Field type="checkbox" id="remember" name="remember" />
                  <label htmlFor="remember">Remember Me</label>
                </div>
                <a
                  className="forgot-password"
                  onClick={() => navigate("/forgot-password")}
                >
                  Forgot Password?
                </a>
              </div>
              <button type="submit" className="btn btn-primary">
                Log in
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
