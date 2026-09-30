import SearchBar from '../../components/SearchBar/SearchBar';
import MovieList from '../../components/MovieList/MovieList';
import './HomePage.css';
import { useEffect, useState } from 'react';

function HomePage() {
  const [query, setQuery] = useState("")
  const [films, setFilms] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
            const loadFilms = async () => {
              setError(null)
              setIsLoading(true)
                try {
                    const url = `http://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(query)}`
                    const response = await fetch(url)
                    const data = await response.json()
                    if (data.response) {
                      setFilms(data.Search)
                    } else {
                      setError(data.error)
                    }
                } catch (error) {
                    setError("Не удалось связаться с сервером")
                } finally {
                    setIsLoading(false)
                }
            }
            loadFilms()
        }, [])
    if (isLoading) return <Loader />
    if (!isLoading && error) return <p>{error}</p>
    if (films) return (
    <main className="home-page">
      <div className="container home-page__inner">
        <SearchBar currentquery={query} updatestatus={setQuery} onSubmit={loadFilms}/>
        <section className="home-page__section">
          <h2 className="home-page__section-title">Результат поиска</h2>
          <MovieList />
        </section>
      </div>
    </main>
  );
}

export default HomePage;
