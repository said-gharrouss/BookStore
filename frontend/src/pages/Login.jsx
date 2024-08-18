import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { ADMIN_HOME, USER_HOME } from "../router/Index";
import { userApi } from "../api/userApi";
import { useDispatch, useSelector } from "react-redux";
import { handleAuthenticated, handleRole, handleToken } from "../Redux/User/UserSlice";

function Login() {
    const [eye,setEye] = useState("fa-solid fa-eye-slash");
    const [inputType,setInputType] = useState("password");
    const [isPageLoading,setIsPageLoading] = useState(true);
    const navigate = useNavigate();
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const token = useSelector(state => state.user.token);
    const role = useSelector(state => state.user.role);
    const dispatch = useDispatch();

    useEffect(() => {
        if(isAuthenticated && token && role === "user"){
            navigate(USER_HOME);
        } else if (isAuthenticated && token && role === "admin"){
            navigate(ADMIN_HOME);
        }
        else {
            setIsPageLoading(false);
        }
    },[isAuthenticated,navigate,token,role])

    const createUserSchema = z.object({
        email : z.string().nonempty("email is required").email("email is not valid"),
        password : z.string().nonempty("password is required").min(8,"password must be at least 8 charachters")
    });

    const {register,handleSubmit,formState:{errors,isSubmitting},setError} = useForm({
        mode: "onSubmit",
        resolver: zodResolver(createUserSchema),
    });

    const submitForm = async (data) => {
        try {
            await userApi.csrfToken();
            const response = await userApi.login(data);
            if (response.status === 200) {
                dispatch(handleToken(response.data.token));
                localStorage.setItem("token", response.data.token);
                dispatch(handleAuthenticated(true));
                switch (response.data.user.role) {
                    case "user":
                        dispatch(handleRole("user"));
                        navigate(USER_HOME);
                        break;
                    case "admin":
                        dispatch(handleRole("admin"));
                        navigate(ADMIN_HOME);
                        break;
                    default:
                        return "";
                }
            }
        } catch (error) {
            if (error.response && error.response.data) {
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
    };


    const handleEyeChange = () => {
        setEye(prevEye => prevEye === "fa-solid fa-eye-slash" ? "fa-solid fa-eye" : "fa-solid fa-eye-slash" );
        setInputType(prevType => prevType === "password" ? "text" : "password")
    }

    if(isPageLoading){
        return <></>
    }

    return (
        <div className="bg-[#f1f5f9] w-[100vw] h-[100vh]">
        <div className="w-[90%] sm:w-[400px] md:w-[500px] rounded-[6px] absolute left-[50%] translate-x-[-50%] top-[100px] bg-lightwhite p-[20px] shadow-lg">
            <p className="text-center text-[20px] sm:text-[30px] mb-[10px] font-bold">Welcome back to <span className="text-primary">H books</span></p>
            <p className="text-center mb-[15px] text-gray-500 text-[14px] sm:text-[16px]">Log in to your account</p>
            <form action="" onSubmit={handleSubmit(submitForm)}>
                <div className="mb-[15px]">
                    <input type="text" className={`w-full block h-[40px] sm:h-[50px] text-[14px] sm:text-[18px] outline-none rounded-[6px] px-[20px]
                    ${errors.email ? "border-red-500 border-[2px]" : "input-focus"}`}
                    placeholder="Enter email" {...register("email")}/>
                </div>
                {errors.email && <span className="text-red-500 font-bold mt-[-15px] mb-[15px] block">{errors.email.message}</span> }
                <div className="mb-[15px] flex relative">
                    <input type={inputType} className={`w-full block h-[40px] sm:h-[50px] text-[14px] sm:text-[18px] outline-none rounded-[6px] px-[20px]
                    ${errors.password ? "border-red-500 border-[2px]" : "input-focus"}`}
                    placeholder="Enter password" {...register("password")}/>
                    <label className="absolute right-[20px] top-[50%] translate-y-[-50%] cursor-pointer"
                    onClick={() => handleEyeChange()}>
                        <i className={eye}></i>
                    </label>
                </div>
                {errors.password && <span className="text-red-500 font-bold mt-[-15px] mb-[15px] block">{errors.password.message}</span> }
                <div className="mb-[15px]">
                    {!isSubmitting ?
                    <input type="submit" value={"Login"}
                    className="w-full block h-[40px] sm:h-[50px] text-[14px] sm:text-[18px] bg-primary outline-none rounded-[6px] text-white cursor-pointer"/> :
                    <div className="h-[50px] bg-white border-[2px] border-primary w-full rounded-[6px] flex justify-center items-center pointer-events-none">
                        <div className="loader pointer-events-none"></div>
                    </div>
                    }
                </div>
                <p className="text-center text-[15px] text-gray-500">No account? <Link to={"/signup"} className="underline text-primary">Sign up</Link></p>
            </form>
            <Link to={"/"}>
                <span className="absolute top-[-10px] right-[-10px] bg-primary text-white w-[30px] h-[30px]
                rounded-[50px] flex justify-center items-center cursor-pointer hover:bg-red-500
                transition-[0.3s] shadow-md">
                    <i className="fa-solid fa-xmark"></i>
                </span>
            </Link>
        </div>
        </div>
    )
}

export default Login
