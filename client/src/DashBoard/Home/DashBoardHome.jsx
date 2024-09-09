import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthProvider';
import { FaUserTie } from 'react-icons/fa6';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';


const DashBoardHome = () => {
  const [usersData, setUsersData] = useState([]);

  const { user, admin, BikeData } = useContext(AuthContext);

  useEffect(() => {
    fetch('http://localhost:3000/users')
      .then(res => res.json())
      .then(data => setUsersData(data));

  }, []);

  // Calculate role counts for the pie chart
  const roleCounts = usersData.reduce(
    (acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    },
    { user: 0, admin: 0 }
  );

  // Calculate bike category counts for the bar chart
  const categoryCounts = BikeData.reduce((acc, bike) => {
    acc[bike.category] = (acc[bike.category] || 0) + 1;
    return acc;
  }, {});

  // Prepare data for Highcharts (Bike Categories)
  const bikeChartOptions = {
    chart: {
      type: 'area',
    },
    title: {
      text: 'Bike Categories',
    },
    xAxis: {
      categories: Object.keys(categoryCounts),
      title: {
        text: 'Categories',
      },
    },
    yAxis: {
      title: {
        text: 'Number of Bikes',
      },
    },
    series: [
      {
        name: 'Bike Count',
        data: Object.values(categoryCounts),
      },
    ],
  };

  // Prepare data for Highcharts (User Roles)
  const userChartOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'User Roles Distribution',
    },
    series: [
      {
        name: 'Roles',
        data: [
          ['Admins', roleCounts.admin],
          ['Users', roleCounts.user],
        ],
        colorByPoint: true,
      },
    ],
    plotOptions: {
      pie: {
        dataLabels: {
          enabled: true,
          format: '{point.name}: {point.y}',
        },
      },
    },
  };

  return (
    <div>
      <div className="flex flex-col items-center gap-4 mt-8">
        <p className="text-[#D99904] italic text-xl font-normal">
          ---Dashboard Home Page---
        </p>
        <hr className="w-[22rem]" />
        <p className="text-[#151515] font-normal text-[2.5rem] font-abc">
          Welcome Back, {user.displayName}
        </p>
      </div>

      <div className="flex justify-center mt-8">
        <div className="bg-slate-200 px-14 py-5 flex flex-col items-center gap-3 rounded-3xl">
          {user.photoURL ? (
            <img className="w-[10rem] rounded-full border-4 p-1 border-sky-300" src={user.photoURL} alt="" />
          ) : (
            <FaUserTie className="text-[7rem]" />
          )}

          <div className="flex justify-between text-xl gap-4 items-center">
            <p>{user.displayName}</p>
            <p className="bg-cyan-700 animate-pulse text-white rounded-xl px-2 py-1">
              {admin ? 'Admin' : 'User'}
            </p>
          </div>
          <p className="text-lg ">{user.email}</p>
        </div>
      </div>

      <div className='flex flex-col lg:flex-row mt-4'>
        <div className="mt-8">
          <HighchartsReact
            highcharts={Highcharts}
            options={userChartOptions}
          />
        </div>

        <div className="mt-8">
          <HighchartsReact
            highcharts={Highcharts}
            options={bikeChartOptions}
          />
        </div>
      </div>
    </div>
  );
};

export default DashBoardHome;
