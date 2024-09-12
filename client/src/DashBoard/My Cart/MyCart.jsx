import React, { useContext } from 'react'

import { MdDelete } from "react-icons/md";
import Swal from 'sweetalert2';
import { MdOutlinePriceChange } from "react-icons/md";
import { SiCashapp } from "react-icons/si";
import { FaOpencart } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useCart from '../../Hooks/useCart';
import { AuthContext } from '../../Context/AuthProvider';


const MyCart = () => {

    const [isPending, cart, refetch] = useCart()
    const [loading, setLoading] = useState(false)
    const { payment, setPayment } = useContext(AuthContext)
    const navigate = useNavigate()

    let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    let tax = (total + cart.length * 80) * 0.05;
    const paymentAmount = total + tax + cart.length * 80;



    const handlePlus = (id) => {
        fetch(`http://localhost:3000/cart/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ method: 'increase' })
        }).then(res => res.json())
            .then(() => refetch());
    };

    const handleMinus = (id) => {
        fetch(`http://localhost:3000/cart/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ method: 'decrease' })
        }).then(res => res.json())
            .then(() => refetch());
    };




    const handleDelete = (item) => {

        console.log(item)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                setLoading(true)

                fetch(`http://localhost:3000/cart/${item._id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        setLoading(false)
                        refetch()
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });

                    })

            }
        });
    }


    const handlePayment = () => {
        if (cart.length === 0) {
            Swal.fire({
                title: "Cart is Empty",
                text: "Please add some items to cart",
                icon: "error"
            });
            navigate('/menu')
        } else {
            setPayment(paymentAmount)
            navigate('/dashboard/payment')
        }
    }



    return (
        <div className='w-full font-abc'>

            <div className='flex justify-center items-center flex-col mb-8'>
                <div className="flex flex-col items-center gap-4 mb-8">
                    <p className="text-[#D99904] italic text-3xl font-abc">
                        ---Cart Section---
                    </p>
                    <hr className="lg:w-[22rem] w-full" />
                </div>
                {/* <div className='flex flex-col lg:flex-row items-center gap-4 p-4 bg-cyan-800 font-abc lg:text-2xl lg:font-semibold text-white rounded-xl'>
                    <h3 className='mr-4 flex items-center gap-2'> <FaOpencart /> Total Items: {cart.length}</h3>
                    <h3 className='mr-4 flex items-center gap-2 '><MdOutlinePriceChange className='text-2xl' />Total Price : ${total.toFixed(2)}</h3>
                </div> */}

            </div>




            <div className='grid lg:grid-cols-3'>
                <div className="overflow-x-auto lg:col-span-2">
                    <table className="table">
                        {/* head */}
                        <thead className='lg:text-xl  bg-sky-800 text-white'>
                            <tr>
                                <th>#</th>
                                <th>Picture</th>
                                <th>Item Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className='bg-slate-200  text-black lg:text-lg'>
                            {
                                cart.map((item, ind) => {
                                    return (
                                        <tr key={item._id}>
                                            <td> {ind + 1} </td>
                                            <td>

                                                <div className="avatar">
                                                    <div className="mask mask-squircle h-12 w-12">
                                                        <img
                                                            src={item.image}
                                                            alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>

                                            </td>
                                            <td>
                                                {item.name}
                                            </td>
                                            <td>
                                                <div className="flex gap-2 items-center justify-center px-2 py-1 border mr-4 rounded-lg bg-white text-2xl">
                                                    <button className="text-red-500 font-extrabold" onClick={() => handleMinus(item._id)}>-</button>
                                                    <p className="font-medium">{item.quantity}</p>
                                                    <button className="text-green-500 font-extrabold" onClick={() => handlePlus(item._id)}>+</button>
                                                </div>
                                            </td>

                                            <td className='lg:text-xl font-extrabold text-green-600'>${item.price * item.quantity}</td>
                                            <td>
                                                {
                                                    loading ? <span className="loading loading-ring loading-lg"> </span> :
                                                        <button onClick={() => handleDelete(item)} className='btn btn-outline text-white bg-slate-800 hover:text-orange-400 text-2xl'>
                                                            <MdDelete />
                                                        </button>
                                                }

                                            </td>
                                        </tr>
                                    )
                                })
                            }


                        </tbody>
                    </table>
                </div>


                <div className="lg:col-span-1 bg-base-200 p-6 rounded-md shadow-sm">
                    <h1 className="font-abc text-3xl font-semibold mb-4">Order details</h1>

                    <div className="space-y-2 text-lg">
                        <div className="flex justify-between">
                            <p>Total Items </p>
                            <p className='flex items-center gap-2'> {cart.length} items</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Subtotal</p>
                            <p>€ {total.toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Shipping</p>
                            <p>+(€{cart.length * 80})</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Estimated Tax (5%)</p>
                            <p>+(€{tax.toFixed(2)})</p>
                        </div>
                        <div className="flex justify-between font-bold text-lg mt-4">
                            <p>Total</p>
                            <p>€{paymentAmount.toFixed(2)}</p>
                        </div>


                        <button onClick={handlePayment} className='btn w-full bg-blue-500 hover:bg-blue-600 mt-2 text-white px-4 py-2 rounded-lg' >
                            <SiCashapp /> Pay Now
                        </button>

                    </div>
                </div>
            </div>


        </div>
    )
}

export default MyCart