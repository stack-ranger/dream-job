import {MagnifyingGlassIcon} from '@heroicons/react/24/solid'
import TagInputPresenter from "./tagInput/tagInputPresenter";

const SkillSearchView = ({skills, setSkills, search, setSearch, suggestions, appendSkill}: {
    skills: string[],
    setSkills: (skills: string[]) => void,
    suggestions: string[],
    search: string,
    setSearch: (search: string) => void,
    appendSkill: (skill: string) => void
}) => {
    return (
        <>
            <form className="flex items-center">
                <label className="sr-only">Search</label>
                <div className="relative w-full">
                    <div>
                        <div>
                            <TagInputPresenter search={search} setSearch={setSearch} skills={skills} setSkills={setSkills}/>
                        </div>
                        <div>
                            <ul>
                                {search.trim() && suggestions.length > 0 && suggestions.map((suggestion, i) =>
                                    (<li className="bg-gray-50 bg-opacity-25 hover:bg-gray-300 text-gray-900 text-sm rounded-lg p-2.5 my-1"
                                         key={i}
                                         onClick={() => appendSkill(suggestion)}>
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