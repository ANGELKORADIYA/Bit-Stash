import { useState, useEffect } from "react";
import axios from "axios";
import { CodeCard } from "./CodeCard";
import {CodePost} from "../types"
import { useRef,useCallback } from "react";
const fetchPosts = async (): Promise<CodePost[]> => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/`);
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
      <footer className="flex justify-center items-center h-24 bg-gray-800 text-white p-4">
        {finisiedDatabase && (
          <button
            onClick={loadMore}
            className="px-6 py-3 text-lg bg-blue-500 text-white rounded-lg shadow-md transform transition duration-300 ease-in-out hover:bg-blue-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Load More
          </button>
        )}
      </footer>
    </section>
  );
}

export default Dashboard;
