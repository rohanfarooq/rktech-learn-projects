import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { useSearchParams } from 'react-router'
import { getProductsPage } from '../api.js'
import ProductCard from '../components/ProductCard.jsx'

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = Number(searchParams.get('page')) || 1

  const { data, isPending, isError, error, isFetching, isPlaceholderData } = useQuery({
    queryKey: ['products', page],
    queryFn: () => getProductsPage(page),
    placeholderData: keepPreviousData, // keep the old page on screen while the next one loads
  })

  return (
    <>
      <title>MiniShop</title>
      <section className="hero">
        <h1>Everything you need, in one tiny shop</h1>
        <p>Pick a product, add it to your cart, and check out. It's a demo, so nothing is charged.</p>
      </section>
      {isPending && <p className="status">Loading products...</p>}
      {isError && <p className="error">{error.message}</p>}
      {data && (
        <>
          <div className={isPlaceholderData ? 'grid faded' : 'grid'}>
            {data.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="pager">
            <button
              className="button"
              onClick={() => setSearchParams({ page: page - 1 })}
              disabled={page === 1}
            >
              Previous
            </button>
            <span>
              Page {page}
              {isFetching && <span className="updating"> (updating...)</span>}
            </span>
            <button
              className="button"
              onClick={() => setSearchParams({ page: page + 1 })}
              disabled={isPlaceholderData || !data.hasMore}
            >
              Next
            </button>
          </div>
        </>
      )}
    </>
  )
}
