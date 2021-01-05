import React from "react";
import "./Home.css";
import iifa from "../../images/iifa.jpg";
import trophy from "../../images/right-trophy.jpg";
import YTVideo from "./YTVideo/YTVideo";
import GridImages from "./GridImages/GridImages";
import Category from "./Category/Category";
import twitter from "../../images/tw.png";
import facebook from "../../images/fb.png";
import insta from "../../images/insta.png";

const Home = ({ awards }) => {
  return (
    <div className="home">
      <section className="home__first">
        <img src={iifa} alt="iifa-award" />
        <div>
          <h1>IFTA</h1>
          <p>You Vote</p>
          <p>You Nominate</p>
          <p>You Decide the Winner</p>
          <button>Vote</button>
        </div>
        <img src={trophy} alt="iifa-award" />
      </section>
      <section className="home__second">
        <YTVideo />
      </section>
      <section className="home__third">
        <div>
          <GridImages />
        </div>
        <div>
          <GridImages />
        </div>
      </section>
      <section className="home__fourth">
        <Category show awards={awards} />
      </section>
      <footer className="home__footer">
        <div className="home__footerLeft">
          <h1>IFTA</h1>
          <div>
            <div>
              <p>Quizando Live!</p>
              <p>Quizando classic</p>
              <p>Free Games</p>
              <p>Private Events</p>
              <p>Closed Quizes</p>
            </div>
            <div>
              <p>Quizando Live!</p>
              <p>Quizando classic</p>
              <p>Free Games</p>
              <p>Private Events</p>
              <p>Closed Quizes</p>
            </div>
            <div>
              <p>Quizando Live!</p>
              <p>Quizando classic</p>
              <p>Free Games</p>
              <p>Closed Quizes</p>
            </div>
            <div>
              <p>Free Games</p>
              <p>Private Events</p>
              <p>Closed Quizes</p>
            </div>
          </div>
        </div>
        <div className="home__footerRight">
          <h1>Connect with us:</h1>
          <div>
            <img src={twitter} alt="twitter" />
            <img src={facebook} alt="facebook" />
            <img src={insta} alt="instagram" />
          </div>
          <button>Customer Support</button>
        </div>
      </footer>
      {/* To remove the eventListner error */}
      <p id="navbar"></p>
    </div>
  );
};

export default Home;
