import React, { useContext } from 'react'
import ExplorerInode from './ExplorerInode'
import { ExplorerContext } from '@/app/store/ExplorerContext'
import RootInode from './RootInode'
import ToolBar from './ToolBar'
import Upload from './Upload'
import Icon from '../icons/icons'

const Explorer: React.FC = () => {
  const { inode } = useContext(ExplorerContext)

  return (
    <section className='flex flex-col bg-gray-900  min-w-fit w-1/5 m-2'>
      <ToolBar />
      <div className='flex-grow'>
        <main className='p-2'>
          <RootInode rootInode={inode} />
          <ExplorerInode files={inode.items} />
        </main>
      </div>
      <div className='mt-auto p-2 opacity-40 cursor-pointer'>
        <Upload>
          <p className='text-sm text-center m-2'>Browse for a file to upload</p>
          <div className='flex justify-center'>
            <Icon.Upload className='w-6 h-6' />
          </div>
        </Upload>
      </div>
    </section>
  )
}

export default Explorer
