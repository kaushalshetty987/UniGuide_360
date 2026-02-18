import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Users, ChevronDown, ChevronUp, Mail, Phone, Calendar, FileText, AlertCircle, CheckCircle, Clock, Send } from 'lucide-react';

const TeacherMentees = () => {
    const { mentees } = useApp();
    const [filter, setFilter] = useState('all');
    const [expandedId, setExpandedId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const filtered = (mentees || []).filter(m => {
        const matchesFilter = filter === 'all' ||
            (filter === 'at-risk' && (m.status === 'critical' || m.status === 'warning')) ||
            (filter === 'on-track' && m.status === 'on-track');
        const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.id.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    if (!mentees || mentees.length === 0) {
        return (
            <div className="space-y-6">
                <header>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Mentees</h1>
                    <p className="text-gray-500 dark:text-gray-400">Track and support your assigned students.</p>
                </header>
                <div className="flex flex-col items-center justify-center p-16 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 border-dashed text-center">
                    <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-full mb-4">
                        <Users size={32} className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">No Mentees Assigned Yet</h3>
                    <p className="text-gray-500 dark:text-gray-400 max-w-sm">
                        Once the admin assigns students to you, their profiles and progress will appear here.
                    </p>
                </div>
            </div>
        );
    }

    const statusCounts = {
        all: mentees.length,
        'on-track': mentees.filter(m => m.status === 'on-track').length,
        'at-risk': mentees.filter(m => m.status === 'critical' || m.status === 'warning').length,
    };

    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Mentees</h1>
                <p className="text-gray-500 dark:text-gray-400">Track and support your assigned students.</p>
            </header>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                    <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Mentees</h3>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{mentees.length}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                    <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">On Track</h3>
                    <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-1">{statusCounts['on-track']}</p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                    <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Needs Attention</h3>
                    <p className="text-3xl font-bold text-red-600 dark:text-red-400 mt-1">{statusCounts['at-risk']}</p>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <div className="flex gap-2">
                    {['all', 'on-track', 'at-risk'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === f
                                    ? f === 'at-risk'
                                        ? 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                                        : 'bg-gray-900 dark:bg-gray-600 text-white'
                                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
                                }`}
                        >
                            {f === 'all' ? `All (${statusCounts.all})` : f === 'on-track' ? `On Track (${statusCounts['on-track']})` : `At Risk (${statusCounts['at-risk']})`}
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

            {/* Mentee Cards */}
            <div className="space-y-4">
                {filtered.map(mentee => (
                    <MenteeCard
                        key={mentee.id}
                        mentee={mentee}
                        isExpanded={expandedId === mentee.id}
                        onToggle={() => setExpandedId(expandedId === mentee.id ? null : mentee.id)}
                    />
                ))}
                {filtered.length === 0 && (
                    <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                        No mentees match your current filter.
                    </div>
                )}
            </div>
        </div>
    );
};

const MenteeCard = ({ mentee, isExpanded, onToggle }) => {
    const statusStyles = {
        'on-track': { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400', label: 'On Track' },
        'warning': { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-700 dark:text-yellow-400', label: 'Needs Attention' },
        'critical': { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-400', label: 'At Risk' },
    };
    const style = statusStyles[mentee.status] || statusStyles['on-track'];
    const progressColor = mentee.status === 'critical' ? 'bg-red-500' : mentee.status === 'warning' ? 'bg-yellow-500' : 'bg-green-500';

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
            {/* Main Row */}
            <div
                className="p-5 flex items-center gap-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                onClick={onToggle}
            >
                <img src={mentee.avatar} alt={mentee.name} className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-600 shrink-0" />
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-gray-900 dark:text-white truncate">{mentee.name}</h3>
                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${style.bg} ${style.text}`}>{style.label}</span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{mentee.id} • {mentee.department} • {mentee.year}</p>
                </div>
                <div className="hidden md:flex items-center gap-6">
                    <div className="text-right">
                        <div className="w-24 bg-gray-200 dark:bg-gray-600 rounded-full h-1.5 mb-1">
                            <div className={`h-1.5 rounded-full ${progressColor}`} style={{ width: `${mentee.progress}%` }}></div>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{mentee.progress}%</span>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-gray-400 dark:text-gray-500">Last Contact</p>
                        <p className={`text-sm font-medium ${mentee.lastContact === 'Never' ? 'text-red-500' : 'text-gray-700 dark:text-gray-300'}`}>
                            {mentee.lastContact}
                        </p>
                    </div>
                </div>
                {isExpanded ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
            </div>

            {/* Expanded Detail Panel */}
            {isExpanded && (
                <div className="border-t border-gray-100 dark:border-gray-700 p-5 bg-gray-50 dark:bg-gray-800/50">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Contact Info */}
                        <div className="space-y-3">
                            <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Contact</h4>
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <Mail size={14} /> {mentee.email}
                            </div>
                            {mentee.phone && (
                                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    <Phone size={14} /> {mentee.phone}
                                </div>
                            )}
                            {mentee.issues && (
                                <div className="flex items-start gap-2 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-2 rounded-lg">
                                    <AlertCircle size={14} className="mt-0.5 shrink-0" /> {mentee.issues}
                                </div>
                            )}
                        </div>

                        {/* Documents & Fees */}
                        <div className="space-y-3">
                            <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Progress</h4>
                            {mentee.documents && (
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                        <FileText size={14} />
                                        <span>Documents: {mentee.documents.verified}/{mentee.documents.total} verified</span>
                                    </div>
                                    {mentee.documents.pending > 0 && (
                                        <p className="text-xs text-yellow-600 dark:text-yellow-400 ml-5">{mentee.documents.pending} pending review</p>
                                    )}
                                    {mentee.documents.rejected > 0 && (
                                        <p className="text-xs text-red-600 dark:text-red-400 ml-5">{mentee.documents.rejected} rejected</p>
                                    )}
                                </div>
                            )}
                            {mentee.fees && (
                                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                    <CheckCircle size={14} />
                                    <span>Fees: ₹{mentee.fees.paid.toLocaleString()} / ₹{mentee.fees.total.toLocaleString()}</span>
                                </div>
                            )}
                        </div>

                        {/* Notes */}
                        <div className="space-y-3">
                            <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">Mentor Notes</h4>
                            {mentee.notes && mentee.notes.length > 0 ? (
                                <div className="space-y-2 max-h-40 overflow-y-auto">
                                    {mentee.notes.map((note, i) => (
                                        <div key={i} className="text-xs bg-white dark:bg-gray-700 p-2 rounded-lg border border-gray-200 dark:border-gray-600">
                                            <p className="text-gray-400 dark:text-gray-500 mb-1">{note.date}</p>
                                            <p className="text-gray-700 dark:text-gray-300">{note.text}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-xs text-gray-400 dark:text-gray-500 italic">No notes yet.</p>
                            )}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                            <Send size={14} /> Send Reminder
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                            <Calendar size={14} /> Schedule Meeting
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                            <Mail size={14} /> Email
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeacherMentees;
