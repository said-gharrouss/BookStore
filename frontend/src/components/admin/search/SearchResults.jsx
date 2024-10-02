import { Link } from "react-router-dom"
import PropTypes from 'prop-types';


function SearchResults({searchResults}) {
    return (
        <>
        {
            searchResults.length > 0 &&
            <div className="bg-white border-[2px] border-primary_black w-full p-[10px] rounded-[4px] mt-[4px] shadow-md z-[3]
            cursor-pointer max-h-[450px] overflow-y-scroll search-scrollbar ">
            {
                searchResults?.map((item,key) => (
                    <>
                    <Link to={`/admin/bookdetails/${item?.id}`}>
                        <div key={key} className={`flex justify-between items-center h-[70px] py-[15px]
                            ${!(searchResults.length - 1 == key) && "border-b-[1px] border-gray-500"} hover:bg-gray-100 transition-[0.3s]`}>
                            <img src={`${import.meta.env.VITE_BACKEND_URL}/storage/${item?.image}`} alt=""
                            className="w-[50px] h-full"/>

                            <div className="flex flex-col gap-[5px] text-[10px] sm:text-[13px]">
                                <span className="font-bold">{item?.title}</span>
                                <span className="text-[12px] text-[#888]">
                                    <span  className="mr-[4px]"><i className="fa-solid fa-feather-pointed"></i></span>
                                    {item?.author}
                                </span>
                            </div>

                            <div className="hidden sm:flex flex-col gap-[2px] text-[11px] text-[#888]">
                                <span>
                                    <span className="mr-[4px]"><i className="fa-solid fa-book"></i></span>
                                    {item?.quantity}
                                </span>
                                <span>
                                    <i className="fa-solid fa-globe"></i>
                                    <span className="ml-[5px]">
                                        {item?.language === "AR" && "Arabic"}
                                        {item?.language === "SP" && "Spanish"}
                                        {item?.language === "FR" && "French"}
                                        {item?.language === "EN" && "English"}
                                    </span>
                                </span>
                                <span>$ {item?.price}</span>
                            </div>
                        </div>
                    </Link>
                    </>
                ))
            }
            </div>
        }
        </>
    )
}

SearchResults.propTypes = {
    searchResults : PropTypes.object.isRequired,

}
export default SearchResults
