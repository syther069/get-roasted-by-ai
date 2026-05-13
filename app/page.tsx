import { AboutSection } from "@/components/about-section";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import Leaderboard from "@/components/leaderboard";
import Navbar from "@/components/navbar";
import RoastForm from "@/components/roast-form";

export default function HomePage() {

  return (
    <main className="bg-black text-white">

      <Navbar />

      <Hero />

      <RoastForm />

      <Leaderboard />

      <AboutSection />

      <Footer />

    </main>
  );
}