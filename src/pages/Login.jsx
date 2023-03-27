import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { loginUser } from "../utility/api";

export default function Login() {
  const [loginFormData, setLoginFormData] = React.useState({
    email: "",
    password: "",
  });
  const location = useLocation(); // this gets the link state from AuthRequired component
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  // console.log(status);

  function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");
    // setError to null to reset nullify previous errors if this handleSubmit runs more than once. 
    setError(null);
    loginUser(loginFormData)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        setError(err);
      })
      // finally block always run if promise is resolved or rejected
      .finally(() => {
        // setStatus to idle so that button doesn't stay disabled
        setStatus("idle");
      });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setLoginFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div className="login-container">
      {location.state?.message && (
        <h3 className="login-error">{location.state.message}</h3>
      )}
      <h1>Sign in to your account</h1>
      {error && <h3 className="login-error">{error.message}</h3>}{" "}
      <form onSubmit={handleSubmit} className="login-form">
        <input
          name="email"
          onChange={handleChange}
          type="email"
          placeholder="Email address"
          value={loginFormData.email}
        />
        <input
          name="password"
          onChange={handleChange}
          type="password"
          placeholder="Password"
          value={loginFormData.password}
        />
        <button disabled={status === "submitting" ? true : false}>
          {status === "submitting" ? "Logging in..." : "Log in"}
        </button>
      </form>
    </div>
  );
}
