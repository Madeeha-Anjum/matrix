'use client'
import React, { useContext } from 'react'
import Explorer from '@/app/components/Explorer/Explorer'
import { ExplorerContext } from '@/app/store/ExplorerContext'

const Vault: React.FC = () => {
  const { inode, activeFileId, activePath } = useContext(ExplorerContext)

  return (
    <>
      <Explorer />
      <section className='p-2 bg-[#1e293b] sm:p-4 overscroll-auto'>
        <p className='text-white'>{activePath || 'No file selected'}</p>
      </section>
    </>
  )
}

export default Vault
