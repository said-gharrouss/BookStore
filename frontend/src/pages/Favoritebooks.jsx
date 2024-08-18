import { useDispatch, useSelector } from 'react-redux';
import Book from '../components/book/Book';
import { useEffect } from 'react';
import { getBooks } from '../Redux/feauters/favoritbooksSlice';

function Favoritebooks() {
    const shopingCart = useSelector(({ shopingCart }) => shopingCart.books);
    const favBooks = useSelector(state => state.favBooks.books);
    const user = useSelector(state => state.user.infos);
    const dispatch = useDispatch();

    useEffect(() => {
        if (user?.id) {
            dispatch(getBooks(user?.id));
        }
    }, [dispatch, user]);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant'
        });
    }, []);

    return (
        <div className="container mx-auto pt-[90px] px-[20px] min-h-[100vh]">
            <h2 className="font-bold text-[30px] title-style">Your Favorite Books ({favBooks?.length})</h2>
                <div className="flex gap-[20px] justify-center flex-wrap mt-[40px]">
                    {
                        favBooks?.length > 0 ?
                            favBooks?.map((item, key) => {
                                const isBookInFavorites = favBooks?.some(book => book?.id === item?.id);
                                const isBookInCart = shopingCart?.some(cartItem => cartItem.item?.id === item?.id);
                                return <Book key={key} item={item} isBookInFavorites={isBookInFavorites} isBookInCart={isBookInCart} />;
                            })
                            :
                            <p className='text-[20px] sm:text-[30px] text-center text-gray-500'>
                                Empty favorites! Start adding your preferred books now.
                            </p>
                    }
                </div>
        </div>
    )
}

export default Favoritebooks;

