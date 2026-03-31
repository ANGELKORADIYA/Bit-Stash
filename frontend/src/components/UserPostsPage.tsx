import React, { useState } from "react";
import axios from "axios";
import { CodeCard } from "./CodeCard";
import type { CodePost } from "../types";
import { toast } from "react-toastify";
import { Archive, Lock, ShieldCheck, ChevronRight, Filter, Database } from "lucide-react";

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
      toast.error("Unlock your vault with credentials");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/snippets/my-stash?filter=${currentFilter}`, {
        username,
        password,
      });
      setPosts(response.data);
      setHasFetched(true);
    } catch (error: any) {
      const msg = error.response?.data?.message || "Invalid vault credentials";
      setError(msg);
      toast.error(msg);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleArchive = async (id: number) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/snippets/${id}/archive`, {
        username,
        password,
      });
      toast.success("Snippet archived securely");
      fetchUserPosts();
    } catch (error: any) {
      toast.error("Failed to archive snippet");
    }
  };

  const handleUnarchive = async (id: number) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/snippets/${id}/unarchive`, {
        username,
        password,
      });
      toast.success("Snippet restored to vault");
      fetchUserPosts();
    } catch (error: any) {
      toast.error("Failed to restore snippet");
    }
  };

  const handleGrantAccess = async (id: number, email: string) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/snippets/${id}/share?email=${email}`, {
        username,
        password,
      });
      toast.success(`Shared with ${email}`);
      fetchUserPosts();
    } catch (error: any) {
      toast.error("Sharing failed");
    }
  };

  const handleRevokeAccess = async (id: number, email: string) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/snippets/${id}/revoke?email=${email}`, {
        username,
        password,
      });
      toast.success("Access revoked");
      fetchUserPosts();
    } catch (error: any) {
      toast.error("Revoke failed");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchUserPosts();
  };

  const filters = ["ALL", "PRIVATE", "SHARED", "PUBLIC", "ARCHIVE", "SHARED_WITH_ME"];

  return (
    <div className="max-w-4xl mx-auto px-0 sm:px-4 py-4 sm:py-8">
      {!hasFetched ? (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
          <div className="w-full max-w-md bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-br from-gray-900 to-blue-900 p-6 sm:p-8 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-white/10 rounded-xl sm:rounded-2xl backdrop-blur-sm mb-4 border border-white/20">
                <Lock className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">Access Your Vault</h2>
              <p className="text-blue-100/70 text-xs sm:text-sm mt-1">Enter your credentials to manage your stash</p>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4 sm:space-y-5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Identity</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setusername(e.target.value)}
                  placeholder="Username or Email"
                  className="w-full p-3 sm:p-3.5 bg-gray-50 border-2 border-gray-100 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none text-sm sm:text-base"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Access Key</label>
                <input
                  type="password"
                  value={password}
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your private password"
                  className="w-full p-3 sm:p-3.5 bg-gray-50 border-2 border-gray-100 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none text-sm sm:text-base"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-3.5 sm:py-4 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-[0.98] flex items-center justify-center space-x-2 text-sm sm:text-base"
              >
                {loading ? (
                  <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Unlock Vault</span>
                  </>
                )}
              </button>
            </form>
          </div>
          <p className="mt-8 text-xs sm:text-sm text-gray-400 flex items-center">
            <Lock className="w-3 h-3 mr-2" />
            End-to-end management of your stashed snippets
          </p>
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 px-4">
          {loading && (
            <div className="fixed top-0 left-0 w-full h-1 z-50 bg-blue-50">
              <div className="h-full bg-blue-600 animate-[loading_1s_ease-in-out_infinite] w-1/3"></div>
            </div>
          )}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-10">
            <div className="flex items-center space-x-4">
              <div className="bg-gray-900 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl text-white shadow-xl">
                <Database className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight leading-none">My Vault</h2>
                <p className="text-[10px] sm:text-xs text-gray-400 mt-1.5 flex items-center uppercase tracking-widest font-bold">
                  <span className="text-green-500 mr-2">●</span> Active Session: {username}
                </p>
              </div>
            </div>
            <button 
              onClick={() => { setHasFetched(false); setPosts([]); }}
              className="w-full sm:w-auto text-[10px] font-black text-gray-400 uppercase hover:text-red-500 transition-colors border-2 border-gray-100 px-4 py-2 rounded-xl"
            >
              Lock Vault
            </button>
          </div>

          <div className="bg-white p-1 sm:p-2 rounded-2xl shadow-sm border border-gray-100 mb-6 sm:mb-8 flex flex-nowrap overflow-x-auto scrollbar-hide gap-1">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => {
                  setFilter(f);
                  fetchUserPosts(f);
                }}
                className={`whitespace-nowrap flex-1 min-w-[100px] sm:min-w-[120px] px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-[10px] sm:text-[11px] font-black uppercase tracking-wider transition-all ${
                  filter === f
                    ? "bg-blue-600 text-white shadow-md shadow-blue-100 scale-[1.02]"
                    : "text-gray-400 hover:bg-gray-50 hover:text-gray-600"
                }`}
              >
                {f.replace(/_/g, " ")}
              </button>
            ))}
          </div>

          {loading && (
            <div className="flex flex-col items-center py-20 animate-pulse">
              <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-600 rounded-full animate-spin mb-4" />
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Searching Vault...</p>
            </div>
          )}

          {!loading && posts.length === 0 && (
            <div className="bg-white rounded-3xl border-2 border-dashed border-gray-100 p-20 text-center">
              <div className="bg-gray-50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Filter className="w-10 h-10 text-gray-200" />
              </div>
              <h3 className="text-xl font-black text-gray-800 tracking-tight">Empty Section</h3>
              <p className="text-gray-400 text-sm mt-1 max-w-xs mx-auto uppercase font-bold tracking-wide">
                No snippets found in "{filter.replace(/_/g, " ")}"
              </p>
            </div>
          )}

          {!loading && posts.length > 0 && (
            <div className="space-y-6">
              {posts.map((post) => (
                <CodeCard 
                  key={post.id} 
                  post={post} 
                  showAdminControls={filter !== "SHARED_WITH_ME"}
                  onArchive={handleArchive}
                  onUnarchive={handleUnarchive}
                  onGrantAccess={handleGrantAccess}
                  onRevokeAccess={handleRevokeAccess}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
