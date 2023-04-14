import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const NavLinks = () => {
  const { logout, isLoggedIn, checkType } = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutHandler = () => {
    navigate("/");
    logout();
  };

  return (
    <ul className="menu">
      <li>
        <NavLink to="">Home</NavLink>
      </li>
      <li>
        <NavLink to="jobs">{checkType ? "Other Jobs" : "Find Jobs"}</NavLink>
      </li>
      <li>
        <NavLink to={checkType ? "/em_profile" : "/se_profile"}>
          Profile
        </NavLink>
      </li>

      {!checkType && (
        <li>
          <NavLink to="companies">Companies</NavLink>
        </li>
      )}
      {checkType && (
        <li>
          <NavLink className="link" to="/jobs/new">
            Add Job
          </NavLink>
        </li>
      )}
      {isLoggedIn && (
        <Link className="link" onClick={logoutHandler}>
          Logout
        </Link>
      )}

      {!isLoggedIn && (
        <li className="nav_login_btn">
          <Link to="/auth/login">Login</Link>
        </li>
      )}
      {!isLoggedIn && (
        <li className="nav_signup_btn">
          <Link to="/auth/signup">Sign Up</Link>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
