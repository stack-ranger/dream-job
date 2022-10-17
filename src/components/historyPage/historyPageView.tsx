import { Table } from 'flowbite-react'
import { Session } from 'next-auth'
import Link from 'next/link'
import React from 'react'
import { Search } from '~/stores/historyStore'
import JobListView from '../jobList/jobListView'
const { Children } = React;

export default function HistoryPageView({
  session,
  isHistoryLoading,
  isJobsLoading,
  searches,
  savedJobs,
  loading,
}: {
  session: Session | null
  isHistoryLoading: boolean
  isJobsLoading: boolean
  searches: Search[]
  savedJobs: any[]
  loading: boolean
}) {

  return (
    <div className="flex flex-col items-center justify-center w-full pb-10">
      <h1 className="text-3xl mt-4 mb-4">Searches</h1>
      <div >
        {session && isHistoryLoading && (
          <div>Fetching history...</div>
        )}
        {session && !isHistoryLoading && searches?.length > 0 && (
          <div className='flex flex-col text-center gap-3'>
            <span>Latest 5 searches</span>
            <SearchesTable searches={searches.slice(0, 5)} />
          </div>
        )}
        {session && !isHistoryLoading && searches?.length === 0 && (
          <Link href="/">History is empty, make your first research</Link>
        )}
        {!session && (
          <span>Login to see history</span>
        )}
      </div>

      <h1 className="text-3xl mt-8 mb-4">Saved Jobs</h1>
      <div className='w-full flex justify-center'>
        {session && isJobsLoading && (
          <div>Fetching jobs...</div>
        )}
        {session && !isJobsLoading && savedJobs?.length > 0 && (
          <JobListView jobs={savedJobs} loading={loading} skills={[]} jobsPerQuery={100} />
        )}
        {session && !isJobsLoading && savedJobs?.length === 0 && (
          <Link href="/">There are no jobs saved, save one after a search</Link>
        )}
        {!session && (
          <span>Login to see saved jobs</span>
        )}
      </div>
    </div>
  )
}

const SearchesTable = ({searches}: {searches: Search[]}) => {

  return (
    <Table striped={true}>
      <Table.Head>
        <Table.HeadCell>
          Seach type
        </Table.HeadCell>
        <Table.HeadCell>
          Date
        </Table.HeadCell>
        <Table.HeadCell>
          Params
        </Table.HeadCell>
        <Table.HeadCell>
          <span className="sr-only">
            View
          </span>
        </Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {Children.toArray(searches.map((s: Search, index) => (
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" key={index}>
          <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
            {s.type}
          </Table.Cell>
          <Table.Cell>
            {s.createdAt}
          </Table.Cell>
          <Table.Cell>
            {s.params}
          </Table.Cell>
          <Table.Cell>
            <a
              href={`/${s.link}`}
              className="font-medium text-blue-600 hover:underline dark:text-blue-500"
            >
              View
            </a>
          </Table.Cell>
        </Table.Row>)
        ))}

      </Table.Body>
    </Table>
  )
}