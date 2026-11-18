// A pretend server for the wishlist. It saves in localStorage,
// but every call is async and takes a moment, like a real API.
const KEY = 'minishop-wishlist'
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
const read = () => JSON.parse(localStorage.getItem(KEY) ?? '[]')

export async function getWishlist() {
  await wait(300)
  return read()
}

export async function toggleWishlist(product) {
  await wait(300)
  const list = read()
  const { id, title, price, image } = product
  const next = list.some((item) => item.id === id)
    ? list.filter((item) => item.id !== id)
    : [...list, { id, title, price, image }]
  localStorage.setItem(KEY, JSON.stringify(next))
  return next
}
