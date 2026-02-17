import React, { useState, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Upload, FileText, CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';

const Documents = () => {
    const { documents, uploadDocument } = useApp();
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileSelect = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        // Simulate upload delay
        setTimeout(async () => {
            await uploadDocument({
                name: file.name,
                status: 'processing'
            });
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }, 1500);
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'verified': return <CheckCircle className="text-green-500" size={20} />;
            case 'rejected': return <XCircle className="text-red-500" size={20} />;
            case 'processing': return <Clock className="text-blue-500" size={20} />;
            default: return <AlertTriangle className="text-yellow-500" size={20} />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'verified': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
            case 'rejected': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
            case 'processing': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
            default: return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
        }
    };

    return (
        <div className="space-y-6">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">My Documents</h1>
                    <p className="text-gray-500 dark:text-gray-400">Upload and manage your academic records.</p>
                </div>
                <div className="relative">
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png"
                    />
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-medium flex items-center gap-2 shadow-lg shadow-blue-500/30 transition-all disabled:opacity-70"
                    >
                        {uploading ? (
                            <span className="animate-pulse">Uploading...</span>
                        ) : (
                            <>
                                <Upload size={20} /> Upload New Document
                            </>
                        )}
                    </button>
                    <p className="text-xs text-center mt-2 text-gray-500 dark:text-gray-400">Max size: 5MB (PDF, JPG)</p>
                </div>
            </header>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 dark:bg-gray-700/50 text-gray-500 dark:text-gray-400 text-xs uppercase font-semibold">
                            <tr>
                                <th className="px-6 py-4">Document Name</th>
                                <th className="px-6 py-4">Upload Date</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Remarks</th>
                                <th className="px-6 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                            {documents.map((doc) => (
                                <tr key={doc.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                                <FileText className="text-blue-600 dark:text-blue-400" size={20} />
                                            </div>
                                            <span className="font-medium text-gray-900 dark:text-white">{doc.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                        {doc.date}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-bold ${getStatusColor(doc.status)}`}>
                                            {getStatusIcon(doc.status)}
                                            <span className="capitalize">{doc.status}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                        {doc.reason || '-'}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium">
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {documents.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                                        No documents uploaded yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Documents;
