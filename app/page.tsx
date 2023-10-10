'use client'
import { useEffect, useState } from 'react'
import Container from '@/app/components/ui/Container'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const [vaultName, setVaultName] = useState('')

  useEffect(() => {
    if (localStorage.getItem('vault')) router.push('/vault')
  }, [router])

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!vaultName) return
    localStorage.setItem('vault', vaultName)
    router.push('/vault')
  }

  return (
    <main className='text-center '>
      <Container>
        <form className='space-x-2' onSubmit={onSubmitHandler}>
          <div className='inline-block h-10 w-34'>
            <label htmlFor='create_vault'></label>
            <input
              onChange={(e) => setVaultName(e.target.value)}
              type='text'
              id='create_vault'
              className='w-full h-full px-2 text-black border-2 rounded-md'
            />
          </div>
          <button
            type='submit'
            className='h-10 p-2 bg-white rounded-md w-34 text-black'
          >
            Create Vault
          </button>
        </form>
        <i className='text-xs text-black'>
          Note: you can be changed the name later{' '}
        </i>
      </Container>
    </main>
  )
}
