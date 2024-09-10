import React, { useContext, useEffect, useState } from 'react'
import SingleEbike from '../../Shared/Ebikes/SingleEbike'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../../Context/AuthProvider'


const OurProducts = () => {

  const { BikeData } = useContext(AuthContext)

  return (
    <div>
      <p className='text-[#23272F] font-semibold mt-10 text-[2.5rem] text-center '>Our <span className='text-[#14C9C9]'>Products</span></p>
      <hr className='mb-10 mt-2 w-1/2 mx-auto border-2 rounded-2xl ' />
      <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4'>
        {
          BikeData.slice(0, 12).map((item, index) => {
            return (
              <SingleEbike key={index} item={item} />
            )
          })
        }
      </div>

      <Link to='/menu' className='btn text-lg font-extrabold bg-slate-600 text-white font-abc w-1/3 flex mx-auto mt-8 mb-[6rem] hover:text-black'> View All </Link>


    </div>
  )
}

export default OurProducts