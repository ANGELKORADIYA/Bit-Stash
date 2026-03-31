import { useState } from "react";
import { CodeForm } from "./components/CodeForm";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { UserPostsPage } from "./components/UserPostsPage";
import { Dashboard } from "./components/DashBoard";
import { Documentation } from "./components/Documentation";
import { Menu, X } from "lucide-react";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const navLinks = [
    { to: "/explore", label: "Explore" },
    { to: "/stash/new", label: "Stash New" },
    { to: "/vault", label: "My Vault" },
  ];

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 font-sans">
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link 
              to="/explore" 
              onClick={closeMenu}
              className="flex items-center space-x-3 hover:scale-105 transition-transform duration-200"
            >
              <img src="/logo.svg" alt="BitStash Logo" className="w-8 h-8 sm:w-10 sm:h-10" />
              <h1 className="text-xl sm:text-2xl font-black bg-gradient-to-r from-blue-600 to-indigo-800 bg-clip-text text-transparent tracking-tight">
                BitStash
              </h1>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:block">
              <ul className="flex items-center space-x-6">
                {navLinks.map((link) => (
                  <li key={link.to}>
                    <Link 
                      to={link.to} 
                      className="text-gray-600 hover:text-blue-600 font-semibold transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link 
                    to="/docs" 
                    className="bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 font-medium transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    Docs
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="md:hidden bg-white border-t border-gray-100 animate-in slide-in-from-top duration-200">
              <ul className="px-4 py-4 space-y-4">
                {navLinks.map((link) => (
                  <li key={link.to}>
                    <Link 
                      to={link.to} 
                      onClick={closeMenu}
                      className="block text-gray-600 hover:text-blue-600 font-semibold text-lg"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link 
                    to="/docs" 
                    onClick={closeMenu}
                    className="block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium text-center shadow-sm"
                  >
                    Documentation
                  </Link>
                </li>
              </ul>
            </nav>
          )}
        </header>

        <ToastContainer position="bottom-right" theme="colored" />

        <main className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
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
