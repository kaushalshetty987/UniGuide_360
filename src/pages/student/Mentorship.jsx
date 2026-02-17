import React from 'react';
import { User, Mail, Calendar, MessageSquare } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const Mentorship = () => {
    const { studentData } = useApp();

    // Mock Mentor Data
    const mentor = {
        name: "Dr. Sarah Johnson",
        department: "Computer Science",
        email: "sarah.j@university.edu",
        availability: "Mon, Wed, Fri (2PM - 4PM)",
        image: "https://randomuser.me/api/portraits/women/44.jpg"
    };

    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Mentorship Program</h1>
                <p className="text-gray-500 dark:text-gray-400">Connect with your assigned faculty mentor.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Mentor Profile Card */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-r from-blue-500 to-purple-500 mb-4">
                        <img
                            src={mentor.image}
                            alt={mentor.name}
                            className="w-full h-full rounded-full object-cover border-4 border-white dark:border-gray-800"
                        />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">{mentor.name}</h2>
                    <p className="text-blue-600 dark:text-blue-400 font-medium">{mentor.department}</p>

                    <div className="mt-6 space-y-3 w-full">
                        <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                            <Mail size={18} className="text-gray-400" />
                            <span>{mentor.email}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                            <Calendar size={18} className="text-gray-400" />
                            <span>{mentor.availability}</span>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-3 w-full">
                        <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-colors">
                            <MessageSquare size={18} /> Chat
                        </button>
                        <button className="flex items-center justify-center gap-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 py-2 rounded-lg font-medium transition-colors">
                            <Calendar size={18} /> Meeting
                        </button>
                    </div>
                </div>

                {/* Recent Activity / Notes */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Mentorship Notes</h3>
                        <div className="space-y-4">
                            <div className="border-l-4 border-green-500 pl-4 py-1">
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Feb 10, 2026</p>
                                <p className="text-gray-800 dark:text-gray-200">Discussed roadmap for first semester. Advised to focus on Data Structures and key core subjects.</p>
                            </div>
                            <div className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 py-1">
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Jan 28, 2026</p>
                                <p className="text-gray-800 dark:text-gray-200">Initial introduction meeting. Verified document submission status.</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl shadow-lg p-6 text-white">
                        <h3 className="text-lg font-bold mb-2">Upcoming Session</h3>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="bg-white/20 p-3 rounded-lg text-center min-w-[60px]">
                                <span className="block text-xs uppercase opacity-80">Feb</span>
                                <span className="block text-xl font-bold">20</span>
                            </div>
                            <div>
                                <p className="font-semibold text-lg">Goal Setting Review</p>
                                <p className="text-purple-100 text-sm">3:00 PM - 3:30 PM • Room 204</p>
                            </div>
                        </div>
                        <button className="bg-white text-purple-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-purple-50 transition-colors">
                            Reschedule
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Mentorship;
