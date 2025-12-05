import { useNavigate } from 'react-router-dom';
import { FeatureGrid } from '../components/landing/FeatureGrid.jsx';
import { HeroSection } from '../components/landing/HeroSection.jsx';
import { HowItWorks } from '../components/landing/HowItWorks.jsx';
import { DataTrustNote } from '../components/DataTrustNote.jsx';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <main id="main" className="flex-1">
      <HeroSection onPrimary={() => navigate('/daily')} onSecondary={() => navigate('/trends')} />
      <div className="px-4 mt-6">
        <DataTrustNote />
      </div>
      <HowItWorks />
      <FeatureGrid />
    </main>
  );
}