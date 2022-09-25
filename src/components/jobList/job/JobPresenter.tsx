import JobView from "./JobView";

const JobPresenter = ({job}: {job: {role: string, company_name: string}}) => {
    return (<JobView role={job.role} company_name={job.company_name}/>);
}
export default JobPresenter;
