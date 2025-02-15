import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { registerStart, registerSuccess, registerFailure } from '../features/userSlice';
import axios from 'axios';
import { FaUser, FaBuilding } from 'react-icons/fa';

const RegisterPage = () => {
    const [accountType, setAccountType] = useState('user'); // 'user' or 'company'
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        age: '',
        gender: '',
        // Additional company fields
        companyName: '',
        registrationNumber: '',
        industry: '',
        companySize: '',
        businessType: ''
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loginLoading, loginError } = useSelector((state) => state.user);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAccountTypeChange = (type) => {
        setAccountType(type);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            dispatch(registerFailure("Passwords do not match"));
            return;
        }

        dispatch(registerStart());
        try {
            const registrationData = {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                phoneNumber: formData.phoneNumber,
                accountType: accountType
            };

            // Add company details if registering as company
            if (accountType === 'company') {
                registrationData.companyDetails = {
                    companyName: formData.companyName,
                    registrationNumber: formData.registrationNumber,
                    industry: formData.industry,
                    companySize: formData.companySize,
                    businessType: formData.businessType
                };
            }

            const response = await axios.post('/api/users/register', registrationData);
            dispatch(registerSuccess(response.data));
            navigate('/login');
        } catch (err) {
            dispatch(registerFailure(err.response?.data?.message || 'Registration failed'));
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Right side - Image */}
            <div className="hidden lg:block lg:w-1/2 relative order-2">
                <img
                    src="https://images.unsplash.com/photo-1554224155-6d2f99c7716e?auto=format&fit=crop&q=80"
                    alt="Financial management and analytics"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-blue-600/50 to-blue-800/50 mix-blend-multiply" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <h2 className="text-4xl font-bold mb-4">Transform Your Financial Operations</h2>
                    <p className="text-lg">Join thousands of businesses automating their invoice processing and fraud detection.</p>
                </div>
            </div>

            {/* Left side - Registration Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-16 bg-white order-1">
                <div className="w-full max-w-md">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
                            Create Your Account
                        </h2>
                        <p className="text-sm text-gray-600">
                            Start managing your finances today
                        </p>
                    </div>

                    {/* Account Type Toggle */}
                    <div className="flex justify-center space-x-4 mb-8">
                        <button
                            type="button"
                            onClick={() => handleAccountTypeChange('user')}
                            className={`flex items-center px-6 py-3 rounded-lg transition-all duration-200 ${accountType === 'user'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            <FaUser className="mr-2" />
                            Individual
                        </button>
                        <button
                            type="button"
                            onClick={() => handleAccountTypeChange('company')}
                            className={`flex items-center px-6 py-3 rounded-lg transition-all duration-200 ${accountType === 'company'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                        >
                            <FaBuilding className="mr-2" />
                            Company
                        </button>
                    </div>

                    <form className="space-y-6" onSubmit={handleRegister}>
                        {loginError && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm">
                                {loginError}
                            </div>
                        )}

                        <div className="space-y-5">
                            {/* Basic Fields */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                    {accountType === 'company' ? 'Contact Person Name' : 'Full Name'}
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150"
                                    placeholder={accountType === 'company' ? "Enter contact person's name" : "Enter your full name"}
                                />
                            </div>

                            {/* Age and Gender fields - Only show for individual users */}
                            {accountType === 'user' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                                            Age
                                        </label>
                                        <input
                                            id="age"
                                            name="age"
                                            type="number"
                                            min="18"
                                            max="120"
                                            value={formData.age}
                                            onChange={handleInputChange}
                                            className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150"
                                            placeholder="Enter your age"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                                            Gender
                                        </label>
                                        <select
                                            id="gender"
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleInputChange}
                                            className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150"
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                            <option value="prefer-not-to-say">Prefer not to say</option>
                                        </select>
                                    </div>
                                </div>
                            )}

                            {/* Company-specific fields */}
                            {accountType === 'company' && (
                                <>
                                    <div>
                                        <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                                            Company Name
                                        </label>
                                        <input
                                            id="companyName"
                                            name="companyName"
                                            type="text"
                                            required
                                            value={formData.companyName}
                                            onChange={handleInputChange}
                                            className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150"
                                            placeholder="Enter company name"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="registrationNumber" className="block text-sm font-medium text-gray-700 mb-1">
                                                Registration Number
                                            </label>
                                            <input
                                                id="registrationNumber"
                                                name="registrationNumber"
                                                type="text"
                                                value={formData.registrationNumber}
                                                onChange={handleInputChange}
                                                className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150"
                                                placeholder="Company registration number"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
                                                Industry
                                            </label>
                                            <select
                                                id="industry"
                                                name="industry"
                                                value={formData.industry}
                                                onChange={handleInputChange}
                                                className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150"
                                            >
                                                <option value="">Select Industry</option>
                                                <option value="technology">Technology</option>
                                                <option value="finance">Finance</option>
                                                <option value="healthcare">Healthcare</option>
                                                <option value="retail">Retail</option>
                                                <option value="manufacturing">Manufacturing</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="companySize" className="block text-sm font-medium text-gray-700 mb-1">
                                                Company Size
                                            </label>
                                            <select
                                                id="companySize"
                                                name="companySize"
                                                value={formData.companySize}
                                                onChange={handleInputChange}
                                                className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150"
                                            >
                                                <option value="">Select Size</option>
                                                <option value="1-10">1-10 employees</option>
                                                <option value="11-50">11-50 employees</option>
                                                <option value="51-200">51-200 employees</option>
                                                <option value="201-500">201-500 employees</option>
                                                <option value="501+">501+ employees</option>
                                            </select>
                                        </div>
                                    </div>
                                </>
                            )}

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Business Email
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150"
                                    placeholder="Enter your business email"
                                />
                            </div>

                            <div>
                                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">
                                    Business Phone
                                </label>
                                <input
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    type="tel"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150"
                                    placeholder="Enter your business phone"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150"
                                        placeholder="Create password"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                        Confirm Password
                                    </label>
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        required
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150"
                                        placeholder="Confirm password"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <button
                                type="submit"
                                disabled={loginLoading}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-150"
                            >
                                {loginLoading ? (
                                    <span className="flex items-center">
                                        Creating your account...
                                    </span>
                                ) : (
                                    'Start Free Trial'
                                )}
                            </button>
                        </div>

                        <div className="text-center mt-6">
                            <p className="text-sm text-gray-600">
                                Already using Smart Invoice Manager?{' '}
                                <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                                    Sign in to your account
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
