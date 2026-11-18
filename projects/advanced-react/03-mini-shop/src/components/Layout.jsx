import { NavLink, Outlet } from 'react-router'
import { useCart } from '../cart/CartContext.js'
import { cartCount } from '../cart/cartReducer.js'

export default function Layout() {
  const { cart } = useCart()
  const count = cartCount(cart)

  return (
    <div className="app">
      <header className="header">
        <NavLink to="/" className="logo">
          Mini<span>Shop</span>
        </NavLink>
        <nav className="nav">
          <NavLink to="/" end>Shop</NavLink>
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
