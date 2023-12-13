'use client'

import { useState, useEffect } from 'react'
import { invoke } from '@tauri-apps/api/primitives'
import { ask, confirm, open } from '@tauri-apps/plugin-dialog'
import { readTextFile, writeTextFile } from '@tauri-apps/plugin-fs'
import { Command } from '@tauri-apps/plugin-shell'

export default function ActionBar() {
  const [msg, setMsg] = useState('Hello World!')
  const [fileContents, setFileContents] = useState('')
  const [filePath, setFilePath] = useState<string | undefined>()

  useEffect(() => {
    if (filePath) {
      const loadFile = async () => {
        const contents = await readTextFile(filePath)
        console.log(contents, filePath)
        setFileContents(contents)
      }

      loadFile()
    } else {
      setFileContents('')
    }
  }, [filePath])

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

  const triggerOpen = async () => {
    const _file = await open({
      filters: [
        {
          name: 'Text files',
          extensions: ['md', 'txt'],
        },
      ],
    })

    if (!_file) return

    console.log(_file?.path)

    setFilePath(_file?.path)
    setMsg(`Open: ${_file?.name}`)
  }

  const triggerWrite = async (contents: string) => {
    if (!filePath) return

    await writeTextFile(filePath, contents)

    setMsg(`Write to: ${filePath}`)
  }

  const triggerCommand = async () => {
    const result = await Command.create('run-node-version', ['-v']).execute()

    if (result.stdout) {
      console.log('stdout', result.stdout)
      setMsg(result.stdout)
    } else if (result.stderr) {
      console.log('stderr', result.stderr)
      setMsg(result.stderr)
    }
  }

  return (
    <>
      <section className="mx-52 flex flex-row justify-center gap-2 p-2">
        <Button text="Invoke" onClick={invokeGreet} />
        <Button text="Dialog" onClick={triggerAsk} />
        <Button text="Confirm" onClick={triggerConfirm} />
        <Button text="Open" onClick={triggerOpen} />
        <Button text="Write" onClick={() => triggerWrite(fileContents)} />
        <Button text="Command" onClick={triggerCommand} />
      </section>
      <div className="m-2 flex justify-center">{msg}</div>

      {fileContents && (
        <textarea
          className="m-2 flex h-44 justify-center p-2"
          onChange={(e) => setFileContents(e.target.value)}
          value={fileContents}
        />
      )}
    </>
  )
}

interface ButtonProps {
  text: string
  onClick: () => void
}

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button
      className="rounded bg-green-800/50 px-4 py-2 font-bold text-slate-100 hover:bg-green-800/70"
      onClick={onClick}
    >
      {text}
    </button>
  )
}
