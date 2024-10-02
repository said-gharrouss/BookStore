import { useParams } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux'
import { handleAddBookToCart, handleQuantityDecrement, handleQuantityIncrement, handleRemoveBookFromCart } from '../Redux/feauters/shopcartbooksSlice';
import Book from '../components/book/Book';
import { useEffect } from 'react';

function BookDetail() {
    const { id } = useParams();

    const books = JSON.parse(localStorage.getItem("books"));

    const filteredBooks = books?.filter(item => item.id == id);
    let book = filteredBooks?.length > 0 ? filteredBooks[0] : null;

    const shopingCart = useSelector(({shopingCart}) => shopingCart.books);
    const isBookInCart = shopingCart?.some(item => item.item.id == book.id);
    const bookInCart = shopingCart?.filter(item => item.item.id == book.id)
    const quantity = bookInCart[0]?.quantity
    const favBooks = localStorage.getItem("favBooks") ? JSON.parse(localStorage.getItem("favBooks")) : [] ;
    const dispatch = useDispatch();

    const booksYouMayAlsoLike = books?.filter(item => (item.genre == book.genre) && (item.id !== book.id));

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant'
        });
    }, []);

    // const currentURL = window.location.href;
    // console.log(currentURL);

    const languageCodes = {
        "AR": "العربية",
        "EN": "English",
        "FR": "French",
        "SP": "Spanish"
    };

    function getLanguageName(code) {
        return languageCodes[code] || "Unknown";
    }

    return (
        <div className='py-[100px] container'>
            <div className='min-h-[100vh] flex flex-col sm:flex-row gap-[50px]'>
                <div className='flex-1'>
                    <img src={`${import.meta.env.VITE_BACKEND_URL}/storage/${book?.image}`} alt=""
                    className='w-full h-[450px] bg-cover'/>
                </div>
                <div className='flex-1 flex flex-col gap-[10px]'>
                    <div className='hover:bg-gray-100 p-[10px] rounded-[4px] transition-[0.3s]'>
                        <span className='font-semibold'>Title : </span>
                        <span className='text-gray-500'>
                            {book?.title}
                        </span>
                    </div>

                    <div className='overflow-y-auto h-[80px] hover:bg-gray-100 p-[10px] rounded-[4px] transition-[0.3s]'>
                        <span className='font-semibold'>Description : </span>
                        <span className='text-gray-500'>
                            {book?.description}
                        </span>
                    </div>
                    <div className='hover:bg-gray-100 p-[10px] rounded-[4px] transition-[0.3s]'>
                        <span className='font-semibold'>Author(s) : </span>
                        <span className='text-gray-500'>
                            {book?.author}
                        </span>
                    </div>
                    <div className='hover:bg-gray-100 p-[10px] rounded-[4px] transition-[0.3s]'>
                        <span className='font-semibold'>Genre : </span>
                        <span className='text-gray-500'>
                            {book?.categories ? book?.categories : "we dont have this information"}
                        </span>
                    </div>
                    <div className='hover:bg-gray-100 p-[10px] rounded-[4px] transition-[0.3s]'>
                        <span className='font-semibold'>Page count : </span>
                        <span className='text-gray-500'>
                            {book?.page_count}
                        </span>
                    </div>

                    <div className='hover:bg-gray-100 p-[10px] rounded-[4px] transition-[0.3s]'>
                        <span className='font-semibold'>Language : </span>
                        <span className='text-gray-500'>
                            {getLanguageName(book?.language)}
                        </span>
                    </div>

                    <div className='hover:bg-gray-100 p-[10px] rounded-[4px] transition-[0.3s]'>
                        <span className='font-semibold'>Publication date : </span>
                        <span className='text-gray-500'>
                            {book?.publication_date}
                        </span>
                    </div>

                    <div className='hover:bg-gray-100 p-[10px] rounded-[4px] transition-[0.3s]'>
                        <span className='font-semibold'>Publisher : </span>
                        <span className='text-gray-500'>
                            {book?.publisher}
                        </span>
                    </div>
                    {
                        isBookInCart ?
                        <div className=" min-h-[40px] font-semibold bg-gray-100 flex items-center
                        justify-center gap-[40px] relative text-[30px]">
                            <span className={`cursor-pointer
                            ${quantity > 1 ? "" : "not-clickable"}`}
                            onClick={() => dispatch(handleQuantityDecrement({id : book.id}))}>-</span>
                            <span>{quantity}</span>
                            <span className="cursor-pointer"
                            onClick={() => dispatch(handleQuantityIncrement({id : book.id}))}>+</span>
                            <span className="absolute w-[18px] h-[18px] text-white bg-red-500 cursor-pointer
                            rounded-[50%] flex items-center justify-center text-[12px] top-[-7px] right-[-6px]"
                            onClick={() => dispatch(handleRemoveBookFromCart({id : book.id}))}>x</span>
                        </div>
                        :
                        <button className=" text-white min-h-[40px] font-semibold rounded-[6px]
                        hover:text-primary_black  transition-[all_0.3s] relative overflow-hidden hover:shadow-md add_to_cart_btn"
                        onClick={() => dispatch(handleAddBookToCart({item : book}))}>
                            Add To Cart <i className="fa-solid fa-cart-shopping"></i>
                        </button>
                    }
                </div>
            </div>
            <h2 className='text-[30px] font-bold title-style mt-[30px]'>You may also like</h2>
            <div className='flex gap-[20px_30px] justify-center flex-wrap mt-[50px]'>
                {
                    booksYouMayAlsoLike?.map((book,key) => {
                        const isBookInFavorites = favBooks.some(item => item.id === book.id);
                        const isBookInCart = shopingCart.some(cartItem => cartItem.item.id === book.id);
                        return <Book key={key} item={book} isBookInFavorites={isBookInFavorites} isBookInCart={isBookInCart}/>
                    })
                }
            </div>
        </div>
    )
}

export default BookDetail
