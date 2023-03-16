import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "../../server"; // import database using mirage js

export default function Vans() {
  const [vans, setVans] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const typeFilter = searchParams.get("type");

  // fetch all van details (mirage js intercepts this fetch request to get data from our server)
  useEffect(() => {
    fetch("/api/vans/")
      .then((res) => res.json())
      .then((data) => {
        setVans(data.vans);
      });
  }, []);

  // filter vans by the type filter if typeFilter is true
  const displayedVans = typeFilter
    ? vans.filter((van) => van.type === typeFilter)
    : vans;

  // map our vans data object into jsx elements
  const vansElements = displayedVans.map((van) => {
    return (
      <Link to={`/vans/${van.id}`} key={van.id}>
        <div key={van.id} className="van-tile">
          <img src={van.imageUrl} alt={`${van.name}`} />
          <div className="van-info">
            <h3>{van.name}</h3>
            <p>
              ${van.price}
              <span>/day</span>
            </p>
          </div>
          <br />
          <i className={`van-type ${van.type} selected`}>{van.type}</i>
        </div>
      </Link>
    );
  });

  return (
    <div className="van-list-container">
      <h1>Explore our van options</h1>
      <div className="van-list">{vansElements}</div>
    </div>
  );
}
