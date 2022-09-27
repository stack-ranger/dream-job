import React, { useState, ReactNode } from 'react';
import {SkillContextType, SkillInterface} from "~/types/skill";

export const SkillContext = React.createContext<SkillContextType | null>(null);

type Props = {
    children: ReactNode;
};


const SkillProvider: ({children}: Props) => JSX.Element = ({ children }: Props) => {
    const [skills, setSkills] = useState<SkillInterface[]>([]);

    return <SkillContext.Provider value={{ skills, setSkills }}>
    {children}
    </SkillContext.Provider>;
};

export default SkillProvider;
