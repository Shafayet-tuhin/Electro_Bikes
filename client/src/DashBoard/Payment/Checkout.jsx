import React, { useContext, useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import './PaymentStyle.css'
import { AuthContext } from '../../Context/AuthProvider';

const CheckOut = ({ cart, price, refetch }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const { user } = useContext(AuthContext);
  const [transactionId, setTransactionId] = useState('');
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch('http://localhost:3000/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ price })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setClientSecret(data.clientSecret);
      });
  }, [price]);



  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true)

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card
    });

    if (error) {
      console.log(error);
      setCardError(error.message);
    } else {
      setCardError('');
      //   console.log(paymentMethod);
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: user.displayName,
          email: user.email
        },
      }
    });

    if (confirmError) {
      console.log("Error in Payment");
    } else {
      console.log(paymentIntent);

      if (paymentIntent.status === 'succeeded') {
        setLoading(false)

        Swal.fire({
          title: "Payment Done Successfully",
          icon: "success",
        });

        setTransactionId(paymentIntent.id)

        const paymentInfo = {
          email: user.email,
          amount: price,
          transactionId: paymentIntent.id,
          timestamp: new Date(),
          orderStatus: 'Pending',
          items: cart.map(item => item._id),
          itemName: cart.map(item => item.name),
          itemImage: cart.map(item => item.image)
        }

        fetch('http://localhost:3000/payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(paymentInfo)
        })
          .then((res) => res.json())
          .then((data) => {

            fetch(`http://localhost:3000/cart/paymentDone?email=${user.email}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json'  
              }
            })
              .then(res => res.json())
              .then(data => console.log(data) )
              .catch(err => console.log(err))

            console.log(data)
            refetch()
            navigate('/dashboard/history')
          })
      }

    }


  }

  return (
    <div className='w-2/3 mx-8'>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        {
          loading ?
            <span className="loading loading-bars loading-lg"></span>
            :
            <button type="submit" className="btn btn-neutral" disabled={!stripe || !clientSecret}>
              Pay
            </button>
        }
      </form>
      {cardError && <p>{cardError}</p>}

      <div className="p-4 border border-gray-300 rounded-md bg-gray-100 mb-4 mt-8">
        <h3 className="text-lg font-semibold mb-2">Demo Card for Testing Purposes:</h3>
        <ul className="list-none">
          <li>
            <span className="font-bold">Card Numbers:</span>
            <ul className="pl-4 mt-1">
              <li className="font-mono text-green-600 text-lg">4242 4242 4242 4242</li>
              <li className="font-mono text-green-600 text-lg">5555 5555 5555 4444</li>
              <li className="font-mono text-green-600 text-lg">3782 822463 10005</li>
            </ul>
          </li>
          <li className="mt-2"><span className="font-bold">CVC:</span> <span className="font-mono text-green-600 text-lg">Any 3 digits</span></li>
          <li className="mt-2"><span className="font-bold">Date:</span> <span className="font-mono text-green-600 text-lg">Any future date</span></li>
          <li className="mt-2"><span className="font-bold">Zip:</span> <span className="font-mono text-green-600 text-lg">Any 5 digits</span></li>
        </ul>
      </div>

    </div>
  );
}

export default CheckOut;