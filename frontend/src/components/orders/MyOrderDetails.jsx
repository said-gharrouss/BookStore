import { useEffect } from "react";
import { useParams } from "react-router-dom"

function MyOrderDetails() {
    const {id} = useParams();
    const order = JSON.parse(localStorage.getItem("myOrders")).filter(e => e.id == id)[0];

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant'
        });
    }, []);



    return (
        <div className="min-h-[100vh] container mx-auto pt-[90px] px-[20px]">
            <h2 className="font-bold text-[30px] title-style">Order Items</h2>
            <div className="mt-[50px] mb-[50px] flex flex-wrap gap-[20px] justify-center text-[14px]">
                {
                    order.items?.map((item,key) => (
                        <div key={key} className="flex gap-[30px] items-center  h-[160px]  w-[100%] sm:w-[45%] bg-lightwhite py-[20px] px-[10px] sm:px-[20px] rounded-[4px] shadow-sm hover:shadow-md
                        border-[1.5px] border-primary">
                            <div className="h-full w-[70px] sm:min-w-[100px]">
                                <img src={`${import.meta.env.VITE_BACKEND_URL}/storage/${item.book.image}`} alt="" loading="lazy"
                                className="h-full w-full"/>
                            </div>
                            <div className="flex flex-col gap-[10px]">
                                <h3 className="font-semibold">{item.book.title}</h3>
                                <span>Price : $ {item.book.price}</span>
                                <span>Quntity : {item.quantity}</span>
                            </div>
                            <div>
                                <span >Total Price : <span className="font-bold">${item.price}</span></span>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default MyOrderDetails
