import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { dbService } from '../services/db';
import { mockStudent, mockAnalytics, mockMentees, mockTeacherCourses, mockTeacherSchedule } from '../utils/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const { userRole, currentUser, logout: authLogout } = useAuth();
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

    const [studentData, setStudentData] = useState(null);
    const [adminData, setAdminData] = useState(null);
    const [mentees, setMentees] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [teacherCourseData, setTeacherCourseData] = useState([]);
    const [teacherSchedule, setTeacherSchedule] = useState(null);

    const [courses, setCourses] = useState([]);
    const [documents, setDocuments] = useState([]);

    // Real-time Subscriptions
    React.useEffect(() => {
        if (!currentUser) return;

        const unsubscribeCourses = dbService.subscribeToCourses((courseList) => {
            setCourses(courseList);
        });

        let unsubscribeDocs = () => { };

        if (userRole === 'student') {
            unsubscribeDocs = dbService.subscribeToStudentDocuments(currentUser.uid, (docList) => {
                setDocuments(docList);
            });
        } else if (userRole === 'admin') {
            unsubscribeDocs = dbService.subscribeToAllDocuments((docList) => {
                setDocuments(docList);
            });
        }

        return () => {
            unsubscribeCourses();
            unsubscribeDocs();
        };
    }, [currentUser, userRole]);

    // Initial Data Load
    React.useEffect(() => {
        if (!currentUser || !userRole) return;

        const isDemoUser = currentUser?.email === 'mamta.shetty48@gmail.com';

        if (isDemoUser) {
            console.log("AppContext: Loading MOCK data for demo user, role:", userRole);
            // Always load all mock data so any role works for the demo account
            setStudentData(mockStudent);
            setAdminData(mockAnalytics);
            setMentees(mockMentees);
            setNotifications(mockStudent.notifications || []);
            setTeacherCourseData(mockTeacherCourses);
            setTeacherSchedule(mockTeacherSchedule);
        } else {
            console.log("AppContext: Loading FRESH state for user with role:", userRole);
            setStudentData({
                name: currentUser?.displayName || 'New Student',
                email: currentUser?.email || '',
                role: userRole,
                avatar: currentUser?.photoURL || 'https://ui-avatars.com/api/?name=Student',
                gpa: 0.0,
                attendance: 0,
                progress: 0,
                year: '1st Year',
                branch: 'Unassigned',
                roadmap: [],
                notifications: [],
                documents: []
            });
            setAdminData(null);
            setMentees([]);
            setNotifications([]);
            setTeacherCourseData([]);
            setTeacherSchedule(null);
        }
    }, [userRole, currentUser]);

    // Theme effect
    React.useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    const logout = async () => {
        await authLogout();
        // Reset all state
        setStudentData(null);
        setAdminData(null);
        setMentees([]);
        setNotifications([]);
        setCourses([]);
        setDocuments([]);
        setTeacherCourseData([]);
        setTeacherSchedule(null);
        window.location.href = '/login';
    };

    // Actions
    const updateProgress = (stageId) => {
        setStudentData(prev => ({
            ...prev,
            roadmap: prev?.roadmap?.map(stage =>
                stage.id === stageId ? { ...stage, status: 'completed', progress: 100 } : stage
            ) || []
        }));
    };

    const markNotificationRead = (id) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    };

    // Real Backend Actions
    const addCourse = async (course) => {
        return await dbService.addCourse(course);
    };

    const registerCourse = async (courseId) => {
        if (!currentUser) return;
        return await dbService.registerForCourse(courseId, currentUser.uid);
    };

    const uploadDocument = async (file) => {
        if (!currentUser) return;
        return await dbService.uploadDocument(file, currentUser.uid, currentUser.displayName || 'Student');
    };

    const verifyDocument = async (docId, status) => {
        return await dbService.updateDocumentStatus(docId, status);
    };

    return (
        <AppContext.Provider value={{
            userRole,
            currentUser,
            theme,
            toggleTheme,
            logout,
            studentData,
            adminData,
            mentees,
            notifications,
            updateProgress,
            markNotificationRead,
            courses,
            documents,
            addCourse,
            registerCourse,
            uploadDocument,
            verifyDocument,
            teacherCourseData,
            teacherSchedule
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => useContext(AppContext);
