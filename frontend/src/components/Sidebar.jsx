import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    FaHome,
    FaFileInvoice,
    FaHistory,
    FaChartBar,
    FaExclamationTriangle,
    FaCog,
    FaSignOutAlt,
    FaChevronLeft,
    FaChevronRight,
    FaMoneyBillWave,
    FaChartLine,
    FaUsersCog,
    FaFileContract,
    FaBell,
    FaShieldAlt,
    FaRobot,
    FaClipboardList,
    FaRegFileAlt,
    FaCloudUploadAlt
} from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
// import { useAuth } from '../context/AuthContext';

const Sidebar = ({ isCollapsed, onToggle }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { t } = useTranslation();
    // const { logout } = useAuth();
    const [activeSection, setActiveSection] = useState('');

    const menuItems = [
        {
            title: 'Main',
            items: [
                {
                    path: '/dashboard',
                    name: 'Dashboard',
                    icon: FaHome
                },
                {
                    path: '/invoices/upload',
                    name: 'Upload Invoices',
                    icon: FaCloudUploadAlt
                },
                {
                    path: '/transactions/new',
                    name: 'New Transaction',
                    icon: FaMoneyBillWave
                }
            ]
        },
        {
            title: 'History',
            items: [
                {
                    path: '/history',
                    name: 'History',
                    icon: FaRegFileAlt
                },

            ]
        },
        {
            title: 'Analytics',
            items: [
                {
                    path: '/analytics/financial',
                    name: 'Financial Analytics',
                    icon: FaChartBar
                },
                {
                    path: '/analytics/trends',
                    name: 'Trend Analysis',
                    icon: FaChartLine
                },
                {
                    path: '/analytics/ai-insights',
                    name: 'AI Insights',
                    icon: FaRobot
                }
            ]
        },
        {
            title: 'Management',
            items: [
                {
                    path: '/contracts',
                    name: 'Contract Management',
                    icon: FaFileContract
                },
                {
                    path: '/users',
                    name: 'User Management',
                    icon: FaUsersCog
                },
                {
                    path: '/notifications',
                    name: 'Notifications',
                    icon: FaBell
                },
                {
                    path: '/security',
                    name: 'Security Settings',
                    icon: FaShieldAlt
                },
                {
                    path: '/history',
                    name: 'History',
                    icon: FaHistory
                }
            ]
        }
    ];

    const handleMouseEnter = (title) => {
        setActiveSection(title);
    };

    const handleMouseLeave = () => {
        setActiveSection('');
    };

    const handleItemClick = (path) => {
        navigate(path);
        handleMouseLeave();
    };

    return (
        <div className={`fixed left-0 top-0 h-screen bg-gradient-to-b from-blue-600 to-blue-800 
            transition-all duration-300 ease-in-out z-50 flex flex-col
            ${isCollapsed ? 'w-20' : 'w-64'}`}>

            {/* Header Section */}
            <div className="flex-none p-4">
                <div className="flex items-center justify-between mb-6">
                    {!isCollapsed && (
                        <h1 className="text-xl font-bold text-white">Smart Invoice</h1>
                    )}
                    <button
                        onClick={onToggle}
                        className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                    >
                        {isCollapsed ? <FaChevronRight className="text-white" /> :
                            <FaChevronLeft className="text-white" />}
                    </button>
                </div>
            </div>

            {/* Scrollable Navigation Menu */}
            <nav className="flex-1 overflow-y-auto px-4 pb-4 custom-scrollbar">
                {menuItems.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="mb-6">
                        {!isCollapsed && (
                            <h2 className="text-xs font-semibold text-blue-100 uppercase tracking-wider mb-2 px-3">
                                {section.title}
                            </h2>
                        )}
                        <div className="space-y-1">
                            {section.items.map((item) => {
                                const isActive = location.pathname === item.path;
                                const Icon = item.icon;

                                return (
                                    <div
                                        key={item.path}
                                        onClick={() => handleItemClick(item.path)}
                                        onMouseEnter={() => handleMouseEnter(item.name)}
                                        onMouseLeave={handleMouseLeave}
                                        className={`flex items-center p-3 rounded-xl transition-all duration-200 
                                            group relative cursor-pointer
                                            ${isActive
                                                ? 'bg-white bg-opacity-20 text-white shadow-lg'
                                                : 'text-white hover:bg-white hover:bg-opacity-10'
                                            }`}
                                    >
                                        <Icon className={`text-xl ${isActive ? 'text-blue-200' :
                                            'text-white group-hover:text-blue-200'}`} />

                                        {!isCollapsed && (
                                            <span className="ml-3 font-medium">{item.name}</span>
                                        )}

                                        {/* Tooltip */}
                                        {isCollapsed && (
                                            <div
                                                className={`absolute left-full ml-2 px-3 py-2 bg-white 
                                                    rounded-lg shadow-lg transition-opacity duration-200 
                                                    whitespace-nowrap z-50
                                                    ${activeSection === item.name ? 'opacity-100' :
                                                        'opacity-0 pointer-events-none'}`}
                                            >
                                                <p className="font-medium text-gray-800">{item.name}</p>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </nav>

            {/* Settings and Logout Section */}
            <div className="flex-none px-4 pb-4">
                <div className="space-y-2">
                    <div
                        onClick={() => handleItemClick('/settings')}
                        className="flex items-center p-3 rounded-xl text-white hover:bg-white hover:bg-opacity-10 transition-colors cursor-pointer"
                    >
                        <FaCog className="text-xl" />
                        {!isCollapsed && <span className="ml-3 font-medium">Settings</span>}
                    </div>
                    <div
                        onClick={() => handleItemClick('/logout')}
                        className="flex items-center p-3 rounded-xl text-white hover:bg-white hover:bg-opacity-10 transition-colors cursor-pointer"
                    >
                        <FaSignOutAlt className="text-xl" />
                        {!isCollapsed && <span className="ml-3 font-medium">Logout</span>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;