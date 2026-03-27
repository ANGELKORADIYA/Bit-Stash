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
      if (response.data.length === 0) {
        toast.info(`Vault section "${currentFilter.replace(/_/g, " ")}" is empty`);
      } else if (currentFilter === filter) {
        toast.success(`Vault Unlocked: ${response.data.length} snippets found`);
      }
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
    <div className="max-w-4xl mx-auto px-4 py-8">
      {!hasFetched ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-br from-gray-900 to-blue-900 p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl backdrop-blur-sm mb-4 border border-white/20">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-black text-white tracking-tight">Access Your Vault</h2>
              <p className="text-blue-100/70 text-sm mt-1">Enter your credentials to manage your stash</p>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Identity</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setusername(e.target.value)}
                  placeholder="Username or Email"
                  className="w-full p-3.5 bg-gray-50 border-2 border-gray-100 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Access Key</label>
                <input
                  type="password"
                  value={password}
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your private password"
                  className="w-full p-3.5 bg-gray-50 border-2 border-gray-100 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-[0.98] flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <ShieldCheck className="w-5 h-5" />
                    <span>Unlock Vault</span>
                  </>
                )}
              </button>
            </form>
          </div>
          <p className="mt-8 text-sm text-gray-400 flex items-center">
            <Lock className="w-3 h-3 mr-2" />
            End-to-end management of your stashed snippets
          </p>
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center space-x-4">
              <div className="bg-gray-900 p-3 rounded-2xl text-white shadow-xl">
                <Database className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-3xl font-black text-gray-900 tracking-tight leading-none">My Vault</h2>
                <p className="text-gray-400 text-sm mt-1 flex items-center uppercase tracking-widest font-bold">
                  <span className="text-green-500 mr-2">●</span> Active Session: {username}
                </p>
              </div>
            </div>
            <button 
              onClick={() => { setHasFetched(false); setPosts([]); }}
              className="text-xs font-black text-gray-400 uppercase hover:text-red-500 transition-colors border-2 border-gray-100 px-4 py-2 rounded-xl"
            >
              Lock Vault
            </button>
          </div>

          <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-100 mb-8 flex flex-wrap gap-1">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => {
                  setFilter(f);
                  fetchUserPosts(f);
                }}
                className={`flex-1 min-w-[120px] px-4 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all ${
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
