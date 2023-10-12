import React, { useContext } from 'react'
import Icon from '../icons/icons'
import ExplorerInode from './ExplorerInode'
import { ExplorerContext } from '@/app/store/ExplorerContext'

const Explorer: React.FC = () => {
  const {
    inode,
    deleteInode,
    addFolder,
    addFile,
    addToCutQue,
    pasteInParentFolder,
  } = useContext(ExplorerContext)

  return (
    <section className='flex flex-col overflow-y-scroll bg-gray-900 overscroll-auto w-2/5 min-w-fit m-2'>
      <aside className='flex justify-end space-x-4 p-2 mb-2 bg-gray-800 rounded-md'>
        {/*  create a drop down to name the folder   */}
        <Icon.AddFolder
          className='w-6 h-6 cursor-pointer'
          onClick={() => addFolder('New Folder')}
        />
        <Icon.Cut className='w-6 h-6 cursor-pointer' onClick={addToCutQue} />
        <Icon.Paste
          className='w-6 h-6 cursor-pointer'
          onClick={pasteInParentFolder}
        />
        <Icon.Trash className='w-5 h-6 cursor-pointer' onClick={deleteInode} />
      </aside>
      <main>
        <div className='flex justify-start space-x-2 m-1 p-1 border-b border-l-2'>
          <Icon.Folder className='text-gray-600'></Icon.Folder>

          <div key={inode.id}>{inode.name}</div>
        </div>
        {<ExplorerInode files={inode.items} />}
      </main>
      <div className='mt-auto p-2 opacity-40'>
        <p className='text-sm text-center m-2'>Browse for a file to upload</p>
        <div className='flex justify-center' onClick={addFile}>
          <Icon.Upload className='w-6 h-6' />
        </div>
      </div>
    </section>
  )
}

export default Explorer
