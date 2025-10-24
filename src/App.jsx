import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      <Header />
      <LandingPage />
      <Footer />
    </div>
  );
}
