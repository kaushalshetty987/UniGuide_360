import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const INITIAL_MESSAGES = [
    { id: 1, type: 'bot', text: 'Hi! I am UniBot 🤖. How can I help you today?' },
    { id: 2, type: 'bot', text: 'You can ask me about fees, documents, hostel, or your schedule.', isOptions: true }
];

const FAQS = [
    "When is the fee deadline?",
    "How to upload documents?",
    "Hostel rules?",
    "My timetable?"
];

const KNOWLEDGE_BASE = {
    fee: "The next fee installment of ₹50,000 is due on 28th Feb 2026. You can pay via the 'Pay Fees' section.",
    payment: "Payments can be made via UPI, Credit Card, or Net Banking in the Fees portal.",
    document: "You can upload your documents in the 'Upload Documents' section. Make sure they are in PDF format.",
    hostel: "Hostel allocation is currently locked. Roommate matching will begin on March 1st. You can check the 'Hostel' tab for updates.",
    schedule: "Your timetable is available in the 'My Timetable' tab. Classes start at 9:00 AM.",
    timetable: "You have classes from 9 AM to 4 PM on weekdays. Check the specific slot in 'My Timetable'.",
    exam: "Mid-term exams are scheduled for April 15th, 2026. Prepare well!",
    holiday: "The next holiday is for Holi on March 25th.",
    contact: "You can contact support at support@uniguide.edu or call +91-9876543210."
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
        const lowerQuery = query.toLowerCase();

        // Simple keyword matching
        if (lowerQuery.includes('fee') || lowerQuery.includes('pay')) return KNOWLEDGE_BASE.fee;
        if (lowerQuery.includes('doc') || lowerQuery.includes('upload')) return KNOWLEDGE_BASE.document;
        if (lowerQuery.includes('hostel') || lowerQuery.includes('room')) return KNOWLEDGE_BASE.hostel;
        if (lowerQuery.includes('class') || lowerQuery.includes('schedule') || lowerQuery.includes('time')) return KNOWLEDGE_BASE.schedule;
        if (lowerQuery.includes('exam')) return KNOWLEDGE_BASE.exam;
        if (lowerQuery.includes('help') || lowerQuery.includes('contact')) return KNOWLEDGE_BASE.contact;
        if (lowerQuery.includes('hello') || lowerQuery.includes('hi')) return "Hello! How can I assist you with your college journey?";

        return "I'm not sure about that yet. Try asking about fees, documents, or hostel!";
    };

    const handleSend = (text = inputText) => {
        if (!text.trim()) return;

        // User Message
        const userMsg = { id: Date.now(), type: 'user', text: text };
        setMessages(prev => [...prev, userMsg]);
        setInputText("");
        setIsTyping(true);

        // Simulate AI Delay
        setTimeout(() => {
            const botResponseText = getBotResponse(text);
            const botMsg = { id: Date.now() + 1, type: 'bot', text: botResponseText };
            setMessages(prev => [...prev, botMsg]);
            setIsTyping(false);
        }, 1000);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {/* Toggle Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-110 flex items-center justify-center"
                >
                    <MessageCircle size={28} />
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="bg-white dark:bg-gray-900 w-80 sm:w-96 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col h-[500px] transition-all duration-300">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex justify-between items-center text-white">
                        <div className="flex items-center gap-2">
                            <Bot size={24} />
                            <div>
                                <h3 className="font-bold">UniBot AI</h3>
                                <p className="text-xs text-blue-100 flex items-center gap-1">
                                    <span className="w-2 h-2 bg-green-400 rounded-full inline-block"></span> Online
                                </p>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded-full transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-800/50">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`
                                    max-w-[80%] p-3 rounded-2xl text-sm 
                                    ${msg.type === 'user'
                                        ? 'bg-blue-600 text-white rounded-br-none'
                                        : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-bl-none shadow-sm'
                                    }
                                `}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl rounded-bl-none border border-gray-200 dark:border-gray-700 shadow-sm flex gap-1">
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Suggestions at Bottom if empty */}
                    {messages.length < 4 && (
                        <div className="px-4 pb-2 flex gap-2 overflow-x-auto no-scrollbar">
                            {FAQS.map((faq, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleSend(faq)}
                                    className="whitespace-nowrap bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs px-3 py-1.5 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-600 dark:hover:text-blue-400 transition-colors border border-gray-200 dark:border-gray-600"
                                >
                                    {faq}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Input Area */}
                    <div className="p-4 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-700">
                        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 border border-transparent focus-within:border-blue-500 transition-colors">
                            <input
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Type a message..."
                                className="bg-transparent flex-1 outline-none text-sm text-gray-700 dark:text-gray-200 placeholder-gray-400"
                            />
                            <button
                                onClick={() => handleSend()}
                                disabled={!inputText.trim()}
                                className={`p-2 rounded-full transition-colors ${inputText.trim() ? 'text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30' : 'text-gray-400'}`}
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
