import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LookbookItem } from '../types';
import { LookbookDetailModal } from '../components/LookbookDetailModal';
import { Bookmark, Sparkles, Filter, Eye } from 'lucide-react';

export const LookbookPage: React.FC = () => {
  const { lookbooks, userSaved, toggleSaveLookbook } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeModalLook, setActiveModalLook] = useState<LookbookItem | null>(null);

  const categories = ['ALL', '모던 클래식', '콰이어트 럭셔리', '스마트 캐주얼', '비즈니스 포멀', '릴랙스드 위켄드', '헤리티지 & 아우터'];

  const filtered = selectedCategory === 'ALL'
    ? lookbooks
    : lookbooks.filter((l) => l.category === selectedCategory);

  return (
    <div className="py-12 bg-[#15191E] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="border-b border-[#212730] pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <span className="text-xs font-bold tracking-[0.25em] text-[#D1AA75] uppercase flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              EDITORIAL COLLECTIONS
            </span>
            <h1 className="font-editorial text-3xl sm:text-5xl text-[#F7F5F0] font-light">
              2026 에디토리얼 <span className="font-semibold text-gold-gradient">룩북 아카이브</span>
            </h1>
            <p className="text-sm text-[#D8D4CA]/80 font-light max-w-2xl leading-relaxed">
              35~55세 남성의 절제된 실루엣과 고급 소재가 만들어내는 품격 있는 스타일 화보를 감상하세요.
            </p>
          </div>

          <div className="text-xs text-[#D1AA75] font-display tracking-widest uppercase">
            TOTAL {filtered.length} CURATED LOOKS
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#212730]">
          <span className="text-xs text-[#D8D4CA]/60 flex items-center gap-1 mr-2 shrink-0">
            <Filter className="w-3.5 h-3.5 text-[#D1AA75]" />
            카테고리:
          </span>
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

        {/* Lookbooks Masonry / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((look) => {
            const isSaved = userSaved.savedLookbooks.includes(look.id);
            return (
              <div
                key={look.id}
                className="group bg-[#1A1F26] border border-[#212730] hover:border-[#D1AA75]/60 transition-all duration-300 rounded-sm overflow-hidden flex flex-col justify-between shadow-lg"
              >
                {/* Image */}
                <div
                  onClick={() => setActiveModalLook(look)}
                  className="relative aspect-[3/4] overflow-hidden bg-black cursor-pointer"
                >
                  <img
                    src={look.imageUrl}
                    alt={look.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#15191E] via-transparent to-transparent opacity-75" />

                  {/* Season Badge */}
                  <div className="absolute top-3 left-3 bg-[#15191E]/90 border border-[#D1AA75]/30 text-[#D1AA75] text-[10px] font-semibold px-2.5 py-1 uppercase tracking-wider backdrop-blur-sm">
                    {look.season} · {look.category}
                  </div>

                  {/* Quick Save button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSaveLookbook(look.id);
                    }}
                    className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all ${
                      isSaved
                        ? 'bg-[#D1AA75] text-[#15191E]'
                        : 'bg-[#15191E]/80 text-[#D8D4CA] hover:text-[#F7F5F0] hover:bg-[#15191E]'
                    }`}
                    aria-label="룩북 저장"
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>

                  {/* Hover Inspect badge */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-[#F7F5F0] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="bg-[#15191E]/90 px-3 py-1.5 rounded-sm border border-[#D1AA75]/40 flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-[#D1AA75]" />
                      <span>착장 디테일 & 분해 보기</span>
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div onClick={() => setActiveModalLook(look)} className="cursor-pointer">
                    <h3 className="font-editorial text-xl font-medium text-[#F7F5F0] group-hover:text-[#D1AA75] transition-colors">
                      {look.title}
                    </h3>
                    <p className="text-xs text-[#D8D4CA]/80 font-light mt-1">
                      {look.subtitle}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#262D37] flex items-center justify-between text-xs text-[#D8D4CA]/70">
                    <span className="font-mono text-[11px] text-[#D1AA75]">{look.ageRecommendation}</span>
                    <button
                      onClick={() => setActiveModalLook(look)}
                      className="text-xs text-[#D1AA75] hover:text-[#E2BD8A] underline cursor-pointer"
                    >
                      상세 화보 열기
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="bg-[#1A1F26] border border-[#262D37] p-12 text-center rounded-sm space-y-3">
            <p className="text-sm text-[#D8D4CA]">해당 카테고리의 룩북이 없습니다.</p>
            <button
              onClick={() => setSelectedCategory('ALL')}
              className="text-xs text-[#D1AA75] underline"
            >
              전체 룩북 보기
            </button>
          </div>
        )}

        {/* Modal */}
        {activeModalLook && (
          <LookbookDetailModal
            lookbook={activeModalLook}
            onClose={() => setActiveModalLook(null)}
          />
        )}
      </div>
    </div>
  );
};
