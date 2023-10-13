'use client'
import React, { useContext } from 'react'
import Explorer from '@/app/components/Explorer/Explorer'
import { ExplorerContext } from '@/app/store/ExplorerContext'

const Vault: React.FC = () => {
  const { activePath, activeInode } = useContext(ExplorerContext)

  return (
    <>
      <Explorer />
      <section className='p-2 bg-[#1e293b] sm:p-4 flex-1 h-full flex flex-col'>
        <div> {activePath}</div>
        <textarea
          className='bg-inherit break-words flex-1 whitespace-pre-wrap border'
          value={
            activeInode.name.includes('.txt')
              ? activeInode.data || ''
              : 'This is not a text file'
          }
        />
      </section>
    </>
  )
}

export default Vault
