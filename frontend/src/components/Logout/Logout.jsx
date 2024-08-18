import { useNavigate } from "react-router-dom";
import { userApi } from "../../api/userApi";
import { useDispatch } from "react-redux";
import { handleAuthenticated, handleToken, handleUserInfos } from "../../Redux/User/UserSlice";
import { LOGIN_FORM } from "../../router/Index";

function Logout() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = () => {
        userApi.logout().then(() => {
            localStorage.removeItem("favBooks");
            localStorage.removeItem("user");
            dispatch(handleToken(null));
            dispatch(handleAuthenticated(false));
            dispatch(handleUserInfos({}));
            navigate(LOGIN_FORM);
        })
    }
    return (
        <div onClick={() => handleLogout()}>
            Logout
        </div>
    )
}

export default Logout
