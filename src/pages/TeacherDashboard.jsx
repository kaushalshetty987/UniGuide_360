import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, AlertCircle, Mail, Calendar, ChevronRight, BookOpen, Users, ClipboardList } from 'lucide-react';

const TeacherDashboard = () => {
    const { mentees, currentUser, courses, teacherCourseData } = useApp();
    const totalCourses = (teacherCourseData || []).length + (courses || []).length;
    const navigate = useNavigate();
    const [filter, setFilter] = useState('all');

    const filteredMentees = (mentees || []).filter(m => {
        if (filter === 'at-risk') return m.status === 'critical' || m.status === 'warning';
        return true;
    });

    const teacherName = currentUser?.displayName?.split(' ')[0] || 'Professor';

    return (
        <div className="space-y-8">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome, {teacherName}! 👨‍🏫</h1>
                    <p className="text-gray-500 dark:text-gray-400">
                        {mentees.length > 0
                            ? `Managing ${mentees.length} assigned students.`
                            : 'Your teaching portal is ready.'}
                    </p>
                </div>
                <div className="flex gap-2">
                    <button className="bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <Calendar size={18} /> Schedule Meeting
                    </button>
                    <button
                        onClick={() => navigate('/teacher/courses')}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
                    >
                        <BookOpen size={18} /> Manage Courses
                    </button>
                </div>
            </header>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                    <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Mentees</h3>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{mentees.length}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                    <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Active Courses</h3>
                    <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-1">{totalCourses}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                    <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">At-Risk Students</h3>
                    <p className="text-3xl font-bold text-red-600 dark:text-red-400 mt-1">
                        {(mentees || []).filter(m => m.status === 'critical').length}
                    </p>
                </div>
            </div>

            {/* Mentees Grid */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row justify-between gap-4">
                    <div className="flex gap-2">
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'all' ? 'bg-gray-900 dark:bg-gray-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}
                        >
                            All Students
                        </button>
                        <button
                            onClick={() => setFilter('at-risk')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === 'at-risk' ? 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400' : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700'}`}
                        >
                            At Risk ({(mentees || []).filter(m => m.status === 'critical' || m.status === 'warning').length})
                        </button>
                    </div>

                    <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 w-full sm:w-64">
                        <Search size={18} className="text-gray-400" />
                        <input placeholder="Search mentee..." className="bg-transparent text-sm w-full outline-none dark:text-white" />
                    </div>
                </div>

                {filteredMentees.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-12 text-center">
                        <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-full mb-4">
                            <Users size={32} className="text-blue-600 dark:text-blue-400" />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">No Mentees Assigned Yet</h3>
                        <p className="text-gray-500 dark:text-gray-400 max-w-sm">
                            Mentees will appear here once they are assigned to you by the admin.
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs uppercase font-semibold">
                                <tr>
                                    <th className="px-6 py-4">Student Name</th>
                                    <th className="px-6 py-4">Progress</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Last Contact</th>
                                    <th className="px-6 py-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                {filteredMentees.map(student => (
                                    <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <img src={student.avatar} alt={student.name} className="w-10 h-10 rounded-full bg-gray-200" />
                                                <div>
                                                    <p className="font-bold text-gray-900 dark:text-white">{student.name}</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">{student.id} • {student.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="w-24 bg-gray-200 dark:bg-gray-600 rounded-full h-1.5 mb-1">
                                                <div className={`h-1.5 rounded-full ${getStatusColor(student.status, 'bg')}`} style={{ width: `${student.progress}%` }}></div>
                                            </div>
                                            <span className="text-xs text-gray-500 dark:text-gray-400">{student.progress}% Complete</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Badge status={student.status} />
                                            {student.issues && (
                                                <p className="text-xs text-red-500 mt-1 max-w-[150px] truncate">{student.issues}</p>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                            {student.lastContact}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 font-medium text-sm flex items-center gap-1">
                                                Details <ChevronRight size={14} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

const Badge = ({ status }) => {
    const styles = {
        'on-track': 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
        'warning': 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
        'critical': 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    };

    const labels = {
        'on-track': 'On Track',
        'warning': 'Needs Attention',
        'critical': 'At Risk',
    };

    return (
        <span className={`px-2 py-1 rounded text-xs font-bold ${styles[status] || 'bg-gray-100 text-gray-500'}`}>
            {labels[status] || status}
        </span>
    );
};

const getStatusColor = (status, type) => {
    if (status === 'critical') return type === 'bg' ? 'bg-red-500' : 'text-red-500';
    if (status === 'warning') return type === 'bg' ? 'bg-yellow-500' : 'text-yellow-500';
    return type === 'bg' ? 'bg-green-500' : 'text-green-500';
};

export default TeacherDashboard;
