import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/Hero';
import LiveDemoTester from '../components/landing/LiveDemoTester';
import Features from '../components/landing/Features';
import ArchitectureFlow from '../components/landing/ArchitectureFlow';
import AiFeatureSection from '../components/landing/AiFeatureSection';
import AlertChannelsSection from '../components/landing/AlertChannelsSection';
import SecurityTrustSection from '../components/landing/SecurityTrustSection';
import Footer from '../components/landing/Footer';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-obsidian-950 text-white selection:bg-bee-500 selection:text-black">
      <Navbar />
      <Hero />
      <LiveDemoTester />
      <Features />
      <ArchitectureFlow />
      <AiFeatureSection />
      <AlertChannelsSection />
      <SecurityTrustSection />
      <Footer />
    </main>
  );
}
