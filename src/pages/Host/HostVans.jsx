import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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

  //map out hostVans data into jsx elements
  const hostVansElements = hostVans.map((van) => {
    return (
      <Link to={`/vans/${van.id}`}>
        <div key={van.id} className="host-van-row">
          <img src={van.imageUrl} alt={`${van.name}`} />
          <div className="host-van-info">
            <h3>{van.name}</h3>
            <p>
              ${van.price}
              <span>/day</span>
            </p>
          </div>
        </div>
      </Link>
    )
  });

  console.log(hostVans);

  return (
    <div className="van-list-container">
      <h1>Your listed vans</h1>
      <div className="host-van-list">{hostVansElements}</div>
    </div>
  )
}