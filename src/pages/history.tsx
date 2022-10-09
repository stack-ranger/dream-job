import React from 'react'
import { trpc } from '~/utils/trpc'
import { useSession } from 'next-auth/react'

export default function History() {
  const { data: searches, isLoading } = trpc.useQuery(['searches.all'])
  const { data: session } = useSession()

  if (session && isLoading) return <div>Fetching history...</div>
  if (searches?.length === 0)
    return <div className="hover:cursor-pointer">History is empty, make your first research</div>

  return (
    <main className="flex flex-col items-center justify-center">
      <h1 className="text-3xl pt-4">Searches</h1>
      <div>
        {session ? (
          <div>
            <Searches />
          </div>
        ) : (
          <span>Login to see history</span>
        )}
      </div>
    </main>
  )
}

const Searches = () => {
  const { data: searches, isLoading } = trpc.useQuery(['searches.all'])

  if (isLoading) return <div>Fetching history...</div>
  if (searches?.length === 0)
    return <div className="hover:cursor-pointer">History is empty, make your first research</div>
  return (
    <div className="flex flex-col gap-4">
      {searches?.map((src, index) => {
        return (
          <div key={index}>
            <p>{src.query}</p>
          </div>
        )
      })}
    </div>
  )
}
