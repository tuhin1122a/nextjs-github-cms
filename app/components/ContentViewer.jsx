"use client";

import { AlertCircle, FileText, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function ContentViewer({
  filePath = "README.md",
  className = "",
}) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchContent() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `/api/github/content?path=${encodeURIComponent(filePath)}`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch content: ${response.status}`);
        }

        const data = await response.json();
        setContent(data.content || "");
      } catch (err) {
        console.error("Error fetching content:", err);
        setError(err instanceof Error ? err.message : "Failed to load content");
      } finally {
        setLoading(false);
      }
    }

    fetchContent();
  }, [filePath]);

  if (loading) {
    return (
      <div className={`flex items-center justify-center p-8 ${className}`}>
        <div className="flex items-center space-x-3 text-gray-600">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Loading content...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex items-center justify-center p-8 ${className}`}>
        <div className="flex items-center space-x-3 text-red-600 bg-red-50 p-4 rounded-lg">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className={`flex items-center justify-center p-8 ${className}`}>
        <div className="flex items-center space-x-3 text-gray-500">
          <FileText className="w-5 h-5" />
          <span>No content found</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`prose prose-lg max-w-none ${className}`}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
