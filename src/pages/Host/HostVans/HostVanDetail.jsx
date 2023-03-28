import React from "react";
import { Link, NavLink, Outlet, useLoaderData } from "react-router-dom";
import { getHostVans } from "../../../utility/api";

export function loader({ params }) {
  return getHostVans(params.id);
}

export default function HostVanDetail() {
  const currentVan = useLoaderData();

  const selectedLink = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };

  return (
    <>
      <Link to=".." relative="path" className="button-icon">
        &#8592; <span>Back to all vans</span>
      </Link>

      <div className="host-van-detail-container">
        <div className="host-van-detail">
          <div className="host-van-detail__top">
            <img src={currentVan.imageUrl} alt="" />
            <div className="host-van-detail-info-text">
              <i className={`van-type ${currentVan.type} selected`}>
                {currentVan.type}
              </i>
              <h3>{currentVan.name}</h3>
              <h4 className="van-price">
                ${currentVan.price}
                <span>/day</span>
              </h4>
            </div>
          </div>

          <nav className="host-van-nav">
            <NavLink
              to="."
              end
              style={({ isActive }) => (isActive ? selectedLink : null)}
            >
              Details
            </NavLink>
            <NavLink
              to="pricing"
              style={({ isActive }) => (isActive ? selectedLink : null)}
            >
              Pricing
            </NavLink>

            <NavLink
              to="photos"
              style={({ isActive }) => (isActive ? selectedLink : null)}
            >
              Photos
            </NavLink>
          </nav>
          <hr />

          <Outlet context={{ currentVan }} />
        </div>
      </div>
    </>
  );
}
