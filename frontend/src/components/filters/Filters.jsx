import { useState } from "react"
import { useDispatch } from 'react-redux'
import { handlecategFilter, handleLangFilter, handlePriceFilter } from "../../Redux/feauters/filtersSlice";

function Filters() {
    const [showFilters, setShowFilters] = useState(false);
    const dispatch = useDispatch()

    const languages = ["All Languages","العربية","English","French","Spanish"];
    const [languagesFilterClicked,setLanguagesFilterClicked] = useState(false);
    const [selectLanguage,setSelectLanguage] = useState(null);

    const categories = ["All Categories","Art","Fantasy","Travel","Poetry","Biography","Science","Sports","Education"]
    const [categoriesFilterClicked,setCategoriesFilterClicked] = useState(false);
    const [selectCategorie,setSelectCategorie] = useState(null);

    const prices = ["All Prices","under $10","$10-$20","$20-$30","$30-$40","upper $40"]
    const [pricesFilterClicked,setPricesFilterClicked] = useState(false);
    const [selectPrice,setSelectPrice] = useState(null);
    const [priceRange,setPriceRange] = useState(25);


    const handleLanguagesFilter = () => {
        setLanguagesFilterClicked(prevState => !prevState);
    }
    const handleSelectLanguage = (language) =>{
        setSelectLanguage(language);
        setLanguagesFilterClicked(false);
    }


    const handleCategoriesFilter = () => {
        setCategoriesFilterClicked(prevState => !prevState);
    }
    const handleSelectCategorie = (category) => {
        setSelectCategorie(category);
        setCategoriesFilterClicked(false);
    }

    const handlePricesFilter = () => {
        setPricesFilterClicked(prevState => !prevState);
    }
    const handleSelectPrice = (price) => {
        setSelectPrice(price);
        setPricesFilterClicked(false);
    }

    const languageNames = {
        "العربية": "AR",
        "English": "EN",
        "French": "FR",
        "Spanish": "SP"
    };

    function getLanguageCode(name) {
        return languageNames[name] || "All Languages";
    }


    return (
        <div>
            <div className="w-full bg-white h-[40px] sm:h-[50px] text-[18px] sm:text-[20px] gap-[5px] font-semibold  mb-[20px] justify-center filters_style"
            onClick={() => {
                setShowFilters(prevState => !prevState);
                setCategoriesFilterClicked(false);
                setLanguagesFilterClicked(false);
                setPricesFilterClicked(false);
            }}>
                <i className={`fa-solid fa-arrow-down-wide-short transition-[0.3s]
                ${showFilters ? "filters_icon_clicked" : "filters_icon_unclicked"}`}></i>
                <span>Filters</span>
            </div>

            <div className={`flex flex-col md:flex-row justify-between gap-[10px] sm:gap-[20px]  mb-[10px] relative z-10`}>

                <div className={`w-full bg-white text-[12px] sm:text-[16px] ${showFilters ? "filters_content_clicked" : "filters_content_unclicked"} relative `}>
                    <div className="h-[40px] px-[10px] sm:px-[20px]  justify-between flex font-semibold filters_style"
                    onClick={() => handlePricesFilter()}>
                        <div>{selectPrice ? selectPrice : "All Prices"}</div>
                        <span className={`${pricesFilterClicked ? "filters_icon_clicked" : "filters_icon_unclicked"}  transition-[all_0.3s]`}>
                            <i className="fa-solid fa-angle-down"></i>
                        </span>
                    </div>
                    {
                        pricesFilterClicked &&
                        <ul className="bg-white mt-[5px] border-gray-400 border-[1px] shadow-lg rounded-[6px] overflow-hidden relative z-[13]">
                            {
                                prices.map((price,key)=>(
                                    <li key={key} className="h-[40px] px-[10px] sm:px-[20px] flex items-center font-semibold hover:bg-gray-100 cursor-pointer"
                                    onClick={() => {
                                        handleSelectPrice(price);
                                        dispatch(handlePriceFilter({sort : price}))
                                    }}>{price}</li>
                                ))
                            }
                            <li className="h-[40px] px-[10px] sm:px-[20px] flex items-center font-semibold hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                                handleSelectPrice(`$${priceRange}`);
                                dispatch(handlePriceFilter({sort : priceRange}))
                            }}>
                                <span>$0</span>
                                <input className="w-full mx-[20px]" type='range'
                                onChange={(e) =>
                                    setPriceRange(e.target.value)} value={priceRange} max={50}></input>
                                <span>${priceRange}</span>
                            </li>
                        </ul>
                    }
                </div>

                <div className={`w-full bg-white text-[12px] sm:text-[16px] ${showFilters ? "filters_content_clicked" : "filters_content_unclicked"} relative `}>
                    <div className="h-[40px] px-[10px] sm:px-[20px]  justify-between flex font-semibold filters_style"
                    onClick={() => handleCategoriesFilter()}>
                        <div>{selectCategorie ? selectCategorie : "All Categories"}</div>
                        <span className={`${categoriesFilterClicked ? "filters_icon_clicked" : "filters_icon_unclicked"}  transition-[all_0.3s]`}>
                            <i className="fa-solid fa-angle-down"></i>
                        </span>
                    </div>
                    {
                    categoriesFilterClicked &&
                    <ul className="bg-white mt-[5px] border-gray-400 border-[1px] shadow-lg rounded-[6px] overflow-hidden ">
                        {
                            categories.map((categorie,key)=>(
                                <li key={key} className="h-[40px] px-[10px] sm:px-[20px] flex items-center font-semibold hover:bg-gray-100 cursor-pointer"
                                onClick={() => {
                                    handleSelectCategorie(categorie);
                                    dispatch(handlecategFilter({sort : categorie}))
                                }}>{categorie}</li>
                            ))
                        }
                    </ul>
                    }
                </div>

                <div className={`w-full bg-white text-[12px] sm:text-[16px] ${showFilters ? "filters_content_clicked" : "filters_content_unclicked"} mb-[20px] sm:mb-0 `}>
                    <div className="h-[40px] px-[10px] sm:px-[20px] justify-between flex font-semibold filters_style"
                        onClick={() => handleLanguagesFilter()}>
                        <div>{selectLanguage ? selectLanguage : "All Languages" }</div>
                        <span className={`${languagesFilterClicked ? "filters_icon_clicked" : "filters_icon_unclicked"}  transition-[all_0.3s]`}>
                            <i className="fa-solid fa-angle-down"></i>
                        </span>
                    </div>
                    {
                    languagesFilterClicked &&
                    <ul className="bg-white mt-[5px] border-gray-400 border-[1px] shadow-lg rounded-[6px] overflow-hidden">
                        {
                            languages.map((language,key) => (
                                <li key={key} className="h-[40px] px-[20px] flex items-center font-semibold hover:bg-gray-100 cursor-pointer"
                                onClick={() => {
                                    handleSelectLanguage(language);
                                    dispatch(handleLangFilter({sort : getLanguageCode(language)}))
                                }} >{language}</li>
                            ))
                        }
                    </ul>
                    }
                </div>
            </div>
        </div>
    )
}

export default Filters
