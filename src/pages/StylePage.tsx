import React from 'react';
import { useApp } from '../context/AppContext';
import { INITIAL_CATEGORIES } from '../data/mockData';
import { Sparkles, ArrowRight, Check, Compass } from 'lucide-react';

export const StylePage: React.FC = () => {
  const { selectedCategory, setSelectedCategory, setActiveTab } = useApp();

  const currentCategory = selectedCategory
    ? INITIAL_CATEGORIES.find((c) => c.name === selectedCategory) || INITIAL_CATEGORIES[0]
    : null;

  return (
    <div className="py-12 bg-[#15191E] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Page Title */}
        <div className="border-b border-[#212730] pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <span className="text-xs font-bold tracking-[0.25em] text-[#D1AA75] uppercase flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" />
              CURATED STYLE DISCIPLINES
            </span>
            <h1 className="font-editorial text-3xl sm:text-5xl text-[#F7F5F0] font-light">
              35~55 남성 <span className="font-semibold text-gold-gradient">스타일 아카이브</span>
            </h1>
            <p className="text-sm text-[#D8D4CA]/80 font-light max-w-2xl leading-relaxed">
              성숙한 남성의 스타일은 요란한 트렌드가 아닌, 몸의 실루엣을 자연스럽게 보완하는 테일러링과 은근한 소재의 차이에서 결정됩니다.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('ai-stylist')}
            className="inline-flex items-center gap-2 bg-[#D1AA75] hover:bg-[#E2BD8A] text-[#15191E] text-xs font-bold tracking-widest uppercase px-6 py-3.5 rounded-sm transition-all self-start md:self-end"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI 맞춤 코디 받기</span>
          </button>
        </div>

        {/* Category Pill Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#212730]">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`text-xs px-4 py-2.5 rounded-sm border whitespace-nowrap transition-all ${
              selectedCategory === null
                ? 'border-[#D1AA75] bg-[#D1AA75] text-[#15191E] font-bold'
                : 'border-[#262D37] bg-[#1A1F26] text-[#D8D4CA] hover:text-[#F7F5F0]'
            }`}
          >
            전체 스타일 6선
          </button>
          {INITIAL_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.name)}
              className={`text-xs px-4 py-2.5 rounded-sm border whitespace-nowrap transition-all ${
                selectedCategory === cat.name
                  ? 'border-[#D1AA75] bg-[#D1AA75] text-[#15191E] font-bold'
                  : 'border-[#262D37] bg-[#1A1F26] text-[#D8D4CA] hover:text-[#F7F5F0]'
              }`}
            >
              {cat.name} ({cat.englishName})
            </button>
          ))}
        </div>

        {/* Detailed Category View if specific selected, otherwise all grid */}
        {currentCategory ? (
          <div className="bg-[#1A1F26] border border-[#D1AA75]/40 rounded-sm overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-6 relative aspect-[4/3] lg:aspect-auto overflow-hidden bg-black">
                <img
                  src={currentCategory.imageUrl}
                  alt={currentCategory.name}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute top-4 left-4 bg-[#15191E]/90 border border-[#D1AA75]/30 text-[#D1AA75] text-xs font-semibold px-3 py-1 uppercase tracking-wider backdrop-blur-sm">
                  권장 연령: {currentCategory.recommendedAge}
                </div>
              </div>

              <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between space-y-8">
                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-display tracking-widest text-[#D1AA75] uppercase block mb-1">
                      {currentCategory.englishName}
                    </span>
                    <h2 className="font-editorial text-3xl sm:text-4xl text-[#F7F5F0] font-medium">
                      {currentCategory.name}
                    </h2>
                    <p className="text-sm text-[#D1AA75] font-light mt-1">
                      {currentCategory.tagline}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-[#D8D4CA] leading-relaxed font-light pt-2">
                    {currentCategory.description}
                  </p>

                  <div className="space-y-3 pt-4 border-t border-[#262D37]">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-[#F7F5F0]">
                      대표 핵심 에센셜 아이템:
                    </h4>
                    <div className="space-y-2">
                      {currentCategory.keyItems.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2.5 text-xs text-[#D8D4CA] bg-[#15191E] p-2.5 rounded-sm border border-[#212730]"
                        >
                          <Check className="w-3.5 h-3.5 text-[#D1AA75]" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#262D37] flex flex-wrap gap-3">
                  <button
                    onClick={() => setActiveTab('lookbook')}
                    className="inline-flex items-center gap-2 bg-[#D1AA75] hover:bg-[#E2BD8A] text-[#15191E] text-xs font-bold tracking-widest uppercase px-6 py-3 rounded-sm transition-all"
                  >
                    <span>이 스타일의 룩북 보기</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setActiveTab('shop')}
                    className="inline-flex items-center gap-2 border border-[#262D37] hover:border-[#D1AA75] text-[#D8D4CA] hover:text-[#F7F5F0] text-xs tracking-widest uppercase px-5 py-3 rounded-sm transition-all"
                  >
                    <span>매칭 상품 큐레이션 보기</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Grid of all categories */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {INITIAL_CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                onClick={() => setSelectedCategory(cat.name)}
                className="group cursor-pointer bg-[#1A1F26] border border-[#212730] hover:border-[#D1AA75] transition-all duration-300 rounded-sm overflow-hidden flex flex-col justify-between"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-black/40">
                  <img
                    src={cat.imageUrl}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#15191E]/90 border border-[#D1AA75]/30 px-2.5 py-1 text-[10px] tracking-widest text-[#D1AA75] font-semibold uppercase backdrop-blur-sm">
                    {cat.recommendedAge}
                  </div>
                </div>

                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-display uppercase tracking-widest text-[#D8D4CA]/60">
                      {cat.englishName}
                    </span>
                    <h3 className="font-editorial text-xl font-medium text-[#F7F5F0] group-hover:text-[#D1AA75] transition-colors mt-0.5">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-[#D1AA75] font-light mt-1">
                      {cat.tagline}
                    </p>
                    <p className="text-xs text-[#D8D4CA]/80 leading-relaxed font-light mt-2 line-clamp-3">
                      {cat.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#262D37] flex items-center justify-between text-xs text-[#D1AA75]">
                    <span>스타일 심층 분석</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
