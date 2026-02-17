import React, { useState } from 'react';
import { MOCK_ROOMMATES, CURRENT_USER_PREF } from '../../data/mockHostelData';
import { User, Moon, Sun, Monitor, Coffee, Check, X } from 'lucide-react';

const Hostel = () => {
    const [matches, setMatches] = useState(MOCK_ROOMMATES);
    const [requests, setRequests] = useState([]);

    const sendRequest = (id) => {
        setRequests([...requests, id]);
        // Ideally, show a toast here
    };

    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Roommate Finder 🏠</h1>
                <p className="text-gray-500 dark:text-gray-400">Find your perfect roommate based on compatibility.</p>
            </header>

            {/* User Preferences Summary */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 p-6 rounded-2xl">
                <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-4">Your Preferences</h2>
                <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm text-sm text-gray-700 dark:text-gray-300">
                        <Moon size={16} />
                        <span>{CURRENT_USER_PREF.sleepSchedule}</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm text-sm text-gray-700 dark:text-gray-300">
                        <Monitor size={16} />
                        <span>{CURRENT_USER_PREF.cleanliness} Cleanliness</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-sm text-sm text-gray-700 dark:text-gray-300">
                        <Coffee size={16} />
                        <span>Interests: {CURRENT_USER_PREF.interests.join(', ')}</span>
                    </div>
                </div>
            </div>

            {/* Matches Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {matches.map(roommate => (
                    <div key={roommate.id} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow relative overflow-hidden">

                        {/* Match Score Badge */}
                        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold ${roommate.matchScore > 85 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                roommate.matchScore > 70 ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                                    'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                            }`}>
                            {roommate.matchScore}% Match
                        </div>

                        <div className="flex flex-col items-center text-center mb-6">
                            <img src={roommate.image} alt={roommate.name} className="w-20 h-20 rounded-full bg-gray-100 mb-3" />
                            <h3 className="font-bold text-lg text-gray-900 dark:text-white">{roommate.name}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{roommate.course} • {roommate.hometown}</p>
                        </div>

                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500 dark:text-gray-400">Sleep</span>
                                <span className="text-gray-900 dark:text-gray-200 font-medium">{roommate.preferences.sleepSchedule}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500 dark:text-gray-400">Habits</span>
                                <span className="text-gray-900 dark:text-gray-200 font-medium">{roommate.preferences.cleanliness}, {roommate.preferences.smoking}</span>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {roommate.interests.map((interest, i) => (
                                    <span key={i} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-md">
                                        {interest}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={() => sendRequest(roommate.id)}
                            disabled={requests.includes(roommate.id)}
                            className={`w-full py-2.5 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2
                                ${requests.includes(roommate.id)
                                    ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 cursor-default'
                                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200 dark:shadow-none'
                                }
                            `}
                        >
                            {requests.includes(roommate.id) ? (
                                <>
                                    <Check size={18} /> Request Sent
                                </>
                            ) : 'Connect & Request'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Hostel;
