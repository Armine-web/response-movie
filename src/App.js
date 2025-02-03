import { useState, useEffect} from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"

const FULL_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=397fac80";


const Header = ({ onSearch }) => {
  return (
    <header className='bg-primary text-white p-3 d-flex'>
      <div className='logo'>
        <span role="img" aria-label="logo"></span>
        <h1>My Movies</h1>
      </div>
      <input
        type="text"
        className='form-control w-25'
        placeholder="Search..."
        onChange={(e) => onSearch(e.target.value)}
      />
    </header>
  );
}

const TableComponent = ({ data }) => {
  return (
    <table className='table table-striped mt-3'>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Age</th>
          <th>City</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item.name}</td>
            <td>{item.age}</td>
            <td>{item.city}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const MiniSection = ({ searchQuery }) => {
  const [search, setSearch] = useState("");
  const data = [
    { name: "John", age: 25, city: "New York" },
    { name: "Anna", age: 30, city: "London" },
    { name: "Peter", age: 35, city: "Paris" },
  ];

  const filteredData = data.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className='container mt-4'>
      <TableComponent data={filteredData} />
    </main>
  );
}

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [movie, setMovie] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState("");
  console.log(searchQuery);
  
  useEffect(() => {
    
  });

  useEffect(() => {

    const getMovie = async () => {
      try {
        const response = await fetch(FULL_URL);
        
        const data = await response.json();
        if (response.status !== 200) {
          throw new Error(data.Error);
        }
        setMovie(data);
        setLoading(false);
      } catch (error) {
        setError(error.toString());
        console.error(error);
      }finally {
        setLoading(false);
      }
      
    };
    getMovie();
 
  }, []);


  console.log('Render: ', movie);
  

  return (
    <div>
      <Header onSearch={setSearchQuery} />
      {isLoading ? (<div>Loading...</div>) : (
      <div>
        <div>Title: {movie.Title ||"__"}</div>
      </div>
    )}
    {error && <div>{error} </div>} 
      
      {/* <MiniSection searchQuery={searchQuery} /> */}
    </div>
  );
}

export default App;

