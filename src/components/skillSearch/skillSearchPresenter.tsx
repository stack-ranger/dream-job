import {useEffect, useState} from "react";
import SkillSearchView from "./skillSearchView";

const findMatches = (input: string, skillList: string[]) => {
    return skillList.filter(skill => {
        const regex = new RegExp(input.replace(" ", ""), 'gi');
        return skill.match(regex);
    });
}

const SkillSearchPresenter = ({skillList} : {skillList: string[]}) => {

    const [skills, setSkills] = useState<string[]>([]);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [search, setSearch] = useState<string>('');

    useEffect(() => {
        const trimmedSearch = search.trim();
        if (skillList && trimmedSearch.length) {
            const matches = findMatches(trimmedSearch || "", skillList);
            setSuggestions(matches.slice(0, Math.min(10, matches.length)));
        } else {
            setSuggestions([]);
        }
    }, [search]);

    const appendSkilll = (skill: string) => {
        setSkills(oldSkills => [...oldSkills, skill]);
        setSearch('');
    }

    return (
        <>
            <SkillSearchView skills={skills} setSkills={setSkills} suggestions={suggestions} search={search} setSearch={setSearch} appendSkill={appendSkilll}/>
        </>)
}

export default SkillSearchPresenter;