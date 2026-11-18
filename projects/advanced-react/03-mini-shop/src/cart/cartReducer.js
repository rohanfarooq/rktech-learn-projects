export function cartReducer(cart, action) {
  switch (action.type) {
    case 'add': {
      const found = cart.find((item) => item.id === action.product.id)
      if (found) {
        return cart.map((item) =>
          item.id === found.id ? { ...item, qty: item.qty + 1 } : item,
        )
      }
      const { id, title, price, image } = action.product
      return [...cart, { id, title, price, image, qty: 1 }]
    }
    case 'setQty': {
      if (action.qty < 1) {
        return cart.filter((item) => item.id !== action.id)
      }
      return cart.map((item) =>
        item.id === action.id ? { ...item, qty: action.qty } : item,
      )
    }
    case 'remove':
      return cart.filter((item) => item.id !== action.id)
    case 'clear':
      return []
    default:
      throw new Error(`Unknown action: ${action.type}`)
  }
}

export function cartCount(cart) {
  return cart.reduce((sum, item) => sum + item.qty, 0)
}

export function cartTotal(cart) {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0)
}
