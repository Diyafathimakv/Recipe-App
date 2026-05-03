import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase";
import { Link, useNavigate } from "react-router-dom";
import '../App.css'

const Login = () => {
  const navigate = useNavigate();
  const [authError, setAuthError] = useState(""); // ✅ error state

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email")
        .required("Required"),

      password: Yup.string()
        .min(6, "Minimum 6 characters")
        .required("Required"),
    }),

    onSubmit: async (values) => {
      try {
        setAuthError(""); // clear old error

        const userCredential = await signInWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );

        console.log(userCredential.user);
        navigate("/home");
      } catch (error) {
        if (error.code === "auth/invalid-credential") {
          setAuthError("Invalid email or password");
        } else {
          setAuthError(error.message);
        }
      }
    },
  });

  return (
    <div  className="auth-container">
      <form className="auth-form" onSubmit={formik.handleSubmit}>
        <h1>Login</h1>

        {/* EMAIL */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formik.values.email}
          onChange={(e) => {
            formik.handleChange(e);
            setAuthError(""); // clear error while typing
          }}
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
          onChange={(e) => {
            formik.handleChange(e);
            setAuthError("");
          }}
          onBlur={formik.handleBlur}
        />
        {formik.touched.password && formik.errors.password && (
          <p style={{ color: "red" }}>{formik.errors.password}</p>
        )}

        {/* 🔴 AUTH ERROR */}
        {authError && (
          <p style={{ color: "red", marginTop: "10px" }}>
            {authError}
          </p>
        )}

        <button type="submit">Login</button>

        <p>
          No account? <Link to="/signup">Signup</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;