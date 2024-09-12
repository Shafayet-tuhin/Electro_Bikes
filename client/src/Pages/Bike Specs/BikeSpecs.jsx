import React, { useContext } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { BsHeart } from "react-icons/bs";
import { FaRegHandPointRight } from "react-icons/fa6";
import FAQ from "../Home/Rest of home page/FAQ";
import { MdOutlinePriceChange } from "react-icons/md";
import { TbCategoryMinus } from "react-icons/tb";
import { RiUserStarFill } from "react-icons/ri";
import logo from '../../assets/Cycle/logo.jpg'
import { BsFillLightningFill } from "react-icons/bs";
import { IoMdCart } from "react-icons/io";
import { IoChevronBackCircleSharp } from "react-icons/io5";
import { AuthContext } from "../../Context/AuthProvider";
import useCart from "../../Hooks/useCart";
import useFav from "../../Hooks/useFav";
import Swal from "sweetalert2";

const BikeSpecs = () => {
  const data = useLoaderData();
  const { name, details, rating, price, category, specifications, image , _id} = data;
 
   const {user , setPayment} = useContext(AuthContext)
   const [isPending, cart, refetch]= useCart()
   const [isLoading, fav, refetchFavorites] = useFav()
   const navigate = useNavigate()

  window.scrollTo({
    top: 0,
    behavior: "instant",
  });

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

            fetch('https://ebikes-ten.vercel.app/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(itemInfo)
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.message == 'success') {
                        refetch()
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
                item_id: _id,
                email: user.email,
                category: category
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
                    refetchFavorites()
                    
                    Swal.fire({
                        title: "Added to favorites successfully",
                        icon: "success"
                    });
                })
                .catch((err) => console.log(err))
        }
    });
}

  const handlePayment = () => {
    if (!user) {
        Swal.fire({
            title: "Please login first",
            icon: "error"
        });
        navigate('/login')
        return
    }

    setPayment(price)
    navigate('/dashboard/payment')
  }


  return (
    <div className="mt-32 container mx-auto px-4">

      <Link to='/menu' className="text-4xl animate-pulse text-slate-600"><IoChevronBackCircleSharp /></Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image Section */}
        <div className="relative">
          <img
            src={image}
            alt={name}
            className="w-full h-auto rounded-3xl"
          />
          <button className="animate-bounce absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
            <BsHeart onClick={() => {handleFav()}} className="text-red-500" size={24} />
          </button>
        </div>

        {/* Details Section */}
        <div className="flex flex-col  gap-8">
          <div>
            <h1 className="text-4xl font-abc font-bold ">
              {name}
            </h1>
            <p className="text-gray-600 text-2xl mt-2">{details}</p>
            <div className="flex items-center mt-4 text-xl">
              <RiUserStarFill className="text-3xl text-yellow-500" />
              <span className="ml-2 text-gray-600">{rating}</span>
            </div>
            <p className="text-3xl font-semibold  mt-4 flex items-center gap-2 ">
              <MdOutlinePriceChange className="text-green-500" />  ${price}
            </p>
            <p className="text-gray-600 font-abc font-semibold text-xl mt-3 flex items-center gap-2"> <TbCategoryMinus className="text-blue-400 text-3xl" /> Category : {category}</p>
          </div>

          {/* Buttons */}
          <div className="flex  space-x-4">
            <button onClick={() => hadnleCart()} className="btn btn-outline border-gray-200"> <IoMdCart /> Add To Cart</button>
            <button onClick={handlePayment} className="btn btn-outline border-gray-200"> <BsFillLightningFill /> Quick Buy</button>
          </div>
        </div>
      </div>

      {/* Specifications Section */}
      <div className="mt-12 mb-[5rem] flex flex-col lg:flex-row gap-3 justify-center items-center font-abc">
        <img src={logo} className="w-[30rem] rounded-3xl" alt="" />
        <div>
          <h2 className=" text-5xl font-semibold ">
            Specifications
          </h2>
          <hr className="mb-8 mt-4 border-2" />
          <ul className="mt-2 space-y-2">
            {specifications.map((spec, index) => (
              <li key={index} className="flex items-center">
                <span className="text-orange-500 text-2xl font-semibold mr-2">
                  <FaRegHandPointRight />
                </span>
                <span className="text-2xl font-extrabold text-gray-600">{spec}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <FAQ />
    </div>
  );
};

export default BikeSpecs;
