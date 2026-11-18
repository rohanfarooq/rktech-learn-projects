import { Link } from 'react-router'
import { formatPrice } from '../format.js'
import { useWishlist, useToggleWishlist } from '../wishlist/useWishlist.js'

export default function Wishlist() {
  const { data: items, isPending } = useWishlist()
  const toggle = useToggleWishlist()

  if (isPending) return <p className="status">Loading your wishlist...</p>

  if (items.length === 0) {
    return (
      <div className="empty">
        <title>Wishlist | MiniShop</title>
        <h1>Your wishlist is empty</h1>
        <Link to="/" className="button">Find something you like</Link>
      </div>
    )
  }

  return (
    <div className="cart">
      <title>Wishlist | MiniShop</title>
      <h1>Your wishlist</h1>
      <ul className="cart-list">
        {items.map((item) => (
          <li key={item.id} className="cart-row wish-row">
            <img src={item.image} alt="" />
            <Link to={`/product/${item.id}`} className="cart-title">{item.title}</Link>
            <span className="line-total">{formatPrice(item.price)}</span>
            <button
              className="remove"
              onClick={() => toggle.mutate(item)}
              disabled={toggle.isPending}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
