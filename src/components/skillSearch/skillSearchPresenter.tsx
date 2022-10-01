import {useContext, useEffect, useState} from "react";
import SkillSearchView from "./skillSearchView";
import {InputChangeEventHandler} from "~/types/events";
import {trpc} from "~/utils/trpc";
import {JobContext} from "~/context/jobContext";
import {JobContextType} from "~/types/job";

const findMatches = (input: string, skillList: string[]) => {
    return skillList.filter(skill => {
        const regex = new RegExp(input.replace(" ", ""), 'gi');
        return skill.match(regex);
    });
}

const SkillSearchPresenter = ({skillList}: { skillList: string[] }) => {

    const maxSkills = 5;

    const [skills, setSkills] = useState<string[]>([]);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [search, setSearch] = useState<string>('');

    const { setJobs } = useContext(JobContext) as JobContextType;

    const { refetch } = trpc.useQuery(["jobs.all", { keywords: skills, number: 10 }], {enabled : false});
    const onSearch = async(e: InputChangeEventHandler) => {
        e.preventDefault();
        setJobs([]);
        const jobQuery = await refetch();
        setJobs(jobQuery.data ? jobQuery.data : []);
    }

    useEffect(() => {
        const trimmedSearch = search.trim();
        if (skillList && trimmedSearch.length) {
            const matches = findMatches(trimmedSearch || "", skillList);
            setSuggestions(matches.slice(0, Math.min(10, matches.length)));
        } else {
            setSuggestions([]);
        }
    }, [search]);

    const appendSkill = (skill: string) => {
        if (skillList.includes(skill) && !skills.includes(skill) && skills.length < maxSkills) {
            setSkills(oldSkills => [...oldSkills, skill]);
            setSearch('');
        }
    }

    const removeSkill = (index: number) => {
        setSkills(skills => skills.filter((skills, i) => i !== index))
    }

    const onSearchChange = (e: InputChangeEventHandler) => setSearch(e.target.value);

    const onKeyPress = (e: InputChangeEventHandler) => {
        if (e.key === "Backspace" && !search.length && skills.length) {
            e.preventDefault();
            const skillsCopy = [...skills];
            setSkills(skillsCopy);
            setSearch(skillsCopy.pop() || '');
        }

        // Limit the number of tags to 5
        if (skills.length >= maxSkills) return;

        const searchTrimmed = search.trim();
        if ((e.key === " " || e.key === ",")
            && searchTrimmed.length
            && !skills.includes(searchTrimmed)
            && skillList.includes(searchTrimmed)
        ) {
            e.preventDefault();
            setSkills(oldSkills => [...oldSkills, searchTrimmed]);
            setSearch('');
        }
    };

    return (<SkillSearchView skills={skills} search={search} suggestions={suggestions} appendSkill={appendSkill}
                             removeSkill={removeSkill} onKeyPress={onKeyPress} onSearchChange={onSearchChange}
                             onSearch={onSearch}
    />);
}

export default SkillSearchPresenter;