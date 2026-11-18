const API = 'https://ghibliapi.vercel.app'

export async function getMovies() {
  const res = await fetch(`${API}/films`)
  if (!res.ok) throw new Error('Could not load movies')
  return res.json()
}

export async function getMovie(id) {
  const res = await fetch(`${API}/films/${id}`)
  if (res.status === 404) return null
  if (!res.ok) throw new Error('Could not load this movie')
  return res.json()
}
