import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Search, X, Layers, ShoppingBag, BookOpen, ArrowRight } from 'lucide-react';
import { LookbookItem, ProductItem, MagazineArticle } from '../types';

export const SearchModal: React.FC = () => {
  const {
    searchOpen,
    setSearchOpen,
    products,
    lookbooks,
    articles,
    setSelectedProduct,
    setSelectedLookbook,
    setSelectedArticle,
    setActiveTab,
  } = useApp();

  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [searchOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && searchOpen) {
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen, setSearchOpen]);

  if (!searchOpen) return null;

  const cleanQuery = query.trim().toLowerCase();

  const matchedProducts = cleanQuery
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(cleanQuery) ||
          p.brand.toLowerCase().includes(cleanQuery) ||
          p.description.toLowerCase().includes(cleanQuery) ||
          p.styleTags.some((t) => t.toLowerCase().includes(cleanQuery))
      )
    : [];

  const matchedLookbooks = cleanQuery
    ? lookbooks.filter(
        (l) =>
          l.title.toLowerCase().includes(cleanQuery) ||
          l.subtitle.toLowerCase().includes(cleanQuery) ||
          l.category.toLowerCase().includes(cleanQuery) ||
          l.description.toLowerCase().includes(cleanQuery)
      )
    : [];

  const matchedArticles = cleanQuery
    ? articles.filter(
        (a) =>
          a.title.toLowerCase().includes(cleanQuery) ||
          a.subtitle.toLowerCase().includes(cleanQuery) ||
          a.excerpt.toLowerCase().includes(cleanQuery) ||
          a.tags.some((t) => t.toLowerCase().includes(cleanQuery))
      )
    : [];

  const totalMatches =
    matchedProducts.length + matchedLookbooks.length + matchedArticles.length;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-start justify-center pt-20 px-4 animate-fade-in"
      onClick={() => setSearchOpen(false)}
    >
      <div
        className="bg-[#1A1F26] border border-[#D1AA75]/50 w-full max-w-3xl rounded-sm shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-[#262D37]">
          <Search className="w-5 h-5 text-[#D1AA75] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="상품, 룩북, 스타일 카테고리, 패션 칼럼 검색 (예: 캐시미어, 네이비, 수트, 로퍼)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-[#F7F5F0] placeholder:text-[#D8D4CA]/40 focus:outline-none"
          />
          <button
            onClick={() => setSearchOpen(false)}
            className="p-1 text-[#D8D4CA] hover:text-[#F7F5F0]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-6 space-y-6">
          {cleanQuery === '' ? (
            <div className="text-center py-8 space-y-3">
              <span className="text-xs uppercase tracking-widest text-[#D1AA75] block font-semibold">
                QUICK SEARCH SUGGESTIONS
              </span>
              <div className="flex flex-wrap justify-center gap-2 pt-2">
                {['캐시미어', '하프 캔버스', '네이비 블레이저', '원턱 슬랙스', '페니 로퍼', '모던 클래식', '콰이어트 럭셔리'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="text-xs bg-[#15191E] border border-[#262D37] hover:border-[#D1AA75] text-[#D8D4CA] hover:text-[#F7F5F0] px-3 py-1.5 rounded-sm transition-colors"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          ) : totalMatches === 0 ? (
            <div className="text-center py-10 text-xs text-[#D8D4CA]/70">
              '{query}'에 대한 검색 결과가 없습니다.
            </div>
          ) : (
            <div className="space-y-6">
              {/* Matched Products */}
              {matchedProducts.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#D1AA75]">
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>큐레이션 상품 ({matchedProducts.length})</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {matchedProducts.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => {
                          setSearchOpen(false);
                          setSelectedProduct(p);
                        }}
                        className="bg-[#15191E] p-3 rounded-sm border border-[#212730] hover:border-[#D1AA75] cursor-pointer flex items-center gap-3 transition-colors"
                      >
                        <img
                          src={p.imageUrl}
                          alt={p.name}
                          className="w-12 h-12 object-cover rounded-sm bg-black shrink-0"
                        />
                        <div className="overflow-hidden">
                          <span className="text-[10px] text-[#D1AA75] block">{p.brand}</span>
                          <h4 className="text-xs font-medium text-[#F7F5F0] truncate">{p.name}</h4>
                          <span className="text-[11px] font-bold text-[#F7F5F0]">{p.samplePriceDisplay}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Matched Lookbooks */}
              {matchedLookbooks.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#D1AA75]">
                    <Layers className="w-3.5 h-3.5" />
                    <span>룩북 화보 ({matchedLookbooks.length})</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {matchedLookbooks.map((l) => (
                      <div
                        key={l.id}
                        onClick={() => {
                          setSearchOpen(false);
                          setSelectedLookbook(l);
                        }}
                        className="bg-[#15191E] p-3 rounded-sm border border-[#212730] hover:border-[#D1AA75] cursor-pointer flex items-center gap-3 transition-colors"
                      >
                        <img
                          src={l.imageUrl}
                          alt={l.title}
                          className="w-12 h-14 object-cover rounded-sm bg-black shrink-0"
                        />
                        <div className="overflow-hidden">
                          <span className="text-[10px] text-[#D1AA75] block">{l.category}</span>
                          <h4 className="text-xs font-medium text-[#F7F5F0] truncate">{l.title}</h4>
                          <span className="text-[11px] text-[#D8D4CA]/70">{l.ageRecommendation}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Matched Articles */}
              {matchedArticles.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#D1AA75]">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>매거진 칼럼 ({matchedArticles.length})</span>
                  </div>
                  <div className="space-y-2">
                    {matchedArticles.map((a) => (
                      <div
                        key={a.id}
                        onClick={() => {
                          setSearchOpen(false);
                          setSelectedArticle(a);
                        }}
                        className="bg-[#15191E] p-3 rounded-sm border border-[#212730] hover:border-[#D1AA75] cursor-pointer flex items-center justify-between transition-colors"
                      >
                        <div className="space-y-0.5">
                          <span className="text-[10px] text-[#D1AA75] block">{a.category}</span>
                          <h4 className="text-xs font-medium text-[#F7F5F0]">{a.title}</h4>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#D1AA75] shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
