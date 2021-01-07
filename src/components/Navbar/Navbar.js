import React, { useState, useEffect } from "react";
import "./Navbar.css";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Link, useLocation, useRouteMatch } from "react-router-dom";
import axios from "axios";
import { useStateValue } from "../../StateProvider";

const Navbar = () => {
  const [{ userIdentification }, dispatch] = useStateValue();
  const [navTitle, setNavTitle] = useState([]);

  const [ansArr, setAnsArr] = useState([]);
  const [awardsArr, setAwardsArr] = useState([]);

  const location = useLocation();
  const match = useRouteMatch();

  setTimeout(() => {
    window.addEventListener("scroll", function () {
      let header = document.querySelector("#navbar");
      header.classList.toggle("sticky", window.scrollY > 100);
    });
  }, 500);

  useEffect(() => {
    if (userIdentification) {
      const authToken = localStorage.getItem("authToken").split(" ")[1];
      axios
        .get(
          "http://13.235.90.125:8000/show/fetchCategories/logedIn?showId=5ff351bcd2d84274b06e2783",
          {
            headers: { Authorization: `Bearer ${authToken}` },
          }
        )
        .then((res) => setNavTitle(res.data.payload))
        .catch((err) => alert(err));

      console.log(navTitle, true);
    } else {
      axios
        .get(
          "http://13.235.90.125:8000/show/fetchCategories?showId=5ff351bcd2d84274b06e2783"
        )
        .then((res) => setNavTitle(res.data.payload));
      console.log(false);
    }

    if (location.pathname === "/voting" && location.state !== undefined) {
      // Getting the navId passed from category
      const { navId } = location.state;
      setTimeout(() => {
        handleNav(navId);
      }, 700);
    }

    if (match.path === "/vote/:award") {
      const { award } = match.params;
      setTimeout(() => handleVoteNav(award), 400);
    }
  }, [userIdentification]);

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
                <Link
                  id={award._id}
                  key={award._id}
                  to={`/vote/${award._id}`}
                  style={{
                    background: `${
                      award.answer.length > 0
                        ? "linear-gradient(to right, #233329, #63D471)"
                        : "#000"
                    }`,
                  }}
                >
                  {award.heading}
                  {award.answer.length > 0 && (
                    <span className="navbar__dropdown-voted">
                      VOTED<span></span>
                    </span>
                  )}
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
