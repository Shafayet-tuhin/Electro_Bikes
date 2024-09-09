import React from 'react'
import Banner from './Banner'
import EbikeSecton from './Ebikes/EbikeSecton'
import OurProducts from './Ebikes/OurProducts'
import RestPage1 from './Rest of home page/RestPage1'
import RestPage2 from './Rest of home page/RestPage2'
import FAQ from './Rest of home page/FAQ'
import GoUp from './Go up/GoUp'
import { Helmet } from 'react-helmet-async'

export const Home = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  return (

    <div>

      <Helmet>
        <title>Home Page</title>
      </Helmet>


      <Banner />
      <EbikeSecton />
      <RestPage1 />
      <OurProducts />
      <RestPage2 />
      <FAQ />
    </div>
  )
}
