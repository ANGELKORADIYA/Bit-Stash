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
    <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 p-6 mb-6 group overflow-hidden relative">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center space-x-3">
          <div className="bg-blue-50 p-2 rounded-lg">
            <User className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-gray-900 leading-tight">{post.username}</span>
            <span className="text-xs text-gray-500">{post.createdAt}</span>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <span className={`text-[10px] uppercase tracking-wider font-black px-2 py-1 rounded-md ${
            post.status === 'PUBLIC' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
            post.status === 'PRIVATE' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
            post.status === 'SHARED' ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' :
            'bg-rose-50 text-rose-700 border border-rose-100'
          }`}>
            {post.status}
          </span>
          {showAdminControls && onArchive && post.status !== 'ARCHIVE' && (
            <button 
              onClick={() => onArchive(post.id)}
              className="text-gray-400 hover:text-rose-600 transition-colors duration-200 p-1.5 hover:bg-rose-50 rounded-lg"
              title="Archive Snippet"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
      
      <h2 className="text-xl font-black text-gray-800 mb-2 group-hover:text-blue-700 transition-colors">{post.title}</h2>
      
      <div className="flex items-center space-x-2 mb-4">
        <Code2 className="w-4 h-4 text-blue-500" />
        <span className="text-[11px] font-bold px-2 py-0.5 bg-gray-100 text-gray-600 rounded uppercase tracking-wide">
          {post.type}
        </span>
      </div>
      
      <p className="text-gray-600 mb-5 leading-relaxed text-sm">{post.description}</p>
      
      <div className="relative">
        <pre className="bg-gray-900 text-gray-100 p-5 rounded-xl overflow-x-auto mb-4 font-mono text-sm leading-relaxed border border-gray-800 shadow-inner">
          <code className="block">{post.code}</code>
        </pre>
      </div>

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