import React, { useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import logo from "../../images/voting/iifa-voting-logo.jpg";
import "./Vote.css";
import MovieGrid from "../MovieGrid/MovieGrid";
import Footer from "../Footer/Footer";
import { withRouter } from "react-router-dom";

const Vote = ({ match }) => {
  useEffect(() => window.scrollTo(0, 0), []);
  const award = match.params.award;

  return (
    <div className="vote">
      <img src={logo} alt="iifa-logo" />
      <Navbar />
      <MovieGrid award={award} />
      <Footer />
    </div>
  );
};

export default withRouter(Vote);
