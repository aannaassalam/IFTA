import React from "react";
import "./MovieGrid.css";
import img from "../../images/black-panther-poster.jpg";

const MovieGrid = () => {
  return (
    <div className="movieGrid">
      <h1>The Movie of 2020</h1>
      <span>Main Categiries</span>

      <div>
        {movies.map((movie) => (
          <div
            className="movieGrid__movies"
            style={{
              border: `${movie.winner && "2px solid #11c4d5"}`,
              opacity: `${!movie.winner && "0.6"}`,
            }}
          >
            <img src={movie.image} alt="img" />
            <div>
              <h2>{movie.headeing}</h2>
              {movie.winner ? (
                <p className="movieGrid__moviesWinner">
                  Winner <a>View All</a>
                </p>
              ) : (
                <p className="movieGrid__moviesLoser">Closed</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const movies = [
  {
    image: img,
    headeing: "Bad boys for life",
    winner: true,
  },
  {
    image: img,
    headeing:
      "BIRDS OF PREY: AND THE FANTABULOUS EMANCIPATION OF ONE HARLEY QUINN",
    winner: false,
  },
  {
    image: img,
    headeing: "EXTRACTION",
    winner: false,
  },
  {
    image: img,
    headeing: "HAMILTON",
    winner: false,
  },
  {
    image: img,
    headeing: "PROJECT POWER",
    winner: false,
  },
  {
    image: img,
    headeing: "THE INVISIBLE MAN",
    winner: false,
  },
  {
    image: img,
    headeing: "THE OLD GUARD",
    winner: false,
  },
  {
    image: img,
    headeing: "TROLLS WORLD TOUR",
    winner: false,
  },
  {
    image: img,
    headeing: "HAMILTON",
    winner: false,
  },
  {
    image: img,
    headeing: "PROJECT POWER",
    winner: false,
  },
  {
    image: img,
    headeing: "THE INVISIBLE MAN",
    winner: false,
  },
  {
    image: img,
    headeing: "THE OLD GUARD",
    winner: false,
  },
];

export default MovieGrid;
