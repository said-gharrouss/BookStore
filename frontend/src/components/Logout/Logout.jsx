import { useNavigate } from "react-router-dom";
import { userApi } from "../../api/userApi";
import { useDispatch } from "react-redux";
import { handleAuthenticated, handleToken } from "../../Redux/User/UserSlice";
import { LOGIN_FORM } from "../../router/Index";

function Logout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = () => {
        userApi.logout().then(() => {
            localStorage.removeItem("favBooks");
            localStorage.removeItem("user");
            localStorage.removeItem("details");
            localStorage.removeItem("books");
            localStorage.removeItem("bookList");
            localStorage.removeItem("orderList");
            localStorage.removeItem("myOrders");
            dispatch(handleToken(null));
            dispatch(handleAuthenticated(false));
            navigate(LOGIN_FORM);
        })
    }
    return (
        <div onClick={() => handleLogout()} className="flex items-center gap-[10px]">
            <span>
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
            </span>
            <span >
                Logout
            </span>
        </div>
    )
}

export default Logout
