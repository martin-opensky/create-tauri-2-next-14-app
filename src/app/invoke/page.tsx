'use client'
import { invoke } from '@tauri-apps/api/primitives'
import { useState } from 'react'

export default function Invoke() {
  const [output, setOutput] = useState<string>('')

  const invokeGreet = async () => {
    const msg: string = await invoke('greet', { name: 'World' })

    setOutput(msg)
  }

  return (
    <>
      <button
        className="border border-slate-200 bg-slate-100 p-1"
        onClick={invokeGreet}
      >
        Invoke Greet
      </button>
      <div>{output}</div>
    </>
  )
}
