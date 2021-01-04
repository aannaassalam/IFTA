import React, { useState, useEffect } from "react";
import "./Navbar.css";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Link, useHistory } from "react-router-dom";

const Navbar = ({
  openBolly,
  openTele,
  openMusic,
  openDigital,
  setOpenBolly,
  setOpenTele,
  setOpenMusic,
  setOpenDigital,
}) => {
  window.addEventListener("scroll", function () {
    let header = document.querySelector("#navbar");
    header.classList.toggle("sticky", window.scrollY > 100);
  });

  const history = useHistory();

  return (
    <nav className="navbar" id="navbar">
      <ul className="navbar__nav">
        <li
          className="nav__items nav__itemBolly"
          onClick={() => {
            setOpenTele(false);
            setOpenMusic(false);
            setOpenDigital(false);
            setOpenBolly(!openBolly);
          }}
          style={{
            background: `${
              openBolly ? "linear-gradient(to right, #1da2e7, #0e7cb3)" : "#222"
            }`,
          }}
        >
          BOLLYWOOD AWARDS <ExpandMoreIcon />
          {openBolly && (
            <div className="navbar__dropdown navbar__dropdownBolly">
              <Link
                to={{
                  pathname: "/bollywood",
                  query: "best-film-2020",
                }}
              >
                Best Film 2020
              </Link>
              <a>Best Actor in Lead Role</a>
              <a>Best Actress in Lead Role</a>
              <a>Best aerformance in negative Role</a>
              <a>Best aerformance in comic Role</a>
              <a>Star debut of year - Male</a>
              <a>Star debut of year - Female</a>
              <a>Best Director (Film)</a>
              <a>Best Story</a>
              <a>Best Choreograaher</a>
              <a>Best Action / Stunt</a>
            </div>
          )}
        </li>
        <li
          className="nav__items nav__itemTele"
          onClick={() => {
            setOpenBolly(false);
            setOpenMusic(false);
            setOpenDigital(false);
            setOpenTele(!openTele);
          }}
          style={{
            background: `${
              openTele ? "linear-gradient(to right, #09d7a7, #0aa07d)" : "#222"
            }`,
          }}
        >
          TELEVISION AWARDS <ExpandMoreIcon />
          {openTele && (
            <div className="navbar__dropdown navbar__dropdownTele">
              <a>Best Television (Daily Soap) Show</a>
              <a>Best Reality Show</a>
              <a>Best Comedy Show</a>
              <a>Best News Show</a>
              <a>Best Male TV Star in Lead Role</a>
              <a>Best Female TV Star in Lead Role</a>
              <a>Best Male TV Star in Supporting Role</a>
              <a>Best Female TV Star in Supporting Role</a>
              <a>Best Comedy TV Star</a>
              <a>Best Reality TV Star</a>
              <a>Best News Anchor</a>
            </div>
          )}
        </li>
        <li
          className="nav__items nav__itemMusic"
          onClick={() => {
            setOpenBolly(false);
            setOpenDigital(false);
            setOpenTele(false);
            setOpenMusic(!openMusic);
          }}
          style={{
            background: `${
              openMusic ? "linear-gradient(to right, #ca49c7, #963898)" : "#222"
            }`,
          }}
        >
          MUSIC AWARDS <ExpandMoreIcon />
          {openMusic && (
            <div className="navbar__dropdown navbar__dropdownMusic">
              <a>Song of the Year</a>
              <a>Album of the Year</a>
              <a>Best Item Number Song</a>
              <a>Best Playback Singer (Male)</a>
              <a>Best Playback Singer (Female)</a>
              <a>Music Composer of the year</a>
            </div>
          )}
        </li>
        <li
          className="nav__items nav__itemDigital"
          onClick={() => {
            setOpenBolly(false);
            setOpenTele(false);
            setOpenMusic(false);
            setOpenDigital(!openDigital);
          }}
          style={{
            background: `${
              openDigital
                ? "linear-gradient(to right, #ff7062, #c53e3a)"
                : "#222"
            }`,
          }}
        >
          DIGITAL ENTERTAINMENT AWARDS <ExpandMoreIcon />
          {openDigital && (
            <div className="navbar__dropdown navbar__dropdownDigital">
              <a>Best Webseries</a>
              <a>Best Short Film</a>
              <a>Best Actor in Lead Role</a>
              <a>Best Actress in Lead Role</a>
              <a>Best Actor in Supporting Role</a>
              <a>Best Actress in Supporting Role</a>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

const navData = [
  {
    heading: "BOLLYWOOD AWARDS",
    dList: [
      "Best Film 2020",
      "Best Actor in Lead Role",
      "Best Actress in Lead Role",
      "Bestin negative Role",
      "Bestin comic Role",
      "Star debut of year - Male",
      "Star debut of year - Female",
      "Best Director (Film)",
      "Best Story",
      "Best Choreogrp",
      "Best Action / Stunt",
    ],
  },
  {
    heading: "TELEVISION AWARDS",
    dList: [
      "Best Television (Daily Soap) Show",
      "Best Reality Show",
      "Best Comedy Show",
      "Best News Show",
      "Best Male TV Star in Lead Role",
      "Best Female TV Star in Lead Role",
      "Best Male TV Star in Supporting Role",
      "Best Female TV Star in Supporting Role",
      "Best Comedy TV Star",
      "Best Reality TV Star",
      "Best News Anchor",
    ],
  },
  {
    heading: "MUSIC AWARDS",
    dList: [
      "Song of the Year",
      "Album of the Year",
      "Best Item Number Song",
      "Best Playback Singer (Male)",
      "Best Playback Singer (Female)",
      "Music Composer of the year",
    ],
  },
  {
    heading: "DIGITAL ENTERTAINMENT AWARDS",
    dList: [
      "Best Webseries",
      "Best Short Film",
      "Best Actor in Lead Role",
      "Best Actress in Lead Role",
      "Best Actor in Supporting Role",
      "Best Actress in Supporting Role",
    ],
  },
];

export default Navbar;
