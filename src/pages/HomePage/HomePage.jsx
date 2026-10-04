import SearchBar from '../../components/SearchBar/SearchBar';
import MovieList from '../../components/MovieList/MovieList';
import './HomePage.css';
import { useState } from 'react';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

function HomePage() {
  const [query, setQuery] = useState('')
  const [films, setFilms] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

  async function handleSearch() {
    setError(null)
    setIsLoading(true)
    try {
      const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(query)}`
      const response = await fetch(url)
      const data = await response.json()
      if (data.Response === 'False') {
        setError(data.Error)
      } else {
        setFilms(data.Search)
      }
    } catch (err) {
      setError("Не удалось связаться с сервером")
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <main className="home-page">
      <div className="container home-page__inner">
        <SearchBar currentquery={query} updatestatus={setQuery} onSubmit={handleSearch} />
        <section className="home-page__section">
          <h2 className="home-page__section-title">Результат поиска</h2>
          {isLoading ? (
            <Loader label="Загрузка..." />
          ) : error ? (
            <ErrorMessage message={error} />
          ) : films ? (
            <MovieList films={films} />
          ) : (
            // <p>Введите название.</p>
            ""
          )}
        </section>
      </div>
    </main>
  );
}

export default HomePage;
