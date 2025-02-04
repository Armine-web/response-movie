import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

export function Carousel() {
  const [favorites, setFavorites] = useState([]);


  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const fallbackImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPPpl8iGO_pXiT0FX2hNX-5W9mbjFlKx7Zhw&s";

  return (
    <div style={{maxWidth: "800px", height: "400px", margin: "auto"}}>
      <div
        id="carouselExampleCaptions"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">

          {(favorites.length > 0 ? favorites : [1]).map((_, index) => (
            <button
              key={index}
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
              aria-current={index === 0 ? "true" : undefined}
              aria-label={`Slide ${index + 1}`}
            ></button>
          ))}
        </div>

        <div className="carousel-inner">
       
          {favorites.length > 0 ? (
            favorites.map((movie, index) => (
              <div
                key={movie.imdbID}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
              >
                <img
                  src={movie.Poster}
                  className="d-block w-100"
                  alt={movie.Title}
                  style={{
                    width: "100%",
                    height: "400px",
                    objectFit: "cover",
                    objectPosition: "center", 
                  }}
                />
                <div className="carousel-caption d-none d-md-block">
                  <h5>{movie.Title}</h5>
                  <p>{movie.Year}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="carousel-item active">
              <img
                src={fallbackImage}
                className="d-block w-100"
                alt="Fallback"
                style={{
                  width: "100%",
                  height: "400px",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>No Favorites</h5>
                <p>There are no movies in your favorites.</p>
              </div>
            </div>
          )}
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}

Carousel.propTypes = {};
