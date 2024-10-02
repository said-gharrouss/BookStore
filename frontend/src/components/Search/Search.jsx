import { useEffect, useRef, useState } from "react";
import { handleAddBookToCart, handleQuantityDecrement, handleQuantityIncrement, handleRemoveBookFromCart } from "../../Redux/feauters/shopcartbooksSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';


function Search({isOpen,setIsSearchBarOpen}) {
    const [result,setResult] = useState([]);
    const dispatch = useDispatch();
    const shopingCart = useSelector(({shopingCart}) => shopingCart.books);
    const searchRef = useRef();
    const user = useSelector(state => state.user.infos);
    const [isTyping,setIsTyping] = useState(false);

    const handleSearch = (searchTerm) => {
        setIsTyping(true)
        const books = JSON.parse(localStorage.getItem("books")) || [];
        const searchResult = books?.filter(book => book.title.toLowerCase().startsWith(searchTerm.toLowerCase()));
        setResult(searchResult);
        if(searchTerm === ""){
            setResult([]);
            setIsTyping(false);
        }
    }

    useEffect(() => {
            if (isOpen) {
                searchRef.current.focus();
            }
    }, [isOpen]);




    return (
        <div className={`absolute  left-[50%] w-[90%] translate-x-[-50%] transition-[0.5s]
            ${isOpen ? "bottom-[-50px]" : "bottom-[100%]"}`}>
        <div>
            <div className="h-[40px] relative">
                <input type="text" className="w-full h-full shadow-md border-[2px] border-primary_black outline-none
                rounded-[4px] px-[10px]" onChange={(e) => handleSearch(e.target.value)} ref={searchRef}/>
                <span className="bg-primary_black absolute right-0 top-0 w-[50px] h-[100%]
                text-[30px] text-white flex justify-center items-center cursor-pointer"
                onClick={() => {
                    setIsSearchBarOpen(false);
                    setResult([]);
                    setIsTyping(false);
                    searchRef.current.value = "";
                }}>
                    <i className="fa-solid fa-xmark"></i>
                </span>
            </div>
            {
                result.length > 0 &&
                <div className="absolute bg-white w-full mt-[10px] border-[2px] border-primary_black shadow-md rounded-[4px]
                max-h-[450px] overflow-y-auto cursor-pointer">
                    {result.map((book,key)=> {
                        const currentBook = shopingCart.filter(item => item.item.id == book.id);
                        const quantity = currentBook[0]?.quantity;
                        const isBookInCart = shopingCart.some(cartItem => cartItem.item.id === book.id);
                        return (
                        <>
                        <Link to={user?.name ? `/user/book/${book?.id}` : `/book/${book?.id}`}
                        onClick={() => {
                            setIsSearchBarOpen(false);
                            setResult([]);
                            setIsTyping(false);
                            searchRef.current.value = "";
                        }}>
                        <div key={key} className={`px-[20px] py-[10px] flex justify-between items-center hover:bg-gray-100 transition-[0.3s]
                        ${!(result.length - 1 == key) && "border-b-[1px] border-gray-500"}`}>
                            <div>
                            <img src={`${import.meta.env.VITE_BACKEND_URL}/storage/${book?.image}`} alt=""
                                className="w-[50px] h-full"/>
                            </div>
                            <div className="flex flex-col gap-[5px] items-center">
                                <span className="font-bold">{book.title}</span>
                                <span className="text-[14px] text-gray-500">$ {book.price}</span>
                            </div>
                            {
                                isBookInCart ?
                                <div className="font-semibold bg-gray-100 items-center w-[150px] px-[20px] py-[3px]
                                justify-between gap-[20px] relative rounded-[6px] text-[20px] hidden md:flex">
                                    <span className={`cursor-pointer ${quantity > 1 ? "" : "not-clickable"}`}
                                    onClick={() => dispatch(handleQuantityDecrement({id : book.id}))}>-</span>
                                    <span>{quantity}</span>
                                    <span className="cursor-pointer"
                                    onClick={() => dispatch(handleQuantityIncrement({id : book.id}))}>+</span>
                                    <span className="absolute w-[18px] h-[18px] text-white bg-red-500 cursor-pointer
                                    rounded-[50%] flex items-center justify-center text-[12px] top-[-7px] right-[-6px]"
                                    onClick={() => dispatch(handleRemoveBookFromCart({id : book.id}))}>x</span>
                                </div>
                                :
                                <button className="bg-primary text-white  font-semibold rounded-[6px] w-[150px] py-[5px]
                                hover:text-black hover:bg-white transition-[all_0.3s] hidden md:block"
                                onClick={() => dispatch(handleAddBookToCart({item : book}))}>
                                    Add To Cart <i className="fa-solid fa-cart-shopping"></i>
                                </button>
                            }
                        </div>
                        </Link>
                        </>
                )})}
                </div>
            }
            {
                !result.length > 0 && isTyping &&
                <div className="absolute bg-white w-full mt-[10px] border-[2px] border-primary_black shadow-md rounded-[4px]
                p-[10px] sm:p-[15px] text-[14px] sm:text-[18px] flex justify-center items-center font-bold">
                    Sorry, no books found. Please try a different search.
                </div>
            }
        </div>
        </div>
    )
}

Search.propTypes = {
    isOpen : PropTypes.bool.isRequired,
    setIsSearchBarOpen : PropTypes.func.isRequired,
};



export default Search
