import React, { useState } from 'react'
import Button from '@/app/components/ui/Button'

type Props = {}

const Search: React.FC<Props> = () => {
  const [search, setSearch] = useState('')

  const searchSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(search)
  }
  return (
    <form
      className='flex items-center justify-center space-x-2'
      onSubmit={(e) => searchSubmitHandler(e)}
    >
      <input
        type='text'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder='Search files and folders by name'
        className='py-2 px-3 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-gray-800backdrop-blur-lg bg-white/20 text-gray-300 max-w-full w-96'
      />
      <Button type='submit'>Search</Button>
    </form>
  )
}

export default Search
