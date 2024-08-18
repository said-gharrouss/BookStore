import Footer from "../components/footer/Footer"
import { Outlet, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import { ADMIN_HOME, USER_HOME } from "../router/Index";
import { useSelector } from "react-redux";
import GuestNavbar from "../components/navbar/GuestNavbar/GuestNavbar";

function GuestLayout() {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const token = useSelector(state => state.user.token);
    const role = useSelector(state => state.user.role);
    const [isLoading,setIsLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        if(isAuthenticated && token && role === "user"){
            navigate(USER_HOME);

        }else if(isAuthenticated && token && role === "admin"){

            navigate(ADMIN_HOME);
        }
        else{
            setIsLoading(false);
        }
    },[isAuthenticated,navigate,token,role])

    if(isLoading){
        return <></>
    }
    return (
        <>
            <GuestNavbar/>
                <Outlet/>
            <Footer/>
        </>
    )
}

export default GuestLayout
