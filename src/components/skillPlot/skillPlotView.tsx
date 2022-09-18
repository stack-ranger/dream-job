import * as d3 from "d3";

interface SkillPlotViewProps {
    skills: Skill[];
    xScale: d3.ScaleLinear<number, number>;
    yScale: d3.ScaleBand<string>;
    width: number;
    height: number;
}

export const SkillPlotView = ({ xScale, yScale, width, height, skills }: SkillPlotViewProps) => {
    return (
        <div>
            <svg width={width} height={height}>
                <g width={width} height={height}>
                    {skills.map((skill, i) => {
                        return (
                            <g key={i}>
                                <rect
                                    x={xScale(0)}
                                    y={yScale(skill.skill)}
                                    width={xScale(skill.value)}
                                    height={yScale.bandwidth()}
                                    fillOpacity={0.5}
                                />
                                <text
                                    x={xScale(3 )}
                                    y={yScale.bandwidth() / 2 + yScale(skill.skill)}
                                    textAnchor="start"
                                    alignmentBaseline="central"
                                    fontSize={16}
                                >
                                    {skill.skill}
                                </text>
                            </g>
                        );
                    })}
                </g>
            </svg>
        </div>
    );
};

export default SkillPlotView;
