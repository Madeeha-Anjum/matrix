import classnames from 'classnames'
import React, { use, useContext, useEffect, useState } from 'react'
import Icon from '../icons/icons'
import { ExplorerContext } from '@/app/store/ExplorerContext'

type Props = {}

const Rename: React.FC<Props> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { activeInode, renameInodeFromId: renameInode } =
    useContext(ExplorerContext)
  const [newName, setNewName] = useState('')

  useEffect(() => {
    setNewName(activeInode.name)
  }, [activeInode])

  // close the modal when clicking outside of it
  // prevent propagation of clicks inside the modal
  useEffect(() => {
    const close = () => setIsModalOpen(false)
    window.addEventListener('click', close)
    return () => window.removeEventListener('click', close)
  }, [])

  const rename = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsModalOpen(false)
    renameInode(newName, activeInode.id) // rename the inode
    setNewName('') // reset the input
  }

  return (
    <div className='relative text-black'>
      <Icon.Rename
        className='w-6 h-6 cursor-pointer text-white'
        onClick={(e) => {
          e.stopPropagation()
          setIsModalOpen(!isModalOpen)
        }}
      />
      <div
        className={classnames(
          'bg-white border rounded-lg shadow-lg mt-2 left-0 p-1 m-2 absolute min-w-max min-h-full',
          { hidden: !isModalOpen }
        )}
      >
        <div onClick={(e) => e.stopPropagation()}>
          <form className='flex flex-col' onSubmit={(e) => rename(e)}>
            <div>
              <label htmlFor='new_name' className='flex'>
                <h1 className='text-md text-center font-semibold'>Rename</h1>
                <Icon.Close
                  className='w-6 h-6 cursor-pointer basis-1 '
                  onClick={() => setIsModalOpen(false)}
                />
              </label>
              <input
                onChange={(e) => setNewName(e.target.value)}
                value={newName}
                id='new_name'
                autoComplete='off'
                className='border border-gray-400 rounded-md w-full'
              />
            </div>

            <button
              className='bg-blue-600 w-full text-white rounded-md p-1 mt-2'
              type='submit'
            >
              Rename
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Rename
