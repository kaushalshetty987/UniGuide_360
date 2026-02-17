import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BookOpen, Clock, Calendar, CheckCircle, AlertCircle } from 'lucide-react';

const CourseList = () => {
    const { courses, registerCourse, studentData } = useApp();
    const [registering, setRegistering] = useState(null);
    const [registered, setRegistered] = useState([]); // Local state for immediate feedback

    const handleRegister = async (courseId) => {
        setRegistering(courseId);
        try {
            await registerCourse(courseId);
            setRegistered(prev => [...prev, courseId]);
        } catch (error) {
            console.error("Registration failed", error);
        } finally {
            setRegistering(null);
        }
    };

    // Filter courses that are already in student's roadmap or completed (mock logic)
    // For MVP, we just show all available courses from context

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {courses.map(course => {
                    const isRegistered = registered.includes(course.id);

                    return (
                        <div key={course.id} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start mb-2">
                                    <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                                        {course.code}
                                    </span>
                                    <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                                        {course.credits} Credits
                                    </span>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{course.name}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Instructor: {course.instructor}</p>

                                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
                                    <div className="flex items-center gap-1">
                                        <Calendar size={16} /> {course.schedule}
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => handleRegister(course.id)}
                                disabled={isRegistered || registering === course.id}
                                className={`w-full py-2.5 rounded-lg font-medium transition-all flex items-center justify-center gap-2
                                    ${isRegistered
                                        ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 cursor-default'
                                        : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200 dark:shadow-none'
                                    }
                                `}
                            >
                                {registering === course.id ? (
                                    <span className="animate-pulse">Processing...</span>
                                ) : isRegistered ? (
                                    <>
                                        <CheckCircle size={18} /> Registered
                                    </>
                                ) : (
                                    'Register Now'
                                )}
                            </button>
                        </div>
                    );
                })}
            </div>

            {courses.length === 0 && (
                <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
                    <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">No courses available</h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Check back later for new course offerings.</p>
                </div>
            )}
        </div>
    );
};

export default CourseList;
