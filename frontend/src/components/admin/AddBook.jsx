import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { useNavigate } from "react-router-dom";
import { ADMIN_HOME } from "../../router/Index";
import { bookAPi } from "../../api/bookApi";

function AddBook() {
    const [selectedImage, setSelectedImage] = useState();
    const [loadingState,setLoadingState] = useState(false);
    const navigate = useNavigate();
    const bookValidationSchema = z.object({
        title : z.string().nonempty("Title is required")
            .min(5,"Title must be at least 5 charachters")
            .max(50,"Title must be shorter than 50 charachters"),
        author : z.string().nonempty("Author is required")
            .min(5,"Author must be at least 5 charachters")
            .max(50,"Author must be shorter than 50 charachters"),
        description : z.string().nonempty("Description is required")
            .min(5,"Description must be at least 5 charachters")
            .max(255,"Description must be shorter than 255 charachters"),
        publisher : z.string().nonempty("Publisher is required")
        .min(5,"Publisher must be at least 5 charachters")
        .max(50,"Publisher must be shorter than 50 charachters"),

        genre: z.enum(["Art", "Fantasy", "Travel","Poetry","Biography","Science","Sports","Education"], {
            errorMap: () => ({ message: 'Please select a valid option' }),
        }),
        language: z.enum(["EN", "FR", "SP","AR"], {
            errorMap: () => ({ message: 'Please select a valid option' }),
        }),

        publication_date : z.string().nonempty("publication date is required"),

        price: z.string().nonempty("Price is required").refine(value => value > 0, {
            message: 'Price must be a positive number',
        }),
        page_count: z.string().nonempty("Page count is required").refine(value => value > 0, {
            message: 'Page count must be a positive number',
        }),
        quantity : z.string().nonempty("Quantity is required").refine(value => value > 0, {
            message: 'Quantity must be a positive number',
        }),
    })

    const {register,handleSubmit,formState:{errors},setError} = useForm({
        mode : "onSubmit",
        resolver : zodResolver(bookValidationSchema),
    });

    const onImageChange = (e) => {
        setSelectedImage(e.target.files[0]);
    };

    const submitBookForm = async (data) => {
        const formData = new FormData();
        formData.append('image', selectedImage);
        Object.keys(data).forEach(key => formData.append(key, data[key]));
        setLoadingState(true);
        await bookAPi.insertBook(formData)
        .then(response => {
            if(response.status === 200){
                sessionStorage.setItem("message","The book has been added successfully!")
                navigate(ADMIN_HOME);
            }
        })
        .catch(error => {
            let {errors} = error.response.data;
            if (errors) {
                errors = Object.entries(errors);
                errors.forEach((error) => {
                    const [fieldName, errorMessages] = error;
                    setError(fieldName, {message: errorMessages.join("")});
                });
            }
        }).finally(() => setLoadingState(false));
    }
    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'instant'
        });
    }, []);
    return (
        <div className="px-[20px] mx-auto mt-[20px]">
            <h2 className="admin-title">Add Book</h2>
            <div className="bg-white mt-[30px] p-[20px] sm:mx-[20px] md:mx-[50px] rounded-[4px]">
                <form action="" className="flex flex-col gap-[20px]" onSubmit={handleSubmit(submitBookForm)} encType="multipart/form-data">
                    <div>
                        <label htmlFor="" className={`${errors.title && "text-red-500"} block text-[14px] text-gray-500 mb-[5px]`}>Title</label>
                        <input type="text" className={`${errors.title && "border-red-500"} w-full outline-none border-[1px] border-gray-400 rounded-[4px] px-[10px] py-[5px]`}
                        {...register("title")}/>
                        {errors.title && <span className="text-red-500">{errors.title.message}</span> }
                    </div>
                    <div>
                        <label htmlFor="" className={`${errors.author && "text-red-500"} block text-[14px] text-gray-500 mb-[5px]`}>Author</label>
                        <input type="text" className={`${errors.author && "border-red-500"} w-full outline-none border-[1px] border-gray-400 rounded-[4px] px-[10px] py-[5px]`}
                        {...register("author")}/>
                        {errors.author && <span className="text-red-500">{errors.author.message}</span> }
                    </div>
                    <div>
                    <div>
                        <label htmlFor="" className={`${errors.genre && "text-red-500"} block text-[14px] text-gray-500 mb-[5px]`}>Genre</label>
                        <select className="w-full border-[1px] border-gray-400 rounded-[4px]  px-[10px] py-[5px] outline-none"
                        {...register("genre")}>
                            <option value="index">Select Genre</option>
                            <option value="Art">Art</option>
                            <option value="Fantasy">Fantasy</option>
                            <option value="Travel">Travel</option>
                            <option value="Poetry">Poetry</option>
                            <option value="Biography">Biography</option>
                            <option value="Science">Science</option>
                            <option value="Sports">Sports</option>
                            <option value="Education">Education</option>
                        </select>
                        {errors.genre && <span className="text-red-500">{errors.genre.message}</span> }
                    </div>
                    </div>
                    <div>
                        <label htmlFor="" className={`${errors.language && "text-red-500"} block text-[14px] text-gray-500 mb-[5px]`}>Language</label>
                        <select className="w-full border-[1px] border-gray-400 rounded-[4px]  px-[10px] py-[5px] outline-none"
                        {...register("language")}>
                            <option value="index">Select Language</option>
                            <option value="EN">English</option>
                            <option value="FR">French</option>
                            <option value="SP">Spanish</option>
                            <option value="AR">العربية</option>
                        </select>
                        {errors.language && <span className="text-red-500">{errors.language.message}</span> }
                    </div>
                    <div>
                        <label htmlFor="" className={`${errors.image && "text-red-500"} block text-[14px] text-gray-500 mb-[5px]`}>Image</label>
                        <input type="file" className={`${errors.image && "border-red-500"} w-full outline-none border-[1px] border-gray-400 rounded-[4px] px-[10px] py-[5px]`}
                        {...register("image")} onChange={onImageChange} />
                        {errors.image && <span className="text-red-500">{errors.image.message}</span> }
                    </div>
                    <div>
                        <label htmlFor="" className={`${errors.publisher && "text-red-500"} block text-[14px] text-gray-500 mb-[5px]`}>Publisher</label>
                        <input type="text" className={`${errors.publisher && "border-red-500"} w-full outline-none border-[1px] border-gray-400 rounded-[4px] px-[10px] py-[5px]`}
                        {...register("publisher")}/>
                        {errors.publisher && <span className="text-red-500">{errors.publisher.message}</span> }
                    </div>
                    <div>
                        <label htmlFor="" className={`${errors.publication_date && "text-red-500"} block text-[14px] text-gray-500 mb-[5px]`}>Publication date</label>
                        <input type="date" className={`${errors.publication_date && "border-red-500"} w-full outline-none border-[1px] border-gray-400 rounded-[4px] px-[10px] py-[5px]`}
                        {...register("publication_date")}/>
                        {errors.publication_date && <span className="text-red-500">{errors.publication_date.message}</span> }
                    </div>
                    <div>
                        <label htmlFor="" className={`${errors.price && "text-red-500"} block text-[14px] text-gray-500 mb-[5px]`}>Price</label>
                        <input type="text" className={`${errors.price && "border-red-500"} w-full outline-none border-[1px] border-gray-400 rounded-[4px] px-[10px] py-[5px]`}
                        {...register("price")}/>
                        {errors.price && <span className="text-red-500">{errors.price.message}</span> }
                    </div>
                    <div>
                        <label htmlFor="" className={`${errors.page_count && "text-red-500"} block text-[14px] text-gray-500 mb-[5px]`}>Page count</label>
                        <input type="text" className={`${errors.page_count && "border-red-500"} w-full outline-none border-[1px] border-gray-400 rounded-[4px] px-[10px] py-[5px]`}
                        {...register("page_count")}/>
                        {errors.page_count && <span className="text-red-500">{errors.page_count.message}</span> }
                    </div>
                    <div>
                        <label htmlFor="" className={`${errors.quantity && "text-red-500"} block text-[14px] text-gray-500 mb-[5px]`}>Quantity</label>
                        <input type="text" className={`${errors.quantity && "border-red-500"} w-full outline-none border-[1px] border-gray-400 rounded-[4px] px-[10px] py-[5px]`}
                        {...register("quantity")}/>
                        {errors.quantity && <span className="text-red-500">{errors.quantity.message}</span> }
                    </div>
                    <div>
                        <label htmlFor="" className={`${errors.description && "text-red-500"} block text-[14px] text-gray-500 mb-[5px]`}>Description</label>
                        <textarea className={`${errors.description && "border-red-500"} w-full h-[150px] resize-none outline-none border-[1px] border-gray-400 rounded-[4px] px-[10px] py-[5px]`} {...register("description")}>
                        </textarea>
                        {errors.description && <span className="text-red-500">{errors.description.message}</span> }
                    </div>
                    {
                        !loadingState ?
                        <button type="submit" className="bg-primary text-white font-bold px-[30px] md:px-[50px] py-[4px] md:py-[8px] rounded-[4px]
                        w-fit ml-auto cursor-pointer border-[1px] hover:text-primary hover:bg-white
                        hover:border-primary transition-[0.3s]">Add
                        </button> :
                        <div className="flex justify-end ml-auto mr-[20px] h-[30px] w-[30px]">
                            <div className="loader"></div>
                        </div>
                    }
                </form>
            </div>
        </div>
    )
}

export default AddBook
