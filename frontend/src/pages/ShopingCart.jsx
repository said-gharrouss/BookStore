import { useDispatch,useSelector} from 'react-redux';
import { handleClearBooks, handleQuantityDecrement, handleQuantityIncrement, handleRemoveBookFromCart } from '../Redux/feauters/shopcartbooksSlice';
import { useEffect, useState } from 'react';
import { axiosClient } from '../api/axios';
function ShopingCart() {
    const shopingCart = useSelector(({shopingCart}) => shopingCart.books);
    const dispatch = useDispatch();
    const [isSubmitting,setIsSubmitting] = useState(false);
    const books = useSelector(state => state.shopingCart);

    const totlaBooks = shopingCart.reduce((acc,currentValue) =>{
        return acc + parseInt(currentValue.quantity);
    },0)

    const totalPrice = shopingCart.reduce((acc,currentValue) =>{
        return acc + parseFloat((currentValue.item.price) * parseInt(currentValue.quantity));
    },0)

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant'
        });
    }, []);

    const handleCheckout = async () => {
        setIsSubmitting(true);

        try {
            const response = await axiosClient.post("/checkout",{...books.books});
            window.open(response.data.url, '_blank');
            setIsSubmitting(false);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container mx-auto pt-[90px] px-[20px] min-h-[100vh]">
            <h1 className="font-bold text-[30px] title-style">Your Bag</h1>
            {
            shopingCart.length > 0 ?
            <div className="mt-[50px] gap-6 flex-wrap md:flex sm:gap-8 lg:gap-16  flex-col  sm:flex-row">

                <div className="relative md:flex-[3] overflow-x-auto mb-[50px] md:mb-[50px]">
                    <table className="w-full text-left rtl:text-right  rounded-[6px]">
                        <thead className="uppercase">
                            <tr className="border-b-[1px] border-primary_black">
                                <th scope="col" className="px-6 pb-3">Books</th>
                                <th scope="col" className="px-6 pb-3">Name</th>
                                <th scope="col" className="px-6 pb-3">Quantity</th>
                                <th scope="col" className="px-6 pb-3">Price</th>
                                <th scope="col" className="px-6 pb-3">Delete</th>
                            </tr>
                        </thead>
                        <tbody className="">
                            {
                                shopingCart?.map((item,key) => (
                                    <tr key={key} className="border-b-[1px] border-primary_black">
                                        <td className="px-6 py-4">
                                            <img className="w-[60px] h-[60px]" src={`${import.meta.env.VITE_BACKEND_URL}/storage/${item.item.image}`} alt="" />
                                        </td>
                                        <td className="px-6 py-4">{item.item.title}</td>
                                        <td className="px-6 py-4 ">
                                            <span className={`text-[22px] font-bold cursor-pointer
                                            ${item.quantity > 1 ? "" : "not-clickable"}`}
                                            onClick={() => dispatch(handleQuantityDecrement({id : item.item.id}))}>-</span>
                                            <span className="mx-[25px]">{item.quantity}</span>
                                            <span className="text-[22px] font-bold cursor-pointer"
                                            onClick={() => dispatch(handleQuantityIncrement({id : item.item.id}))}>+</span>
                                        </td>
                                        <td className="px-6 py-4">${(item.item.price * item.quantity).toFixed(2)}</td>
                                        <td className="px-6 py-4 font-semibold text-red-500 cursor-pointer text-[17px]"
                                        onClick={() => dispatch(handleRemoveBookFromCart({id : item.item.id}))}>
                                            <i className="fa-solid fa-trash-can"></i>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    <div className='flex justify-end'>
                        <button className='bg-red-500 text-white font-bold rounded-[4px] hover:text-red-500 hover:bg-lightwhite
                        hover:shadow-2xl px-[25px] py-[6px] transition-[0.3s] mt-[20px]'
                        onClick={() => dispatch(handleClearBooks())}>Clear Cart</button>
                    </div>
                </div>

                <div className='md:flex-1 relative'>
                    <div className="block lg:fixed w-full lg:w-[300px]">
                        <p className="border-b-[1px] border-b-primary_black pb-[10px] font-semibold">Order Summary</p>
                        <div className="border-b-[1px] border-b-primary_black py-[10px] flex justify-between">
                            <span>Total Books</span>
                            <span>{totlaBooks} Book(s)</span>
                        </div>
                        <div className="border-b-[1px] border-b-primary_black py-[10px] flex justify-between">
                            <span>Total Price</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>
                        {!isSubmitting ?
                        <button className="h-[40px] w-full bg-primary_black text-white mt-[10px]"
                        onClick={handleCheckout}>Checkout</button> :

                        <button className='h-[40px] w-full bg-primary_black text-white mt-[10px] flex justify-center items-center'>
                            <div className='loader'></div>
                        </button>
                        }
                    </div>
                </div>

            </div>
            :
            <p className="text-[20px] sm:text-[30px] text-center text-gray-500 mt-[50px]">
                Browse our selection and stock up your cart with fantastic books!
            </p>
            }
        </div>
    )
}

export default ShopingCart
