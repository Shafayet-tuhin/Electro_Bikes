import React, { useState, useEffect, useContext } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { AuthContext } from '../../Context/AuthProvider';
import { MdFileDownloadDone } from 'react-icons/md';

const AllPayments = () => {
    const { admin } = useContext(AuthContext);
    const [paymentInfo, setPaymentInfo] = useState([]);

    useEffect(() => {
        // Fetch the payment data from API
        fetch('https://ebikes-ten.vercel.app/payment/allpayment', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${admin.token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => setPaymentInfo(data))
            .catch((err) => console.error(err));
    }, [admin.token]);

    // Group payments by date and calculate total revenue
    const revenueOverTime = paymentInfo.reduce((acc, payment) => {
        const date = new Date(payment.timestamp).toLocaleDateString(); // Extract date (without time)
        acc[date] = (acc[date] || 0) + payment.amount;
        return acc;
    }, {});

    const cumulativeRevenue = Object.keys(revenueOverTime).reduce(
        (acc, date) => {
            const previousTotal = acc.length > 0 ? acc[acc.length - 1].y : 0;
            acc.push({ x: new Date(date).getTime(), y: previousTotal + revenueOverTime[date] });
            return acc;
        },
        []
    );

    // Highcharts configuration for users and payments
    const userPaymentChartOptions = {
        chart: {
            type: 'area',
        },
        title: {
            text: 'Users and Total Payments',
        },
        xAxis: {
            categories: paymentInfo.map((payment) => payment.email),
            title: {
                text: 'User Email',
            },
        },
        yAxis: {
            title: {
                text: 'Total Payment ($)',
            },
        },
        series: [
            {
                name: 'Amount Paid',
                data: paymentInfo.map((payment) => payment.amount),
            },
        ],
        credits: {
            enabled: false,
        },
    };

    // Highcharts configuration for revenue over time
    const revenueChartOptions = {
        chart: {
            type: 'bar',
        },
        title: {
            text: 'Total Revenue Over Time',
        },
        xAxis: {
            type: 'datetime',
            title: {
                text: 'Date',
            },
        },
        yAxis: {
            title: {
                text: 'Cumulative Revenue ($)',
            },
        },
        series: [
            {
                name: 'Cumulative Revenue',
                data: cumulativeRevenue,
            },
        ],
        credits: {
            enabled: false,
        },
    };

    return (
        <div className="container mx-auto p-4">

            {/* Highcharts Area Chart for Users and Payments */}
            <div className="my-8">
                <HighchartsReact highcharts={Highcharts} options={userPaymentChartOptions} />
            </div>

            {/* Highcharts Area Chart for Total Revenue Over Time */}
            <div className="my-8">
                <HighchartsReact highcharts={Highcharts} options={revenueChartOptions} />
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold mb-4">Total Transactions Done: {paymentInfo.length}</h2>

            {/* Payment Table */}
            <div className="overflow-x-auto mb-8">
                <table className="table">
                    {/* head */}
                    <thead className='text-xl bg-sky-800 text-white'>
                        <tr>
                            <th>#</th>
                            <th>Item Names</th>
                            <th>User Name</th>
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
                                        <td>{payment.email}</td>
                                        <td>${payment.amount}</td>
                                        <td>{payment.orderStatus}</td>
                                        <td><MdFileDownloadDone className='text-green-500 text-3xl mx-auto' /></td>
                                        <td>{new Date(payment.timestamp).toLocaleString()}</td>
                                    </tr>

                                    {/* Horizontal separator */}
                                    <tr>
                                        <td colSpan="7">
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

export default AllPayments;
