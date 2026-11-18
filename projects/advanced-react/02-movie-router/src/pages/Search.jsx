import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'
import { getMovies } from '../api.js'
import MovieCard from '../components/MovieCard.jsx'

export default function Search() {
  const [movies, setMovies] = useState([])
  const [error, setError] = useState('')
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') ?? '')

  useEffect(() => {
    getMovies()
      .then(setMovies)
      .catch((err) => setError(err.message))
  }, [])

  function handleChange(e) {
    const value = e.target.value
    setQuery(value)
    setSearchParams(value ? { q: value } : {}, { replace: true })
  }

  const text = query.trim().toLowerCase()
  const results = movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(text) ||
      movie.director.toLowerCase().includes(text),
  )

  return (
    <>
      <title>Search | MovieShelf</title>
      <h1>Search movies</h1>
      <input
        className="search"
        type="search"
        value={query}
        onChange={handleChange}
        placeholder="Try 'castle' or 'Miyazaki'"
        autoFocus
      />
      {error && <p className="error">{error}</p>}
      {movies.length > 0 && (
        <p className="status">
          {results.length} of {movies.length} movies
        </p>
      )}
      <div className="grid">
        {results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  )
}
