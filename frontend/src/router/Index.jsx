import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Home from "../pages/Home"
import Login from "../pages/Login"
import Signup from "../pages/Signup"
import ShopingCart from "../pages/ShopingCart"
import Favoritebooks from "../pages/Favoritebooks"
import BookDetail from "../pages/BookDetail"
import GuestLayout from "../layout/GuestLayout"
import UserLayout from "../layout/UserLayout"
import AdminLayout from "../layout/AdminLayout"
import AddBook from "../components/admin/AddBook"
import UpdateBook from "../components/admin/UpdateBook"
import BoookDetails from "../components/admin/BoookDetails"
import SuccessPayment from "../pages/SuccessPayment"
import Profile from "../components/Profile/Profile"
import OrderRecords from "../components/admin/OrderList/OrderRecords"
import OrderDetails from "../components/admin/OrderDetails"
import Orders from "../components/orders/Orders"
import MyOrderDetails from "../components/orders/MyOrderDetails"
import BookList from "../components/admin/BookList/BookList"

export const LOGIN_FORM = "/login";
export const USER_HOME = "/user";
export const ADMIN_HOME = "/admin";


const router = createBrowserRouter([
    {
        path : "/",
        element : <GuestLayout/>,
        children : [
            {
                path: "/",
                element: <Home/>,
            },
            {
                path: "shopingCart",
                element: <ShopingCart/>,
            },
            {
                path : "favoritebooks",
                element : <Favoritebooks/>
            },
            {
                path:"/book/:id",
                element : <BookDetail/>
            },
        ]
    },
    {
        path : USER_HOME,
        element : <UserLayout/>,
        children : [
            {
                path: USER_HOME,
                element: <Home/>,
            },
            {
                path: "shopingCart",
                element: <ShopingCart/>,
            },
            {
                path : "favoritebooks",
                element : <Favoritebooks/>
            },
            {
                path:"book/:id",
                element : <BookDetail/>
            },
            {
                path:"profile",
                element : <Profile/>
            },
            {
                path:"orders",
                element : <Orders/>
            },
            {
                path:"orders",
                element : <Orders/>
            },
            {
                path : "myorderdetails/:id",
                element : <MyOrderDetails/>

            }
        ]
    },
    {
        path : ADMIN_HOME,
        element : <AdminLayout/>,
        children : [
            {
                path : ADMIN_HOME,
                element : <BookList/>
            },
            {
                path : "addbook",
                element : <AddBook/>
            },
            {
                path : "updatebook/:id",
                element : <UpdateBook/>
            },
            {
                path : "bookdetails/:id",
                element : <BoookDetails/>
            },
            {
                path : "orderrecords",
                element : <OrderRecords/>
            },
            {
                path : "orderdetails/:id",
                element : <OrderDetails/>
            }
        ]
    },
    {
        path: LOGIN_FORM,
        element: <Login/>,
    },
    {
        path: "/signup",
        element: <Signup/>,
    },
    {
        path : "/successpayment",
        element : <SuccessPayment/>
    }
])

function Index() {
    return (
        <RouterProvider router={router} />
    )
}

export default Index
