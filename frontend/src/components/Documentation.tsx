import React from "react";
import { ShieldAlert, Key, Archive, Send, BookOpen } from "lucide-react";

export function Documentation() {
  const sections = [
    {
      icon: <Key className="w-6 h-6 text-blue-500" />,
      title: "One-Time Password & Security",
      content: "BitStash uses a simplified, secure access model. Your password is set during your first stash. There is no 'Reset Password' feature—ensure you keep your credentials safe. Your username/email and password are your only keys to managing your stashed code."
    },
    {
      icon: <Archive className="w-6 h-6 text-orange-500" />,
      title: "Archival Policy (No Deletion)",
      content: "Once code is stashed on the platform, it cannot be permanently deleted. This ensures data integrity. However, you can change its status to 'ARCHIVE' at any time. Archived posts are hidden from your 'ALL' view and search results, effectively removing them from public access while maintaining the record."
    },
    {
      icon: <Send className="w-6 h-6 text-green-500" />,
      title: "Permissions & Sharing",
      content: "You can stash code as 'PUBLIC' or 'PRIVATE'. For more control, use 'SHARED' mode by adding specific emails. Only users with matching emails will be able to view these stashed snippets in their 'Shared with me' tab."
    },
    {
      icon: <ShieldAlert className="w-6 h-6 text-red-500" />,
      title: "Usage Terms",
      content: "BitStash is designed for snippets and scripts. Do not stash sensitive production secrets or keys. Use the 'Generate Email' feature if you wish to remain anonymous."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center space-x-3 mb-8">
        <BookOpen className="w-10 h-10 text-blue-600" />
        <h2 className="text-3xl font-bold text-gray-800">BitStash Guide</h2>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {sections.map((section, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="flex items-center space-x-3 mb-4">
              {section.icon}
              <h3 className="text-xl font-bold text-gray-800">{section.title}</h3>
            </div>
            <p className="text-gray-600 leading-relaxed">
              {section.content}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-100">
        <h4 className="font-bold text-blue-800 mb-2">Pro Tip:</h4>
        <p className="text-blue-700">
          Use the "Generate" button during stashing to create a unique identity for every different project or snippet group you share!
        </p>
      </div>
    </div>
  );
}
