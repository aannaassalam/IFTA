import React from "react";
import { Link } from "react-router-dom";
import "../MovieGrid.css";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";

function ExpiredGrid({ sesExpired, handlePrevious, handleNext }) {
  let movies = [];
  const createArray = () => {
    for (let vote in sesExpired?.votes) {
      for (let movie in sesExpired?.options) {
        for (let image in sesExpired?.images) {
          if (vote === movie && movie === image) {
            let obj = {
              name: sesExpired.options[movie],
              votes: sesExpired.votes[vote],
              image: sesExpired.images[image],
            };
            movies.push(obj);
          }
        }
      }
    }

    let obj = movies.findIndex((o) => o.name === sesExpired?.winner.name);
    movies.splice(obj, 1);
    movies.unshift(sesExpired?.winner);
  };
  createArray();
  return (
    <div className="movieGrid">
      <div className="movieGrid__carousel">
        <NavigateBeforeIcon onClick={handlePrevious} />
        <h1>{sesExpired?.award.heading}</h1>
        <NavigateNextIcon onClick={handleNext} />
      </div>

      <Link to="/voting" style={{color:"#fff"}}>Main Categories</Link>

      <div className="movieGrid__container">
        {movies?.map((movie, index) => (
          <div
            className="movieGrid__movies"
            key={index}
            style={{ opacity: `${index <= 0 ? "1" : "0.4"}` }}
          >
            <img src={movie?.image} alt="img" />
            <div>
              <h2>{movie?.name}</h2>
              {index === 0 && (
                <span
                  style={{
                    color: "darkgreen",
                    fontWeight: "bold",
                    fontSize: "large",
                    filter: "brightness(200%)",
                  }}
                >
                  Winner
                </span>
              )}
              <p className="movieGrid__moviesBtn expiredGrid__moviesBtn">
                Votes: {movie?.votes}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExpiredGrid;
