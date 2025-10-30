import { useState } from 'react';
import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import DailyPage from "./pages/DailyPage";
import TrendsPage from "./pages/TrendsPage";

export default function App() {
  const [currentPage, setCurrentPage] = useState(window.location.pathname);

  window.addEventListener('popstate', () => {
    setCurrentPage(window.location.pathname);
  });

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPage(path);
  };

  window.navigate = navigate;

  const renderPage = () => {
    switch (currentPage) {
      case '/daily':
        return <DailyPage />;
      case '/trends':
        return <TrendsPage />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      <Header />
      {renderPage()}
      <Footer />
    </div>
  );
}