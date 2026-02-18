import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AuthProvider, useAuth } from './context/AuthContext';

// Layouts
import DashboardLayout from './components/common/DashboardLayout';

// Pages
import StudentDashboard from './pages/StudentDashboard';
import ParentDashboard from './pages/ParentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import AdminDashboard from './pages/AdminDashboard';
import FeePayment from './components/student/FeePayment';
import CourseRegistration from './components/student/CourseRegistration';
import Documents from './pages/student/Documents';
import Timetable from './pages/student/Timetable';
import Mentorship from './pages/student/Mentorship';
import Hostel from './pages/student/Hostel';
import TeacherCourses from './pages/teacher/TeacherCourses';
import TeacherMentees from './pages/teacher/TeacherMentees';
import TeacherSchedule from './pages/teacher/TeacherSchedule';
import AdminStudents from './pages/admin/AdminStudents';
import AdminReports from './pages/admin/AdminReports';
import ParentFees from './pages/parent/ParentFees';
import ParentCommunication from './pages/parent/ParentCommunication';

// Components
import Chatbot from './components/common/Chatbot';
import Login from './pages/Login';

const PublicRoute = ({ children }) => {
    const { currentUser, userRole } = useAuth();
    if (currentUser && userRole) {
        return <Navigate to={`/${userRole}`} replace />;
    }
    return children;
};

const ProtectedRoute = ({ children }) => {
    const { currentUser } = useAuth();
    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

function App() {
    return (
        <Router>
            <AuthProvider>
                <AppProvider>
                    <div className="relative">
                        <Chatbot />
                        <Routes>
                            <Route path="/" element={<Navigate to="/login" replace />} />
                            <Route path="/login" element={
                                <PublicRoute>
                                    <Login />
                                </PublicRoute>
                            } />

                            <Route element={
                                <ProtectedRoute>
                                    <DashboardLayout />
                                </ProtectedRoute>
                            }>
                                {/* Student */}
                                <Route path="/student" element={<StudentDashboard />} />
                                <Route path="/student/fees" element={<FeePayment />} />
                                <Route path="/student/courses" element={<CourseRegistration />} />
                                <Route path="/student/documents" element={<Documents />} />
                                <Route path="/student/timetable" element={<Timetable />} />
                                <Route path="/student/mentorship" element={<Mentorship />} />
                                <Route path="/student/hostel" element={<Hostel />} />

                                {/* Parent */}
                                <Route path="/parent" element={<ParentDashboard />} />
                                <Route path="/parent/fees" element={<ParentFees />} />
                                <Route path="/parent/communication" element={<ParentCommunication />} />

                                {/* Teacher */}
                                <Route path="/teacher" element={<TeacherDashboard />} />
                                <Route path="/teacher/courses" element={<TeacherCourses />} />
                                <Route path="/teacher/mentees" element={<TeacherMentees />} />
                                <Route path="/teacher/schedule" element={<TeacherSchedule />} />

                                {/* Admin */}
                                <Route path="/admin" element={<AdminDashboard />} />
                                <Route path="/admin/students" element={<AdminStudents />} />
                                <Route path="/admin/reports" element={<AdminReports />} />
                            </Route>
                        </Routes>
                    </div>
                </AppProvider>
            </AuthProvider>
        </Router>
    );
}

export default App;
