import React, { useState } from 'react';
import {
    FaFileInvoice,
    FaHistory,
    FaClipboardList,
    FaExclamationTriangle,
    FaSearch,
    FaDownload,
    FaEye
} from 'react-icons/fa';
import { motion } from 'framer-motion';

const HistoryPage = () => {
    const [activeTab, setActiveTab] = useState('invoices');
    const [searchTerm, setSearchTerm] = useState('');

    const tabs = [
        { id: 'invoices', name: 'Invoice History', icon: FaFileInvoice },
        { id: 'transactions', name: 'Transaction History', icon: FaHistory },
        { id: 'reports', name: 'Report History', icon: FaClipboardList },
        { id: 'anomalies', name: 'Anomaly Detection', icon: FaExclamationTriangle }
    ];

    // Demo data for each tab
    const demoData = {
        invoices: [
            { id: 'INV-2024-001', date: '2024-02-15', client: 'Tech Corp', amount: 1500.00, status: 'Paid' },
            { id: 'INV-2024-002', date: '2024-02-14', client: 'Global Industries', amount: 2300.00, status: 'Pending' },
            { id: 'INV-2024-003', date: '2024-02-13', client: 'Smart Solutions', amount: 950.00, status: 'Overdue' }
        ],
        transactions: [
            { id: 'TRX-001', date: '2024-02-15', type: 'Payment Received', amount: 1500.00, reference: 'INV-2024-001' },
            { id: 'TRX-002', date: '2024-02-14', type: 'Refund Issued', amount: -300.00, reference: 'INV-2024-000' },
            { id: 'TRX-003', date: '2024-02-13', type: 'Payment Received', amount: 2150.00, reference: 'INV-2023-098' }
        ],
        reports: [
            { id: 'REP-001', date: '2024-02-15', type: 'Monthly Summary', period: 'February 2024', status: 'Generated' },
            { id: 'REP-002', date: '2024-02-01', type: 'Tax Report', period: 'Q4 2023', status: 'Generated' },
            { id: 'REP-003', date: '2024-01-31', type: 'Revenue Analysis', period: 'January 2024', status: 'Generated' }
        ],
        anomalies: [
            { id: 'ANM-001', date: '2024-02-15', type: 'Duplicate Invoice', reference: 'INV-2024-002', risk: 'High' },
            { id: 'ANM-002', date: '2024-02-14', type: 'Unusual Amount', reference: 'TRX-002', risk: 'Medium' },
            { id: 'ANM-003', date: '2024-02-13', type: 'Payment Mismatch', reference: 'INV-2024-001', risk: 'Low' }
        ]
    };

    const getStatusColor = (status) => {
        const colors = {
            'Paid': 'text-green-600 bg-green-50',
            'Pending': 'text-yellow-600 bg-yellow-50',
            'Overdue': 'text-red-600 bg-red-50',
            'Generated': 'text-blue-600 bg-blue-50',
            'High': 'text-red-600 bg-red-50',
            'Medium': 'text-yellow-600 bg-yellow-50',
            'Low': 'text-green-600 bg-green-50'
        };
        return colors[status] || 'text-gray-600 bg-gray-50';
    };

    return (
        <div className="p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">History</h1>
                <p className="text-gray-600 mt-2">View and manage your historical records</p>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search records..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <FaSearch className="absolute left-3 top-3 text-gray-400" />
                </div>
            </div>

            {/* Tabs */}
            <div className="mb-6 border-b border-gray-200">
                <div className="flex space-x-4">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center space-x-2 px-4 py-2 border-b-2 transition-colors
                                ${activeTab === tab.id
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                        >
                            <tab.icon className="text-lg" />
                            <span>{tab.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Content */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                {activeTab === 'invoices' && (
                                    <>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Client</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                    </>
                                )}
                                {activeTab === 'transactions' && (
                                    <>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Transaction ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reference</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                                    </>
                                )}
                                {/* Add headers for other tabs */}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {demoData[activeTab].map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.id}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
                                    {activeTab === 'invoices' && (
                                        <>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.client}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${item.amount.toLocaleString()}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <div className="flex space-x-3">
                                                    <button className="text-blue-600 hover:text-blue-800">
                                                        <FaEye />
                                                    </button>
                                                    <button className="text-green-600 hover:text-green-800">
                                                        <FaDownload />
                                                    </button>
                                                </div>
                                            </td>
                                        </>
                                    )}
                                    {/* Add similar conditions for other tabs */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
};

export default HistoryPage; 