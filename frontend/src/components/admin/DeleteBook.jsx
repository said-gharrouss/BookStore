import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ADMIN_HOME } from "../../router/Index";
import { bookAPi } from "../../api/bookApi";
import PropTypes from 'prop-types';

function DeleteBook({setDeleteAlert,bookId}) {
    const [isLoading,setIsLoading] = useState(false);
    const navigate = useNavigate();
    const handleDelete = (id) => {
        setIsLoading(true);
        bookAPi.deleteBook(id)
        .then(response => {
            if(response.status === 200){
                document.body.classList.remove('no-scroll');
                let books = JSON.parse(localStorage.getItem("books"));
                books = books.filter(book => book.id !== id);
                localStorage.setItem("books",JSON.stringify(books));
                setDeleteAlert(false);
                navigate(ADMIN_HOME);
            }
        }).catch(reason => console.log(reason))
        .finally(() => setIsLoading(false));
    }

    const handleButtonCancel = () => {
        setDeleteAlert(false);
        document.body.classList.remove('no-scroll');
    }

    return (
        <div className="fixed top-0 left-0 w-full h-[100%] bg-[#00000092] z-[5] flex justify-center items-center">
            <div className="bg-white p-[20px] rounded-[4px] w-[400px]">
                <h2 className="border-b-[1px] border-gray-400 pb-[10px] font-bold">Delete Book ?</h2>
                <p className="my-[15px]">Are you sure you want to delete the book. This action cannot be undone.</p>
                <div className="flex justify-end gap-[10px]">
                    <button className="bg-primary_black text-white font-bold px-[10px] py-[5px] rounded-[50px]
                    hover:bg-gray-500 transition-[0.3s]"
                    onClick={() => handleButtonCancel()}>Cancel</button>
                    {!isLoading ?
                    <button className="bg-red-500 text-white font-bold px-[10px] py-[5px] rounded-[50px]
                    hover:bg-red-400 transition-[0.3s]"
                    onClick={() => handleDelete(bookId)}>Delete</button>
                    : <div className="loader"></div>
                    }
                </div>
            </div>
        </div>
    )
}

DeleteBook.propTypes = {
    setDeleteAlert : PropTypes.bool.isRequired,
    bookId : PropTypes.number.isRequired
};

export default DeleteBook
