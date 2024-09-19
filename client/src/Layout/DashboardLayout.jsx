import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { BsCart4 } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { GiWallet } from 'react-icons/gi';
import { FaHome } from 'react-icons/fa';
import { MdMenuBook } from 'react-icons/md';
import { MdDirectionsBike } from 'react-icons/md';
import { RiCustomerService2Line } from 'react-icons/ri';
import { Helmet } from 'react-helmet-async';
import { MdManageAccounts } from 'react-icons/md';
import { FaUsers } from 'react-icons/fa';
import { AuthContext } from '../Context/AuthProvider';
import useCart from '../Hooks/useCart';
import { FaRegHeart } from "react-icons/fa";
import useFav from '../Hooks/useFav';
import { SiGooglegemini } from 'react-icons/si';

const DashboardLayout = () => {
  const [isPending, cart, refetch] = useCart();
  const { admin } = useContext(AuthContext);
   const [isLoading, fav, refetchFavorites] = useFav()
  return (
    <div className="drawer lg:drawer-open">
      <Helmet>
        <title>DashBoard Page</title>
      </Helmet>

      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        <Outlet />

        {/* Fixed position button for mobile */}
        <label
          htmlFor="my-drawer-2"
          className="btn  drawer-button lg:hidden fixed top-4 left-4 z-50"
        >

          {/* Daisy UI's three-bar menu icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </label>
      </div>

      <div className="drawer-side">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-[#0a2138] text-white min-h-full w-80 p-4 text-[0.9rem]">
          {/* Sidebar content here */}
          <div className="divider text-base rounded-2xl py-3">Dashboard</div>

          {admin ? (
            <>
              <li>
                <Link className="hover:text-orange-400" to="/dashboard/home">
                  <FaHome />
                  Admin Home
                </Link>
              </li>
              <li>
                <Link className="hover:text-orange-400" to="/dashboard/additem">
                  <MdDirectionsBike />
                  Add Bikes
                </Link>
              </li>
              <li>
                <Link className="hover:text-orange-400" to="/dashboard/manageitems">
                  <MdManageAccounts />
                  Manage Bikes
                </Link>
              </li>
              <li>
                <Link className="hover:text-orange-400" to="/dashboard/allusers">
                  <FaUsers />
                  All Users
                </Link>
              </li>
              <li>
                <Link className="hover:text-orange-400" to="/dashboard/allpayment">
                  <FaUsers />
                  All Users Payment
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link className="hover:text-orange-400" to="/dashboard/home">
                  <FaHome />
                  Home
                </Link>
              </li>
              <li>
                <Link className="hover:text-orange-400" to="/dashboard/favorites">
                  <button className="flex gap-2 items-center">
                    <FaRegHeart />
                    My Favorites
                    <div className="badge text-white bg-slate-600 font-abc">+ {fav?.length || 0}</div>
                  </button>
                </Link>
              </li>
              <li>
                <Link className="hover:text-orange-400" to="/dashboard/mycart">
                  <button className="flex gap-2 items-center">
                    <BsCart4 />
                    My Cart
                    <div className="badge text-white bg-slate-600 font-abc">+ {cart?.length || 0}</div>
                  </button>
                </Link>
              </li>
              <li>
                <Link className="hover:text-orange-400" to="/dashboard/history">
                  <GiWallet />
                  Payment History
                </Link>
              </li>
            </>
          )}

          <div className="divider rounded-2xl text-base py-3">Homepage</div>

          <li>
            <Link className="hover:text-orange-400" to="/">
              <FaHome />
              Home
            </Link>
          </li>
          <li>
            <Link className="hover:text-orange-400" to="/menu">
              <MdMenuBook />
              Our Menu
            </Link>
          </li>
          <li>
            <Link className="hover:text-orange-400" to="/chat">
            <SiGooglegemini/>
              Ai Chat
            </Link>
          </li>
         
          <li>
            <Link className="hover:text-orange-400" to="/contact">
              <RiCustomerService2Line />
              Contact Us
            </Link>
          </li>
         
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
