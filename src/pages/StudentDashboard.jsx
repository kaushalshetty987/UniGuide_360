import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import RoadmapTimeline from '../components/student/RoadmapTimeline';
import DocumentUpload from '../components/student/DocumentUpload';
import { BookOpen, Upload, CreditCard, Calendar } from 'lucide-react';

const StudentDashboard = () => {
    const { studentData } = useApp();
    const navigate = useNavigate();

    return (
        <div className="space-y-8 pb-10">
            {/* Header Section */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome, {studentData.name.split(' ')[0]}! 👋</h1>
                    <p className="text-gray-500 dark:text-gray-400">You are <span className="text-green-600 font-semibold">{studentData.progress}%</span> through your onboarding.</p>
                </div>
                {/* Stats Widget */}
                <div className="hidden md:flex gap-6">
                    <div className="text-right border-r border-gray-200 dark:border-gray-700 pr-6">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Days Remaining</p>
                        <p className="text-xl font-bold text-gray-900 dark:text-white">43 Days</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Next Deadline</p>
                        <p className="text-xl font-bold text-red-500 dark:text-red-400">28 Feb</p>
                    </div>
                </div>
            </header>

            {/* Roadmap Section */}
            <RoadmapTimeline stages={studentData.roadmap} />

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <QuickActionCard
                    icon={Upload}
                    title="Upload Documents"
                    subtitle="2 Pending"
                    color="blue"
                    onClick={() => navigate('/student/documents')}
                />
                <QuickActionCard
                    icon={CreditCard}
                    title="Pay Fees"
                    subtitle="Due in 3 days"
                    color="orange"
                    onClick={() => navigate('/student/fees')}
                    alert
                />
                <QuickActionCard
                    icon={BookOpen}
                    title="Course Reg"
                    subtitle="Opens 1st Mar"
                    color="gray"
                    onClick={() => navigate('/student/courses')}
                />
                <QuickActionCard
                    icon={Calendar}
                    title="My Timetable"
                    subtitle="View Schedule"
                    color="purple"
                    onClick={() => navigate('/student/timetable')}
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                {/* Left Column - Main Tasks */}
                <div className="lg:col-span-2 space-y-6">
                    <DocumentUpload />

                    {/* Fee Payment Teaser */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-bold">Fee Payment Status</h2>
                            <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 px-3 py-1 rounded-full text-xs font-bold">Pending</span>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 flex flex-col md:flex-row justify-between items-center gap-4">
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Next Installment Due</p>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">₹50,000</h3>
                                <p className="text-xs text-red-500 dark:text-red-400 mt-1">Due Date: 28 Feb 2026</p>
                            </div>
                            <button
                                onClick={() => navigate('/student/fees')}
                                className="w-full md:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-lg shadow-blue-200 dark:shadow-none"
                            >
                                Pay Now
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Column - Sidebar Widgets */}
                <div className="space-y-6">
                    {/* Notifications Widget */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-bold">Notifications</h2>
                            <button className="text-blue-600 dark:text-blue-400 text-xs font-semibold">Mark All Read</button>
                        </div>
                        <div className="space-y-3">
                            {studentData.notifications.map(notif => (
                                <div key={notif.id} className={`p-3 rounded-lg border-l-4 ${notif.read ? 'bg-gray-50 dark:bg-gray-700/50 border-gray-300 dark:border-gray-600' : 'bg-blue-50 dark:bg-blue-900/20 border-blue-500'}`}>
                                    <h4 className={`font-semibold text-sm ${notif.read ? 'text-gray-600 dark:text-gray-400' : 'text-gray-900 dark:text-white'}`}>{notif.title}</h4>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{notif.message}</p>
                                    <span className="text-[10px] text-gray-400 dark:text-gray-500 mt-2 block">{notif.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Gamification Widget */}
                    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 rounded-2xl shadow-lg text-white">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-bold text-lg">Level 4</h3>
                                <p className="text-xs text-purple-200">Document Master</p>
                            </div>
                            <div className="bg-white/20 p-2 rounded-lg">
                                🏆
                            </div>
                        </div>
                        <div className="w-full bg-black/20 rounded-full h-2 mb-2">
                            <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                        <p className="text-xs text-purple-100 text-right">450 / 500 XP</p>

                        <div className="mt-4 pt-4 border-t border-white/20">
                            <p className="text-xs font-medium mb-2">Next Reward:</p>
                            <div className="flex items-center gap-2 text-sm">
                                <span className="bg-white/20 p-1 rounded">🎁</span>
                                <span>Priority Support Access</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const QuickActionCard = ({ icon: Icon, title, subtitle, color, onClick, alert, locked }) => {
    const colorClasses = {
        blue: 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
        orange: 'bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
        purple: 'bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
        gray: 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400',
    }

    return (
        <button
            onClick={onClick}
            disabled={locked}
            className={`
                flex items-center gap-4 p-4 rounded-xl border bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all text-left w-full
                ${locked ? 'opacity-60 cursor-not-allowed border-gray-100 dark:border-gray-700' : 'cursor-pointer border-gray-100 dark:border-gray-700'}
                ${alert ? 'ring-2 ring-orange-400 ring-offset-2 border-orange-200 dark:border-orange-900' : ''}
            `}
        >
            <div className={`p-3 rounded-lg ${colorClasses[color] || colorClasses.blue}`}>
                <Icon size={24} />
            </div>
            <div>
                <h3 className="font-bold text-gray-900 dark:text-white text-sm">{title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">{subtitle}</p>
            </div>
        </button>
    )
}

export default StudentDashboard;
