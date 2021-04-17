export default function Question({ index, status, documentation, toggle }) {
    return (
        <div className="mb-2" onClick={() => toggle(index)}>
            <div className="font-medium rounded-sm text-lg px-2 py-3 flex text-gray-800 flex-row-reverse mt-2 cursor-pointer text-black bg-gray-100 hover:bg-gray-200">
                <div className="flex-auto">{documentation.question}</div>
                <div className="px-2 mt-1">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-down w-5 h-5">
                            {status ?
                                <polyline points="18 15 12 9 6 15"></polyline> :
                                <polyline points="6 9 12 15 18 9"></polyline>
                            }
                        </svg>
                    </div>
                </div>
            </div>
            {status ?
                <div className="p-2 text-justify text-left text-gray-800 mb-5 bg-gray-100" dangerouslySetInnerHTML={{ __html: documentation.answer }}/>
                : null}
        </div>
    )
}