import React from 'react';

const Timetable = () => {
    // Mock Timetable Data
    const schedule = {
        'Monday': [
            { time: '09:00 AM', subject: 'Data Structures', room: 'LH-101', type: 'Lecture' },
            { time: '11:00 AM', subject: 'Mathematics II', room: 'LH-102', type: 'Lecture' },
            { time: '02:00 PM', subject: 'Physics Lab', room: 'Lab-2', type: 'Practical' },
        ],
        'Tuesday': [
            { time: '09:00 AM', subject: 'Digital Logic', room: 'LH-101', type: 'Lecture' },
            { time: '11:00 AM', subject: 'Data Structures', room: 'LH-101', type: 'Lecture' },
        ],
        'Wednesday': [
            { time: '10:00 AM', subject: 'Communication Skills', room: 'LH-104', type: 'Lecture' },
            { time: '02:00 PM', subject: 'Programming Lab', room: 'Lab-1', type: 'Practical' },
        ],
        'Thursday': [
            { time: '09:00 AM', subject: 'Mathematics II', room: 'LH-102', type: 'Lecture' },
            { time: '11:00 AM', subject: 'Digital Logic', room: 'LH-101', type: 'Lecture' },
        ],
        'Friday': [
            { time: '09:00 AM', subject: 'Physics', room: 'LH-103', type: 'Lecture' },
            { time: '02:00 PM', subject: 'Extra Curricular', room: 'Ground', type: 'Activity' },
        ]
    };

    return (
        <div className="space-y-6">
            <header>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Class Timetable</h1>
                <p className="text-gray-500 dark:text-gray-400">Your weekly schedule for Semester 1.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(schedule).map(([day, classes]) => (
                    <div key={day} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                        <div className="bg-blue-50 dark:bg-blue-900/20 px-4 py-3 border-b border-blue-100 dark:border-blue-800/30">
                            <h3 className="font-bold text-blue-800 dark:text-blue-300">{day}</h3>
                        </div>
                        <div className="divide-y divide-gray-100 dark:divide-gray-700">
                            {classes.map((cls, idx) => (
                                <div key={idx} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className="font-semibold text-gray-900 dark:text-white">{cls.subject}</h4>
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${cls.type === 'Lecture' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                                cls.type === 'Practical' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400' :
                                                    'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                                            }`}>
                                            {cls.type}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                                        <span>{cls.time}</span>
                                        <span>{cls.room}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Timetable;
