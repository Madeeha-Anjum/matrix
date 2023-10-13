import { ExplorerContext } from '@/app/store/ExplorerContext'
import React, { useContext, useRef } from 'react'

type Props = {
  children: React.ReactNode
}

const Upload: React.FC<Props> = ({ children }) => {
  const inputFile = useRef<HTMLInputElement | null>(null)
  const { addFile } = useContext(ExplorerContext)

  const onFileChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target?.files?.[0]

    if (selectedFile) {
      const reader = new FileReader()

      reader.onload = (e) => {
        const fileContent = e.target?.result
        addFile(selectedFile.name, fileContent as string | '')
      }

      reader.readAsText(selectedFile, 'UTF-8')
    }
    // Reset the input value
    if (inputFile.current) {
      inputFile.current.value = ''
    }
  }

  const openFileInput = () => {
    inputFile.current?.click()
  }

  return (
    <>
      <input
        ref={inputFile}
        className='bg-red-900 w-90'
        type='file'
        id='file'
        style={{ display: 'none' }}
        onChange={onFileChangeHandler}
      />

      <div onClick={() => openFileInput()}>{children}</div>
    </>
  )
}

export default Upload
