import {MagnifyingGlassIcon} from '@heroicons/react/24/solid'
import {useEffect, useState} from "react";

const findMatches = (input: string, skillList: string[]) => {
    return skillList.filter(skill => {
        const regex = new RegExp(input, 'gi');
        return skill.match(regex);
    });
}

const SkillSearch = ( {skillList} : {skillList: string[]}) => {

    const [input, setInput] = useState<string>("");
    const [skills, setSkills] = useState<string[]>([]);
    const [suggestions, setSuggestions] = useState<string[]>([]);

    useEffect(() => {
        const searchArr = input.replace(" ", "").split(",");
        const lastElement = searchArr[searchArr.length - 1];
        if (skillList && lastElement) {
            if (lastElement && lastElement.length > 0) {
                const matches = findMatches(lastElement || "", skillList);
                setSuggestions(matches.slice(0, Math.min(10, matches.length)));
            }
        } else {
            setSuggestions([]);
        }
    }, [input]);

    const setLastSkill = (skill: string) => {
        setInput(input.slice(0, input.lastIndexOf(",") + 1) + " " + skill + ", ");
    }

    return (
        <>
            <form className="flex items-center">
                <label className="sr-only">Search</label>
                <div className="relative w-full">
                    <div>
                        <input type="text" onChange={(e) => setInput(e.target.value)} value={input}
                               ref={ref => ref && ref.focus()}
                               onFocus={(e) => e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)}
                               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                               placeholder="Enter skills" required/>
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

export default SkillSearch;