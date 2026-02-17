import { mockStudent, mockAnalytics, mockMentees } from '../utils/mockData';

// Simulated delay helper
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const TIMEOUT = 800; // 800ms simulated latency

export const mockApi = {
    login: async (role) => {
        await delay(TIMEOUT);
        if (!['student', 'parent', 'teacher', 'admin'].includes(role)) {
            throw new Error("Invalid role");
        }
        return {
            user: {
                id: role === 'student' ? mockStudent.id : `USER_${role.toUpperCase()}`,
                name: role === 'student' ? mockStudent.name : `${role.charAt(0).toUpperCase() + role.slice(1)} User`,
                role: role,
                avatar: role === 'student' ? mockStudent.avatar : null
            },
            token: "mock-jwt-token-123456"
        };
    },

    getStudentData: async () => {
        await delay(TIMEOUT);
        return mockStudent;
    },

    getAdminData: async () => {
        await delay(TIMEOUT);
        return mockAnalytics;
    },

    // Teacher: Get Mentees
    getMentees: async () => {
        await delay(TIMEOUT);
        return mockMentees;
    },

    // Courses
    getCourses: async () => {
        await delay(TIMEOUT);
        const storedCourses = localStorage.getItem('courses');
        return storedCourses ? JSON.parse(storedCourses) : [
            { id: 101, code: 'CS101', name: 'Intro to Computer Science', instructor: 'Dr. Smith', credits: 4, schedule: 'Mon, Wed 10:00 AM' },
            { id: 102, code: 'MA101', name: 'Calculus I', instructor: 'Prof. Johnson', credits: 3, schedule: 'Tue, Thu 09:00 AM' },
            { id: 103, code: 'PH101', name: 'Physics I', instructor: 'Dr. Brown', credits: 4, schedule: 'Mon, Fri 02:00 PM' }
        ];
    },

    addCourse: async (course) => {
        await delay(TIMEOUT);
        const courses = await mockApi.getCourses();
        const newCourse = { ...course, id: Date.now() };
        const updatedCourses = [...courses, newCourse];
        localStorage.setItem('courses', JSON.stringify(updatedCourses));
        return newCourse;
    },

    registerCourse: async (courseId) => {
        await delay(TIMEOUT);
        // Simulate registration logic
        return { success: true, message: "Registered successfully" };
    },

    // Documents
    getDocuments: async () => {
        await delay(TIMEOUT);
        // Combine mock student documents with any local storage ones if needed
        return mockStudent.documents;
    },

    uploadDocument: async (doc) => {
        await delay(TIMEOUT);
        // In a real app, we'd upload file. Here we just return the metadata.
        return { ...doc, id: Date.now(), status: 'processing', date: 'Just now' };
    },

    verifyDocument: async (docId, status) => {
        await delay(TIMEOUT);
        return { id: docId, status };
    }
};
