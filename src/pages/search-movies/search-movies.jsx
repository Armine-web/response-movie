import { useReducer, useEffect, useRef } from "react";
import { Table } from "../../components/table/table";
import { Modal } from "../../components/modal/modal";
import { omdbApi } from "../../api/movie.api";
import { MovieDetails } from "./movie-details/movie-details";
import { Pagination } from "../../components/pagination/pagination";
import { APP_TITLE } from "../utils/constatnt";
import { getAppTitleByMovie } from "../utils/helpers";
import { Carousel } from "../../components/carousel/carousel";


const initialState = {
  data: [],
  open: false,
  selectedMovie: null,
  currentPage: 1,
  totalPages: 1,
};


const searchMovieReducer = (state, action) => {
  switch (action.type) {
    case "SET_DATA":
      return { ...state, data: action.payload };
    case "SET_MODAL_OPEN":
      return { ...state, open: action.payload };
    case "SET_SELECTED_MOVIE":
      return {
        ...state,
        open: action.payload.open,
        selectedMovie: action.payload.selectedMovie,
      };
    case "SET_PAGE":
      return { ...state, currentPage: action.payload.page };
    case "SET_TOTAL_PAGES":
      return { ...state, totalPages: action.payload.totalPages };
    default:
      return state;
  }
};

export const SearchMovies = ({ searchQuery }) => {
  const [state, dispatch] = useReducer(searchMovieReducer, initialState);
  const timeoutIdRef = useRef(null);

  const fetchMovies = async (page = state.currentPage) => {
    const response = await omdbApi.fetchMoviesBySearch(searchQuery || "", page);

    if (response.success) {
      dispatch({ type: "SET_DATA", payload: response.data.Search || [] });
      dispatch({
        type: "SET_TOTAL_PAGES",
        payload: { totalPages: Math.ceil(response.data.totalResults / 10) },
      });
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get("movieId");
    const title = urlParams.get("title");
    const year = urlParams.get("year");

    if (movieId && title && year) {
      dispatch({
        type: "SET_SELECTED_MOVIE",
        payload: {
          open: true,
          selectedMovie: { imdbID: movieId, Title: title, Year: year },
        },
      });

      document.title = getAppTitleByMovie(title, year);
    }
  }, []);

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    clearTimeout(timeoutIdRef.current);

    const toId = setTimeout(() => {
      fetchMovies();
    }, 1000);

    timeoutIdRef.current = toId;
  }, [searchQuery]);

  const handleRowClick = (row) => {
    dispatch({
      type: "SET_SELECTED_MOVIE",
      payload: {
        open: true,
        selectedMovie: row,
      },
    });

    document.title = getAppTitleByMovie(row.Title, row.Year);

    window.history.pushState(
      null,
      "",
      `?movieId=${row.imdbID}&title=${row.Title}&year=${row.Year}`
    );
  };

  const handleCloseModal = () => {
    dispatch({
      type: "SET_MODAL_OPEN",
      payload: false,
    });

    window.history.pushState("", "", "/");
    document.title = APP_TITLE;
  };

  const handlePageChange = (page) => {
    dispatch({ type: "SET_PAGE", payload: { page } });
    fetchMovies(page);
  };

  return (
    <div className="container mt-4">
      <Carousel />

      <Table data={state.data} onRowClick={handleRowClick} />

      <Pagination
        currentPage={state.currentPage}
        totalPages={state.totalPages}
        onPageChange={handlePageChange}
      />

      <Modal
        open={state.open}
        onClose={handleCloseModal}
        title={getAppTitleByMovie(state.selectedMovie?.Title, state.selectedMovie?.Year)}
      >
        <MovieDetails id={state.selectedMovie?.imdbID} />
      </Modal>
    </div>
  );
};
