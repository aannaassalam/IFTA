import React from "react";
import "./MovieGrid.css";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const MovieGrid = ({ award }) => {
  const [movies, setMovies] = useState({});

  useEffect(() => {
    axios
      .get(`http://13.235.90.125:8000/award?id=${award}`)
      .then((res) => setMovies(res.data.payload));
  }, []);

  console.log(movies);
  return (
    <div className="movieGrid">
      <h1>{movies.heading}</h1>

      <Link to="/voting">Main Categiries</Link>

      <div>
        {movies.nominations?.map((movie) => (
          <div className="movieGrid__movies">
            <img src={movie.image} alt="img" />
            <div>
              <h2>{movie.name}</h2>
              {/* {movie.winner ? (
                <p className="movieGrid__moviesWinner">
                  Winner <a>View All</a>
                </p>
              ) : ( */}
              <p className="movieGrid__moviesLoser">Closed</p>
              {/* )} */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieGrid;
