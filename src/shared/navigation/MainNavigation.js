import React from "react";
import logo from "../assets/logo.png";
import { Link, NavLink } from "react-router-dom";
import { Avatar, Box, Menu, MenuItem, Tooltip } from "@mui/material";

const settings = ["Profile", "Add Job", "Logout"];

const MainNavigation = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpenUserMenu = () => {
    setAnchorEl(true);
  };

  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  };

  return (
    <header className="navigation_header">
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>
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
            <Link to="/auth/employer">Employer Login</Link>
          </li>
          <li className="nav_login_btn">
            <Link to="/auth/seeker">Seeker Login</Link>
          </li>
          <li className="nav_signup_btn">
            <Link to="/auth/signup">Sign Up</Link>
          </li>
          <li>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <span onClick={handleOpenUserMenu}>
                  <Avatar />
                </span>
              </Tooltip>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleCloseUserMenu}
                sx={{ margin: "70px 0 90px 0" }}
              >
                <Link className="link" to="profile">
                  <MenuItem onClick={handleCloseUserMenu}>Profile</MenuItem>
                </Link>
                <Link className="link" to="/jobs/new">
                  <MenuItem onClick={handleCloseUserMenu}>Add Job</MenuItem>
                </Link>
                <MenuItem onClick={handleCloseUserMenu}>
                  <Link className="link">Logout</Link>
                </MenuItem>
              </Menu>
            </Box>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
