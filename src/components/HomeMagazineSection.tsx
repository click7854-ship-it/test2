import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MagazineArticle } from '../types';
import { MagazineDetailModal } from './MagazineDetailModal';
import { Sparkles, ArrowRight, Clock, User } from 'lucide-react';

export const HomeMagazineSection: React.FC = () => {
  const { articles, setActiveTab } = useApp();
  const [selectedArticle, setSelectedArticle] = useState<MagazineArticle | null>(null);

  const previewArticles = articles.slice(0, 3);

  return (
    <section className="py-20 bg-[#12161A] border-b border-[#212730]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-xs font-bold tracking-[0.25em] text-[#D1AA75] uppercase flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              EDITORIAL INSIGHTS
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#F7F5F0] font-light mt-1">
              에디토리얼 & <span className="font-semibold text-gold-gradient">스타일 에세이</span>
            </h2>
            <p className="text-sm text-[#D8D4CA]/80 font-light mt-1">
              단순한 트렌드 나열을 넘어 남자의 라이프스타일과 옷의 깊이를 탐구하는 칼럼
            </p>
          </div>

          <button
            onClick={() => setActiveTab('magazine')}
            className="text-xs tracking-widest text-[#D1AA75] hover:text-[#E2BD8A] flex items-center gap-1 uppercase transition-colors self-start md:self-end group"
          >
            <span>매거진 전체 읽기</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {previewArticles.map((art) => (
            <div
              key={art.id}
              onClick={() => setSelectedArticle(art)}
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
              </div>

              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-editorial text-lg font-medium text-[#F7F5F0] group-hover:text-[#D1AA75] transition-colors line-clamp-2">
                    {art.title}
                  </h3>
                  <p className="text-xs text-[#D8D4CA]/80 leading-relaxed font-light line-clamp-2 mt-2">
                    {art.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#262D37] flex items-center justify-between text-xs text-[#D8D4CA]/70">
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-[#D1AA75]" />
                    {art.author.split('(')[0]}
                  </span>
                  <span className="text-[#D1AA75] flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {art.readTime}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedArticle && (
          <MagazineDetailModal
            article={selectedArticle}
            onClose={() => setSelectedArticle(null)}
          />
        )}
      </div>
    </section>
  );
};
