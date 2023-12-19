import React from 'react'

export default function Button({
  onClick,
  children,
}: {
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      className="border border-slate-200 bg-slate-100 p-1"
      onClick={onClick}
    >
      {children}
    </button>
  )
}
