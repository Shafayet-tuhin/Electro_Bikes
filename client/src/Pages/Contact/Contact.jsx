import React from 'react'
import { BiSolidPhoneCall } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";
import { IoTimeSharp } from "react-icons/io5";
import ContactFrom from './ContactForm';
import { Helmet } from 'react-helmet-async';

const Contact = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <div className='mt-32'>
            <Helmet>
                <title>Contact Us</title>
            </Helmet>



            <ContactFrom />


        </div>
    )
}

export default Contact