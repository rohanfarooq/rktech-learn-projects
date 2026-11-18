import { useEffect, useState } from 'react'
import { getProducts } from '../api.js'
import ProductCard from '../components/ProductCard.jsx'

export default function Home() {
  const [products, setProducts] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch((err) => setError(err.message))
  }, [])

  return (
    <>
      <title>MiniShop</title>
      <section className="hero">
        <h1>Everything you need, in one tiny shop</h1>
        <p>Pick a product, add it to your cart, and check out. It's a demo, so nothing is charged.</p>
      </section>
      {error && <p className="error">{error}</p>}
      {!error && products.length === 0 && <p className="status">Loading products...</p>}
      <div className="grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  )
}
