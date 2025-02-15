import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSuccess, signInFailure } from '../features/userSlice';
import axios from 'axios';
import { FaFileInvoiceDollar } from 'react-icons/fa';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loginLoading, loginError } = useSelector((state) => state.user);

    const handleLogin = async (e) => {
        e.preventDefault();
        dispatch(signInStart());
        try {
            const response = await axios.post('/api/users/login', { email, password });
            const { token, user } = response.data;
            localStorage.setItem('authToken', token);
            localStorage.setItem('user', JSON.stringify(user));
            dispatch(signInSuccess(user));
            navigate('/dashboard');
        } catch (err) {
            dispatch(signInFailure(err.response?.data?.message || 'Login failed'));
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left side - Image */}
            <div className="hidden lg:block lg:w-1/2 relative">
                <img
                    src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80"
                    alt="Financial analytics dashboard"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/50 to-transparent mix-blend-multiply" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <h2 className="text-4xl font-bold mb-4">Welcome Back</h2>
                    <p className="text-lg">Access your financial dashboard and manage your invoices efficiently.</p>
                </div>
            </div>

            {/* Right side - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-16 bg-white">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center">
                        <div className="flex justify-center mb-4">
                            <FaFileInvoiceDollar className="text-blue-600 text-4xl" />
                        </div>
                        <h2 className="text-3xl font-extrabold text-gray-900">
                            Welcome Back
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Sign in to Smart Invoice Manager
                        </p>
                    </div>

                    <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                        {loginError && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                                {loginError}
                            </div>
                        )}

                        <div className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Business Email
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="Enter your business email"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="Enter your password"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                                    Remember me
                                </label>
                            </div>
                            <div className="text-sm">
                                <Link to="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                                    Forgot your password?
                                </Link>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loginLoading}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                            >
                                {loginLoading ? 'Signing in...' : 'Sign in'}
                            </button>
                        </div>

                        <div className="text-center">
                            <p className="text-sm text-gray-600">
                                Don't have an account?{' '}
                                <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
                                    Start your free trial
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
