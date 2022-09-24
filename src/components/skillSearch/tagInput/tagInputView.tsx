import {InputChangeEventHandler} from "../../../types/events";

const TagInputView = ({search, skills, removeSkill, onKeyPress, onSearchChange}: {
    search: string,
    skills: string[],
    removeSkill: (index: number) => void,
    onKeyPress: (e: InputChangeEventHandler) => void,
    onSearchChange: (e: InputChangeEventHandler) => void
}) => {
    return (
        <div className="flex w-96 overflow-auto border rounded-md bg-gray-50 p-1">
            {skills.map((tag, index) => (
                <div key={index} className="flex items-center bg-gray-300 rounded-md px-1 mx-1">
                    {tag}
                    <button className="px-1"
                            onClick={() => removeSkill(index)}>x
                    </button>
                </div>
            ))}
            <input
                disabled={skills.length >= 5}
                value={search}
                placeholder={skills.length <= 4 ? "Add a skill" : ""}
                onKeyDown={onKeyPress}
                onChange={onSearchChange}
                className="overflow-auto border-0 outline-none px-2"
            />
        </div>
    )
}

export default TagInputView;