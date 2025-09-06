import { BookOpen, Edit, Github } from "lucide-react";
import ContentViewer from "./components/ContentViewer";

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
            <Github className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900">GitHub CMS</h1>
        </div>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          A modern content management system that integrates seamlessly with
          GitHub for version-controlled content storage and collaboration.
        </p>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <BookOpen className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            GitHub Integration
          </h3>
          <p className="text-gray-600 text-sm">
            Fetch and display Markdown content directly from your GitHub
            repositories with real-time synchronization.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-green-300 transition-colors">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <Edit className="w-5 h-5 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Draft Management
          </h3>
          <p className="text-gray-600 text-sm">
            Create, edit, and manage multiple drafts locally before publishing
            them all to your repository with one click.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 hover:border-purple-300 transition-colors">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
            <Github className="w-5 h-5 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Version Control
          </h3>
          <p className="text-gray-600 text-sm">
            All your content is automatically version controlled through Git,
            providing complete change history and collaboration features.
          </p>
        </div>
      </div>

      {/* Content Display */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Sample Content
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Content fetched from{" "}
            <code className="bg-gray-100 px-1 py-0.5 rounded text-xs">
              content/hello.md
            </code>
          </p>
        </div>
        <div className="p-6">
          <ContentViewer />
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mt-12">
        <a
          href="/dashboard"
          className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          <Edit className="w-5 h-5" />
          <span>Start Creating Content</span>
        </a>
      </div>
    </div>
  );
}
