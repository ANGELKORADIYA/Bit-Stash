import React, { useState } from "react";
import { Lock, Code, Type, FileText, User , Eye, Plus, X  } from "lucide-react";
import type { FormData, ServerCodePost } from "../types";
import axios from "axios";
import { toast } from "react-toastify";

export function CodeForm() {
  const [formData, setFormData] = useState<FormData & { sharedWith: string[] }>({
    username: "",
    password: "",
    code: "",
    type: "",
    title: "",
    description: "",
    visibility: false,
    sharedWith: [],
  });
  const [shareEmail, setShareEmail] = useState("");

  const addShareEmail = () => {
    if (shareEmail && !formData.sharedWith.includes(shareEmail)) {
      setFormData({ ...formData, sharedWith: [...formData.sharedWith, shareEmail] });
      setShareEmail("");
      toast.info(`Added ${shareEmail} to permissions`);
    }
  };

  const removeShareEmail = (email: string) => {
    setFormData({ ...formData, sharedWith: formData.sharedWith.filter(e => e !== email) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      toast.error("Username and Password are required");
      return;
    }
    try {
      const newPost: ServerCodePost & { codes: { sharedWith?: string[] } } = {
        codes: {
          username: formData.username,
          code: formData.code,
          type: formData.type,
          title: formData.title,
          description: formData.description,
          visibility: formData.visibility,
          status: formData.sharedWith.length > 0 ? "SHARED" : (formData.visibility ? "PUBLIC" : "PRIVATE"),
          sharedWith: formData.sharedWith,
        },
        login: {
          username: formData.username,
          password: formData.password,
        },
      };

      const postData = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/upload`,
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
          sharedWith: [],
        });
      } else {
        toast.error(
          `Error: ${postData.data.message || "Failed to upload"}`
        );
      }
    } catch (error: any) {
      console.error(error);
      toast.error(`Error: ${error.response?.data?.message || error.message}`);
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
          <div className="flex gap-2">
            <input
              type="text"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
            <button
              type="button"
              onClick={async () => {
                try {
                  const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/generate-email`);
                  setFormData({ ...formData, username: response.data });
                } catch (error) {
                  toast.error("Failed to generate email");
                }
              }}
              className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 text-sm border"
            >
              Generate
            </button>
          </div>
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

      <div className="mb-4 border-t pt-4">
        <label className="block text-gray-700 font-medium mb-2">Share Permissions (Optional)</label>
        <div className="flex gap-2 mb-2">
          <input
            type="email"
            placeholder="Email to share with"
            value={shareEmail}
            onChange={(e) => setShareEmail(e.target.value)}
            className="flex-1 p-2 border rounded-lg text-sm"
          />
          <button
            type="button"
            onClick={addShareEmail}
            className="bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-1"
          >
            <Plus className="w-4 h-4" />
            <span>Add</span>
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.sharedWith.map((email) => (
            <div key={email} className="flex items-center bg-blue-50 px-2 py-1 rounded text-sm text-blue-700 border border-blue-100">
              <span>{email}</span>
              <button
                type="button"
                onClick={() => removeShareEmail(email)}
                className="ml-1 text-blue-400 hover:text-red-500"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
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
