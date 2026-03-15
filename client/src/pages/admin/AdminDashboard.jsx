import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from '../../context/AuthContext';

const AdminDashboard = () => {
  const { user } = useAuth();

  const url = import.meta.env.VITE_BACKEND_URL;

  const [totalCount, setTotalCount] = useState({
    totalContacts: 0,
    totalVehicle: 0,
    totalBookings: 0,
  });

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const getUrl = url + "/dashboard/count";
        const res = await axios.get(getUrl);
        if (res.data.status) {
          setTotalCount(res.data.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchCount();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
          <h2 className="text-gray-500 text-sm font-medium uppercase">Total Contacts</h2>
          <p className="text-2xl font-bold text-gray-800 mt-2">{totalCount.totalContacts}</p>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
          <h2 className="text-gray-500 text-sm font-medium uppercase">Total Vehicles</h2>
          <p className="text-2xl font-bold text-gray-800 mt-2">{totalCount.totalVehicle}</p>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-6 rounded-lg shadow border-l-4 border-yellow-500">
          <h2 className="text-gray-500 text-sm font-medium uppercase">Total Booking</h2>
          <p className="text-2xl font-bold text-gray-800 mt-2">{totalCount.totalBookings}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Welcome, Admin {user?.name}</h2>
        <p className="text-gray-600">
          This is your control center. Use the sidebar to navigate to user management or settings.
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;