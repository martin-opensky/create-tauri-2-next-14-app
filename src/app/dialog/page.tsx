'use client'
import { ask, confirm } from '@tauri-apps/plugin-dialog'
import { useState } from 'react'

export default function Dialog() {
  const [output, setOutput] = useState<string>('')

  const triggerAsk = async () => {
    const answer = await ask('This action cannot be reverted. Are you sure?', {
      title: 'Tauri',
      type: 'error',
    })

    console.log(answer)

    setOutput(`Ask: ${answer.toString()}`)
  }

  const triggerConfirm = async () => {
    const confirmation = await confirm(
      'This action cannot be reverted. Are you sure?',
    )

    console.log(confirmation)

    setOutput(`Confirm: ${confirmation.toString()}`)
  }

  return (
    <>
      <button
        className="border border-slate-200 bg-slate-100 p-1"
        onClick={triggerAsk}
      >
        Ask Dialog
      </button>
      <button
        className="border border-slate-200 bg-slate-100 p-1"
        onClick={triggerConfirm}
      >
        Confirm Dialog
      </button>
      <div>{output}</div>
    </>
  )
}
