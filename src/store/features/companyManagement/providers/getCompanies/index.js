export default async () => new Promise((resolve) => setTimeout(() => {
  resolve(JSON.parse(window.localStorage.getItem('lean_companies')) || [])
}, 250))
