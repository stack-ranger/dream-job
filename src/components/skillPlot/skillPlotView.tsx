import * as d3 from "d3";
import {SkillCount} from "~/types/job";

interface SkillPlotViewProps {
    skills: SkillCount[];
    xScale: d3.ScaleLinear<number, number>; // length of the bars, scales automatically
    yScale: d3.ScaleBand<string>; // the labels, scales automatically
    width: number;
    height: number;
}

/**
 *  D3 skill plot view
 * @param xScale - x scale
 * @param yScale - y scale
 * @param width - width of the plot
 * @param height - height of the plot
 * @param skills - skills to plot
 * @constructor
 */
export const SkillPlotView = ({xScale, yScale, width, height, skills}: SkillPlotViewProps) => {
    return (
        <div>
            <svg width={width} height={height}>
                <g width={width} height={height}>
                    {skills.map((skill, i) => {
                        const yOffset = yScale(skill.name) || 0;
                        return (
                            <g key={i}>
                                <rect className={"fill-purple-300 hover:fill-purple-400"}
                                      x={xScale(0)}
                                      y={yOffset}
                                      width={xScale(skill.count)}
                                      height={yScale.bandwidth()}
                                />
                                <text
                                    className={"text-lg text-start font-medium"}
                                    x={xScale(2)}
                                    y={yScale.bandwidth() / 2 + yOffset}
                                    alignmentBaseline="central"
                                >
                                    {skill.name}
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
