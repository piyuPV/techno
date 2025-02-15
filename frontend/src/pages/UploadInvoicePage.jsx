import React, { useState } from 'react';
import { FaCloudUploadAlt, FaFile, FaCheck, FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';

const UploadInvoicePage = () => {
    const [files, setFiles] = useState([]);
    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const droppedFiles = Array.from(e.dataTransfer.files);
        handleFiles(droppedFiles);
    };

    const handleFileInput = (e) => {
        const selectedFiles = Array.from(e.target.files);
        handleFiles(selectedFiles);
    };

    const handleFiles = (newFiles) => {
        const validFiles = newFiles.filter(file =>
            file.type === 'application/pdf' ||
            file.type === 'image/jpeg' ||
            file.type === 'image/png'
        );

        setFiles(prev => [...prev, ...validFiles.map(file => ({
            file,
            id: Math.random().toString(36).substr(2, 9),
            status: 'pending',
            progress: 0
        }))]);
    };

    const removeFile = (fileId) => {
        setFiles(files.filter(f => f.id !== fileId));
    };

    const uploadFiles = async () => {
        // Simulate file upload
        setFiles(files.map(file => ({
            ...file,
            status: 'uploading'
        })));

        // Simulate progress
        for (let i = 0; i <= 100; i += 10) {
            await new Promise(resolve => setTimeout(resolve, 200));
            setFiles(prev => prev.map(file => ({
                ...file,
                progress: i,
                status: i === 100 ? 'completed' : 'uploading'
            })));
        }
    };

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Upload Invoices</h1>
                <p className="text-gray-600 mt-2">Upload your invoices for processing and analysis</p>
            </div>

            {/* Upload Area */}
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-all
                    ${isDragging
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 hover:border-blue-400'}`}
            >
                <div className="flex flex-col items-center">
                    <FaCloudUploadAlt className="text-5xl text-blue-500 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                        Drag and drop your invoices here
                    </h3>
                    <p className="text-gray-500 mb-4">
                        or click to select files
                    </p>
                    <input
                        type="file"
                        multiple
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileInput}
                        className="hidden"
                        id="file-input"
                    />
                    <label
                        htmlFor="file-input"
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 
                            transition-colors cursor-pointer"
                    >
                        Select Files
                    </label>
                    <p className="text-sm text-gray-500 mt-2">
                        Supported formats: PDF, JPEG, PNG
                    </p>
                </div>
            </div>

            {/* File List */}
            {files.length > 0 && (
                <div className="mt-8">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                            Selected Files ({files.length})
                        </h3>
                        <button
                            onClick={uploadFiles}
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 
                                transition-colors"
                        >
                            Upload All
                        </button>
                    </div>
                    <div className="space-y-3">
                        {files.map(file => (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                key={file.id}
                                className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 
                                    flex items-center justify-between"
                            >
                                <div className="flex items-center space-x-4">
                                    <FaFile className="text-blue-500 text-xl" />
                                    <div>
                                        <p className="font-medium text-gray-800">
                                            {file.file.name}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {(file.file.size / 1024 / 1024).toFixed(2)} MB
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    {file.status === 'completed' ? (
                                        <FaCheck className="text-green-500" />
                                    ) : file.status === 'uploading' ? (
                                        <div className="w-20 bg-gray-200 rounded-full h-2.5">
                                            <div
                                                className="bg-blue-600 h-2.5 rounded-full"
                                                style={{ width: `${file.progress}%` }}
                                            ></div>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => removeFile(file.id)}
                                            className="text-red-500 hover:text-red-600"
                                        >
                                            <FaTimes />
                                        </button>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UploadInvoicePage; 