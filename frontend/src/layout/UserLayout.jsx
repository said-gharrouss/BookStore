import { Outlet, useNavigate } from "react-router-dom"
import Footer from "../components/footer/Footer"
import { useEffect, useState} from "react"
import { ADMIN_HOME, LOGIN_FORM } from "../router/Index";
import { userApi } from "../api/userApi";
import { useDispatch, useSelector } from "react-redux";
import { getInfos, handleUserInfos } from "../Redux/User/UserSlice";
import UserNavbar from "../components/navbar/UserNavbar/UserNavbar";


function UserLayout() {
    const navigate = useNavigate();
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const token = useSelector(state => state.user.token);
    const role = useSelector(state => state.user.role);
    const [isLoading,setIsLoading] = useState(true);
    const dispatch = useDispatch();
    useEffect(() => {
        if (isAuthenticated && token && role === "user"){
            setIsLoading(false);
            dispatch(getInfos());
        } else if(isAuthenticated && token && role === "admin"){
            navigate(ADMIN_HOME);
        }
        else {
            navigate(LOGIN_FORM);
        }
    },[isAuthenticated,navigate,token,dispatch,role]);

    if(isLoading){
        return <></>
    }
    return (
        <>
            <UserNavbar/>
                <Outlet/>
            <Footer/>
        </>
    )
}

export default UserLayout
