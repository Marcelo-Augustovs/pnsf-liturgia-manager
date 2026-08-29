import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import GridCards from "@/components/GridCards";
import Footer from "@/components/Footer";
import { CARDS_DATA } from "@/data/pageCardsData";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-b from-[#1A253A] via-[#162134] to-[#1A253A] text-[#FDF8F0] selection:bg-[#BF953F] selection:text-[#1A253A]">
      <Navbar />
      <div className="flex-1 flex flex-col justify-between">
        <HeroSection />
        <GridCards cardsData={CARDS_DATA} />
      </div>
      <Footer />
    </main>
  );
}
