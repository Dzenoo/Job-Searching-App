import React from "react";
import logo from "../assets/logo.png";
import { Link, NavLink } from "react-router-dom";

const MainNavigation = () => {
  return (
    <header className="navigation_header">
      <img src={logo} alt="logo" />
      <nav>
        <ul className="navigation_list">
          <li>
            <NavLink to="">Home</NavLink>
          </li>
          <li>
            <NavLink to="jobs">Find Jobs</NavLink>
          </li>
          <li>
            <NavLink to="companies">Companies</NavLink>
          </li>
          <li className="nav_login_btn">
            <Link to="auth">Sign Up</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
