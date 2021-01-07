import React from "react";
import "./MovieGrid.css";
import { useState } from "react";
import axios from "axios";
import { Link, useRouteMatch } from "react-router-dom";
import { useEffect } from "react";
import { Dialog } from "@material-ui/core";
import { useStateValue } from "../../StateProvider";
import ExpiredGrid from "./ExpiredGrid/ExpiredGrid";

const MovieGrid = ({ award }) => {
  const [{ userIdentification, sessionExpired }, dispatch] = useStateValue();

  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [movies, setMovies] = useState({});
  const [modalData, setModalData] = useState({});
  const [sesExpired, setSesExpired] = useState(null);
  const match = useRouteMatch();

  useEffect(() => {
    if (sessionExpired) {
      axios
        .get(
          `http://13.235.90.125:8000/award/results?id=5ff351ded2d84274b06e2787`
        )
        .then((res) => setSesExpired(res.data.payload));
    } else {
      fetchNominees(userIdentification);
    }
  }, [award]);

  const fetchNominees = (userIdentification) => {
    if (userIdentification) {
      const authToken = localStorage.getItem("authToken").split(" ")[1];
      axios
        .get(`http://13.235.90.125:8000/award/logedIn?id=${award}`, {
          headers: { Authorization: `Bearer ${authToken}` },
        })
        .then((res) => {
          if (res.data.payload[0].votedNomination) {
            let nominations = res.data.payload[0].nominations;
            nominations.unshift(res.data.payload[0].votedNomination);
            setMovies({
              nominations: nominations,
              heading: res.data.payload[0].heading,
              votedOnce: true,
            });
          } else {
            setMovies({
              nominations: res.data.payload[0].nominations,
              heading: res.data.payload[0].heading,
              votedOnce: false,
            });
          }
        })
        .catch((err) => alert(err));
    } else {
      axios
        .get(`http://13.235.90.125:8000/award?id=${award}`)
        .then((res) => {
          console.log(res.data.payload[0]);
          setMovies(res.data.payload[0]);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleVote = (key) => {
    const authToken = localStorage.getItem("authToken").split(" ")[1];
    const config = {
      headers: { Authorization: `Bearer ${authToken}` },
    };

    const bodyParameters = {
      award: match.params.award,
      answer: key,
    };

    axios
      .post(
        "http://13.235.90.125:8000/award/add-answer",
        bodyParameters,
        config
      )
      .then((res) => {
        setOpen(false);
        setTimeout(() => setOpenConfirm(true), 500);
        fetchNominees(userIdentification);
      })
      .catch((err) => console.log(err));
  };

  return !sessionExpired ? (
    <div className="movieGrid">
      <h1>{movies.heading}</h1>

      <Link to="/voting">Main Categiries</Link>

      <div>
        {movies.nominations?.map((movie, index) => (
          <div
            className={`movieGrid__movies ${
              movies?.votedOnce && "movieGrid__votedOnce"
            }`}
          >
            <img src={movie?.image} alt="img" />
            <div>
              <h2>{movie.name}</h2>
              <button
                disabled={movies?.votedOnce}
                className={`movieGrid__moviesBtn ${
                  movies?.votedOnce && `movieGrid__moviesBtn${index}`
                }`}
                onClick={() => {
                  setModalData({
                    name: movie.name,
                    key: movie.key,
                  });
                  setOpen(true);
                }}
              >
                {movies?.votedOnce && index == 0
                  ? "Voted"
                  : !movies?.votedOnce
                  ? "Vote"
                  : "Closed"}
              </button>
            </div>
          </div>
        ))}
        <Dialog
          open={open}
          onClose={() => {
            setModalData({});
            setOpen(false);
          }}
        >
          <div className="movieGrid__modal">
            <h1>{modalData.name}</h1>
            <div>
              <button
                onClick={() => {
                  setTimeout(() => setModalData({}), 500);
                  setOpen(false);
                }}
              >
                Cancel
              </button>
              <button onClick={() => handleVote(modalData.key)}>Submit</button>
            </div>
          </div>
        </Dialog>
      </div>
      <Dialog open={openConfirm}>
        <div className="movieGrid__modal">
          <h1>
            You have voted to: <span>{modalData.name}</span>
          </h1>
          <button onClick={() => setOpenConfirm(false)}>Close</button>
        </div>
      </Dialog>
    </div>
  ) : (
    <ExpiredGrid sesExpired={sesExpired} />
  );
};

export default MovieGrid;
