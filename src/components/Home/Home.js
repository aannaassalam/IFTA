import React, { useEffect, useRef, useState } from "react";
import "./Home.css";
import YTVideo from "./YTVideo/YTVideo";
import GridImages from "./GridImages/GridImages";
import Category from "./Category/Category";
import { Link } from 'react-router-dom'
import facebook from "../../images/fb.png";
import insta from "../../images/insta.png";
import gif1_small from "../../images/Ifta_Trophy.png";
import gif1_large from "../../images/Ifta_Trophy.png";
import gif2_small from "../../images/ifta 2021_medal.png";
import gif2_large from "../../images/ifta 2021_medal.png";
import ikickLogo from '../../images/ikick-logo.png'
import Map from '../Map/Map'
import { useStateValue } from "../../StateProvider";

const Home = () => {
  const catRef = useRef(null);
  const [gif1, setGif1] = useState(gif1_small);
  const [gif2, setGif2] = useState(gif2_small);
  const [{ stateVoteData }, dispatch] = useStateValue();
  let loaded1 = false;
  let loaded2 = false;
  useEffect(() => {
    if (!loaded1) {
      let img1 = new Image();
      img1.onload = () => {
        loaded1 = true;
        setGif1(gif1_large);
      }
      img1.src = gif1_large;
    }

    if (!loaded2) {
      let img2 = new Image();
      img2.onload = () => {
        loaded2 = true;
        setGif2(gif2_large);
      }
      img2.src = gif2_large;
    }
  })

  return (
    <div className="home">

      <section className="home__first">
        <img src={gif1} alt="iifa-award" />
        <div id="middle-div">
          <img src={ikickLogo} style={{ width: '40%', marginBottom: '15px' }} />
          <p style={{ marginBottom: '5px', fontStyle: "italic", fontFamily: "Crimson Text, serif", fontSize: '1.1rem' }}>presents</p>
          <div style={{ padding: '20px' }}><h3 style={{ color: 'gold', textAlign: 'center' }}>India’s 1st People’s Choice Award</h3></div>
          <h1>IFTA</h1>
          <Link to={{ pathname: "/voting" }}><button style={{ backgroundColor: "#1C1C41", fontSize: '1.03rem' }}><b>VOTE</b></button></Link>
          <div className="slide-top" style={{ height: '150px' }}>
            <h4 className="tagline">VOTE</h4>
            <h4 className="tagline">and</h4>
            <h4>DECIDE THE WINNER</h4>
          </div>
        </div>
        <div>
        <img src={gif2} alt="iifa-award" id="ifta_medal"/>
        </div>
      </section>
      <section className="home__second">
        <YTVideo />
      </section>
      <section ref={catRef} className="home__fourth">
        <Category show />
      </section>
      <section className="home__third">
        <div style={{ margin: 'auto', 'textAlign': 'center' }}>
          <h1 style={{ 'textDecoration': 'underline' }}><b>Nominees for IFTA 2020-21</b> </h1>
        </div>
        <br />
        <div>
          <GridImages />
        </div>
        {/* <div>
          <GridImages secId />
        </div> */}
      </section>
      <section >
        <div style={{ margin: 'auto', 'textAlign': 'center' }}>
          <h2 style={{ 'textDecoration': 'underline' }} id="state-heading"><b>State-wise Vote Distribution</b> </h2>
          <Map mapData={stateVoteData} />
        </div>
      </section>
      <footer className="home__footer">
        <div className="home__footerLeft">
          <h1>IFTA</h1>
          <div>
            <div>
              <p>Copyright © 2021 All rights reserved | This website is made by iKick Enterprise LLP</p>
              <p style={{ paddingTop: '20px' }}>
                <div style={{ color: 'white', display: 'inline-block', verticalAlign: 'top' }}>Address:</div><br />
                <div style={{ display: 'inline-block' }}>Plot Number 463, Sector 38,<br /> Gurugram, Haryana 122022</div>
              </p>
            </div>
          </div>
        </div>
        <div className="home__footerRight">
          <h1>Connect with us:</h1>
          <div>
            <a href="https://www.facebook.com/ifta.official" target='_blank'><img src={facebook} alt="facebook" /></a>
            <a href="https://www.instagram.com/ifta.official/" target='_blank'><img src={insta} alt="instagram" /></a>
          </div>
          <div>
            <p>
              Write to us:<br />
              <span style={{ color: '#bbb' }}>mailtoifta@gmail.com</span><br />
              <span style={{ color: '#bbb' }}>info@ifta.co.in</span>
            </p>
          </div>
        </div>
      </footer>
      {/* To remove the eventListner error */}
      <p id="navbar"></p>

    </div>
  );
};

export default Home;
