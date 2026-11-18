// fetch() only throws on a network failure.
// A 400 or 404 still resolves, and res.json() may be an error body.
async function getJSON(url) {
  const res = await fetch(url);
  return res.json(); // this runs even when res.ok is false
}
