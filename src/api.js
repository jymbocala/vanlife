import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite"

// web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKl9oERADVGAp7wZ_JkvBQKDO95ohA6bc",
  authDomain: "vanlife-f0bb5.firebaseapp.com",
  projectId: "vanlife-f0bb5",
  storageBucket: "vanlife-f0bb5.appspot.com",
  messagingSenderId: "631272701741",
  appId: "1:631272701741:web:7b1ff2e716ce43a9f89da4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// database obj is used whenever we need to interface with our app's firestore database
const db = getFirestore(app);

// Refactoring the fetching functions

// function to get vans from api. MirageJS intercepts the fetch
export async function getVans(id) {
  const url = id ? `/api/vans/${id}` : "/api/vans";
  const res = await fetch(url);
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

export async function getHostVans(id) {
  const url = id ? `/api/host/vans/${id}` : "/api/host/vans";
  const res = await fetch(url);
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

// The problem above also makes the Error component not load on routes with errorElement