export type SkillCount = {
    name: string;
    count: number;
}

export interface SkillInterface {
    name: string;
    count: number;
}

export type SkillContextType = {
    skills: SkillCount[];
    setSkills: (skills: SkillCount[]) => void;
};
