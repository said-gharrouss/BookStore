import { useEffect, useState } from "react"
import Filters from "../filters/Filters"
import Book from "../book/Book";
import { useSelector} from 'react-redux';
import { bookAPi } from "../../api/bookApi";
import BooksSkeleton from "./BooksSkeleton";

function Books() {
    const shopingCart = useSelector(({shopingCart}) => shopingCart.books);
    const langFilter = useSelector(({filters}) => filters.languageFilter);
    const priceFilter = useSelector(({filters}) => filters.priceFilter);
    const categorieFilter = useSelector(({filters}) => filters.categorieFilter);
    const [books,setBooks] = useState(localStorage.getItem("books") ? JSON.parse(localStorage.getItem("books")) : []);
    const favBooks = useSelector(state => state.favBooks.books);

    const handlePrevPage = () => {
        if(currentPage !== 1){
            setCurrentPage(prev => prev -= 1);
        }
    }

    const handleNextPage = () => {
        if(currentPage !== pagesNumber){
            setCurrentPage(prev => prev +1);
        }
    }

    useEffect(() => {
        bookAPi.getBooks()
        .then((response) => {
            if(response.status === 200){
                localStorage.setItem("books",JSON.stringify(response.data));
                setBooks(response.data);
            }
        }).catch((reason) => reason);
    },[books]);

    let filtredBooksByLanguage;
    if(langFilter !== "All Languages" && books){
        filtredBooksByLanguage = books.filter(item => item.language === langFilter);
    } else {
        filtredBooksByLanguage = books;
    }


    let filteredBooksByPrice;
    if(priceFilter !== "All Prices" && books){
        switch(priceFilter){
            case "under $10" :
                filteredBooksByPrice = books.filter(item => item.price < 10);
                break;
                case "$10-$20" :
                    filteredBooksByPrice = books.filter(item => item.price >= 10 && item.price <= 20);
                    break;
            case "$20-$30" :
                filteredBooksByPrice = books.filter(item => item.price >= 20 && item.price <= 30);
                break;
            case "$30-$40" :
                filteredBooksByPrice = books.filter(item => item.price >= 30 && item.price <= 40);
                break;
            case "upper $40" :
                filteredBooksByPrice = books.filter(item => item.price > 40);
                break;
            default :
                filteredBooksByPrice = books.filter(item => parseInt(item.price) === parseInt(priceFilter));
                break;
            }
    } else {
        filteredBooksByPrice = books;
    }

    let filtredBooksByCategorie;
    if(categorieFilter !== "All Categories" && books){
        filtredBooksByCategorie = books.filter(item => item.genre === categorieFilter);
    } else {
        filtredBooksByCategorie = books;
    }

    let finalBooks = [];
    filtredBooksByLanguage.map((item) => {
        const isInFiltredByPrice = filteredBooksByPrice.some(book => book.id == item.id);
        const isInFiltredByCategorie = filtredBooksByCategorie.some(book => book.id == item.id);
        if(isInFiltredByPrice && isInFiltredByCategorie){
            finalBooks = [...finalBooks,item];
        }
    })

    const [currentPage,setCurrentPage] = useState(1);
    const avaliableBooksNm = 10;
    const lastIndex = currentPage * avaliableBooksNm;
    const firstIndex = lastIndex - avaliableBooksNm;
    const currentBooks = finalBooks?.slice(firstIndex,lastIndex);
    const pagesNumber = Math.ceil(finalBooks?.length / avaliableBooksNm);
    const numbers = [...Array(pagesNumber).keys()]


    return (
        <>
            <h2 className="font-bold text-[20px] sm:text-[30px] mb-[30px] title-style">Books ({finalBooks.length}) </h2>
            <Filters/>
            <div className="flex gap-[20px]  justify-center flex-wrap mt-[-10px] sm:mt-[40px]">
                {
                    currentBooks.length > 0 ?
                    currentBooks.map((item) => {
                        const isBookInFavorites = favBooks?.some(book => book?.id === item?.id);
                        const isBookInCart = shopingCart.some(cartItem => cartItem.item?.id === item?.id);
                        return <Book key={item.id} item={item} isBookInFavorites={isBookInFavorites} isBookInCart={isBookInCart}/>
                    }) : <p className="text-center font-semibold text-[18px] md:text-[25px]" >Oops! No books found with the selected filters. Try refining your search.</p>
                }
            </div>

            {
                finalBooks.length >= avaliableBooksNm &&
                <div className="max-w-[300px] sm:max-w-[500px] lg:max-w-[600px] mx-auto bg-white flex items-center justify-center gap-[15px] md:gap-[30px] mt-[50px] px-[20px] py-[10px] rounded-[50px]
                    overflow-hidden text-[12px] md:text-[18px] border-[1px] border-primary_black ">
                        <span className="flex items-center cursor-pointer hover:text-gray-400 transition-[0.3s]"
                        onClick={() => handlePrevPage()}>
                            <span className="mr-[5px] md:mr-[10px]"><i className="fa-solid fa-angle-left"></i></span>
                            <span>Previous</span>
                        </span>
                        <div className="flex gap-[10px]">
                            {numbers?.map((e,key) => {
                                return (
                                    <div key={key} className={`${e + 1 === currentPage ? "bg-primary text-white" : ""}
                                    w-[15px] h-[15px] md:w-[30px] md:h-[30px] rounded-[50%] flex justify-center items-center cursor-pointer transition-[0.3s]`}
                                    onClick={() => setCurrentPage(e + 1)}>{e + 1}</div>
                                )
                            })}
                        </div>
                        <span className="flex items-center cursor-pointer hover:text-gray-400 transition-[0.3s]"
                        onClick={()=> handleNextPage()}>
                            <span>Next</span>
                            <span className="ml-[5px] md:ml-[10px]"><i className="fa-solid fa-chevron-right"></i></span>
                        </span>
                </div>
            }

        </>
    )
}

export default Books
