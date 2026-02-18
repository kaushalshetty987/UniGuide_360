import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const INITIAL_MESSAGES = [
    { id: 1, type: 'bot', text: 'Hi! I\'m UniBot 🤖, your AI assistant for all things onboarding!' },
    { id: 2, type: 'bot', text: 'Ask me anything — fees, documents, hostel, courses, scholarships, or just say hi! 🎓' }
];

const FAQS = [
    "💰 Fee deadline?",
    "📄 Upload docs?",
    "🏠 Hostel rules?",
    "📅 My timetable?",
    "🎓 Scholarships?",
    "📞 Contact support?",
];

const KNOWLEDGE_BASE = {
    // Fees & Payments
    fee: "The next fee installment of ₹50,000 is due on **28th Feb 2026**. You can pay via UPI, Credit Card, or Net Banking in the 'Pay Fees' section.\n\n💡 **Tip:** Paying early avoids late fees! Visit the Fees page from the sidebar.",
    payment: "We accept **UPI, Credit/Debit Cards, and Net Banking**. All transactions are processed securely. Go to the 'Fees' section in your sidebar to make a payment.",
    installment: "Your fee is split into installments:\n• **1st Installment:** ₹50,000 (Paid ✅)\n• **2nd Installment:** ₹50,000 (Due 28 Feb 2026)\n• **3rd Installment:** ₹50,000 (Due 30 Apr 2026)\n\nVisit the Fees section to pay.",
    refund: "Refund requests should be submitted through the Finance Office. The process takes **7-14 working days**. Contact the finance team at finance@uniguide.edu for support.",

    // Documents
    document: "You can upload documents from the **'Documents'** section in your sidebar. Supported formats: **PDF, JPG, PNG** (max 5MB each).\n\n📋 **Required Documents:**\n• 10th & 12th Mark Sheets\n• Aadhar Card\n• Transfer Certificate\n• Migration Certificate\n• Passport-size Photos",
    upload: "To upload a document:\n1. Go to **Documents** from the sidebar\n2. Click or drag-and-drop a file\n3. Select the document type\n4. Wait for verification (usually 1-3 days)\n\n📍 Supported: PDF, JPG, PNG (max 5MB)",
    verification: "Document verification usually takes **1-3 working days**. You can track the status in the Documents section:\n• ✅ Verified\n• ⏳ Under Review\n• ❌ Rejected (requires re-upload)\n\nIf rejected, you'll see specific reasons and can re-upload immediately.",

    // Hostel
    hostel: "Hostel allocation opens on **March 1st, 2026**. You'll complete a roommate preference survey and get room assignments within a week.\n\n🏠 **Key Details:**\n• AC rooms available (limited)\n• Laundry service included\n• WiFi in all rooms\n• 24/7 security\n\nCheck the Hostel tab for updates.",
    roommate: "Roommate matching starts on **March 1st** based on your preferences:\n• Sleep schedule\n• Study habits\n• Noise preference\n• Food preference\n\nFill out the survey in the Hostel section when it opens!",
    mess: "The hostel mess serves 3 meals daily (Breakfast, Lunch, Dinner). The menu rotates weekly.\n• **Breakfast:** 7:30 - 9:30 AM\n• **Lunch:** 12:00 - 2:00 PM\n• **Dinner:** 7:00 - 9:00 PM\n\nBoth veg and non-veg options are available.",

    // Academic
    schedule: "Your timetable is available in the **'My Timetable'** tab. Classes run **9:00 AM to 4:00 PM** on weekdays. Download the full schedule from the Timetable page.",
    timetable: "Check your personalized timetable from the sidebar → **'Timetable'**. Classes are:\n• **Monday to Friday:** 9:00 AM - 4:00 PM\n• **Saturday:** Optional labs & tutorials\n• **Sunday:** Off day",
    course: "Course registration opens on **March 1st, 2026**. You can choose:\n• Core courses (mandatory)\n• Elective courses (choose 2 from available options)\n\nVisit the Courses section to browse available courses and register.",
    registration: "Course registration opens on **March 1st, 2026**. Make sure you've completed fee payment first — unpaid students cannot register.\n\nSteps:\n1. Browse courses in the Courses section\n2. Add to your course cart\n3. Submit your registration\n4. Wait for confirmation",

    // Exams
    exam: "**Mid-term exams:** April 15th, 2026\n**End-term exams:** June 1st, 2026\n\nExam schedules will be published in your timetable section. Make sure to check seating arrangements 2 days before the exam.",
    result: "Results are published within **2 weeks** of the exam end date. You'll receive a notification and can view them here in the app.",

    // Dates & Events
    holiday: "Upcoming holidays:\n• **Holi:** March 25th, 2026\n• **Good Friday:** April 3rd, 2026\n• **Ambedkar Jayanti:** April 14th, 2026\n\nFull academic calendar is available in the Timetable section.",
    orientation: "**Orientation Day: April 1st, 2026** 🎉\n\nWhat to expect:\n• Campus tour (10 AM - 12 PM)\n• Welcome ceremony (12 - 1 PM)\n• Lunch with faculty (1 - 2 PM)\n• Department sessions (2 - 4 PM)\n• Fresher's social evening (5 - 7 PM)\n\nDon't miss it!",

    // Support & Contact
    contact: "📞 **Need help?** Here's how to reach us:\n\n• **Email:** support@uniguide.edu\n• **Phone:** +91-9136127041 (Mon-Sat 9AM-6PM)\n• **WhatsApp:** +91-9136127041\n• **In-person:** Admin Office, Ground Floor\n\nFor urgent matters, call the helpline.",
    mentor: "A faculty mentor will be assigned to you on **March 20th, 2026**. Your mentor helps with:\n• Academic guidance\n• Career counseling\n• Personal support\n• Document issues\n\nYou can message your mentor through the Mentorship section.",

    // Scholarship
    scholarship: "**Available Scholarships:**\n• Merit Scholarship (Top 10% students)\n• Need-based Financial Aid\n• SC/ST/OBC Scholarships\n• Sports Scholarship\n\nApplication deadline: **March 15th, 2026**. Contact the scholarship office at scholarship@uniguide.edu for more details.",

    // Library
    library: "The campus library is open:\n• **Weekdays:** 8:00 AM - 10:00 PM\n• **Weekends:** 9:00 AM - 6:00 PM\n\nYou'll receive your library card after LMS onboarding (opens March 15th). You can borrow up to **5 books** at a time.",

    // Transport
    transport: "🚌 **Campus Bus Service:**\n• Covers major areas in the city\n• Pick-up: 7:30 AM - 8:30 AM\n• Drop: 4:30 PM - 5:30 PM\n\nFee: ₹5,000/semester. Register via the Admin Office.\n\nAlternatively, the campus has parking for two-wheelers and cars.",

    // Medical
    medical: "🏥 **Campus Health Center:**\n• Open 24/7 for emergencies\n• OPD: 9 AM - 5 PM (Mon-Sat)\n• Free consultations for enrolled students\n• Health insurance covered under university policy\n\nEmergency number: +91-9876543299",

    // Greetings
    hello: "Hello! 👋 I'm UniBot, your friendly campus assistant. Feel free to ask me about fees, documents, hostel, courses, scholarships, or anything related to your college journey!",
    thanks: "You're welcome! 😊 If you have any more questions, I'm always here to help. Good luck with your onboarding! 🎓",
    bye: "Goodbye! 👋 Don't hesitate to come back if you need anything. All the best! 🌟",
};

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState(INITIAL_MESSAGES);
    const [inputText, setInputText] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const getBotResponse = (query) => {
        const q = query.toLowerCase().trim();

        // Greetings
        if (/^(hi|hello|hey|hii+|hola|namaste|good\s*(morning|afternoon|evening))/.test(q)) return KNOWLEDGE_BASE.hello;
        if (/^(thanks?|thank\s*you|ty|dhanyavaad)/i.test(q)) return KNOWLEDGE_BASE.thanks;
        if (/^(bye|goodbye|see\s*you|tata)/i.test(q)) return KNOWLEDGE_BASE.bye;

        // Fee & Payment
        if (/fee.*deadline|when.*fee|fee.*due|fee.*last.*date|payment.*due/i.test(q)) return KNOWLEDGE_BASE.fee;
        if (/how.*pay|payment.*method|pay.*fee|upi|credit.*card/i.test(q)) return KNOWLEDGE_BASE.payment;
        if (/install?ment|fee.*break|split.*fee/i.test(q)) return KNOWLEDGE_BASE.installment;
        if (/refund|money.*back|cancel.*fee/i.test(q)) return KNOWLEDGE_BASE.refund;
        if (/fee|pay|billing|tuition|charge/i.test(q)) return KNOWLEDGE_BASE.fee;

        // Documents
        if (/how.*upload|upload.*doc|submit.*doc/i.test(q)) return KNOWLEDGE_BASE.upload;
        if (/verif|doc.*status|doc.*pending|doc.*reject/i.test(q)) return KNOWLEDGE_BASE.verification;
        if (/what.*doc|required.*doc|which.*doc|document.*needed|doc.*list/i.test(q)) return KNOWLEDGE_BASE.document;
        if (/doc|certificate|mark\s*sheet|aadhar|migration/i.test(q)) return KNOWLEDGE_BASE.document;

        // Hostel
        if (/room\s*mate|roommate/i.test(q)) return KNOWLEDGE_BASE.roommate;
        if (/mess|food|canteen|meal|breakfast|lunch|dinner/i.test(q)) return KNOWLEDGE_BASE.mess;
        if (/hostel|accommodation|stay|dorm|room\s*alloc/i.test(q)) return KNOWLEDGE_BASE.hostel;

        // Academic
        if (/course.*reg|register.*course|elective|credit/i.test(q)) return KNOWLEDGE_BASE.registration;
        if (/course|subject|syllabus/i.test(q)) return KNOWLEDGE_BASE.course;
        if (/time\s*table|schedule|class.*time|lecture/i.test(q)) return KNOWLEDGE_BASE.timetable;

        // Exams
        if (/result|grade|gpa|score|marks/i.test(q)) return KNOWLEDGE_BASE.result;
        if (/exam|test|mid\s*term|end\s*term|mid-term/i.test(q)) return KNOWLEDGE_BASE.exam;

        // Dates & Events
        if (/orientation|welcome|fresher/i.test(q)) return KNOWLEDGE_BASE.orientation;
        if (/holiday|leave|off\s*day|vacation/i.test(q)) return KNOWLEDGE_BASE.holiday;

        // Support
        if (/mentor|faculty.*advi|counsel/i.test(q)) return KNOWLEDGE_BASE.mentor;
        if (/contact|support|help.*desk|phone|email|complaint/i.test(q)) return KNOWLEDGE_BASE.contact;

        // Extras
        if (/scholar|financial.*aid|merit|stipend/i.test(q)) return KNOWLEDGE_BASE.scholarship;
        if (/library|book|borrow/i.test(q)) return KNOWLEDGE_BASE.library;
        if (/bus|transport|parking|commute/i.test(q)) return KNOWLEDGE_BASE.transport;
        if (/medical|health|doctor|hospital|clinic|insurance/i.test(q)) return KNOWLEDGE_BASE.medical;

        return "I'm not sure about that specific topic yet, but I'm learning every day! 📚\n\nTry asking about:\n• **Fees & Payments** 💰\n• **Documents** 📄\n• **Hostel & Mess** 🏠\n• **Course Registration** 📝\n• **Exams & Results** 📊\n• **Scholarships** 🎓\n• **Library** 📚\n• **Transport** 🚌\n• **Medical Services** 🏥\n• **Contact Support** 📞";
    };

    const handleSend = (text = inputText) => {
        if (!text.trim()) return;

        const userMsg = { id: Date.now(), type: 'user', text: text };
        setMessages(prev => [...prev, userMsg]);
        setInputText("");
        setIsTyping(true);

        setTimeout(() => {
            const botResponseText = getBotResponse(text);
            const botMsg = { id: Date.now() + 1, type: 'bot', text: botResponseText };
            setMessages(prev => [...prev, botMsg]);
            setIsTyping(false);
        }, 800 + Math.random() * 700);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Toggle Button — larger and pulsing */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white p-4 rounded-full shadow-2xl transition-all hover:scale-110 flex items-center justify-center group"
                >
                    <div className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-30"></div>
                    <MessageCircle size={28} />
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white text-[8px] font-bold flex items-center justify-center">!</span>
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="bg-white dark:bg-gray-900 w-[350px] sm:w-[420px] rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col h-[550px] transition-all duration-300">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-4 flex justify-between items-center text-white">
                        <div className="flex items-center gap-3">
                            <div className="bg-white/20 p-2 rounded-xl">
                                <Sparkles size={22} />
                            </div>
                            <div>
                                <h3 className="font-bold text-base">UniBot AI</h3>
                                <p className="text-xs text-blue-100 flex items-center gap-1">
                                    <span className="w-2 h-2 bg-green-400 rounded-full inline-block"></span> Always online
                                </p>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1.5 rounded-full transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-800/50">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`
                                    max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line
                                    ${msg.type === 'user'
                                        ? 'bg-blue-600 text-white rounded-br-none'
                                        : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-bl-none shadow-sm'
                                    }
                                `}>
                                    {msg.text.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
                                        part.startsWith('**') && part.endsWith('**')
                                            ? <strong key={i}>{part.slice(2, -2)}</strong>
                                            : part
                                    )}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl rounded-bl-none border border-gray-200 dark:border-gray-700 shadow-sm flex gap-1.5">
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></span>
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick FAQ Chips — always show when few messages */}
                    {messages.length < 5 && (
                        <div className="px-3 py-2 flex gap-2 overflow-x-auto no-scrollbar bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-700">
                            {FAQS.map((faq, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleSend(faq)}
                                    className="whitespace-nowrap bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs px-3 py-1.5 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:text-blue-600 dark:hover:text-blue-400 transition-colors border border-gray-200 dark:border-gray-600"
                                >
                                    {faq}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Input Area */}
                    <div className="p-3 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-700">
                        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2.5 border border-transparent focus-within:border-blue-500 transition-colors">
                            <input
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Ask anything about onboarding..."
                                className="bg-transparent flex-1 outline-none text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400"
                            />
                            <button
                                onClick={() => handleSend()}
                                disabled={!inputText.trim()}
                                className={`p-2 rounded-full transition-all ${inputText.trim() ? 'bg-blue-600 text-white hover:bg-blue-700' : 'text-gray-400'}`}
                            >
                                <Send size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
