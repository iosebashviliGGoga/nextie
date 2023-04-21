export default async function getPressCenter() {
    const res = await fetch('https://khulo.gov.ge/api/site_menu1.php')
    if (!res.ok) { throw new Error('failed to fetch') }
    return res.json()
  }