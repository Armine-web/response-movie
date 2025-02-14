import { useState, useContext } from "react";
import { Header } from "./components/header/header";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css"
import 'bootstrap';
import { SearchMovies } from "./pages/search-movies/search-movies";
import { Movies } from "./pages/movies/movies";
import { MoviesProvider, tab, MoviesContext } from "./context/movies-context";
import "./App.css"



const Tabs = () => {
  const { setActiveTab } = useContext(MoviesContext);
  return (
     
    <ul className="nav nav-tabs">
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
  );
};
 
const Layout = () => {
  const { activeTab } = useContext(MoviesContext);
  return activeTab === tab.search ? <SearchMovies /> : <Movies />;
};

function App() {
  return (
    <MoviesProvider>
      <div>
        <Header />
        <Tabs />
        <Layout />
        <main className="container mt-4"></main>
      </div>
    </MoviesProvider>      


  );
}

export default App;

