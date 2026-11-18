import { Link } from 'react-router'
import { useCartStore, selectCount, selectTotal } from '../cart/useCartStore.js'
import { formatPrice } from '../format.js'

export default function Cart() {
  const cart = useCartStore((state) => state.cart)
  const setQty = useCartStore((state) => state.setQty)
  const remove = useCartStore((state) => state.remove)
  const count = useCartStore(selectCount)
  const total = useCartStore(selectTotal)

  if (cart.length === 0) {
    return (
      <div className="empty">
        <title>Cart | MiniShop</title>
        <h1>Your cart is empty</h1>
        <Link to="/" className="button">Start shopping</Link>
      </div>
    )
  }

  return (
    <div className="cart">
      <title>Cart | MiniShop</title>
      <h1>Your cart</h1>
      <ul className="cart-list">
        {cart.map((item) => (
          <li key={item.id} className="cart-row">
            <img src={item.image} alt="" />
            <Link to={`/product/${item.id}`} className="cart-title">{item.title}</Link>
            <div className="qty">
              <button
                aria-label="Decrease"
                onClick={() => setQty(item.id, item.qty - 1)}
              >
                −
              </button>
              <span>{item.qty}</span>
              <button
                aria-label="Increase"
                onClick={() => setQty(item.id, item.qty + 1)}
              >
                +
              </button>
            </div>
            <span className="line-total">{formatPrice(item.price * item.qty)}</span>
            <button className="remove" onClick={() => remove(item.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div className="summary">
        <p>Items: {count}</p>
        <p className="total">Total: {formatPrice(total)}</p>
        <Link to="/checkout" className="button">Go to checkout</Link>
      </div>
    </div>
  )
}
