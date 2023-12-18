'use client'
import { useState, useEffect } from 'react'
import { open } from '@tauri-apps/plugin-dialog'
import { readTextFile, writeTextFile } from '@tauri-apps/plugin-fs'

export default function Dialog() {
  const [output, setOutput] = useState<string>('')
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
    setOutput(`Open: ${_file?.name}`)
  }

  const triggerWrite = async (contents: string) => {
    if (!filePath) return

    await writeTextFile(filePath, contents)

    setOutput(`Write to: ${filePath}`)
  }

  return (
    <>
      <button
        className="border border-slate-200 bg-slate-100 p-1"
        onClick={triggerOpen}
      >
        Open MD File
      </button>

      <div>{output}</div>
      {fileContents && (
        <>
          <textarea
            className="flex h-44 w-[calc(100%-16px)] justify-center border border-slate-200 p-2"
            onChange={(e) => setFileContents(e.target.value)}
            value={fileContents}
          />
          <button
            className="border border-slate-200 bg-slate-100 p-1"
            onClick={() => triggerWrite(fileContents)}
          >
            Save
          </button>
        </>
      )}
    </>
  )
}
