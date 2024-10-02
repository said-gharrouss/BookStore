import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import { userDetailApi } from "../../api/userDetailApi";
import { getInfos } from "../../Redux/User/UserSlice";

function PersonalInfo() {
    const user = useSelector(state => state.user.infos);
    const [activeInput,setActiveInput] = useState(false);
    const dispatch = useDispatch();

    const handleActiveInput = () => {
        setActiveInput(true);
    }
    const handleDesActiveInput = () => {
        setActiveInput(false)
    }
    const UpdatePersonalInfoSchema = z.object({
        name: z.string()
        .nonempty("name is required")
        .min(2,"name must be at least 2 chatachters")
        .max(20,"name must be shorter than 20 charachters"),
        email : z.string()
        .nonempty("email is required")
        .email("invalid email"),
        old_password : z.string()
        .nonempty("old password is required")
        .min(8,"old password must be at least 8 charachters")
        .max(15,"old password must be shorter than 15 charachters"),
        new_password : z.string()
    });

    const {register,handleSubmit,formState:{errors,isSubmitting},setError,setValue} = useForm({
        mode: "onSubmit",
        resolver: zodResolver(UpdatePersonalInfoSchema),
    });

    useEffect(() => {
        if(user){
            setValue("name",user.name);
            setValue("email",user.email);
        }
    },[user,setValue]);



    const formSubmit = async (data) => {
        try {
            const response = await userDetailApi.updatePersonalInfo(user?.id,data);
            if(response.status === 200){
                console.log("Updated successfully:", response.data);
                dispatch(getInfos());
                setActiveInput(false);
            }
        } catch (error){
            const { message, errors } = error.response.data;
            if (errors) {
                Object.entries(errors).forEach(([fieldName, errorMessages]) => {
                    setError(fieldName, { message: errorMessages.join("") });
                });
            } else {
                setError("old_password", { message: message || "An unexpected error occurred." });
            }
        }
    }



    return (
        <div className="mt-[30px] w-[90%] sm:w-[50%] mx-auto bg-[#f1f5f9] p-[20px] rounded-[4px]">
        <form onSubmit={handleSubmit(formSubmit)}>
        <ul className="flex flex-col gap-[20px]">
            <li className="flex gap-[10px] items-center  h-[40px]">
                <span className="font-bold flex-[1.5]">
                    Name :
                </span>
                <div className="bg-white flex-[5] h-full rounded-[6px]">
                    {
                        !activeInput ?
                        <span className="h-full flex items-center px-[10px]">
                            {user?.name}
                        </span>
                        :
                        <>
                        <input type="text" {...register("name")}  className="border-[1px] border-gray-300 rounded-[6px] h-full w-full outline-none px-[10px]"/>
                        {errors.name && <span className="text-[13px] text-red-500">{errors.name.message}</span>}
                        </>
                    }
                </div>
            </li>
            <li className="flex gap-[10px] items-center  h-[40px]">
                <span className="font-bold flex-[1.5]">
                    Email :
                </span>
                <div className="bg-white flex-[5] h-full rounded-[6px]">
                    {
                        !activeInput ?
                        <span className="h-full flex items-center px-[10px]">
                            {user?.email}
                        </span>
                        :
                        <>
                        <input type="text" {...register("email")} className="border-[1px] border-gray-300 rounded-[6px] h-full w-full outline-none px-[10px]"/>
                        {errors.email && <span className="text-[13px] text-red-500">{errors.email.message}</span>}
                        </>
                    }
                </div>
            </li>
            <li className="flex gap-[10px] items-center  h-[40px]">
                <span className="font-bold flex-[1.5]">
                    {activeInput && "Old"} Password :
                </span>
                <div className="bg-white flex-[5] h-full rounded-[6px]">
                    {
                        !activeInput ?
                        <span className="h-full flex items-center px-[10px]">
                            {"*".repeat(18)}
                        </span>
                        :
                        <>
                        <input type="text" {...register("old_password")} className="border-[1px] border-gray-300 rounded-[6px] h-full w-full outline-none px-[10px]"/>
                        {errors.old_password && <span className="text-[13px] text-red-500">{errors.old_password.message}</span>}
                        </>
                    }
                </div>
            </li>
            {
            activeInput &&
            <li className="flex gap-[10px] items-center  h-[40px]">
                <span className="font-bold flex-[1.5]">
                    New Password :
                </span>
                <div className="bg-white flex-[5] h-full rounded-[6px]">
                    <input type="text" {...register("new_password")}  className="border-[1px] border-gray-300 rounded-[6px] h-full w-full outline-none px-[10px]"/>
                    {errors.new_password && <span className="text-[13px] text-red-500">{errors.new_password.message}</span>}
                </div>
            </li>
            }
        </ul>
        <div className="flex gap-[10px] justify-end">
            {
                !activeInput ?
                <div className="text-white font-bold bg-green-500 px-[15px] py-[5px] rounded-[4px]
                mt-[20px] text-end border-[1px] hover:border-green-500 hover:bg-white hover:text-green-500
                hover:transition-[0.3s] cursor-pointer"
                onClick={() => handleActiveInput()}>Update</div>
                :
                <>
                {
                    !isSubmitting ?
                    <button className="text-white font-bold bg-green-500 px-[15px] py-[5px] rounded-[4px]
                    mt-[20px] text-end border-[1px] hover:border-green-500 hover:bg-white hover:text-green-500
                    hover:transition-[0.3s]"
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
                <button className="text-white font-bold bg-primary_black px-[15px] py-[5px] rounded-[4px]
                mt-[20px] text-end border-[1px] hover:border-primary_black hover:bg-white hover:text-primary_black
            hover:transition-[0.3s]"
                onClick={() => handleDesActiveInput()}>Cansel</button>
            }
        </div>
        </form>
        </div>
    )
}

export default PersonalInfo
