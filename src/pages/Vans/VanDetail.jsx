import React, { Suspense } from "react";
import {
  Link,
  useLocation,
  useLoaderData,
  defer,
  Await,
} from "react-router-dom";
import { getVans } from "../../api";

// loader function with params to get id of van
export function loader({ params }) {
  return defer({ van: getVans(params.id) });
}

export default function VanDetail() {
  const dataPromise = useLoaderData();

  // TODO: comment use for location
  const location = useLocation();

  const search = location.state?.search || "";
  const linkSpanText = location.state?.type || "all";

  function vansElements(van) {
    return (
      <div>
        <div className="van-detail">
          <img src={van.imageUrl} alt="" />
          <i className={`van-type ${van.type} selected`}>{van.type}</i>
          <h2>{van.name}</h2>
          <p className="van-price">
            <span>${van.price}</span>/day
          </p>
          <p>{van.description}</p>
          <button className="link-button">Rent this van</button>
        </div>
      </div>
    );
  }

  return (
    <section className="van-detail-container">
      <Link
        to={`..?${search}`}
        relative="path"
        className="back-button button-icon"
      >
        &#8592; <span>Back to {`${linkSpanText}`} vans</span>
      </Link>
      <Suspense fallback={<h2>Loading van...</h2>}>
        <Await resolve={dataPromise.van}>{vansElements}</Await>
      </Suspense>
    </section>
  );
}
