import React from 'react';
import banner from '../../assets/banner/banner.png';
import { FaLocationArrow } from "react-icons/fa6";
import bike from '../../assets/banner/bike.png';
import SliderBanner from './SliderBanner';

const Banner = () => {
  return (
    <div className=''>

      {/* <div>
        <p className='text-center bg-slate-600 text-white py-3 font-abc rounded-t-xl'>EMotorad X2 Unisex Mountain Electric Cycle - <span className='font-bold text-orange-400 animate-pulse'>$1999.99 </span>($300 OFF) </p>
      </div>

      <div className="bg-center bg-cover lg:h-[700px] flex items-center relative bg-[url('./assets/banner/banner.png')]">
        <div className="absolute inset-0 bg-black opacity-40"></div>

        <div className='relative text-white px-[7.5rem]'>
          <h1 className='text-[3.5rem] font-semibold leading-[4.5rem]'>Adventure.2 Ebike</h1>
          <p className='text-[1.125rem] font-normal leading-[1.5rem]'>The power of wildest dreams</p>
          <button className='flex mt-2 btn bg-opacity-10 border-none text-white hover:text-gray-800 items-center gap-1'>Buy Now <FaLocationArrow className='text-orange-400' /></button>
        </div>
      </div> */}

      <SliderBanner />
    

      <div className='grid grid-cols-4 text-center justify-between gap-16 px-[7.5rem] py-[2rem]'>
        <div className='flex flex-col '>
          <p className='text-[#14C9C9] font-semibold text-5xl leading-[3.5rem] mb-5'>5896+</p>
          <p className='text-2xl font-semibold leading-8 mb-2'>Customer Served</p>
          <p className='text-[#667085] font-normal leading-6 text-base'>We offer emission-free local travel, Not only doing something good.</p>
        </div>

        <div className='flex flex-col '>
          <p className='text-[#14C9C9] font-semibold text-5xl leading-[3.5rem] mb-5'>21</p>
          <p className='text-2xl font-semibold leading-8 mb-2'>Value Proposition</p>
          <p className='text-[#667085] font-normal leading-6 text-base'>We offer emission-free local travel, Not only doing something good for yourself.</p>
        </div>

        <div className='flex flex-col '>
          <p className='text-[#14C9C9] font-semibold text-5xl leading-[3.5rem] mb-5'>8956</p>
          <p className='text-2xl font-semibold leading-8 mb-2'>Customer Served</p>
          <p className='text-[#667085] font-normal leading-6 text-base'>We offer emission-free local travel, Not only doing something good.</p>
        </div>

        <div className='flex flex-col '>
          <p className='text-[#14C9C9] font-semibold text-5xl leading-[3.5rem] mb-5'>5896+</p>
          <p className='text-2xl font-semibold leading-8 mb-2'>Customer Served</p>
          <p className='text-[#667085] font-normal leading-6 text-base'>We offer emission-free local travel, Not only doing something good.</p>
        </div>
      </div>



      <div className='bg-[url("./assets/banner/road1.png")] bg-center h-[39rem] text-center relative'>
        <div className='text-center'>
          <p className='font-abc font-semibold text-[2.5rem] mb-6 mt-6'>Find your <span className='text-[#14C9C9]'>perfect</span> Ebike in less than <span className='text-[#14C9C9]'>3 minutes</span></p>
          <p className='text-[#667085] lg:w-[50rem] mx-auto font-normal text-base leading-6'>Answer a few quick questions and we'll instantly recommend the best eBike for you. Get custom recommendations based on your height and riding needs.</p>
        </div>
        <button className='btn btn-accent text-white font-semibold text-base mt-[3.13rem] relative'>Get Your Recommendations</button>

        <img className='absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[31rem]' src={bike} alt="Bike on Road" />

      </div>

    </div>
  );
};

export default Banner;
