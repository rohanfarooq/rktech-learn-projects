import { NavLink, Outlet } from 'react-router'
import { useCartStore, selectCount } from '../cart/useCartStore.js'
import { useWishlist } from '../wishlist/useWishlist.js'

export default function Layout() {
  const count = useCartStore(selectCount)
  const { data: wishlist } = useWishlist()

  return (
    <div className="app">
      <header className="header">
        <NavLink to="/" className="logo">
          Mini<span>Shop</span>
        </NavLink>
        <nav className="nav">
          <NavLink to="/" end>Shop</NavLink>
          <NavLink to="/wishlist">
            Wishlist <span className="badge">{wishlist?.length ?? 0}</span>
          </NavLink>
          <NavLink to="/cart">
            Cart <span className="badge">{count}</span>
          </NavLink>
        </nav>
      </header>

      <main className="main">
        <Outlet />
      </main>

      <footer className="footer">
        Demo shop: products from the free Fake Store API, no real payments
      </footer>
    </div>
  )
}
