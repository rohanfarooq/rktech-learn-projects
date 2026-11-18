import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCartStore = create(
  persist(
    (set) => ({
      cart: [],

      add: (product) =>
        set((state) => {
          const found = state.cart.find((item) => item.id === product.id)
          if (found) {
            return {
              cart: state.cart.map((item) =>
                item.id === found.id ? { ...item, qty: item.qty + 1 } : item,
              ),
            }
          }
          const { id, title, price, image } = product
          return { cart: [...state.cart, { id, title, price, image, qty: 1 }] }
        }),

      setQty: (id, qty) =>
        set((state) => ({
          cart:
            qty < 1
              ? state.cart.filter((item) => item.id !== id)
              : state.cart.map((item) => (item.id === id ? { ...item, qty } : item)),
        })),

      remove: (id) =>
        set((state) => ({ cart: state.cart.filter((item) => item.id !== id) })),

      clear: () => set({ cart: [] }),
    }),
    { name: 'minishop-cart' },
  ),
)

// selectors: small functions that pick one value from the store
export const selectCount = (state) =>
  state.cart.reduce((sum, item) => sum + item.qty, 0)

export const selectTotal = (state) =>
  state.cart.reduce((sum, item) => sum + item.price * item.qty, 0)
