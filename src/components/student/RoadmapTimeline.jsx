import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Circle, Lock, ArrowRight, AlertCircle, Clock } from 'lucide-react';

const RoadmapTimeline = ({ stages, currentStageId }) => {
    return (
        <div className="w-full relative py-8 px-4 bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="mb-6 flex justify-between items-end">
                <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Your Onboarding Journey</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Stay on track to complete everything before April 1st</p>
                </div>
                <div className="text-right">
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full">
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
                                    ${isCompleted ? 'border-green-100 dark:border-green-900/40 bg-green-50/30 dark:bg-green-900/10' : ''}
                                    ${isCurrent ? 'border-blue-500 dark:border-blue-400 bg-white dark:bg-gray-800 shadow-md ring-4 ring-blue-50 dark:ring-blue-900/30' : ''}
                                    ${isLocked ? 'border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 opacity-80' : ''}
                                `}
                            >
                                {/* Connecting Line */}
                                {index < stages.length - 1 && (
                                    <div className="absolute top-1/2 -right-9 w-6 h-0.5 bg-gray-200 dark:bg-gray-600 hidden md:block" />
                                )}

                                <div className="flex justify-between items-start mb-3">
                                    <div className={`
                                        p-2 rounded-full
                                        ${isCompleted ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : ''}
                                        ${isCurrent ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : ''}
                                        ${isLocked ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500' : ''}
                                    `}>
                                        {isCompleted ? <CheckCircle size={20} /> :
                                            isLocked ? <Lock size={20} /> :
                                                <Clock size={20} />}
                                    </div>
                                    <span className="text-xs font-semibold text-gray-400 dark:text-gray-500">Step {index + 1}</span>
                                </div>

                                <h3 className={`font-bold mb-1 ${isLocked ? 'text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'}`}>{stage.title}</h3>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 h-8 line-clamp-2">{stage.description}</p>

                                <div className="flex items-center justify-between mt-2">
                                    <span className={`
                                        text-xs font-medium px-2 py-1 rounded
                                        ${isCompleted ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : ''}
                                        ${isCurrent ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' : ''}
                                        ${isLocked ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400' : ''}
                                    `}>
                                        {stage.date}
                                    </span>
                                    {!isLocked && (
                                        <ArrowRight size={16} className={`
                                            transform transition-transform group-hover:translate-x-1
                                            ${isCurrent ? 'text-blue-500 dark:text-blue-400' : 'text-gray-300 dark:text-gray-600'}
                                        `} />
                                    )}
                                </div>

                                {isCurrent && stage.progress !== undefined && (
                                    <div className="mt-3 w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1.5">
                                        <div
                                            className="bg-blue-500 dark:bg-blue-400 h-1.5 rounded-full"
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
