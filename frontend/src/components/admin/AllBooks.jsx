import { useEffect, useState } from "react"
import DeleteBook from "./DeleteBook";
import { Link } from 'react-router-dom';
import SearchBar from "./search/SearchBar";
import { bookAPi } from "../../api/bookApi";

function AllBooks() {
    const [books,setBooks] = useState(JSON.parse(localStorage.getItem("books")) || []);
    const [deleteAlert,setDeleteAlert] = useState(false);
    const [bookId,setBookId] = useState();
    const [msg,setMsg] = useState();
    const [showMsg,setShowMsg] = useState(false);
    const [currentPage,setCurrentPage] = useState(1);
    const avaliableBooksNm = 10;
    const lastIndex = currentPage * avaliableBooksNm;
    const firstIndex = lastIndex - avaliableBooksNm;
    const currentBooks = books?.slice(firstIndex,lastIndex);
    const pagesNumber = Math.ceil(books?.length / avaliableBooksNm);
    const numbers = [...Array(pagesNumber).keys()]


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
                const data = response.data;
                setBooks(data);
                localStorage.setItem("books",JSON.stringify(data));
            }
        }).catch((reason) => console.log(reason));
    },[books]);

    const handleButtonDelete = (id) => {
        document.body.classList.add('no-scroll');
        setDeleteAlert(true);
        setBookId(id);
    }

    useEffect(() => {
        const message = sessionStorage.getItem('message');
        if (message) {
            setMsg(message);
            setShowMsg(true)
            sessionStorage.removeItem('message');

            setTimeout(() => {
                setShowMsg(false);
            }, 3000);

            setTimeout(() => {
                setMsg("");
            }, 3500);
        }
    }, []);






    return (
        <>
        <div className="px-[20px] mx-auto mt-[20px] min-h-[100vh]">
            <div className="flex flex-col gap-[20px] sm:flex-row justify-between items-center ">
                <h2 className="admin-title self-start">All Books ({books?.length})</h2>
                <SearchBar/>
            </div>
            <div className="flex justify-center flex-wrap items-center gap-[30px] mt-[40px]">
                { currentBooks?.map((book,key) => (
                    <div key={key} className="w-[220px] bg-white rounded-[4px] overflow-hidden shadow-md">
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
                                        <span>more</span>
                                    </Link>
                                    <Link to={`/admin/updatebook/${book?.id}`} className="bg-green-500 rounded-[4px] py-[1px] w-[55px] font-bold text-center cursor-pointer">
                                        <span>update</span>
                                    </Link>
                                    <span className="bg-red-500 rounded-[4px] py-[1px] w-[55px] font-bold text-center cursor-pointer"
                                    onClick={() => handleButtonDelete(book?.id)}>delete</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <div className="max-w-[300px] sm:max-w-[500px] lg:max-w-[600px] mx-auto bg-white flex items-center justify-center gap-[15px] md:gap-[30px] mt-[20px] px-[20px] py-[10px] rounded-[50px]
        shadow-lg overflow-hidden text-[12px] md:text-[18px]">
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

        {deleteAlert && <DeleteBook setDeleteAlert={setDeleteAlert} bookId={bookId} />}

        <div className={`${showMsg ? "bottom-[15%]" : "bottom-[-100%]"} fixed right-[3%]  border-green-500 border-[2px]
        p-[8px] sm:p-[12px] text-[10px] sm:text-[16px] rounded-[4px] bg-lightwhite shadow-md transition-[0.3s]`}>
            {msg}
            <span className="ml-[10px] text-green-500"><i className="fa-solid fa-circle-check"></i></span>
        </div>
        </>
    )
}

export default AllBooks
