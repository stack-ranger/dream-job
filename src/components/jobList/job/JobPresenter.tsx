import JobView from "./JobView";
import {JobInterface} from "~/types/job";

const getRandomColor = (company_name: string) => {
    const randColors = ["bg-green-400", "bg-red-400", "bg-blue-400", "bg-orange-400, bg-yellow-400", "bg-violet-400", "bg-rose-400"];
    return randColors[company_name.charCodeAt(0) % randColors.length];
}

const JobPresenter = ({job}: { job: JobInterface }) => {
    return (<JobView role={job.role} company_name={job.Company.company_name} getRandomColor={getRandomColor}
                     logo_url={job.Company.logo_url}></JobView>);
}
export default JobPresenter;
