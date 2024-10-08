import React, { useContext } from 'react';
import SingleEbike from '../../Shared/Ebikes/SingleEbike';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../Context/AuthProvider';

const OurProducts = () => {
  const { BikeData, loading } = useContext(AuthContext);

  if (loading) {
      return <p>Loading...</p>;
  } 

  return (
    <div>
      <p className='font-semibold mt-10 text-[2.5rem] text-center'>
        Our <span className='text-[#14C9C9]'>Products</span>
      </p>
      <hr className='mb-10 mt-2 w-1/2 mx-auto border-2 rounded-2xl' />

      {/* Show a message if there are no bikes available */}
      {BikeData.length === 0 ? (
        <p className='text-center text-lg'>No products available at the moment.</p>
      ) : (
        <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4'>
          {BikeData.slice(0, 12).map((item, index) => (
            <SingleEbike key={index} item={item} />
          ))}
        </div>
      )}

      <Link
        to='/menu'
        className='btn text-lg font-extrabold bg-slate-600 text-white font-abc w-1/3 flex mx-auto mt-8 mb-[6rem] hover:text-black'
        onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
      >
        View All
      </Link>
    </div>
  );
};

export default OurProducts;
