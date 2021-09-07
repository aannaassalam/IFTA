import React, { useCallback, useEffect } from "react";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import logo1 from "../../images/sc2.jpg";
import Navbar from "../Navbar/Navbar";
import YTVideo from "../Home/YTVideo/YTVideo";
import Category from "../Home/Category/Category";
import Footer from "../Footer/Footer";
import { useStateValue } from "../../StateProvider";
import { actionTypes } from "../../Reducer";
import LoginModal from "../LoginModal/LoginModal";
import CountUp from "react-countup";
import { useHistory } from "react-router-dom";
import LoginTestModal2 from "../LoginModal/LoginModal2";

const Voting = () => {
  const [{ userIdentification, totalVotes, userName }, dispatch] =
    useStateValue();
  useEffect(() => {
    if (userIdentification !== null) {
      const authToken = localStorage.getItem("authToken").split(" ")[1];
      dispatch({
        type: actionTypes.SET_TOKEN,
        token: authToken,
      });
    }
  }, [userIdentification]);
  const history = useHistory();

  return (
    <div className="voting">
      <div className="voting__login">
        <div>
          <h2 style={{ color: "gold" }}>
            Total votes: <CountUp end={totalVotes} duration={2.75} />
          </h2>
          <div
            style={{
              padding: "10px",
              width: "max-content",
              position: "relative",
              paddingTop: "10px",
            }}
          >
            <span
              style={{
                fontFamily: "Oswald, sans-serif",
                position: "relative",
                paddingTop: "10px",
              }}
            >
              {userIdentification ? (
                <AccountCircleIcon style={{ fontSize: "2rem" }} />
              ) : null}{" "}
            </span>
            <span
              style={{
                fontFamily: "Oswald, sans-serif",
                fontSize: "0.8rem",
                verticalAlign: "top",
              }}
            >
              {userIdentification ? userName : null}
            </span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "min-content",
          }}
        >
          {/* <LoginModal /> */}
          <LoginTestModal2 />
        </div>
      </div>
      <img className="top-img" src={logo1} alt="iifa-logo" />
      <Navbar />
      {/* <img className="bottom-img" src={logo2} alt="iifa-logo" /> */}
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
