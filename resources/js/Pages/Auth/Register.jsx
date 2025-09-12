import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [roles, setRoles] = useState([]);

    useEffect(() => {
        axios.get('/api/roles').then((res) => {
            const data = res.data;
            setRoles(data);
        })
    }, [])

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Head title="Register" />
            <div className="min-h-screen flex flex-col lg:flex-row bg-white">
                {/* Left Side - Marketing Content */}
                <div className="flex-1 bg-gray-100 diagonal-split-left flex items-center justify-center p-10 text-center lg:text-left order-1 lg:order-1 relative">
                    <div className="max-w-lg z-10">
                        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                            <span className="text-red-600">Join</span> Our <span className="text-blue-600">Inventory</span> System
                        </h1>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Streamline Your Operations</h2>
                        <p className="text-lg mb-8 text-gray-700">
                            Create an account to access our powerful inventory management tools, real-time tracking, and comprehensive analytics.
                        </p>
                        
                        <div className="mb-8 space-y-4">
                            <div className="flex items-center">
                                <div className="bg-blue-100 p-2 rounded-full mr-3">
                                    <i className="fas fa-boxes text-blue-600"></i>
                                </div>
                                <span className="text-lg text-gray-800">Track inventory in real-time</span>
                            </div>
                            <div className="flex items-center">
                                <div className="bg-red-100 p-2 rounded-full mr-3">
                                    <i className="fas fa-chart-bar text-red-600"></i>
                                </div>
                                <span className="text-lg text-gray-800">Generate detailed reports</span>
                            </div>
                            <div className="flex items-center">
                                <div className="bg-blue-100 p-2 rounded-full mr-3">
                                    <i className="fas fa-warehouse text-blue-600"></i>
                                </div>
                                <span className="text-lg text-gray-800">Manage multiple locations</span>
                            </div>
                        </div>
                        
                        <div className="text-sm text-gray-600">
                            Already have an account? 
                            <Link href={route('login')} className="font-medium text-blue-600 hover:text-blue-800 ml-1">
                                Sign in here
                            </Link>
                        </div>
                    </div>
                    
                    {/* Decorative elements */}
                    <div className="absolute top-10 left-10 opacity-10">
                        <i className="fas fa-cubes text-8xl text-blue-600"></i>
                    </div>
                    <div className="absolute bottom-10 right-10 opacity-10">
                        <i className="fas fa-chart-line text-8xl text-red-600"></i>
                    </div>
                </div>

                {/* Right Side - Registration Form */}
                <div className="flex-1 flex items-center justify-center px-6 py-12 sm:px-10 order-2 lg:order-2">
                    <div className="w-full max-w-md">
                        <div className="text-center mb-6">
                            <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
                            <p className="text-gray-600 mt-2">Join thousands of businesses managing their inventory efficiently</p>
                        </div>

                        <form onSubmit={submit} className="bg-white shadow-xl rounded-2xl p-8 space-y-6">
                            <div>
                                <InputLabel htmlFor="name" value="Full Name" />
                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                                    autoComplete="name"
                                    isFocused={true}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel htmlFor="email" value="Email" />
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                                    autoComplete="email"
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
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
                                    autoComplete="new-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                />
                                <InputError message={errors.password} className="mt-2" />
                            </div>

                            <div>
                                <InputLabel
                                    htmlFor="password_confirmation"
                                    value="Confirm Password"
                                />
                                <TextInput
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="mt-1 block w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg"
                                    autoComplete="new-password"
                                    onChange={(e) =>
                                        setData('password_confirmation', e.target.value)
                                    }
                                    required
                                />
                                <InputError
                                    message={errors.password_confirmation}
                                    className="mt-2"
                                />
                            </div>

                            <div className="flex items-center justify-between mt-6">
                                <Link
                                    href={route('login')}
                                    className="text-sm text-blue-600 hover:text-blue-800 underline"
                                >
                                    Already registered?
                                </Link>

                                <PrimaryButton 
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg shadow-md transition duration-300"
                                    disabled={processing}
                                >
                                    Register
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <style>
                {`
                    .diagonal-split-left {
                        clip-path: polygon(0 0, 100% 0, 70% 100%, 0% 100%);
                    }
                    @media (max-width: 1024px) {
                        .diagonal-split-left {
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