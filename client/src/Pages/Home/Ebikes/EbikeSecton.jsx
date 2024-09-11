import React from 'react';

const EbikeSecton = () => {
  return (
    <div className='mt-16'>
      <p className=' font-semibold text-2xl lg:text-[2.5rem] text-center'>An Ebike for <span className='text-[#14C9C9]'>Every</span> Type of <span className='text-[#14C9C9]'>Rider</span></p>
      <p className='text-[#667085] mt-4 lg:mt-5 lg:w-[40rem] mx-auto font-normal text-base lg:text-lg leading-6 text-center'>Powerful, self-serve product and growth analytics to help you convert, engage, and retain more users.</p>

      <div className='grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 px-4 sm:px-8 lg:px-12 mt-6 mb-6'>
        <div className='flex flex-col items-center dark:bg-base-200 shadow-md dark:shadow-gray-400 bg-[#f9f9fb] py-8 lg:py-10 rounded-2xl'>
          <img className='w-[12rem] lg:w-[15rem] rounded-2xl px-2 lg:px-0' src='https://www.ebikes.co.uk/media/catalog/product/cache/5b9149b7d5b82a453bd9f7f34b9c15a8/p/u/pure-flux-one-electric-hybrid-bike-p473-4993_image.jpeg' alt="Montra" />
          <p className='text-[#454a54] font-semibold text-2xl lg:text-3xl uppercase mt-4'>Montra</p>
          <p className='text-[#667085] '>Bicycle</p>
        </div>

        <div className='flex flex-col items-center  bg-[#f9f9fb] py-8 lg:py-10 rounded-2xl dark:bg-base-200 shadow-md dark:shadow-gray-400'>
          <img className='w-[12rem] lg:w-[15rem] rounded-2xl px-2 lg:px-0' src='https://www.ebikes.co.uk/media/catalog/product/cache/5b9149b7d5b82a453bd9f7f34b9c15a8/e/v/everett-side-view.jpg' alt="Giant" />
          <p className='text-[#454a54] font-semibold text-2xl lg:text-3xl uppercase mt-4'>Giant</p>
          <p className='text-[#667085] '>Bicycle</p>
        </div>

        <div className='flex flex-col items-center bg-[#f9f9fb] py-8 lg:py-10 rounded-2xl dark:bg-base-200 shadow-md dark:shadow-gray-400'>
          <img className='w-[12rem] lg:w-[15rem] rounded-2xl px-2 lg:px-0' src='https://www.ebikes.co.uk/media/catalog/product/cache/5b9149b7d5b82a453bd9f7f34b9c15a8/d/o/dorchester1.jpeg' alt="Silverback" />
          <p className='text-[#454a54] font-semibold text-2xl lg:text-3xl uppercase mt-4'>Silverback</p>
          <p className='text-[#667085] '>Bicycle</p>
        </div>

        <div className='flex flex-col items-center bg-[#f9f9fb] py-8 lg:py-10 rounded-2xl dark:bg-base-200 shadow-md dark:shadow-gray-400'>
          <img className='w-[12rem] lg:w-[15rem] rounded-2xl px-2 lg:px-0 ' src='https://www.ebikes.co.uk/media/catalog/product/cache/5b9149b7d5b82a453bd9f7f34b9c15a8/p/u/pure-free-city-electric-hybrid-bike-p474-5021_image.jpeg' alt="Patriot" />
          <p className='text-[#454a54] font-semibold text-2xl lg:text-3xl uppercase mt-4'>Patriot</p>
          <p className='text-[#667085] '>Bicycle</p>
        </div>
      </div>
    </div>
  );
};

export default EbikeSecton;
