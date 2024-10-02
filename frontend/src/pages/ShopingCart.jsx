import { useDispatch,useSelector} from 'react-redux';
import { handleClearBooks, handleQuantityDecrement, handleQuantityIncrement, handleRemoveBookFromCart } from '../Redux/feauters/shopcartbooksSlice';
import { useEffect, useState } from 'react';
import { axiosClient } from '../api/axios';
import { getDetails } from '../Redux/User/UserSlice';
import UserFormDetails from '../components/UserDetails/UserFormDetails';

function ShopingCart() {
    const shopingCart = useSelector(({shopingCart}) => shopingCart.books);
    const dispatch = useDispatch();
    const [isSubmitting,setIsSubmitting] = useState(false);
    const books = useSelector(state => state.shopingCart);
    const user = useSelector(state => state.user.infos);
    const details = useSelector(state => state.user.details);
    const [dspFormDetails,SetDspFormDetails] = useState(false);

    const totlaBooks = shopingCart.reduce((acc,currentValue) => {
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

    useEffect(() => {
        console.log({...books.books});
    },[])
    const handleCheckout = async () => {
        if(details.length <= 0){
            SetDspFormDetails(true) ;
            document.body.style.overflow = 'hidden'
        } else {
            setIsSubmitting(true);
            try {
                const response = await axiosClient.post("/checkout",{...books.books});
                console.log(response);
                window.open(response.data.url, '_blank');
                setIsSubmitting(false);
                console.log(response);
            } catch (error) {
                console.error(error);
            }
        }
    };

    useEffect(() => {
        if(user?.id){
            dispatch(getDetails(user.id));
        }
    },[dispatch,user?.id,details]);


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
                                <th scope="col" className="px-6 pb-3">Book</th>
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
                                        <td className="px-6 py-4 font-semibold">{item.item.title}</td>
                                        <td className="px-6 py-4 ">
                                            <div className='flex items-center gap-[20px]'>
                                                <span className={`text-[22px] font-bold cursor-pointer border-[1px] border-gray-300 w-[30px] h-[30px] flex justify-center items-center rounded-[30px]
                                                hover:border-gray-400 transition-[0.3s]
                                                ${item.quantity > 1 ? "" : "not-clickable"}`}

                                                onClick={() => dispatch(handleQuantityDecrement({id : item.item.id}))}>-</span>

                                                <span className=" text-[14px] flex justify-center items-center min-w-[30px] max-w-[30px] h-[30px] bg-gray-200 border-[1px] border-gray-200 rounded-[50px]">{item.quantity}</span>

                                                <span className="text-[22px] font-bold cursor-pointer border-[1px] border-gray-300 w-[30px] h-[30px] flex justify-center items-center rounded-[30px] hover:border-gray-400 transition-[0.3s]"
                                                onClick={() => dispatch(handleQuantityIncrement({id : item.item.id}))}>
                                                    +
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 font-semibold  max-w-auto">
                                            <span className='flex min-w-[70px] max-w-[70px]'>
                                                ${(item.item.price * item.quantity).toFixed(2)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-semibold"
                                        onClick={() => dispatch(handleRemoveBookFromCart({id : item.item.id}))}>
                                            <span className='text-white text-[14px] cursor-pointer bg-gray-500 px-[10px] py-[2px] rounded-[4px]'>
                                                Delete
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            }
                            <tr className=''>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td className='py-4 font-semibold'>
                                    <button className="bg-gray-500 w-full text-[14px] py-[5px] rounded-[4px] text-white font-bold"
                                    onClick={() => dispatch(handleClearBooks())}>Clear cart</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className='md:flex-1 relative'>
                    <div className="block lg:fixed w-full lg:w-[300px]">
                        <p className="border-b-[1px] border-b-primary_black pb-[10px] font-semibold">Order Summary</p>
                        <div className="border-b-[1px] border-b-primary_black py-[10px] flex justify-between">
                            <span>Total Books</span>
                            <span className='font-bold'>{totlaBooks} Book(s)</span>
                        </div>
                        <div className="border-b-[1px] border-b-primary_black py-[10px] flex justify-between">
                            <span>Total Price</span>
                            <span className='font-bold'>${totalPrice.toFixed(2)}</span>
                        </div>
                        {!isSubmitting ?
                        <button className="h-[40px] w-full bg-primary_black text-white mt-[10px] font-bold border-[1px]
                        hover:bg-white hover:border-primary_black hover:text-primary_black transition-[0.3s]"
                        onClick={() => {
                            handleCheckout();
                        }}>Checkout</button> :

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
            {
                dspFormDetails && <UserFormDetails SetDspFormDetails={SetDspFormDetails}/>
            }
        </div>
    )
}

export default ShopingCart

