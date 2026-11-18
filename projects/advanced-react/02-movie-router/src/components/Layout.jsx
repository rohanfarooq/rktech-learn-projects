import { NavLink, Outlet } from 'react-router'

export default function Layout() {
  return (
    <div className="app">
      <header className="header">
        <NavLink to="/" className="logo">
          Movie<span>Shelf</span>
        </NavLink>
        <nav className="nav">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/search">Search</NavLink>
        </nav>
      </header>

      <main className="main">
        <Outlet />
      </main>

      <footer className="footer">
        Movie data from the free Studio Ghibli API
      </footer>
    </div>
  )
}
