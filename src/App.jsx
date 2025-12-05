import { Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import DailyPage from "./pages/DailyPage";
import TrendsPage from "./pages/TrendsPage";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      <Header />
      <div className="flex-1 w-full animate-fade-in">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/daily" element={<DailyPage />} />
          <Route path="/trends" element={<TrendsPage />} />
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}