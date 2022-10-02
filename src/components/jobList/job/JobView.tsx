import Image from 'next/image'

const JobView = ({
                     role,
                     company_name,
                     logo_url,
                     getRandomColor
                 }:
                     {
                         role: string,
                         company_name: string,
                         logo_url: string,
                         getRandomColor: (company_name: string) => string | undefined
                     }) => {
    return (
        <div
            className="w-full max-w-sm hover:scale-105 bg-white rounded-lg border border-gray-200 shadow-md">
            <div className="flex flex-col items-center pb-10">
                <div className="my-3">
                    {logo_url == "" ?
                        <div
                            className={`${getRandomColor(company_name)} flex items-center justify-center w-20 h-20 text-3xl font-bold text-white rounded-full`}>
                            {company_name.charAt(0)}
                        </div>
                        : <Image className="rounded-full"
                                 src={logo_url} alt={company_name} width={80} height={80}/>}
                </div>
                <h5 className="mb-1 text-xl font-medium text-gray-900">{role}</h5>
                <span className="text-sm text-gray-500">{company_name}</span>
            </div>
        </div>);
}

export default JobView;