import { PhotoIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'

const JobSkeleton = () => {
  return (
    <div className="w-full max-w-sm hover:scale-105 animate-pulse bg-gray-100 rounded-lg border border-gray-200 shadow-md dark:bg-gray-800">
      <div className="flex flex-col items-center pb-10">
        <div className="my-3">
          <div className="flex items-center justify-center w-20 h-20 text-3xl font-bold text-white rounded-full">
            <Image
              className="rounded-full"
              src="/loading.svg"
              width={80}
              height={80}
              placeholder="blur"
              blurDataURL="/loading.svg"
            />
          </div>
        </div>
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-64 mb-4 mx-9"></div>
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-4"></div>
      </div>
    </div>
  )
}

export default JobSkeleton
