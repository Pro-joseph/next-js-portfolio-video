'use client'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '4rem', color: 'var(--orange)', marginBottom: '1rem' }}>500</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1.1rem', marginBottom: '2rem' }}>Something went wrong</p>
        <button onClick={reset} className="btn-primary">Try Again</button>
      </div>
    </div>
  )
}
