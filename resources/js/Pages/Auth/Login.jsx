import { useState } from 'react';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, router, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Log in" />
            <div className="min-h-screen flex flex-col lg:flex-row bg-white">
                {/* Left Side - Login Form */}
                <div className="flex-1 flex items-center justify-center px-6 py-12 sm:px-10 order-2 lg:order-1">
                    <div className="w-full max-w-md">
                        {status && (
                            <div className="mb-4 text-sm font-medium text-green-600">
                                {status}
                            </div>
                        )}

                        <div className="text-center mb-6">
                            <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
                            <p className="text-gray-600 mt-2">Sign in to access your inventory dashboard</p>
                        </div>

                        <form onSubmit={submit} className="bg-white shadow-xl rounded-2xl p-8 space-y-6">
                            <div>
                                <InputLabel htmlFor="email" value="Email" />
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                                <InputError message={errors.email} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="password" value="Password" />
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-lg"
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                <InputError message={errors.password} className="mt-2" />
                            </div>

                            <div className="flex items-center">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                />
                                <span className="ms-2 text-sm text-gray-600">Remember me</span>
                            </div>

                            <div className="flex items-center justify-between">
                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="text-sm text-blue-600 hover:text-blue-800 underline"
                                    >
                                        Forgot your password?
                                    </Link>
                                )}
                                <PrimaryButton
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg shadow-md transition duration-300"
                                    disabled={processing}
                                >
                                    Log in
                                </PrimaryButton>
                            </div>
                        </form>

                        <div className="text-center text-sm text-gray-600 mt-6">
                            Don't have an account? 
                            <Link href={route('register')} className="font-medium text-red-600 hover:text-red-800 ml-1">
                                Register now
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Right Side - Marketing Content */}
                <div className="flex-1 bg-gray-100 diagonal-split-right flex items-center justify-end p-10 text-center lg:text-left order-1 lg:order-2 relative">
                    <div className="max-w-lg z-10">
                        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                            <span className="text-red-600">Manage</span> Your <span className="text-blue-600">Inventory</span>
                        </h1>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Smarter & Faster</h2>
                        <p className="text-lg mb-8 text-gray-700">
                            An intelligent Inventory Management System to track, update, and manage stock effortlessly with real-time updates and predictive analytics.
                        </p>
                        
                        <button className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 flex items-center justify-center lg:justify-start mx-auto lg:mx-0" onClick={() => router.visit('/dashboard')}>
                            Go to Dashboard <i className="fas fa-arrow-right ml-2"></i>
                        </button>
                    </div>
                    
                    {/* Decorative elements */}
                    <div className="absolute top-10 right-10 opacity-10">
                        <i className="fas fa-boxes-stacked text-8xl text-blue-600"></i>
                    </div>
                    <div className="absolute bottom-10 left-10 opacity-10">
                        <i className="fas fa-chart-pie text-8xl text-red-600"></i>
                    </div>
                </div>
            </div>

            <style>
                {`
                    .diagonal-split-right {
                        clip-path: polygon(0 0, 100% 0, 100% 100%, 30% 100%);
                    }
                    @media (max-width: 1024px) {
                        .diagonal-split-right {
                            clip-path: polygon(0 0, 100% 0, 100% 85%, 0% 100%);
                        }
                    }
                `}
            </style>
            
            {/* Add Font Awesome for icons */}
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        </>
    );
}