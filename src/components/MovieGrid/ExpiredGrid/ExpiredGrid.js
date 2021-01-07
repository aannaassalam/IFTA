import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./ExpiredGrid.css";

function ExpiredGrid({ sesExpired }) {
  let movies = [];
  const createArray = () => {
    for (let vote in sesExpired?.votes) {
      for (let movie in sesExpired?.options) {
        for (let image in sesExpired?.images) {
          if (vote === movie && movie === image) {
            let obj = {
              movie: sesExpired.options[movie],
              vote: sesExpired.votes[vote],
              image: sesExpired.images[image],
            };
            movies.push(obj);
          }
        }
      }
    }
  };

  let maxVote = null;
  createArray();
  setTimeout(
    () => (maxVote = movies?.reduce((p, c) => (p.vote > c.vote ? p : c))),
    1000
  );

  console.log(maxVote);
  return (
    <div className="movieGrid">
      <h1>Heading</h1>

      <Link to="/voting">Main Categiries</Link>

      <div>
        {movies?.map((movie, index) => (
          <div className="movieGrid__movies" key={index}>
            <img src={movie.image} alt="img" />
            <div>
              <h2>{movie.movie}</h2>
              <p className="movieGrid__moviesBtn">Votes: {movie.vote}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExpiredGrid;
