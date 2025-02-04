import React, { useState, useEffect } from "react";
import { Table } from "../../components/table/table";
import { Modal } from "../../components/modal/modal";
import { omdbApi } from "../../api/movie.api";
import { MovieDetails } from "./movie-details/movie-details";

export const SearchMovies = ({ searchQuery }) => {
  const [data, setData] = useState([]);
  const [open, setModalOpen] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [init, setInit] = useState(false);

  const fetchMovies = async () => {
    const response = await omdbApi.fetchMoviesBySearch(searchQuery || "");

    if (response.success) {
      setData(response.data.Search || []);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get("movieId");
    const title = urlParams.get("title");
    const year = urlParams.get("year");

    if (movieId && title && year) {
      setModalOpen(true);
      setSelectedMovie({ imdbID: movieId, Title: title, Year: year });
    }
  }, []);

  useEffect(() => {
    fetchMovies();
    setInit(true);
  }, []);

  useEffect(() => {
    if (!init) return;

    clearTimeout(timeoutId);

    const toId = setTimeout(() => {
      fetchMovies();
    }, 1000);

    setTimeoutId(toId);
  }, [searchQuery]);

  const handleRowClick = (row) => {
    setModalOpen(true);
    setSelectedMovie(row);

    window.history.pushState(
      null,
      "",
      `?movieId=${row.imdbID}&title=${row.Title}&year=${row.Year}`
    );
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    window.history.pushState("", "", "/");
  };

  const handleAddToFavorites = () => {
    if (!selectedMovie) return;

    // Check if the movie is already in localStorage
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const isMovieInFavorites = favorites.some(
      (movie) => movie.imdbID === selectedMovie.imdbID
    );

    if (!isMovieInFavorites) {
      favorites.push(selectedMovie);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      alert("Movie added to favorites!");
    } else {
      alert("This movie is already in your favorites.");
    }
  };

  return (
    <div className="container mt-4">
      <Table data={data} onRowClick={handleRowClick} />
      <Modal
        open={open}
        onClose={handleCloseModal}
        title={`${selectedMovie?.Title} (${selectedMovie?.Year})`}
        onAddToFavorites={handleAddToFavorites} // Pass the function as a prop
      >
        <MovieDetails id={selectedMovie?.imdbID} />
      </Modal>
    </div>
  );
};