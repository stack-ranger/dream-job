import {MagnifyingGlassIcon} from '@heroicons/react/24/solid'

const SkillSearchView = ({input, setInput, suggestions, setLastSkill}: {
    input: string,
    setInput: (input: string) => void,
    suggestions: string[],
    setLastSkill: (skill: string) => void
}) => {
    return (
        <>
            <form className="flex items-center">
                <label className="sr-only">Search</label>
                <div className="relative w-full">
                    <div>
                        <div>
                            <input type="text" onChange={(e) => setInput(e.target.value)} value={input}
                                   ref={ref => ref && ref.focus()}
                                   onFocus={(e) => e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                   placeholder="Enter skills" required/>
                        </div>
                        <div>
                            <ul>
                                {input.length > 0 && suggestions.length > 0 && suggestions.map((suggestion, i) =>
                                    (<li className="bg-gray-50 bg-opacity-25 hover:bg-gray-300 text-gray-900 text-sm rounded-lg p-2.5 my-1"
                                         key={i}
                                         onClick={() => setLastSkill(suggestion)}>
                                        {suggestion}
                                    </li>))}
                            </ul>
                        </div>
                    </div>
                </div>
                <button type="submit"
                        className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                    <span className="sr-only">Search</span>
                </button>
            </form>
        </>
    )
}

export default SkillSearchView;