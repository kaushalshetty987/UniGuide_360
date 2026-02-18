import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { User, Shield, GraduationCap, Users, ArrowRight, Loader, LogIn, ChevronLeft, Mail, Lock, Sun, Moon } from 'lucide-react';

const Login = () => {
    const { loginWithGoogle, loginWithEmail, registerWithEmail } = useAuth();
    const { theme, toggleTheme } = useApp();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [selectedRole, setSelectedRole] = useState(null); // 'student', 'parent', 'teacher', 'admin'
    const [isLogin, setIsLogin] = useState(true);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: ''
    });

    const roles = [
        { id: 'student', label: 'Student', icon: User, desc: 'Access your coursework, grades, and schedule.', color: 'bg-blue-600' },
        { id: 'parent', label: 'Parent', icon: Users, desc: 'View your child\'s progress and make payments.', color: 'bg-green-600' },
        { id: 'teacher', label: 'Faculty', icon: GraduationCap, desc: 'Manage courses, attendance, and grading.', color: 'bg-purple-600' },
        { id: 'admin', label: 'Admin', icon: Shield, desc: 'System configuration and user management.', color: 'bg-red-600' }
    ];

    const currentRole = roles.find(r => r.id === selectedRole);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        setError('');
        try {
            await loginWithGoogle(selectedRole);
            // After successful login, AuthContext updates state, Layout redirects
            navigate(`/${selectedRole}`);
        } catch (err) {
            console.error(err);
            setError(err.message || 'Failed to sign in with Google');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (isLogin) {
                await loginWithEmail(formData.email, formData.password, selectedRole);
            } else {
                await registerWithEmail(formData.email, formData.password, formData.name, selectedRole);
            }
            navigate(`/${selectedRole}`);
        } catch (err) {
            console.error(err);
            setError(err.message.replace('Firebase:', '').replace('auth/', ''));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center p-4 transition-colors duration-300">
            {/* Dark/Light Mode Toggle — top right */}
            <button
                onClick={toggleTheme}
                className="fixed top-5 right-5 z-50 p-3 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all hover:scale-110"
                title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
                {theme === 'dark'
                    ? <Sun size={20} className="text-yellow-500" />
                    : <Moon size={20} className="text-gray-600" />
                }
            </button>

            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-4xl border border-gray-100 dark:border-gray-700">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">UniGuide 360</h1>
                    {selectedRole ? (
                        <div className="flex items-center justify-center gap-2 text-gray-500 dark:text-gray-400">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold text-white uppercase ${currentRole.color}`}>
                                {currentRole.label} Portal
                            </span>
                        </div>
                    ) : (
                        <p className="text-gray-500 dark:text-gray-400 text-lg">Select your portal to continue</p>
                    )}
                </div>

                {!selectedRole ? (
                    // ROLE SELECTION VIEW
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {roles.map((role) => (
                            <button
                                key={role.id}
                                onClick={() => setSelectedRole(role.id)}
                                className="relative group p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 text-left bg-gray-50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 hover:shadow-lg"
                            >
                                <div className={`w-12 h-12 rounded-lg ${role.color} text-white flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform`}>
                                    <role.icon size={24} />
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
                ) : (
                    // LOGIN FORM VIEW
                    <div className="max-w-md mx-auto">
                        <button
                            onClick={() => { setSelectedRole(null); setError(''); }}
                            className="flex items-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 mb-6 transition-colors"
                        >
                            <ChevronLeft size={16} /> Back to roles
                        </button>

                        {error && (
                            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg mb-6 text-sm text-center border border-red-100 dark:border-red-900/30">
                                {error}
                            </div>
                        )}

                        <div className="space-y-4">
                            <button
                                onClick={handleGoogleLogin}
                                disabled={loading}
                                className="w-full flex items-center justify-center gap-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors text-gray-700 dark:text-white font-medium shadow-sm"
                            >
                                {loading ? <Loader size={20} className="animate-spin" /> : (
                                    <>
                                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                            <path fill="#EA4335" d="M12 4.6c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 1.09 14.97 0 12 0 7.7 0 3.99 2.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                        </svg>
                                        <span>Sign in with Google</span>
                                    </>
                                )}
                            </button>

                            <div className="flex items-center gap-4 my-4">
                                <div className="h-px bg-gray-200 dark:bg-gray-700 flex-1"></div>
                                <span className="text-gray-400 text-xs uppercase font-bold">Or continue with email</span>
                                <div className="h-px bg-gray-200 dark:bg-gray-700 flex-1"></div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                {!isLogin && (
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Full Name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all dark:text-white"
                                        />
                                    </div>
                                )}
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email Address"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all dark:text-white"
                                    />
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        minLength={6}
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all dark:text-white"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full text-white p-3 rounded-xl font-bold shadow-lg transition-all flex items-center justify-center gap-2 ${currentRole.color} hover:opacity-90`}
                                >
                                    {loading ? <Loader size={20} className="animate-spin" /> : (
                                        <>
                                            {isLogin ? 'Login' : 'Create Account'}
                                            <ArrowRight size={18} />
                                        </>
                                    )}
                                </button>
                            </form>

                            <div className="mt-4 text-center">
                                <button
                                    onClick={() => setIsLogin(!isLogin)}
                                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
                                >
                                    {isLogin ? `Don't have an account? Sign up as ${currentRole.label}` : "Already have an account? Login"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

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
