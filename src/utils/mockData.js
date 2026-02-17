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
            status: "processing", // changed from in-progress for variety
            progress: 60,
            date: "Pending",
            description: "Mark sheets and certificates verification."
        },
        {
            id: 3,
            title: "Fee Payment",
            status: "pending", // unlocked but not done
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
        { name: "Admission", completed: 500, pending: 0 },
        { name: "Documents", completed: 420, pending: 80 },
        { name: "Fee Payment", completed: 385, pending: 115 },
        { name: "LMS Access", completed: 301, pending: 199 },
        { name: "Training", completed: 156, pending: 344 }
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
        { name: 'Feb', revenue: 7500000 }, // Peak admission
        { name: 'Mar', revenue: 2000000 },
        { name: 'Apr', revenue: 1000000 },
        { name: 'May', revenue: 500000 },
        { name: 'Jun', revenue: 3000000 }, // Semester 2 start
    ]
};

// Teacher Data
export const mockMentees = [
    {
        id: "CS101245",
        name: "Arjun Sharma",
        progress: 67,
        status: "on-track",
        lastContact: "3 days ago",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arjun"
    },
    {
        id: "CS101246",
        name: "Priya Patel",
        progress: 45,
        status: "warning",
        lastContact: "10 days ago",
        issues: "2 pending documents",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya"
    },
    {
        id: "CS101247",
        name: "Rahul Verma",
        progress: 25,
        status: "critical",
        lastContact: "Never",
        issues: "Fee unpaid, No documents",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul"
    }
];
