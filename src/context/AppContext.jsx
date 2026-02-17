import React, { createContext, useContext, useState } from 'react';
import { mockApi } from '../services/mockApi';
import { mockStudent, mockAnalytics, mockMentees } from '../utils/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    // Initialize state from localStorage if available
    const [userRole, setUserRole] = useState(() => localStorage.getItem('userRole') || 'student');
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

    const [studentData, setStudentData] = useState(mockStudent);
    const [adminData, setAdminData] = useState(mockAnalytics);
    const [mentees, setMentees] = useState(mockMentees);
    const [notifications, setNotifications] = useState(mockStudent.notifications);

    // Phase 3: New State
    const [courses, setCourses] = useState([]);
    const [documents, setDocuments] = useState(mockStudent.documents);

    // Initial Data Fetch
    React.useEffect(() => {
        const loadInitialData = async () => {
            try {
                // Determine what to load based on role (simulate)
                const courseList = await mockApi.getCourses();
                setCourses(courseList);

                // For admin, we would load all docs, for student just theirs. 
                // Currently mockApi returns student docs.
                const docs = await mockApi.getDocuments();
                // Merge with any local "uploaded" docs if strict persistence needed
                setDocuments(docs);
            } catch (error) {
                console.error("Failed to load initial data", error);
            }
        };
        loadInitialData();
    }, []);

    // Effect to apply theme class
    React.useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    // Effect to save userRole
    React.useEffect(() => {
        localStorage.setItem('userRole', userRole);
    }, [userRole]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    const logout = () => {
        localStorage.removeItem('userRole');
        setUserRole('guest');
        window.location.href = '/login';
    };

    // Actions
    const updateProgress = (stageId) => {
        setStudentData(prev => ({
            ...prev,
            roadmap: prev.roadmap.map(stage =>
                stage.id === stageId ? { ...stage, status: 'completed', progress: 100 } : stage
            ),
        }));
    };

    const markNotificationRead = (id) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    };

    // Phase 3: New Actions
    const addCourse = async (course) => {
        const newCourse = await mockApi.addCourse(course);
        setCourses(prev => [...prev, newCourse]);
        return newCourse;
    };

    const registerCourse = async (courseId) => {
        await mockApi.registerCourse(courseId);
        // Optimistic update or refetch could happen here
        // For now, toggle a "registered" state in local courses if we had one
        // or just return success
        return true;
    };

    const uploadDocument = async (doc) => {
        const newDoc = await mockApi.uploadDocument(doc);
        setDocuments(prev => [newDoc, ...prev]);
        setStudentData(prev => ({ // Update notification or status if needed
            ...prev,
            notifications: [{ id: Date.now(), title: "Document Uploaded", message: `${doc.name} uploaded successfully.`, type: "success", time: "Just now", read: false }, ...prev.notifications]
        }));
    };

    const verifyDocument = async (docId, status) => {
        // Find doc name for notification
        const doc = documents.find(d => d.id === docId);

        setDocuments(prev => prev.map(d => d.id === docId ? { ...d, status } : d));

        // Notify student (Simulated by adding to studentData since context is shared)
        if (doc) {
            setStudentData(prev => ({
                ...prev,
                notifications: [{
                    id: Date.now(),
                    title: `Document ${status === 'verified' ? 'Approved' : 'Rejected'}`,
                    message: `Your ${doc.name} has been ${status}.`,
                    type: status === 'verified' ? "success" : "urgent",
                    time: "Just now",
                    read: false
                }, ...prev.notifications]
            }));
        }
    };

    return (
        <AppContext.Provider value={{
            userRole,
            setUserRole,
            theme,
            toggleTheme,
            logout,
            studentData,
            adminData,
            mentees,
            notifications,
            updateProgress,
            markNotificationRead,
            // New Exports
            courses,
            documents,
            addCourse,
            registerCourse,
            uploadDocument,
            verifyDocument
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => useContext(AppContext);
