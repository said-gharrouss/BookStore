import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { userDetailApi } from "../../api/userDetailApi";

function OrderDetails() {
    const {id} = useParams();
    const currentOrder = JSON.parse(localStorage.getItem("orderList")).filter(e => e.id == id)[0];
    const [details,setDetails] = useState();
    const [personalDetails,setPersonalDetails] = useState();

    useEffect(() => {
        userDetailApi.getDetails(currentOrder?.user_id)
        .then((response) => {
            if(response.status === 200){
                setDetails(response.data[0]);
            }
        })
        .catch((error) => {
            console.log(error);
        })
    },[]);

    useEffect(() => {
        userDetailApi.getPersonalInfo(details?.user_id)
        .then((response) => {
            if(response.status === 200){
                setPersonalDetails(response.data);
            }
        }).catch((error) => {
            console.log(error);
        })
    },[details])



    return (
        <div className="px-[20px] mx-auto mt-[20px] min-h-[100vh]">
            <h2 className="admin-title">Order Items</h2>
            <div className="mt-[30px] mb-[50px] flex flex-wrap gap-[20px] justify-center text-[14px]">
                {
                    currentOrder.items?.map((item,key) => (
                        <div key={key} className="flex gap-[30px]  items-center  h-[160px]  w-[100%] sm:w-[45%] bg-white p-[20px] rounded-[4px] shadow-sm hover:shadow-md">
                            <div className="h-[70px] sm:h-full w-[70px] sm:min-w-[100px]">
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
            <h2 className="admin-title">Customer Details</h2>
            <div className="bg-white flex flex-col gap-[20px] p-[20px] mt-[30px] w-[100%] md:w-[80%] lg:w-[60%] mx-auto shadow-sm
            hover:shadow-md transition-[0.3s] rounded-[4px]">
                <div className="flex justify-between items-center p-[10px] rounded-[4px] border-b-[1px]
                border-gray-300 hover:bg-gray-100 transition-[0.3s]">
                    <span className="font-semibold">Name</span>
                    <span>{personalDetails?.name}</span>
                </div>
                <div className="flex justify-between items-center p-[10px] rounded-[4px] border-b-[1px]
                border-gray-300 hover:bg-gray-100 transition-[0.3s]">
                    <span className="font-semibold">Email</span>
                    <span>{details?.email}</span>
                </div>
                <div className="flex justify-between items-center p-[10px] rounded-[4px] border-b-[1px]
                border-gray-300 hover:bg-gray-100 transition-[0.3s]">
                    <span className="font-semibold">Phone Number</span>
                    <span>{details?.phone_number}</span>
                </div>
                <div className="flex justify-between items-center p-[10px] rounded-[4px] border-b-[1px]
                border-gray-300 hover:bg-gray-100 transition-[0.3s]">
                    <span className="font-semibold">Address Number One</span>
                    <span>{details?.address_one}</span>
                </div>
                <div className="flex justify-between items-center p-[10px] rounded-[4px] border-b-[1px]
                border-gray-300 hover:bg-gray-100 transition-[0.3s]">
                    <span className="font-semibold">Address Number Two</span>
                    <span>{details?.address_two}</span>
                </div>
                <div className="flex justify-between items-center p-[10px] rounded-[4px] border-b-[1px]
                border-gray-300 hover:bg-gray-100 transition-[0.3s]">
                    <span className="font-semibold">City</span>
                    <span>{details?.city}</span>
                </div>
                <div className="flex justify-between items-center p-[10px] rounded-[4px] border-b-[1px]
                border-gray-300 hover:bg-gray-100 transition-[0.3s]">
                    <span className="font-semibold">State</span>
                    <span>{details?.state}</span>
                </div>
                <div className="flex justify-between items-center p-[10px] rounded-[4px] border-b-[1px]
                border-gray-300 hover:bg-gray-100 transition-[0.3s]">
                    <span className="font-semibold">Zip Code</span>
                    <span>{details?.zip_code}</span>
                </div>
            </div>
        </div>
    )
}

export default OrderDetails
