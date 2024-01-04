'use client'
import { useState, useEffect } from 'react'
import { open } from '@tauri-apps/plugin-dialog'
import { readTextFile, writeTextFile } from '@tauri-apps/plugin-fs'
import { Button } from '@/components/button'
import { Textarea } from '@/components/textarea'
import { Text } from '@/components/text'
import { FolderOpenIcon, BoltIcon } from '@heroicons/react/16/solid'

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
      <Button color="light" onClick={triggerOpen}>
        <FolderOpenIcon />
        Open MD File
      </Button>

      <Text>{output}</Text>
      {fileContents && (
        <>
          <Textarea
            className="flex h-44"
            onChange={(e) => setFileContents(e.target.value)}
            value={fileContents}
          />
          <Button outline onClick={() => triggerWrite(fileContents)}>
            <BoltIcon />
            Save
          </Button>
        </>
      )}
    </>
  )
}
