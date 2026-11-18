import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router'
import { getProduct } from '../api.js'
import { useCartStore } from '../cart/useCartStore.js'
import { formatPrice } from '../format.js'
import { useWishlist, useToggleWishlist } from '../wishlist/useWishlist.js'

export default function ProductDetails() {
  const { id } = useParams()
  const add = useCartStore((state) => state.add)
  const qtyInCart = useCartStore(
    (state) => state.cart.find((item) => String(item.id) === id)?.qty ?? 0,
  )
  const { data: product, isPending, isError, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProduct(id),
  })
  const wishlist = useWishlist()
  const toggle = useToggleWishlist()

  if (isPending) return <p className="status">Loading...</p>
  if (isError) return <p className="error">{error.message}</p>

  if (!product) {
    return (
      <div className="not-found">
        <h1>Product not found</h1>
        <p>We couldn't find a product with that ID.</p>
        <Link to="/" className="button">Back to the shop</Link>
      </div>
    )
  }

  const saved = wishlist.data?.some((item) => item.id === product.id) ?? false

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
        <div className="actions">
          <button className="button" onClick={() => add(product)}>
            Add to cart
          </button>
          <button
            className="wish"
            onClick={() => toggle.mutate(product)}
            disabled={toggle.isPending || wishlist.isPending}
          >
            {toggle.isPending ? 'Saving...' : saved ? '♥ In your wishlist' : '♡ Add to wishlist'}
          </button>
        </div>
        {qtyInCart > 0 && (
          <p className="in-cart">
            In your cart: {qtyInCart}. <Link to="/cart">Go to cart</Link>
          </p>
        )}
      </div>
    </article>
  )
}
