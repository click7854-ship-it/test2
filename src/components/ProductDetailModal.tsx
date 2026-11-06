import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProductItem } from '../types';
import { X, Bookmark, BookmarkCheck, ExternalLink, ShieldCheck, Sparkles, Check, AlertCircle } from 'lucide-react';

export const ProductDetailModal: React.FC<{
  product: ProductItem;
  onClose: () => void;
}> = ({ product, onClose }) => {
  const { userSaved, toggleSaveProduct, setActiveTab } = useApp();
  const isSaved = userSaved.savedProducts.includes(product.id);
  const [linkNoticeOpen, setLinkNoticeOpen] = useState(false);

  const handleExternalLink = () => {
    setLinkNoticeOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div
        className="relative bg-[#1A1F26] border border-[#D1AA75]/50 w-full max-w-4xl rounded-sm shadow-2xl overflow-hidden my-8"
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

        <div className="grid grid-cols-1 md:grid-cols-2 max-h-[85vh] overflow-y-auto">
          {/* Image */}
          <div className="relative aspect-square md:aspect-auto bg-black overflow-hidden">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute top-4 left-4 bg-[#15191E]/95 border border-[#D1AA75]/40 text-[#D1AA75] text-[10px] font-semibold px-2.5 py-1 uppercase tracking-wider backdrop-blur-sm">
              [샘플 큐레이션 아이템]
            </div>
          </div>

          {/* Details */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6 bg-[#1A1F26]">
            <div className="space-y-4">
              <div>
                <span className="text-[11px] font-display tracking-widest text-[#D1AA75] uppercase block mb-1">
                  {product.brand}
                </span>
                <h2 className="font-editorial text-2xl font-medium text-[#F7F5F0]">
                  {product.name}
                </h2>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-lg font-bold text-[#F7F5F0]">
                    {product.samplePriceDisplay}
                  </span>
                  <span className="text-[11px] text-[#D8D4CA]/50 font-normal">
                    (스타일링 데모 기준가)
                  </span>
                </div>
              </div>

              {/* Sample Disclaimer Notice */}
              <div className="bg-[#15191E] border border-[#D1AA75]/25 p-3 rounded-sm flex items-start gap-2 text-[11px] text-[#D8D4CA]/90">
                <ShieldCheck className="w-4 h-4 text-[#D1AA75] shrink-0 mt-0.5" />
                <p>
                  본 제품은 35~55세 남성 스타일 가이드를 위해 연출된 <strong className="text-[#D1AA75]">가상 샘플 데이터</strong>입니다. 실제 상업적 판매 또는 특정 브랜드 공식 제휴 상품이 아닙니다.
                </p>
              </div>

              {/* Description */}
              <div className="space-y-3 text-xs text-[#D8D4CA] font-light leading-relaxed">
                <div>
                  <h4 className="font-semibold text-[#F7F5F0] mb-1">제품 소개:</h4>
                  <p>{product.description}</p>
                </div>

                <div className="bg-[#15191E] p-3 rounded-sm border border-[#212730] space-y-1">
                  <span className="font-semibold text-[#D1AA75] block">소재 및 패브릭 정보:</span>
                  <p className="text-[#F7F5F0]">{product.fabricDetails}</p>
                </div>

                <div className="bg-[#15191E] p-3 rounded-sm border-l-2 border-[#D1AA75] space-y-1">
                  <span className="font-semibold text-[#D1AA75] block">에디터 스타일링 팁:</span>
                  <p>{product.stylingNotes}</p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {product.styleTags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] bg-[#15191E] text-[#D8D4CA] border border-[#262D37] px-2 py-0.5 rounded-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-[#262D37] space-y-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleSaveProduct(product.id)}
                  className={`flex-1 inline-flex items-center justify-center gap-2 text-xs font-semibold tracking-wider uppercase py-3 rounded-sm transition-all border ${
                    isSaved
                      ? 'border-[#D1AA75] bg-[#D1AA75] text-[#15191E]'
                      : 'border-[#262D37] bg-[#15191E] text-[#D8D4CA] hover:border-[#D1AA75] hover:text-[#F7F5F0]'
                  }`}
                >
                  {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                  <span>{isSaved ? 'MY STYLE에 저장됨' : '관심 상품 저장'}</span>
                </button>

                <button
                  onClick={handleExternalLink}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-[#15191E] border border-[#D1AA75] hover:bg-[#D1AA75] text-[#D1AA75] hover:text-[#15191E] text-xs font-semibold tracking-wider uppercase py-3 rounded-sm transition-all"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>공식 판매처 방문 (샘플 링크)</span>
                </button>
              </div>

              {/* External Link Notice Modal/Banner */}
              {linkNoticeOpen && (
                <div className="bg-[#12161A] border border-[#D1AA75]/50 p-3 rounded-sm space-y-1.5 text-xs text-[#D8D4CA]">
                  <div className="flex items-center justify-between font-semibold text-[#D1AA75]">
                    <span>[외부 링크 시뮬레이션 안내]</span>
                    <button
                      onClick={() => setLinkNoticeOpen(false)}
                      className="text-[10px] underline text-[#D8D4CA]"
                    >
                      닫기
                    </button>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    본 플랫폼은 스타일 가이드 데모 환경으로, 무단 제휴 방지를 위해 외부 상거래 사이트로의 자동 리다이렉트를 차단하고 있습니다. 실제 구매 연동은 제휴 파트너십 체결 후 오픈됩니다.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
