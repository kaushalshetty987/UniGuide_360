import React from 'react';
import { useApp } from '../../context/AppContext';
import { Calendar, Clock, MapPin, BookOpen, Users, Coffee, FlaskConical } from 'lucide-react';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

const TeacherSchedule = () => {
    const { teacherSchedule } = useApp();
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

    if (!teacherSchedule || Object.keys(teacherSchedule).length === 0) {
        return (
            <div className="space-y-6">
                <header>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Schedule</h1>
                    <p className="text-gray-500 dark:text-gray-400">Your weekly class and meeting schedule.</p>
                </header>
                <div className="flex flex-col items-center justify-center p-16 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 border-dashed text-center">
                    <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-full mb-4">
                        <Calendar size={32} className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">No Schedule Set Up Yet</h3>
                    <p className="text-gray-500 dark:text-gray-400 max-w-sm">
                        Your weekly schedule will appear here once courses and office hours are assigned to you.
                    </p>
                </div>
            </div>
        );
    }

    // Today's events for the summary card
    const todaysEvents = teacherSchedule[today] || [];
    const totalClasses = Object.values(teacherSchedule).flat().filter(e => e.type === 'lecture').length;
    const totalOfficeHours = Object.values(teacherSchedule).flat().filter(e => e.type === 'office').length;

    return (
        <div className="space-y-6">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Schedule</h1>
                    <p className="text-gray-500 dark:text-gray-400">Weekly class, office hours, and meeting schedule.</p>
                </div>
                <div className="flex gap-4">
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 text-center">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Classes/Week</p>
                        <p className="text-xl font-bold text-blue-600 dark:text-blue-400">{totalClasses}</p>
                    </div>
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 text-center">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Office Hours</p>
                        <p className="text-xl font-bold text-green-600 dark:text-green-400">{totalOfficeHours}</p>
                    </div>
                </div>
            </header>

            {/* Today's Summary */}
            {todaysEvents.length > 0 && (
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white shadow-lg">
                    <div className="flex items-center gap-2 mb-4">
                        <Calendar size={20} />
                        <h2 className="text-lg font-bold">Today — {today}</h2>
                        <span className="bg-white/20 px-2 py-0.5 rounded text-xs font-medium ml-2">{todaysEvents.length} events</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                        {todaysEvents.map((event, i) => (
                            <div key={i} className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                                <p className="text-xs text-blue-200 mb-1">{event.time}</p>
                                <p className="font-semibold text-sm">{event.title}</p>
                                <p className="text-xs text-blue-200 mt-1">📍 {event.room}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Weekly Schedule Grid */}
            <div className="space-y-4">
                {DAYS.map(day => {
                    const events = teacherSchedule[day] || [];
                    const isToday = day === today;

                    return (
                        <div
                            key={day}
                            className={`bg-white dark:bg-gray-800 rounded-xl border shadow-sm overflow-hidden transition-all ${isToday
                                    ? 'border-blue-300 dark:border-blue-700 ring-2 ring-blue-100 dark:ring-blue-900/30'
                                    : 'border-gray-100 dark:border-gray-700'
                                }`}
                        >
                            <div className={`px-5 py-3 flex items-center justify-between ${isToday ? 'bg-blue-50 dark:bg-blue-900/20' : 'bg-gray-50 dark:bg-gray-700/50'
                                }`}>
                                <div className="flex items-center gap-2">
                                    <h3 className={`font-bold ${isToday ? 'text-blue-700 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}`}>
                                        {day}
                                    </h3>
                                    {isToday && (
                                        <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">TODAY</span>
                                    )}
                                </div>
                                <span className="text-xs text-gray-500 dark:text-gray-400">{events.length} events</span>
                            </div>

                            {events.length === 0 ? (
                                <div className="px-5 py-6 text-center text-sm text-gray-400 dark:text-gray-500">No events scheduled</div>
                            ) : (
                                <div className="divide-y divide-gray-50 dark:divide-gray-700">
                                    {events.map((event, i) => (
                                        <ScheduleRow key={i} event={event} />
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-4 justify-center text-xs text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-blue-500"></span> Lecture</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-green-500"></span> Office Hours</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-purple-500"></span> Meeting</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-orange-500"></span> Mentoring</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-cyan-500"></span> Lab</span>
            </div>
        </div>
    );
};

const ScheduleRow = ({ event }) => {
    const typeConfig = {
        lecture: { color: 'bg-blue-500', icon: BookOpen, label: 'Lecture' },
        office: { color: 'bg-green-500', icon: Coffee, label: 'Office Hours' },
        meeting: { color: 'bg-purple-500', icon: Users, label: 'Meeting' },
        mentoring: { color: 'bg-orange-500', icon: Users, label: 'Mentoring' },
        lab: { color: 'bg-cyan-500', icon: FlaskConical, label: 'Lab' },
    };
    const config = typeConfig[event.type] || typeConfig.lecture;
    const Icon = config.icon;

    return (
        <div className="flex items-center gap-4 px-5 py-3 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
            <div className={`w-1 h-10 rounded-full ${config.color} shrink-0`}></div>
            <div className="flex items-center gap-3 shrink-0 w-40">
                <Clock size={14} className="text-gray-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{event.time}</span>
            </div>
            <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 dark:text-white text-sm truncate">{event.title}</p>
                <span className={`text-[10px] font-bold uppercase tracking-wider ${event.type === 'lecture' ? 'text-blue-500' :
                        event.type === 'office' ? 'text-green-500' :
                            event.type === 'meeting' ? 'text-purple-500' :
                                event.type === 'mentoring' ? 'text-orange-500' : 'text-cyan-500'
                    }`}>{config.label}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 shrink-0">
                <MapPin size={12} /> {event.room}
            </div>
        </div>
    );
};

export default TeacherSchedule;
