import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { LookbookDetailModal } from '../components/LookbookDetailModal';
import { ProductDetailModal } from '../components/ProductDetailModal';
import { MagazineDetailModal } from '../components/MagazineDetailModal';
import { LookbookItem, ProductItem, MagazineArticle, StylingRecommendation } from '../types';
import {
  Bookmark,
  Sparkles,
  Layers,
  ShoppingBag,
  BookOpen,
  History,
  Trash2,
  Share2,
  ArrowRight,
  User,
  ShieldCheck,
} from 'lucide-react';

export const MyStylePage: React.FC = () => {
  const {
    userSaved,
    products,
    lookbooks,
    articles,
    setActiveTab,
    toggleSaveProduct,
    toggleSaveLookbook,
    toggleSaveArticle,
    clearRecommendationHistory,
    showToast,
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'looks' | 'products' | 'articles' | 'history'>('history');

  // Modals
  const [modalLook, setModalLook] = useState<LookbookItem | null>(null);
  const [modalProduct, setModalProduct] = useState<ProductItem | null>(null);
  const [modalArticle, setModalArticle] = useState<MagazineArticle | null>(null);

  // Resolved saved objects
  const savedLookObjects = lookbooks.filter((l) => userSaved.savedLookbooks.includes(l.id));
  const savedProductObjects = products.filter((p) => userSaved.savedProducts.includes(p.id));
  const savedArticleObjects = articles.filter((a) => userSaved.savedArticles.includes(a.id));

  const handleCopyHistory = (rec: StylingRecommendation) => {
    const text = `[MEN'S STYLE LAB 맞춤 스타일링]\n제목: ${rec.title}\n컨셉: ${rec.concept}\n상의: ${rec.top.item}\n하의: ${rec.bottom.item}\n슈즈: ${rec.shoes.item}\n추천이유: ${rec.recommendationReason}`;
    navigator.clipboard.writeText(text);
    showToast('스타일링 내용이 클립보드에 복사되었습니다.');
  };

  return (
    <div className="py-12 bg-[#15191E] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="border-b border-[#212730] pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <span className="text-xs font-bold tracking-[0.25em] text-[#D1AA75] uppercase flex items-center gap-1.5">
              <Bookmark className="w-3.5 h-3.5" />
              PERSONAL STYLE ARCHIVE
            </span>
            <h1 className="font-editorial text-3xl sm:text-5xl text-[#F7F5F0] font-light">
              나만의 <span className="font-semibold text-gold-gradient">스타일 보관함</span>
            </h1>
            <p className="text-sm text-[#D8D4CA]/80 font-light max-w-2xl leading-relaxed">
              저장한 룩북 화보, 관심 상품, 스크랩한 매거진 에세이 및 AI 스타일리스트 추천 기록을 한곳에서 관리하세요.
            </p>
          </div>

          {/* Quick Profile Summary Badge */}
          <div className="bg-[#1A1F26] border border-[#262D37] p-4 rounded-sm flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#15191E] border border-[#D1AA75]/50 flex items-center justify-center text-[#D1AA75]">
              <User className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-semibold text-[#F7F5F0] block">
                3555 GENTLEMAN ARCHIVE
              </span>
              <span className="text-[11px] text-[#D1AA75]">
                총 보관 아이템: {savedLookObjects.length + savedProductObjects.length + savedArticleObjects.length + userSaved.recommendationHistory.length}건
              </span>
            </div>
          </div>
        </div>

        {/* Sub-tab Switcher */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#212730]">
          <button
            onClick={() => setActiveSubTab('history')}
            className={`text-xs px-4 py-2.5 rounded-sm border whitespace-nowrap transition-all flex items-center gap-2 ${
              activeSubTab === 'history'
                ? 'border-[#D1AA75] bg-[#D1AA75] text-[#15191E] font-bold'
                : 'border-[#262D37] bg-[#1A1F26] text-[#D8D4CA] hover:text-[#F7F5F0]'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>AI 추천 기록 ({userSaved.recommendationHistory.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('looks')}
            className={`text-xs px-4 py-2.5 rounded-sm border whitespace-nowrap transition-all flex items-center gap-2 ${
              activeSubTab === 'looks'
                ? 'border-[#D1AA75] bg-[#D1AA75] text-[#15191E] font-bold'
                : 'border-[#262D37] bg-[#1A1F26] text-[#D8D4CA] hover:text-[#F7F5F0]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>보관한 룩북 ({savedLookObjects.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('products')}
            className={`text-xs px-4 py-2.5 rounded-sm border whitespace-nowrap transition-all flex items-center gap-2 ${
              activeSubTab === 'products'
                ? 'border-[#D1AA75] bg-[#D1AA75] text-[#15191E] font-bold'
                : 'border-[#262D37] bg-[#1A1F26] text-[#D8D4CA] hover:text-[#F7F5F0]'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>관심 상품 ({savedProductObjects.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('articles')}
            className={`text-xs px-4 py-2.5 rounded-sm border whitespace-nowrap transition-all flex items-center gap-2 ${
              activeSubTab === 'articles'
                ? 'border-[#D1AA75] bg-[#D1AA75] text-[#15191E] font-bold'
                : 'border-[#262D37] bg-[#1A1F26] text-[#D8D4CA] hover:text-[#F7F5F0]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>스크랩 칼럼 ({savedArticleObjects.length})</span>
          </button>
        </div>

        {/* Tab 1: AI Recommendation History */}
        {activeSubTab === 'history' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#F7F5F0]">
                AI 스타일리스트 맞춤 코디 기록
              </h3>
              {userSaved.recommendationHistory.length > 0 && (
                <button
                  onClick={clearRecommendationHistory}
                  className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1.5 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>기록 전체 삭제</span>
                </button>
              )}
            </div>

            {userSaved.recommendationHistory.length === 0 ? (
              <div className="bg-[#1A1F26] border border-[#262D37] p-12 text-center rounded-sm space-y-4">
                <Sparkles className="w-8 h-8 text-[#D1AA75] mx-auto" />
                <h4 className="font-editorial text-lg text-[#F7F5F0]">
                  아직 생성된 AI 스타일링 추천 기록이 없습니다.
                </h4>
                <p className="text-xs text-[#D8D4CA]/70 max-w-md mx-auto">
                  35~55세 남성을 위한 체형 보완 테일러링과 색상 조합을 AI 스타일리스트에게 요청해 보세요.
                </p>
                <button
                  onClick={() => setActiveTab('ai-stylist')}
                  className="inline-flex items-center gap-2 bg-[#D1AA75] hover:bg-[#E2BD8A] text-[#15191E] text-xs font-bold px-6 py-3 rounded-sm uppercase tracking-wider transition-all"
                >
                  <span>AI 맞춤 스타일링 시작하기</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {userSaved.recommendationHistory.map((rec, idx) => (
                  <div
                    key={rec.id || idx}
                    className="bg-[#1A1F26] border border-[#262D37] p-6 sm:p-8 rounded-sm shadow-xl space-y-6"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#262D37] pb-4 gap-3">
                      <div>
                        <span className="text-[10px] font-mono text-[#D1AA75] uppercase block">
                          RECOMMENDED · {rec.createdAt ? new Date(rec.createdAt).toLocaleDateString('ko-KR') : '최근'}
                        </span>
                        <h4 className="font-editorial text-xl sm:text-2xl text-[#F7F5F0] font-medium mt-0.5">
                          {rec.title}
                        </h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCopyHistory(rec)}
                          className="p-2 border border-[#262D37] hover:border-[#D1AA75] text-[#D8D4CA] hover:text-[#F7F5F0] rounded-sm text-xs flex items-center gap-1.5"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                          <span>복사</span>
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-[#D8D4CA] font-light leading-relaxed">
                      {rec.concept}
                    </p>

                    {/* Pieces snapshot */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="bg-[#15191E] p-3 rounded-sm border border-[#212730]">
                        <span className="text-[10px] text-[#D1AA75] font-bold block mb-1">상의</span>
                        <p className="text-xs text-[#F7F5F0] font-medium">{rec.top.item}</p>
                        <p className="text-[11px] text-[#D8D4CA]/70 mt-1">{rec.top.stylingTip}</p>
                      </div>
                      <div className="bg-[#15191E] p-3 rounded-sm border border-[#212730]">
                        <span className="text-[10px] text-[#D1AA75] font-bold block mb-1">하의</span>
                        <p className="text-xs text-[#F7F5F0] font-medium">{rec.bottom.item}</p>
                        <p className="text-[11px] text-[#D8D4CA]/70 mt-1">{rec.bottom.fitPoint}</p>
                      </div>
                      <div className="bg-[#15191E] p-3 rounded-sm border border-[#212730]">
                        <span className="text-[10px] text-[#D1AA75] font-bold block mb-1">슈즈</span>
                        <p className="text-xs text-[#F7F5F0] font-medium">{rec.shoes.item}</p>
                        <p className="text-[11px] text-[#D8D4CA]/70 mt-1">{rec.shoes.stylingTip}</p>
                      </div>
                    </div>

                    {/* Color Palette */}
                    <div className="text-xs text-[#D8D4CA]/80 bg-[#15191E] p-3 rounded-sm border border-[#212730] flex flex-wrap items-center gap-4">
                      <span className="font-semibold text-[#D1AA75]">추천 컬러 조합:</span>
                      <span>주색상: {rec.colorPalette.primary}</span>
                      <span>보조색상: {rec.colorPalette.secondary}</span>
                      <span>포인트: {rec.colorPalette.accent}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Saved Lookbooks */}
        {activeSubTab === 'looks' && (
          <div>
            {savedLookObjects.length === 0 ? (
              <div className="bg-[#1A1F26] border border-[#262D37] p-12 text-center rounded-sm space-y-4">
                <Layers className="w-8 h-8 text-[#D1AA75] mx-auto" />
                <h4 className="font-editorial text-lg text-[#F7F5F0]">
                  보관함에 저장된 룩북 화보가 없습니다.
                </h4>
                <p className="text-xs text-[#D8D4CA]/70">
                  룩북 컬렉션을 둘러보고 마음에 드는 스타일 화보를 북마크해 보세요.
                </p>
                <button
                  onClick={() => setActiveTab('lookbook')}
                  className="inline-flex items-center gap-2 bg-[#D1AA75] hover:bg-[#E2BD8A] text-[#15191E] text-xs font-bold px-6 py-3 rounded-sm uppercase tracking-wider"
                >
                  <span>룩북 컬렉션 보러가기</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedLookObjects.map((look) => (
                  <div
                    key={look.id}
                    className="bg-[#1A1F26] border border-[#262D37] rounded-sm overflow-hidden flex flex-col justify-between shadow-lg"
                  >
                    <div
                      onClick={() => setModalLook(look)}
                      className="relative aspect-[3/4] overflow-hidden bg-black cursor-pointer"
                    >
                      <img
                        src={look.imageUrl}
                        alt={look.title}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSaveLookbook(look.id);
                        }}
                        className="absolute top-3 right-3 p-2 rounded-full bg-[#D1AA75] text-[#15191E]"
                      >
                        <Bookmark className="w-4 h-4 fill-current" />
                      </button>
                    </div>
                    <div className="p-5 space-y-2">
                      <h4 className="font-editorial text-lg text-[#F7F5F0] font-medium">
                        {look.title}
                      </h4>
                      <p className="text-xs text-[#D8D4CA]/80">{look.subtitle}</p>
                      <div className="pt-2 flex justify-between items-center text-xs text-[#D1AA75]">
                        <span>{look.category}</span>
                        <button
                          onClick={() => setModalLook(look)}
                          className="underline"
                        >
                          화보 열기
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Saved Products */}
        {activeSubTab === 'products' && (
          <div>
            {savedProductObjects.length === 0 ? (
              <div className="bg-[#1A1F26] border border-[#262D37] p-12 text-center rounded-sm space-y-4">
                <ShoppingBag className="w-8 h-8 text-[#D1AA75] mx-auto" />
                <h4 className="font-editorial text-lg text-[#F7F5F0]">
                  저장된 관심 상품이 없습니다.
                </h4>
                <p className="text-xs text-[#D8D4CA]/70">
                  샵에서 최고급 캐시미어, 파인 메리노 울 등 큐레이션 아이템을 저장해 보세요.
                </p>
                <button
                  onClick={() => setActiveTab('shop')}
                  className="inline-flex items-center gap-2 bg-[#D1AA75] hover:bg-[#E2BD8A] text-[#15191E] text-xs font-bold px-6 py-3 rounded-sm uppercase tracking-wider"
                >
                  <span>큐레이션 샵 보러가기</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {savedProductObjects.map((prod) => (
                  <div
                    key={prod.id}
                    className="bg-[#1A1F26] border border-[#262D37] rounded-sm overflow-hidden flex flex-col justify-between shadow-lg"
                  >
                    <div
                      onClick={() => setModalProduct(prod)}
                      className="relative aspect-square overflow-hidden bg-black cursor-pointer"
                    >
                      <img
                        src={prod.imageUrl}
                        alt={prod.name}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSaveProduct(prod.id);
                        }}
                        className="absolute top-2.5 right-2.5 p-2 rounded-full bg-[#D1AA75] text-[#15191E]"
                      >
                        <Bookmark className="w-3.5 h-3.5 fill-current" />
                      </button>
                    </div>
                    <div className="p-4 space-y-1">
                      <span className="text-[10px] text-[#D1AA75] uppercase block">{prod.brand}</span>
                      <h4 className="font-editorial text-xs font-medium text-[#F7F5F0] truncate">
                        {prod.name}
                      </h4>
                      <p className="text-xs font-bold text-[#F7F5F0]">{prod.samplePriceDisplay}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Saved Articles */}
        {activeSubTab === 'articles' && (
          <div>
            {savedArticleObjects.length === 0 ? (
              <div className="bg-[#1A1F26] border border-[#262D37] p-12 text-center rounded-sm space-y-4">
                <BookOpen className="w-8 h-8 text-[#D1AA75] mx-auto" />
                <h4 className="font-editorial text-lg text-[#F7F5F0]">
                  스크랩한 매거진 칼럼이 없습니다.
                </h4>
                <p className="text-xs text-[#D8D4CA]/70">
                  매거진 탭에서 35~55세 남성 스타일링과 소재학 칼럼을 읽고 스크랩해 보세요.
                </p>
                <button
                  onClick={() => setActiveTab('magazine')}
                  className="inline-flex items-center gap-2 bg-[#D1AA75] hover:bg-[#E2BD8A] text-[#15191E] text-xs font-bold px-6 py-3 rounded-sm uppercase tracking-wider"
                >
                  <span>매거진 보러가기</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {savedArticleObjects.map((art) => (
                  <div
                    key={art.id}
                    className="bg-[#1A1F26] border border-[#262D37] p-6 rounded-sm flex flex-col justify-between space-y-4 shadow-lg"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[11px] text-[#D1AA75] mb-2">
                        <span>{art.category}</span>
                        <button
                          onClick={() => toggleSaveArticle(art.id)}
                          className="text-rose-400 hover:underline"
                        >
                          스크랩 취소
                        </button>
                      </div>
                      <h4
                        onClick={() => setModalArticle(art)}
                        className="font-editorial text-xl font-medium text-[#F7F5F0] hover:text-[#D1AA75] cursor-pointer transition-colors"
                      >
                        {art.title}
                      </h4>
                      <p className="text-xs text-[#D8D4CA]/80 mt-1 line-clamp-2">
                        {art.excerpt}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-[#262D37] flex items-center justify-between text-xs text-[#D8D4CA]/60">
                      <span>{art.author}</span>
                      <button
                        onClick={() => setModalArticle(art)}
                        className="text-[#D1AA75] underline"
                      >
                        전문 읽기
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Modals */}
        {modalLook && (
          <LookbookDetailModal
            lookbook={modalLook}
            onClose={() => setModalLook(null)}
          />
        )}
        {modalProduct && (
          <ProductDetailModal
            product={modalProduct}
            onClose={() => setModalProduct(null)}
          />
        )}
        {modalArticle && (
          <MagazineDetailModal
            article={modalArticle}
            onClose={() => setModalArticle(null)}
          />
        )}
      </div>
    </div>
  );
};
