export default async function getNews() {
  const res = await fetch('https://khulo.gov.ge/api/news.php?lang=geo')
  if (!res.ok) { throw new Error('failed to fetch') }
  return res.json()
}
