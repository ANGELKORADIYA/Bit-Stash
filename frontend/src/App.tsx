import { CodeForm } from "./components/CodeForm";
import { Github } from "lucide-react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { UserPostsPage } from "./components/UserPostsPage";
import { Dashboard } from "./components/DashBoard"; // Import the new Dashboard component

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow-sm">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center space-x-2">
              <Github className="w-8 h-8 text-gray-800" />
              <h1 className="text-2xl font-bold text-gray-800">CodeShare</h1>
            </div>
          </div>
        </header>
        <ToastContainer />

        <main className="max-w-4xl mx-auto px-4 py-8">
          <nav className="mb-4">
            <ul className="flex space-x-6">
              <li>
                <Link to="/" className="text-blue-500 hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/share-code" className="text-blue-500 hover:underline">
                  Share Code
                </Link>
              </li>
              <li>

              <Link to="/user-posts" className="text-blue-500 hover:underline">
                  User Posts
                </Link>
              </li>
            </ul>
          </nav>

          <Routes>
            {/* Home Route - displaying posts */}
            <Route
              path="/"
              element={
                <Dashboard />
              }
            />

            {/* Share Code Route - the form to submit new code */}
            <Route path="/share-code" element={<CodeForm />} />
            <Route path="/user-posts" element={<UserPostsPage />} />  {/* New Route */}

          </Routes>
        </main>

        
      </div>
    </Router>
  );
}

export default App;
