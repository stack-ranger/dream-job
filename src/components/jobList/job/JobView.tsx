import Image from 'next/image'


const JobView = ({
                     role,
                     company_name,
                     imgLoader,
                     imgError,
                     placeholder,
                     getRandomColor
                 }:
                     {
                         role: string,
                         company_name: string,
                         imgLoader: ({src}: { src: string }) => string,
                         imgError: () => void,
                         placeholder: boolean
                         getRandomColor: () => string | undefined
                     }) => {
    return (
        <div
            className="w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md">
            <div className="flex flex-col items-center pb-10">
                <div className="my-3">
                    {placeholder ?
                        <div
                            className={`${getRandomColor()} flex items-center justify-center w-20 h-20 text-3xl font-bold text-white rounded-full`}>
                            {company_name.charAt(0)}
                        </div>
                        : <Image className="rounded-full"
                                 loader={imgLoader} src={company_name} alt={company_name} width={80} height={80}
                                 onError={imgError}/>}
                </div>
                <h5 className="mb-1 text-xl font-medium text-gray-900">{role}</h5>
                <span className="text-sm text-gray-500">{company_name}</span>
            </div>
        </div>);
}

export default JobView;