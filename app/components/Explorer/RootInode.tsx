import React, {
  MutableRefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import Icon from '../icons/icons'
import Inode from '@/app/models/Inode'
import { ExplorerContext } from '@/app/store/ExplorerContext'

type Props = {
  rootInode: Inode
}

const RootInode: React.FC<Props> = ({ rootInode }) => {
  const { renameInodeFromId } = useContext(ExplorerContext)
  const [isVaultFocused, setIsVaultFocused] = useState(false)
  const [newName, setInputValue] = useState('')
  const inputRef = useRef() as MutableRefObject<HTMLInputElement>

  useEffect(() => {
    if (isVaultFocused) {
      inputRef.current.focus()
    } else {
      inputRef.current.blur()
    }
  }, [isVaultFocused])

  const handleInputBlur = () => {
    renameInodeFromId(newName, rootInode.id)
    setInputValue(rootInode.name)
  }

  return (
    <>
      <div className='flex space-x-2 m-1 p-1 border-b border-l-2 w-full justify-between'>
        <div className='flex space-x-2 w-full'>
          <Icon.Folder className='text-gray-600 w-8 h-6' />
          <input
            type='text'
            ref={inputRef}
            className='bg-inherit placeholder:text-white text-white w-full cursor-not-allowed pointer-events-none'
            autoComplete='off'
            placeholder={rootInode.name}
            value={newName}
            onBlur={() => {
              setIsVaultFocused(false)
              handleInputBlur()
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setIsVaultFocused(false)
              }
            }}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        <Icon.Rename
          className='w-6 h-6 cursor-pointer'
          onClick={() => setIsVaultFocused(true)}
        />
      </div>
    </>
  )
}

export default RootInode
