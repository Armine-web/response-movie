import React, { useState, useEffect } from "react";
import { omdbApi } from "../../../api/movie.api";
import { useLocalStorageState } from "../../../hooks/use-local-storage-state";

export const MovieDetails = ({ id }) => {
  const [movie, setMovie] = useState({});
  const [isMovieFavorite, setIsMovieFavorite] = useState(false);
  const [moviesState, setMovies] = useLocalStorageState([], "movies");

  useEffect(() => {
    setIsMovieFavorite(!!moviesState.filter((m) => m.imdbID === id).length);
  }, [id]);

  useEffect(() => {
    const getMovie = async () => {
      try {
        const response = await omdbApi.fetchByID(id);
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };
    if (id) {
      getMovie();
    } else {
      setMovie({});
    }
    return () => {
      console.log("cleanup");
    };
  }, [id]);

  const handelUpdateFavoriteStatus = () => {
    const movies = [...moviesState];
    const target = movies.find((m) => m.imdbID === id);

    if (target) {
      const index = movies.findIndex((m) => m.imdbID === id);
      movies.splice(index, 1);
      setMovies(movies);
      setIsMovieFavorite(false);
    } else {
      movies.push(movie);
      setMovies(movies);
      setIsMovieFavorite(true);
    }
  };



  return (
    
    <div style={{textAlign: "end"}}>
       <button classname = "btn btn-link" onClick={handelUpdateFavoriteStatus}>
              {isMovieFavorite ? 
              (<i className="bi bi-heart-fill" 
              style={ {fontSize: "1.4rem", color: "#EC8305" }}/>) : (
                <i className="bi bi-heart" 
              style={ {fontSize: "1.4rem", color: "#EC8305" }}/>
              )
              }
            </button>
      <div className="d-flex justify-content-between">
        
        <div className="me-5">
       
          <img
            src={movie.Poster}
            alt={movie.Title}
            width={300}
            className="h-auto rounded d-block"
          />
          
        </div>
        <div>

          <p className="text-gray-600">
            <strong>Writer:</strong> {movie.Writer}
          </p>
          <p className="text-gray-600">
            <strong>Released:</strong> {movie.Released}
          </p>
          <p className="text-gray-600">
            <strong>Actors:</strong> {movie.Actors}
          </p>
          <p className="text-gray-600">
            <strong>Genre:</strong> {movie.Genre}
          </p>
          <p className="text-gray-600">
            <strong>Type:</strong> {movie.Type}
          </p>
          <p className="text-gray-600">
            <strong>Country:</strong> {movie.Country}
          </p>
          <p className="text-gray-600">
            <strong>Language:</strong> {movie.Language}
          </p>
          <p className="text-gray-600">
            <strong>Key:</strong> {movie.imdbID}
          </p>
        </div>
      </div>
    </div>
  );
};