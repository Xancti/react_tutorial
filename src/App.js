import { useState, useEffect } from 'react';

import MovieCard from './MovieCard';

import './app.css';
import SearchIcon from './search.svg';

const API_URL = 'http://www.omdbapi.com?apikey=cd1093b8'

const props = {
    "Title": "Rogue One: A Star Wars Story",
    "Year": "2016",
    "imdbID": "tt3748528",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMjEwMzMxODIzOV5BMl5BanBnXkFtZTgwNzg3OTAzMDI@._V1_SX300.jpg"
}

const App = () => {

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearch] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies('Star Wars');
    }, [])

    return (
      <div className="app">
        <h1>MovieLand</h1>

        <div className='search'>
            <input 
            placeholder='Search for movies'
            value={searchTerm}
            onChange={(e) => setSearch(e.target.value)} 
            />
            <img 
            src={SearchIcon}
            alt="search"
            onClick={() => searchMovies(searchTerm)}
            />
        </div>

        {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard props={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;