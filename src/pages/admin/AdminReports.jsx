import React from 'react';
import { useApp } from '../../context/AppContext';
import { BarChart3, Download, Users, FileText, CreditCard, TrendingUp, AlertCircle } from 'lucide-react';

const AdminReports = () => {
    const { adminData, mentees, documents } = useApp();
    const overall = adminData?.overall || {};
    const stageCompletion = adminData?.stageCompletion || [];
    const revenueStats = adminData?.revenueStats || [];
    const bottlenecks = adminData?.bottlenecks || [];
    const totalStudents = overall.totalStudents || 0;

    if (!adminData) {
        return (
            <div className="space-y-6">
                <header>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reports & Analytics</h1>
                    <p className="text-gray-500 dark:text-gray-400">Generate and view onboarding reports.</p>
                </header>
                <div className="flex flex-col items-center justify-center p-16 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 border-dashed text-center">
                    <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-full mb-4">
                        <BarChart3 size={32} className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Reports Coming Soon</h3>
                    <p className="text-gray-500 dark:text-gray-400 max-w-sm">
                        Analytics and reports will populate as students progress through onboarding.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Reports & Analytics</h1>
                    <p className="text-gray-500 dark:text-gray-400">Batch 2026 onboarding insights and exportable reports.</p>
                </div>
                <button className="flex items-center gap-2 bg-gray-900 dark:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors">
                    <Download size={16} /> Export All Reports
                </button>
            </header>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <ReportCard icon={Users} label="Total Enrolled" value={totalStudents} color="blue" />
                <ReportCard icon={TrendingUp} label="Completion Rate" value={`${totalStudents ? ((overall.completed / totalStudents) * 100).toFixed(1) : 0}%`} color="green" />
                <ReportCard icon={FileText} label="Documents Pending" value={(documents || []).filter(d => d.status === 'pending' || d.status === 'processing').length} color="orange" />
                <ReportCard icon={AlertCircle} label="Critical Alerts" value={bottlenecks.filter(b => b.severity === 'critical').length} color="red" />
            </div>

            {/* Stage Completion Report */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold dark:text-white">Stage-wise Completion Report</h3>
                    <button className="text-blue-600 dark:text-blue-400 text-xs font-semibold hover:underline">Download CSV</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs uppercase font-semibold">
                            <tr>
                                <th className="px-6 py-3">Stage</th>
                                <th className="px-6 py-3">Completed</th>
                                <th className="px-6 py-3">Pending</th>
                                <th className="px-6 py-3">Completion</th>
                                <th className="px-6 py-3">Progress</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {stageCompletion.map((stage, i) => (
                                <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white text-sm">{stage.name}</td>
                                    <td className="px-6 py-4 text-sm text-green-600 dark:text-green-400 font-medium">{stage.completed}</td>
                                    <td className="px-6 py-4 text-sm text-orange-600 dark:text-orange-400 font-medium">{stage.pending}</td>
                                    <td className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-white">{stage.completion}%</td>
                                    <td className="px-6 py-4">
                                        <div className="w-24 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                                            <div className={`h-2 rounded-full ${stage.completion >= 75 ? 'bg-green-500' : stage.completion >= 50 ? 'bg-blue-500' : 'bg-orange-500'}`}
                                                style={{ width: `${stage.completion}%` }}></div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Revenue Report */}
            {revenueStats.length > 0 && (
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold dark:text-white flex items-center gap-2">
                            <CreditCard size={20} className="text-green-500" /> Revenue Collection Report
                        </h3>
                        <button className="text-blue-600 dark:text-blue-400 text-xs font-semibold hover:underline">Download CSV</button>
                    </div>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                        {revenueStats.map((month, i) => (
                            <div key={i} className="text-center">
                                <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 mb-2 relative overflow-hidden">
                                    <div
                                        className="absolute bottom-0 left-0 right-0 bg-green-500/20 dark:bg-green-400/20"
                                        style={{ height: `${(month.revenue / 7500000) * 100}%` }}
                                    ></div>
                                    <p className="text-lg font-bold text-gray-900 dark:text-white relative z-10">
                                        ₹{(month.revenue / 100000).toFixed(0)}L
                                    </p>
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{month.name}</p>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Total Collected</span>
                        <span className="text-lg font-bold text-green-600 dark:text-green-400">
                            ₹{(revenueStats.reduce((a, b) => a + b.revenue, 0) / 100000).toFixed(1)}L
                        </span>
                    </div>
                </div>
            )}

            {/* Bottleneck Summary */}
            {bottlenecks.length > 0 && (
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <h3 className="text-lg font-bold dark:text-white mb-4 flex items-center gap-2">
                        <AlertCircle size={20} className="text-red-500" /> Active Bottlenecks
                    </h3>
                    <div className="space-y-3">
                        {bottlenecks.map(alert => (
                            <div key={alert.id} className={`p-4 rounded-xl border flex items-start gap-4 ${alert.severity === 'critical'
                                    ? 'bg-red-50 dark:bg-red-900/10 border-red-100 dark:border-red-900/30'
                                    : 'bg-orange-50 dark:bg-orange-900/10 border-orange-100 dark:border-orange-900/30'
                                }`}>
                                <div className={`p-2 rounded-lg shrink-0 ${alert.severity === 'critical' ? 'bg-red-100 dark:bg-red-900/30' : 'bg-orange-100 dark:bg-orange-900/30'
                                    }`}>
                                    <AlertCircle size={16} className={alert.severity === 'critical' ? 'text-red-600 dark:text-red-400' : 'text-orange-600 dark:text-orange-400'} />
                                </div>
                                <div className="flex-1">
                                    <h4 className={`font-bold text-sm ${alert.severity === 'critical' ? 'text-red-800 dark:text-red-300' : 'text-orange-800 dark:text-orange-300'}`}>
                                        {alert.title} — {alert.count} students affected
                                    </h4>
                                    <p className={`text-xs mt-1 ${alert.severity === 'critical' ? 'text-red-600 dark:text-red-400' : 'text-orange-600 dark:text-orange-400'}`}>
                                        {alert.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

const ReportCard = ({ icon: Icon, label, value, color }) => {
    const colors = {
        blue: 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
        green: 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400',
        orange: 'bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
        red: 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400',
    };
    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center gap-3">
            <div className={`p-2 rounded-lg ${colors[color]}`}><Icon size={20} /></div>
            <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{label}</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{value}</p>
            </div>
        </div>
    );
};

export default AdminReports;
