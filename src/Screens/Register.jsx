import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const Register = () => {
const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);
  const toggleConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be more than 8 characters long and contain at least 1 uppercase, 1 lowercase, 1 numeric character and 1 special character.')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Password doesn’t match'),
    remember: Yup.boolean(),
  });

  const handleSubmit = (values) => {
    console.log('Form Submitted:', values);
  };

  return (
    <div className="login">
      <div className="loginModal">
        <div className="text-center">
          <h1>
            Welcome to <span className="brand-color">MediAssist</span>
          </h1>
          <p className="subtitle">
            Sign up to manage your patients and forms easily
          </p>
        </div>

        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            remember: false,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form>
              <div className="form-group">
                <label htmlFor="name">Enter Name</label>
                <Field type="text" id="name" name="name" />
                <ErrorMessage name="name" component="div" className="error" />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Id</label>
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

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="password-wrapper">
                  <Field
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                  />
                  <i
                    className={`fa-solid ${showConfirmPassword ? 'fa-eye' : 'fa-eye-slash'} password-icon`}
                    onClick={toggleConfirmPassword}
                    style={{ color: '#03989e', cursor: 'pointer' }}
                  ></i>
                </div>
                <ErrorMessage name="confirmPassword" component="div" className="error" />
              </div>

              <div className="form-options">
                <div className="remember-me">
                  <Field type="checkbox" id="remember" name="remember" />
                  <label htmlFor="remember">Remember Me</label>
                </div>
                <a className="forgot-password">Forgot Password?</a>
              </div>

              <button type="submit" className="btn btn-primary">Sign Up</button>

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

        <p className="signup-link">
          Already have an account? <a onClick={()=>navigate("/login")}>Log In</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
