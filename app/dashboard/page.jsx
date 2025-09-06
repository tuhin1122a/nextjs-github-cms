"use client";

import { FileText, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import DraftEditor from "../components/DraftEditor";
import DraftList from "../components/DraftList";
import PublishButton from "../components/PublishButton";

export default function DashboardPage() {
  const [drafts, setDrafts] = useState([]);
  const [showEditor, setShowEditor] = useState(false);
  const [editingDraft, setEditingDraft] = useState(null);

  // Load drafts from localStorage on mount
  useEffect(() => {
    const savedDrafts = localStorage.getItem("github-cms-drafts");
    if (savedDrafts) {
      try {
        const parsed = JSON.parse(savedDrafts);
        const draftsWithDates = parsed.map((draft) => ({
          ...draft,
          createdAt: new Date(draft.createdAt),
          updatedAt: new Date(draft.updatedAt),
        }));
        setDrafts(draftsWithDates);
      } catch (error) {
        console.error("Error loading drafts:", error);
      }
    }
  }, []);

  // Save drafts to localStorage whenever drafts change
  useEffect(() => {
    localStorage.setItem("github-cms-drafts", JSON.stringify(drafts));
  }, [drafts]);

  const handleSaveDraft = (draft) => {
    setDrafts((prev) => {
      const existingIndex = prev.findIndex((d) => d.id === draft.id);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = draft;
        return updated;
      } else {
        return [...prev, draft];
      }
    });
    setShowEditor(false);
    setEditingDraft(null);
  };

  const handleEditDraft = (draft) => {
    setEditingDraft(draft);
    setShowEditor(true);
  };

  const handleDeleteDraft = (draftId) => {
    setDrafts((prev) => prev.filter((d) => d.id !== draftId));
  };

  const handlePublishAll = () => {
    // Clear drafts after publish
    setDrafts([]);
  };

  const handleCancelEdit = () => {
    setShowEditor(false);
    setEditingDraft(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Create and manage your content drafts before publishing to GitHub.
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <PublishButton drafts={drafts} onPublish={handlePublishAll} />
          <button
            onClick={() => setShowEditor(true)}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>New Draft</span>
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Drafts */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Drafts</p>
              <p className="text-2xl font-semibold text-gray-900">
                {drafts.length}
              </p>
            </div>
          </div>
        </div>

        {/* Ready to Publish */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Ready to Publish
              </p>
              <p className="text-2xl font-semibold text-gray-900">
                {drafts.length}
              </p>
            </div>
          </div>
        </div>

        {/* Last Updated */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Last Updated</p>
              <p className="text-sm font-semibold text-gray-900">
                {drafts.length > 0
                  ? new Date(
                      Math.max(...drafts.map((d) => d.updatedAt.getTime()))
                    ).toLocaleDateString()
                  : "Never"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Drafts List */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Your Drafts {drafts.length > 0 && `(${drafts.length})`}
        </h2>
        <DraftList
          drafts={drafts}
          onEdit={handleEditDraft}
          onDelete={handleDeleteDraft}
        />
      </div>

      {/* Editor Modal */}
      {showEditor && (
        <DraftEditor
          draft={editingDraft}
          onSave={handleSaveDraft}
          onCancel={handleCancelEdit}
        />
      )}
    </div>
  );
}
