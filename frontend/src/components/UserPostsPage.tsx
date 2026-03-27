import React, { useState } from "react";
import axios from "axios";
import { CodeCard } from "./CodeCard";
import type { CodePost } from "../types";
import { toast } from "react-toastify";

export function UserPostsPage() {
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");
  const [posts, setPosts] = useState<CodePost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [hasFetched, setHasFetched] = useState(false);

  const fetchUserPosts = async (currentFilter = filter) => {
    if (!username || !password) {
      toast.error("Please enter both username and password");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/user-posts?filter=${currentFilter}`, {
        username,
        password,
      });
      setPosts(response.data);
      setHasFetched(true);
      if (response.data.length === 0) {
        toast.info(`No posts found for filter: ${currentFilter.replace(/_/g, " ")}`);
      } else {
        toast.success(`Fetched ${response.data.length} posts`);
      }
    } catch (error: any) {
      const msg = error.response?.data?.message || "Failed to fetch posts. Check credentials.";
      setError(msg);
      toast.error(msg);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleArchive = async (id: number) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/archive-code/${id}`, {
        username,
        password,
      });
      toast.success("Post archived successfully (Status changed to ARCHIVE)");
      fetchUserPosts();
    } catch (error: any) {
      toast.error("Failed to archive post");
    }
  };

  const handleGrantAccess = async (id: number, email: string) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/grant-access/${id}?email=${email}`, {
        username,
        password,
      });
      toast.success(`Access granted to ${email}`);
      fetchUserPosts();
    } catch (error: any) {
      toast.error("Failed to grant access");
    }
  };

  const handleRevokeAccess = async (id: number, email: string) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/revoke-access/${id}?email=${email}`, {
        username,
        password,
      });
      toast.success(`Access revoked for ${email}`);
      fetchUserPosts();
    } catch (error: any) {
      toast.error("Failed to revoke access");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchUserPosts();
  };

  const filters = ["ALL", "PRIVATE", "SHARED", "PUBLIC", "ARCHIVE", "SHARED_WITH_ME"];

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

      {hasFetched && (
        <div className="mb-6 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => {
                setFilter(f);
                fetchUserPosts(f);
              }}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filter === f
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {f.replace(/_/g, " ")}
            </button>
          ))}
        </div>
      )}

      {loading && <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>}

      {error && <div className="text-red-500 text-center mb-4">{error}</div>}

      {hasFetched && posts.length === 0 && !loading && (
        <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg p-12 text-center">
          <p className="text-gray-500 text-lg">No posts found for "{filter.replace(/_/g, " ")}"</p>
        </div>
      )}

      {posts.length > 0 && (
        <div className="space-y-6">
          {posts.map((post, index) => (
            <CodeCard 
              key={post.id || index} 
              post={post} 
              showAdminControls={filter !== "SHARED_WITH_ME"}
              onArchive={handleArchive}
              onGrantAccess={handleGrantAccess}
              onRevokeAccess={handleRevokeAccess}
            />
          ))}
        </div>
      )}
    </div>
  );
}
