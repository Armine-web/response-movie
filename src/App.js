import { useContext } from "react";
import { Header } from "./components/header/header";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css"
import 'bootstrap';
import { SearchMovies } from "./pages/search-movies/search-movies";
import { Movies } from "./pages/movies/movies";
import { Quiz } from "./pages/quiz/quiz"
import { MoviesProvider, tab, MoviesContext } from "./context/movies-context";
import "./App.css"



const Tabs = () => {
  const { setActiveTab, activeTab } = useContext(MoviesContext);

  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <button
          onClick={() => setActiveTab(tab.search)}
          className={`nav-link ${activeTab === tab.search ? 'active active-button' : ''} text-white`}
        >
          Search Movies
        </button>
      </li>
      <li className="nav-item">
        <button
          onClick={() => setActiveTab(tab.movies)}
          className={`nav-link ${activeTab === tab.movies ? 'active active-button' : ''} text-white`}
        >
          My Movie List
        </button>
      </li>
      <li className="nav-item">
        <button
          onClick={() => setActiveTab(tab.quiz)}
          className={`nav-link ${activeTab === tab.quiz ? 'active active-button' : ''} text-white`}
        >
          Quiz
        </button>
      </li>
    </ul>
  );
};

 
const Layout = () => {
  const { activeTab } = useContext(MoviesContext);
  return (
    <>
    {activeTab === tab.search && <SearchMovies />}
    {activeTab === tab.movies && <Movies />}
    {activeTab === tab.quiz && <Quiz />}
    </>
  )
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

