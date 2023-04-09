import React, { useContext } from 'react'
import logo from '../assets/logo.png'
import { Link, NavLink } from 'react-router-dom'
import { Avatar, Box, Menu, MenuItem, Tooltip } from '@mui/material'
import { AuthContext } from '../context/AuthContext'

const MainNavigation = () => {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const { logout, isLoggedIn, checkType } = useContext(AuthContext)

  const handleOpenUserMenu = () => {
    setAnchorEl(true)
  }

  const handleCloseUserMenu = () => {
    setAnchorEl(null)
  }

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
            <NavLink to="jobs">
              {checkType ? 'Other Jobs' : 'Find Jobs'}
            </NavLink>
          </li>
          {!checkType && (
            <li>
              <NavLink to="companies">Companies</NavLink>
            </li>
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
          {isLoggedIn && (
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
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleCloseUserMenu}
                  sx={{ margin: '70px 0 90px 0' }}
                >
                  <Link
                    className="link"
                    to={checkType ? '/em_profile' : '/se_profile'}
                  >
                    <MenuItem onClick={handleCloseUserMenu}>Profile</MenuItem>
                  </Link>
                  {checkType && (
                    <Link className="link" to="/jobs/new">
                      <MenuItem onClick={handleCloseUserMenu}>Add Job</MenuItem>
                    </Link>
                  )}
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Link className="link" onClick={logout}>
                      Logout
                    </Link>
                  </MenuItem>
                </Menu>
              </Box>
            </li>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default MainNavigation
