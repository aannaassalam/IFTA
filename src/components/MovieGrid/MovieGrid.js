import React from "react";
import "./MovieGrid.css";
import { useState } from "react";
import axios from "axios";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { useEffect } from "react";
import { Dialog } from "@material-ui/core";
import { useStateValue } from "../../StateProvider";
import ExpiredGrid from "./ExpiredGrid/ExpiredGrid";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import $ from 'jquery'
const MovieGrid = ({ award }) => {
  const [{ userIdentification, sessionExpired }, dispatch] = useStateValue();

  // OPEN OF MADALS
  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openWeblink, setOpenWeblink] = useState(false);
  
  // DATA STORING
  const [movies, setMovies] = useState({});
  const [modalData, setModalData] = useState({});
  const [sesExpired, setSesExpired] = useState(null);
  const [carouselData, setCarouselData] = useState([]);
  const match = useRouteMatch();
  const history = useHistory();

  useEffect(() => {
    if (sessionExpired) {
      axios
        .get(`http://13.235.90.125:8000/award/results?id=${award}`)
        .then((res) => setSesExpired(res.data.payload));
    } else {
      fetchNominees(userIdentification);
    }

    axios
      .get(
        "http://13.235.90.125:8000/show/fetchCategories?showId=602a7e3c14367b662559c85f"
      )
      .then((res) => fetchCarouselCategories(res.data.payload));
  }, [award]);

  const fetchNominees = (userIdentification) => {
    if (userIdentification) {
      const authToken = sessionStorage.getItem("authToken").split(" ")[1];
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
              voteCount: res.data.payload[0].voteCount,
              votedOnce: true,
            });
          } else {
            setMovies({
              nominations: res.data.payload[0].nominations,
              heading: res.data.payload[0].heading,
              voteCount: res.data.payload[0].voteCount,
              votedOnce: false,
            });
          }
        })
        .catch((err) => alert(err));
    } else {
      axios
        .get(`http://13.235.90.125:8000/award?id=${award}`)
        .then((res) => {
          setMovies(res.data.payload[0]);
        })
        .catch((err) => console.log(err));
    }
  };

  const fetchCarouselCategories = (arr) => {
    let carouselArray = [];
    arr.forEach((item) => {
      item.awards.forEach((awd) => {
        if (awd._id === award) {
          item.awards.forEach((carousel) => carouselArray.push(carousel._id));
        }
      });
    });
    setCarouselData(carouselArray);
  };
  // SETS the CURRENT POSITION IN AN ARRAY
  if (carouselData) {
    sessionStorage.setItem(
      "currentCarouselPosition",
      carouselData.indexOf(award)
    );
  }

  // PREV BUTTON
  let current = parseInt(sessionStorage.getItem("currentCarouselPosition"));
  const handlePrevious = () => {
    const length = carouselData.length;
    current--;
    if (current < 0) {
      current = length - 1;
    }
    history.replace(`/vote/${carouselData[current]}`);
  };

  // NEXT BUTTON
  const handleNext = () => {
    const length = carouselData.length;
    current++;
    if (current > length - 1) {
      current = 0;
    }
    history.replace(`/vote/${carouselData[current]}`);
  };

  const handleVote = (key) => {
    if (userIdentification) {
      const authToken = sessionStorage.getItem("authToken").split(" ")[1];
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
    } else {
      setOpen(false);
      setTimeout(() => {
        setModalData({
          name: "Need to Login before voting",
        });
        setOpenConfirm(true);
      }, 100);
    }
  };

  const movieNameTransform = ()=>{

  }

  return !sessionExpired ? (
    <div className="movieGrid">
      <div className="movieGrid__carousel">
        <NavigateBeforeIcon onClick={handlePrevious} />
        <h1>{movies.heading}</h1>
        <NavigateNextIcon onClick={handleNext} />
      </div>

      <p className="movieGrid__votes">
        Number of people Voted: <span>{movies.voteCount || "0"}</span>
      </p>

      <Link to="/voting">Main Categories</Link>

      <div className="movieGrid__container">
        {movies.nominations?.map((movie, index) => (
          <div
            className={`movieGrid__movies ${
              movies?.votedOnce && "movieGrid__votedOnce"
            }`}
          >
            <img src={movie?.image} style={{cursor:'pointer'}} onClick={()=>{setModalData({name:movie.name,weblink:movie.weblink});setOpenWeblink(true)}} alt="img" />
            <div>
              <h2>{movie.name.split('(')[0]}<br /><span style={{fontSize:'0.7rem'}}>{movie.name.split('(')[1].replace(')','')}</span></h2>
              <button
                disabled={movies?.votedOnce}
                className={`movieGrid__moviesBtn ${
                  movies?.votedOnce && `movieGrid__moviesBtn${index}`
                }`}
                onClick={() => {
                  if(userIdentification){
                    setModalData({
                      name: movie.name,
                      key: movie.key,
                    });
                    setOpen(true);
                  }else{
                    $("#popup1").css({ visibility: "visible", opacity: "1" });
                  }

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
        <div className="movieGrid__modal movieGrid__modalSecond">
          <h1>
            {userIdentification && "You have voted to: "}
            <span>{modalData.name}</span>
          </h1>
          <button
            onClick={() => {
              setModalData({});
              setOpenConfirm(false);
            }}
          >
            Close
          </button>
        </div>
      </Dialog>
      <Dialog open={openWeblink}>
        <div className="movieGrid__modal movieGrid__modalSecond">
          <h1 style={{cursor:'pointer'}}>
            <a href={modalData.weblink} target="_blank">{modalData.weblink}</a>
          </h1>
          <button
            onClick={() => {
              setModalData({});
              setOpenWeblink(false);
            }}
          >
            Close
          </button>
        </div>
      </Dialog>   
    </div>
  ) : (
    <ExpiredGrid
      sesExpired={sesExpired}
      handlePrevious={handlePrevious}
      handleNext={handleNext}
    />
  );
};

export default MovieGrid;
