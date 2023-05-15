import React from "react";
import { Link, 
  useSearchParams, 
  useLoaderData,
  defer 
} from "react-router-dom";
import "../../server"; // import database using mirage js
import { getVans } from "../../api";

// fetch data here rather than using a useEffect inside the component
export function loader() {
  return defer({vans: getVans()});
}

export default function Vans() {
  const [searchParams, setSearchParams] = useSearchParams();
  const vans = useLoaderData();
  const typeFilter = searchParams.get("type");

  // filter vans data by the type filter if typeFilter is true
  const displayedVans = typeFilter
    ? vans.filter((van) => van.type === typeFilter)
    : vans;

  // map over the returned displayedVans data object into jsx elements
  const vansElements = displayedVans.map((van) => {
    return (
      <Link
        to={`${van.id}`}
        key={van.id}
        state={{ search: searchParams.toString(), type: typeFilter }}
      >
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

  function handleFilterChange(key, value) {
    setSearchParams((prevParams) => {
      if (value === null) {
        prevParams.delete(key);
      } else {
        prevParams.set(key, value);
      }
      return prevParams;
    });
  }

  return (
    <div className="van-list-container">
      <h1>Explore our van options</h1>
      <div className="van-list-filter-buttons">
        <button
          onClick={() => handleFilterChange("type", "simple")}
          className={`van-type simple ${
            typeFilter === "simple" ? "selected" : null
          }`}
        >
          Simple
        </button>
        <button
          onClick={() => handleFilterChange("type", "rugged")}
          className={`van-type rugged ${
            typeFilter === "rugged" ? "selected" : null
          }`}
        >
          Rugged
        </button>
        <button
          onClick={() => handleFilterChange("type", "luxury")}
          className={`van-type luxury ${
            typeFilter === "luxury" ? "selected" : null
          }`}
        >
          Luxury
        </button>
        {typeFilter ? (
          <button
            onClick={() => setSearchParams({})}
            className={`van-type clear-filters`}
          >
            Clear filters
          </button>
        ) : null}
      </div>
      <div className="van-list">{vansElements}</div>
    </div>
  );
}
