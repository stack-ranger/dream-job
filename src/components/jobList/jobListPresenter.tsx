import React from "react";
import {trpc} from "../../utils/trpc";
import JobListView from "./jobListView";

const JobListPresenter = () => {

    const [skills, setSkills] = React.useState<string>("");
    const skillArr = skills.replace(" ", "").split(",");
    const {data, refetch} = trpc.useQuery(["jobs.all", { keywords: skillArr, number: 10 }], {enabled : false});

    return (<JobListView skills={skills}
                         setSkills={setSkills}
                         jobs={data || []}
                         onSubmit={refetch}/>);
}

export default JobListPresenter;
