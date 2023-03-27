// function to get vans from api. MirageJS intercepts the fetch
export async function getVans() {
  const res = await fetch("/api/vans/");
  if (!res.ok) {
    throw new Error({
      message: "Failed to fetch vans",
      statusText: res.statusText,
      status: res.status,
    });
  }
  const data = await res.json();
  return data.vans;
}

// function that fetches to the login endpoint
export async function loginUser(creds) {
  // creds is an obj that has an email and password property
  const res = await fetch("/api/login", {
    method: "post",
    body: JSON.stringify(creds),
  });
  const data = await res.json();

  if (!res.ok) {
    // todo: fix "Expected an error object to be thrown"
    // see explanation below
    throw {
      message: data.message,
      statusText: res.statusText,
      status: res.status,
    };
  }

  return data;
}


// EXPLANATION: the code below solves the error mentioned above. However is sends back an [object Oject] to the Login.jsx. How do I extract the message and set it as the error state?
// throw Error({
//   message: data.message,
//   statusText: res.statusText,
//   status: res.status,
// });