import React, { useState } from "react";
import Threads from "../Threads";
import { useFormik } from "formik";
import * as Yup from "yup";
import { resetPasswordLink } from "../store/Services/Auth/index.tsx";
import { toast } from "react-toastify";
import Loader from "../Reuseable/Loader.jsx";

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const res = await resetPasswordLink({
          body: {
            email: values.email,
          },
        });
        toast.success(res.message);
      } catch (error) {
        toast.error(error.data.message);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    },
  });

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
        <form onSubmit={formik.handleSubmit}>
          <div className="text-center">
            <h1>Forgot Password?</h1>
            <p className="subtitle">
              Log in to continue managing your patients and forms
            </p>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Please enter your email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={
                formik.touched.email && formik.errors.email ? "input-error" : ""
              }
            />
            {formik.touched.email && formik.errors.email && (
              <div className="error">{formik.errors.email}</div>
            )}
          </div>

          <button type="submit" className="btn btn-primary">
            Send link
          </button>

          <p className="signup-link">
            Didn’t receive the link? <button type="submit">Resend</button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
