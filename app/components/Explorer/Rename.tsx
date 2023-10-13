import classnames from 'classnames'
import React, { useContext, useEffect, useState } from 'react'
import Icon from '../icons/icons'
import { ExplorerContext } from '@/app/store/ExplorerContext'

type Props = {}

const Rename: React.FC<Props> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { activeInode, renameInodeFromId: renameInode } =
    useContext(ExplorerContext)
  const [newName, setNewName] = useState('')

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
    // rename the inode
    console.log('Here we should rename the inode')
    console.log('Here ', activeInode)
    renameInode(newName, activeInode.id)
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
          'bg-white border rounded-lg shadow-lg mt-2 right-0 p-1 m-2 absolute min-w-max min-h-full',
          { hidden: !isModalOpen }
        )}
      >
        <div onClick={(e) => e.stopPropagation()}>
          <div className='flex justify-end'>
            <Icon.Close
              className='w-6 h-6 cursor-pointer'
              onClick={() => setIsModalOpen(false)}
            />
          </div>

          <form className='flex flex-col space-y-2' onSubmit={(e) => rename(e)}>
            <div>
              <h1 className='text-md'>Old Name</h1>
              <p className='w-full'>{activeInode?.name} </p>
            </div>

            <div>
              <label htmlFor='new_name'>
                <h1 className='text-md'>New name</h1>
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
