import React, { useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import logo1 from "../../images/s21.jpg";
import logo2 from "../../images/s22.jpg";
import "./Vote.css";
import MovieGrid from "../MovieGrid/MovieGrid";
import Footer from "../Footer/Footer";
import { withRouter ,useHistory} from "react-router-dom";
import CountUp from "react-countup";
import { useStateValue } from "../../StateProvider";
import LoginModal from "../LoginModal/LoginModal";

const Vote = ({ match }) => {
  const [{ totalVotes }, dispatch] = useStateValue();

  useEffect(() => window.scrollTo(0, 0), []);
  const award = match.params.award;
  const history = useHistory();
  const goToHome = ()=>{
    history.push("/")
  }
  const goToBack = ()=>{
    history.push("/voting")
  }
  
  return (
    <div className="vote">
      <div className="voting__login">
        <h2>
          Total Votes casted: <CountUp end={totalVotes} duration={2.75} />
        </h2>
        <div style={{display:'flex',flexDirection:'row'}}>
          <div className="box">
            <button className="modal__btn" onClick={()=>goToHome()}>Home</button>
          </div>
          <div className="box">
            <button className="modal__btn" onClick={()=>goToBack()}>Back</button>
          </div>
          <LoginModal />
        </div>
      </div>
      <img className="top-img" src={logo1} alt="iifa-logo" />
      <Navbar />
      <img className="bottom-img" src={logo2} alt="iifa-logo" />
      <MovieGrid award={award} />
      <Footer />
    </div>
  );
};

export default withRouter(Vote);
