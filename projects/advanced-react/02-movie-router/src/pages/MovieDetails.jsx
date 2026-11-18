import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { getMovie } from '../api.js'

export default function MovieDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [result, setResult] = useState(null)

  useEffect(() => {
    let ignore = false
    getMovie(id)
      .then((movie) => {
        if (!ignore) setResult({ id, movie })
      })
      .catch((err) => {
        if (!ignore) setResult({ id, error: err.message })
      })
    return () => {
      ignore = true
    }
  }, [id])

  if (!result || result.id !== id) return <p className="status">Loading...</p>
  if (result.error) return <p className="error">{result.error}</p>

  const movie = result.movie
  if (!movie) {
    return (
      <div className="not-found">
        <h1>Movie not found</h1>
        <p>We couldn't find a movie with that ID.</p>
        <Link to="/search" className="button">Search movies</Link>
      </div>
    )
  }

  return (
    <article className="details">
      <title>{`${movie.title} | MovieShelf`}</title>
      <button className="back" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <img src={movie.movie_banner} alt="" className="banner" />
      <div className="details-body">
        <img src={movie.image} alt={movie.title} className="poster" />
        <div>
          <h1>{movie.title}</h1>
          <p className="original">{movie.original_title}</p>
          <ul className="facts">
            <li>Year: {movie.release_date}</li>
            <li>Director: {movie.director}</li>
            <li>Running time: {movie.running_time} min</li>
            <li>Rotten Tomatoes: {movie.rt_score}%</li>
          </ul>
          <p>{movie.description}</p>
        </div>
      </div>
    </article>
  )
}
