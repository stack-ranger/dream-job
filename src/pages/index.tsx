import type { NextPage } from 'next'
import { signIn, signOut, useSession } from 'next-auth/react'
import Head from 'next/head'
import { trpc } from '../utils/trpc'

const Home: NextPage = () => {
  // const hello = trpc.useQuery(["example.hello", { text: "from tRPC" }]);
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <main className="flex flex-col items-center pt-4">Loading...</main>
  }

  // const jobs = trpc.useQuery(["jobs.selected", { keywords: ["react", "typescript", "docker", "tailwind"] }]);
  // console.log(jobs);

  // const skills = trpc.useQuery(["skills.all", { role: "Frontend Developer", number: 20 }], {
  //   async onSuccess(data) {
  //     console.log(data);
  //   },
  // });

  return (
    <main className="flex flex-col items-center justify-center">
      <h1 className="text-3xl pt-4">Searches</h1>
      <div>
        {session ? (
          <div>
            <div>
              <p>hi {session.user?.name}</p>

              <button onClick={() => signOut()}>Logout</button>
            </div>
            <div className="mt-2">
              <Searches />
            </div>
          </div>
        ) : (
          <div>
            <div>
              <button onClick={() => signIn('google')}>
                Login with Google
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

const Searches = () => {
  const { data: searches, isLoading } = trpc.useQuery(['searches.getAll'])

  if (isLoading) return <div>Fetching history...</div>
  if (searches?.length === 0) return <div className='hover:cursor-pointer'>History is empty, make your first research</div>
  return (
    <div className="flex flex-col gap-4">
      {searches?.map((src, index) => {
        return (
          <div key={index}>
            <p>{src.query}</p>
            <span>- {src.result} -</span>
          </div>
        )
      })}
    </div>
  )
}

export default Home
