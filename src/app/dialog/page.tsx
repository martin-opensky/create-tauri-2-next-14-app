'use client'
import { Button } from '@/components/button'
import { Text } from '@/components/text'
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
      <Button color="light" onClick={triggerAsk}>
        Ask Dialog
      </Button>
      <Button color="light" onClick={triggerConfirm}>
        Confirm Dialog
      </Button>
      <Text>{output}</Text>
    </>
  )
}
