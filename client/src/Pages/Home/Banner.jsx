import React from 'react';
import banner from '../../assets/banner/banner.png';
import { FaLocationArrow } from "react-icons/fa6";
import bike from '../../assets/banner/bike.png';
import SliderBanner from './SliderBanner';

const Banner = () => {
  return (
    <div>

      <SliderBanner />

      <div className='grid lg:grid-cols-4 grid-cols-2 text-center justify-between gap-8 lg:gap-16 px-4 lg:px-[7.5rem] py-[2rem]'>
        <div className='flex flex-col'>
          <p className='text-[#14C9C9] font-semibold text-4xl lg:text-5xl leading-tight lg:leading-[3.5rem] mb-5'>5896+</p>
          <p className='text-xl lg:text-2xl font-semibold leading-7 lg:leading-8 mb-2'>Customer Served</p>
          <p className='text-[#667085] font-normal leading-5 lg:leading-6 text-sm lg:text-base'>We offer emission-free local travel, Not only doing something good.</p>
        </div>

        <div className='flex flex-col'>
          <p className='text-[#14C9C9] font-semibold text-4xl lg:text-5xl leading-tight lg:leading-[3.5rem] mb-5'>21</p>
          <p className='text-xl lg:text-2xl font-semibold leading-7 lg:leading-8 mb-2'>Value Proposition</p>
          <p className='text-[#667085] font-normal leading-5 lg:leading-6 text-sm lg:text-base'>We offer emission-free local travel, Not only doing something good for yourself.</p>
        </div>

        <div className='flex flex-col'>
          <p className='text-[#14C9C9] font-semibold text-4xl lg:text-5xl leading-tight lg:leading-[3.5rem] mb-5'>8956</p>
          <p className='text-xl lg:text-2xl font-semibold leading-7 lg:leading-8 mb-2'>Customer Served</p>
          <p className='text-[#667085] font-normal leading-5 lg:leading-6 text-sm lg:text-base'>We offer emission-free local travel, Not only doing something good.</p>
        </div>

        <div className='flex flex-col'>
          <p className='text-[#14C9C9] font-semibold text-4xl lg:text-5xl leading-tight lg:leading-[3.5rem] mb-5'>5896+</p>
          <p className='text-xl lg:text-2xl font-semibold leading-7 lg:leading-8 mb-2'>Customer Served</p>
          <p className='text-[#667085] font-normal leading-5 lg:leading-6 text-sm lg:text-base'>We offer emission-free local travel, Not only doing something good.</p>
        </div>
      </div>

      <div className='mt-16 bg-[url("./assets/banner/road1.png")] bg-center h-[25rem] lg:h-[39rem] text-center relative'>
        <div className='text-center px-4 lg:px-0'>
          <p className='font-abc font-semibold text-2xl lg:text-[2.5rem] leading-tight lg:leading-normal mb-6 mt-6'>Find your <span className='text-[#14C9C9]'>perfect</span> Ebike in less than <span className='text-[#14C9C9]'>3 minutes</span></p>
          <p className='text-[#667085] lg:w-[50rem] mx-auto font-normal text-sm lg:text-base leading-5 lg:leading-6'>Answer a few quick questions and we'll instantly recommend the best eBike for you. Get custom recommendations based on your height and riding needs.</p>
        </div>
        <button className='btn btn-accent text-white font-semibold text-sm lg:text-base mt-4 lg:mt-[3.13rem] relative'>Get Your Recommendations</button>

        <img className='absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[20rem] lg:w-[31rem]' src={bike} alt="Bike on Road" />
      </div>

    </div>
  );
};

export default Banner;
