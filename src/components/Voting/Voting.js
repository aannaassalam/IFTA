import React, { useEffect } from "react";
import "./Voting.css";
import logo from "../../images/voting/iifa-voting-logo.jpg";
import Navbar from "../Navbar/Navbar";
import YTVideo from "../Home/YTVideo/YTVideo";
import Category from "../Home/Category/Category";
import Footer from "../Footer/Footer";

const Voting = ({
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
    <div className="voting">
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
      <div className="voting__video">
        <YTVideo />
      </div>
      <div className="voting__category">
        <Category
          openBolly={openBolly}
          openTele={openTele}
          openMusic={openMusic}
          openDigital={openDigital}
          setOpenBolly={setOpenBolly}
          setOpenTele={setOpenTele}
          setOpenMusic={setOpenMusic}
          setOpenDigital={setOpenDigital}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Voting;
