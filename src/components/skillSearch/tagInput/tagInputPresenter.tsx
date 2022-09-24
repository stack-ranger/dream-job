import {useState} from "react";
import TagInputView from "./tagInputView";
import {InputChangeEventHandler} from "../../../types/events";

const TagInputPresenter = () => {

    const maxSkills = 5;

    const [search, setSearch] = useState<string>('');
    const [skills, setSkills] = useState<string[]>([]);

    const onChange = (e: InputChangeEventHandler) => setSearch(e.target.value);

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
            && !skills.includes(searchTrimmed)) {
            e.preventDefault();
            setSkills(oldSkills => [...oldSkills, searchTrimmed]);
            setSearch('');
        }
    };

    const removeSkill = (index: number) => {
        setSkills(skills => skills.filter((skills, i) => i !== index))
    }

    return (<TagInputView search={search} skills={skills} removeSkill={removeSkill} onKeyPress={onKeyPress}
                          onSearchChange={onChange}/>)
}

export default TagInputPresenter;