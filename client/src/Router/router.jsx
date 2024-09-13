import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/UserLayout";
import { Home } from "../Pages/Home/Home";
import BikeSpecs from "../Pages/Bike Specs/BikeSpecs";
import BikeMenu from "../Pages/Bike Menu/BikeMenu";
import Login from "../Pages/Login & Registration/Login";
import Register from "../Pages/Login & Registration/Registration";
import Contact from "../Pages/Contact/Contact";
import DashboardLayout from "../Layout/DashboardLayout";
import DashBoardHome from "../DashBoard/Home/DashBoardHome";
import MyCart from "../DashBoard/My Cart/MyCart";
import Favorites from "../DashBoard/Favorites/Favorites";
import Payment from "../DashBoard/Payment/Payment";
import PaymentHistory from "../DashBoard/Payment/PaymentHistoy";
import AllUsers from "../DashBoard/All Users/AllUsers";
import ManageItems from "../DashBoard/Manage Items/ManageItems";
import UpdateItems from "../DashBoard/Manage Items/Updateitems";
import AddBikes from "../DashBoard/Manage Items/AddBikes";
import PrivateRoute from "./PrivateRoute";
import { AdminRoute } from "./AdminRoute";
import AllPayment from "../DashBoard/Payment/AllPayment";
import GeminiChat from "../Pages/Gemini Ai/GeminiChat";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: '/bikeSpecs/:id',
                element: <BikeSpecs />,
                loader: ({ params }) => fetch(`https://ebikes-ten.vercel.app/bikes/${params.id}`)
            },
            {
                path: '/menu',
                element: <BikeMenu />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/contact',
                element: <Contact />
            },
            {
                path: '/chat',
                element: <GeminiChat/>
            }
        ]
    },
    {
        path: "dashboard",
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [
            {
                path: "home",
                element: <DashBoardHome />
            },
            {
                path: 'mycart',
                element: <MyCart />
            },
            {
                path: 'favorites',
                element: <Favorites />
            },
            {
                path: 'payment',
                element: <Payment />
            },
            {
                path: 'history',
                element: <PaymentHistory />
            },
            {
                path: 'allusers',
                element: <AdminRoute><AllUsers /></AdminRoute>
            },
            {
                path: 'manageitems',
                element: <AdminRoute><ManageItems /></AdminRoute>
            },
            {
                path: 'updateitems/:id',
                element: <AdminRoute><UpdateItems /></AdminRoute> ,
                loader: ({ params }) => fetch(`https://ebikes-ten.vercel.app/bikes/${params.id}`)
            },
            {
                path:'additem',
                element : <AdminRoute><AddBikes/></AdminRoute>
            },
            {
                path:'allpayment',
                element: <AdminRoute><AllPayment/></AdminRoute>
            }
        ]
    }
])