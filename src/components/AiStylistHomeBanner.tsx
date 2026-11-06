import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, ArrowRight, UserCheck, ShieldCheck, Palette, Layers } from 'lucide-react';

export const AiStylistHomeBanner: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <section className="py-20 bg-gradient-to-b from-[#15191E] via-[#1A1F26] to-[#15191E] border-b border-[#212730]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-[#15191E] border border-[#D1AA75]/40 rounded-sm overflow-hidden p-8 sm:p-14 shadow-2xl">
          {/* Subtle gold grid pattern */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#D1AA75]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A1F26] border border-[#D1AA75]/30">
              <Sparkles className="w-3.5 h-3.5 text-[#D1AA75]" />
              <span className="text-[11px] font-semibold tracking-widest uppercase text-[#D1AA75]">
                AI PERSONAL STYLING LAB
              </span>
            </div>

            <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-[#F7F5F0] font-light leading-tight">
              35~55세 남성 체형과 TPO를 정밀 분석하는 <br />
              <span className="font-semibold text-gold-gradient">
                지능형 AI 퍼스널 스타일리스트
              </span>
            </h2>

            <p className="text-sm text-[#D8D4CA]/90 font-light leading-relaxed max-w-2xl">
              어깨선이 굳어지거나 허리 둘레가 변해도 멋을 잃지 않는 방법이 있습니다. 당신의 나이, 체형 특성(복부 커버, 상체 발달 등), 참석할 자리의 격식, 예산에 맞추어 상의·하의·신발·색상 조합과 실전 팁을 제안합니다.
            </p>

            {/* Feature points */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="flex items-center gap-2.5 text-xs text-[#D8D4CA]">
                <UserCheck className="w-4 h-4 text-[#D1AA75]" />
                <span>체형 단점 완벽 보완</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#D8D4CA]">
                <Palette className="w-4 h-4 text-[#D1AA75]" />
                <span>황금 배색 이론 연산</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#D8D4CA]">
                <Layers className="w-4 h-4 text-[#D1AA75]" />
                <span>상의·하의·슈즈 풀세트</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => setActiveTab('ai-stylist')}
                className="inline-flex items-center gap-3 bg-[#D1AA75] hover:bg-[#E2BD8A] text-[#15191E] font-bold text-xs tracking-widest uppercase px-8 py-4 rounded-sm shadow-xl transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#15191E]" />
                <span>1분 만에 내 맞춤 코디 분석받기</span>
                <ArrowRight className="w-4 h-4 text-[#15191E]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
