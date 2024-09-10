import React, { useContext, useState } from 'react';
import logo from '../../../assets/Nav/logo.png';
import { IoIosSearch } from "react-icons/io";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FaRegHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider';
import Swal from 'sweetalert2';
import useCart from '../../../Hooks/useCart';
import useFav from '../../../Hooks/useFav';

function Nav() {
    const { user, logOut } = useContext(AuthContext);
    const [isPending, cart] = useCart();
    const [isLoading, fav] = useFav();
    const [isOpen, setIsOpen] = useState(false);

    const NavOptions = (
        <>
            <li> <Link to='/' className='font-abc hover:text-orange-500 text-base font-bold btn btn-ghost'>Home</Link></li>
            <li> <Link to='/menu' onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }} className='font-abc hover:text-orange-500 text-base font-bold btn btn-ghost'>Menu</Link></li>
            <li> <Link to='/contact' className='font-abc hover:text-orange-500 text-base font-bold btn btn-ghost'>Contact Us</Link></li>
            <li> <Link to='dashboard/home' className='font-abc hover:text-orange-500 text-base font-bold btn btn-ghost'>DashBoard</Link></li>
        </>
    );

    const handleLogout = () => {
        logOut();
        localStorage.removeItem('token');
        Swal.fire({
            title: "Logout successfully",
            icon: 'success',
        });
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

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
                <Link to='/' className="btn btn-ghost text-xl" onClick={() =>  window.scrollTo({ top: 0, behavior: 'smooth' })}>
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
                <div className="dropdown dropdown-end">
                    {
                        user && user.photoURL && (
                            <div tabIndex={0} className="btn btn-ghost" onClick={toggleDropdown}>
                                <img className='w-12 rounded-full' src={user.photoURL} alt="User Profile" />
                            </div>
                        )
                    }
                    {isOpen && (
                        <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 shadow text-sm">
                            <li>
                                <Link to='/menu' className='font-abc hover:text-orange-500 font-bold btn btn-ghost'>
                                    <IoIosSearch /> Search
                                </Link>
                            </li>
                            <li>
                                <Link to='/dashboard/favorites' className='font-abc hover:text-orange-500 font-bold btn btn-ghost'>
                                    <FaRegHeart /> Favorites ({fav.length})
                                </Link>
                            </li>
                            <li>
                                <Link to='/dashboard/mycart' className='font-abc hover:text-orange-500 font-bold btn btn-ghost'>
                                    <MdOutlineShoppingCart /> Cart ({cart.length})
                                </Link>
                            </li>
                            <li>
                                <button className='font-abc hover:text-orange-500 text-lg font-bold btn btn-outline btn-error' onClick={handleLogout}>
                                    Logout
                                </button>
                            </li>
                        </ul>
                    )}
                </div>
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
