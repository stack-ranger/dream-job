import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import HistoryPageView from './historyPageView'
import useHistoryStore from '~/stores/historyStore'
import useJobStore from '~/stores/jobStore'

export default function HistoryPagePresenter() {
  const { searches, isHistoryLoading, reset, fetchSearches } =
    useHistoryStore()
  const {jobs, getAllSaved, loading, resetJobs} = useJobStore() 
  const { status } = useSession()

  useEffect(() => {
    if (status === 'authenticated') {
      fetchSearches()
      getAllSaved(true)
    } else {
      reset
    }

    return () => {
      resetJobs()
    }
  }, [status, fetchSearches, getAllSaved])

  return (
    <HistoryPageView
      isPageLoading={status === "loading"}
      isLoggedIn={status === "authenticated"}
      isHistoryLoading={isHistoryLoading}
      isJobsLoading={loading}
      searches={searches ?? []}
      savedJobs={jobs ?? []}
    />
  )
}
