export const Table = ({ data, onRowClick }) => {
    return (
      <table className="table table-striped mt-3 table-hover">
        <thead className="thead-dark">
          <tr>
            <th>Poster</th>
            <th>Title</th>
            <th>Year</th>
            <th>Type</th>
            <th className="text-md-end">IMDB ID</th>
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
              <td>{movie.Type}</td>
              <td className="text-md-end">{movie.imdbID}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };