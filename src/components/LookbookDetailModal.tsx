import React from 'react';
import { useApp } from '../context/AppContext';
import { LookbookItem } from '../types';
import { X, Bookmark, BookmarkCheck, Calendar, Sparkles, Check } from 'lucide-react';

export const LookbookDetailModal: React.FC<{
  lookbook: LookbookItem;
  onClose: () => void;
}> = ({ lookbook, onClose }) => {
  const { userSaved, toggleSaveLookbook, setActiveTab } = useApp();
  const isSaved = userSaved.savedLookbooks.includes(lookbook.id);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div
        className="relative bg-[#1A1F26] border border-[#D1AA75]/50 w-full max-w-5xl rounded-sm shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-[#15191E]/80 text-[#D8D4CA] hover:text-[#F7F5F0] hover:bg-[#15191E] transition-colors"
          aria-label="닫기"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[85vh] overflow-y-auto">
          {/* Main Visuals Column */}
          <div className="lg:col-span-7 bg-black flex flex-col">
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <img
                src={lookbook.imageUrl}
                alt={lookbook.title}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute bottom-4 left-4 bg-[#15191E]/90 border border-[#D1AA75]/30 px-3 py-1 text-xs text-[#D1AA75] font-semibold uppercase backdrop-blur-sm">
                {lookbook.season} · {lookbook.category}
              </div>
            </div>

            {/* Additional editorial cuts if available */}
            {lookbook.additionalImages && lookbook.additionalImages.length > 0 && (
              <div className="p-4 grid grid-cols-2 gap-3 bg-[#12161A] border-t border-[#212730]">
                {lookbook.additionalImages.map((img, idx) => (
                  <div key={idx} className="aspect-[4/3] overflow-hidden rounded-sm bg-black/50">
                    <img
                      src={img}
                      alt={`${lookbook.title} detail ${idx + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Details & Outfit Breakdown Column */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-[#1A1F26]">
            <div className="space-y-5">
              <div>
                <span className="text-xs font-display tracking-widest text-[#D1AA75] uppercase block mb-1">
                  EDITORIAL ARCHIVE #{lookbook.id.toUpperCase()}
                </span>
                <h2 className="font-editorial text-2xl sm:text-3xl font-medium text-[#F7F5F0]">
                  {lookbook.title}
                </h2>
                <p className="text-xs text-[#D8D4CA]/80 font-light mt-1">
                  {lookbook.subtitle}
                </p>
              </div>

              {/* Badges: Age & TPO */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-[#15191E] p-2.5 rounded-sm border border-[#212730]">
                  <span className="text-[10px] text-[#D1AA75] uppercase block mb-0.5">권장 타깃</span>
                  <span className="text-[#F7F5F0] font-medium">{lookbook.ageRecommendation}</span>
                </div>
                <div className="bg-[#15191E] p-2.5 rounded-sm border border-[#212730]">
                  <span className="text-[10px] text-[#D1AA75] uppercase block mb-0.5">추천 TPO</span>
                  <span className="text-[#F7F5F0] font-medium truncate block">{lookbook.tpo}</span>
                </div>
              </div>

              {/* Concept description */}
              <div className="text-xs text-[#D8D4CA] leading-relaxed font-light space-y-2 border-t border-[#262D37] pt-4">
                <p>{lookbook.description}</p>
                <div className="bg-[#15191E] p-3 rounded-sm border-l-2 border-[#D1AA75] text-[11px] text-[#D1AA75]">
                  <span className="font-bold block mb-0.5">스타일링 핵심:</span>
                  {lookbook.stylingConcept}
                </div>
              </div>

              {/* Item pieces breakdown */}
              <div className="space-y-2.5 border-t border-[#262D37] pt-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#F7F5F0]">
                  착장 개별 아이템 분해
                </h4>
                <div className="space-y-2">
                  {lookbook.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-[#15191E] p-3 rounded-sm border border-[#212730] flex items-start gap-2.5"
                    >
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#D1AA75] bg-[#1A1F26] border border-[#262D37] px-2 py-0.5 rounded-sm shrink-0">
                        {item.part}
                      </span>
                      <div className="space-y-0.5">
                        <div className="text-xs font-semibold text-[#F7F5F0]">{item.name}</div>
                        <div className="text-[11px] text-[#D8D4CA]/70">{item.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-[#262D37] flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => toggleSaveLookbook(lookbook.id)}
                className={`w-full sm:flex-1 inline-flex items-center justify-center gap-2 text-xs font-semibold tracking-wider uppercase py-3 rounded-sm transition-all border ${
                  isSaved
                    ? 'border-[#D1AA75] bg-[#D1AA75] text-[#15191E]'
                    : 'border-[#262D37] bg-[#15191E] text-[#D8D4CA] hover:border-[#D1AA75] hover:text-[#F7F5F0]'
                }`}
              >
                {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                <span>{isSaved ? 'MY STYLE에 저장됨' : '룩북 보관하기'}</span>
              </button>

              <button
                onClick={() => {
                  onClose();
                  setActiveTab('ai-stylist');
                }}
                className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 bg-[#D1AA75] hover:bg-[#E2BD8A] text-[#15191E] text-xs font-bold tracking-wider uppercase py-3 rounded-sm transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>AI로 내 체형 적용</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
