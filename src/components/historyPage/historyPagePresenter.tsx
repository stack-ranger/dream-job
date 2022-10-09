import React, { useEffect, useState } from 'react'
import { trpc } from '~/utils/trpc'
import { useSession } from 'next-auth/react'
import HistoryPageView from './historyPageView'
import useHistoryStore from '~/stores/historyStore'

export default function HistoryPagePresenter() {
  const { savedJobs, searches, isHistoryLoading, isJobsLoading, reset, fetchSearches, fetchSavedJobs } =
    useHistoryStore()
  const { data: session, status } = useSession()

  useEffect(() => {
    if (status === 'authenticated') {
      fetchSearches()
      fetchSavedJobs()
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
      savedJobs={savedJobs ?? []}
    />
  )
}
