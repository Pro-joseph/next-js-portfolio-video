import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '5rem', color: 'var(--orange)', marginBottom: '0.5rem' }}>404</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1.1rem', marginBottom: '2rem' }}>Page not found</p>
        <Link href="/" className="btn-primary">Back Home</Link>
      </div>
    </div>
  )
}
