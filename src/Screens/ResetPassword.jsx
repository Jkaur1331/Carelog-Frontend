import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { resetPasswordPage } from "../store/Services/Auth/index.tsx";
import { toast } from "react-toastify";
import Loader from "../Reuseable/Loader.jsx";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);
  const toggleConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    if (!token) {
      console.error("Invalid or missing token.");
      setSubmitting(false);
      return;
    }

    setIsLoading(true);
    setSubmitting(true);

    try {
      const res = await resetPasswordPage({
        body: {
          token: token,
          password: values.password,
        },
      });

      toast.success(res.message);
      navigate("/login");
    } catch (err) {
      console.error(err.response?.data?.message || "Password reset failed.");
      toast.error(err.response?.data?.message || "Password reset failed.");
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="login">
      <Loader loading={isLoading} />
      <div className="loginModal">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="text-center">
                <h1>Change Password</h1>
                <p className="subtitle">
                  Enter a new password to reset your account.
                </p>
              </div>

              <div className="form-group">
                <label htmlFor="password">New Password</label>
                <div className="password-wrapper">
                  <Field
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Enter new password"
                    className="form-control"
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

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <div className="password-wrapper">
                  <Field
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm new password"
                    className="form-control"
                  />
                  <i
                    className={`fa-solid ${
                      showConfirmPassword ? "fa-eye" : "fa-eye-slash"
                    } password-icon`}
                    onClick={toggleConfirmPassword}
                    style={{ color: "#03989e", cursor: "pointer" }}
                  ></i>
                </div>
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="error"
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ResetPassword;
