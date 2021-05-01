import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import logo1 from "../../images/sc2.jpg";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MovieGrid from "../MovieGrid/MovieGrid";
import Footer from "../Footer/Footer";
import { withRouter, useHistory } from "react-router-dom";
import CountUp from "react-countup";
import { useStateValue } from "../../StateProvider";
import LoginModal from "../LoginModal/LoginModal";

const Vote = ({ match }) => {
  const [{ totalVotes ,userIdentification , userName}, dispatch] = useStateValue();

  useEffect(() => window.scrollTo(0, 0), []);
  const award = match.params.award;
  const history = useHistory();
  const goToHome = () => {
    history.push("/")
  }
  const goToBack = () => {
    history.push("/voting")
  }

  return (
    <div className="vote">
      <div className="voting__login">
        <div>
          <h2 style={{color:'gold'}}>
            Total votes: <CountUp end={totalVotes} duration={2.75} />
          </h2>
          <div style={{ padding: '10px', width: 'max-content', position: 'relative', padding: '10px', paddingRight: '50px' }}>
            <span style={{ fontFamily: 'Oswald, sans-serif', position: 'relative', right: '10px', padding: '10px' }}>{userIdentification ? <AccountCircleIcon style={{ fontSize: '2rem' }} /> : null}</span>
            <span style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1rem', verticalAlign:'top' }}>{userIdentification ? userName : null}</span>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', width: 'min-content' }}>
          {/* <div className="box">
            <button className="modal__btn" onClick={()=>goToBack()}>Back</button>
          </div> */}
          <LoginModal />
        </div>
      </div>
      <img className="top-img" src={logo1} alt="iifa-logo" />
      <Navbar />
      {/* <img className="bottom-img" src={logo2} alt="iifa-logo" /> */}
      <MovieGrid award={award} />
      <Footer />
    </div>
  );
};

export default withRouter(Vote);
