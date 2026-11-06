import React from 'react';
import { useApp } from '../context/AppContext';
import { TabType } from '../types';
import { ShieldCheck, Sparkles, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab } = useApp();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateTo = (tab: TabType) => {
    setActiveTab(tab);
    scrollToTop();
  };

  return (
    <footer className="bg-[#0E1114] text-[#D8D4CA] border-t border-[#212730] pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-[#1F242B]">
          {/* Brand Manifesto */}
          <div className="md:col-span-2 space-y-4">
            <span className="font-serif-brand text-2xl font-bold tracking-widest text-[#F7F5F0]">
              MEN'S STYLE LAB
            </span>
            <p className="font-editorial text-lg text-[#D1AA75] italic">
              "나를 완성하는 단 하나의 스타일."
            </p>
            <p className="text-sm leading-relaxed text-[#D8D4CA]/80 max-w-md">
              MEN'S STYLE LAB은 35세부터 55세까지, 삶의 무게와 품격을 함께 지닌 남성을 위한 현대적 편집 플랫폼입니다. 과장된 유행 대신 몸의 선을 존중하는 테일러링과 최고급 소재, 지능형 AI 스타일링을 통해 당신만의 독보적인 실루엣을 제안합니다.
            </p>
            <div className="flex items-center gap-2 pt-2 text-xs text-[#D1AA75]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI-Powered Personal Styling & Editorial Magazine</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-[#F7F5F0] mb-4">
              ARCHIVE & SERVICES
            </h4>
            <ul className="space-y-2.5 text-xs tracking-wider">
              <li>
                <button
                  onClick={() => navigateTo('style')}
                  className="hover:text-[#D1AA75] transition-colors"
                >
                  STYLE CATEGORIES (스타일 카테고리)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('ai-stylist')}
                  className="hover:text-[#D1AA75] text-[#D1AA75] font-semibold transition-colors flex items-center gap-1"
                >
                  AI STYLIST (맞춤 코디 추천)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('lookbook')}
                  className="hover:text-[#D1AA75] transition-colors"
                >
                  LOOKBOOK (2026 에디토리얼 화보)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('shop')}
                  className="hover:text-[#D1AA75] transition-colors"
                >
                  SHOP (큐레이션 샘플 아이템)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('magazine')}
                  className="hover:text-[#D1AA75] transition-colors"
                >
                  MAGAZINE (남성복 칼럼 & 가이드)
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigateTo('my-style')}
                  className="hover:text-[#D1AA75] transition-colors"
                >
                  MY STYLE (내 보관함 & 추천 기록)
                </button>
              </li>
            </ul>
          </div>

          {/* Platform Policy & Admin */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-[#F7F5F0] mb-4">
              EDITORIAL LAB
            </h4>
            <p className="text-xs leading-relaxed text-[#D8D4CA]/70 mb-4">
              본 플랫폼의 추천 데이터는 패션 에디터 가이드라인과 Google Gemini 3.8 모델의 앙상블을 통해 실시간 연산됩니다.
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigateTo('admin')}
                className="inline-flex items-center gap-2 text-xs text-[#D1AA75] border border-[#D1AA75]/40 px-3 py-1.5 rounded-sm hover:bg-[#D1AA75] hover:text-[#15191E] transition-all"
              >
                <span>관리자 데모 모드 진입</span>
              </button>
            </div>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[11px] text-[#D8D4CA]/60">
          <div className="flex items-start gap-2 max-w-3xl">
            <ShieldCheck className="w-4 h-4 text-[#D1AA75] shrink-0 mt-0.5" />
            <p>
              [샘플 안내 및 법적 고지] 본 웹사이트 내 제시된 제품 이미지, 가격 및 브랜드명(‘[샘플]’ 표기)은 35~55세 남성 스타일 큐레이션 및 AI 코디 테스트를 위한 가상 샘플 데이터입니다. 실제 상업적 판매 또는 특정 브랜드와의 공식 제휴 관계가 아니며, 허가되지 않은 로고나 상표를 무단으로 영리 목적에 사용하지 않습니다.
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <span>© 2026 MEN'S STYLE LAB. All rights reserved.</span>
            <button
              onClick={scrollToTop}
              className="p-2 border border-[#212730] hover:border-[#D1AA75] hover:text-[#D1AA75] rounded-sm transition-colors"
              title="맨 위로 이동"
              aria-label="맨 위로 이동"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
