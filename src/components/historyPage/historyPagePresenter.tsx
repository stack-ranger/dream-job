import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import HistoryPageView from './historyPageView'
import useHistoryStore from '~/stores/historyStore'
import useJobStore from '~/stores/jobStore'

export default function HistoryPagePresenter() {
  const { searches, isHistoryLoading, reset, fetchSearches } =
    useHistoryStore()
  const {jobs, getAllSaved, loading} = useJobStore() 
  const session = useSession()

  useEffect(() => {
    console.log(session)
    if (session.status === 'authenticated') {
      fetchSearches()
      getAllSaved(true)
    } else {
      reset
    }
  }, [session.status, fetchSearches, getAllSaved])

  return (
    <HistoryPageView
      isPageLoading={session.status === "loading"}
      isLoggedIn={session.status === "authenticated"}
      isHistoryLoading={isHistoryLoading}
      isJobsLoading={loading}
      searches={searches ?? []}
      savedJobs={jobs ?? []}
    />
  )
}
