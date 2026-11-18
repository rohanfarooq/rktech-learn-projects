import { useEffect, useReducer } from 'react'
import { CartContext } from './CartContext.js'
import { cartReducer } from './cartReducer.js'

const KEY = 'minishop-cart'

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) ?? []
  } catch {
    return []
  }
}

export default function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, null, loadCart)

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(cart))
  }, [cart])

  return (
    <CartContext value={{ cart, dispatch }}>
      {children}
    </CartContext>
  )
}
