import React, { useState } from 'react';
import { Search, Info, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const CourseRegistration = () => {
    const [enrolled, setEnrolled] = useState(['CS101']);

    // Mock courses
    const electives = [
        { id: 'CS201', name: 'Machine Learning Basics', faculty: 'Dr. Singh', credits: 3, seats: 45, maxSeats: 50, req: 'CS101' },
        { id: 'CS202', name: 'Web Development', faculty: 'Prof. Verma', credits: 3, seats: 12, maxSeats: 50, conflict: true },
        { id: 'HU101', name: 'Psychology 101', faculty: 'Dr. Alisha', credits: 2, seats: 5, maxSeats: 30 },
    ];

    const handleEnroll = (id) => {
        setEnrolled([...enrolled, id]);
        alert(`Successfully enrolled in ${id}`);
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <header>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Course Registration - Spring 2026</h1>
                <p className="text-gray-500 dark:text-gray-400">Choose your electives carefully. Registration closes on 15 March.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Available Courses */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex gap-4 mb-6">
                        <div className="flex-1 bg-white dark:bg-gray-800 flex items-center px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700">
                            <Search className="text-gray-400 dark:text-gray-500 w-5 h-5 mr-3" />
                            <input placeholder="Search courses..." className="bg-transparent w-full outline-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500" />
                        </div>
                        <select className="bg-white dark:bg-gray-800 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 outline-none text-gray-900 dark:text-white">
                            <option>All Departments</option>
                            <option>CS</option>
                            <option>EE</option>
                        </select>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-bold text-gray-700 dark:text-gray-300">Available Electives</h3>
                        {electives.map(course => (
                            <CourseCard
                                key={course.id}
                                course={course}
                                isEnrolled={enrolled.includes(course.id)}
                                onEnroll={() => handleEnroll(course.id)}
                            />
                        ))}
                    </div>
                </div>

                {/* My Schedule Sidebar */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">My Core Courses</h2>
                        <div className="space-y-3">
                            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/40 rounded-lg">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="font-bold text-blue-900 dark:text-blue-300">CS101</h4>
                                        <p className="text-xs text-blue-700 dark:text-blue-400">Programming Fundamentals</p>
                                    </div>
                                    <span className="bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 text-[10px] font-bold px-2 py-1 rounded border border-blue-200 dark:border-blue-800">
                                        4 Credits
                                    </span>
                                </div>
                                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                    <Clock size={12} /> Mon/Wed 10-12 AM
                                </div>
                            </div>
                            <div className="p-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="font-bold text-gray-900 dark:text-white">MATH101</h4>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">Calculus I</p>
                                    </div>
                                    <span className="bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-[10px] font-bold px-2 py-1 rounded border border-gray-200 dark:border-gray-600">
                                        4 Credits
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CourseCard = ({ course, isEnrolled, onEnroll }) => {
    // Logic for seat color
    const seatColor = course.seats > 20
        ? 'text-green-600 dark:text-green-400'
        : course.seats > 10
            ? 'text-yellow-600 dark:text-yellow-400'
            : 'text-red-600 dark:text-red-400';

    return (
        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md dark:hover:shadow-gray-900/30 transition-shadow relative overflow-hidden">
            {isEnrolled && (
                <div className="absolute top-0 right-0 bg-green-500 p-1 rounded-bl-lg">
                    <CheckCircle className="text-white w-4 h-4" />
                </div>
            )}

            <div className="flex justify-between items-start">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-lg text-gray-900 dark:text-white">{course.id}</h4>
                        <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-gray-600 dark:text-gray-400">{course.credits} Credits</span>
                    </div>
                    <h3 className="text-gray-800 dark:text-gray-200 font-medium mb-2">{course.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Faculty: {course.faculty}</p>
                </div>

                <div className="text-right">
                    <p className={`text-sm font-bold ${seatColor} mb-1`}>
                        {course.seats}/{course.maxSeats} Seats
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">Available</p>
                </div>
            </div>

            {/* Warnings or Info */}
            <div className="mt-4 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-2 text-xs">
                    {course.conflict ? (
                        <span className="flex items-center gap-1 text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded">
                            <AlertTriangle size={12} /> Time Conflict
                        </span>
                    ) : course.req ? (
                        <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 px-2 py-1 rounded">
                            <Info size={12} /> Prereq: {course.req}
                        </span>
                    ) : null}
                </div>

                <button
                    onClick={onEnroll}
                    disabled={isEnrolled || course.conflict}
                    className={`
                        px-4 py-2 rounded-lg text-sm font-medium transition-colors
                        ${isEnrolled
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 cursor-default'
                            : course.conflict
                                ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                                : 'bg-gray-900 dark:bg-blue-600 text-white hover:bg-gray-800 dark:hover:bg-blue-700'}
                    `}
                >
                    {isEnrolled ? 'Enrolled' : course.conflict ? 'Schedule Conflict' : '+ Add Course'}
                </button>
            </div>
        </div>
    );
};

export default CourseRegistration;
