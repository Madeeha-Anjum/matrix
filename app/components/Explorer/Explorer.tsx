import React from 'react'
import Icon from '../icons/icons'
import FileExplorer from './FileExplorer'
import ExplorerType from '@/app/models/ExplorerType'

type Props = {
  dir: ExplorerType
  displayFile: (id: number) => void
}

const Explorer: React.FC<Props> = ({ dir, displayFile }) => {
  const onFileClick = (id: number) => {
    displayFile(id)
  }

  // TODO: add buttons for creating new files and folders

  return (
    <section className='p-2 overflow-y-scroll bg-gray-900 overscroll-auto sm:p-4 w-2/5 min-w-fit'>
      <div className='flex justify-start space-x-2'>
        <Icon.Folder></Icon.Folder>
        <div key={dir.id}>{dir.name}</div>
      </div>
      <FileExplorer files={dir.items || []}></FileExplorer>
    </section>
  )
}

export default Explorer
