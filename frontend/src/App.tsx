import { CodeForm } from "./components/CodeForm";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { UserPostsPage } from "./components/UserPostsPage";
import { Dashboard } from "./components/DashBoard";
import { Documentation } from "./components/Documentation";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link to="/explore" className="flex items-center space-x-3 hover:scale-105 transition-transform duration-200">
              <img src="/logo.svg" alt="BitStash Logo" className="w-10 h-10" />
              <h1 className="text-2xl font-black bg-gradient-to-r from-blue-600 to-indigo-800 bg-clip-text text-transparent tracking-tight">
                BitStash
              </h1>
            </Link>

            <nav>
              <ul className="flex items-center space-x-6">
                <li>
                  <Link to="/explore" className="text-gray-600 hover:text-blue-600 font-semibold transition-colors duration-200">
                    Explore
                  </Link>
                </li>
                <li>
                  <Link to="/stash/new" className="text-gray-600 hover:text-blue-600 font-semibold transition-colors duration-200">
                    Stash New
                  </Link>
                </li>
                <li>
                  <Link to="/vault" className="text-gray-600 hover:text-blue-600 font-semibold transition-colors duration-200">
                    My Vault
                  </Link>
                </li>
                <li>
                  <Link to="/docs" className="bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 font-medium transition-all duration-200 shadow-sm hover:shadow-md">
                    Docs
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        <ToastContainer position="bottom-right" theme="colored" />

        <main className="max-w-4xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Navigate to="/explore" replace />} />
            <Route path="/explore" element={<Dashboard />} />
            <Route path="/stash/new" element={<CodeForm />} />
            <Route path="/vault" element={<UserPostsPage />} />
            <Route path="/docs" element={<Documentation />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
export default App;
