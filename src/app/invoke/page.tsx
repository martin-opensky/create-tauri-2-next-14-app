'use client'
import { Button } from '@/components/button'
import { Text } from '@/components/text'
import { invoke } from '@tauri-apps/api/core'
import { useState } from 'react'

export default function Invoke() {
  const [output, setOutput] = useState<string>('')

  const invokeGreet = async () => {
    const msg: string = await invoke('greet', { name: 'World' })

    setOutput(msg)
  }

  return (
    <>
      <Button color="light" onClick={invokeGreet}>
        Invoke Greet
      </Button>
      <Text>{output}</Text>
    </>
  )
}
