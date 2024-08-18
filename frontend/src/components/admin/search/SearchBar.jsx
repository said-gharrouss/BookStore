import { useState } from "react"
import SearchResults from "./SearchResults";

function SearchBar() {
    const [isFocus,setIsFocus] = useState(false);
    const [result,setResult] = useState([]);
    const [isTyping,setIsTyping] = useState(false);

    const handleSearch = (searchTerm) => {
        setIsTyping(true);
        const books = JSON.parse(localStorage.getItem("books")) || [];
        const searchResult = books?.filter(book => book.title.toLowerCase().startsWith(searchTerm.toLowerCase()));
        setResult(searchResult);
        if(searchTerm === ""){
            setResult([]);
            setIsTyping(false);
        }
    }

    const handleBlur = (e) => {
        setTimeout(() => {
            setIsFocus(false);
            setResult([]);
            setIsTyping(false);
            e.target.value = ""
        }, 200);
    };



    return (
        <div className={`${isFocus ? "w-[200px] sm:w-[280px] lg:w-[300px]" : "w-[150px]"} h-[30px] relative z-[3] transition-[0.3s] self-end`}>
            <input type="text" className="w-full h-full px-[10px]  border-[1px] border-primary_black outline-none rounded-[30px]
            text-[14px] font-semibold focus:border-[2px]" placeholder="Search books"
            onFocus={() => setIsFocus(true)} onBlur={(e) => handleBlur(e)}
            onChange={(e) => handleSearch(e.target.value)}/>
            <span className="bg-primary_black text-white px-[10px] rounded-[30px] absolute right-0 top-0 h-[100%]
            flex justify-center items-center w-[50px] text-[14px]">
                <i className="fa-solid fa-magnifying-glass"></i>
            </span>
            <SearchResults result={result}/>
            {
                !result.length > 0 && isTyping &&
                <div className="bg-white border-[2px] border-primary_black w-full p-[10px] rounded-[4px] mt-[4px] shadow-md z-[3]
                font-bold text-[10px] sm:text-[14px]">
                    Sorry, no books found. Please try a different search.
                </div>
            }
        </div>
    )
}

export default SearchBar
