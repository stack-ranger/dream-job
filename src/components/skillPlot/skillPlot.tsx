import {useMemo} from "react";
import * as d3 from "d3";
import SkillPlotView from "./skillPlotView";
import {SkillCount} from "~/types/job";

type SkillPlotProps = {
    skills: SkillCount[];
    height: number;
    width: number;
}

/**
 * D3 skill plot
 * @param skills - skills to plot
 * @param height - height of the plot
 * @param width - width of the plot
 */
const SkillPlot = ({skills, height, width}: SkillPlotProps) => {

    // useMemo to avoid re-rendering the plot
    const yScale = useMemo(() => {
        return d3
            .scaleBand()
            .domain(skills.map((skill) => skill.name))
            .range([0, width])
            .padding(0.1);
    }, [skills, width]);

    const xScale = useMemo(() => {
        const [, max] = d3.extent(skills.map((d) => d.count));
        return d3
            .scaleLinear()
            .domain([0, max || 10])
            .range([0, height]);
    }, [height, skills]);

    return <SkillPlotView xScale={xScale} yScale={yScale} skills={skills} width={width} height={height}/>
};

export default SkillPlot;
