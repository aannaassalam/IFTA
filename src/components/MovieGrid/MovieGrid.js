import React from "react";
import "./MovieGrid.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useRouteMatch } from "react-router-dom";
import { Dialog } from "@material-ui/core";
import { useStateValue } from "../../StateProvider";
import ExpiredGrid from "./ExpiredGrid/ExpiredGrid";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import { Modal } from "@material-ui/core";
import $ from "jquery";
import { actionTypes } from "../../Reducer";
import Select from "react-select";
import { stateList } from "../Map/Map";
import Map from "../Map/Map";
import CommentBox from "./Comment";
import moment from "moment";

const MovieGrid = ({ award }) => {
  const [
    { userIdentification, sessionExpired, state, awards, expiryDate },
    dispatch,
  ] = useStateValue();
  const match = useRouteMatch();
  // OPEN OF MADALS
  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openWeblink, setOpenWeblink] = useState(false);
  const [openState, setOpenState] = useState(false);
  const [openResult, setOpenResult] = useState(false);
  // DATA STORING
  const [movies, setMovies] = useState({});
  const [modalData, setModalData] = useState({});
  const [sesExpired, setSesExpired] = useState(null);
  const [carouselData, setCarouselData] = useState([]);
  const history = useHistory();
  const [comments, setComments] = useState([]);
  const [enteredComment, setEnteredComment] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [mapData, setMapdata] = useState([]);
  const [enteredState, setEnteredState] = useState("");
  const gridRef = React.createRef();

  useEffect(() => {
    fetchCarouselCategories(awards);
  }, [awards]);

  useEffect(() => {
    if (sessionExpired === true) {
      axios
        .get(`/award/results?id=${award}`)
        .then((res) => setSesExpired(res.data.payload));
    } else if (sessionExpired === false) {
      fetchNominees(userIdentification);
    }
  }, [award, userIdentification, sessionExpired]);

  function moveArrayItemToNewIndex(arr, old_index, new_index) {
    if (new_index >= arr.length) {
      var k = new_index - arr.length + 1;
      while (k--) {
        arr.push(undefined);
      }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr;
  }

  const fetchNominees = (userIdentification) => {
    if (userIdentification) {
      const authToken = localStorage.getItem("authToken").split(" ")[1];
      axios
        .get(`/award/logedIn?id=${award}`, {
          headers: { Authorization: `Bearer ${authToken}` },
        })
        .then((res) => {
          let nominations = res.data.payload[0].nominations;
          let index = nominations.findIndex((nomination) => {
            return nomination.name === "others";
          });
          if (index !== -1) {
            nominations = moveArrayItemToNewIndex(
              nominations,
              index,
              nominations.length - 1
            );
          }
          if (res.data.payload[0].votedNomination) {
            nominations.unshift(res.data.payload[0].votedNomination);
            setMovies({
              nominations: nominations,
              heading: res.data.payload[0].heading,
              voteCount: res.data.payload[0].voteCount,
              votedOnce: true,
              _id: res.data.payload[0]._id,
            });
          } else {
            setMovies({
              nominations: res.data.payload[0].nominations,
              heading: res.data.payload[0].heading,
              voteCount: res.data.payload[0].voteCount,
              votedOnce: false,
              _id: res.data.payload[0]._id,
            });
          }
          // fetchComments(res.data.payload[0]);
          setMapdata(res.data.payload[0].state_data);
          setShowMap(false);
        })
        .catch((err) => alert(err));
    } else {
      axios
        .get(`/award?id=${award}`)
        .then((res) => {
          setMovies(res.data.payload[0]);
          // fetchComments(res.data.payload[0]);
          setMapdata(res.data.payload[0].state_data);
          setShowMap(false);
        })
        .catch((err) => console.log(err));
    }
  };

  // const fetchComments = ({ comments_data }) => {
  //   let received = comments_data;
  //   setComments(() => {
  //     let old_comments = [];
  //     for (let comment of received) {
  //       if (comment.comment) {
  //         old_comments.push({
  //           author: comment.user.userName,
  //           type: 'text',
  //           data: {
  //             text: `@${comment.user.userName} voted for "${comment.award.nominations.name.split('(')[0].trim()}" \n${comment.comment}`
  //           }
  //         })
  //       }
  //     }
  //     return old_comments;
  //   })
  // };

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
    setShowMap(false);
    history.replace(`/vote/${carouselData[current]}`);
  };

  // NEXT BUTTON
  const handleNext = () => {
    const length = carouselData.length;
    current++;
    if (current > length - 1) {
      current = 0;
    }
    setShowMap(false);
    history.replace(`/vote/${carouselData[current]}`);
  };

  const handleVote = (key) => {
    if (userIdentification) {
      if (!state) {
        setOpenState(true);
      } else {
        const authToken = localStorage.getItem("authToken").split(" ")[1];
        const config = {
          headers: { Authorization: `Bearer ${authToken}` },
        };

        const bodyParameters = {
          award: match.params.award,
          answer: key,
          comment: enteredComment,
          show: "602a7e3c14367b662559c85f",
        };

        if (enteredComment === "") {
          delete bodyParameters.comment;
        }

        axios
          .post("/award/add-answer", bodyParameters, config)
          .then((res) => {
            setOpen(false);
            fetchNominees(userIdentification);
            dispatch({
              type: actionTypes.UPDATE_AWARDS_ARRAY,
              answer: res.data.payload,
              award: match.params.award,
            });
            setEnteredComment("");
          })
          .catch((err) => console.log(err));
      }
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

  const updateSate = () => {
    if (userIdentification) {
      if (enteredState !== "") {
        const authToken = localStorage.getItem("authToken").split(" ")[1];
        const config = {
          headers: { Authorization: `Bearer ${authToken}` },
        };

        const bodyParameters = {
          state: enteredState,
        };

        axios.patch("/user", bodyParameters, config).then((res) => {
          localStorage.setItem("state", `${res.data.payload.state}`);
          dispatch({
            type: actionTypes.SET_USER_STATE,
            state: res.data.payload.state,
          });
          setOpenState(false);
        });
      } else {
        alert("Fields can not be empty");
      }
    } else {
      setOpenState(false);
      setTimeout(() => {
        setModalData({
          name: "Need to Login before voting",
        });
        setOpenConfirm(true);
      }, 100);
    }
  };

  const mapToggleHandler = () => {
    setShowMap(!showMap);
  };

  const OtherNomination = ({ movie, index }) => {
    return (
      <React.Fragment>
        <img src={movie?.image} alt="img" />
        <div>
          <h2>None of the above</h2>
          <button
            disabled={movies?.votedOnce}
            className={`movieGrid__moviesBtn ${
              movies.votedOnce && `movieGrid__moviesBtn${index}`
            }`}
            onClick={() => {
              if (userIdentification) {
                if (state) {
                  setModalData({
                    name: "Others",
                    key: movie.key,
                  });
                  setOpen(true);
                } else {
                  setOpenState(true);
                }
              } else {
                $("#popup1").css({ visibility: "visible", opacity: "1" });
              }
            }}
          >
            {movies?.votedOnce && index === 0
              ? "Voted"
              : !movies?.votedOnce
              ? "Vote"
              : "Closed"}
          </button>
        </div>
      </React.Fragment>
    );
  };

  const MovieGrid = ({ userIdentification }) => {
    return (
      <React.Fragment>
        <div className="movieGrid__container" ref={gridRef}>
          {movies.nominations?.map((movie, index) => (
            <div
              className={`movieGrid__movies ${
                movies?.votedOnce && "movieGrid__votedOnce"
              }`}
              key={index}
            >
              {movie.name.split("(")[0] === "others" ? (
                <OtherNomination movie={movie} index={index} />
              ) : (
                <React.Fragment>
                  <img
                    src={movie?.image}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setModalData({
                        name: movie.name,
                        weblink: movie.weblink,
                        ytlink: movie.ytlink,
                      });
                      setOpenWeblink(true);
                    }}
                    alt="img"
                  />
                  <PlayCircleOutlineIcon
                    style={{ fontSize: "large", cursor: "pointer" }}
                    onClick={() => {
                      setModalData({
                        name: movie.name,
                        weblink: movie.weblink,
                        ytlink: movie.ytlink,
                      });
                      setOpenWeblink(true);
                    }}
                  />

                  <div>
                    <h2>
                      {movie.name.split("(")[0]}
                      <br />
                      <span
                        style={{ fontSize: "0.7rem", fontWeight: "normal" }}
                      >
                        {movie.name.split("(")[1].replace(")", "")}
                      </span>
                    </h2>
                    <button
                      disabled={movies?.votedOnce}
                      className={`movieGrid__moviesBtn ${
                        movies.votedOnce && `movieGrid__moviesBtn${index}`
                      }`}
                      onClick={() => {
                        if (userIdentification) {
                          if (state) {
                            setModalData({
                              name: movie.name,
                              key: movie.key,
                            });
                            setOpen(true);
                          } else {
                            setOpenState(true);
                          }
                        } else {
                          $("#popup1").css({
                            visibility: "visible",
                            opacity: "1",
                          });
                        }
                      }}
                    >
                      {movies?.votedOnce && index == 0
                        ? "Voted"
                        : !movies?.votedOnce
                        ? "Vote"
                        : "Closed"}
                    </button>
                    <h6 style={{ cursor: "pointer" }}>
                      <a
                        href={movie.weblink}
                        target="_blank"
                        style={{ color: "white" }}
                      >
                        Read More
                      </a>
                    </h6>
                  </div>
                </React.Fragment>
              )}
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  };

  return sessionExpired === false ? (
    <div className="movieGrid">
      <div className="movieGrid__carousel">
        <NavigateBeforeIcon onClick={handlePrevious} />
        <h1>{movies.heading}</h1>
        <NavigateNextIcon onClick={handleNext} />
      </div>
      <p className="movieGrid__votes">
        Number of people voted for this category:{" "}
        <span>{movies.voteCount || "0"}</span>
      </p>
      {movies.votedOnce ? (
        <div
          style={{
            color: "white",
            textDecoration: "underline",
            cursor: "pointer",
            fontWeight: "bold",
            marginBottom: "5px",
            display: "inline",
          }}
          onClick={mapToggleHandler}
        >
          {showMap ? (
            <span>Back To Nominations</span>
          ) : (
            <span>Vote Share Per State </span>
          )}
        </div>
      ) : null}{" "}
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      {movies.votedOnce ? (
        <div
          style={{
            color: "white",
            textDecoration: "underline",
            cursor: "pointer",
            fontWeight: "bold",
            marginBottom: "5px",
            display: "inline",
          }}
          onClick={() => {
            setOpenResult(true);
          }}
        >
          {" "}
          View Result{" "}
        </div>
      ) : null}
      {showMap ? (
        <Map mapData={mapData} />
      ) : (
        <MovieGrid userIdentification={userIdentification} />
      )}
      <CommentBox movies={movies} comments={comments} />
      <Dialog
        open={open}
        onClose={() => {
          setModalData({});
          setOpen(false);
        }}
      >
        <div
          className="movieGrid__modal"
          style={{
            height: "max-content",
            width: "max-content",
            padding: "20px",
          }}
        >
          <h6>You Voted</h6>
          <h4>
            "
            <i>{modalData.name ? modalData.name.split("(")[0].trim() : null}</i>
            "
          </h4>
          <div
            style={{
              height: "max-content",
              width: "max-content",
              padding: "10px 0 10px",
            }}
          >
            <textarea
              type="text"
              value={enteredComment}
              placeholder="Enter Comment"
              onChange={(e) => {
                setEnteredComment(e.target.value);
              }}
            />
          </div>
          <div>
            <button
              onClick={() => {
                setTimeout(() => setModalData({}), 500);
                setOpen(false);
              }}
            >
              Cancel
            </button>
            <button onClick={() => handleVote(modalData.key)}>Confirm</button>
          </div>
        </div>
      </Dialog>
      <Dialog open={openConfirm}>
        <div className="movieGrid__modal movieGrid__modalSecond">
          <h1>
            {userIdentification && "You have voted to: "}
            <span>
              {modalData.name ? modalData.name.split("(")[0].trim() : null}
            </span>
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
      <Modal
        open={openState}
        onBackdropClick={() => {
          setOpenState(false);
        }}
      >
        <div
          className="movieGrid__modal3 movieGrid__modalSecond"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            color: "black",
            height: "max-content",
          }}
        >
          <h4 style={{ color: "white" }}>Please enter following details</h4>
          <Select
            options={stateList}
            onChange={(value) => {
              setEnteredState(value.value);
            }}
            placeholder="Select your region"
            style={{ color: "white", marginTop: "5px" }}
          />
          {/* <FormControl component="fieldset" style={{color:'white' , marginTop:'5px'}}>
            <FormLabel component="legend" style={{color:'white' , marginTop:'5px'}}>Gender</FormLabel>
            <RadioGroup aria-label="gender" name="gender1" value={gender} onChange={(e)=> setGender(e.target.value)}>
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="other" control={<Radio />} label="Other" />
            </RadioGroup>
          </FormControl> */}
          <button onClick={updateSate}>Submit</button>
        </div>
      </Modal>
      <Modal
        open={openResult}
        onBackdropClick={() => {
          setOpenResult(false);
        }}
      >
        <div
          className="movieGrid__modal3 movieGrid__modalSecond"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            color: "black",
            height: "max-content",
            alignItems: "center",
            boxShadow: "0 0 15px 5px #d4c4c482",
          }}
        >
          <h4 style={{ color: "white" }}>
            Result will be declared on <br />{" "}
            {moment(expiryDate).format("Do MMMM, YYYY")}
          </h4>
        </div>
      </Modal>
      <Modal
        open={openWeblink}
        onBackdropClick={() => {
          setModalData({});
          setOpenWeblink(false);
        }}
      >
        <div
          className="movieGrid__modalSecond"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            height: "70vh",
            width: "80vw",
          }}
        >
          <iframe
            width="100%"
            height="100%"
            title="youtbe"
            src={
              "https://www.youtube.com/embed/" +
              modalData.ytlink +
              "?autoplay=1"
            }
          ></iframe>
          <button
            onClick={() => {
              setModalData({});
              setOpenWeblink(false);
            }}
          >
            Close
          </button>
        </div>
      </Modal>
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
