'use client';

import { useState } from 'react';
import { formatDate } from '@/lib/utils';
import { Edit, Trash2, FileText, Calendar } from 'lucide-react';

export default function DraftList({ drafts, onEdit, onDelete }) {
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (draftId) => {
    if (deletingId) return;
    
    setDeletingId(draftId);
    try {
      onDelete(draftId);
    } finally {
      setDeletingId(null);
    }
  };

  if (!drafts || drafts.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No drafts yet</h3>
        <p className="text-gray-500">Create your first draft to get started.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {drafts.map((draft) => (
        <div
          key={draft.id}
          className="bg-white border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {draft.title}
              </h3>
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>Created {formatDate(draft.createdAt)}</span>
                </div>
                {draft.updatedAt > draft.createdAt && (
                  <div className="flex items-center space-x-1">
                    <span>•</span>
                    <span>Updated {formatDate(draft.updatedAt)}</span>
                  </div>
                )}
              </div>
              <p className="mt-3 text-gray-600 line-clamp-3">
                {draft.body.length > 150 
                  ? `${draft.body.substring(0, 150)}...` 
                  : draft.body
                }
              </p>
            </div>
            <div className="flex items-center space-x-2 ml-4">
              <button
                onClick={() => onEdit(draft)}
                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Edit draft"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(draft.id)}
                disabled={deletingId === draft.id}
                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                title="Delete draft"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
