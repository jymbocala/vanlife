import React from "react";
import {
  useLoaderData,
  Form,
  redirect,
  useActionData,
  useNavigation,
} from "react-router-dom";
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
  const pathname = new URL(request.url).pathname.get("redirectTo") || "/host";

  try {
    const data = await loginUser({ email, password });
    localStorage.setItem("loggedin", true);
    console.log(data);
    return redirect(pathname);
  } catch (err) {
    return err.message;
  }
}

export default function Login() {
  // const location = useLocation(); // this gets the link state from AuthRequired component
  const status = useNavigation().state;
  const loginFirstMessage = useLoaderData();
  const errorMessage = useActionData();

  return (
    <div className="login-container">
      {/* {location.state?.message && (
        <h3 className="login-error">{location.state.message}</h3>
      )} */}
      <h1>Sign in to your account</h1>
      {loginFirstMessage && (
        <h2 className="login-error">{loginFirstMessage}</h2>
      )}
      {errorMessage && <h4 className="login-error">{errorMessage}</h4>}{" "}
      <Form method="post" className="login-form" replace>
        <input name="email" type="email" placeholder="Email address" />
        <input name="password" type="password" placeholder="Password" />
        <button disabled={status === "submitting"}>
          {status === "submitting" ? "Logging in..." : "Log in"}
        </button>
      </Form>
    </div>
  );
}
