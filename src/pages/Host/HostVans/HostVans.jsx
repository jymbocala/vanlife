import React, { Suspense } from "react";
import { Link, useLoaderData, defer, Await } from "react-router-dom";
import { getHostVans } from "../../../api";
import { requireAuth } from "../../../utils";

export async function loader({ request }) {
  // ERR: error occurs when adding await before requireAuth(), otherwise the error is logged in the console
  await requireAuth(request); // await ensures that the functions runs completely before getHostVans function
  return defer({ hostVans: getHostVans() });
}

export default function HostVans() {
  const dataPromise = useLoaderData();
  console.log(dataPromise.hostVans);

  //map out hostVans data into jsx elements
  function renderHostVansElements(hostVans) {
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

    return <div className="host-vans-list">{hostVansElements}</div>;
  }

  return (
    <div>
      <h1>Your listed vans</h1>
      <Suspense fallback={<h2>Loading host vans...</h2>}>
        <Await resolve={dataPromise.hostVans}>{renderHostVansElements}</Await>
      </Suspense>
    </div>
  );
}
