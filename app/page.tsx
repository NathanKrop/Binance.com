import { Footer } from "@components/home/Footer";
import { HeroSection } from "@components/home/HeroSection";
import { HomeNav } from "@components/home/HomeNav";
import { MarketTicker } from "@components/home/MarketTicker";
import { NewsSection } from "@components/home/NewsSection";
import { PopularCoins } from "@components/home/PopularCoins";
import { ProductsSection } from "@components/home/ProductsSection";
import { TrustSection } from "@components/home/TrustSection";

export default function RootPage() {
  return (
    <main className="min-h-screen bg-bg-primary text-text-primary">
      <HomeNav />
      <HeroSection />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ProductsSection />
        <MarketTicker />
        <PopularCoins />
        <NewsSection />
        <TrustSection />
      </div>
      <Footer />
    </main>
  );
}
