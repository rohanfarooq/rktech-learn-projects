import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import { getProduct } from '../api.js'
import { useCartStore } from '../cart/useCartStore.js'
import { formatPrice } from '../format.js'

export default function ProductDetails() {
  const { id } = useParams()
  const add = useCartStore((state) => state.add)
  const qtyInCart = useCartStore(
    (state) => state.cart.find((item) => String(item.id) === id)?.qty ?? 0,
  )
  const [result, setResult] = useState(null)

  useEffect(() => {
    let ignore = false
    getProduct(id)
      .then((product) => {
        if (!ignore) setResult({ id, product })
      })
      .catch((err) => {
        if (!ignore) setResult({ id, error: err.message })
      })
    return () => {
      ignore = true
    }
  }, [id])

  if (!result || result.id !== id) return <p className="status">Loading...</p>
  if (result.error) return <p className="error">{result.error}</p>

  const product = result.product
  if (!product) {
    return (
      <div className="not-found">
        <h1>Product not found</h1>
        <p>We couldn't find a product with that ID.</p>
        <Link to="/" className="button">Back to the shop</Link>
      </div>
    )
  }

  return (
    <article className="details">
      <title>{`${product.title} | MiniShop`}</title>
      <img src={product.image} alt={product.title} />
      <div>
        <p className="category">{product.category}</p>
        <h1>{product.title}</h1>
        <p className="rating">
          ★ {product.rating.rate} ({product.rating.count} reviews)
        </p>
        <p className="big-price">{formatPrice(product.price)}</p>
        <p>{product.description}</p>
        <button className="button" onClick={() => add(product)}>
          Add to cart
        </button>
        {qtyInCart > 0 && (
          <p className="in-cart">
            In your cart: {qtyInCart}. <Link to="/cart">Go to cart</Link>
          </p>
        )}
      </div>
    </article>
  )
}
