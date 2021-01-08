import React, { useEffect } from "react";
import "./Voting.css";
import logo from "../../images/voting/iifa-voting-logo.jpg";
import Navbar from "../Navbar/Navbar";
import YTVideo from "../Home/YTVideo/YTVideo";
import Category from "../Home/Category/Category";
import Footer from "../Footer/Footer";
import { useStateValue } from "../../StateProvider";
import { actionTypes } from "../../Reducer";
import LoginModal from "../LoginModal/LoginModal";

const Voting = () => {
  const [{ userIdentification }, dispatch] = useStateValue();
  useEffect(() => {
    window.scrollTo(0, 0);

    if (userIdentification !== null) {
      const authToken = localStorage.getItem("authToken").split(" ")[1];
      dispatch({
        type: actionTypes.SET_TOKEN,
        token: authToken,
      });
    }
  }, [userIdentification]);

  return (
    <div className="voting">
      <div className="voting__login">
        <LoginModal />
      </div>
      <img src={logo} alt="iifa-logo" />
      <Navbar />
      <div className="voting__video">
        <YTVideo />
      </div>
      <div className="voting__category">
        <Category />
      </div>
      <Footer />
    </div>
  );
};

export default Voting;
