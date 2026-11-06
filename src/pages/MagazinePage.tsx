import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MagazineArticle } from '../types';
import { MagazineDetailModal } from '../components/MagazineDetailModal';
import { Bookmark, Sparkles, Clock, Calendar, ArrowRight, User } from 'lucide-react';

export const MagazinePage: React.FC = () => {
  const { articles, userSaved, toggleSaveArticle } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeArticle, setActiveArticle] = useState<MagazineArticle | null>(null);

  const categories = ['ALL', 'Styling', 'Material', 'Watch & Shoes', 'Grooming', 'Lifestyle'];

  const filtered = selectedCategory === 'ALL'
    ? articles
    : articles.filter((a) => a.category === selectedCategory);

  const featured = filtered[0];
  const others = filtered.slice(1);

  return (
    <div className="py-12 bg-[#15191E] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="border-b border-[#212730] pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <span className="text-xs font-bold tracking-[0.25em] text-[#D1AA75] uppercase flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              EDITORIAL MAGAZINE
            </span>
            <h1 className="font-editorial text-3xl sm:text-5xl text-[#F7F5F0] font-light">
              맨즈 스타일 <span className="font-semibold text-gold-gradient">인사이트 & 에세이</span>
            </h1>
            <p className="text-sm text-[#D8D4CA]/80 font-light max-w-2xl leading-relaxed">
              35~55세 남성의 기품을 완성하는 테일러링 원칙, 하이엔드 원사 선택법, 슈즈 및 시계 관리법을 깊이 있게 다룹니다.
            </p>
          </div>

          <div className="text-xs text-[#D1AA75] font-display tracking-widest uppercase">
            TOTAL {filtered.length} ESSAYS
          </div>
        </div>

        {/* Category filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#212730]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs px-3.5 py-2 rounded-sm border whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'border-[#D1AA75] bg-[#D1AA75] text-[#15191E] font-bold'
                  : 'border-[#262D37] bg-[#1A1F26] text-[#D8D4CA] hover:text-[#F7F5F0]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Article Lead Banner */}
        {featured && (
          <div
            onClick={() => setActiveArticle(featured)}
            className="group cursor-pointer bg-[#1A1F26] border border-[#212730] hover:border-[#D1AA75]/60 transition-all duration-300 rounded-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-xl"
          >
            <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-auto overflow-hidden bg-black">
              <img
                src={featured.coverImage}
                alt={featured.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-4 left-4 bg-[#15191E]/90 border border-[#D1AA75]/30 text-[#D1AA75] text-[10px] font-semibold px-2.5 py-1 uppercase tracking-wider backdrop-blur-sm">
                FEATURED ESSAY · {featured.category}
              </div>
            </div>

            <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-xs font-display tracking-widest text-[#D1AA75] uppercase block">
                  COVER STORY
                </span>
                <h2 className="font-editorial text-2xl sm:text-3xl font-medium text-[#F7F5F0] group-hover:text-[#D1AA75] transition-colors leading-snug">
                  {featured.title}
                </h2>
                <p className="text-xs text-[#D1AA75] font-light italic">
                  {featured.subtitle}
                </p>
                <p className="text-xs sm:text-sm text-[#D8D4CA]/80 leading-relaxed font-light line-clamp-3">
                  {featured.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-[#262D37] flex items-center justify-between text-xs text-[#D8D4CA]/70">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-[#D1AA75]" />
                    {featured.author.split('(')[0]}
                  </span>
                  <span>·</span>
                  <span>{featured.readTime}</span>
                </div>
                <span className="text-[#D1AA75] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  전문 읽기 <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Remaining Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {others.map((art) => {
            const isSaved = userSaved.savedArticles.includes(art.id);
            return (
              <div
                key={art.id}
                onClick={() => setActiveArticle(art)}
                className="group cursor-pointer bg-[#1A1F26] border border-[#212730] hover:border-[#D1AA75]/60 transition-all duration-300 rounded-sm overflow-hidden flex flex-col justify-between shadow-lg"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-black">
                  <img
                    src={art.coverImage}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#15191E]/90 border border-[#D1AA75]/30 text-[#D1AA75] text-[10px] font-semibold px-2 py-0.5 uppercase tracking-wider backdrop-blur-sm">
                    {art.category}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSaveArticle(art.id);
                    }}
                    className={`absolute top-3 right-3 p-1.5 rounded-full backdrop-blur-sm transition-all ${
                      isSaved
                        ? 'bg-[#D1AA75] text-[#15191E]'
                        : 'bg-[#15191E]/80 text-[#D8D4CA] hover:text-[#F7F5F0]'
                    }`}
                    aria-label="칼럼 스크랩"
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="font-editorial text-lg font-medium text-[#F7F5F0] group-hover:text-[#D1AA75] transition-colors line-clamp-2">
                      {art.title}
                    </h3>
                    <p className="text-xs text-[#D8D4CA]/80 leading-relaxed font-light line-clamp-2">
                      {art.excerpt}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#262D37] flex items-center justify-between text-[11px] text-[#D8D4CA]/70">
                    <span>{art.date}</span>
                    <span className="text-[#D1AA75]">{art.readTime}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detail Modal */}
        {activeArticle && (
          <MagazineDetailModal
            article={activeArticle}
            onClose={() => setActiveArticle(null)}
          />
        )}
      </div>
    </div>
  );
};
