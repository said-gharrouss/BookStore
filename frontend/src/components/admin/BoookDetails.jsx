import { useEffect, useState } from "react";
import {Link, useParams } from "react-router-dom"
import DeleteBook from "./DeleteBook";

function BoookDetails() {
    const {id} = useParams();
    const selectedBook = JSON.parse(localStorage.getItem("bookList")).filter(e => e.id == id)[0];
    const [showDeleteAlert,setShowDeleteAlert] = useState(false);
    const [selectedBookId,setSelectedBookId] = useState();

    const confirmDeleteBook = () => {
        document.body.classList.add('no-scroll');
        setShowDeleteAlert(true);
        setSelectedBookId(selectedBook?.id);
    }

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant'
        });
    }, []);



    return (
        <>
        {selectedBook &&
        <div className="min-h-[100vh] w-[80%] lg:w-[50%] bg-white mx-auto mt-[50px] shadow-md p-[20px] rounded-[4px]">
            <img src={`${import.meta.env.VITE_BACKEND_URL}/storage/${selectedBook.image}`} alt=""
            className="h-[250px] max-h-full w-full max-w-full rounded-[4px]"/>
            <div className="flex flex-col gap-[10px] mt-[10px]">
                <div className="flex justify-between py-[10px] px-[10px] rounded-[4px] hover:bg-gray-100 transition-[0.3s]
                border-b-[1px] border-gray-300">
                    <span className="font-bold">Title : </span>
                    <span>{selectedBook.title}</span>
                </div>
                <div className="flex justify-between py-[10px] px-[10px] rounded-[4px] hover:bg-gray-100 transition-[0.3s] border-b-[1px] border-gray-300">
                    <span className="font-bold">Author : </span>
                    <span>{selectedBook.author}</span>
                </div>
                <div  className="flex justify-between py-[10px] px-[10px] rounded-[4px] hover:bg-gray-100 transition-[0.3s] border-b-[1px] border-gray-300">
                    <span className="font-bold">Genre : </span>
                    <span>{selectedBook.genre}</span>
                </div>
                <div  className="flex justify-between py-[10px] px-[10px] rounded-[4px] hover:bg-gray-100 transition-[0.3s] border-b-[1px] border-gray-300">
                    <span className="font-bold">Language : </span>
                    <span className="ml-[5px]">
                        {selectedBook?.language === "AR" && "Arabic"}
                        {selectedBook?.language === "SP" && "Spanish"}
                        {selectedBook?.language === "FR" && "French"}
                        {selectedBook?.language === "EN" && "English"}
                    </span>
                </div>
                <div  className="flex justify-between py-[10px] px-[10px] rounded-[4px] hover:bg-gray-100 transition-[0.3s] border-b-[1px] border-gray-300">
                    <span className="font-bold">Publication Date : </span>
                    <span>{selectedBook.publication_date}</span>
                </div>
                <div  className="flex justify-between py-[10px] px-[10px] rounded-[4px] hover:bg-gray-100 transition-[0.3s] border-b-[1px] border-gray-300">
                    <span className="font-bold">Publisher : </span>
                    <span>{selectedBook.publisher}</span>
                </div>
                <div  className="flex justify-between py-[10px] px-[10px] rounded-[4px] hover:bg-gray-100 transition-[0.3s] border-b-[1px] border-gray-300">
                    <span className="font-bold">Price : </span>
                    <span>${selectedBook.price}</span>
                </div>
                <div  className="flex justify-between py-[10px] px-[10px] rounded-[4px] hover:bg-gray-100 transition-[0.3s] border-b-[1px] border-gray-300">
                    <span className="font-bold">Page Count : </span>
                    <span>{selectedBook.page_count}</span>
                </div>
                <div  className="flex justify-between py-[10px] px-[10px] rounded-[4px] hover:bg-gray-100 transition-[0.3s] border-b-[1px] border-gray-300">
                    <span className="font-bold">Quantity : </span>
                    <span>{selectedBook.quantity}</span>
                </div>
                <div className="flex flex-col gap-[10px] py-[10px] px-[10px] rounded-[4px] hover:bg-gray-100 transition-[0.3s] border-b-[1px] border-gray-300">
                    <span className="font-bold">Description :</span>
                    <span className="max-h-[200px] overflow-y-scroll search-scrollbar">{selectedBook.description}</span>
                </div>
                {selectedBook.created_at &&
                    <div className="flex justify-between py-[10px] px-[10px] rounded-[4px] hover:bg-gray-100 transition-[0.3s] border-b-[1px] border-gray-300">
                        <span className="font-bold">You created the book at :</span>
                        <span>{selectedBook.created_at.slice(0,10)}</span>
                    </div>
                }
                {selectedBook.updated_at &&
                    <div className="flex justify-between py-[10px] px-[10px] rounded-[4px] hover:bg-gray-100 transition-[0.3s]">
                        <span className="font-bold">You updated the book at : </span>
                        <span>{selectedBook.updated_at.slice(0,10)}</span>
                    </div>
                }
                <div className="flex justify-end gap-[20px] mt-[10px]">
                    <Link to={`/admin/updatebook/${selectedBook?.id}`}>
                        <button className="px-[25px] py-[5px] bg-green-500 text-white font-bold rounded-[4px] border-[1px] hover:border-green-500
                        hover:bg-white hover:text-green-500 transition-[0.3s] ">Update</button>
                    </Link>
                    <Link>
                        <button className="px-[25px] py-[5px] bg-red-500 text-white font-bold rounded-[4px] border-[1px]
                        hover:border-red-500 hover:bg-white hover:text-red-500 transition-[0.3s]"
                        onClick={() => confirmDeleteBook()}>Delete</button>
                    </Link>
                </div>
            </div>
        </div>
        }
        {showDeleteAlert && <DeleteBook setShowDeleteAlert={setShowDeleteAlert} selectedBookId={selectedBookId} />}
        </>
    )
}

export default BoookDetails
