const API = 'https://fakestoreapi.com'
export const PER_PAGE = 8

// Fake Store has no ?page= option, so we ask for enough products
// with ?limit= and keep just the products for this page
export async function getProductsPage(page) {
  const res = await fetch(`${API}/products?limit=${page * PER_PAGE + 1}`)
  if (!res.ok) throw new Error('Could not load products')
  const all = await res.json()
  return {
    products: all.slice((page - 1) * PER_PAGE, page * PER_PAGE),
    hasMore: all.length > page * PER_PAGE,
  }
}

export async function getProduct(id) {
  const res = await fetch(`${API}/products/${id}`)
  if (!res.ok) throw new Error('Could not load this product')
  const text = await res.text()
  if (!text) return null // unknown id: the API sends an empty answer
  return JSON.parse(text)
}
