import React, { useContext } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import useCart from '../../Hooks/useCart'
import banner from '../../assets/payment/payment.gif'
import banner2 from '../../assets/payment/payment2.gif'
import CheckOut from './Checkout'
import { AuthContext } from '../../Context/AuthProvider'
const stripePromise = loadStripe(`${import.meta.env.VITE_PAYMENT_TOKEN}`)

const Payment = () => {
  const [isPending, cart, refetch] = useCart()
  const {toBePaid} = useContext(AuthContext)
  let total = toBePaid
  const price = parseFloat(total.toFixed(2));
  console.log(total)
  return (
    <div className='flex flex-col items-center justify-center'>
      <img src={banner2} className='w-[100%] rounded-3xl' alt="" />
      <Elements stripe={stripePromise}>
        <CheckOut cart={cart} price={price} refetch={refetch} />
      </Elements>
    </div>
  )
}

export default Payment