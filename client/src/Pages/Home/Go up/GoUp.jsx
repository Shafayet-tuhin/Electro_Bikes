import React from 'react'
import { FaArrowAltCircleUp } from "react-icons/fa";
const GoUp = () => {

    const goUp = () => {
        window.scrollTo({ top: 0, behavior:'smooth' });
    }
    
  return (
    <div>
        <button className='fixed right-5 bottom-5 text-3xl text-cyan-600 animate-bounce' onClick={goUp} ><FaArrowAltCircleUp /></button>
    </div>
  )
}

export default GoUp