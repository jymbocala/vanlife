import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../server"; // import database using mirage js

export default function Vans() {
  const [vans, setVans] = useState([]);

  // fetch all van details (mirage js intercepts this fetch request to get data from our server)
  useEffect(() => {
    fetch("/api/vans/")
      .then((res) => res.json())
      .then((data) => {
        setVans(data.vans);
      });
  }, []);

  // map our vans data object into jsx elements
  const vansElements = vans.map((van) => {
    return (
      <div key={van.id} className="van-tile">
        <Link to={`/vans/${van.id}`}>
          <img src={van.imageUrl} alt={`${van.name}`} />
          <div className="van-info">
            <h3>{van.name}</h3>
            <p>
              ${van.price}
              <span>/day</span>
            </p>
          </div>
          <i className={`van-type ${van.type} selected`}>{van.type}</i>
        </Link>
      </div>
    );
  });

  return (
    <div className="van-list-container">
      <h1>Explore our van options</h1>
      <div className="van-list">{vansElements}</div>
    </div>
  );
}
