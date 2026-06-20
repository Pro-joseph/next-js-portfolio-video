'use client'

import { useRef, useState } from 'react'
import { deleteResourceAction } from '@/app/admin/(dashboard)/actions'

interface DeleteButtonProps {
  model: string
  id: number
  path?: string
}

export function DeleteButton({ model, id, path: p }: DeleteButtonProps) {
  const [confirming, setConfirming] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const handleClick = () => {
    if (!confirming) {
      setConfirming(true)
      setTimeout(() => setConfirming(false), 3000)
      return
    }
    formRef.current?.requestSubmit()
  }

  return (
    <form ref={formRef} action={deleteResourceAction} style={{ display: 'inline' }}>
      <input type="hidden" name="model" value={model} />
      <input type="hidden" name="id" value={id} />
      {p && <input type="hidden" name="path" value={p} />}
      <button
        type="button"
        onClick={handleClick}
        style={{
          background: 'none', border: 'none', cursor: 'pointer',
          color: confirming ? '#ef4444' : 'var(--muted)', fontSize: '0.85rem',
          fontFamily: "'DM Sans', sans-serif", padding: 0,
        }}
      >
        {confirming ? 'Confirm delete' : 'Delete'}
      </button>
    </form>
  )
}
