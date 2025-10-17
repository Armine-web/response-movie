import { useLocalStorageState } from "../../hooks/use-local-storage-state";

export function Carousel() {
  const [moviesState] = useLocalStorageState([], "movies");


 

  const fallbackImage = "https://i.etsystatic.com/18545205/r/il/dd33b8/3436419395/il_794xN.3436419395_jqd7.jpg";

  return (
    <div style={{maxWidth: "800px", height: "300px", margin: "auto"}}>
      <div
        id="carouselExampleCaptions"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">

          {(moviesState.length > 0 ? moviesState : [1]).map((_, index) => (
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
       
          {moviesState.length > 0 ? (
            moviesState.map((movie, index) => (
              <>
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
                    background: "rgb(236, 131, 5, 0.4)",
                    height: "300px",
                    objectFit: "contain",
                    padding: "2px 0",
                    objectPosition: "center", 
                    borderRadius: "20px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
                  }}
                />
                
              </div>
              
            </>
            ))
          ) : (
            <div className="carousel-item active">
              <img
                src={fallbackImage}
                className="d-block w-100"
                alt="Fallback"
                style={{
                  width: "100%",
                  height: "300px",
                  objectFit: "cover",
                  objectPosition: "center",
                  borderRadius: "20px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
                }}
                
              />
              
              <div className="carousel-caption d-none d-md-block">
                <h5  style={{
                  color: "#EC8305", 
                  background: "rgb(0, 0, 0, 0.6)",
                  padding: "8px 12px ",
                  borderRadius: "50px",
                  fontWeight: "bolder", 
                  fontSize: "1.8rem", 
                  letterSpacing: "1px"
                  }}>There are no movies in your favorites.</h5>
                
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
          <span className="visually-hidden" >Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}


