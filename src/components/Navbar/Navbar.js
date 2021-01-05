import React, { useState, useEffect } from "react";
import "./Navbar.css";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const location = useLocation();

  const [navTitle, setNavTitle] = useState([]);

  window.addEventListener("scroll", function () {
    let header = document.querySelector("#navbar");
    header.classList.toggle("sticky", window.scrollY > 100);
  });

  useEffect(() => {
    axios
      .get(
        "http://13.235.90.125:8000/show/fetchCategories?showId=5ff351bcd2d84274b06e2783"
      )
      .then((res) => setNavTitle(res.data.payload));

    if (location.pathname === "/voting" && location.state !== undefined) {
      // Getting the navId passed from category
      const { navId } = location.state;
      setTimeout(() => {
        handleNav(navId);
      }, 400);
      console.log("exec");
    }
  }, []);

  const handleNav = (id) => {
    const dropdown = document.getElementById(id);
    const allDropdown = document.getElementsByClassName("navbar__dropdown");
    const allNavItems = document.getElementsByClassName("nav__items");

    if (dropdown.classList.contains("navbar__dropdownShow")) {
      dropdown.classList.remove("navbar__dropdownShow");
      // Removing Active Class
      dropdown?.previousSibling.classList.remove("nav-active");
    } else {
      Array.from(allDropdown).forEach(function (el) {
        el.classList.remove("navbar__dropdownShow");
      });
      dropdown.classList.add("navbar__dropdownShow");
      // Adding Active Class
      Array.from(allNavItems).forEach(function (el) {
        el.classList.remove("nav-active");
      });
      dropdown?.previousSibling.classList.add("nav-active");
    }
  };

  return (
    <nav className="navbar" id="navbar">
      <ul className="navbar__nav">
        {navTitle.map((nav) => (
          <>
            <li
              className="nav__items"
              key={nav._id}
              onClick={() => handleNav(nav._id)}
            >
              {nav.title} <ExpandMoreIcon />
            </li>

            <div className="navbar__dropdown" id={nav._id}>
              {nav.awards?.map((award) => (
                <Link key={award._id} to={`/bollywood/${award._id}`}>
                  {award.heading}
                </Link>
              ))}
            </div>
          </>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
