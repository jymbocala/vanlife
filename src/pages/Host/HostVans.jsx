import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

export default function HostVans() {
  const [hostVans, setHostVans] = useState([]);

  // fetch host/vans route (mirage js intercepts this fetch request to get data from our server)
  useEffect(() => {
    fetch("/api/host/vans")
      .then((res) => res.json())
      .then((data) => {
        setHostVans(data.vans);
      });
  }, []);

  // //map out hostVans data into jsx elements
  // const hostVansElements = 

  console.log(hostVans);

  return (
    <h1>Host Vans here!</h1>
  )
}