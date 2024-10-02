
function OrdersSkeleton() {
    const myOrders = [1,2,3,4,5,6,7,8,9,10];
    return (
        <div className="w-[80%] p-[20px] divide-gray-300 bg-backgroundLight text-sm rounded-[4px] mx-auto flex flex-col gap-[30px]">
                {
                    myOrders?.map((_,key) => (
                        <div key={key} className="w-full h-[20px] rounded-[30px] flex gap-[10px] sm:gap-[30px] md:gap-[50px]">
                        <div className="bg-gray-300 flex-1 rounded-[30px] animate-pulse"></div>
                        <div className="bg-gray-300 flex-1 rounded-[30px] animate-pulse"></div>
                        <div className="bg-gray-300 flex-1 rounded-[30px] animate-pulse"></div>
                        <div className="bg-gray-300 flex-1 rounded-[30px] animate-pulse"></div>
                        <div className="bg-gray-300 flex-1 rounded-[30px] animate-pulse"></div>
                    </div>
                    ))
                }
        </div>
    )
}

export default OrdersSkeleton