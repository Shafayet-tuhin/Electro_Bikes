import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../Context/AuthProvider'


import { MdDelete } from "react-icons/md";
import Swal from 'sweetalert2';
import { MdOutlinePriceChange } from "react-icons/md";
import { SiCashapp } from "react-icons/si";
import { FaOpencart } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import useCart from '../../Hooks/useCart';
import useFav from '../../Hooks/useFav';




const Favorites = () => {

  const [, , refetch] = useCart()
  const { user, loading } = useContext(AuthContext)
  const [isLoading, fav, refetchFavorites] = useFav()
 

  const handleDelete = (item) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://ebikes-ten.vercel.app/favorites/${item._id}`, { method: 'DELETE' })
          .then(res => res.json())
          .then(data => {
           refetchFavorites()
            Swal.fire(
              'Deleted!',
              'Your favorite has been deleted.',
              'success'
            )
          })
      }
    })
  }

  const HandleAdd = (item) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then((result) => {
      if (result.isConfirmed) {
        const itemInfo = {
          name: item.name,
          price: item.price,
          image: item.image,
          item_id: item._id,
          email: user.email

        }

        fetch('https://ebikes-ten.vercel.app/cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(itemInfo)
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data)
            if (data.message === 'success') {
              refetch()
              fetch(`https://ebikes-ten.vercel.app/favorites/${item._id}`, { method: 'DELETE' })
                .then(res => res.json())
                .then(data => {
                  refetchFavorites()
                })
              Swal.fire({
                title: "Added to cart successfully",
                icon: "success"
              });
            }
            else {
              Swal.fire({
                title: "Error adding to cart",
                icon: "error"
              });
            }

          })
      }
    });
  }

  return (
    <div className='w-full font-abc'>

      <div className='flex justify-center items-center flex-col mb-8'>

        <div className="flex flex-col items-center gap-4 mb-8">
          <p className="text-[#D99904] italic text-3xl font-abc">
            My Favorites
          </p>
          <hr className="lg:w-[22rem] border-2 w-full" />
        </div>

      </div>




      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className='lg:text-xl  bg-sky-800 text-white'>
            <tr>
              <th>#</th>
              <th>Picture</th>
              <th>Item Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Action</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className='bg-slate-200  text-black lg:text-lg'>
            {
              fav.map((item, ind) => {
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
                      {item.category}

                    </td>

                    <td className='lg:text-xl font-extrabold text-green-600'>${item.price}</td>
                    <td>
                      {
                        loading ? <span className="loading loading-ring loading-lg"> </span> :
                          <button onClick={() => HandleAdd(item)} className='btn btn-outline text-white bg-green-600 hover:text-orange-400 text-sm'>
                            Add To Cart
                          </button>
                      }

                    </td>
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



    </div>
  )
}

export default Favorites