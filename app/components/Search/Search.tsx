import React, { useContext, useState } from 'react'
import Button from '@/app/components/ui/Button'
import { ExplorerContext } from '@/app/store/ExplorerContext'
import classnames from 'classnames'

type Props = {}
const searchCss = 'py-2 px-3 max-w-full w-96'

const Search: React.FC<Props> = () => {
  const { setActiveFileId, searchResults, searchByName, getPathFromId } =
    useContext(ExplorerContext)
  const [searchValue, setSearchValue] = useState('')

  return (
    <>
      <form
        className='flex items-center justify-center space-x-2'
        onSubmit={(e) => {
          e.preventDefault()
          if (searchResults.length > 0) {
            setActiveFileId(searchResults[0].id)
          }
          setSearchValue('') // reset the input
          searchByName('') // reset the search results
        }}
      >
        <div className='relative '>
          <input
            type='text'
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value)
              searchByName(e.target.value)
            }}
            placeholder='Search files and folders by name'
            className={classnames(
              'rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-gray-800 backdrop-blur-lg bg-white/20 text-gray-300 ',
              searchCss
            )}
          />
          <div
            className={classnames('absolute top-full right-0', {
              hidden: searchResults.length == 0,
            })}
          >
            <div
              className={classnames(
                'border bg-purple-950/30 rounded-b-xl rounded-t-md backdrop-blur-lg backdrop-brightness-150',
                searchCss
              )}
            >
              {searchResults.map((result) => (
                <div
                  className=' hover:bg-white/30 rounded-md 
                  w-full  cursor-pointer
                  p-2 m-2'
                  key={result.id}
                  onClick={() => {
                    setActiveFileId(result.id)
                    setSearchValue('') // reset the input
                    searchByName('') // reset the search results
                  }}
                >
                  <div className='flex justify-between'>
                    <p>{result.name}</p>
                    <p className='opacity-50'>{getPathFromId(result.id)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Button className='bg-purple-950/30' type='submit'>
          Search
        </Button>
      </form>
    </>
  )
}

export default Search
