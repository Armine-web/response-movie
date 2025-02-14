import imdbLogo from "../../assets/images/imdb.jpg";
export const Table = ({ data, onRowClick }) => {
  const handleOpenIMDBbMovie = (event, imdbID) => {
    event.stopPropagation();
    window.open(`https://www.imdb.com/title/${imdbID}`, " ");
  };
    return (
      <table className="table  table-dark mt-5 table-hover fs-3 " style={{maxWidth: "1000px",margin: "auto"}}>
        <thead className="text-warning">
          <tr >
            <th >Poster</th>
            <th>Title</th>
            <th>Year</th>
            <th className="text-end">Watch Now</th>
          </tr>
        </thead>
        <tbody>
          {data.map((movie) => (
            <tr key={movie.imdbID} onClick={() => onRowClick(movie)}>
              <td>
                <img width="50" src={movie.Poster} alt={movie.Title} />
              </td>
              <td>{movie.Title}</td>
              <td>{movie.Year}</td>
              <td className="text-md-end">
              <div className="text-end">
                <button
                  type="button"
                  className="btn"
                  style={{
                    color: "#EC8305", 
                    textDecoration: "none", 
                    outline: "none",
                    border: "none",
                    boxShadow: "none",}}
                  onClick={(event) => handleOpenIMDBbMovie(event, movie.imdbID)}
                >
                  Click To Watch
                  <img src={imdbLogo} alt="" width={50} 
                  style={{borderRadius: "5px", marginLeft: "5px"}}/>
                </button>
              </div>
            </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };