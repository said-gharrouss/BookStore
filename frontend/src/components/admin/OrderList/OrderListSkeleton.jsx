
function OrderListSkeleton() {

    const orderNumbers = [1,2,3,4,5,6,7,8,9,10];

    return (
        <div className="bg-white w-full min-h-[100vh] rounded-[6px] flex flex-col p-[20px] gap-[40px]">
            {
                orderNumbers.map((_,key)=>(
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

export default OrderListSkeleton
