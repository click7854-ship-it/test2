import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { WEEKLY_CURATIONS } from '../data/mockData';
import { Sparkles, ArrowRight, Check, Compass } from 'lucide-react';

export const WeeklyCurationsSection: React.FC = () => {
  const { setActiveTab } = useApp();
  const [selectedIdx, setSelectedIdx] = useState(0);
  const current = WEEKLY_CURATIONS[selectedIdx];

  const handleApplyToAi = () => {
    setActiveTab('ai-stylist');
  };

  return (
    <section className="py-20 bg-[#12161A] border-b border-[#212730]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-bold tracking-[0.25em] text-[#D1AA75] uppercase flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" />
              WEEKLY EDITORIAL
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#F7F5F0] font-light mt-1">
              이번 주 추천 코디 <span className="text-xs font-sans tracking-widest text-[#D1AA75] ml-2">WEEK 45</span>
            </h2>
            <p className="text-sm text-[#D8D4CA]/80 font-light mt-1">
              기온 변화와 격식 있는 비즈니스·사교 일정을 고려한 에디터스 픽(Editor's Pick) 스타일링
            </p>
          </div>

          {/* Selector Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
            {WEEKLY_CURATIONS.map((c, idx) => (
              <button
                key={c.id}
                onClick={() => setSelectedIdx(idx)}
                className={`text-xs px-4 py-2 rounded-sm border whitespace-nowrap transition-all ${
                  selectedIdx === idx
                    ? 'border-[#D1AA75] bg-[#D1AA75] text-[#15191E] font-bold'
                    : 'border-[#262D37] bg-[#1A1F26] text-[#D8D4CA] hover:text-[#F7F5F0]'
                }`}
              >
                LOOK 0{idx + 1}. {c.category}
              </button>
            ))}
          </div>
        </div>

        {/* Curation Showcase Card */}
        <div className="bg-[#1A1F26] border border-[#262D37] grid grid-cols-1 lg:grid-cols-12 overflow-hidden rounded-sm shadow-xl">
          {/* Image Column */}
          <div className="lg:col-span-5 relative aspect-[4/5] lg:aspect-auto overflow-hidden bg-black">
            <img
              src={current.image}
              alt={current.title}
              className="w-full h-full object-cover object-center filter brightness-95"
            />
            <div className="absolute top-4 left-4 bg-[#15191E]/90 border border-[#D1AA75]/40 text-[#D1AA75] text-xs font-semibold px-3 py-1 uppercase tracking-wider backdrop-blur-sm">
              {current.tag}
            </div>
          </div>

          {/* Details Column */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="border-b border-[#262D37] pb-4">
                <span className="text-xs tracking-widest text-[#D1AA75] uppercase font-semibold">
                  {current.category}
                </span>
                <h3 className="font-editorial text-2xl sm:text-3xl font-medium text-[#F7F5F0] mt-1">
                  {current.title}
                </h3>
                <p className="text-sm text-[#D8D4CA]/80 font-light mt-1">
                  {current.subtitle}
                </p>
              </div>

              {/* Outfit Breakdown */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#F7F5F0]">
                  착장 구성 분석 (OUTFIT BREAKDOWN)
                </h4>

                <div className="space-y-2.5">
                  <div className="flex items-start gap-3 bg-[#15191E] p-3 rounded-sm border border-[#212730]">
                    <span className="text-[11px] font-bold tracking-wider text-[#D1AA75] uppercase w-12 shrink-0 pt-0.5">
                      상의
                    </span>
                    <span className="text-xs text-[#F7F5F0] font-light leading-relaxed">
                      {current.top}
                    </span>
                  </div>

                  <div className="flex items-start gap-3 bg-[#15191E] p-3 rounded-sm border border-[#212730]">
                    <span className="text-[11px] font-bold tracking-wider text-[#D1AA75] uppercase w-12 shrink-0 pt-0.5">
                      하의
                    </span>
                    <span className="text-xs text-[#F7F5F0] font-light leading-relaxed">
                      {current.bottom}
                    </span>
                  </div>

                  <div className="flex items-start gap-3 bg-[#15191E] p-3 rounded-sm border border-[#212730]">
                    <span className="text-[11px] font-bold tracking-wider text-[#D1AA75] uppercase w-12 shrink-0 pt-0.5">
                      슈즈
                    </span>
                    <span className="text-xs text-[#F7F5F0] font-light leading-relaxed">
                      {current.shoes}
                    </span>
                  </div>
                </div>
              </div>

              {/* Stylist Advice */}
              <div className="bg-[#12161A] border-l-2 border-[#D1AA75] p-4 text-xs text-[#D8D4CA] leading-relaxed">
                <span className="font-semibold text-[#D1AA75] block mb-1">
                  STYLE LAB 디렉터 코멘트:
                </span>
                {current.advice}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-[#262D37] flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={handleApplyToAi}
                className="inline-flex items-center justify-center gap-2 bg-[#D1AA75] hover:bg-[#E2BD8A] text-[#15191E] font-semibold text-xs tracking-widest uppercase px-6 py-3 rounded-sm transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI로 내 체형에 맞춰 변형하기</span>
              </button>

              <button
                onClick={() => setActiveTab('lookbook')}
                className="inline-flex items-center justify-center gap-2 border border-[#262D37] hover:border-[#D1AA75] hover:text-[#D1AA75] text-[#D8D4CA] text-xs tracking-widest uppercase px-5 py-3 rounded-sm transition-all"
              >
                <span>전체 룩북 둘러보기</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
