import React, { useEffect, useState } from 'react'
import { trpc } from '~/utils/trpc'
import { useSession } from 'next-auth/react'
import HistoryPageView from './historyPageView'
import useHistoryStore from '~/stores/historyStore'
import useJobStore from '~/stores/jobStore'

export default function HistoryPagePresenter() {
  const { searches, isHistoryLoading, isJobsLoading, reset, fetchSearches } =
    useHistoryStore()
  const {jobs, getAllSaved, loading} = useJobStore() 
  const { data: session, status } = useSession()

  useEffect(() => {
    if (status === 'authenticated') {
      fetchSearches()
      getAllSaved(true)
    } else {
      reset
    }
  }, [status])

  return (
    <HistoryPageView
      session={session}
      isHistoryLoading={isHistoryLoading}
      isJobsLoading={isJobsLoading}
      searches={searches ?? []}
      savedJobs={jobs ?? []}
      loading={loading}
    />
  )
}
