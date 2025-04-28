import React, { useState } from "react";
import Threads from '../Threads';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(8, 'Password must be more than 8 characters long and contain at least 1 uppercase, 1 lowercase, 1 numeric character and 1 special character.').required('Password is required'),
    remember: Yup.boolean(),
  });

  const handleSubmit = (values) => {
    console.log('Form Data:', values);
  };

  return (
    <div className="login">
      <div className="loginModal">
        <div className="text-center">
          <h1>
            Welcome Back! 
          </h1>
          <p class="subtitle">
            Log in to continue managing your patients and forms
          </p>
        </div>

        <Formik
          initialValues={{ email: '', password: '', remember: false }}
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
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                  />
                  <i
                    className={`fa-solid ${showPassword ? 'fa-eye' : 'fa-eye-slash'} password-icon`}
                    onClick={togglePassword}
                    style={{ color: '#03989e', cursor: 'pointer' }}
                  ></i>
                </div>
                <ErrorMessage name="password" component="div" className="error" />
              </div>
              <div className="form-options">
                <div className="remember-me">
                  <Field type="checkbox" id="remember" name="remember" />
                  <label htmlFor="remember">Remember Me</label>
                </div>
                <a className="forgot-password">Forgot Password?</a>
              </div>
              <button type="submit" className="btn btn-primary">Log in</button>
              <div className="divider">Or</div>
              <button type="button" className="btn btn-google">
                <img
                  src="https://developers.google.com/identity/images/g-logo.png"
                  alt="Google logo"
                  className="google-icon"
                />
                Continue With Google
              </button>
            </Form>
            )}
        </Formik>
        <p class="signup-link">
          Don't have an account? <a onClick={()=>navigate("/register")}>Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
