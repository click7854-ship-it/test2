import React, { useState } from 'react';
import { Info, X } from 'lucide-react';

export const SampleNoticeBanner: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-[#1A1F26] border-b border-[#D1AA75]/20 text-xs text-[#D8D4CA] px-4 py-2 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Info className="w-3.5 h-3.5 text-[#D1AA75] shrink-0" />
          <p className="leading-tight">
            <span className="text-[#D1AA75] font-semibold tracking-wider mr-1.5">[STYLE LAB NOTICE]</span>
            본 플랫폼의 제품 및 스타일링 데이터는 35~55세 남성을 위한 패션 제안 및 AI 스타일링 데모 샘플입니다. 실제 상업적 판매 또는 특정 브랜드와의 공식 제휴 관계가 아님을 알려드립니다.
          </p>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-[#D8D4CA] hover:text-[#F7F5F0] p-1 transition-colors shrink-0"
          aria-label="안내 닫기"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
