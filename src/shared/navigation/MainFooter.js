import React from "react";
import logo from "../assets/logo.png";
import {
  AiFillTwitterCircle,
  AiFillFacebook,
  AiFillMessage,
} from "react-icons/ai";
import { Typography } from "@mui/material";

const MainFooter = () => {
  return (
    <div className="footer">
      <div className="footer_list">
        <div className="footer_item">
          <img src={logo} alt="logo" />
          <Typography variant="h6" color="textSecondary">
            jobboost@gmail.com
          </Typography>
          <AiFillTwitterCircle fill="#1482e8" size={30} cursor="pointer" />
          <AiFillMessage fill="#1482e8" size={30} cursor="pointer" />
          <AiFillFacebook fill="#1482e8" size={30} cursor="pointer" />
        </div>

        <div className="footer_item">
          <ul>
            <li>Find Jobs</li>
            <li>Browse Companies</li>
            <li>Career Tips</li>
            <li>Sign In</li>
          </ul>
        </div>
        <div className="footer_item">
          <ul>
            <li>About</li>
            <li>Solutions</li>
            <li>Premium</li>
            <li>Contact</li>
          </ul>
        </div>
        <div className="footer_item">
          <ul>
            <li>Terms of use</li>
            <li>Privacy Policy</li>
            <li>Sertifications</li>
            <li>Awards</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MainFooter;
