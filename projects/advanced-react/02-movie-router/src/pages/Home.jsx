import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { getMovies } from '../api.js'
import MovieCard from '../components/MovieCard.jsx'

export default function Home() {
  const [movies, setMovies] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    getMovies()
      .then(setMovies)
      .catch((err) => setError(err.message))
  }, [])

  const topRated = [...movies]
    .sort((a, b) => b.rt_score - a.rt_score)
    .slice(0, 6)

  return (
    <>
      <title>MovieShelf</title>
      <section className="hero">
        <h1>Find your next favourite movie</h1>
        <p>Browse every Studio Ghibli film, search by title, and open any movie to see the details.</p>
        <Link to="/search" className="button">Search movies</Link>
      </section>

      <h2>Top rated</h2>
      {error && <p className="error">{error}</p>}
      {!error && movies.length === 0 && <p className="status">Loading movies...</p>}
      <div className="grid">
        {topRated.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  )
}
