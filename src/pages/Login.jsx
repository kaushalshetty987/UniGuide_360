import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { mockApi } from '../services/mockApi';
import { User, Shield, GraduationCap, Users, ArrowRight, Loader } from 'lucide-react';

const Login = () => {
    const { setUserRole } = useApp();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(null);

    const handleLogin = async (role) => {
        setLoading(role);
        try {
            const data = await mockApi.login(role);
            setUserRole(data.user.role);

            // Navigate based on role
            const paths = {
                student: '/student',
                parent: '/parent',
                teacher: '/teacher',
                admin: '/admin'
            };
            navigate(paths[role]);
        } catch (error) {
            console.error("Login failed", error);
            setLoading(null);
        }
    };

    const roles = [
        { id: 'student', label: 'Student', icon: User, desc: 'Access your coursework, grades, and schedule.', color: 'bg-blue-600' },
        { id: 'parent', label: 'Parent', icon: Users, desc: 'View your child\'s progress and make payments.', color: 'bg-green-600' },
        { id: 'teacher', label: 'Faculty', icon: GraduationCap, desc: 'Manage courses, attendance, and grading.', color: 'bg-purple-600' },
        { id: 'admin', label: 'Admin', icon: Shield, desc: 'System configuration and user management.', color: 'bg-red-600' }
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-4 transition-colors duration-300">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-4xl border border-gray-100 dark:border-gray-700">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">UniGuide 360</h1>
                    <p className="text-gray-500 dark:text-gray-400 text-lg">Select your portal to continue</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {roles.map((role) => (
                        <button
                            key={role.id}
                            onClick={() => handleLogin(role.id)}
                            disabled={loading !== null}
                            className={`relative group p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 text-left bg-gray-50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 hover:shadow-lg
                                ${loading && loading !== role.id ? 'opacity-50 cursor-not-allowed' : ''}
                            `}
                        >
                            <div className={`w-12 h-12 rounded-lg ${role.color} text-white flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform`}>
                                {loading === role.id ? <Loader className="animate-spin" /> : <role.icon size={24} />}
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {role.label}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 h-10">
                                {role.desc}
                            </p>
                            <div className="flex items-center text-sm font-semibold text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                                Login as {role.label} <ArrowRight size={16} className="ml-1" />
                            </div>
                        </button>
                    ))}
                </div>

                <div className="mt-12 text-center border-t border-gray-100 dark:border-gray-700 pt-6">
                    <p className="text-xs text-gray-400">
                        Secure Access • v1.2 Production Build • © 2026 UniGuide 360
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
