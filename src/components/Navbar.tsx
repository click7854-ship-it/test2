import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { TabType } from '../types';
import { Search, Bookmark, Settings, Menu, X, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { activeTab, setActiveTab, setSearchOpen, userSaved } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalSavedCount =
    userSaved.savedProducts.length +
    userSaved.savedLookbooks.length +
    userSaved.savedArticles.length +
    userSaved.recommendationHistory.length;

  const navItems: { label: string; tab: TabType; highlight?: boolean }[] = [
    { label: 'HOME', tab: 'home' },
    { label: 'STYLE', tab: 'style' },
    { label: 'AI STYLIST', tab: 'ai-stylist', highlight: true },
    { label: 'LOOKBOOK', tab: 'lookbook' },
    { label: 'SHOP', tab: 'shop' },
    { label: 'MAGAZINE', tab: 'magazine' },
    { label: 'MY STYLE', tab: 'my-style' },
  ];

  const handleNavClick = (tab: TabType) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#15191E]/95 backdrop-blur-md border-b border-[#212730]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex flex-col text-left group focus:outline-none"
          >
            <span className="font-serif-brand text-xl sm:text-2xl font-bold tracking-widest text-[#F7F5F0] group-hover:text-[#D1AA75] transition-colors">
              MEN'S STYLE LAB
            </span>
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#D1AA75] font-light mt-0.5">
              Curated for 35–55 Gentlemen
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = activeTab === item.tab;
              return (
                <button
                  key={item.tab}
                  onClick={() => handleNavClick(item.tab)}
                  className={`relative text-xs tracking-[0.2em] font-medium uppercase py-2 transition-all duration-200 ${
                    isActive
                      ? 'text-[#D1AA75]'
                      : 'text-[#D8D4CA] hover:text-[#F7F5F0]'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {item.highlight && <Sparkles className="w-3 h-3 text-[#D1AA75]" />}
                    {item.label}
                    {item.tab === 'my-style' && totalSavedCount > 0 && (
                      <span className="inline-flex items-center justify-center w-4 h-4 text-[9px] font-bold rounded-full bg-[#D1AA75] text-[#15191E]">
                        {totalSavedCount}
                      </span>
                    )}
                  </span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D1AA75] transition-all" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-4">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-[#D8D4CA] hover:text-[#D1AA75] transition-colors rounded-full hover:bg-[#1A1F26]"
              title="통합 검색"
              aria-label="통합 검색 열기"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Quick My Style */}
            <button
              onClick={() => handleNavClick('my-style')}
              className="relative p-2 text-[#D8D4CA] hover:text-[#D1AA75] transition-colors rounded-full hover:bg-[#1A1F26]"
              title="보관함 (MY STYLE)"
              aria-label="보관함 열기"
            >
              <Bookmark className="w-4 h-4" />
              {totalSavedCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#D1AA75]" />
              )}
            </button>

            {/* Admin Management Portal Trigger */}
            <button
              onClick={() => handleNavClick('admin')}
              className={`p-2 transition-colors rounded-full hover:bg-[#1A1F26] ${
                activeTab === 'admin'
                  ? 'text-[#D1AA75] bg-[#1A1F26]'
                  : 'text-[#D8D4CA]/70 hover:text-[#F7F5F0]'
              }`}
              title="콘텐츠 관리자 모드"
              aria-label="관리자 모드 열기"
            >
              <Settings className="w-4 h-4" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#F7F5F0] hover:text-[#D1AA75] transition-colors"
              aria-label="메뉴 열기/닫기"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#15191E] border-b border-[#212730] px-4 pt-3 pb-6 space-y-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.tab;
            return (
              <button
                key={item.tab}
                onClick={() => handleNavClick(item.tab)}
                className={`w-full flex items-center justify-between text-left px-3 py-2.5 rounded-sm text-sm tracking-wider font-medium ${
                  isActive
                    ? 'bg-[#1A1F26] text-[#D1AA75] border-l-2 border-[#D1AA75]'
                    : 'text-[#D8D4CA] hover:bg-[#1F242B] hover:text-[#F7F5F0]'
                }`}
              >
                <span className="flex items-center gap-2">
                  {item.highlight && <Sparkles className="w-3.5 h-3.5 text-[#D1AA75]" />}
                  {item.label}
                </span>
                {item.tab === 'my-style' && totalSavedCount > 0 && (
                  <span className="px-2 py-0.5 text-xs rounded-full bg-[#D1AA75] text-[#15191E] font-bold">
                    {totalSavedCount}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-3 border-t border-[#212730] flex justify-between items-center text-xs text-[#D8D4CA]/70 px-3">
            <span>콘텐츠 관리 및 데모 모드</span>
            <button
              onClick={() => handleNavClick('admin')}
              className="text-[#D1AA75] underline hover:text-[#E2BD8A]"
            >
              관리자 페이지 이동
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
