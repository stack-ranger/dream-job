import {useEffect, useState} from "react";
import SkillSearchView from "./skillSearchView";

const findMatches = (input: string, skillList: string[]) => {
    return skillList.filter(skill => {
        const regex = new RegExp(input.replace(" ", ""), 'gi');
        return skill.match(regex);
    });
}

const SkillSearchPresenter = ({skillList} : {skillList: string[]}) => {

    const [input, setInput] = useState<string>("");
    const [suggestions, setSuggestions] = useState<string[]>([]);

    // TODO set the skills

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
    return (<SkillSearchView input={input} setInput={setInput} suggestions={suggestions} setLastSkill={setLastSkill}/>)
}

export default SkillSearchPresenter;