'use client'

import { useState } from 'react'
import { invoke } from '@tauri-apps/api/primitives'
import { ask, confirm } from '@tauri-apps/plugin-dialog'

export default function ActionBar() {
  const [msg, setMsg] = useState('Hello World!')

  const invokeGreet = async () => {
    const msg: string = await invoke('greet', { name: 'World' })

    setMsg(msg)
  }

  const triggerAsk = async () => {
    const answer = await ask('This action cannot be reverted. Are you sure?', {
      title: 'Tauri',
      type: 'error',
    })

    console.log(answer)

    setMsg(`Ask: ${answer.toString()}`)
  }

  const triggerConfirm = async () => {
    const confirmation = await confirm(
      'This action cannot be reverted. Are you sure?',
    )

    console.log(confirmation)

    setMsg(`Confirm: ${confirmation.toString()}`)
  }

  return (
    <>
      <section className="mx-52 flex flex-row justify-center gap-2 p-2">
        <button
          className="rounded bg-green-800/50 px-4 py-2 font-bold text-slate-100 hover:bg-green-800/70"
          onClick={invokeGreet}
        >
          Invoke
        </button>

        <button
          className="rounded bg-green-800/50 px-4 py-2 font-bold text-slate-100 hover:bg-green-800/70"
          onClick={triggerAsk}
        >
          Dialog
        </button>
        <button
          className="rounded bg-green-800/50 px-4 py-2 font-bold text-slate-100 hover:bg-green-800/70"
          onClick={triggerConfirm}
        >
          Confirm
        </button>
      </section>
      <div className="m-2 flex justify-center">{msg}</div>
    </>
  )
}
