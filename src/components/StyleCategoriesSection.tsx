import React from 'react';
import { useApp } from '../context/AppContext';
import { INITIAL_CATEGORIES } from '../data/mockData';
import { StyleCategory } from '../types';
import { ArrowUpRight, Sparkles } from 'lucide-react';

export const StyleCategoriesSection: React.FC = () => {
  const { setActiveTab, setSelectedCategory } = useApp();

  const handleCategorySelect = (category: StyleCategory) => {
    setSelectedCategory(category.name);
    setActiveTab('style');
  };

  return (
    <section className="py-20 bg-[#15191E] border-b border-[#212730]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <span className="text-xs font-bold tracking-[0.25em] text-[#D1AA75] uppercase flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              STYLE ARCHIVE
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#F7F5F0] font-light">
              35~55세 남성을 위한 <span className="font-semibold text-gold-gradient">6가지 스타일 미학</span>
            </h2>
            <p className="text-sm text-[#D8D4CA]/80 font-light max-w-xl">
              어떤 자리에서도 자연스러운 품위를 유지할 수 있도록 정교하게 정돈된 테일러링과 라이프스타일 카테고리입니다.
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedCategory(null);
              setActiveTab('style');
            }}
            className="text-xs tracking-widest text-[#D1AA75] hover:text-[#E2BD8A] flex items-center gap-1 uppercase transition-colors self-start md:self-end group"
          >
            <span>전체 카테고리 심층 분석 보기</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* 6 Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {INITIAL_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleCategorySelect(cat)}
              className="group cursor-pointer bg-[#1A1F26] border border-[#212730] hover:border-[#D1AA75]/60 transition-all duration-300 flex flex-col overflow-hidden rounded-sm hover:-translate-y-1 shadow-lg"
            >
              {/* Category Image with Zoom on hover */}
              <div className="relative aspect-[4/3] overflow-hidden bg-black/40">
                <img
                  src={cat.imageUrl}
                  alt={cat.name}
                  className="w-full h-full object-cover object-center filter brightness-90 contrast-[1.05] group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1F26] via-transparent to-transparent opacity-80" />
                <div className="absolute top-3 left-3 bg-[#15191E]/90 border border-[#D1AA75]/30 px-2.5 py-1 text-[10px] tracking-widest text-[#D1AA75] font-semibold uppercase backdrop-blur-sm">
                  {cat.recommendedAge}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-baseline justify-between mb-1">
                    <h3 className="font-editorial text-xl font-medium text-[#F7F5F0] group-hover:text-[#D1AA75] transition-colors">
                      {cat.name}
                    </h3>
                    <span className="text-[11px] font-display tracking-widest text-[#D8D4CA]/50 uppercase">
                      {cat.englishName}
                    </span>
                  </div>
                  <p className="text-xs text-[#D1AA75] font-light mb-2.5">
                    {cat.tagline}
                  </p>
                  <p className="text-xs text-[#D8D4CA]/80 leading-relaxed font-light line-clamp-2">
                    {cat.description}
                  </p>
                </div>

                {/* Key items */}
                <div className="pt-3 border-t border-[#262D37]">
                  <span className="text-[10px] uppercase tracking-wider text-[#D8D4CA]/60 block mb-2 font-medium">
                    대표 핵심 아이템:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.keyItems.map((item, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] bg-[#15191E] text-[#D8D4CA] border border-[#262D37] px-2 py-0.5 rounded-sm"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
