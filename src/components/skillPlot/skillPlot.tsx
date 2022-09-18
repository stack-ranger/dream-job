import { useMemo } from "react";
import * as d3 from "d3";
import SkillPlotView from "./skillPlotView";

const skills: Skill[] = [
    { skill: "React", value: 100 },
    { skill: "TypeScript", value: 90 },
    { skill: "Docker", value: 80 },
    { skill: "Tailwind", value: 70 },
    { skill: "GraphQL", value: 60 },
    { skill: "Next.js", value: 50 },
    { skill: "Node.js", value: 40 },
    { skill: "MongoDB", value: 20 }];

const SkillPlot = () => {

    const width = 500;
    const height = 500;

    const yScale = useMemo(() => {
        return d3
            .scaleBand()
            .domain(skills.map((skill) => skill.skill))
            .range([0, width])
            .padding(0.1);
    }, [width]);

    const xScale = useMemo(() => {
        const [, max] = d3.extent(skills.map((d) => d.value));
        return d3
            .scaleLinear()
            .domain([0, max || 10])
            .range([0, height]);
    }, [height]);

    return <SkillPlotView xScale={xScale} yScale={yScale} skills={skills} width={width} height={height} />
};

export default SkillPlot;
