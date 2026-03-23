import React, { useState } from "react";
import axios from "axios";
import { CodeCard } from "./CodeCard";
import type { CodePost } from "../types";

export function UserPostsPage() {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [posts, setPosts] = useState<CodePost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUserPosts = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/user-posts`, {
        username,
        password,
      });
      setPosts(response.data); // Assuming `posts` is the response
    } catch (error) {
      setError("Failed to fetch posts. Please check your credentials or try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchUserPosts();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Get Posts by User</h2>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 mb-2">
            Username or Email
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setusername(e.target.value)}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Get Posts
        </button>
      </form>

      {loading && <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>}

      {error && <div className="text-red-500 text-center">{error}</div>}

      {posts.length > 0 && (
        <div className="space-y-6">
          {posts.map((post, index) => (
            <CodeCard key={index} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
