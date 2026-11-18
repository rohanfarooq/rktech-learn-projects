import { useState } from 'react'
import { Link } from 'react-router'
import { useCart } from '../cart/CartContext.js'
import { cartCount, cartTotal } from '../cart/cartReducer.js'
import { formatPrice } from '../format.js'

export default function Checkout() {
  const { cart, dispatch } = useCart()
  const [order, setOrder] = useState(null)

  function handleSubmit(e) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    setOrder({
      number: Date.now().toString().slice(-6),
      name: form.get('name'),
      email: form.get('email'),
      total: cartTotal(cart),
    })
    dispatch({ type: 'clear' })
  }

  if (order) {
    return (
      <div className="done">
        <title>Order placed | MiniShop</title>
        <h1>Thank you, {order.name}!</h1>
        <p>Order #{order.number} is placed. Total: {formatPrice(order.total)}</p>
        <p>A (pretend) receipt is on its way to {order.email}.</p>
        <Link to="/" className="button">Keep shopping</Link>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className="empty">
        <title>Checkout | MiniShop</title>
        <h1>Nothing to check out</h1>
        <Link to="/" className="button">Start shopping</Link>
      </div>
    )
  }

  return (
    <div className="checkout">
      <title>Checkout | MiniShop</title>
      <h1>Checkout</h1>
      <p className="status">
        {cartCount(cart)} items, total {formatPrice(cartTotal(cart))}
      </p>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Full name
          <input name="name" required />
        </label>
        <label>
          Email
          <input name="email" type="email" required />
        </label>
        <label>
          Address
          <textarea name="address" rows="3" required />
        </label>
        <p className="note">This is a demo: no payment details, nothing is charged.</p>
        <button className="button">Place order</button>
      </form>
    </div>
  )
}
