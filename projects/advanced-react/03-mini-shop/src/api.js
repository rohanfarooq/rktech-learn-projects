const API = 'https://fakestoreapi.com'

export async function getProducts() {
  const res = await fetch(`${API}/products`)
  if (!res.ok) throw new Error('Could not load products')
  return res.json()
}

export async function getProduct(id) {
  const res = await fetch(`${API}/products/${id}`)
  if (!res.ok) throw new Error('Could not load this product')
  const text = await res.text()
  if (!text) return null // unknown id: the API sends an empty answer
  return JSON.parse(text)
}
