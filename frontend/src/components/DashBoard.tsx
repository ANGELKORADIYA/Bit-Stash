import { useState, useEffect } from "react";
import axios from "axios";
import { CodeCard } from "./CodeCard";
import {CodePost} from "../types"
import { useRef,useCallback } from "react";
const fetchPosts = async (): Promise<CodePost[]> => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/snippets/explore`);
    const Codes: CodePost[] = response.data.map((code: CodePost) => {
      const date = new Date(code.createdAt);
      const formattedDate = `${date.getDate().toString().padStart(2, "0")}-${(
        date.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}-${date.getFullYear()} ${date
        .getHours()
        .toString()
        .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
      code.createdAt = formattedDate;
      return code;
    });
    return Codes;
  } catch (error) {
    console.error("An error occurred:", error);
    return [];
  }
};
import { Link } from "react-router-dom";
import { Code2, PackageOpen, Plus } from "lucide-react";

export function Dashboard() {
  const [posts, setPosts] = useState<CodePost[]>([]);
  const [loading, setLoading] = useState(false);
  const [finisiedDatabase, setFinisiedDatabase] = useState(false);
  const loader = useRef(null);
  const loadMore = useCallback(async () => {
    if (loading) return;

    setLoading(true);
    const newPosts = await fetchPosts();
    setPosts((prev) => {
      const combinedPosts = [...prev, ...newPosts];
      const uniquePosts = Array.from(
        new Map(combinedPosts.map((post) => [post.id, post])).values()
      );

      if (uniquePosts.length === prev.length) {
        setFinisiedDatabase(true);
      }

      return uniquePosts;
    });
    setLoading(false);
  }, [loading]);

  useEffect(() => {
    loadMore();
  }, []);

  useEffect(() => {
    if (finisiedDatabase) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 1.0 }
    );

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => observer.disconnect();
  }, [loadMore]);

  return (
    <section>
      <div className="flex items-center space-x-3 mb-6 sm:mb-8">
        <div className="bg-blue-600 p-1.5 sm:p-2 rounded-lg text-white shadow-lg">
          <Code2 className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-gray-800 tracking-tight">Global Snippet Stash</h2>
      </div>

      {!loading && posts.length === 0 && (
        <div className="bg-white rounded-2xl border-2 border-dashed border-gray-200 p-8 sm:p-16 text-center shadow-sm">
          <div className="bg-gray-50 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <PackageOpen className="w-8 h-8 sm:w-10 sm:h-10 text-gray-300" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 tracking-tight">No snippets yet</h3>
          <p className="text-gray-500 mb-8 max-w-sm mx-auto leading-relaxed text-sm sm:base">
            The global stash is empty. Be the first one to share a code snippet with the community!
          </p>
          <Link 
            to="/stash/new" 
            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-bold hover:bg-blue-700 transition-all hover:scale-105 shadow-lg shadow-blue-200"
          >
            <Plus className="w-5 h-5" />
            <span>Stash First Snippet</span>
          </Link>
        </div>
      )}

      <div className="space-y-6">
        {posts.map((post, index) => (
          <CodeCard key={index} post={post} />
        ))}

        <div ref={loader} className="flex justify-center py-4">
          {loading && (
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          )}
        </div>
      </div>
      <footer className="flex justify-center items-center h-24 bg-gray-100 text-gray-800 p-4 mt-12 rounded-xl">
        {finisiedDatabase && posts.length > 0 && (
          <p className="text-sm font-medium text-gray-500 italic">No more snippets to load.</p>
        )}
      </footer>
    </section>
  );
}

export default Dashboard;
