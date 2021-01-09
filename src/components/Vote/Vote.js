import React, { useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import logo from "../../images/voting/iifa-voting-logo.jpg";
import "./Vote.css";
import MovieGrid from "../MovieGrid/MovieGrid";
import Footer from "../Footer/Footer";
import { withRouter } from "react-router-dom";
import CountUp from "react-countup";
import { useStateValue } from "../../StateProvider";

const Vote = ({ match }) => {
  const [{ totalVotes }, dispatch] = useStateValue();

  useEffect(() => window.scrollTo(0, 0), []);
  const award = match.params.award;

  return (
    <div className="vote">
      <h2>
        Total Votes casted: <CountUp end={totalVotes} duration={2.75} />
      </h2>
      <img src={logo} alt="iifa-logo" />
      <Navbar />
      <MovieGrid award={award} />
      <Footer />
    </div>
  );
};

export default withRouter(Vote);
