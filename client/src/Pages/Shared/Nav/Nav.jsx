import React, { useContext, useEffect, useState } from 'react';
import logo from '../../../assets/Nav/logo.png';
import { IoIosSearch } from "react-icons/io";
import { MdAddCall, MdDashboard, MdOutlineShoppingCart } from "react-icons/md";
import { FaHome, FaRegHeart, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider';
import Swal from 'sweetalert2';
import useCart from '../../../Hooks/useCart';
import useFav from '../../../Hooks/useFav';
import { SiGooglegemini } from 'react-icons/si';
import { IoBicycleSharp } from 'react-icons/io5';
import {jwtDecode} from 'jwt-decode';


function Nav() {
    const { user, logOut } = useContext(AuthContext);
    const [isPending, cart] = useCart();
    const [isLoading, fav] = useFav();

    const [theme, setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "light")

    useEffect(() => {
        localStorage.setItem("theme", theme)
        const localTheme = localStorage.getItem("theme")
        document.querySelector("html").setAttribute("data-theme", localTheme)
    }, [theme])

    const NavOptions = (
        <>
            <li> <Link to='/' className='font-abc hover:text-orange-500 text-base font-bold btn btn-ghost'><FaHome/>Home</Link></li>
            <li> <Link to='/menu' onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }} className='font-abc hover:text-orange-500 text-base font-bold btn btn-ghost'><IoBicycleSharp/>Menu</Link></li>
            <li> <Link to='/contact' className='font-abc hover:text-orange-500 text-base font-bold btn btn-ghost'><MdAddCall/>Contact Us</Link></li>
            <li> <Link to='/chat' className='font-abc hover:text-orange-500 text-base font-bold btn btn-ghost'><SiGooglegemini/> Ai Chat</Link></li>
            <li> <Link to='dashboard/home' className='font-abc hover:text-orange-500 text-base font-bold btn btn-ghost'><MdDashboard />DashBoard</Link></li>
        </>
    );

    const handleLogout = () => {
        logOut();
        localStorage.removeItem('token');

        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "success",
            title: "Successfully Logged out"
          });
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            console.log(decodedToken.exp)
            const currentTime = Math.floor(Date.now() / 1000); 
            if (decodedToken.exp < currentTime) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.onmouseenter = Swal.stopTimer;
                      toast.onmouseleave = Swal.resumeTimer;
                    }
                  });
                  Toast.fire({
                    icon: "warning",
                    title: "Session expired. Please login again"
                  });
                logOut(); 
            }
        }
    }, []);


    const handleTheme = (e) => {
        if (e.target.checked) {
            setTheme("dark")
        }
        else {
            setTheme("light")
        }
    }

    return (
        <div className="opacity-85 navbar bg-base-100 lg:px-20 fixed top-0 z-10 max-w-screen-xl mx-auto">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {NavOptions}
                    </ul>
                </div>
                <Link to='/' className="btn btn-ghost p-0 text-xl" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <img src={logo} alt="" />
                    <p className='hidden lg:block'>ElectroBike</p>
                </Link>


            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-4">
                    {NavOptions}
                </ul>
            </div>
            <div className="navbar-end">

                {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

                <label className="lg:mr-4 mr-2 flex cursor-pointer gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round">
                        <circle cx="12" cy="12" r="5" />
                        <path
                            d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                    </svg>
                    <input type="checkbox" value="synthwave" className="toggle theme-controller" onChange={handleTheme}/>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    </svg>
                </label>

                {/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}





                {
                    user && <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar mr-4 lg:mr-0">
                            {
                                user && user.photoURL ? (
                                    <img className="w-10 rounded-full" src={user.photoURL} alt="User Profile" />
                                ) : (
                                    <FaUserCircle className="text-4xl text-cyan-700" />
                                )
                            }
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            <li>
                                <Link to='/menu' className='font-abc hover:text-orange-500 font-bold btn btn-ghost'>
                                    <IoIosSearch /> Search
                                </Link>
                            </li>
                            <li>
                                <Link to='/dashboard/favorites' className='font-abc hover:text-orange-500 font-bold btn btn-ghost'>
                                    <FaRegHeart /> Favorites <span className='px-2 py-1 bg-cyan-600 text-sm text-white font-bold rounded-xl'>+{fav.length}</span>
                                </Link>
                            </li>
                            <li>
                                <Link to='/dashboard/mycart' className='font-abc hover:text-orange-500 font-bold btn btn-ghost'>
                                    <MdOutlineShoppingCart /> Cart  <span className='px-2 py-1 bg-cyan-600 text-sm text-white font-bold rounded-xl'>+{cart.length}</span>
                                </Link>
                            </li>
                            <li>
                                <button className='font-abc hover:text-orange-500 text-lg font-bold btn btn-outline btn-error' onClick={handleLogout}>
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                }
                {
                    !user && (
                        <Link to='/login' className='hover:text-orange-500 text-base btn btn-outline btn-info'>
                            Login
                        </Link>
                    )
                }
            </div>
        </div>
    );
}

export default Nav;
