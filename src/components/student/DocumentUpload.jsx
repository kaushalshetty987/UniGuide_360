import React, { useState } from 'react';
import { Upload, FileText, X, Check, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const DocumentUpload = () => {
    const { studentData } = useApp();
    const [dragActive, setDragActive] = useState(false);
    const [documents, setDocuments] = useState(studentData.documents);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            alert("File upload simulation: " + e.dataTransfer.files[0].name);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Document Verification</h2>

            {/* Upload Area */}
            <div
                className={`
                    border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-colors mb-6
                    ${dragActive ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'}
                `}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-full mb-3">
                    <Upload className="w-6 h-6 text-blue-500 dark:text-blue-400" />
                </div>
                <p className="text-gray-900 dark:text-white font-medium mb-1">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">PDF, JPG or PNG (max. 5MB)</p>
            </div>

            {/* Document List */}
            <div className="space-y-3">
                {documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600">
                        <div className="flex items-center gap-3">
                            <div className="bg-white dark:bg-gray-800 p-2 rounded-lg border border-gray-200 dark:border-gray-600">
                                <FileText className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">{doc.name}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{doc.date}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            {doc.status === 'verified' && (
                                <span className="flex items-center gap-1 text-xs font-medium text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
                                    <Check size={12} /> Verified
                                </span>
                            )}
                            {doc.status === 'processing' && (
                                <span className="flex items-center gap-1 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded-full">
                                    ⏳ Review
                                </span>
                            )}
                            {doc.status === 'rejected' && (
                                <span className="flex items-center gap-1 text-xs font-medium text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30 px-2 py-1 rounded-full">
                                    <X size={12} /> Rejected
                                </span>
                            )}

                            {doc.status !== 'verified' && (
                                <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded text-gray-400 dark:text-gray-500">
                                    <X size={16} />
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {documents.some(d => d.status === 'rejected') && (
                <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-lg flex gap-2 items-start">
                    <AlertCircle className="w-5 h-5 text-red-500 dark:text-red-400 shrink-0" />
                    <p className="text-sm text-red-700 dark:text-red-300">
                        <b>Action Required:</b> Please re-upload your Migration Certificate. The scan was unclear.
                    </p>
                </div>
            )}
        </div>
    );
};

export default DocumentUpload;
