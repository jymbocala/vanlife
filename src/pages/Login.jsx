import React, { useState } from "react";
import { useLoaderData, useNavigate, Form } from "react-router-dom";
import { loginUser } from "../api";

export function loader({ request }) {
  // the request obj is a native web request obj
  return new URL(request.url).searchParams.get("message");
  //
}

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const data = await loginUser({ email, password });
  localStorage.setItem("loggedin", true);
  console.log(data);

  return null;
}

export default function Login() {
  // const location = useLocation(); // this gets the link state from AuthRequired component
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);
  // console.log(status);
  const loginFirstMessage = useLoaderData();
  const navigate = useNavigate();

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   setStatus("submitting");
  //   // setError to null to reset nullify previous errors if this handleSubmit runs more than once.
  //   setError(null);
  //   loginUser(loginFormData)
  //     .then((data) => {
  //       console.log(data);
  //       navigate("/host", { replace: true});
  //     })
  //     .catch((err) => setError(err))
  //     // finally block always run whether the promise is resolved or rejected
  //     .finally(() => {
  //       // setStatus to idle so that button doesn't stay disabled
  //       setStatus("idle");
  //     });
  // }

  return (
    <div className="login-container">
      {/* {location.state?.message && (
        <h3 className="login-error">{location.state.message}</h3>
      )} */}
      <h1>Sign in to your account</h1>
      {loginFirstMessage && (
        <h2 className="login-error">{loginFirstMessage}</h2>
      )}
      {error && <h3 className="login-error">{error.message}</h3>}{" "}
      <Form method="post" className="login-form">
        <input name="email" type="email" placeholder="Email address" />
        <input name="password" type="password" placeholder="Password" />
        <button disabled={status === "submitting"}>
          {status === "submitting" ? "Logging in..." : "Log in"}
        </button>
      </Form>
    </div>
  );
}
