import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { InputChangeEventHandler } from '~/types/events'

const SkillSearchView = ({
  skills,
  search,
  suggestions,
  appendSkill,
  removeSkill,
  onKeyPress,
  onSearchChange,
  onSearch,
}: {
  skills: string[]
  search: string
  suggestions: string[]
  appendSkill: (skill: string) => void
  removeSkill: (index: number) => void
  onKeyPress: (e: InputChangeEventHandler) => void
  onSearchChange: (e: InputChangeEventHandler) => void
  onSearch: (e: InputChangeEventHandler) => void
}) => {
  return (
    <div className="w-96">
      <form className="flex items-center">
        <label className="sr-only">Search</label>
        <div className="relative w-full">
          <div>
            <div>
              <div className="flex w-96 overflow-auto border rounded-md bg-gray-50 p-2">
                {skills.map((tag, index) => (
                  <div key={index} className="flex items-center bg-gray-300 rounded-md px-1 mx-1">
                    {tag}
                    <button className="px-1" onClick={() => removeSkill(index)}>
                      x
                    </button>
                  </div>
                ))}
                <input
                  ref={(ref) => ref && ref.focus()}
                  onFocus={(e) =>
                    e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)
                  }
                  disabled={skills.length >= 5}
                  value={search}
                  placeholder={skills.length <= 4 ? 'Add a skill' : ''}
                  onKeyDown={onKeyPress}
                  onChange={onSearchChange}
                  className="overflow-auto border-0 outline-none px-2"
                />
              </div>
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
                onClick={() => appendSkill(suggestion)}
              >
                {suggestion}
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}

export default SkillSearchView
