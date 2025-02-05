import React, { useEffect, useState } from "react";

export function Carousel() {
  const [favorites, setFavorites] = useState([]);


  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const fallbackImage = "https://i.etsystatic.com/18545205/r/il/dd33b8/3436419395/il_794xN.3436419395_jqd7.jpg";

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
                  <h5 style={{ color: "#EC8305", fontWeight: "bolder", fontSize: "1.8rem", letterSpacing: "1px" }}>{movie.Title}</h5>
                  <p style={{ color: "#EC8305" }}>{movie.Year}</p>
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
                <h5 style={{ color: "#EC8305", fontWeight: "bolder", fontSize: "1.8rem", letterSpacing: "1px" }}>No Favorites</h5>
                <p style={{ color: "#EC8305" }}>There are no movies in your favorites.</p>
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


