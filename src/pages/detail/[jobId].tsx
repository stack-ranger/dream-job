import { useRouter } from 'next/router'
import JobDetailPresenter from '~/components/jobDetail/jobDetailPresenter'

const JobDetailPage = () => {
  const router = useRouter()
  const { jobId } = router.query
  const jobIdStr = jobId as string
  return <JobDetailPresenter jobId={jobIdStr} />
}

export default JobDetailPage
