import React from "react";
import { NavLink, Outlet } from "react-router-dom";

export default function HostLayout() {
  const selectedLink = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  }

  return (
    <>
      <nav className="host-nav">
        
        <NavLink
          to="/host"
          end
          style={({ isActive }) => (isActive ? selectedLink : null)}
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/host/income"
          style={({ isActive }) => (isActive ? selectedLink : null)}
        >
          Income
        </NavLink>

        <NavLink
          to="/host/vans"
          style={({ isActive }) => (isActive ? selectedLink : null)}
        >
          Vans
        </NavLink>

        <NavLink
          to="/host/reviews"
          style={({ isActive }) => (isActive ? selectedLink : null)}
        >
          Reviews
        </NavLink>

      </nav>
      <Outlet />
    </>
  );
}
