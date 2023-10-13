import { ExplorerContext } from '@/app/store/ExplorerContext'
import React, { useContext } from 'react'
import Icon from '../icons/icons'
import Rename from './Rename'

const ToolBar: React.FC = () => {
  const {
    deleteActiveInode,
    addFolder,
    addToCutQue,
    pasteToParentFolderOfActiveInode,
  } = useContext(ExplorerContext)

  return (
    <aside className='flex justify-end space-x-4 p-2 mb-2 bg-gray-800 rounded-md relative'>
      <Icon.AddFolder
        className='w-6 h-6 cursor-pointer'
        onClick={() => addFolder('New Folder')}
      />
      <Rename />
      <Icon.Cut className='w-6 h-6 cursor-pointer' onClick={addToCutQue} />
      <Icon.Paste
        className='w-6 h-6 cursor-pointer'
        onClick={pasteToParentFolderOfActiveInode}
      />
      <Icon.Trash
        className='w-5 h-6 cursor-pointer'
        onClick={deleteActiveInode}
      />
    </aside>
  )
}

export default ToolBar
