// Student Data
export const mockStudent = {
    id: "CS101245",
    name: "Arjun Sharma",
    email: "arjun.sharma@college.edu",
    department: "Computer Science",
    year: 1,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun",
    progress: 67,
    status: "on-track",
    roadmap: [
        {
            id: 1,
            title: "Admission Confirmed",
            status: "completed",
            date: "15 Jan 2026",
            description: "Admission letter received and initial formalities completed."
        },
        {
            id: 2,
            title: "Document Verification",
            status: "processing",
            progress: 60,
            date: "Pending",
            description: "Mark sheets and certificates verification."
        },
        {
            id: 3,
            title: "Fee Payment",
            status: "pending",
            date: "Due 28 Feb 2026",
            description: "First semester tuition and hostel fees."
        },
        {
            id: 4,
            title: "Course Registration",
            status: "locked",
            date: "Opens 1 Mar 2026",
            description: "Select electives and core courses."
        },
        {
            id: 5,
            title: "Hostel Allocation",
            status: "locked",
            date: "Opens 5 Mar 2026",
            description: "Room preference and allocation."
        },
        {
            id: 6,
            title: "LMS Onboarding",
            status: "locked",
            date: "Opens 15 Mar 2026",
            description: "Access to Learning Management System."
        },
        {
            id: 7,
            title: "Mentor Assignment",
            status: "locked",
            date: "Opens 20 Mar 2026",
            description: "Meet your faculty mentor."
        },
        {
            id: 8,
            title: "Orientation Day",
            status: "locked",
            date: "1 Apr 2026",
            description: "Welcome ceremony and campus tour."
        }
    ],
    notifications: [
        {
            id: 1,
            type: "urgent",
            title: "Fee Payment Due",
            message: "Your 2nd installment of ₹50,000 is due in 3 days",
            time: "2 hours ago",
            read: false
        },
        {
            id: 2,
            type: "success",
            title: "Document Verified",
            message: "Your 10th Mark Sheet has been successfully verified.",
            time: "1 day ago",
            read: true
        },
        {
            id: 3,
            type: "info",
            title: "Orientation Schedule",
            message: "Orientation day schedule has been released. Check your calendar.",
            time: "2 days ago",
            read: true
        }
    ],
    documents: [
        { id: 1, name: "10th Mark Sheet", status: "verified", date: "16 Feb 2026" },
        { id: 2, name: "12th Mark Sheet", status: "verified", date: "16 Feb 2026" },
        { id: 3, name: "Aadhar Card", status: "verified", date: "17 Feb 2026" },
        { id: 4, name: "Transfer Certificate", status: "processing", date: "Uploaded 2h ago" },
        { id: 5, name: "Migration Certificate", status: "rejected", reason: "Unclear scan", date: "Rejected 1d ago" }
    ],
    fees: {
        total: 150000,
        paid: 50000,
        pending: 100000,
        due: 50000,
        dueDate: "28 Feb",
        nextDue: "28 Feb 2026",
        history: [
            { id: 1, amount: 50000, date: "10 Feb 2026", method: "UPI", status: "success" }
        ]
    }
};

// Admin Analytics Data
export const mockAnalytics = {
    overall: {
        totalStudents: 500,
        started: 487,
        completed: 123,
        onTrack: 289,
        atRisk: 75,
        critical: 13
    },
    stageCompletion: [
        { name: "Admission", completed: 500, pending: 0, completion: 100 },
        { name: "Documents", completed: 420, pending: 80, completion: 84 },
        { name: "Fee Payment", completed: 385, pending: 115, completion: 77 },
        { name: "LMS Access", completed: 301, pending: 199, completion: 60 },
        { name: "Training", completed: 156, pending: 344, completion: 31 }
    ],
    bottlenecks: [
        {
            id: 1,
            severity: "critical",
            title: "Document Verification Backlog",
            count: 80,
            description: "80 students pending verification. Avg wait: 4.2 days."
        },
        {
            id: 2,
            severity: "warning",
            title: "Fee Payment Deadline",
            count: 115,
            description: "115 students haven't paid. Deadline in 3 days."
        }
    ],
    revenueStats: [
        { name: 'Jan', revenue: 4000000 },
        { name: 'Feb', revenue: 7500000 },
        { name: 'Mar', revenue: 2000000 },
        { name: 'Apr', revenue: 1000000 },
        { name: 'May', revenue: 500000 },
        { name: 'Jun', revenue: 3000000 },
    ]
};

// Teacher Data — Mentees (expanded with more fields)
export const mockMentees = [
    {
        id: "CS101245",
        name: "Arjun Sharma",
        email: "arjun.sharma@college.edu",
        department: "Computer Science",
        year: "1st Year",
        progress: 67,
        status: "on-track",
        lastContact: "3 days ago",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun",
        phone: "+91 98765 43210",
        documents: { total: 5, verified: 3, pending: 1, rejected: 1 },
        fees: { paid: 50000, total: 150000 },
        notes: [
            { date: "15 Feb 2026", text: "Discussed document submission timeline. Student is on track." },
            { date: "10 Feb 2026", text: "Initial mentoring session completed. Good academic background." }
        ]
    },
    {
        id: "CS101246",
        name: "Priya Patel",
        email: "priya.patel@college.edu",
        department: "Computer Science",
        year: "1st Year",
        progress: 45,
        status: "warning",
        lastContact: "10 days ago",
        issues: "2 pending documents",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
        phone: "+91 87654 32109",
        documents: { total: 5, verified: 2, pending: 2, rejected: 1 },
        fees: { paid: 50000, total: 150000 },
        notes: [
            { date: "8 Feb 2026", text: "Student has not responded to document re-upload request. Follow up needed." }
        ]
    },
    {
        id: "CS101247",
        name: "Rahul Verma",
        email: "rahul.verma@college.edu",
        department: "Computer Science",
        year: "1st Year",
        progress: 25,
        status: "critical",
        lastContact: "Never",
        issues: "Fee unpaid, No documents",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul",
        phone: "+91 76543 21098",
        documents: { total: 5, verified: 0, pending: 0, rejected: 0 },
        fees: { paid: 0, total: 150000 },
        notes: []
    },
    {
        id: "CS101248",
        name: "Sneha Reddy",
        email: "sneha.reddy@college.edu",
        department: "Computer Science",
        year: "1st Year",
        progress: 90,
        status: "on-track",
        lastContact: "1 day ago",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha",
        phone: "+91 65432 10987",
        documents: { total: 5, verified: 5, pending: 0, rejected: 0 },
        fees: { paid: 150000, total: 150000 },
        notes: [
            { date: "17 Feb 2026", text: "All documents verified. Fee fully paid. Ready for course registration." },
            { date: "12 Feb 2026", text: "Excellent progress. Recommended for early LMS access." }
        ]
    },
    {
        id: "EE101301",
        name: "Amit Joshi",
        email: "amit.joshi@college.edu",
        department: "Electrical Engineering",
        year: "1st Year",
        progress: 55,
        status: "on-track",
        lastContact: "5 days ago",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amit",
        phone: "+91 54321 09876",
        documents: { total: 5, verified: 3, pending: 2, rejected: 0 },
        fees: { paid: 50000, total: 150000 },
        notes: [
            { date: "13 Feb 2026", text: "Waiting for transfer certificate from previous institution." }
        ]
    }
];

// Teacher Courses (mock for demo user)
export const mockTeacherCourses = [
    {
        id: "tc1",
        code: "CS301",
        name: "Data Structures & Algorithms",
        credits: 4,
        schedule: "Mon, Wed, Fri 9:00 - 10:00 AM",
        room: "LH-201",
        students: 45,
        description: "Fundamental data structures including arrays, linked lists, trees, graphs, and sorting algorithms.",
    },
    {
        id: "tc2",
        code: "CS401",
        name: "Machine Learning",
        credits: 3,
        schedule: "Tue, Thu 2:00 - 3:30 PM",
        room: "CS Lab-3",
        students: 38,
        description: "Introduction to supervised and unsupervised learning, neural networks, and practical ML applications.",
    },
    {
        id: "tc3",
        code: "CS205",
        name: "Database Systems",
        credits: 3,
        schedule: "Mon, Wed 11:00 AM - 12:00 PM",
        room: "LH-105",
        students: 52,
        description: "Relational databases, SQL, normalization, indexing, and transaction management.",
    },
    {
        id: "tc4",
        code: "CS490",
        name: "Capstone Project Seminar",
        credits: 2,
        schedule: "Fri 3:00 - 5:00 PM",
        room: "Seminar Hall-2",
        students: 16,
        description: "Guided capstone project presentations, peer reviews, and milestone tracking.",
    }
];

// Teacher Weekly Schedule (mock for demo user)
export const mockTeacherSchedule = {
    Monday: [
        { time: "9:00 - 10:00 AM", title: "CS301 — Data Structures", type: "lecture", room: "LH-201" },
        { time: "10:30 - 11:30 AM", title: "Office Hours", type: "office", room: "Faculty Office 12" },
        { time: "11:00 AM - 12:00 PM", title: "CS205 — Database Systems", type: "lecture", room: "LH-105" },
        { time: "2:00 - 3:00 PM", title: "Department Meeting", type: "meeting", room: "Conference Room A" },
    ],
    Tuesday: [
        { time: "10:00 - 11:00 AM", title: "Research Group Meeting", type: "meeting", room: "CS Lab-1" },
        { time: "2:00 - 3:30 PM", title: "CS401 — Machine Learning", type: "lecture", room: "CS Lab-3" },
        { time: "4:00 - 5:00 PM", title: "Mentee Check-ins", type: "mentoring", room: "Faculty Office 12" },
    ],
    Wednesday: [
        { time: "9:00 - 10:00 AM", title: "CS301 — Data Structures", type: "lecture", room: "LH-201" },
        { time: "11:00 AM - 12:00 PM", title: "CS205 — Database Systems", type: "lecture", room: "LH-105" },
        { time: "1:00 - 2:00 PM", title: "Curriculum Committee", type: "meeting", room: "Admin Block" },
    ],
    Thursday: [
        { time: "10:00 - 11:30 AM", title: "Office Hours", type: "office", room: "Faculty Office 12" },
        { time: "2:00 - 3:30 PM", title: "CS401 — Machine Learning", type: "lecture", room: "CS Lab-3" },
        { time: "4:00 - 5:00 PM", title: "Lab Evaluation — CS301", type: "lab", room: "CS Lab-2" },
    ],
    Friday: [
        { time: "9:00 - 10:00 AM", title: "CS301 — Data Structures", type: "lecture", room: "LH-201" },
        { time: "11:00 AM - 12:00 PM", title: "Office Hours", type: "office", room: "Faculty Office 12" },
        { time: "3:00 - 5:00 PM", title: "CS490 — Capstone Seminar", type: "lecture", room: "Seminar Hall-2" },
    ],
};
