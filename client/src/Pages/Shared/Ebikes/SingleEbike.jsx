import React, { useContext } from 'react'
import { FaStar } from 'react-icons/fa6';
import { CiHeart } from "react-icons/ci";
import { FcViewDetails } from "react-icons/fc";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider';
import Swal from 'sweetalert2';
import useCart from '../../../Hooks/useCart';
import useFav from '../../../Hooks/useFav';

const SingleEbike = ({ item }) => {

    const { _id, image, name, price, rating } = item;
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()
    const [, , refetch] = useCart()
    const [isLoading, fav, refetchFavorites] = useFav()

    const hadnleCart = () => {
        if (!user) {
            Swal.fire({
                title: "Please login first",
                icon: "error"
            });
            navigate('/login')
            return
        }

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
                    name: name,
                    price: price,
                    image: image,
                    item_id: _id,
                    email: user.email
                }

                fetch('http://localhost:3000/cart', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(itemInfo)
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.message === 'success') {
                            refetch()
                            Swal.fire({
                                title: "Added to cart successfully",
                                icon: "success"
                            });
                        } else {
                            Swal.fire({
                                title: "Error adding to cart",
                                icon: "error"
                            });
                        }
                    })
            }
        });
    }

    const handleFav = () => {
        if (!user) {
            Swal.fire({
                title: "Please login first",
                icon: "error"
            });
            navigate('/login')
            return
        }

        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Add it "
        }).then((result) => {
            if (result.isConfirmed) {
                const itemInfo = {
                    name,
                    price,
                    image,
                    item_id: item._id,
                    email: user.email,
                    category: item.category
                };

                fetch('http://localhost:3000/favorites', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(itemInfo)
                })
                    .then((res) => res.json())
                    .then((data) => {
                        refetchFavorites()
                        console.log(data)
                        Swal.fire({
                            title: "Added to favorites successfully",
                            icon: "success"
                        });
                    })
                    .catch((err) => console.log(err))
            }
        });
    }

    return (
        <div className="card bg-base-100 shadow-xl dark:shadow-base-300 w-full md:w-72 mx-auto my-4">
            <CiHeart onClick={() => handleFav()} className='mb-5 ml-auto text-2xl transform -translate-x-10 translate-y-10 hover:text-orange-600 hover:text-3xl hover:cursor-pointer' />
            <figure className="px-10 pt-10">
                <img
                    src={image}
                    alt="Bikes"
                    className="rounded-xl w-full md:w-[15rem]" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title lg:text-lg font-abc font-extrabold leading-6">{name}</h2>
                <div className='flex gap-2 md:gap-9 items-center'>
                    <p className='font-abc text-sm font-extrabold'> Price: <span className='text-orange-600 text-lg animate-pulse'>${price}</span> </p>
                    <p className='flex items-center font-abc text-sm'> <FaStar className='text-orange-400 text-base' /> ({rating}) </p>
                </div>
                <div className='flex mt-3 gap-2 justify-center'>
                    <button className='btn btn-outline text-lg  border-gray-300' onClick={() => hadnleCart()}  >Add Item</button>
                    <Link to={`/bikeSpecs/${_id}`} >  <button className='btn btn-outline text-2xl lg:text-4xl  border-gray-300' ><FcViewDetails /></button> </Link>
                </div>
            </div>
        </div>
    )
}

export default SingleEbike;
