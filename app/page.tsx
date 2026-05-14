import { AboutSection } from "@/components/about-section";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import Leaderboard from "@/components/leaderboard";
import Navbar from "@/components/navbar";
import RoastForm from "@/components/roast-form";
import ConsensusSection from "@/components/consensus-section";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white antialiased">
      <Navbar />
      <div className="mx-auto max-w-7xl px-6">
        <Hero />
        <RoastForm />
        <ConsensusSection />
        <Leaderboard />
        <AboutSection />
      </div>
      <Footer />
    </main>
  );
}