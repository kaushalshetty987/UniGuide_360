import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Filter, Users, AlertCircle, CheckCircle, Clock, ChevronDown, ChevronUp, Mail, FileText } from 'lucide-react';

const AdminStudents = () => {
    const { mentees, adminData } = useApp();
    const [filter, setFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedId, setExpandedId] = useState(null);

    // Use mentees as student list for demo, or fallback to generated data from adminData
    const students = (mentees && mentees.length > 0) ? mentees : [];

    const overall = adminData?.overall || {};

    const filtered = students.filter(s => {
        const matchesFilter = filter === 'all' ||
            (filter === 'on-track' && s.status === 'on-track') ||
            (filter === 'warning' && s.status === 'warning') ||
            (filter === 'critical' && s.status === 'critical');
        const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.id.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Student Management</h1>
                <p className="text-gray-500 dark:text-gray-400">View and manage all enrolled students.</p>
            </header>

            {/* Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard label="Total Students" value={overall.totalStudents || students.length} color="blue" />
                <StatCard label="On Track" value={overall.onTrack || students.filter(s => s.status === 'on-track').length} color="green" />
                <StatCard label="Needs Attention" value={overall.atRisk || students.filter(s => s.status === 'warning').length} color="yellow" />
                <StatCard label="Critical" value={overall.critical || students.filter(s => s.status === 'critical').length} color="red" />
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <div className="flex gap-2 flex-wrap">
                    {['all', 'on-track', 'warning', 'critical'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === f
                                    ? 'bg-gray-900 dark:bg-gray-600 text-white'
                                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
                                }`}
                        >
                            {f === 'all' ? 'All' : f === 'on-track' ? 'On Track' : f === 'warning' ? 'Warning' : 'Critical'}
                        </button>
                    ))}
                </div>
                <div className="flex items-center gap-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2 w-full sm:w-72">
                    <Search size={18} className="text-gray-400" />
                    <input
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        placeholder="Search by name or ID..."
                        className="bg-transparent text-sm w-full outline-none dark:text-white"
                    />
                </div>
            </div>

            {/* Student Table */}
            {students.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-16 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 border-dashed text-center">
                    <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-full mb-4">
                        <Users size={32} className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">No Students Enrolled Yet</h3>
                    <p className="text-gray-500 dark:text-gray-400 max-w-sm">
                        Student data will appear here once admissions begin.
                    </p>
                </div>
            ) : (
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs uppercase font-semibold">
                                <tr>
                                    <th className="px-6 py-4">Student</th>
                                    <th className="px-6 py-4">Department</th>
                                    <th className="px-6 py-4">Progress</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Documents</th>
                                    <th className="px-6 py-4">Fees</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                                {filtered.map(student => (
                                    <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <img src={student.avatar} alt={student.name} className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-600" />
                                                <div>
                                                    <p className="font-semibold text-gray-900 dark:text-white text-sm">{student.name}</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">{student.id}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{student.department || 'CS'}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-20 bg-gray-200 dark:bg-gray-600 rounded-full h-1.5">
                                                    <div className={`h-1.5 rounded-full ${student.progress >= 70 ? 'bg-green-500' : student.progress >= 40 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                                        style={{ width: `${student.progress}%` }}></div>
                                                </div>
                                                <span className="text-xs text-gray-500 dark:text-gray-400">{student.progress}%</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <StatusBadge status={student.status} />
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                            {student.documents ? `${student.documents.verified}/${student.documents.total}` : '—'}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                                            {student.fees ? `₹${(student.fees.paid || 0).toLocaleString()}` : '—'}
                                        </td>
                                    </tr>
                                ))}
                                {filtered.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                                            No students match your filter.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

const StatusBadge = ({ status }) => {
    const styles = {
        'on-track': 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
        'warning': 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
        'critical': 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
    };
    const labels = { 'on-track': 'On Track', 'warning': 'Warning', 'critical': 'Critical' };
    return (
        <span className={`px-2 py-1 rounded text-xs font-bold ${styles[status] || styles['on-track']}`}>
            {labels[status] || status}
        </span>
    );
};

const StatCard = ({ label, value, color }) => {
    const colors = {
        blue: 'text-blue-600 dark:text-blue-400',
        green: 'text-green-600 dark:text-green-400',
        yellow: 'text-yellow-600 dark:text-yellow-400',
        red: 'text-red-600 dark:text-red-400',
    };
    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
            <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{label}</p>
            <p className={`text-2xl font-bold mt-1 ${colors[color]}`}>{value}</p>
        </div>
    );
};

export default AdminStudents;
