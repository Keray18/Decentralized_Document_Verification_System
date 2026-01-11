'use client'

import React, { useState } from 'react';

export default function Upload() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setMessage('');
    } else {
      setFile(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file.");
      return;
    }

    setUploading(true);
    setMessage('');

    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const base64file = reader.result.split(',')[1];

        const response = await fetch('/api/upload', {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fileContent: base64file, fileName: file.name })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Upload failed');
        }

        const data = await response.json();
        setMessage(data.message || 'Upload successful!');
        setFile(null); // Clear file input
      } catch (err) {
        setMessage(`Error: ${err.message}`);
      } finally {
        setUploading(false);
      }
    };

    reader.onerror = () => {
      setMessage('Error reading file.');
      setUploading(false);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
          Upload Document
        </h2>
        <div className="mb-4">
          <label htmlFor="file-upload" className="cursor-pointer bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg inline-block w-full text-center truncate">
            {file ? file.name : 'Select a file'}
          </label>
          <input id="file-upload" type="file" className="hidden" onChange={handleFileChange} />
        </div>
        <button
          onClick={handleUpload}
          disabled={!file || uploading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:bg-gray-500 disabled:cursor-not-allowed disabled:transform-none"
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
        {message && (
          <p className={`mt-4 text-center ${message.startsWith('Error') ? 'text-red-400' : 'text-green-400'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
