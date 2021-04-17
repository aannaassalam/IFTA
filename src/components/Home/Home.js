import React, { useEffect, useRef, useState } from "react";
import "./Home.css";
import YTVideo from "./YTVideo/YTVideo";
import GridImages from "./GridImages/GridImages";
import Category from "./Category/Category";
import { Link } from 'react-router-dom'
import facebook from "../../images/fb.png";
import insta from "../../images/insta.png";
import gif1_small from "../../images/screen-1_1_small.gif";
import gif1_large from "../../images/screen-1_1.gif";
import gif2_small from "../../images/screen-1_2_small.gif";
import gif2_large from "../../images/screen-1_2.gif";
import ikickLogo from '../../images/ikick-logo.png'

const Home = () => {
  const catRef = useRef(null);
  const [gif1, setGif1] = useState(gif1_small);
  const [gif2, setGif2] = useState(gif2_small);

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
        <div>
          <img src={ikickLogo} style={{width:'50%' , marginBottom:'15px'}} className='ikickLogo'/>
          <h4 className='margin-b-50'>Presents</h4>
          <h1>IFTA</h1>
          <p>Vote</p>
          <p>Nominate</p>
          <p>Decide the Winner</p>
          <Link to={{ pathname: "/voting" }} className='margin-t-50'><button style={{fontWeight:'bold',fontSize:'1.25rem'}}>VOTE</button></Link>
        </div>
        <img src={gif2} alt="iifa-award" />
      </section>
      <section className="home__second">
        <YTVideo />
      </section>
      <section ref={catRef} className="home__fourth">
        <Category show />
      </section>
      <section className="home__third">
        <div style={{margin:'auto' , 'textAlign':'center'}}>
          <h1 style={{'textDecoration':'underline'}}><b>Nominations for IFTA 2020-21</b> </h1>
        </div>
        <br/>
        <div>
          <GridImages />
        </div>
        {/* <div>
          <GridImages secId />
        </div> */}
      </section>
      <footer className="home__footer">
        <div className="home__footerLeft">
          <h1>IFTA</h1>
          <div>
            <div>
              <p>Copyright © 2021 All rights reserved | This website is made by iKick Enterprise LLP</p>
            </div>
          </div>
        </div>
        <div className="home__footerRight">
          <h1>Connect with us:</h1>
          <div>
            <a href="https://www.facebook.com/iftaupdates/" target='_blank'><img src={facebook} alt="facebook" /></a>
            <a href="https://www.instagram.com/invites/contact/?i=wx5knaabmc8r&utm_content=k3ecgpa" target='_blank'><img src={insta} alt="instagram" /></a>
          </div>
        </div>
      </footer>
      {/* To remove the eventListner error */}
      <p id="navbar"></p>

    </div>
  );
};

export default Home;
