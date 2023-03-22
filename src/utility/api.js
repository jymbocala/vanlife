// function to get vans from api. MirageJS intercepts the fetch
export async function getVans() {
  const res = await fetch("/api/vans/");
  if (!res.ok) {
    throw {
      message: "Failed to fetch vans",
      statusText: res.statusText,
      status: res.status,
    };
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
    throw {
      message: data.message,
      statusText: res.statusText,
      status: res.status,
    };
  }

  return data;
}
