import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import { getHostVans } from "../../../api";
import { requireAuth } from "../../../utils";

export async function loader({request}) {
  // ERR: error occurs when adding await before requireAuth(), otherwise the error is logged in the console
  await requireAuth(request); // await ensures that the functions runs completely before getHostVans function
  return getHostVans();
}

export default function HostVans() {
  const hostVans = useLoaderData();

  //map out hostVans data into jsx elements
  const hostVansElements = hostVans.map((van) => {
    return (
      <Link to={`${van.id}`} key={van.id}>
        <div className="host-van-row" key={van.id}>
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
    );
  });

  return (
    <div>
      <h1>Your listed vans</h1>
      <div className="host-van-list">{hostVansElements}</div>
    </div>
  );
}
