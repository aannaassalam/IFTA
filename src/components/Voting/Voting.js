import React from "react";
import "./Voting.css";
import logo from "../../images/voting/iifa-voting-logo.jpg";
import Navbar from "./Navbar/Navbar";
import YTVideo from "../Home/YTVideo/YTVideo";
import Category from "../Home/Category/Category";

const Voting = () => {
  return (
    <div className="voting">
      <img src={logo} alt="iifa-logo" />
      <Navbar />
      <div className="voting__video">
        <YTVideo />
      </div>
      <div className="voting__category">
        <Category />
      </div>
    </div>
  );
};

export default Voting;
