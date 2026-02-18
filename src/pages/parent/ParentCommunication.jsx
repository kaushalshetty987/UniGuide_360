import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { MessageSquare, Mic, Phone, Mail, Send, Bell, CheckCircle, AlertCircle, Clock } from 'lucide-react';

const ParentCommunication = () => {
    const { studentData, currentUser, notifications } = useApp();
    const [activeTab, setActiveTab] = useState('messages');
    const [messageInput, setMessageInput] = useState('');
    const parentName = currentUser?.displayName || 'Parent';
    const studentName = studentData?.name || 'Student';

    const mockMessages = [
        { id: 1, from: 'mentor', name: 'Prof. Mamta Shetty', text: `${studentName}'s document verification is in progress. Upload of transfer certificate is still pending.`, time: '2 hours ago', avatar: '👩‍🏫' },
        { id: 2, from: 'parent', name: parentName, text: `Thank you! We will upload the transfer certificate today.`, time: '1 hour ago', avatar: '👤' },
        { id: 3, from: 'system', name: 'UniGuide Bot', text: `Reminder: Fee payment of ₹50,000 is due on 28 Feb 2026. Pay now to avoid late charges.`, time: '30 min ago', avatar: '🤖' },
    ];

    const mockNotifs = [
        { id: 1, type: 'urgent', title: 'Fee Payment Due', message: '2nd installment of ₹50,000 due in 3 days', time: '2 hours ago', read: false },
        { id: 2, type: 'success', title: 'Document Verified', message: '10th Mark Sheet has been verified successfully.', time: '1 day ago', read: true },
        { id: 3, type: 'info', title: 'Orientation Schedule', message: 'Orientation day schedule has been released.', time: '2 days ago', read: true },
        { id: 4, type: 'info', title: 'WhatsApp Updates Enabled', message: 'You will now receive updates on WhatsApp.', time: '3 days ago', read: true },
    ];

    const allNotifs = (notifications && notifications.length > 0) ? notifications : mockNotifs;

    const handleSend = () => {
        if (!messageInput.trim()) return;
        setMessageInput('');
    };

    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Communication Center</h1>
                <p className="text-gray-500 dark:text-gray-400">Stay connected with your child's mentor and the university.</p>
            </header>

            {/* Communication Channels */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-5 rounded-xl text-white shadow-lg">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="bg-white/20 p-2 rounded-lg"><Mic size={20} /></div>
                        <h3 className="font-bold">Voice Support</h3>
                    </div>
                    <p className="text-blue-100 text-xs mb-3">Talk to UniBot for instant support</p>
                    <button className="w-full py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors">
                        🎤 Hold to Speak
                    </button>
                </div>
                <div className="bg-[#25D366] p-5 rounded-xl text-white shadow-lg">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="bg-white/20 p-2 rounded-lg"><MessageSquare size={20} /></div>
                        <h3 className="font-bold">WhatsApp</h3>
                    </div>
                    <p className="text-green-100 text-xs mb-3">Get instant updates on your phone</p>
                    <button className="w-full py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors">
                        Open WhatsApp
                    </button>
                </div>
                <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="bg-purple-50 dark:bg-purple-900/30 p-2 rounded-lg"><Phone size={18} className="text-purple-600 dark:text-purple-400" /></div>
                        <h3 className="font-bold text-gray-900 dark:text-white">Helpline</h3>
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 text-xs mb-3">Call university support: Mon-Sat 9AM-6PM</p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">+91-9136127041</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg w-fit">
                <button
                    onClick={() => setActiveTab('messages')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'messages' ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400'
                        }`}
                >
                    Messages
                </button>
                <button
                    onClick={() => setActiveTab('notifications')}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'notifications' ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' : 'text-gray-500 dark:text-gray-400'
                        }`}
                >
                    Notifications ({allNotifs.filter(n => !n.read).length})
                </button>
            </div>

            {/* Messages Tab */}
            {activeTab === 'messages' && (
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                    <div className="p-4 bg-gray-50 dark:bg-gray-700/50 border-b border-gray-200 dark:border-gray-700 flex items-center gap-3">
                        <span className="text-lg">👩‍🏫</span>
                        <div>
                            <h4 className="font-bold text-gray-900 dark:text-white text-sm">Chat with Mentor</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Prof. Mamta Shetty • Faculty Mentor for {studentName}</p>
                        </div>
                    </div>

                    <div className="p-4 space-y-4 max-h-80 overflow-y-auto bg-gray-50 dark:bg-gray-800/50">
                        {mockMessages.map(msg => (
                            <div key={msg.id} className={`flex ${msg.from === 'parent' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[75%] ${msg.from === 'parent' ? '' : 'flex gap-2'}`}>
                                    {msg.from !== 'parent' && <span className="text-lg mt-1">{msg.avatar}</span>}
                                    <div>
                                        {msg.from !== 'parent' && (
                                            <p className="text-[10px] text-gray-500 dark:text-gray-400 mb-1 font-medium">{msg.name}</p>
                                        )}
                                        <div className={`p-3 rounded-2xl text-sm ${msg.from === 'parent'
                                            ? 'bg-blue-600 text-white rounded-br-none'
                                            : msg.from === 'system'
                                                ? 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 border border-yellow-200 dark:border-yellow-800 rounded-bl-none'
                                                : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-600 rounded-bl-none'
                                            }`}>
                                            {msg.text}
                                        </div>
                                        <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">{msg.time}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2">
                            <input
                                value={messageInput}
                                onChange={e => setMessageInput(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleSend()}
                                placeholder="Type a message to the mentor..."
                                className="bg-transparent flex-1 outline-none text-sm text-gray-700 dark:text-gray-200"
                            />
                            <button
                                onClick={handleSend}
                                disabled={!messageInput.trim()}
                                className={`p-2 rounded-full ${messageInput.trim() ? 'text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30' : 'text-gray-400'}`}
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                    <div className="divide-y divide-gray-100 dark:divide-gray-700">
                        {allNotifs.map(notif => {
                            const typeConfig = {
                                urgent: { icon: AlertCircle, bg: 'bg-red-50 dark:bg-red-900/10', border: 'border-red-500', iconColor: 'text-red-500' },
                                success: { icon: CheckCircle, bg: 'bg-green-50 dark:bg-green-900/10', border: 'border-green-500', iconColor: 'text-green-500' },
                                info: { icon: Bell, bg: 'bg-blue-50 dark:bg-blue-900/10', border: 'border-blue-500', iconColor: 'text-blue-500' },
                            };
                            const config = typeConfig[notif.type] || typeConfig.info;
                            const Icon = config.icon;

                            return (
                                <div key={notif.id} className={`p-4 flex items-start gap-3 ${!notif.read ? config.bg : ''} border-l-4 ${!notif.read ? config.border : 'border-transparent'}`}>
                                    <Icon size={18} className={`mt-0.5 shrink-0 ${config.iconColor}`} />
                                    <div className="flex-1">
                                        <h4 className={`text-sm font-semibold ${!notif.read ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}>{notif.title}</h4>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{notif.message}</p>
                                        <span className="text-[10px] text-gray-400 dark:text-gray-500 mt-1 block">{notif.time}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ParentCommunication;
