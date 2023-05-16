// TODO: implement defer, Await, and Suspense
// After following the same process for the other vans pages, I am getting a unique error for this page saying that 'name' is undefined in the console.

import React from "react";
import { Link, NavLink, Outlet, useLoaderData } from "react-router-dom";
import { getHostVans } from "../../../api";
import { requireAuth } from "../../../utils";

export async function loader({ params, request }) {
  // ERR: error occurs when adding await before requireAuth(), otherwise the error is logged in the console
  await requireAuth(request); // await ensures that the functions runs completely before getHostVans function
  const selectedHostVan = await getHostVans(params.id);
  return selectedHostVan[0];
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
