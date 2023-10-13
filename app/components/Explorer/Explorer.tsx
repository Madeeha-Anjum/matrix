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
    <section className='flex flex-col overflow-y-scroll bg-gray-900 overscroll-auto w-2/5 min-w-fit m-2'>
      <ToolBar />
      <main className='pr-2'>
        <RootInode rootInode={inode} />
        <ExplorerInode files={inode.items} />
      </main>
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
