import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle, AlertTriangle, CreditCard, XCircle, Mic, MessageSquare } from 'lucide-react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ParentDashboard = () => {
    const { studentData, currentUser } = useApp();

    if (!studentData) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    const studentName = studentData.name || 'Student';
    const progress = studentData.progress || 0;
    const parentName = currentUser?.displayName || 'Parent';

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome, {parentName}! 🙏</h1>
                    <p className="text-gray-500 dark:text-gray-400">Monitoring Progress for: <span className="font-semibold text-gray-900 dark:text-white">{studentName}</span></p>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Progress & Payments */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Progress Card */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row items-center gap-8">
                        <div className="w-32 h-32 shrink-0">
                            <CircularProgressbar
                                value={progress}
                                text={`${progress}%`}
                                styles={buildStyles({
                                    textSize: '20px',
                                    pathColor: '#10B981',
                                    textColor: '#10B981',
                                    trailColor: '#E5E7EB',
                                })}
                            />
                        </div>
                        <div className="flex-1 w-full">
                            <div className="flex justify-between items-start mb-2">
                                <h2 className="text-lg font-bold dark:text-white">Onboarding Status</h2>
                                <span className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-3 py-1 rounded-full text-xs font-bold">On Track</span>
                            </div>
                            <div className="space-y-2">
                                <ProgressItem label="Admission Confirmed" status="completed" />
                                <ProgressItem label="Documents Uploaded" status="processed" />
                                <ProgressItem label="Fee Payment" status="pending" />
                                <ProgressItem label="Hostel Allocation" status="locked" />
                            </div>
                        </div>
                    </div>

                    {/* Payment Alert Card */}
                    <div className="bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/30 p-6 rounded-2xl">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-full text-orange-600 dark:text-orange-400">
                                <AlertTriangle size={24} />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-bold text-orange-900 dark:text-orange-300">Payment Due Soon!</h3>
                                <p className="text-orange-700 dark:text-orange-200 mt-1">
                                    The second installment of <span className="font-bold">₹50,000</span> is due on 28 Feb 2026.
                                </p>
                                <div className="mt-4 flex gap-4">
                                    <button className="px-6 py-2 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 shadow-md">
                                        Pay Now via UPI
                                    </button>
                                    <button className="px-6 py-2 bg-white text-orange-700 font-medium rounded-lg border border-orange-200">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Communication */}
                <div className="space-y-6">
                    {/* Voice Assistant */}
                    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-2xl shadow-lg text-white text-center">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                            <Mic size={32} />
                        </div>
                        <h3 className="text-xl font-bold mb-2">आवाज़ से बात करें</h3>
                        <p className="text-blue-100 text-sm mb-6">"मेरे बेटे की फीस कब देनी है?"</p>
                        <button className="w-full py-3 bg-white text-blue-700 font-bold rounded-xl shadow-lg hover:bg-blue-50 transition-colors">
                            Hold to Speak
                        </button>
                    </div>

                    {/* WhatsApp Mock */}
                    <div className="bg-[#25D366] p-6 rounded-2xl shadow-sm text-white relative overflow-hidden">
                        <MessageSquare className="absolute -right-4 -bottom-4 w-32 h-32 opacity-20" />
                        <h3 className="font-bold text-lg mb-2">WhatsApp Enabled</h3>
                        <p className="text-sm opacity-90 mb-4">
                            Get updates on fees, documents, and exam results directly on WhatsApp.
                        </p>
                        <div className="bg-white/20 p-3 rounded-lg text-xs backdrop-blur-sm">
                            <p className="font-bold mb-1">Recent Message:</p>
                            "नमस्ते! अर्जुन की दूसरी किश्त 3 दिन में देय है..."
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ProgressItem = ({ label, status }) => {
    const icons = {
        completed: <CheckCircle size={16} className="text-green-500" />,
        processed: <CheckCircle size={16} className="text-blue-500" />,
        pending: <AlertTriangle size={16} className="text-orange-500" />,
        locked: <XCircle size={16} className="text-gray-300" />
    };

    const colors = {
        completed: 'text-gray-900 dark:text-gray-100',
        processed: 'text-gray-900 dark:text-gray-100',
        pending: 'text-orange-600 dark:text-orange-400 font-medium',
        locked: 'text-gray-400 dark:text-gray-500'
    };

    return (
        <div className="flex items-center justify-between py-1">
            <span className={`text-sm ${colors[status]}`}>{label}</span>
            {icons[status]}
        </div>
    )
}

export default ParentDashboard;
