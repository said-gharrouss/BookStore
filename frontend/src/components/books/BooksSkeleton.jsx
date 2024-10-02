
function BooksSkeleton() {

    const booksNumber = [1,2,3,4,5,6,7,8,9,10];
    return (
        <div className="flex gap-[20px]  justify-center flex-wrap mt-[-10px] sm:mt-[40px]">
            {
                booksNumber.map((_,key) => (
                    <div key={key} className="w-[201px] h-[350px] bg-backgroundLight rounded-[4px] p-[20px]">
                        <div className="h-[60%] bg-gray-300 rounded-[4px] flex justify-center items-center animate-pulse">
                            <svg
                                className="w-10 h-10 text-gray-200 dark:text-gray-100"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 18"
                            >
                            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                            </svg>
                        </div>
                        <div className="flex flex-col gap-[20px] my-[20px]">
                            <h2 className="w-full h-[20px] bg-gray-300 rounded-[30px] animate-pulse"></h2>
                            <p className="w-full h-[20px] bg-gray-300 rounded-[30px] animate-pulse"></p>
                            <button className="w-full h-[20px] bg-gray-300 rounded-[30px] animate-pulse"></button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default BooksSkeleton
