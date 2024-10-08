import React from 'react';
import bike1 from '../../../assets/Rest/bike1.jpg';
import bike2 from '../../../assets/Rest/bike2.jpg';
import bike3 from '../../../assets/Rest/bike3.jpg';
import bike4 from '../../../assets/Rest/bike4.jpg';
import bike5 from '../../../assets/Rest/bike5.jpg';
import bike6 from '../../../assets/Rest/bike6.jpg';
import ReactCompareImage from 'react-compare-image';
import banner from '../../../assets/Rest/banner.jpg';

const RestPage2 = () => {
    return (
        <div className="px-4">
            <p className='font-semibold text-2xl md:text-3xl lg:text-[2.5rem] text-center'>
                Choose your <span className='text-[#14C9C9]'>Ebike</span>
            </p>
            <p className='text-[#667085] mt-5 max-w-lg md:max-w-xl lg:max-w-2xl mx-auto font-normal text-sm md:text-base lg:text-lg leading-6 text-center mb-16'>
                Powerful, self-serve product and growth analytics to help you convert, engage, and retain more users. Trusted by over 4,000 startups.
            </p>

            <div className='grid grid-cols-3 gap-4 '>

                <div className=' w-full'>
                    <ReactCompareImage leftImage={bike2} rightImage={bike5} />
                    <p></p>
                </div>
                <div className=' w-full'>
                    <ReactCompareImage leftImage={bike3} rightImage={bike6} />
                    <p></p>
                </div>
                <div className=' w-full'>
                    <ReactCompareImage leftImage={bike4} rightImage={bike3} />
                    <p></p>
                </div>

            </div>


            <div className='grid grid-cols-3  text-center justify-between items-center lg:gap-16 gap-4 lg:px-[7.5rem] py-[6rem]'>
                <div className='flex flex-col '>
                    <p className='text-[#14C9C9] font-semibold lg:text-5xl text-3xl mb-2  lg:leading-[3.5rem] lg:mb-5'>3000+</p>
                    <p className='lg:text-2xl font-semibold lg:leading-8 lg:mb-2 mb-1'>Test Rides</p>
                    <p className='text-[#667085] font-normal lg:leading-6 lg:text-base text-xs'>We offer emission-free local travel, Not only doing something good for yourself, but also for everyone else.</p>
                </div>
                <div className='flex flex-col '>
                    <p className='text-[#14C9C9] font-semibold lg:text-5xl text-3xl mb-2  lg:leading-[3.5rem] lg:mb-5'>3000+</p>
                    <p className='lg:text-2xl font-semibold lg:leading-8 lg:mb-2 mb-1'>Repairs</p>
                    <p className='text-[#667085] font-normal lg:leading-6 lg:text-base text-xs'>Simply bock using our super app, chose your destination, jump in to our nearby services and wheedle only.</p>
                </div>
                <div className='flex flex-col '>
                    <p className='text-[#14C9C9] font-semibold lg:text-5xl text-3xl mb-2  lg:leading-[3.5rem] lg:mb-5'>38700+</p>
                    <p className='lg:text-2xl font-semibold lg:leading-8 lg:mb-2 mb-1'>Miles smile</p>
                    <p className='text-[#667085] font-normal lg:leading-6 lg:text-base text-xs'>Know your travel octet's in advance then you can simply pay it using our super apps or choose another method.</p>
                </div>

               
            </div>

            {/* <div className='relative bg-[url("./assets/Rest/banner.jpg")] bg-cover bg-center rounded-2xl'>
            
                <div className='absolute inset-0 bg-black bg-opacity-40 rounded-2xl'></div>
               
                <div className='relative px-[12rem] py-[18rem]'>
                    <p className='font-abc font-semibold text-[3rem] mb-6 mt-6 text-white'>
                        <span className='text-[#14C9C9]'>Book</span> Your Test <span className='text-[#14C9C9]'>Ride</span>
                    </p>
                    <p className='text-gray-300 text-lg'>
                        Don't just imagine the ride of your dreams, feel it for yourself with a test ride! Book now and experience the exhilaration, comfort, and performance of our cutting-edge vehicles. From the sleek curves to the responsive handling.
                    </p>
                    <button className='btn btn-neutral mt-4'>Book ride now</button>
                </div>
            </div> */}

        </div>
    );
};

export default RestPage2;
