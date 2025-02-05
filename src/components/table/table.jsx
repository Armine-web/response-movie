export const Table = ({ data, onRowClick }) => {
    return (
      <table className="table  table-dark mt-5 table-hover fs-3 " style={{maxWidth: "800px",margin: "auto"}}>
        <thead className="text-warning">
          <tr >
            <th >Poster</th>
            <th>Title</th>
            <th>Year</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    );
  };