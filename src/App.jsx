import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';

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

// Components
import Chatbot from './components/common/Chatbot';
import Login from './pages/Login';

function App() {
    return (
        <Router>
            <AppProvider>
                <div className="relative">
                    <Chatbot />
                    <Routes>
                        <Route path="/" element={<Navigate to="/login" replace />} />
                        <Route path="/login" element={<Login />} />

                        <Route element={<DashboardLayout />}>
                            <Route path="/student" element={<StudentDashboard />} />
                            <Route path="/student/fees" element={<FeePayment />} />
                            <Route path="/student/courses" element={<CourseRegistration />} />
                            <Route path="/student/documents" element={<Documents />} />
                            <Route path="/student/timetable" element={<Timetable />} />
                            <Route path="/student/mentorship" element={<Mentorship />} />
                            <Route path="/student/hostel" element={<Hostel />} />

                            <Route path="/parent/*" element={<ParentDashboard />} />

                            {/* Teacher Routes */}
                            <Route path="/teacher" element={<TeacherDashboard />} />
                            <Route path="/teacher/courses" element={<TeacherCourses />} />

                            <Route path="/admin/*" element={<AdminDashboard />} />
                        </Route>
                    </Routes>
                </div>
            </AppProvider>
        </Router>
    );
}

export default App;
