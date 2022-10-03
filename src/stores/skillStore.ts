import create from 'zustand'
import { SkillInterface } from '~/types/skill';

interface SkillStoreInterface {
    skillsCount: SkillInterface[];
    setSkillsCount: (newSkills: SkillInterface[]) => void;
}

const useSkillCountstore = create<SkillStoreInterface>((set) => ({
    skillsCount: [],
    setSkillsCount: (newSkills) => {
        set(() => ({
            skillsCount: [
                ...newSkills, 
            ],
        }));
    }
}))

export default useSkillCountstore;