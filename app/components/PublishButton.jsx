'use client';

import { useState } from 'react';
import { Upload, CheckCircle, AlertCircle } from 'lucide-react';

export default function PublishButton({ drafts, onPublish, className = '' }) {
  const [publishing, setPublishing] = useState(false);
  const [status, setStatus] = useState('idle');

  const handlePublish = async () => {
    if (!drafts || drafts.length === 0 || publishing) return;

    setPublishing(true);
    setStatus('idle');

    try {
      const response = await fetch('/api/github/publish', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ drafts }),
      });

      if (!response.ok) {
        throw new Error(`Publishing failed: ${response.status}`);
      }

      setStatus('success');
      onPublish();
      
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error('Error publishing drafts:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    } finally {
      setPublishing(false);
    }
  };

  const getButtonContent = () => {
    if (publishing) {
      return (
        <>
          <Upload className="w-4 h-4 animate-pulse" />
          <span>Publishing...</span>
        </>
      );
    }

    if (status === 'success') {
      return (
        <>
          <CheckCircle className="w-4 h-4" />
          <span>Published!</span>
        </>
      );
    }

    if (status === 'error') {
      return (
        <>
          <AlertCircle className="w-4 h-4" />
          <span>Failed</span>
        </>
      );
    }

    return (
      <>
        <Upload className="w-4 h-4" />
        <span>Publish All ({drafts.length})</span>
      </>
    );
  };

  const getButtonStyles = () => {
    if (status === 'success') return 'bg-green-600 hover:bg-green-700 text-white';
    if (status === 'error') return 'bg-red-600 hover:bg-red-700 text-white';
    return 'bg-blue-600 hover:bg-blue-700 text-white';
  };

  return (
    <button
      onClick={handlePublish}
      disabled={!drafts || drafts.length === 0 || publishing}
      className={`
        flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors
        disabled:opacity-50 disabled:cursor-not-allowed
        ${getButtonStyles()}
        ${className}
      `}
      title={!drafts || drafts.length === 0 ? 'No drafts to publish' : `Publish ${drafts.length} draft(s) to GitHub`}
    >
      {getButtonContent()}
    </button>
  );
}
