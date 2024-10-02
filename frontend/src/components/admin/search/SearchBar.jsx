import { useState } from "react"
import SearchResults from "./SearchResults";

function SearchBar() {
    const [isInputFocused,setIsInputFocused] = useState(false);
    const [searchResults,setSearchResults] = useState([]);
    const [isSearching,setIsSearching] = useState(false);

    const onSearch = (searchTerm) => {
        setIsSearching(true);
        const books = JSON.parse(localStorage.getItem("bookList")) || [];
        const searchResult = books?.filter(book => book.title.toLowerCase().startsWith(searchTerm.toLowerCase()));
        setSearchResults(searchResult);
        if(searchTerm === ""){
            setSearchResults([]);
            setIsSearching(false);
        }
    }

    const onInputBlur = (e) => {
        setTimeout(() => {
            setIsInputFocused(false);
            setSearchResults([]);
            setIsSearching(false);
            e.target.value = ""
        }, 200);
    };



    return (
        <div className={`${isInputFocused ? "w-[200px] sm:w-[280px] lg:w-[300px]" : "w-[150px]"} h-[30px] relative z-[3] transition-[0.3s] self-end`}>
            <input type="text" className="w-full h-full px-[10px]  border-[1px] border-primary_black outline-none rounded-[30px]
            text-[14px] font-semibold focus:border-[2px]" placeholder="Search books"
            onFocus={() => setIsInputFocused(true)} onBlur={(e) => onInputBlur(e)}
            onChange={(e) => onSearch(e.target.value)}/>
            <span className="bg-primary_black text-white px-[10px] rounded-[30px] absolute right-0 top-0 h-[100%]
            flex justify-center items-center w-[50px] text-[14px]">
                <i className="fa-solid fa-magnifying-glass"></i>
            </span>
            <SearchResults searchResults={searchResults}/>
            {
                !searchResults.length > 0 && isSearching &&
                <div className="bg-white border-[2px] border-primary_black w-full p-[10px] rounded-[4px] mt-[4px] shadow-md z-[3]
                font-bold text-[10px] sm:text-[14px]">
                    Sorry, no books found. Please try a different search.
                </div>
            }
        </div>
    )
}

export default SearchBar
