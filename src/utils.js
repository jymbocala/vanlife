import { redirect } from "react-router-dom";

export async function requireAuth() {
  const isLoggedIn = false;

  if (!isLoggedIn) {
    throw redirect("/login");
  }
  return null
}

// Why turn it into an async function?
// Commonly we might be reaching out to server, to ensure the the use is currently logged in. Doing that may be an async function. So we don't want requireAuth to kick of a request, and continue making fetches in the loader if the user is not logged in. 
