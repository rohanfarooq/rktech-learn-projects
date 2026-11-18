import { Link } from 'react-router'
import { useCart } from '../cart/CartContext.js'
import { cartCount, cartTotal } from '../cart/cartReducer.js'
import { formatPrice } from '../format.js'

export default function Cart() {
  const { cart, dispatch } = useCart()

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
                onClick={() => dispatch({ type: 'setQty', id: item.id, qty: item.qty - 1 })}
              >
                −
              </button>
              <span>{item.qty}</span>
              <button
                aria-label="Increase"
                onClick={() => dispatch({ type: 'setQty', id: item.id, qty: item.qty + 1 })}
              >
                +
              </button>
            </div>
            <span className="line-total">{formatPrice(item.price * item.qty)}</span>
            <button className="remove" onClick={() => dispatch({ type: 'remove', id: item.id })}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div className="summary">
        <p>Items: {cartCount(cart)}</p>
        <p className="total">Total: {formatPrice(cartTotal(cart))}</p>
        <Link to="/checkout" className="button">Go to checkout</Link>
      </div>
    </div>
  )
}
