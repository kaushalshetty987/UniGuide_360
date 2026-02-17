import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Plus, BookOpen, Clock, Calendar, Users, Check } from 'lucide-react';

const TeacherCourses = () => {
    const { courses, addCourse } = useApp();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newCourse, setNewCourse] = useState({
        code: '',
        name: '',
        credits: 3,
        schedule: '',
        description: ''
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await addCourse({
                ...newCourse,
                instructor: "Prof. You", // Ideally would come from auth context
                students: 0
            });
            setIsModalOpen(false);
            setNewCourse({ code: '', name: '', credits: 3, schedule: '', description: '' });
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Course Management</h1>
                    <p className="text-gray-500 dark:text-gray-400">Create and manage your academic courses.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg shadow-blue-500/30 transition-all"
                >
                    <Plus size={20} /> Add New Course
                </button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map(course => (
                    <div key={course.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-6 relative overflow-hidden group hover:shadow-md transition-all">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <BookOpen size={64} className="text-blue-600" />
                        </div>

                        <div className="mb-4">
                            <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                                {course.code}
                            </span>
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">{course.name}</h3>

                        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
                            <div className="flex items-center gap-2">
                                <Clock size={16} />
                                <span>{course.credits} Credits</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar size={16} />
                                <span>{course.schedule}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Users size={16} />
                                <span>{course.students || 0} Students Enrolled</span>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white py-2 rounded-lg text-sm font-medium transition-colors">
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Course Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
                        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Add New Course</h2>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Course Code</label>
                                    <input
                                        required
                                        value={newCourse.code}
                                        onChange={e => setNewCourse({ ...newCourse, code: e.target.value })}
                                        placeholder="e.g. CS102"
                                        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Credits</label>
                                    <select
                                        value={newCourse.credits}
                                        onChange={e => setNewCourse({ ...newCourse, credits: Number(e.target.value) })}
                                        className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                    >
                                        {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Course Name</label>
                                <input
                                    required
                                    value={newCourse.name}
                                    onChange={e => setNewCourse({ ...newCourse, name: e.target.value })}
                                    placeholder="e.g. Advanced Algorithms"
                                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Schedule</label>
                                <input
                                    required
                                    value={newCourse.schedule}
                                    onChange={e => setNewCourse({ ...newCourse, schedule: e.target.value })}
                                    placeholder="e.g. Mon, Wed 10:00 AM"
                                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
                                >
                                    {loading ? 'Creating...' : <>Create Course</>}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TeacherCourses;
