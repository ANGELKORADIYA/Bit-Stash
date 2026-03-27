import { Clock, Code2, User, Trash2, Share2, X } from 'lucide-react';
import type { CodePost } from '../types';
import { useState } from 'react';

interface CodeCardProps {
  post: CodePost;
  onArchive?: (id: number) => void;
  onGrantAccess?: (id: number, email: string) => void;
  onRevokeAccess?: (id: number, email: string) => void;
  showAdminControls?: boolean;
}

export function CodeCard({ post, onArchive, onGrantAccess, onRevokeAccess, showAdminControls }: CodeCardProps) {
  const [shareEmail, setShareEmail] = useState("");

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <User className="w-5 h-5 text-gray-600" />
          <span className="font-medium text-gray-800">{post.username}</span>
          <span className={`text-xs px-2 py-0.5 rounded-full ${
            post.status === 'PUBLIC' ? 'bg-green-100 text-green-800' :
            post.status === 'PRIVATE' ? 'bg-gray-100 text-gray-800' :
            post.status === 'SHARED' ? 'bg-blue-100 text-blue-800' :
            'bg-red-100 text-red-800'
          }`}>
            {post.status}
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-gray-500">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{post.createdAt}</span>
          </div>
          {showAdminControls && onArchive && post.status !== 'ARCHIVE' && (
            <button 
              onClick={() => onArchive(post.id)}
              className="text-red-500 hover:text-red-700 transition-colors"
              title="Archive (Delete)"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
      
      <h2 className="text-xl font-bold mb-2">{post.title}</h2>
      <div className="flex items-center space-x-2 mb-3">
        <Code2 className="w-4 h-4 text-gray-600" />
        <span className="text-sm font-medium px-2 py-1 bg-gray-100 rounded-full">
          {post.type}
        </span>
      </div>
      
      <p className="text-gray-600 mb-4">{post.description}</p>
      
      <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto mb-4">
        <code className="text-sm">{post.code}</code>
      </pre>

      {showAdminControls && (
        <div className="border-t pt-4">
          <div className="flex items-center space-x-2 mb-4">
            <input
              type="email"
              placeholder="Email to share with"
              value={shareEmail}
              onChange={(e) => setShareEmail(e.target.value)}
              className="flex-1 p-2 border rounded text-sm"
            />
            <button
              onClick={() => {
                if (shareEmail && onGrantAccess) {
                  onGrantAccess(post.id, shareEmail);
                  setShareEmail("");
                }
              }}
              className="bg-blue-500 text-white px-3 py-2 rounded text-sm flex items-center space-x-1 hover:bg-blue-600"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>

          {post.sharedWith && post.sharedWith.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-semibold text-gray-500 uppercase">Shared with:</p>
              <div className="flex flex-wrap gap-2">
                {post.sharedWith.map((email) => (
                  <div key={email} className="flex items-center bg-gray-100 px-2 py-1 rounded text-xs">
                    <span>{email}</span>
                    <button 
                      onClick={() => onRevokeAccess && onRevokeAccess(post.id, email)}
                      className="ml-1 text-gray-500 hover:text-red-500"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}