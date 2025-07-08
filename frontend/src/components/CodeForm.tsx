import React, { useState } from "react";
import { Lock, Code, Type, FileText, User , Eye  } from "lucide-react";
import type { FormData, ServerCodePost } from "../types";
import axios from "axios";
import { toast } from "react-toastify";

export function CodeForm() {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
    code: "",
    type: "",
    title: "",
    description: "",
    visibility: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newPost: ServerCodePost = {
        codes: {
          username: formData.username,
          code: formData.code,
          type: formData.type,
          title: formData.title,
          description: formData.description,
          visibility:formData.visibility
        },
        login: {
          username: formData.username,
          password: formData.password,
        },
      };

      const postData = await axios.post(
        "http://localhost:8080/api/upload",
        newPost
      );
      if (postData.data.okk) {
        toast.success("Code Shared Successfully!");
        setFormData({
          username: "",
          password: "",
          code: "",
          type: "",
          title: "",
          description: "",
          visibility: false,
        });
      } else {
        toast.error(
          `Error in upload ${postData.data.message || "Reapply your request"}`
        );
      }
    } catch (error) {
      console.error(error);
      toast.error(`Error in upload ${error}`);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-md p-6 mb-6"
    >
      <h2 className="text-2xl font-bold mb-6">Share Your Code</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="flex items-center space-x-2 text-gray-700 mb-2">
            <User className="w-4 h-4" />
            <span>Username or Email</span>
          </label>
          <input
            type="text"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="flex items-center space-x-2 text-gray-700 mb-2">
            <Lock className="w-4 h-4" />
            <span>Password</span>
          </label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="flex items-center space-x-2 text-gray-700 mb-2">
            <FileText className="w-4 h-4" />
            <span>Title</span>
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="flex items-center space-x-2 text-gray-700 mb-2">
            <Type className="w-4 h-4" />
            <span>Type</span>
          </label>
          <input
            type="text"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="flex items-center space-x-2 text-gray-700 mb-2">
            <Eye  className="w-4 h-4" />

            <span>Visibility</span>
          </label>
          <select
            value={formData.visibility?"public":"private"}
            onChange={(e) => setFormData({ ...formData, visibility: e.target.value=="private"?false:true })}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>
      </div>

      <div className="mb-4">
        <label className="flex items-center space-x-2 text-gray-700 mb-2">
          <Code className="w-4 h-4" />
          <span>Code</span>
        </label>
        <textarea
          value={formData.code}
          onChange={(e) => setFormData({ ...formData, code: e.target.value })}
          className="w-full p-2 border rounded-lg h-32 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <div className="mb-6">
        <label className="flex items-center space-x-2 text-gray-700 mb-2">
          <FileText className="w-4 h-4" />
          <span>Description</span>
        </label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full p-2 border rounded-lg h-24 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
      >
        Share Code
      </button>
    </form>
  );
}
