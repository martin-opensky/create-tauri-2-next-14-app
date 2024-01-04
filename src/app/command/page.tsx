'use client'
import { useState } from 'react'
import { Command } from '@tauri-apps/plugin-shell'
import { Button } from '@/components/button'
import { Text } from '@/components/text'

export default function Invoke() {
  const [output, setOutput] = useState<string>('')

  const triggerCommand = async () => {
    const result = await Command.create('run-node-version', ['-v']).execute()

    if (result.stdout) {
      setOutput(`Output: ${result.stdout}`)
    } else if (result.stderr) {
      setOutput(`Output: ${result.stderr}`)
    }
  }

  return (
    <>
      <Button
        color="light"
        className="border border-slate-200 bg-slate-100 p-1"
        onClick={triggerCommand}
      >
        Trigger Command
      </Button>
      <Text>{output}</Text>
    </>
  )
}
