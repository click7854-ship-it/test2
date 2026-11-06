import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { SampleNoticeBanner } from './components/SampleNoticeBanner';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { StyleCategoriesSection } from './components/StyleCategoriesSection';
import { WeeklyCurationsSection } from './components/WeeklyCurationsSection';
import { AiStylistHomeBanner } from './components/AiStylistHomeBanner';
import { HomeFeaturedProducts } from './components/HomeFeaturedProducts';
import { HomeMagazineSection } from './components/HomeMagazineSection';
import { StylePage } from './pages/StylePage';
import { AiStylistPage } from './pages/AiStylistPage';
import { LookbookPage } from './pages/LookbookPage';
import { ShopPage } from './pages/ShopPage';
import { MagazinePage } from './pages/MagazinePage';
import { MyStylePage } from './pages/MyStylePage';
import { AdminPage } from './pages/AdminPage';
import { SearchModal } from './components/SearchModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { LookbookDetailModal } from './components/LookbookDetailModal';
import { MagazineDetailModal } from './components/MagazineDetailModal';

const MainContent: React.FC = () => {
  const {
    activeTab,
    selectedProduct,
    setSelectedProduct,
    selectedLookbook,
    setSelectedLookbook,
    selectedArticle,
    setSelectedArticle,
  } = useApp();

  return (
    <div className="min-h-screen bg-[#15191E] text-[#F7F5F0] flex flex-col font-sans selection:bg-[#D1AA75] selection:text-[#15191E]">
      {/* Top Disclaimer Banner */}
      <SampleNoticeBanner />

      {/* Main Navigation */}
      <Navbar />

      {/* Main Dynamic View */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <div className="animate-fade-in">
            <HeroSection />
            <StyleCategoriesSection />
            <WeeklyCurationsSection />
            <AiStylistHomeBanner />
            <HomeFeaturedProducts />
            <HomeMagazineSection />
          </div>
        )}

        {activeTab === 'style' && <StylePage />}
        {activeTab === 'ai-stylist' && <AiStylistPage />}
        {activeTab === 'lookbook' && <LookbookPage />}
        {activeTab === 'shop' && <ShopPage />}
        {activeTab === 'magazine' && <MagazinePage />}
        {activeTab === 'my-style' && <MyStylePage />}
        {activeTab === 'admin' && <AdminPage />}
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Modals */}
      <SearchModal />

      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {selectedLookbook && (
        <LookbookDetailModal
          lookbook={selectedLookbook}
          onClose={() => setSelectedLookbook(null)}
        />
      )}

      {selectedArticle && (
        <MagazineDetailModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
