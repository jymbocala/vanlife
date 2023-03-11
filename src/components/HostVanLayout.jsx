import React, { useState, useEffect } from "react";
import { useParams, Link, NavLink, Outlet } from "react-router-dom";

export default function HostVanDetail() {
  const params = useParams();
  const [hostVan, setHostVan] = useState(null);

  // fetch van details using params and set van state
  useEffect(() => {
    fetch(`/api/host/vans/${params.id}`)
      .then((res) => res.json())
      .then((data) => setHostVan(data.vans[0]));
  }, [params.id]);

  return (
    <>
      <div className="back-button">
        <i className="ri-arrow-left-line button-icon"></i>

        <Link to="/host/vans">Back to all vans</Link>
      </div>

      <div className="van-detail-container">
        {/* conditionally render elements if van has data to handle loading */}
        {hostVan ? (
          <div className="host-van-detail">
            <div className="host-van-detail__top">
              <img src={hostVan.imageUrl} alt="" />
              <div>
                <i className={`van-type ${hostVan.type} selected`}>
                  {hostVan.type}
                </i>
                <h2>{hostVan.name}</h2>
                <p className="van-price">
                  <span>${hostVan.price}</span>/day
                </p>
              </div>
            </div>

            <nav className="host-van-nav">
              <NavLink
                to="/host/vans/:id"
                end
                style={({ isActive }) => (isActive ? "selected-link" : null)}
              >
                Details
              </NavLink>
              <NavLink
                to="/host/vans/:id/pricing"
                style={({ isActive }) => (isActive ? "selected-link" : null)}
              >
                Pricing
              </NavLink>

              <NavLink
                to="/host/vans/:id/photos"
                style={({ isActive }) => (isActive ? "selected-link" : null)}
              >
                Photos
              </NavLink>
            </nav>
            
            <Outlet />
          </div>
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
    </>
  );
}
