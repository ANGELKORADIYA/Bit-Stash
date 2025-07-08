import { Clock, Code2, User } from 'lucide-react';
import type { CodePost } from '../types';

interface CodeCardProps {
  post: CodePost;
}

export function CodeCard({ post }: CodeCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <User className="w-5 h-5 text-gray-600" />
          <span className="font-medium text-gray-800">{post.username}</span>
        </div>
        <div className="flex items-center space-x-2 text-gray-500">
          <Clock className="w-4 h-4" />
          <span className="text-sm">{post.createdAt}</span>
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
      
      <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
        <code className="text-sm">{post.code}</code>
      </pre>
    </div>
  );
}