import { Footer } from "@components/home/Footer";
import { HeroSection } from "@components/home/HeroSection";
import { HomeNav } from "@components/home/HomeNav";
import { MarketTabsSection } from "@components/home/MarketTabsSection";
import { MarketTicker } from "@components/home/MarketTicker";
import { NewsSection } from "@components/home/NewsSection";
import { PopularCoins } from "@components/home/PopularCoins";
import { ProductsSection } from "@components/home/ProductsSection";
import { SafuSection } from "@components/home/SafuSection";
import { DownloadSection } from "@components/home/DownloadSection";
import { FAQSection } from "@components/home/FAQSection";
import { TrustSection } from "@components/home/TrustSection";
import { BottomCta } from "@components/home/BottomCta";

export default function RootPage() {
  return (
    <main className="min-h-screen bg-bg-primary text-text-primary">
      <HomeNav />
      <HeroSection />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <MarketTabsSection />
        <ProductsSection />
        <MarketTicker />
        <PopularCoins />
        <NewsSection />
        <SafuSection />
        <DownloadSection />
        <FAQSection />
        <TrustSection />
        <BottomCta />
      </div>
      <Footer />
    </main>
  );
}
