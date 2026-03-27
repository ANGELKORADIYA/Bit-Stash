import { CodeForm } from "./components/CodeForm";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { UserPostsPage } from "./components/UserPostsPage";
import { Dashboard } from "./components/DashBoard"; // Import the new Dashboard component

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3 hover:opacity-90 transition-opacity">
              <img src="/logo.svg" alt="CodeShare Logo" className="w-10 h-10" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                CodeShare
              </h1>
            </Link>
            
            <nav>
              <ul className="flex items-center space-x-6">
                <li>
                  <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/share-code" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                    Share Code
                  </Link>
                </li>
                <li>
                  <Link to="/user-posts" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">
                    My Posts
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        <ToastContainer />

        <main className="max-w-4xl mx-auto px-4 py-8">
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
