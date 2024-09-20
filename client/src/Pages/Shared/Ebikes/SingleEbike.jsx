import React, { useContext, useEffect, useState } from 'react';
import { FaHeart, FaStar } from 'react-icons/fa';
import { CiHeart } from 'react-icons/ci';
import { FcViewDetails } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider';
import Swal from 'sweetalert2';
import useCart from '../../../Hooks/useCart';
import useFav from '../../../Hooks/useFav';

const SingleEbike = ({ item }) => {
    const { _id, image, name, price, rating } = item;
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [cartLoading, cart, refetchCart] = useCart();
    const [favLoading, fav, refetchFavorites] = useFav();
    const [isFavorite, setIsFavorite] = useState(false);
    const [isInCart, setIsInCart] = useState(false);

    useEffect(() => {
        if (cart) {
            setIsFavorite(fav.some(favItem => favItem.item_id === _id));
            setIsInCart(cart.some(cartItem => cartItem.item_id === _id));
        }
    }, [fav, cart, _id, cartLoading, favLoading]);

    const handleCart = () => {
        if (!user) {
            Swal.fire({
                title: "Please login first",
                icon: "error"
            });
            navigate('/login');
            return;
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
                    name,
                    price,
                    image,
                    item_id: _id,
                    email: user.email
                };

                fetch('https://ebikes-ten.vercel.app/cart', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(itemInfo)
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.message === 'success') {
                            refetchCart();
                            const Toast = Swal.mixin({
                                toast: true,
                                position: "top-end",
                                showConfirmButton: false,
                                timer: 1000,
                                timerProgressBar: true,
                                didOpen: (toast) => {
                                  toast.onmouseenter = Swal.stopTimer;
                                  toast.onmouseleave = Swal.resumeTimer;
                                }
                              });
                              Toast.fire({
                                icon: "success",
                                title: "Item added successfully"
                              });
                            setIsInCart(true);
                        } else {
                            Swal.fire({
                                title: "Error adding to cart",
                                icon: "error"
                            });
                        }
                    });
            }
        });
    };

    const handleFav = () => {
        if (!user) {
            Swal.fire({
                title: "Please login first",
                icon: "error"
            });
            navigate('/login');
            return;
        }

        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Add it"
        }).then((result) => {
            if (result.isConfirmed) {
                const itemInfo = {
                    name,
                    price,
                    image,
                    item_id: _id,
                    email: user.email,
                    category: item.category
                };

                fetch('https://ebikes-ten.vercel.app/favorites', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(itemInfo)
                })
                    .then((res) => res.json())
                    .then((data) => {
                        refetchFavorites();
                        const Toast = Swal.mixin({
                            toast: true,
                            position: "top-end",
                            showConfirmButton: false,
                            timer: 1000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                              toast.onmouseenter = Swal.stopTimer;
                              toast.onmouseleave = Swal.resumeTimer;
                            }
                          });
                          Toast.fire({
                            icon: "success",
                            title: "Added to Favorites"
                          });
                        setIsFavorite(true);
                    })
                    .catch((err) => console.log(err));
            }
        });
    };

    return (
        <div className="card bg-base-100 shadow-xl dark:shadow-base-300 w-full md:w-72 mx-auto my-4">
            {isFavorite ? (
                <FaHeart
                    className="mb-5 ml-auto text-2xl transform -translate-x-10 translate-y-10 hover:text-3xl hover:cursor-pointer text-red-500 btn-disabled"
                />
            ) : (
                <CiHeart
                    onClick={handleFav}
                    className={`mb-5 ml-auto text-2xl transform -translate-x-10 translate-y-10 hover:text-3xl hover:cursor-pointer ${isInCart ? 'btn-disabled text-gray-600' : 'text-red-500'}`}
                />
            )}

            <figure className="lg:px-10 px-0 pt-10">
                <img
                    src={image}
                    alt="Bikes"
                    className="rounded-xl w-2/3 md:w-[15rem] "
                />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title lg:text-lg text-sm font-abc font-extrabold leading-6">{name}</h2>
                <div className='flex gap-2 md:gap-9 items-center'>
                    <p className='font-abc lg:text-sm text-xs font-extrabold'> Price: <span className='text-orange-600 lg:text-lg animate-pulse'>${price}</span> </p>
                    <p className='flex items-center font-abc lg:text-sm text-xs'> <FaStar className='text-orange-400 text-base' /> ({rating}) </p>
                </div>
                <div className='flex mt-3 gap-2 justify-center'>
                    <button
                        className={`btn btn-outline lg:text-lg text-xs border-gray-300 ${isInCart ? 'btn-disabled' : ''}`}
                        onClick={handleCart}
                    >
                        {isInCart ? 'Added' : 'Add Item'}
                    </button>
                    <Link to={`/bikeSpecs/${_id}`} >
                        <button className='btn btn-outline text-xl lg:text-4xl border-gray-300'>
                            <FcViewDetails />
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SingleEbike;
