import MovieCard from '../MovieCard/MovieCard';
import './MovieList.css';

function MovieList({ films }) {
  return (
    <ul className="movie-list">
      {films.map((film) => (
        <li key={film.imdbID}>
          <MovieCard film={film} />
        </li>
      ))}
    </ul>
  );
}

export default MovieList;