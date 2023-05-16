import { redirect } from "react-router-dom";

export async function requireAuth(request) {
  const pathname = new URL(request.url).pathname;
  // final code is below, however it gives me an error when the page loads
  // const isLoggedIn = localStorage.getItem("loggedin");

  //temporary code
  const isLoggedIn = true;

  if (!isLoggedIn) {
    throw redirect(
      `/login?message=You must log in first.&redirectTo=${pathname}`
    );
  }
  return null;
}
