import React, { useCallback, useEffect } from "react";
import "./Voting.css";
import logo from "../../images/voting/iifa-voting-logo.jpg";
import Navbar from "../Navbar/Navbar";
import YTVideo from "../Home/YTVideo/YTVideo";
import Category from "../Home/Category/Category";
import Footer from "../Footer/Footer";
import { useStateValue } from "../../StateProvider";
import { actionTypes } from "../../Reducer";
import LoginModal from "../LoginModal/LoginModal";
import CountUp from "react-countup";
import { useHistory } from "react-router-dom";

const Voting = () => {
  const [{ userIdentification, totalVotes }, dispatch] = useStateValue();
  useEffect(() => {
    window.scrollTo(0, 0);

    if (userIdentification !== null) {
      const authToken = sessionStorage.getItem("authToken").split(" ")[1];
      dispatch({
        type: actionTypes.SET_TOKEN,
        token: authToken,
      });
    }
  }, [userIdentification]);
  const history = useHistory();
  const goToHome = ()=>{
    history.push("/")
  }
  return (
    <div className="voting">
      <div className="voting__login">
        <h2>
          Total Votes casted: <CountUp end={totalVotes} duration={2.75} />
        </h2>
        <div style={{display:'flex',flexDirection:'row'}}>
          <div className="box">
            <button className="modal__btn" onClick={()=>goToHome()}>Home</button>
          </div>
          <LoginModal />
        </div>
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
