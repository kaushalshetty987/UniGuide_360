import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, CreditCard, Calendar, MessageSquare, BookOpen, Users, Settings, LogOut, Home, DollarSign } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const Sidebar = ({ isOpen, closeSidebar }) => {
    const { userRole, logout } = useApp();

    const studentLinks = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/student' },
        { icon: FileText, label: 'Documents', path: '/student/documents' },
        { icon: DollarSign, label: 'Fees', path: '/student/fees' },
        { icon: BookOpen, label: 'Courses', path: '/student/courses' },
        { icon: Calendar, label: 'Timetable', path: '/student/timetable' },
        { icon: Users, label: 'Mentorship', path: '/student/mentorship' },
        { icon: Home, label: 'Hostel', path: '/student/hostel' }, // New Link
    ];

    const parentLinks = [
        { icon: LayoutDashboard, label: 'Overview', path: '/parent' },
        { icon: CreditCard, label: 'Fees & Payments', path: '/parent/fees' }, // Assuming these exist or just placeholder
        { icon: MessageSquare, label: 'Communication', path: '/parent/communication' },
    ];

    const teacherLinks = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/teacher' },
        { icon: BookOpen, label: 'Manage Courses', path: '/teacher/courses' }, // New Link
        { icon: Users, label: 'My Mentees', path: '/teacher/mentees' },
        { icon: Calendar, label: 'Schedule', path: '/teacher/schedule' },
    ];

    const adminLinks = [
        { icon: LayoutDashboard, label: 'Overview', path: '/admin' },
        { icon: Users, label: 'Students', path: '/admin/students' },
        { icon: FileText, label: 'Reports', path: '/admin/reports' },
    ];

    // Determine links based on userRole
    let links = studentLinks;
    if (userRole === 'parent') links = parentLinks;
    else if (userRole === 'teacher') links = teacherLinks;
    else if (userRole === 'admin') links = adminLinks;

    return (
        <>
            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-20 lg:hidden glass"
                    onClick={closeSidebar}
                />
            )}

            <aside className={`
        fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-20 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
                <div className="p-4 space-y-1 overflow-y-auto h-full pb-20">
                    <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                        Main Menu
                    </p>
                    {links.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            end={link.path === '/student' || link.path === '/admin' || link.path === '/parent' || link.path === '/teacher'}
                            onClick={() => window.innerWidth < 1024 && closeSidebar()}
                            className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                ${isActive
                                    ? 'bg-blue-50 text-blue-600 font-medium shadow-sm dark:bg-blue-900/30 dark:text-blue-400'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                                }
              `}
                        >
                            <link.icon className="w-5 h-5" />
                            <span>{link.label}</span>
                        </NavLink>
                    ))}

                    <div className="pt-8 mt-8 border-t border-gray-100 dark:border-gray-700">
                        <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                            System
                        </p>
                        <NavLink to="/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700">
                            <Settings className="w-5 h-5" />
                            <span>Settings</span>
                        </NavLink>
                        <button
                            onClick={logout}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 mt-2"
                        >
                            <LogOut className="w-5 h-5" />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
