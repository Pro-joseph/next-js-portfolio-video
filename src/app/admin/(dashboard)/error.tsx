'use client'

export default function AdminError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ color: '#ef4444', marginBottom: '1rem', fontFamily: "'DM Sans', sans-serif" }}>Error: {error.message}</h2>
      <button onClick={reset} className="btn-primary">Try Again</button>
    </div>
  )
}
