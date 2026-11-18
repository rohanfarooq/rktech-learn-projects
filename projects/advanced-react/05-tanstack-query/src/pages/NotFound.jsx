import { Link, useLocation } from 'react-router'

export default function NotFound() {
  const location = useLocation()

  return (
    <div className="not-found">
      <title>Page not found | MiniShop</title>
      <h1>404</h1>
      <p>
        There's no page at <code>{location.pathname}</code>
      </p>
      <Link to="/" className="button">Back to the shop</Link>
    </div>
  )
}
