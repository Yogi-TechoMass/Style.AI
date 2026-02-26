import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Upload, 
  Sparkles, 
  ShoppingBag, 
  MessageSquare, 
  History, 
  Info, 
  Menu, 
  X,
  ChevronRight,
  Camera
} from 'lucide-react';

// Pages (to be implemented in separate files or defined here for now)
import HomePage from './pages/HomePage';
import UploadPage from './pages/UploadPage';
import ProcessingPage from './pages/ProcessingPage';
import ResultsPage from './pages/ResultsPage';
import ChatbotPage from './pages/ChatbotPage';
import WardrobePage from './pages/WardrobePage';
import AboutPage from './pages/AboutPage';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: <Sparkles className="w-4 h-4" /> },
    { name: 'Upload Outfit', path: '/upload', icon: <Upload className="w-4 h-4" /> },
    { name: 'Recommendations', path: '/results', icon: <ShoppingBag className="w-4 h-4" /> },
    { name: 'Chatbot', path: '/chatbot', icon: <MessageSquare className="w-4 h-4" /> },
    { name: 'Wardrobe', path: '/wardrobe', icon: <History className="w-4 h-4" /> },
    { name: 'About', path: '/about', icon: <Info className="w-4 h-4" /> },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-luxury-black/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-luxury-beige rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
            <span className="text-luxury-black font-bold text-xl">V</span>
          </div>
          <span className="text-2xl font-display font-bold tracking-tighter">VOGUE.AI</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link flex items-center gap-2 ${
                location.pathname === item.path ? 'text-luxury-beige' : ''
              }`}
            >
              {item.name}
            </Link>
          ))}
          <Link to="/upload" className="btn-primary py-2 px-6 text-sm">
            Get Styled
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-luxury-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-20 left-0 right-0 bg-luxury-black border-b border-white/10 p-6 flex flex-col gap-4"
          >
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-4 py-3 border-b border-white/5 ${
                  location.pathname === item.path ? 'text-luxury-beige' : 'text-luxury-white/60'
                }`}
              >
                {item.icon}
                <span className="uppercase tracking-widest text-sm font-medium">{item.name}</span>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const AppContent = () => {
  const location = useLocation();
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<HomePage />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/processing" element={<ProcessingPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/chatbot" element={<ChatbotPage />} />
            <Route path="/wardrobe" element={<WardrobePage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </AnimatePresence>
      </main>
      
      <footer className="bg-luxury-gray border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-luxury-beige rounded-full flex items-center justify-center">
                <span className="text-luxury-black font-bold text-sm">V</span>
              </div>
              <span className="text-xl font-display font-bold tracking-tighter">VOGUE.AI</span>
            </div>
            <p className="text-luxury-white/40 max-w-md leading-relaxed">
              The future of personal styling. Our AI analyzes your wardrobe and suggests 
              the perfect combinations from the world's leading fashion platforms.
            </p>
          </div>
          <div>
            <h4 className="text-luxury-beige uppercase tracking-widest text-xs font-bold mb-6">Platform</h4>
            <ul className="flex flex-col gap-4 text-sm text-luxury-white/60">
              <li><Link to="/upload" className="hover:text-luxury-white">Upload Outfit</Link></li>
              <li><Link to="/results" className="hover:text-luxury-white">Recommendations</Link></li>
              <li><Link to="/chatbot" className="hover:text-luxury-white">AI Stylist</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-luxury-beige uppercase tracking-widest text-xs font-bold mb-6">Company</h4>
            <ul className="flex flex-col gap-4 text-sm text-luxury-white/60">
              <li><Link to="/about" className="hover:text-luxury-white">About Us</Link></li>
              <li><a href="#" className="hover:text-luxury-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-luxury-white">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col md:row justify-between items-center gap-4">
          <p className="text-xs text-luxury-white/20">© 2026 VOGUE.AI. All rights reserved.</p>
          <div className="flex gap-6">
            {/* Social icons could go here */}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
