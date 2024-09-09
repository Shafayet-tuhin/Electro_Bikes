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


export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children:[
            {
                path: "/",
                element: <Home/>,
            },
            {
               path:'/bikeSpecs/:id',
               element:<BikeSpecs/>,
               loader:({params}) => fetch(`http://localhost:3000/bikes/${params.id}`)
            },
            {
                path:'/menu' ,
                element:<BikeMenu/>
            },
            {
                path:'/login' ,
                element: <Login/>
            },
            {
                path:'/register' ,
                element: <Register/>
            },
            {
               path:'/contact' ,
               element: <Contact/>
            }
        ]
    },
    {
        path:"dashboard" ,
        element: <DashboardLayout/>,
        children:[
            {
                path:"home" ,
                element:<DashBoardHome/>
            },
            {
                path:'mycart',
                element:<MyCart/>
            },
            {
                path:'favorites' ,
                element:<Favorites/>
            },
            {
                path:'payment',
                element:<Payment/>
            },
            {
                path:'history' ,
                element:<PaymentHistory/>
            }
        ]
    }
])