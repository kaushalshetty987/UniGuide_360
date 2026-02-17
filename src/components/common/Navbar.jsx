import React from 'react';
import { Bell, Search, Menu, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const Navbar = ({ toggleSidebar }) => {
    const { userRole, notifications, theme, toggleTheme } = useApp();
    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-16 fixed w-full top-0 z-30 flex items-center justify-between px-4 lg:px-6 transition-colors duration-300">
            <div className="flex items-center gap-4">
                <button onClick={toggleSidebar} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg lg:hidden text-gray-600 dark:text-gray-300">
                    <Menu className="w-6 h-6" />
                </button>
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                        U
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        UniGuide 360
                    </span>
                </div>
            </div>

            <div className="flex items-center gap-4">
                {/* Search - Hidden on mobile */}
                <div className="hidden md:flex items-center bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2 w-64">
                    <Search className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-transparent border-none outline-none text-sm w-full text-gray-700 dark:text-gray-200"
                    />
                </div>

                {/* Theme Toggle */}
                <button onClick={toggleTheme} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                    {theme === 'dark' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sun w-6 h-6 text-yellow-500"><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" /></svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-moon w-6 h-6 text-gray-600"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg>
                    )}
                </button>

                {/* Notifications */}
                <button className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                    <Bell className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                    {unreadCount > 0 && (
                        <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center border-2 border-white dark:border-gray-800">
                            {unreadCount}
                        </span>
                    )}
                </button>

                {/* Profile */}
                <div className="flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-gray-700">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">Arjun Sharma</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{userRole}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center overflow-hidden border-2 border-white dark:border-gray-700 shadow-sm">
                        <User className="w-6 h-6 text-gray-500 dark:text-gray-300" />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
