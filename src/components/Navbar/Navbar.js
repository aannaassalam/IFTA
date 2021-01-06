import React, { useState, useEffect } from "react";
import "./Navbar.css";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Link, useLocation, useRouteMatch } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const location = useLocation();
  const match = useRouteMatch();

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

    if (match.path === "/vote/:award") {
      const { award } = match.params;
      setTimeout(() => handleVoteNav(award), 400);
    }
  }, []);

  console.log(match);

  const handleNav = (id) => {
    const dropdown = document.getElementById(id);
    const allDropdown = document.getElementsByClassName("navbar__dropdown");
    const allNavItems = document.getElementsByClassName("nav__items");

    if (match.path === "/vote/:award") {
      handleVoteNav(null, dropdown);
    }

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

  const handleVoteNav = (id, dropdownId) => {
    if (id === null) {
      console.log(true);
      const prev = dropdownId.previousSibling;
      const allNavItems = document.getElementsByClassName("nav__items");
      Array.from(allNavItems).forEach(function (el) {
        el.classList.remove("nav-active-vote");
      });
      prev.classList.add("nav-active-vote");
    } else {
      const prev = document.getElementById(id).parentElement.previousSibling;
      const allNavItems = document.getElementsByClassName("nav__items");
      Array.from(allNavItems).forEach(function (el) {
        el.classList.remove("nav-active-vote");
      });
      prev.classList.add("nav-active-vote");
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
                <Link id={award._id} key={award._id} to={`/vote/${award._id}`}>
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
