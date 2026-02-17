import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Circle, Lock, ArrowRight, AlertCircle, Clock } from 'lucide-react';

const RoadmapTimeline = ({ stages, currentStageId }) => {
    return (
        <div className="w-full relative py-8 px-4 bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
            <div className="mb-6 flex justify-between items-end">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Your Onboarding Journey</h2>
                    <p className="text-gray-500 text-sm">Stay on track to complete everything before April 1st</p>
                </div>
                <div className="text-right">
                    <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                        Next Deadline: 28 Feb
                    </span>
                </div>
            </div>

            {/* Horizontal Scroll Container */}
            <div className="overflow-x-auto pb-6 -mx-4 px-4 scrollbar-hide">
                <div className="flex gap-6 min-w-max">
                    {stages.map((stage, index) => {
                        const isCompleted = stage.status === 'completed';
                        const isCurrent = stage.status === 'processing' || stage.status === 'pending';
                        const isLocked = stage.status === 'locked';

                        return (
                            <motion.div
                                key={stage.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`
                    relative w-64 p-5 rounded-xl border-2 transition-all cursor-pointer group hover:shadow-lg
                    ${isCompleted ? 'border-green-100 bg-green-50/30' : ''}
                    ${isCurrent ? 'border-blue-500 bg-white shadow-md ring-4 ring-blue-50' : ''}
                    ${isLocked ? 'border-gray-100 bg-gray-50 opacity-80' : ''}
                `}
                            >
                                {/* Connecting Line (Visual only, simple implementation) */}
                                {index < stages.length - 1 && (
                                    <div className="absolute top-1/2 -right-9 w-6 h-0.5 bg-gray-200 hidden md:block" />
                                )}

                                <div className="flex justify-between items-start mb-3">
                                    <div className={`
                        p-2 rounded-full 
                        ${isCompleted ? 'bg-green-100 text-green-600' : ''}
                        ${isCurrent ? 'bg-blue-100 text-blue-600' : ''}
                        ${isLocked ? 'bg-gray-200 text-gray-400' : ''}
                    `}>
                                        {isCompleted ? <CheckCircle size={20} /> :
                                            isLocked ? <Lock size={20} /> :
                                                <Clock size={20} />}
                                    </div>
                                    <span className="text-xs font-semibold text-gray-400">Step {index + 1}</span>
                                </div>

                                <h3 className={`font-bold mb-1 ${isLocked ? 'text-gray-500' : 'text-gray-900'}`}>{stage.title}</h3>
                                <p className="text-xs text-gray-500 mb-3 h-8 line-clamp-2">{stage.description}</p>

                                <div className="flex items-center justify-between mt-2">
                                    <span className={`
                        text-xs font-medium px-2 py-1 rounded
                        ${isCompleted ? 'bg-green-100 text-green-700' : ''}
                        ${isCurrent ? 'bg-blue-100 text-blue-700' : ''}
                        ${isLocked ? 'bg-gray-200 text-gray-500' : ''}
                    `}>
                                        {stage.date}
                                    </span>
                                    {!isLocked && (
                                        <ArrowRight size={16} className={`
                            transform transition-transform group-hover:translate-x-1
                            ${isCurrent ? 'text-blue-500' : 'text-gray-300'}
                         `} />
                                    )}
                                </div>

                                {isCurrent && stage.progress !== undefined && (
                                    <div className="mt-3 w-full bg-gray-200 rounded-full h-1.5">
                                        <div
                                            className="bg-blue-500 h-1.5 rounded-full"
                                            style={{ width: `${stage.progress}%` }}
                                        />
                                    </div>
                                )}
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default RoadmapTimeline;
