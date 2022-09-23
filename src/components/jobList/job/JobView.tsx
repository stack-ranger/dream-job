const JobView = ({role, company_name}: { role: string, company_name: string }) => {
    return (
        <div
            className="w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md">
            <div className="flex flex-col items-center pb-10">
                <h5 className="mb-1 text-xl font-medium text-gray-900">{role}</h5>
                <span className="text-sm text-gray-500">{company_name}</span>
            </div>
        </div>);
}

export default JobView;