'use client'
import React from 'react'
import data from '@/app/data/files'
import Explorer from '../components/Explorer/Explorer'

const Vault: React.FC = () => {
  const dir = data[0]
  const [selectedPath, setSelectedPath] = React.useState<string>('')
  const [selectedFile, setSelectedFile] = React.useState<string>('')

  const displayFile = (id: number) => {
    console.log('Here is the id: ', id)

    data.forEach((dir) => {
      if (dir.items) {
        dir.items.forEach((item) => {
          if (item.id === id) {
            setSelectedFile(item?.name || '')
            setSelectedPath(dir.path || '')
          }
        })
      }
    })
  }

  return (
    <>
      <Explorer dir={dir} displayFile={displayFile}></Explorer>

      <section className='p-2 bg-[#1e293b] sm:p-4 overscroll-auto'>
        <p className='text-white'>
          {selectedPath}, {selectedFile}
        </p>
      </section>
    </>
  )
}

export default Vault
