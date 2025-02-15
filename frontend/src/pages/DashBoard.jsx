import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  FaFileInvoice,
  FaChartLine,
  FaExclamationTriangle,
  FaMoneyBillWave,
  FaCloudUploadAlt,
  FaChartBar
} from 'react-icons/fa';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalInvoices: 0,
    pendingInvoices: 0,
    totalAmount: 0,
    anomaliesDetected: 0
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch dashboard stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('authToken');
        // Simulated data - replace with actual API call
        setStats({
          totalInvoices: 156,
          pendingInvoices: 23,
          totalAmount: 45678.90,
          anomaliesDetected: 3
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const quickActions = [
    {
      title: 'Upload Invoices',
      icon: FaCloudUploadAlt,
      path: '/invoices/upload',
      color: 'bg-blue-500'
    },
    {
      title: 'Create Invoice',
      icon: FaFileInvoice,
      path: '/invoices/create',
      color: 'bg-green-500'
    },
    {
      title: 'New Transaction',
      icon: FaMoneyBillWave,
      path: '/transactions/new',
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-2">Overview of your invoice management system</p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Invoices</p>
                  <h3 className="text-2xl font-bold text-gray-800 mt-1">{stats.totalInvoices}</h3>
                </div>
                <FaFileInvoice className="text-blue-500 text-3xl" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Pending Invoices</p>
                  <h3 className="text-2xl font-bold text-gray-800 mt-1">{stats.pendingInvoices}</h3>
                </div>
                <FaChartBar className="text-orange-500 text-3xl" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Amount</p>
                  <h3 className="text-2xl font-bold text-gray-800 mt-1">
                    ${stats.totalAmount.toLocaleString()}
                  </h3>
                </div>
                <FaMoneyBillWave className="text-green-500 text-3xl" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Anomalies Detected</p>
                  <h3 className="text-2xl font-bold text-gray-800 mt-1">{stats.anomaliesDetected}</h3>
                </div>
                <FaExclamationTriangle className="text-red-500 text-3xl" />
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {quickActions.map((action, index) => (
                <div
                  key={index}
                  onClick={() => navigate(action.path)}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer overflow-hidden"
                >
                  <div className={`${action.color} p-4`}>
                    <action.icon className="text-white text-2xl" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800">{action.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">Click to proceed →</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FaFileInvoice className="text-blue-500" />
                    <div>
                      <p className="font-medium text-gray-800">New Invoice Created</p>
                      <p className="text-sm text-gray-500">Invoice #INV-2024-001</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">2 minutes ago</span>
                </div>
              </div>
              {/* Add more activity items as needed */}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
