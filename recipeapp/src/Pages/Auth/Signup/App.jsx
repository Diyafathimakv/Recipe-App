import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase";
import { Link, useNavigate } from "react-router-dom";
import '../App.css'

const SignUp = () => {
  const navigate = useNavigate();

  // ✅ Validation Schema
  const validationSchema = Yup.object({
  email: Yup.string()
  .required("Email is required")
  .test("valid-email", "Enter a valid email address", (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value || "");
  }),

   password: Yup.string()
  .required("Password is required")
  .test(
    "strong-password",
    "Password must contain:\n• 1 uppercase\n• 1 lowercase\n• 1 number\n• 1 special character",
    (value) => {
      if (!value) return false;

      return (
        /[a-z]/.test(value) &&
        /[A-Z]/.test(value) &&
        /[0-9]/.test(value) &&
        /[!@#$%^&*(),.?":{}|<>]/.test(value)
      );
    }
  ),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  // ✅ Formik setup
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );

        console.log(userCredential.user);
        alert("Signup successful! Please login");

        navigate("/");
      } catch (error) {
        if (error.code === "auth/email-already-in-use") {
          alert("Email already exists. Please login.");
        } else {
          alert(error.message);
        }
      }
    },
  });

  return (
    <div  className="auth-container">
      <form  className="auth-form" onSubmit={formik.handleSubmit}>
        <h1>Signup</h1>

        {/* EMAIL */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email && (
          <p style={{ color: "red" }}>{formik.errors.email}</p>
        )}

        {/* PASSWORD */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.password && formik.errors.password && (
          <p style={{ color: "red" }}>{formik.errors.password}</p>
        )}

        {/* CONFIRM PASSWORD */}
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.confirmPassword &&
          formik.errors.confirmPassword && (
            <p style={{ color: "red" }}>
              {formik.errors.confirmPassword}
            </p>
          )}

        {/* SUBMIT */}
        <button type="submit">Signup</button>

        {/* LINK */}
        <p>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;