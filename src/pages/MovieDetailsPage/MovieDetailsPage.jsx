import { useParams } from 'react-router-dom';
import MovieDetails from '../../components/MovieDetails/MovieDetails';
import './MovieDetailsPage.css';
import { useEffect, useState } from 'react';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

function MovieDetailsPage() {
  const { imdbID } = useParams()
  const [film, setFilm] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const API_KEY = import.meta.env.VITE_OMDB_API_KEY

  useEffect(() => {
    async function loadFilm() {
      setError(null)
      setIsLoading(true)
      try {
        const url = `https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}`
        const response = await fetch(url)
        const data = await response.json()
        if (data.Response === 'False') {
          setError(data.Error)
        } else {
          setFilm(data)
        }
      } catch (err) {
        setError("Не удалось связаться с сервером")
      } finally {
        setIsLoading(false)
      }
    }
    loadFilm()
  }, [imdbID])

  return (
    <main className="movie-details-page">
      <div className="container">
        {isLoading ? (
          <Loader label="Загружаем фильм…" />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : film ? (
          <MovieDetails film={film} />
        ) : null}
      </div>
    </main>
  );
}

export default MovieDetailsPage;