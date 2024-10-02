import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import { userDetailApi } from "../../api/userDetailApi";
import { getDetails} from "../../Redux/User/UserSlice";

function ContactInfo() {
    const details = useSelector(state => state.user.details)[0];
    const [activeInput,setActiveInput] = useState(false);
    const user = useSelector(state => state.user.infos);
    const dispatch = useDispatch();

    const UpdateDetailsSchema = z.object({
        address_one : z.string()
                    .nonempty("Address one is required")
                    .min(10,"Address must be at least 10 charachters")
                    .max(255,"Address must be less than 255 charachters"),
        email : z.string()
                    .nonempty("email is required")
                    .email("email is not valid"),
        phone_number : z.string()
                    .nonempty("phone is required"),
        city : z.string()
                    .nonempty("city is required"),
        address_two : z.string().nullable(),
        state : z.string().nullable(),
        zip_code : z.string().nullable(),
    });

    const {register,handleSubmit,formState:{errors,isSubmitting},setError,setValue} = useForm({
        mode: "onSubmit",
        resolver: zodResolver(UpdateDetailsSchema),
    });

    useEffect(() => {
        if(details){
            let bookValues = Object.entries(details);
            bookValues.map(b => {
                const [name,value] = b;
                setValue(name, value);
            })
        }
    },[details,setValue]);


    const formSubmit = async (data) => {
        try {
            const response = await userDetailApi.updateDetails(user?.id,{...data,user_id : user?.id});
            if(response.status === 200){
                dispatch(getDetails(user?.id));
                setActiveInput(false);
            }
        } catch (error) {
            const { message, errors } = error.response.data;
            if (errors) {
                Object.entries(errors).forEach(([fieldName, errorMessages]) => {
                    setError(fieldName, { message: errorMessages.join("") });
                });
            } else {
                setError("email", { message: message || "An unexpected error occurred." });
            }
        }
    }

    const handleActiveInput = () => {
        setActiveInput(true);
    }
    const handleDesActiveInput = () => {
        setActiveInput(false)
    }

    useEffect(() => {
        dispatch(getDetails(user?.id));
    },[dispatch,user?.id])




    return (
        <div className="mt-[30px] w-[90%] sm:w-[50%] mx-auto bg-[#f1f5f9] p-[20px] rounded-[4px]">
        <form action="" onSubmit={handleSubmit(formSubmit)}>
        <ul className="flex flex-col gap-[20px]">
            <li className="flex gap-[10px] items-center h-[80px]">
                <span className="font-bold flex-[2]">
                    First Address :
                </span>
                <div className="bg-white flex-[5] h-full  rounded-[6px]">
                    {
                        !activeInput ?
                        <span className="h-full block p-[10px]">
                            {details?.address_one}
                        </span>
                        :
                        <>
                        <textarea {...register("address_one")}   className="border-[1px] border-gray-300 rounded-[6px] h-full w-full outline-none px-[10px] py-[5px]
                        resize-none"/>
                        {errors.address_one && <span className="text-red-500 text-[14px]">{errors.address_one.message}</span>}
                        </>
                    }
                </div>
            </li>
            <li className="flex gap-[10px] items-center  h-[80px]">
                <span className="font-bold flex-[2]">
                    Second Address :
                </span>
                <div className="bg-white flex-[5] h-full rounded-[6px]">
                    {
                        !activeInput ?
                        <span className="h-full block p-[10px]">
                            {details?.address_two}
                        </span>
                        :
                        <>
                        <textarea  {...register("address_two")}    className="border-[1px] border-gray-300 rounded-[6px] h-full w-full outline-none px-[10px] py-[5px]
                        resize-none" />
                        {errors.address_two && <span className="text-red-500 text-[14px]">{errors.phone_number.message}</span>}
                        </>
                    }
                </div>
            </li>
            <li className="flex gap-[10px] items-center h-[40px]">
                <span className="font-bold flex-[2]">
                    Email :
                </span>
                <div className="bg-white flex-[5] h-full rounded-[6px]">
                    {
                        !activeInput ?
                        <span className="h-full flex items-center px-[10px]">
                            {details?.email}
                        </span>
                        :
                        <>
                        <input type="text" {...register("email")}   className="border-[1px] border-gray-300 rounded-[6px] h-full w-full outline-none px-[10px]"/>
                        {errors.email && <span className="text-red-500 text-[14px]">{errors.email.message}</span>}
                        </>
                    }
                </div>
            </li>
            <li className="flex gap-[10px] items-center  h-[40px]">
                <span className="font-bold flex-[2]">
                    Phone Number :
                </span>
                <div className="bg-white flex-[5] h-full rounded-[6px]">
                    {
                        !activeInput ?
                        <span className="h-full flex items-center px-[10px]">
                            {details?.phone_number}
                        </span>
                        :
                        <>
                        <input type="text" {...register("phone_number")}  className="border-[1px] border-gray-300 rounded-[6px] h-full w-full outline-none px-[10px]"/>
                        {errors.phone_number && <span className="text-red-500 text-[14px]">{errors.phone_number.message}</span>}
                        </>
                    }
                </div>
            </li>
            <li className="flex gap-[10px] items-center  h-[40px]">
                <span className="font-bold flex-[2]">
                    City :
                </span>
                <div className="bg-white flex-[5] h-full rounded-[6px]">
                    {
                        !activeInput ?
                        <span className="h-full flex items-center px-[10px]">
                            {details?.city}
                        </span>
                        :
                        <>
                        <input type="text" {...register("city")} className="border-[1px] border-gray-300 rounded-[6px] h-full w-full outline-none px-[10px]"/>
                        {errors.city && <span className="text-red-500 text-[14px]">{errors.city.message}</span>}
                        </>
                    }
                </div>
            </li>
            <li className="flex gap-[10px] items-center  h-[40px]">
                <span className="font-bold flex-[2]">
                    State :
                </span>
                <div className="bg-white flex-[5] h-full rounded-[6px]">
                    {
                        !activeInput ?
                        <span className="h-full flex items-center px-[10px]">
                            {details?.state}
                        </span>
                        :
                        <>
                        <input type="text" {...register("state")}  className="border-[1px] border-gray-300 rounded-[6px] h-full w-full outline-none px-[10px]"/>
                        {errors.state && <span className="text-red-500 text-[14px]">{errors.state.message}</span>}
                        </>
                    }
                </div>
            </li>
            <li className="flex gap-[10px] items-center  h-[40px]">
                <span className="font-bold flex-[2]">
                    Zip code :
                </span>
                <div className="bg-white flex-[5] h-full rounded-[6px]">
                    {
                        !activeInput ?
                        <span className="h-full flex items-center px-[10px]">
                            {details?.zip_code}
                        </span>
                        :
                        <>
                        <input type="text" {...register("zip_code")}  className="border-[1px] border-gray-300 rounded-[6px] h-full w-full outline-none px-[10px]"/>
                        {errors.zip_code && <span className="text-red-500 text-[14px]">{errors.zip_code.message}</span>}
                        </>
                    }
                </div>
            </li>
        </ul>
        <div className="flex gap-[10px] justify-end">
            {
                !activeInput ?
                <span className="text-white font-bold bg-green-500 px-[15px] py-[5px] rounded-[4px]
                mt-[20px] text-end border-[1px] hover:border-green-500 hover:bg-white hover:text-green-500
                hover:transition-[0.3s] cursor-pointer"
                onClick={() => handleActiveInput()}>Update</span>
                :
                <>
                {
                    !isSubmitting ?
                    <button className="text-white font-bold bg-green-500 px-[15px] py-[5px] rounded-[4px]
                    mt-[20px] text-end border-[1px] hover:border-green-500 hover:bg-white hover:text-green-500
                    hover:transition-[0.3s] cursor-pointer"
                    onClick={() => handleActiveInput()}>Update</button>
                    :
                    <div className="w-[90px] mt-[20px] flex justify-center items-center ">
                        <div className="loader"></div>
                    </div>
                }
                </>
            }
            {
                activeInput &&
                <span className="text-white font-bold bg-primary_black px-[15px] py-[5px] rounded-[4px]
                mt-[20px] text-end border-[1px] hover:border-primary_black hover:bg-white hover:text-primary_black
            hover:transition-[0.3s] cursor-pointer"
                onClick={() => handleDesActiveInput()}>Cansel</span>
            }
        </div>
        </form>
        </div>
    )
}

export default ContactInfo
