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
            <Link to="/auth/login">Login</Link>
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
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Link style={{ textDecoration: "none", color: "#121212" }}>
                      {setting}
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
