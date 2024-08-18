import { useEffect, useState } from "react";
import {Link, useParams } from "react-router-dom"
import DeleteBook from "./DeleteBook";

function BoookDetails() {
    const {id} = useParams();
    const book = JSON.parse(localStorage.getItem("books")).filter(e => e.id == id)[0];
    const [deleteAlert,setDeleteAlert] = useState(false);
    const [bookId,setBookId] = useState();

    const handleButtonDelete = () => {
        document.body.classList.add('no-scroll');
        setDeleteAlert(true);
        setBookId(book?.id);
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
        {book &&
        <div className="min-h-[100vh] w-[80%] lg:w-[50%] bg-white mx-auto mt-[50px] shadow-md p-[20px] rounded-[4px]">
            <img src={`${import.meta.env.VITE_BACKEND_URL}/storage/${book.image}`} alt=""
            className="h-[250px] max-h-full w-full max-w-full rounded-[4px]"/>
            <div className="flex flex-col gap-[10px] mt-[10px]">
                <div className="flex justify-between py-[10px] px-[10px] rounded-[4px] hover:bg-gray-100 transition-[0.3s]
                border-b-[1px] border-gray-300">
                    <span className="font-bold">Title : </span>
                    <span>{book.title}</span>
                </div>
                <div className="flex justify-between py-[10px] px-[10px] rounded-[4px] hover:bg-gray-100 transition-[0.3s] border-b-[1px] border-gray-300">
                    <span className="font-bold">Author : </span>
                    <span>{book.author}</span>
                </div>
                <div  className="flex justify-between py-[10px] px-[10px] rounded-[4px] hover:bg-gray-100 transition-[0.3s] border-b-[1px] border-gray-300">
                    <span className="font-bold">Genre : </span>
                    <span>{book.genre}</span>
                </div>
                <div  className="flex justify-between py-[10px] px-[10px] rounded-[4px] hover:bg-gray-100 transition-[0.3s] border-b-[1px] border-gray-300">
                    <span className="font-bold">Language : </span>
                    <span className="ml-[5px]">
                        {book?.language === "AR" && "Arabic"}
                        {book?.language === "SP" && "Spanish"}
                        {book?.language === "FR" && "French"}
                        {book?.language === "EN" && "English"}
                    </span>
                </div>
                <div  className="flex justify-between py-[10px] px-[10px] rounded-[4px] hover:bg-gray-100 transition-[0.3s] border-b-[1px] border-gray-300">
                    <span className="font-bold">Publication Date : </span>
                    <span>{book.publication_date}</span>
                </div>
                <div  className="flex justify-between py-[10px] px-[10px] rounded-[4px] hover:bg-gray-100 transition-[0.3s] border-b-[1px] border-gray-300">
                    <span className="font-bold">Publisher : </span>
                    <span>{book.publisher}</span>
                </div>
                <div  className="flex justify-between py-[10px] px-[10px] rounded-[4px] hover:bg-gray-100 transition-[0.3s] border-b-[1px] border-gray-300">
                    <span className="font-bold">Price : </span>
                    <span>${book.price}</span>
                </div>
                <div  className="flex justify-between py-[10px] px-[10px] rounded-[4px] hover:bg-gray-100 transition-[0.3s] border-b-[1px] border-gray-300">
                    <span className="font-bold">Page Count : </span>
                    <span>{book.page_count}</span>
                </div>
                <div  className="flex justify-between py-[10px] px-[10px] rounded-[4px] hover:bg-gray-100 transition-[0.3s] border-b-[1px] border-gray-300">
                    <span className="font-bold">Quantity : </span>
                    <span>{book.quantity}</span>
                </div>
                <div className="flex flex-col gap-[10px] py-[10px] px-[10px] rounded-[4px] hover:bg-gray-100 transition-[0.3s] border-b-[1px] border-gray-300">
                    <span className="font-bold">Description :</span>
                    <span className="max-h-[200px] overflow-y-scroll search-scrollbar">{book.description}</span>
                </div>
                {book.created_at &&
                    <div className="flex justify-between py-[10px] px-[10px] rounded-[4px] hover:bg-gray-100 transition-[0.3s] border-b-[1px] border-gray-300">
                        <span className="font-bold">You created the book at :</span>
                        <span>{book.created_at.slice(0,10)}</span>
                    </div>
                }
                {book.updated_at &&
                    <div className="flex justify-between py-[10px] px-[10px] rounded-[4px] hover:bg-gray-100 transition-[0.3s]">
                        <span className="font-bold">You updated the book at : </span>
                        <span>{book.updated_at.slice(0,10)}</span>
                    </div>
                }
                <div className="flex justify-end gap-[20px] mt-[10px]">
                    <Link to={`/admin/updatebook/${book?.id}`}>
                        <button className="px-[25px] py-[5px] bg-green-500 text-white font-bold rounded-[4px]">Update</button>
                    </Link>
                    <Link>
                        <button className="px-[25px] py-[5px] bg-red-500 text-white font-bold rounded-[4px]"
                        onClick={() => handleButtonDelete()}>Delete</button>
                    </Link>
                </div>
            </div>
        </div>
        }
        {deleteAlert && <DeleteBook setDeleteAlert={setDeleteAlert} bookId={bookId} />}
        </>
    )
}

export default BoookDetails
