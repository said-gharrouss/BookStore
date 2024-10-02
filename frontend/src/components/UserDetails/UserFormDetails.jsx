import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"
import { useSelector,} from "react-redux";
import { z } from "zod";
import { userDetailApi } from "../../api/userDetailApi";

function UserFormDetails({SetDspFormDetails}) {
    const user = useSelector(state => state.user.infos);

    const createDetailsSchema = z.object({
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

    const {register,handleSubmit,formState:{errors,isSubmitting},setError} = useForm({
        mode: "onSubmit",
        resolver: zodResolver(createDetailsSchema),
    });


    const formSubmit = async (data) => {
        try{
            const response = await userDetailApi.insertDetails({...data,user_id : user?.id});
            if(response.status === 200){
                SetDspFormDetails(false);
                document.body.style.overflow = 'auto';
            }
        } catch(error){
            console.log(error);
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

    const handleBtnCancel = () => {
        SetDspFormDetails(false);
        document.body.style.overflow = 'auto';
    }

    return (
        <div className="top-0 left-0 w-[100%] h-[100%] bg-[#0000002d]  z-[200]
        flex justify-center items-center fixed">
            <form action="" className="w-[80%] sm:w-[40%] p-[20px] bg-white rounded-[4px] flex flex-col gap-[10px]
            shadow-2xl shadow-black-500/20"
            onSubmit={handleSubmit(formSubmit)}>
                <div className="w-full flex justify-between items-center gap-[15px]">
                    <textarea className="outline-none resize-none flex-1
                    bg-white rounded-[4px] px-[10px] border-[1px] border-primary focus:border-[2px] py-[10px] text-[14px]
                    h-[100px]"
                    placeholder="Address one"
                    {...register("address_one")}></textarea>
                    <textarea className="outline-none resize-none flex-1
                    bg-white rounded-[4px] px-[10px] border-[1px] border-primary focus:border-[2px] py-[10px] text-[14px]
                    h-[100px]"
                    placeholder="Adrress two" {...register("address_two")}></textarea>
                </div>
                {errors.address_one && <span className="text-red-500 text-[14px]">{errors.address_one.message}</span>}
                {errors.address_two && <span className="text-red-500 text-[14px]">{errors.address_two.message}</span>}
                <div>
                    <input type="text" className="w-full outline-none rounded-[4px] h-[40px] px-[10px] border-[1px] border-primary focus:border-[2px] text-[14px]
                    "
                    placeholder="Email" {...register("email")}/>
                </div>
                {errors.email && <span className="text-red-500 text-[14px]">{errors.email.message}</span>}
                <div>
                    <input type="text" className="w-full outline-none rounded-[4px] h-[40px] px-[10px] border-[1px] border-primary focus:border-[2px] text-[14px]
                    "
                    placeholder="Phone" {...register("phone_number")}/>
                </div>
                {errors.phone_number && <span className="text-red-500 text-[14px]">{errors.phone_number.message}</span>}
                <div>
                    <input type="text" className="w-full outline-none rounded-[4px] h-[40px] px-[10px] border-[1px] border-primary focus:border-[2px] text-[14px]
                    "
                    placeholder="City" {...register("city")}/>
                </div>
                {errors.city && <span className="text-red-500 text-[14px]">{errors.city.message}</span>}
                <div>
                    <input type="text" className="w-full outline-none rounded-[4px] h-[40px] px-[10px] border-[1px] border-primary focus:border-[2px] text-[14px]
                    "
                    placeholder="State" {...register("state")}/>
                </div>
                <div>
                    <input type="text" className="w-full outline-none rounded-[4px] h-[40px] px-[10px] border-[1px] border-primary focus:border-[2px] text-[14px]
                    "
                    placeholder="Zip code" {...register("zip_code")}/>
                </div>
                <div className="flex justify-end gap-[10px]">
                    {
                        !isSubmitting ?
                        <button className="bg-primary w-[90px] flex justify-center items-center py-[6px] text-white font-bold rounded-[6px]
                        hover:bg-white hover:text-primary hover:shadow-lg border-[1px]
                        hover:border-primary  transition-[0.3s]">
                            save
                        </button> :
                        <div className="w-[90px] flex justify-center items-center">
                            <div className="loader"></div>
                        </div>
                    }
                    <button className="bg-primary_black w-[90px] flex justify-center items-center py-[6px] text-white font-bold rounded-[6px]
                    hover:bg-white hover:text-primary_black hover:shadow-lg border-[1px]
                    hover:border-primary_black transition-[0.3s]"
                    onClick={() => handleBtnCancel()}>
                        cancel
                    </button>
                </div>
            </form>
        </div>
    )
}

export default UserFormDetails
