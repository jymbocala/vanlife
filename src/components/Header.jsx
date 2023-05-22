import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
  function fakeLogOut() {
    localStorage.removeItem("loggedin");
    // console.log(localStorage.getItem("loggedin"));
  }

  return (
    <header>
      <Link to="/" className="site-logo">
        #VANLIFE
      </Link>
      <nav>
        <NavLink
          to="/host"
          className={({ isActive }) => (isActive ? "selected-link" : null)}
        >
          Host
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? "selected-link" : null)}
        >
          About
        </NavLink>
        <NavLink
          to="/vans"
          className={({ isActive }) => (isActive ? "selected-link" : null)}
        >
          Vans
        </NavLink>
        <Link to="login" className="login-link">
          <i className="ri-account-circle-line login-icon"></i>
        </Link>
        <button onClick={fakeLogOut}>X</button>
      </nav>
    </header>
  );
}
