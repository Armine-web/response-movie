import { useReducer, useEffect } from "react";
import { omdbApi } from "../../../api/movie.api";
import { useLocalStorageState } from "../../../hooks/use-local-storage-state";
import { Flag } from "../../../components/flag/flag";


const initialState = {
  movie: {},
  isMovieFavorite: false,
};


const movieReducer = (state, action) => {
  switch (action.type) {
    case "SET_MOVIE":
      return { ...state, movie: action.payload };

    case "TOGGLE_FAVORITE":
      return { ...state, isMovieFavorite: action.payload };

    default:
      return state;
  }
};

export const MovieDetails = ({ id }) => {
  const [state, dispatch] = useReducer(movieReducer, initialState);
  const { movie, isMovieFavorite } = state;
  const [moviesState, setMovies] = useLocalStorageState([], "movies");


  useEffect(() => {
    const isFavorite = moviesState.some((m) => m.imdbID === id);
    dispatch({
      type: "TOGGLE_FAVORITE",
      payload: isFavorite,
    });
  }, [id, moviesState]);


  useEffect(() => {
    const getMovie = async () => {
      try {
        const response = await omdbApi.fetchByID(id);
        dispatch({ type: "SET_MOVIE", payload: response.data });
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    if (id) {
      getMovie();
    } else {
      dispatch({ type: "SET_MOVIE", payload: {} });
    }
  }, [id]);

 
  const handleUpdateFavoriteStatus = () => {
    let updatedMovies = [...moviesState];
    const isMovieInFavorites = updatedMovies.some((m) => m.imdbID === id);

    if (isMovieInFavorites) {
      updatedMovies = updatedMovies.filter((m) => m.imdbID !== id);
      dispatch({ type: "TOGGLE_FAVORITE", payload: false });
    } else {
      updatedMovies.push(movie);
      dispatch({ type: "TOGGLE_FAVORITE", payload: true });
    }

    setMovies(updatedMovies);
  };

  return (
    <div style={{ textAlign: "end" }}>
      <button className="btn " onClick={handleUpdateFavoriteStatus}
      style={{
        outline: "none",
        border: "none",
        boxShadow: "none",
      }}
      >
        {isMovieFavorite ? (
          <i
            className="bi bi-heart-fill"
            style={{ fontSize: "1.4rem", color: "#EC8305" }}
          />
        ) : (
          <i
            className="bi bi-heart"
            style={{ fontSize: "1.4rem", color: "#EC8305" }}
          />
        )}
      </button>

      <div className="d-flex justify-content-between">
        <div className="me-5">
          <img
            src={movie.Poster}
            alt={movie.Title}
            width={300}
            className="h-auto rounded d-block"
          />
          <ul className="list-group list-group-flush">
            {(movie?.Ratings || []).map((rating, index) => (
              <li
                key={rating.Source}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                {rating.Source}
                <span
                style={{backgroundColor: "#EC8305", padding: "5px", color: "white", borderRadius:" 5px"}}>
                  {rating.Value}
                </span>
              </li>
            ))}
          </ul>
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
            <strong>Countries:</strong>
            {(movie.Country || "").split(", ").map((country, index) => (
              <Flag key={country} country={country} />
            ))}
          </p>
        </div>
      </div>
    </div>
  );
};
