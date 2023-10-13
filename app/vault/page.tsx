'use client'
import React, { useContext } from 'react'
import Explorer from '@/app/components/Explorer/Explorer'
import { ExplorerContext } from '@/app/store/ExplorerContext'
import Search from '@/app/components/Search/Search'

const Vault: React.FC = () => {
  const { activePath, activeInode } = useContext(ExplorerContext)

  return (
    <>
      <Explorer />
      <section className='p-2 bg-[#1e293b] sm:p-4 flex-1 h-full flex flex-col'>
        <Search />
        <div
          className='
          text-sm
          text-gray-400
          font-mono
          flex
          items-center
          justify-between
          my-2
        '
        >
          Location: {activePath}
        </div>
        <textarea
          className='bg-inherit break-words flex-1 whitespace-pre-wrap text-sm border text-gray-300 font-mono p-2 resize-none outline-none w-full h-full'
          value={
            activeInode.name.includes('.txt')
              ? activeInode.data || ''
              : 'This is not a text file'
          }
          readOnly
        />
      </section>
    </>
  )
}

export default Vault
