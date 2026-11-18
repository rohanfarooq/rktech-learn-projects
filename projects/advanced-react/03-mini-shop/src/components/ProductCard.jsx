import { Link } from 'react-router'
import { useCart } from '../cart/CartContext.js'
import { formatPrice } from '../format.js'

export default function ProductCard({ product }) {
  const { dispatch } = useCart()

  return (
    <div className="card">
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.title} />
        <h3>{product.title}</h3>
      </Link>
      <div className="card-foot">
        <span className="price">{formatPrice(product.price)}</span>
        <button onClick={() => dispatch({ type: 'add', product })}>
          Add to cart
        </button>
      </div>
    </div>
  )
}
