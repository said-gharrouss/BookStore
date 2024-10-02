import { useEffect, useState } from "react"
import { LOGIN_FORM, USER_HOME } from "../router/Index";
import { userApi } from "../api/userApi";
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "../components/admin/NavBar"
import SideBar from "../components/admin/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { handleUserInfos } from "../Redux/User/UserSlice";

function AdminLayout() {
    const [isSideBarVisible,setIsSideBarVisible] = useState(true);
    const isAuthenticated = useSelector(state => state.user.isAuthenticated);
    const token = useSelector(state => state.user.token);
    const role = useSelector(state => state.user.role);
    const [isLoading,setIsLoading] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        if (isAuthenticated && token && role === "admin"){
            setIsLoading(false);
            userApi.userInfos().then((response) => {
                if(response.status === 200){
                    const id = response.data.id;
                    const name = response.data.name;
                    localStorage.setItem("user", JSON.stringify({id,name}));
                    dispatch(handleUserInfos({id,name}))
                }
            }).catch((reason) => console.log(reason));

        } else if(isAuthenticated && token && role === "user"){
            navigate(USER_HOME);
        }
        else {
            navigate(LOGIN_FORM);
        }
    },[isAuthenticated,navigate,dispatch,token,role]);

    const toggleSideBar = () => {
        setIsSideBarVisible(prevState => !prevState);
    }

    if(isLoading){
        return <></>
    }
    return (
        <div className="mx-auto flex h-[100%] bg-[#f1f5f9] ">
            <SideBar toggleSideBar={toggleSideBar} isSideBarVisible={isSideBarVisible}/>
            <div className={`w-full  transition-[0.3s] pb-[30px] ${isSideBarVisible ? "ml-[60px] sm:ml-[100px] md:ml-[200px]" : "ml-[0px]"}`}>
                <NavBar toggleSideBar={toggleSideBar} isSideBarVisible={isSideBarVisible}/>
                <Outlet/>
            </div>
        </div>
    )
}

export default AdminLayout
