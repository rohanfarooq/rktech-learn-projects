import { Link } from 'react-router'

export default function MovieCard({ movie }) {
  return (
    <Link to={`/movie/${movie.id}`} className="card">
      <img src={movie.image} alt={movie.title} loading="lazy" />
      <div className="card-info">
        <h3>{movie.title}</h3>
        <p>
          {movie.release_date} • {movie.rt_score}%
        </p>
      </div>
    </Link>
  )
}
