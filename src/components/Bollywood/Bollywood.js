import React, { useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import logo from "../../images/voting/iifa-voting-logo.jpg";
import "./Bollywood.css";
import MovieGrid from "../MovieGrid/MovieGrid";
import Footer from "../Footer/Footer";

const Bollywood = ({
  openBolly,
  openTele,
  openMusic,
  openDigital,
  setOpenBolly,
  setOpenTele,
  setOpenMusic,
  setOpenDigital,
}) => {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="bollywood">
      <img src={logo} alt="iifa-logo" />
      <Navbar
        openBolly={openBolly}
        openTele={openTele}
        openMusic={openMusic}
        openDigital={openDigital}
        setOpenBolly={setOpenBolly}
        setOpenTele={setOpenTele}
        setOpenMusic={setOpenMusic}
        setOpenDigital={setOpenDigital}
      />
      <MovieGrid />
      <Footer />
    </div>
  );
};

export default Bollywood;
