import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, ArrowRight, ShieldCheck, Compass, Award } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <section className="relative overflow-hidden bg-[#15191E] border-b border-[#212730]">
      {/* Background Graphic / Image Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=2000&q=85"
          alt="MEN'S STYLE LAB Hero"
          className="w-full h-full object-cover object-top filter brightness-[0.38] contrast-[1.08] scale-[1.02] transform transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#15191E] via-[#15191E]/75 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#15191E] via-transparent to-black/30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 md:pt-32 md:pb-28">
        <div className="max-w-3xl space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A1F26]/90 border border-[#D1AA75]/40 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#D1AA75] animate-pulse" />
            <span className="text-xs tracking-[0.25em] uppercase font-semibold text-[#D1AA75]">
              PREMIUM GENTLEMEN ARCHIVE · AGE 35–55
            </span>
          </div>

          {/* Headline */}
          <div className="space-y-4">
            <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-[#F7F5F0] leading-[1.25]">
              나를 완성하는 <br />
              <span className="font-semibold text-gold-gradient">
                단 하나의 스타일.
              </span>
            </h1>
            <p className="text-base sm:text-lg text-[#D8D4CA] font-light leading-relaxed max-w-2xl">
              어깨와 허리의 미세한 1cm가 남자의 기품을 바꿉니다. 과장된 유행 대신 몸의 선을 존중하는 정통 테일러링, 로고 없는 콰이어트 럭셔리, 그리고 AI가 분석하는 당신만의 시그니처 룩을 만나보세요.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <button
              onClick={() => setActiveTab('ai-stylist')}
              className="inline-flex items-center justify-center gap-3 bg-[#D1AA75] hover:bg-[#E2BD8A] text-[#15191E] font-semibold text-sm tracking-widest uppercase px-7 py-4 rounded-sm shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#15191E]" />
              <span>AI 맞춤 스타일링 시작하기</span>
              <ArrowRight className="w-4 h-4 text-[#15191E]" />
            </button>

            <button
              onClick={() => setActiveTab('lookbook')}
              className="inline-flex items-center justify-center gap-2 border border-[#D8D4CA]/40 hover:border-[#D1AA75] hover:text-[#D1AA75] text-[#F7F5F0] font-medium text-sm tracking-widest uppercase px-6 py-4 rounded-sm backdrop-blur-sm transition-all duration-200 cursor-pointer"
            >
              <span>2026 에디토리얼 룩북</span>
            </button>
          </div>

          {/* Value Pillars */}
          <div className="pt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-[#212730]/80">
            <div className="flex items-start gap-3">
              <Compass className="w-5 h-5 text-[#D1AA75] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-semibold tracking-wider text-[#F7F5F0] uppercase">
                  35–55 체형 보완 핏
                </h4>
                <p className="text-xs text-[#D8D4CA]/70 mt-0.5">
                  원턱과 사이드 어드저스터로 편안한 복부와 곧은 실루엣
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Award className="w-5 h-5 text-[#D1AA75] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-semibold tracking-wider text-[#F7F5F0] uppercase">
                  타임리스 프리미엄 소재
                </h4>
                <p className="text-xs text-[#D8D4CA]/70 mt-0.5">
                  내몽골산 캐시미어, 파인 메리노 울과 웰트 슈즈의 깊이
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#D1AA75] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-semibold tracking-wider text-[#F7F5F0] uppercase">
                  지능형 AI 퍼스널 큐레이션
                </h4>
                <p className="text-xs text-[#D8D4CA]/70 mt-0.5">
                  나이·체형·TPO·예산에 최적화된 상·하의·슈즈 배색 제안
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
