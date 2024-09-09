import React from 'react'
import { Link } from 'react-router-dom'
import { IoMdBicycle } from "react-icons/io";

const EbikeSecton = () => {
  return (
    <div className='mt-16'>
      <p className='text-[#23272F] font-semibold text-[2.5rem] text-center'>An Ebike for <span className='text-[#14C9C9]'>Every</span> Type of <span className='text-[#14C9C9]'>Rider</span></p>
      <p className='text-[#667085] mt-5 lg:w-[40rem] mx-auto font-normal text-base leading-6 text-center'>Powerful, self-serve product and growth analytics to help you convert, engage, and retain more users. Trusted by over 4,000 startups.</p>


      <div className='grid grid-cols-4 gap-8 lg:px-12 mt-6 mb-6'>

        <div>
          <div className='flex flex-col items-center bg-[#f9f9fb] py-10 rounded-2xl'>
            <img className='w-[15rem] rounded-2xl' src='https://www.ebikes.co.uk/media/catalog/product/cache/5b9149b7d5b82a453bd9f7f34b9c15a8/p/u/pure-flux-one-electric-hybrid-bike-p473-4993_image.jpeg' alt="" />
            <p className='text-[#454a54] font-semibold text-3xl uppercase mt-4'>Montra</p>
            <p className='text-[#667085] '>Bicycle</p>
          </div>
        </div>

        <div className='flex flex-col items-center bg-[#f9f9fb] py-10 rounded-2xl'>
          <img className='w-[15rem] rounded-2xl' src='https://www.ebikes.co.uk/media/catalog/product/cache/5b9149b7d5b82a453bd9f7f34b9c15a8/e/v/everett-side-view.jpg' alt="" />
          <p className='text-[#454a54] font-semibold text-3xl uppercase mt-4'>Giant</p>
          <p className='text-[#667085] '>Bicycle</p>
        </div>

        <div className='flex flex-col items-center bg-[#f9f9fb] py-10 rounded-2xl'>
          <img className='w-[15rem] rounded-2xl' src='https://www.ebikes.co.uk/media/catalog/product/cache/5b9149b7d5b82a453bd9f7f34b9c15a8/d/o/dorchester1.jpeg' alt="" />
          <p className='text-[#454a54] font-semibold text-3xl uppercase mt-4'>Silverback</p>
          <p className='text-[#667085] '>Bicycle</p>
        </div>

        <div className='flex flex-col items-center bg-[#f9f9fb] py-10 rounded-2xl'>
          <img className='w-[15rem] rounded-2xl' src='https://www.ebikes.co.uk/media/catalog/product/cache/5b9149b7d5b82a453bd9f7f34b9c15a8/p/u/pure-free-city-electric-hybrid-bike-p474-5021_image.jpeg' alt="" />
          <p className='text-[#454a54] font-semibold text-3xl uppercase mt-4'>Patriot</p>
          <p className='text-[#667085] '>Bicycle</p>
        </div>

      </div>
    </div>
  )
}

export default EbikeSecton