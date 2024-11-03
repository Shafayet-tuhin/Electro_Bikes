import React from 'react';

const RestPage1 = () => {
    return (
        <div className="px-4 lg:px-0 lg:mt-32 mt-16  ">

            <p className=' font-semibold text-[1.5rem] sm:text-[2rem] lg:text-[2.5rem] text-center'>
                How Is <span className='text-[#14C9C9]'>Our Ebike</span> You May <span className='text-[#14C9C9]'>Ask</span>
            </p>

            <p className='text-[#667085] mt-3 sm:mt-5 lg:w-[40rem] mx-auto font-normal text-sm sm:text-base leading-5 sm:leading-6 text-center mb-6 sm:mb-8 lg:mb-16'>
                Powerful, self-serve product and growth analytics to help you convert, engage, and retain more users. Trusted by over 4,000 startups.
            </p>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-10'>

               
                <div className='flex flex-col bg-[#23272F] py-6 sm:py-10 px-4 sm:px-6 lg:py-[9.3rem] lg:pl-[7.5rem] lg:pr-16'>
                    <p className='font-semibold text-2xl sm:text-3xl lg:text-4xl leading-tight text-white'>
                        <span className='text-[#14C9C9]'>Beyond</span> the bike
                    </p>
                    <p className='mt-6 sm:mt-8 mb-2 sm:mb-3 text-white font-semibold text-lg sm:text-xl lg:text-[1.5rem] leading-7 sm:leading-8'>
                        Real Riders. Real Experiences.
                    </p>
                    <p className='mb-6 sm:mb-8 text-[#98A2B3] font-normal text-sm sm:text-base leading-5 sm:leading-6'>
                        Our mini-series, Beyond the Bike, captures the stories of Aventon riders and how their ebikes are used in unexpected ways to bring them closer to what makes them feel most alive.
                    </p>
                    <a className='text-[#14C9C9] font-medium text-sm sm:text-base underline' href="https://www.youtube.com/watch?v=CuV2-NQH7UA" target='_blank'>Watch More</a>
                </div>

              
                <div className='relative pb-[56.25%] h-0 lg:h-full'>
                    <iframe
                        className='absolute w-full h-full'
                        src="https://www.youtube-nocookie.com/embed/v6MKWcKbiig"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="YouTube video"
                    ></iframe>
                </div>

               
                <div className='relative pb-[56.25%] h-0 lg:h-full'>
                    <iframe
                        className='absolute w-full h-full'
                        src="https://www.youtube-nocookie.com/embed/gXDzgudAMHY"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="YouTube video"
                    ></iframe>
                </div>

            
                <div className='flex flex-col bg-white py-6 sm:py-10 px-4 sm:px-6 lg:py-[9.3rem] lg:pl-[7.5rem] lg:pr-16'>
                    <p className='font-semibold text-2xl sm:text-3xl lg:text-4xl leading-tight text-gray-600'>
                        <span className='text-[#14C9C9]'>21</span> Day At <span className='text-[#14C9C9]'>Home Trial</span>
                    </p>
                    <p className='mt-6 sm:mt-8 mb-2 sm:mb-3 text-gray-600 font-semibold text-lg sm:text-xl lg:text-[1.5rem] leading-7 sm:leading-8'>
                        Real Riders. Real Experiences.
                    </p>
                    <p className='mb-6 sm:mb-8 text-[#98A2B3] font-normal text-sm sm:text-base leading-5 sm:leading-6'>
                        Our mini-series, Beyond the Bike, captures the stories of Aventon riders and how their ebikes are used in unexpected ways to bring them closer to what makes them feel most alive.
                    </p>
                    <a className='text-[#14C9C9] font-medium text-sm sm:text-base underline' href="https://www.youtube.com/watch?v=CuV2-NQH7UA" target='_blank'>21 days trial details</a>
                </div>

            </div>

        </div>
    )
}

export default RestPage1;
