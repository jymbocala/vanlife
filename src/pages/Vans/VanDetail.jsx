import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function VanDetail() {
  const params = useParams();
  const [van, setVan] = useState(null);

  // fetch van details using params and set van state
  useEffect(() => {
    fetch(`/api/vans/${params.id}`)
      .then((res) => res.json())
      .then((data) => setVan(data.vans));
  }, [params.id]);

  return (
    <section className="van-detail-container">
      <Link 
        to=".." 
        relative="path" 
        className="back-button button-icon">
        &#8592; <span>Back to all vans</span>
      </Link>
      <div>
        {/* conditionally render elements if van has data to handle loading */}
        {van ? (
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
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
    </section>
  );
}
