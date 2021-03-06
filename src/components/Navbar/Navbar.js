import React, { useState, useEffect } from "react";
import "./Navbar.css";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Link, useLocation, useRouteMatch, useHistory } from "react-router-dom";
import axios from "axios";
import { useStateValue } from "../../StateProvider";
import $ from "jquery";

const Navbar = () => {
  const [{ awards }, dispatch] = useStateValue();
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const match = useRouteMatch();
  const history = useHistory();
  // setTimeout(() => {
  //   window.addEventListener("scroll", function () {
  //     let header = document.querySelector("#navbar");
  //     header.classList.toggle("sticky", window.scrollY > 100);
  //   });
  // }, 500);

  useEffect(() => {
    // console.log('isloading', isLoading)
    if (!isLoading) {
      // console.log('location', location)
      if (location.pathname === "/voting" && location.state !== undefined) {
        // Getting the navId passed from category
        const { navId } = location.state;
        handleNav(navId);
      }

      if (match.path === "/vote/:award") {
        const { award } = match.params;
        $(document).ready(() => {
          handleVoteNav(award);
        });
      }
    }
  }, [isLoading]);

  let closeId = "";
  const handleNav = (id) => {
    const dropdown = document.getElementById(id);
    const allDropdown = document.getElementsByClassName("navbar__dropdown");
    const allNavItems = document.getElementsByClassName("nav__items");
    const blurdiv = document.getElementById("blur-div");
    if (match.path === "/vote/:award") {
      handleVoteNav(null, dropdown);
    }

    if (
      dropdown?.classList.contains("navbar__dropdownShow") &&
      dropdown !== null
    ) {
      // dropdown.classList.remove("navbar__dropdownShow");
      // // Removing Active Class
      // dropdown?.previousSibling.classList.remove("nav-active");

      blurdiv.style.display = "none";
    } else {
      if (closeId == id) return;
      Array.from(allDropdown).forEach(function (el) {
        el.classList.remove("navbar__dropdownShow");
      });
      dropdown?.classList.add("navbar__dropdownShow");
      // Adding Active Class
      Array.from(allNavItems).forEach(function (el) {
        el.classList.remove("nav-active");
      });
      dropdown?.focus();
      blurdiv.style.display = "block";
      dropdown?.previousSibling.classList.add("nav-active");
    }
  };
  const closeNav = (id) => {
    const dropdown = document.getElementById(id);
    const blurdiv = document.getElementById("blur-div");
    closeId = id;
    setTimeout(() => {
      if (
        dropdown?.classList.contains("navbar__dropdownShow") &&
        dropdown !== null
      ) {
        dropdown.classList.remove("navbar__dropdownShow");
        // Removing Active Class
        dropdown?.previousSibling.classList.remove("nav-active");
        blurdiv.style.display = "none";
      }
    }, 0);
    setTimeout(() => {
      closeId = "";
    }, 200);
  };
  const handleVoteNav = (id, dropdownId) => {
    if (id === null) {
      // console.log(true);
      const prev = dropdownId.previousSibling;
      const allNavItems = document.getElementsByClassName("nav__items");
      Array.from(allNavItems).forEach(function (el) {
        el.classList.remove("nav-active-vote");
      });
      prev.classList.add("nav-active-vote");
    } else {
      const prev = document.getElementById(id).parentElement.previousSibling;
      // console.log(document.getElementById(id));
      const allNavItems = document.getElementsByClassName("nav__items");
      Array.from(allNavItems).forEach(function (el) {
        el.classList.remove("nav-active-vote");
      });
      prev.classList.add("nav-active-vote");
    }
  };
  const goToVote = (id) => {
    history.push(`/vote/${id}`);
  };
  return (
    <nav className="navbar" id="navbar">
      <ul className="navbar__nav">
        {awards.map((nav, i) => (
          <>
            <li
              className="nav__items"
              key={nav._id}
              onClick={() => handleNav(nav._id)}
              key={i}
            >
              {nav.title} <ExpandMoreIcon />
            </li>

            <div
              tabIndex={0}
              className="navbar__dropdown"
              onBlur={(e) => closeNav(nav._id)}
              id={nav._id}
            >
              {nav.awards?.map((award, i) => (
                <Link
                  id={award._id}
                  onFocus={() => goToVote(award._id)}
                  key={award._id}
                  to={`/vote/${award._id}`}
                  key={i}
                  style={{
                    background: `${
                      award.answer.length > 0
                        ? "linear-gradient(to right, #233329, #63D471)"
                        : "#000"
                    }`,
                    height: "30px",
                    justifyContent: "center",
                    display: "inline-block",
                  }}
                >
                  {award.heading}
                  {award.answer.length > 0 && (
                    <span className="navbar__dropdown-voted">VOTED</span>
                  )}
                </Link>
              ))}
              {isLoading ? setIsLoading(false) : null}
            </div>
          </>
        ))}
        <div id="blur-div"></div>
      </ul>
    </nav>
  );
};

export default Navbar;
