import React, { useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import logo from "../../images/voting/iifa-voting-logo.jpg";
import "./Bollywood.css";
import MovieGrid from "../MovieGrid/MovieGrid";
import Footer from "../Footer/Footer";
import { withRouter } from "react-router-dom";

const Bollywood = ({ match }) => {
  useEffect(() => window.scrollTo(0, 0), []);
  const award = match.params.award;

  return (
    <div className="bollywood">
      <img src={logo} alt="iifa-logo" />
      <Navbar />
      <MovieGrid award={award} />
      <Footer />
    </div>
  );
};

export default withRouter(Bollywood);
