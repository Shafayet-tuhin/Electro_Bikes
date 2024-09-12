import React, { useContext } from 'react';
import { MdFileDownloadDone } from "react-icons/md";
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../Context/AuthProvider';

const PaymentHistory = () => {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem('token');

  const { data: paymentInfo = [] } = useQuery({
    queryKey: ['payment', user.email],
    queryFn: async () => {
      const res = await fetch(`https://ebikes-ten.vercel.app/payment?email=${user.email}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return res.json();
    }
  });

  return (
    <div className='w-full'>
      <h2 className='text-2xl font-bold mb-4'>Total Transactions Done: {paymentInfo.length}</h2>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className='text-xl bg-sky-800 text-white'>
            <tr>
              <th>#</th>
              <th>Item Names</th>
              <th>Amount</th>
              <th>Order Status</th>
              <th>Payment Status</th>
              <th>Date & Time</th>
            </tr>
          </thead>
          <tbody className='bg-gray-100 text-black font-abc text-lg'>
            {
              paymentInfo.map((payment, index) => (
                <React.Fragment key={payment._id}>
                  <tr>
                    <td>{index + 1}</td>
                    <td>
                      <ul className='flex flex-col gap-4 mr-10 lg:mr-0'>
                        {payment.itemName.map((name, i) => (
                          <li key={i} className="flex gap-3 items-center ">
                            <img src={payment.itemImage[i]} className='w-12' alt="" />
                            <span>{name}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td>${payment.amount}</td>
                    <td>{payment.orderStatus}</td>
                    <td><MdFileDownloadDone className='text-green-500 text-3xl mx-auto' /></td>
                    <td>{new Date(payment.timestamp).toLocaleString()}</td>
                  </tr>

                  {/* Horizontal separator */}
                  <tr>
                    <td colSpan="6">
                      <hr className="border-gray-300" />
                    </td>
                  </tr>
                </React.Fragment>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
