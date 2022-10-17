import { InputChangeEventHandler } from '~/types/events'
import { BookmarkIcon } from '@heroicons/react/24/outline'
import { BookmarkIcon as BookmarkSolid } from '@heroicons/react/20/solid'

export const SaveButton = ({
  isSaved,
  isLoading,
  onClickSave,
}: {
  isSaved: boolean
  isLoading: boolean
  onClickSave: (e: InputChangeEventHandler) => void
}) => (
  <button
    onClick={onClickSave}
    className={`group py-2 px-3 text-xs font-medium text-center rounded-lg
    ${
      isSaved && !isLoading
        ? "text-white bg-green-700 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700 hover:after:content-['Remove'] flex items-center"
        : 'text-white bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 hover:after:content-["Save"] flex items-center'
    }
  `}
  >
    {isLoading ? (
      <svg
        aria-hidden="true"
        role="status"
        className="inline w-5 h-5 text-white animate-spin mr-1"
        viewBox="0 0 100 101"
        fill="none"
      >
        <path
          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
          fill="#E5E7EB"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
          fill="currentColor"
        />
      </svg>
    ) : isSaved ? (
      <span className="flex items-center">
        <BookmarkSolid className="h-5 w-5 mr-1" />
        <span className="group-hover:hidden">Saved</span>
      </span>
    ) : (
      <span className="flex items-center">
        <BookmarkIcon className="h-5 w-5 mr-1" />
      </span>
    )}
  </button>
)

export default SaveButton
