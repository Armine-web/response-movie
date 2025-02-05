import { useState } from "react";
import { Header } from "./components/header/header";
import "bootstrap/dist/css/bootstrap.css";
import 'bootstrap';
import { SearchMovies } from "./pages/search-movies/search-movies";
import { Movies } from "./pages/movies/movies";
import {Carousel} from "./components/carousel/carousel"
import "./App.css"

const tab = {
  search: "search",
  movies: "movies",
};

function App() {
  const [searchQuery, setSearchQuery] = useState("2000");
  const [activeTab, setActiveTab] = useState(tab.search);

  return (
    <div>
      
    <div>
      <Header searchQuery={searchQuery} onSearch={setSearchQuery} />
      <ul className="nav nav-tabs ">
        <li className="nav-item">
          <button
            onClick={() => setActiveTab(tab.search)}
            className="nav-link active active-button text-white"
          >
            Search Movies
          </button>
        </li>
        <li className="nav-item">
          <button onClick={() => setActiveTab(tab.movies)} className="nav-link text-white anactive-button">
            My Movie List
          </button>
        </li>
      </ul>
      <Carousel  />
      {activeTab === tab.search ? (
        <SearchMovies searchQuery={searchQuery} />
      ) : (
        <Movies />
      )}
      

      <main className="container mt-4"></main>
    </div>
    
    </div>
  );
}

export default App;

