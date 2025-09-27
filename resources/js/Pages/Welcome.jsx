// Home.jsx
import React from "react";
import { motion } from "framer-motion";
import {
    LogIn,
    UserPlus,
    LayoutDashboard,
    BarChart3,
    TrendingUp,
    Shield,
    Package,
    ArrowRight,
    CheckCircle,
} from "lucide-react";
import { Head, Link, router } from "@inertiajs/react";

export default function Home() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
    };

    const featureCards = [
        {
            icon: <BarChart3 className="w-10 h-10" />,
            title: "Real-time Analytics",
            description: "Track inventory performance with live data and insights",
            color: "bg-blue-100 text-blue-600",
        },
        {
            icon: <TrendingUp className="w-10 h-10" />,
            title: "Smart Forecasting",
            description: "Predict demand and optimize stock levels automatically",
            color: "bg-green-100 text-green-600",
        },
        {
            icon: <Shield className="w-10 h-10" />,
            title: "Secure & Reliable",
            description: "Enterprise-grade security for your inventory data",
            color: "bg-red-100 text-red-600",
        },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-white text-gray-800">
            <Head title="Welcome"></Head>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full z-50 relative"
            >
                <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2">
                    <div className="p-2 bg-blue-600 rounded-lg">
                        <Package className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-2xl font-extrabold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-600">
                        InventoryPro
                    </h1>
                </motion.div>

                <nav className="flex items-center gap-4">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link
                            href="/login"
                            className="flex items-center gap-2 border border-blue-600 px-4 py-2 rounded-lg text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300"
                        >
                            <LogIn className="w-4 h-4" />
                            Login
                        </Link>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link
                            href="/register"
                            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all duration-300"
                        >
                            <UserPlus className="w-4 h-4" />
                            Register
                        </Link>
                    </motion.div>
                </nav>
            </motion.header>

            <section className="relative w-full h-[600px] flex items-center text-center">
            
                <img
                    src="images/dashboard.png"
                    alt="Stock Management"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/60 to-transparent"></div>

          
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="relative z-10 max-w-3xl px-6"
                >
                    <motion.h2
                        variants={itemVariants}
                        className="text-4xl md:text-6xl font-bold leading-tight"
                    >
                        Manage Your <span className="text-blue-600">Inventory</span> <br />
                        <span className="text-green-600">Smarter</span> &{" "}
                        <span className="text-red-600">Faster</span>
                    </motion.h2>

                    <motion.p
                        variants={itemVariants}
                        className="mt-6 text-lg text-gray-700"
                    >
                        An intelligent Inventory Management System to track, update, and
                        manage stock effortlessly with real-time updates and predictive analytics.
                    </motion.p>

                    <motion.div
                        variants={itemVariants}
                        className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-all duration-300 shadow-lg shadow-blue-200"
                            onClick={() => router.visit('/dashboard')}
                        >
                            <LayoutDashboard className="w-5 h-5" />
                            Go to Dashboard
                            <ArrowRight className="w-5 h-5" />
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 border border-green-600 text-green-600 px-6 py-3 rounded-lg font-bold hover:bg-green-600 hover:text-white transition-all duration-300"
                        >
                            Learn More
                        </motion.button>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className="mt-8 flex flex-wrap gap-6 justify-center"
                    >
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            <span className="text-sm">Real-time tracking</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            <span className="text-sm">Automated reports</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                            <span className="text-sm">Multi-warehouse</span>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Floating icons */}
                <motion.div
                    animate={{ y: [0, -12, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className="absolute top-1/3 right-3 bg-blue-100 p-4 rounded-full shadow-lg"
                >
                    <BarChart3 className="w-7 h-7 text-blue-600" />
                </motion.div>

                <motion.div
                    animate={{ y: [0, 12, 0] }}
                    transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                    className="absolute bottom-1/3 right-1/4 bg-green-100 p-4 rounded-full shadow-lg"
                >
                    <TrendingUp className="w-7 h-7 text-green-600" />
                </motion.div>
            </section>
            <motion.section
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mt-24 max-w-7xl mx-auto px-6"
            >
                <h3 className="text-3xl font-bold text-center mb-4">Powerful Features</h3>
                <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
                    Our inventory management system provides everything you need to optimize
                    your stock control and streamline your operations.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {featureCards.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -10 }}
                            className="p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
                        >
                            <div className={`p-3 rounded-lg w-fit ${feature.color} mb-4`}>
                                {feature.icon}
                            </div>
                            <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
                            <p className="text-gray-600">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* Footer */}
            <motion.footer
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="py-8 border-t border-gray-200 text-center text-sm bg-gray-50 mt-12"
            >
                <div className="max-w-7xl mx-auto px-6">
                    <p>© {new Date().getFullYear()} InventoryPro — Advanced Inventory Management System. All rights reserved.</p>
                </div>
            </motion.footer>
        </div>
    );
}
