import React from "react";
import { Link } from "react-router-dom";
import "./Category.css";

const Category = ({ show }) => {
  return (
    <div className="category">
      <Link to="/voting">
        <div className="category-1">
          <h3>BOLLYWOOD AWARDS 2020</h3>
          {show && (
            <div>
              <p>Best Film 2020</p>
              <p>Best Actor in Lead Role</p>
              <p>Best Actress in Lead Role</p>
              <p>Best Performance in negative Role</p>
              <p>Best Performance in comic Role</p>
              <p>Star debut of year - Male</p>
              <p>Star debut of year - Female</p>
              <p>Best Director (Film)</p>
              <p>Best Story</p>
              <p>Best Choreographer</p>
              <p>Best Action / Stunt</p>
            </div>
          )}
          {show && <button>Vote</button>}
        </div>
      </Link>
      <Link to="/voting">
        <div className="category-2">
          <h3>TELEVISION AWARDS 2020</h3>
          {show && (
            <div>
              <p>Best Television (Daily Soap) Show</p>
              <p>Best Reality Show</p>
              <p>Best Comedy Show</p>
              <p>Best News Show</p>
              <p>Best Male TV Star in Lead Role</p>
              <p>Best Female TV Star in Lead Role</p>
              <p>Best Male TV Star in Supporting Role</p>
              <p>Best Female TV Star in Supporting Role</p>
              <p>Best Comedy TV Star</p>
              <p>Best Reality TV Star</p>
              <p>Best News Anchor</p>
            </div>
          )}
          {show && <button>Vote</button>}
        </div>
      </Link>
      <Link to="/voting">
        <div className="category-3">
          <h3>MUSIC AWARDS 2020</h3>
          {show && (
            <div>
              <p>Song of the Year</p>
              <p>Album of the Year</p>
              <p>Best Item Number Song</p>
              <p>Best Playback Singer (Male)</p>
              <p>Best Playback Singer (Female)</p>
              <p>Music Composer of the year</p>
            </div>
          )}
          {show && <button>Vote</button>}
        </div>
      </Link>
      <Link to="/voting">
        <div className="category-4">
          <h3>DIGITAL ENTERTAINMENT AWARDS 2020</h3>
          {show && (
            <div>
              <p>Best Webseries</p>
              <p>Best Short Film</p>
              <p>Best Actor in Lead Role</p>
              <p>Best Actress in Lead Role</p>
              <p>Best Actor in Supporting Role</p>
              <p>Best Actress in Supporting Role</p>
            </div>
          )}
          {show && <button>Vote</button>}
        </div>
      </Link>
    </div>
  );
};

export default Category;
