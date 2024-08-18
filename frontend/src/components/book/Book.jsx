import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import {
    handleAddBookToCart,
    handleQuantityDecrement,
    handleQuantityIncrement,
    handleRemoveBookFromCart
} from "../../Redux/feauters/shopcartbooksSlice";
import {
    addBook,
    deleteBook,
    handleAddToFavorite,
    handleRemoveFromFavorite,
} from "../../Redux/feauters/favoritbooksSlice";
import {LOGIN_FORM} from "../../router/Index"

function Book({ item, isBookInFavorites, isBookInCart }) {
    const [hover, setHover] = useState(null);
    const dispatch = useDispatch();
    const shopingCart = useSelector(({ shopingCart }) => shopingCart.books);
    const currentBook = shopingCart?.filter(book => book.item?.id === item?.id);
    const quantity = currentBook[0]?.quantity;
    const user = useSelector(state => state.user.infos);
    const [loginForm, setLoginForm] = useState(false);
    const navigate = useNavigate();

    const handleURL = () => {
        if (user?.name) {
            window.location.href = `http://localhost:3000/user/book/${item.id}`;
        } else {
            window.location.href = `http://localhost:3000/book/${item.id}`;
        }
    }

    useEffect(() => {
        if (loginForm) {
            navigate(LOGIN_FORM);
        }
    }, [loginForm, navigate]);

    const handleAddFavorite = () => {
        if(user?.id){
            dispatch(handleAddToFavorite(item));
            dispatch(addBook({user_id : user.id,book_id : item?.id}));
        } else {
            setLoginForm(true);
        }
    };
    const handleRemoveFavorite = () => {
        dispatch(handleRemoveFromFavorite({id:item?.id}));
        dispatch(deleteBook({user_id : user.id, item}))
    }

    return (
        <>
            <div className="w-[201px] bg-secondary shadow-md p-[20px] relative overflow-hidden"
                onMouseEnter={() => setHover(item?.id)}
                onMouseLeave={() => setHover(null)}>
                <div className={`h-[50px] flex items-center justify-center gap-[15px] bg-primary text-white top-[-50px] absolute w-full transition-[all_0.3s] left-0
                ${hover === item?.id ? "book_mouseEnter" : "book_mouseLeave"} hidden md:flex `}>

                    <span className={`cursor-pointer ${isBookInFavorites && "red-heart"}`}
                        onClick={() => {
                            isBookInFavorites ? handleRemoveFavorite() : handleAddFavorite();
                        }} >
                        <i className="fa-solid fa-heart"></i>
                    </span>
                    <span onClick={() => handleURL()} className="cursor-pointer">
                        <i className="fa-solid fa-eye"></i>
                    </span>
                </div>

                <div className="absolute top-[8px] right-[10px] bg-primary_black text-white h-[30px] w-[30px] text-[15px] rounded-[50%]
                flex justify-center items-center md:hidden">
                    <span className={`cursor-pointer ${isBookInFavorites && "red-heart"}`}
                        onClick={() => {
                            isBookInFavorites ? handleRemoveFavorite() : handleAddFavorite();
                        }} >
                        <i className="fa-solid fa-heart"></i>
                    </span>
                </div>

                <div className="w-full h-[220px] shadow-md cursor-pointer"
                    onClick={() => handleURL()}>
                    <img src={`${import.meta.env.VITE_BACKEND_URL}/storage/${item?.image}`} alt="" className="w-full h-full" />
                </div>
                <div className="text-center flex flex-col justify-between h-[150px] ">
                    <h3 className="mt-[10px] font-bold">{item?.title}</h3>
                    <span className="font-bold">${item?.price}</span>
                    {
                        isBookInCart ?
                            <div className="min-h-[40px] font-semibold bg-gray-100 flex items-center
                            justify-center gap-[20px] relative">
                                <span className={`cursor-pointer ${quantity > 1 ? "" : "not-clickable"} text-[22px]`}
                                    onClick={() => dispatch(handleQuantityDecrement({ id: item?.id }))}>-</span>
                                <span className="text-[18px]">{quantity}</span>
                                <span className="cursor-pointer text-[22px]"
                                    onClick={() => dispatch(handleQuantityIncrement({ id: item?.id }))}>+</span>
                                <span className="absolute w-[20px] h-[20px] text-white bg-red-500 cursor-pointer
                                rounded-[50%] flex items-center justify-center text-[15px] top-[-7px] right-[-6px]"
                                    onClick={() => dispatch(handleRemoveBookFromCart({ id: item?.id }))}>x</span>
                            </div>
                            :
                            <button className="min-h-[40px] font-semibold rounded-[6px]
                            text-white hover:text-primary_black bg-white transition-[all_0.3s] overflow-hidden relative z-[1]  add_to_cart_btn"
                                onClick={() => dispatch(handleAddBookToCart({ item: item }))}>
                                Add To Cart <i className="fa-solid fa-cart-shopping"></i>
                            </button>
                    }
                </div>
            </div>
        </>
    )
}

Book.propTypes = {
    item: PropTypes.object.isRequired,
    isBookInFavorites: PropTypes.bool.isRequired,
    isBookInCart: PropTypes.bool.isRequired,
};

export default Book;

