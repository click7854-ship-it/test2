import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StylingInput, StylingRecommendation } from '../types';
import { requestAiStyling } from '../services/aiService';
import {
  Sparkles,
  RotateCcw,
  Bookmark,
  Check,
  Share2,
  AlertCircle,
  Loader2,
  Layers,
  Palette,
  Compass,
  CheckCircle2,
  XCircle,
  HelpCircle,
} from 'lucide-react';

export const AiStylistPage: React.FC = () => {
  const { addRecommendationHistory, showToast, userSaved } = useApp();

  const [input, setInput] = useState<StylingInput>({
    ageGroup: '40대 초반 (40~44세)',
    bodyType: '복부 커버형 (원턱 및 드레이프 필요)',
    occasion: '중요 비즈니스 미팅 / PT',
    budget: '프리미엄 컨템포러리 (100만원~250만원대)',
    preferredStyle: '모던 클래식',
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recommendation, setRecommendation] = useState<StylingRecommendation | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  const ageOptions = [
    '30대 후반 (35~39세)',
    '40대 초반 (40~44세)',
    '40대 후반 (45~49세)',
    '50대 이상 (50~55세)',
  ];

  const bodyTypeOptions = [
    '표준 체형 (균형 잡힌 레귤러)',
    '복부 커버형 (원턱 및 드레이프 필요)',
    '어깨/상체 발달형 (부드러운 언컨 숄더)',
    '슬림형 (볼륨감 있는 레이어드 필요)',
    '아담한 체형 (노브레이크 핏 권장)',
  ];

  const occasionOptions = [
    '중요 비즈니스 미팅 / PT',
    '스마트 오피스 데일리 출근',
    '주말 브런치 & 사적 데이트',
    '호텔 라운지 & 디너 파티',
    '해외 출장 및 장거리 이동',
    '골프 클럽하우스 & 네트워킹',
  ];

  const budgetOptions = [
    '합리적인 베이직 (가성비 클래식)',
    '프리미엄 컨템포러리 (100만원~250만원대)',
    '하이엔드 럭셔리 (최고급 캐시미어 & 비스포크)',
  ];

  const styleOptions = [
    '모던 클래식',
    '스마트 캐주얼',
    '콰이어트 럭셔리',
    '비즈니스 포멀',
    '릴랙스드 위켄드',
    '헤리티지 & 아우터',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setIsSaved(false);

    try {
      const res = await requestAiStyling(input);
      if (res.success && res.data) {
        const fullRec = {
          ...res.data,
          id: `rec-${Date.now()}`,
          createdAt: new Date().toISOString(),
          inputSnapshot: input,
        };
        setRecommendation(fullRec);
        // Automatically save to history
        addRecommendationHistory(fullRec);
        setIsSaved(true);
        showToast('AI 스타일리스트의 맞춤 큐레이션이 완성되었습니다.');
      } else {
        throw new Error(res.error || '스타일링 생성 중 문제가 발생했습니다.');
      }
    } catch (err: any) {
      console.error(err);
      setError(
        err.message || '서버와의 통신이 원활하지 않습니다. 잠시 후 다시 시도해 주세요.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopyReport = () => {
    if (!recommendation) return;
    const text = `[MEN'S STYLE LAB 맞춤 스타일링]\n제목: ${recommendation.title}\n컨셉: ${recommendation.concept}\n상의: ${recommendation.top.item}\n하의: ${recommendation.bottom.item}\n슈즈: ${recommendation.shoes.item}\n색상: ${recommendation.colorPalette.primary} / ${recommendation.colorPalette.secondary} / ${recommendation.colorPalette.accent}`;
    navigator.clipboard.writeText(text);
    showToast('스타일링 리포트 텍스트가 클립보드에 복사되었습니다.');
  };

  return (
    <div className="py-12 bg-[#15191E] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A1F26] border border-[#D1AA75]/30">
            <Sparkles className="w-3.5 h-3.5 text-[#D1AA75]" />
            <span className="text-[11px] font-semibold tracking-widest uppercase text-[#D1AA75]">
              AI PERSONAL STYLIST
            </span>
          </div>
          <h1 className="font-editorial text-3xl sm:text-5xl text-[#F7F5F0] font-light">
            당신만을 위한 <span className="text-gold-gradient font-medium">단 하나의 시그니처 룩</span>
          </h1>
          <p className="text-sm text-[#D8D4CA]/80 font-light leading-relaxed">
            35~55세 남성의 체형 변화, 사회적 위상, TPO에 최적화된 테일러링과 색상 조합을 Google Gemini AI가 정교하게 연산하여 제안합니다.
          </p>
        </div>

        {/* Input Form Section */}
        <div className="bg-[#1A1F26] border border-[#262D37] p-6 sm:p-10 rounded-sm shadow-xl">
          <div className="flex items-center justify-between border-b border-[#262D37] pb-4 mb-8">
            <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-[#F7F5F0] flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#D1AA75]" />
              스타일 프로필 설정 (STEP 01)
            </h2>
            <span className="text-xs text-[#D8D4CA]/60">모든 항목 필수</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* 1. Age Group */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#D1AA75] mb-2.5">
                1. 연령대 (AGE GROUP)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {ageOptions.map((opt) => (
                  <button
                    type="button"
                    key={opt}
                    onClick={() => setInput({ ...input, ageGroup: opt })}
                    className={`text-xs px-3.5 py-3 rounded-sm border text-center transition-all ${
                      input.ageGroup === opt
                        ? 'border-[#D1AA75] bg-[#D1AA75]/15 text-[#D1AA75] font-semibold'
                        : 'border-[#262D37] bg-[#15191E] text-[#D8D4CA] hover:border-[#D1AA75]/50'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Body Type */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#D1AA75] mb-2.5">
                2. 체형 특성 (BODY SILHOUETTE)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {bodyTypeOptions.map((opt) => (
                  <button
                    type="button"
                    key={opt}
                    onClick={() => setInput({ ...input, bodyType: opt })}
                    className={`text-xs px-3.5 py-3 rounded-sm border text-left transition-all ${
                      input.bodyType === opt
                        ? 'border-[#D1AA75] bg-[#D1AA75]/15 text-[#D1AA75] font-semibold'
                        : 'border-[#262D37] bg-[#15191E] text-[#D8D4CA] hover:border-[#D1AA75]/50'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Occasion / TPO */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#D1AA75] mb-2.5">
                3. 착용 상황 (OCCASION / TPO)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {occasionOptions.map((opt) => (
                  <button
                    type="button"
                    key={opt}
                    onClick={() => setInput({ ...input, occasion: opt })}
                    className={`text-xs px-3.5 py-3 rounded-sm border text-left transition-all ${
                      input.occasion === opt
                        ? 'border-[#D1AA75] bg-[#D1AA75]/15 text-[#D1AA75] font-semibold'
                        : 'border-[#262D37] bg-[#15191E] text-[#D8D4CA] hover:border-[#D1AA75]/50'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Preferred Style & Budget */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#D1AA75] mb-2.5">
                  4. 선호하는 스타일 (PREFERRED STYLE)
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {styleOptions.map((opt) => (
                    <button
                      type="button"
                      key={opt}
                      onClick={() => setInput({ ...input, preferredStyle: opt })}
                      className={`text-xs px-3 py-2.5 rounded-sm border text-left transition-all ${
                        input.preferredStyle === opt
                          ? 'border-[#D1AA75] bg-[#D1AA75]/15 text-[#D1AA75] font-semibold'
                          : 'border-[#262D37] bg-[#15191E] text-[#D8D4CA] hover:border-[#D1AA75]/50'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#D1AA75] mb-2.5">
                  5. 예산 범위 (BUDGET RANGE)
                </label>
                <div className="space-y-2.5">
                  {budgetOptions.map((opt) => (
                    <button
                      type="button"
                      key={opt}
                      onClick={() => setInput({ ...input, budget: opt })}
                      className={`w-full text-xs px-3.5 py-2.5 rounded-sm border text-left transition-all ${
                        input.budget === opt
                          ? 'border-[#D1AA75] bg-[#D1AA75]/15 text-[#D1AA75] font-semibold'
                          : 'border-[#262D37] bg-[#15191E] text-[#D8D4CA] hover:border-[#D1AA75]/50'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 6. Notes / Additional Concerns */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#D1AA75] mb-2">
                6. 추가 고민 또는 요청사항 (선택사항)
              </label>
              <textarea
                value={input.notes}
                onChange={(e) => setInput({ ...input, notes: e.target.value })}
                placeholder="예: 복부가 조금 부각되는 편이라 자켓을 풀었을 때도 단정한 핏을 원합니다. 목이 짧은 편이라 셔츠 칼라 모양에 신경 써주세요."
                rows={3}
                className="w-full bg-[#15191E] border border-[#262D37] focus:border-[#D1AA75] text-[#F7F5F0] text-xs p-3.5 rounded-sm focus:outline-none transition-colors placeholder:text-[#D8D4CA]/40"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-[#262D37] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-[#D8D4CA]/60 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-[#D1AA75]" />
                <span>Google Gemini 3.8 모델이 실시간으로 상·하의·슈즈 배색을 연산합니다.</span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#D1AA75] hover:bg-[#E2BD8A] disabled:bg-[#D1AA75]/50 text-[#15191E] font-bold text-xs tracking-widest uppercase px-8 py-4 rounded-sm shadow-xl transition-all cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>전문 스타일리스트 분석 중...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>AI 맞춤 스타일링 분석하기</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-950/40 border border-red-800/60 p-5 rounded-sm flex items-start gap-3 text-red-200 text-xs">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold">스타일링 생성 중 오류가 발생했습니다.</p>
              <p className="text-red-300/80">{error}</p>
            </div>
          </div>
        )}

        {/* Loading State Overlay / Skeleton */}
        {loading && (
          <div className="bg-[#1A1F26] border border-[#D1AA75]/40 p-12 rounded-sm text-center space-y-4 animate-pulse">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#D1AA75]/20 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-[#D1AA75] animate-spin" />
            </div>
            <h3 className="font-editorial text-2xl text-[#F7F5F0]">
              고객님의 프로필과 체형 밸런스를 분석하고 있습니다...
            </h3>
            <p className="text-xs text-[#D8D4CA]/70 max-w-md mx-auto">
              어깨 숄더 라인, 원턱 팬츠의 드레이프성, 구두의 라스트 비율을 고려하여 최적의 스타일 조합을 도출하고 있습니다.
            </p>
          </div>
        )}

        {/* Recommendation Results (when available) */}
        {recommendation && !loading && (
          <div className="bg-[#1A1F26] border border-[#D1AA75]/50 p-6 sm:p-10 rounded-sm shadow-2xl space-y-10 animate-fade-in">
            {/* Result Header */}
            <div className="border-b border-[#262D37] pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#D1AA75] uppercase">
                  <Sparkles className="w-3.5 h-3.5" />
                  AI CURATED STYLING REPORT
                </div>
                <h2 className="font-editorial text-3xl sm:text-4xl text-[#F7F5F0] font-medium leading-tight">
                  {recommendation.title}
                </h2>
                <p className="text-sm text-[#D8D4CA] font-light leading-relaxed max-w-3xl pt-1">
                  {recommendation.concept}
                </p>
              </div>

              {/* Action Toolbar */}
              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={handleCopyReport}
                  className="p-2.5 border border-[#262D37] hover:border-[#D1AA75] text-[#D8D4CA] hover:text-[#F7F5F0] rounded-sm transition-colors text-xs flex items-center gap-1.5"
                  title="리포트 복사"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>공유/복사</span>
                </button>
                <div className="text-xs px-3.5 py-2 rounded-sm bg-[#D1AA75]/20 text-[#D1AA75] border border-[#D1AA75]/40 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5" />
                  <span>MY STYLE 보관함에 저장됨</span>
                </div>
              </div>
            </div>

            {/* 3 Core Pieces (Top, Bottom, Shoes) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* TOP */}
              <div className="bg-[#15191E] border border-[#262D37] p-6 rounded-sm space-y-4">
                <div className="flex items-center justify-between border-b border-[#212730] pb-3">
                  <span className="text-[11px] font-bold tracking-widest uppercase text-[#D1AA75]">
                    01. 상의 (TOP)
                  </span>
                  <span className="text-[11px] text-[#D8D4CA]/60 font-mono">
                    {recommendation.top.color}
                  </span>
                </div>
                <div>
                  <h4 className="font-editorial text-lg text-[#F7F5F0] font-medium mb-2">
                    {recommendation.top.item}
                  </h4>
                  <p className="text-xs text-[#D8D4CA]/80 leading-relaxed font-light">
                    {recommendation.top.stylingTip}
                  </p>
                </div>
              </div>

              {/* BOTTOM */}
              <div className="bg-[#15191E] border border-[#262D37] p-6 rounded-sm space-y-4">
                <div className="flex items-center justify-between border-b border-[#212730] pb-3">
                  <span className="text-[11px] font-bold tracking-widest uppercase text-[#D1AA75]">
                    02. 하의 (BOTTOM)
                  </span>
                  <span className="text-[11px] text-[#D8D4CA]/60 font-mono">
                    {recommendation.bottom.color}
                  </span>
                </div>
                <div>
                  <h4 className="font-editorial text-lg text-[#F7F5F0] font-medium mb-2">
                    {recommendation.bottom.item}
                  </h4>
                  <p className="text-xs text-[#D8D4CA]/80 leading-relaxed font-light">
                    {recommendation.bottom.fitPoint}
                  </p>
                </div>
              </div>

              {/* SHOES */}
              <div className="bg-[#15191E] border border-[#262D37] p-6 rounded-sm space-y-4">
                <div className="flex items-center justify-between border-b border-[#212730] pb-3">
                  <span className="text-[11px] font-bold tracking-widest uppercase text-[#D1AA75]">
                    03. 슈즈 (FOOTWEAR)
                  </span>
                  <span className="text-[11px] text-[#D8D4CA]/60 font-mono">
                    {recommendation.shoes.color}
                  </span>
                </div>
                <div>
                  <h4 className="font-editorial text-lg text-[#F7F5F0] font-medium mb-2">
                    {recommendation.shoes.item}
                  </h4>
                  <p className="text-xs text-[#D8D4CA]/80 leading-relaxed font-light">
                    {recommendation.shoes.stylingTip}
                  </p>
                </div>
              </div>
            </div>

            {/* Color Palette & Theory */}
            <div className="bg-[#15191E] border border-[#262D37] p-6 sm:p-8 rounded-sm space-y-6">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#F7F5F0]">
                <Palette className="w-4 h-4 text-[#D1AA75]" />
                <span>색상 조합 및 배색 이론 (COLOR ARCHITECTURE)</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#1A1F26] p-4 rounded-sm border border-[#262D37]">
                  <span className="text-[10px] uppercase tracking-wider text-[#D1AA75] block mb-1">
                    메인 컬러 (PRIMARY)
                  </span>
                  <p className="text-xs font-semibold text-[#F7F5F0]">
                    {recommendation.colorPalette.primary}
                  </p>
                </div>
                <div className="bg-[#1A1F26] p-4 rounded-sm border border-[#262D37]">
                  <span className="text-[10px] uppercase tracking-wider text-[#D1AA75] block mb-1">
                    서브 컬러 (SECONDARY)
                  </span>
                  <p className="text-xs font-semibold text-[#F7F5F0]">
                    {recommendation.colorPalette.secondary}
                  </p>
                </div>
                <div className="bg-[#1A1F26] p-4 rounded-sm border border-[#262D37]">
                  <span className="text-[10px] uppercase tracking-wider text-[#D1AA75] block mb-1">
                    포인트 컬러 (ACCENT)
                  </span>
                  <p className="text-xs font-semibold text-[#F7F5F0]">
                    {recommendation.colorPalette.accent}
                  </p>
                </div>
              </div>

              <div className="text-xs text-[#D8D4CA] font-light leading-relaxed border-t border-[#262D37] pt-4">
                <span className="font-semibold text-[#D1AA75] mr-2">배색 이유:</span>
                {recommendation.colorPalette.rationale}
              </div>
            </div>

            {/* Accessories */}
            {recommendation.accessories && recommendation.accessories.length > 0 && (
              <div className="bg-[#15191E] border border-[#262D37] p-6 rounded-sm space-y-3">
                <span className="text-xs font-bold uppercase tracking-widest text-[#D1AA75] block">
                  추천 악세서리 & 피니싱 터치 (ACCESSORIES)
                </span>
                <div className="flex flex-wrap gap-2">
                  {recommendation.accessories.map((acc, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-[#1A1F26] text-[#F7F5F0] border border-[#262D37] px-3 py-1.5 rounded-sm"
                    >
                      {acc}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Age Fit Guide & Reason */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#15191E] border-l-2 border-[#D1AA75] p-6 rounded-sm space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#D1AA75]">
                  35~55세 남성 체형 및 실루엣 가이드
                </h4>
                <p className="text-xs text-[#D8D4CA] leading-relaxed font-light">
                  {recommendation.ageFitGuide}
                </p>
              </div>

              <div className="bg-[#15191E] border-l-2 border-[#D8D4CA]/50 p-6 rounded-sm space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#D8D4CA]">
                  추천 사유 및 TPO 적합성
                </h4>
                <p className="text-xs text-[#D8D4CA] leading-relaxed font-light">
                  {recommendation.recommendationReason}
                </p>
              </div>
            </div>

            {/* Dos and Don'ts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-[#262D37] pt-8">
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  스타일링 성공 포인트 (DO)
                </h4>
                <ul className="space-y-2 text-xs text-[#D8D4CA]">
                  {recommendation.stylingDos?.map((doItem, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>{doItem}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                  <XCircle className="w-4 h-4 text-rose-400" />
                  피해야 할 스타일링 실수 (DON'T)
                </h4>
                <ul className="space-y-2 text-xs text-[#D8D4CA]">
                  {recommendation.stylingDonts?.map((dontItem, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-rose-400 font-bold">•</span>
                      <span>{dontItem}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Restart Button */}
            <div className="text-center pt-4">
              <button
                onClick={() => window.scrollTo({ top: 300, behavior: 'smooth' })}
                className="inline-flex items-center gap-2 text-xs text-[#D1AA75] hover:text-[#E2BD8A] underline cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>옵션 수정 후 다시 추천받기</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
