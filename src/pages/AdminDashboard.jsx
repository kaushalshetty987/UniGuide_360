import React from 'react';
import { useApp } from '../context/AppContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { AlertCircle, Users, CheckCircle, Clock, FileText } from 'lucide-react';

const AdminDashboard = () => {
    const { adminData } = useApp();
    const data = adminData.stageCompletion;
    const pieData = Object.entries(adminData.overall).filter(([key]) => ['started', 'completed', 'atRisk'].includes(key)).map(([name, value]) => ({ name, value }));
    const COLORS = ['#3B82F6', '#10B981', '#EF4444'];

    return (
        <div className="space-y-8">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Admin Command Center</h1>
                    <p className="text-gray-500">Real-time overview of Batch 2026 Onboarding</p>
                </div>
                <button className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium">
                    Export Report
                </button>
            </header>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <KPICard title="Total Students" value={adminData.overall.totalStudents} icon={Users} color="blue" />
                <KPICard title="Onboarded" value={`${((adminData.overall.completed / adminData.overall.totalStudents) * 100).toFixed(1)}%`} icon={CheckCircle} color="green" />
                <KPICard title="Pending" value={adminData.overall.started - adminData.overall.completed} icon={Clock} color="orange" />
                <KPICard title="Critical At-Risk" value={adminData.overall.critical} icon={AlertCircle} color="red" />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Bar Chart */}
                {/* Charts Area */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold">Registration & Revenue Trends</h3>
                        <select className="bg-gray-50 border border-gray-200 text-sm rounded-lg px-2 py-1 outline-none">
                            <option>Last 6 Months</option>
                            <option>Year to Date</option>
                        </select>
                    </div>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={adminData.revenueStats}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={12} />
                                <YAxis axisLine={false} tickLine={false} fontSize={12} tickFormatter={(value) => `₹${value / 100000}L`} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    formatter={(value) => [`₹${(value / 100000).toFixed(1)} Lakhs`, 'Revenue']}
                                />
                                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                                <Area type="monotone" dataKey="revenue" stroke="#3B82F6" fillOpacity={1} fill="url(#colorRevenue)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Pie Chart & Bottlenecks */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
                        <h3 className="text-lg font-bold mb-2 w-full text-left">Overall Status</h3>
                        <div className="h-48 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="flex justify-center gap-4 text-xs font-medium text-gray-500">
                            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500"></span> Started</span>
                            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span> Complete</span>
                            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"></span> At-Risk</span>
                        </div>
                    </div>

                    {/* Bottleneck Alerts */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <AlertCircle size={20} className="text-red-500" /> System Bottlenecks
                        </h3>
                        <div className="space-y-3">
                            {adminData.bottlenecks.map(alert => (
                                <div key={alert.id} className={`p-4 rounded-xl border ${alert.severity === 'critical' ? 'bg-red-50 border-red-100' : 'bg-orange-50 border-orange-100'}`}>
                                    <h4 className={`font-bold text-sm ${alert.severity === 'critical' ? 'text-red-800' : 'text-orange-800'}`}>
                                        {alert.title}
                                    </h4>
                                    <p className={`text-xs mt-1 ${alert.severity === 'critical' ? 'text-red-600' : 'text-orange-600'}`}>
                                        {alert.description}
                                    </p>
                                    <div className="mt-3 flex gap-2">
                                        <button className={`px-3 py-1 rounded text-xs font-bold bg-white border shadow-sm ${alert.severity === 'critical' ? 'text-red-600 border-red-200' : 'text-orange-600 border-orange-200'}`}>
                                            Resolve
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {/* Document Verification Section */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                        <FileText size={20} className="text-blue-500" /> Pending Verifications
                    </h3>
                    <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-full">
                        {useApp().documents.filter(d => d.status === 'processing').length} Pending
                    </span>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
                            <tr>
                                <th className="px-6 py-4">Student</th>
                                <th className="px-6 py-4">Document</th>
                                <th className="px-6 py-4">Time</th>
                                <th className="px-6 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {useApp().documents.filter(d => d.status === 'processing').length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                                        All caught up! No pending documents.
                                    </td>
                                </tr>
                            ) : (
                                useApp().documents.filter(d => d.status === 'processing').map(doc => (
                                    <tr key={doc.id}>
                                        <td className="px-6 py-4 font-medium text-gray-900">Arjun Sharma (CS101245)</td>
                                        <td className="px-6 py-4 text-gray-600">{doc.name}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{doc.date}</td>
                                        <td className="px-6 py-4 flex gap-2">
                                            <button
                                                onClick={() => useApp().verifyDocument(doc.id, 'verified')}
                                                className="bg-green-50 hover:bg-green-100 text-green-600 px-3 py-1 rounded-lg text-xs font-bold border border-green-200 transition-colors"
                                            >
                                                Approve
                                            </button>
                                            <button
                                                onClick={() => useApp().verifyDocument(doc.id, 'rejected')}
                                                className="bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1 rounded-lg text-xs font-bold border border-red-200 transition-colors"
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
        </div>
    );
};

const KPICard = ({ title, value, icon: Icon, color }) => {
    const colors = {
        blue: 'bg-blue-50 text-blue-600',
        green: 'bg-green-50 text-green-600',
        orange: 'bg-orange-50 text-orange-600',
        red: 'bg-red-50 text-red-600',
    };

    return (
        <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
            <div className={`p-3 rounded-lg ${colors[color]}`}>
                <Icon size={24} />
            </div>
            <div>
                <p className="text-sm text-gray-500 font-medium">{title}</p>
                <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
            </div>
        </div>
    )
}

export default AdminDashboard;
