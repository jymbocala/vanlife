import React, { useState, useEffect } from "react";
import { useParams, Link, NavLink, Outlet } from "react-router-dom";

export default function HostVanDetail() {
  const params = useParams();
  const [currentVan, setCurrentVan] = useState(null);

  // fetch van details using params and set van state
  useEffect(() => {
    fetch(`/api/host/vans/${params.id}`)
      .then((res) => res.json())
      .then((data) => setCurrentVan(data.vans[0]));
  }, [params.id]);

  const selectedLink = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };

  if (!currentVan) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <Link to=".." relative="path" className="button-icon">
        &#8592; <span>Back to all vans</span>
      </Link>

      <div className="van-detail-container">
        <div className="host-van-detail">
          <div className="host-van-detail__top">
            <img src={currentVan.imageUrl} alt="" />
            <div className="host-van-detail-info-text">
              <i className={`van-type ${currentVan.type} selected`}>
                {currentVan.type}
              </i>
              <h3>{currentVan.name}</h3>
              <h4 className="van-price">
              ${currentVan.price}<span>/day</span>
              </h4>
            </div>
          </div>

          <nav className="host-van-nav">
            <NavLink
              to="."
              end
              style={({ isActive }) => isActive ? selectedLink : null}
            >
              Details
            </NavLink>
            <NavLink
              to="pricing"
              style={({ isActive }) => isActive ? selectedLink : null}
            >
              Pricing
            </NavLink>

            <NavLink
              to="photos"
              style={({ isActive }) => isActive ? selectedLink : null}
            >
              Photos
            </NavLink>
          </nav>
          <hr/>

          <Outlet context={{currentVan}}/>
        </div>
      </div>
    </>
  );
}
