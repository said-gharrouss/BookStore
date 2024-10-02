import { useEffect, useState } from "react"
import DeleteBook from "../DeleteBook";
import { Link } from 'react-router-dom';
import SearchBar from "../search/SearchBar";
import { bookAPi } from "../../../api/bookApi";
import BookListSkeleton from "./BookListSkeleton";

function BookList() {
    const [bookList,setBookList] = useState(JSON.parse(localStorage.getItem("bookList")) || []);
    const [showDeleteAlert,setShowDeleteAlert] = useState(false);
    const [selectedBookId,setSelectedBookId] = useState();
    const [notificationMessage,setNotificationMessage] = useState();
    const [isNotificationVisible,setIsNotificationVisible] = useState(false);
    const [activePage,setActivePage] = useState(1);
    const booksPerPage = 10;
    const lastIndex = activePage * booksPerPage;
    const firstIndex = lastIndex - booksPerPage;
    const paginatedBooks = bookList?.slice(firstIndex,lastIndex);
    const totalPages = Math.ceil(bookList?.length / booksPerPage);
    const pageNumbers = [...Array(totalPages).keys()]


    const goToPreviousPage = () => {
        if(activePage !== 1){
            setActivePage(prev => prev -= 1);
        }
    }

    const goToNextPage = () => {
        if(activePage !== totalPages){
            setActivePage(prev => prev +1);
        }
    }

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant'
        });
    }, []);

    useEffect(() => {
        bookAPi.getBooks()
        .then((response) => {
            if(response.status === 200){
                let data = response.data;
                data = data.reverse();
                localStorage.setItem("bookList",JSON.stringify(data));
                setBookList(data);
            }
        }).catch((reason) => console.log(reason));
    },[bookList]);

    const confirmDeleteBook = (id) => {
        document.body.classList.add('no-scroll');
        setShowDeleteAlert(true);
        setSelectedBookId(id);
    }

    useEffect(() => {
        const message = sessionStorage.getItem('message');
        if (message) {
            setNotificationMessage(message);
            setIsNotificationVisible(true)
            sessionStorage.removeItem('message');

            setTimeout(() => {
                setIsNotificationVisible(false);
            }, 3000);

            setTimeout(() => {
                setNotificationMessage("");
            }, 3500);
        }
    }, []);



    return (
        <>
        <div className="px-[20px] mx-auto mt-[20px] min-h-[100vh]">
            <div className="flex flex-col gap-[20px] sm:flex-row justify-between items-center ">
                <h2 className="admin-title self-start">All Books ({bookList?.length})</h2>
                <SearchBar/>
            </div>
            <div className="flex justify-center flex-wrap items-center gap-[30px] mt-[40px]">
                {paginatedBooks.length > 0 ?
                <>
                { paginatedBooks?.map((book,key) => (
                    <div key={key} className="w-[220px] bg-white rounded-[4px] overflow-hidden shadow-md hover:shadow-xl transition-[0.3s]">
                        <Link to={`/admin/bookdetails/${book.id}`}>
                            <img src={`${import.meta.env.VITE_BACKEND_URL}/storage/${book?.image}`} alt="" loading="lazy"
                            className="min-w-full h-[200px] max-h-[200px] bg-contain bg-center bg-no-repeat"/>
                        </Link>
                        <div className="p-[10px]">
                            <h3 className="font-bold h-[50px]">{book?.title}</h3>
                            <div className="mt-[30px]">
                                <div className="w-full h-[1px] bg-gray-200 relative">
                                    <span className="text-[11px] py-[2px] px-[8px] bg-white text-gray-500 font-bold rounded-[4px]
                                    absolute top-[-50%] left-[50%] translate-x-[-50%] translate-y-[-50%] "> Book Info</span>
                                </div>
                                <div className="my-[20px] text-[12px] text-[#888] flex justify-between items-center">
                                    <span>
                                        <i className="fa-solid fa-book"></i>
                                        <span className="ml-[5px]">{book?.quantity}</span>
                                    </span>
                                    <span>
                                        <i className="fa-solid fa-globe"></i>
                                        <span className="ml-[5px]">
                                            {book?.language === "AR" && "Arabic"}
                                            {book?.language === "SP" && "Spanish"}
                                            {book?.language === "FR" && "French"}
                                            {book?.language === "EN" && "English"}
                                        </span>
                                    </span>
                                    <span>
                                        $ {book?.price}
                                    </span>
                                </div>
                                <div className="w-full h-[1px] bg-gray-200 relative">
                                    <span className="text-[11px] py-[2px] px-[8px] bg-white text-gray-500 font-bold rounded-[4px]
                                    absolute top-[-50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">Actions</span>
                                </div>
                                <div className="text-[12px] mt-[20px] flex justify-between items-center text-white">
                                    <Link to={`/admin/bookdetails/${book.id}`} className="bg-blue-500 rounded-[4px] py-[1px] w-[55px] font-bold text-center cursor-pointer">
                                        <span>view</span>
                                    </Link>
                                    <Link to={`/admin/updatebook/${book?.id}`} className="bg-green-500 rounded-[4px] py-[1px] w-[55px] font-bold text-center cursor-pointer">
                                        <span>update</span>
                                    </Link>
                                    <span className="bg-red-500 rounded-[4px] py-[1px] w-[55px] font-bold text-center cursor-pointer"
                                    onClick={() => confirmDeleteBook(book?.id)}>delete</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                </>
                : <BookListSkeleton/>
                }
            </div>
        </div>
        { paginatedBooks.length > 0 &&
            <div className="max-w-[300px] sm:max-w-[500px] lg:max-w-[600px] mx-auto bg-white flex items-center justify-center gap-[15px] md:gap-[30px] mt-[20px] px-[20px] py-[10px] rounded-[50px]
            shadow-md overflow-hidden text-[12px] md:text-[18px]">
                <span className="flex items-center cursor-pointer hover:text-gray-400 transition-[0.3s]"
                onClick={() => goToPreviousPage()}>
                    <span className="mr-[5px] md:mr-[10px]"><i className="fa-solid fa-angle-left"></i></span>
                    <span>Previous</span>
                </span>
                <div className="flex gap-[10px]">
                    {pageNumbers?.map((e,key) => {
                        return (
                            <div key={key} className={`${e + 1 === activePage ? "bg-primary text-white" : ""}
                            w-[15px] h-[15px] md:w-[30px] md:h-[30px] rounded-[50%] flex justify-center items-center cursor-pointer transition-[0.3s]`}
                            onClick={() => setActivePage(e + 1)}>{e + 1}</div>
                        )
                    })}
                </div>
                <span className="flex items-center cursor-pointer hover:text-gray-400 transition-[0.3s]"
                onClick={()=> goToNextPage()}>
                    <span>Next</span>
                    <span className="ml-[5px] md:ml-[10px]"><i className="fa-solid fa-chevron-right"></i></span>
                </span>
            </div>
        }

        {showDeleteAlert && <DeleteBook setShowDeleteAlert={setShowDeleteAlert} selectedBookId={selectedBookId} />}

        <div className={`${isNotificationVisible ? "bottom-[15%]" : "bottom-[-100%]"} fixed right-[3%]  border-green-500 border-[2px]
        p-[8px] sm:p-[12px] text-[10px] sm:text-[16px] rounded-[4px] bg-lightwhite shadow-md transition-[0.3s]`}>
            {notificationMessage}
            <span className="ml-[10px] text-green-500"><i className="fa-solid fa-circle-check"></i></span>
        </div>
        </>
    )
}

export default BookList
