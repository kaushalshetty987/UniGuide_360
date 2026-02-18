import React from 'react';
import { useApp } from '../context/AppContext';
import { AlertCircle, Users, CheckCircle, Clock, FileText, BarChart3, Shield } from 'lucide-react';

const AdminDashboard = () => {
    const { adminData, documents, verifyDocument, currentUser } = useApp();

    // If no admin data (non-demo user), show an empty admin command center
    if (!adminData) {
        return (
            <div className="space-y-8">
                <header>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Command Center</h1>
                    <p className="text-gray-500 dark:text-gray-400">Welcome, {currentUser?.displayName || 'Admin'}</p>
                </header>

                {/* KPI Cards - Empty */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <KPICard title="Total Students" value={0} icon={Users} color="blue" />
                    <KPICard title="Onboarded" value="0%" icon={CheckCircle} color="green" />
                    <KPICard title="Pending Documents" value={(documents || []).filter(d => d.status === 'pending').length} icon={Clock} color="orange" />
                    <KPICard title="Critical At-Risk" value={0} icon={AlertCircle} color="red" />
                </div>

                {/* Document Verification */}
                <DocumentVerificationTable documents={documents || []} verifyDocument={verifyDocument} />

                {/* Empty State for Charts */}
                <div className="bg-white dark:bg-gray-800 p-12 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center text-center">
                    <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-full mb-4">
                        <BarChart3 size={32} className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Analytics Coming Soon</h3>
                    <p className="text-gray-500 dark:text-gray-400 max-w-md">
                        As students begin their onboarding journey, you'll see real-time analytics, charts, and bottleneck alerts here.
                    </p>
                </div>
            </div>
        );
    }

    // Demo user with full mock data
    const data = adminData.stageCompletion || [];
    const pieData = adminData.overall
        ? Object.entries(adminData.overall).filter(([key]) => ['started', 'completed', 'atRisk'].includes(key)).map(([name, value]) => ({ name, value }))
        : [];

    return (
        <div className="space-y-8">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Command Center</h1>
                    <p className="text-gray-500 dark:text-gray-400">Real-time overview of Batch 2026 Onboarding</p>
                </div>
                <button className="bg-gray-900 dark:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                    Export Report
                </button>
            </header>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <KPICard title="Total Students" value={adminData.overall?.totalStudents || 0} icon={Users} color="blue" />
                <KPICard title="Onboarded" value={`${adminData.overall?.totalStudents ? ((adminData.overall.completed / adminData.overall.totalStudents) * 100).toFixed(1) : 0}%`} icon={CheckCircle} color="green" />
                <KPICard title="Pending" value={(adminData.overall?.started || 0) - (adminData.overall?.completed || 0)} icon={Clock} color="orange" />
                <KPICard title="Critical At-Risk" value={adminData.overall?.critical || 0} icon={AlertCircle} color="red" />
            </div>

            {/* Stage Completion */}
            {data.length > 0 && (
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <h3 className="text-lg font-bold dark:text-white mb-6">Stage Completion Rates</h3>
                    <div className="space-y-4">
                        {data.map((stage, i) => (
                            <div key={i} className="flex items-center gap-4">
                                <span className="text-sm text-gray-600 dark:text-gray-400 w-32 truncate">{stage.name}</span>
                                <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full h-3">
                                    <div
                                        className="bg-blue-500 h-3 rounded-full transition-all"
                                        style={{ width: `${stage.completion || 0}%` }}
                                    ></div>
                                </div>
                                <span className="text-sm font-bold text-gray-700 dark:text-gray-300 w-12 text-right">{stage.completion || 0}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Bottleneck Alerts */}
            {adminData.bottlenecks && adminData.bottlenecks.length > 0 && (
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2 dark:text-white">
                        <AlertCircle size={20} className="text-red-500" /> System Bottlenecks
                    </h3>
                    <div className="space-y-3">
                        {adminData.bottlenecks.map(alert => (
                            <div key={alert.id} className={`p-4 rounded-xl border ${alert.severity === 'critical' ? 'bg-red-50 dark:bg-red-900/10 border-red-100 dark:border-red-900/30' : 'bg-orange-50 dark:bg-orange-900/10 border-orange-100 dark:border-orange-900/30'}`}>
                                <h4 className={`font-bold text-sm ${alert.severity === 'critical' ? 'text-red-800 dark:text-red-300' : 'text-orange-800 dark:text-orange-300'}`}>
                                    {alert.title}
                                </h4>
                                <p className={`text-xs mt-1 ${alert.severity === 'critical' ? 'text-red-600 dark:text-red-400' : 'text-orange-600 dark:text-orange-400'}`}>
                                    {alert.description}
                                </p>
                                <div className="mt-3 flex gap-2">
                                    <button className={`px-3 py-1 rounded text-xs font-bold bg-white dark:bg-gray-800 border shadow-sm ${alert.severity === 'critical' ? 'text-red-600 border-red-200 dark:border-red-900/30' : 'text-orange-600 border-orange-200 dark:border-orange-900/30'}`}>
                                        Resolve
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Document Verification Section */}
            <DocumentVerificationTable documents={documents || []} verifyDocument={verifyDocument} />
        </div>
    );
};

const DocumentVerificationTable = ({ documents, verifyDocument }) => {
    const pendingDocs = documents.filter(d => d.status === 'pending' || d.status === 'processing');

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold flex items-center gap-2 dark:text-white">
                    <FileText size={20} className="text-blue-500" /> Pending Verifications
                </h3>
                <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-bold px-2 py-1 rounded-full">
                    {pendingDocs.length} Pending
                </span>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs uppercase font-semibold">
                        <tr>
                            <th className="px-6 py-4">Student</th>
                            <th className="px-6 py-4">Document</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                        {pendingDocs.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                                    All caught up! No pending documents.
                                </td>
                            </tr>
                        ) : (
                            pendingDocs.map(doc => (
                                <tr key={doc.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{doc.studentName || 'Unknown'}</td>
                                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{doc.name}</td>
                                    <td className="px-6 py-4">
                                        <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 px-2 py-1 rounded text-xs font-bold">
                                            {doc.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 flex gap-2">
                                        <button
                                            onClick={() => verifyDocument(doc.id, 'verified')}
                                            className="bg-green-50 dark:bg-green-900/30 hover:bg-green-100 text-green-600 dark:text-green-400 px-3 py-1 rounded-lg text-xs font-bold border border-green-200 dark:border-green-900/30 transition-colors"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => verifyDocument(doc.id, 'rejected')}
                                            className="bg-red-50 dark:bg-red-900/30 hover:bg-red-100 text-red-600 dark:text-red-400 px-3 py-1 rounded-lg text-xs font-bold border border-red-200 dark:border-red-900/30 transition-colors"
                                        >
                                            Reject
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const KPICard = ({ title, value, icon: Icon, color }) => {
    const colors = {
        blue: 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
        green: 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400',
        orange: 'bg-orange-50 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
        red: 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400',
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center gap-4">
            <div className={`p-3 rounded-lg ${colors[color]}`}>
                <Icon size={24} />
            </div>
            <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{title}</p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{value}</h3>
            </div>
        </div>
    )
}

export default AdminDashboard;
