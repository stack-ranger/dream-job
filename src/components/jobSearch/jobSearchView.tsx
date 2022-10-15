import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { InputChangeEventHandler } from '~/types/events'

const JobSearchView = ({
  search,
  setSearch,
  suggestions,
  onSearch,
}: {
  search: string
  setSearch: (search: string) => void
  suggestions: string[]
  onSearch: (e: InputChangeEventHandler) => void
}) => {
  return (
    <div className="w-96">
      <form className="flex items-center">
        <label className="sr-only">Search</label>
        <div className="relative w-full">
          <div>
            <div className="flex w-96 overflow-auto border rounded-md bg-gray-50 p-2">
              <input
                ref={(ref) => ref && ref.focus()}
                onFocus={(e) =>
                  e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)
                }
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={'Search for role'}
                className="overflow-auto border-0 outline-none px-2 bg-gray-50"
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          onClick={onSearch}
          className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
        >
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          <span className="sr-only">Search</span>
        </button>
      </form>
      <div>
        <ul>
          {search.trim() &&
            suggestions.length > 0 &&
            suggestions.map((suggestion, i) => (
              <li
                className="bg-gray-50 bg-opacity-25 hover:bg-gray-300 text-gray-900 text-sm rounded-lg p-2.5 my-1"
                key={i}
                onClick={() => setSearch(suggestion)}
              >
                {suggestion}
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}

export default JobSearchView
