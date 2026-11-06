import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProductItem } from '../types';
import { ProductDetailModal } from '../components/ProductDetailModal';
import { Bookmark, Sparkles, Filter, Search, ArrowUpDown, ShieldCheck } from 'lucide-react';

export const ShopPage: React.FC = () => {
  const { products, userSaved, toggleSaveProduct } = useApp();
  const [selectedCat, setSelectedCat] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeModalProduct, setActiveModalProduct] = useState<ProductItem | null>(null);

  const categories = [
    { key: 'ALL', label: '전체' },
    { key: 'jacket', label: '아우터 & 자켓' },
    { key: 'knitwear', label: '니트웨어' },
    { key: 'shirts', label: '셔츠' },
    { key: 'trousers', label: '팬츠 & 슬랙스' },
    { key: 'shoes', label: '슈즈' },
    { key: 'accessories', label: '악세서리 & 레더' },
  ];

  // Filtering
  const filtered = products.filter((p) => {
    const matchesCat = selectedCat === 'ALL' || p.category === selectedCat;
    const matchesSearch =
      searchTerm.trim() === '' ||
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.styleTags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  // Sorting
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    // default: curated first
    return (b.isCurated ? 1 : 0) - (a.isCurated ? 1 : 0);
  });

  return (
    <div className="py-12 bg-[#15191E] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="border-b border-[#212730] pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <span className="text-xs font-bold tracking-[0.25em] text-[#D1AA75] uppercase flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              CURATED WARDROBE
            </span>
            <h1 className="font-editorial text-3xl sm:text-5xl text-[#F7F5F0] font-light">
              35~55세 남성을 위한 <span className="font-semibold text-gold-gradient">큐레이션 샵</span>
            </h1>
            <p className="text-sm text-[#D8D4CA]/80 font-light max-w-2xl leading-relaxed">
              최고급 캐시미어, 파인 메리노 울, 하프 캔버스 블레이저와 굿이어 웰트 슈즈 등 오래 곁에 두고 입을 수 있는 프리미엄 피스들을 큐레이션했습니다.
            </p>
          </div>

          <div className="text-xs text-[#D1AA75] font-display tracking-widest uppercase">
            TOTAL {sorted.length} SAMPLE ITEMS
          </div>
        </div>

        {/* Notice Card */}
        <div className="bg-[#1A1F26] border border-[#D1AA75]/30 p-4 rounded-sm flex items-start sm:items-center justify-between gap-4 text-xs text-[#D8D4CA]">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#D1AA75] shrink-0" />
            <span>
              [샘플 표시 안내] 본 샵의 아이템은 스타일링 코디를 위해 구축된 데모 샘플이며, 실제 상업 판매나 특정 브랜드와의 공식 제휴 관계가 아닙니다.
            </span>
          </div>
        </div>

        {/* Toolbar: Category pills, Search, Sort */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#212730] pb-4">
          {/* Categories */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCat(cat.key)}
                className={`text-xs px-3.5 py-2 rounded-sm border whitespace-nowrap transition-all ${
                  selectedCat === cat.key
                    ? 'border-[#D1AA75] bg-[#D1AA75] text-[#15191E] font-bold'
                    : 'border-[#262D37] bg-[#1A1F26] text-[#D8D4CA] hover:text-[#F7F5F0]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search & Sort */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative flex-1 sm:w-60">
              <input
                type="text"
                placeholder="아이템, 브랜드, 소재 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#1A1F26] border border-[#262D37] focus:border-[#D1AA75] text-[#F7F5F0] text-xs pl-8 pr-3 py-2 rounded-sm focus:outline-none transition-colors placeholder:text-[#D8D4CA]/40"
              />
              <Search className="w-3.5 h-3.5 text-[#D8D4CA]/60 absolute left-2.5 top-2.5" />
            </div>

            {/* Sort */}
            <div className="flex items-center gap-1.5 shrink-0">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#D1AA75]" />
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="bg-[#1A1F26] border border-[#262D37] text-xs text-[#D8D4CA] px-3 py-2 rounded-sm focus:outline-none focus:border-[#D1AA75]"
              >
                <option value="featured">에디터 추천순</option>
                <option value="price-desc">가격 높은순 (샘플가)</option>
                <option value="price-asc">가격 낮은순 (샘플가)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sorted.map((prod) => {
            const isSaved = userSaved.savedProducts.includes(prod.id);
            return (
              <div
                key={prod.id}
                className="group bg-[#1A1F26] border border-[#262D37] hover:border-[#D1AA75]/60 transition-all duration-300 rounded-sm overflow-hidden flex flex-col justify-between shadow-lg"
              >
                {/* Image */}
                <div
                  onClick={() => setActiveModalProduct(prod)}
                  className="relative aspect-square overflow-hidden bg-black cursor-pointer"
                >
                  <img
                    src={prod.imageUrl}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#15191E]/60 via-transparent to-transparent opacity-60" />

                  {/* Sample Badge */}
                  <div className="absolute top-2.5 left-2.5 bg-[#15191E]/90 border border-[#D1AA75]/30 text-[#D1AA75] text-[9px] font-semibold px-2 py-0.5 uppercase tracking-wider backdrop-blur-sm">
                    샘플 큐레이션
                  </div>

                  {/* Bookmark Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSaveProduct(prod.id);
                    }}
                    className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-sm transition-all ${
                      isSaved
                        ? 'bg-[#D1AA75] text-[#15191E]'
                        : 'bg-[#15191E]/80 text-[#D8D4CA] hover:text-[#F7F5F0] hover:bg-[#15191E]'
                    }`}
                    aria-label="관심 상품 저장"
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div onClick={() => setActiveModalProduct(prod)} className="cursor-pointer space-y-1">
                    <span className="text-[10px] font-display uppercase tracking-widest text-[#D1AA75] block">
                      {prod.brand}
                    </span>
                    <h3 className="font-editorial text-sm font-medium text-[#F7F5F0] group-hover:text-[#D1AA75] transition-colors line-clamp-1">
                      {prod.name}
                    </h3>
                    <p className="text-[11px] text-[#D8D4CA]/70 font-light line-clamp-2 pt-0.5">
                      {prod.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#262D37] flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-[#F7F5F0] block">
                        {prod.samplePriceDisplay}
                      </span>
                    </div>
                    <button
                      onClick={() => setActiveModalProduct(prod)}
                      className="text-[11px] text-[#D1AA75] hover:text-[#E2BD8A] underline cursor-pointer"
                    >
                      상세 보기
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state */}
        {sorted.length === 0 && (
          <div className="bg-[#1A1F26] border border-[#262D37] p-12 text-center rounded-sm space-y-3">
            <p className="text-sm text-[#D8D4CA]">검색 결과에 맞는 샘플 아이템이 없습니다.</p>
            <button
              onClick={() => {
                setSelectedCat('ALL');
                setSearchTerm('');
              }}
              className="text-xs text-[#D1AA75] underline"
            >
              전체 상품 보기
            </button>
          </div>
        )}

        {/* Detail Modal */}
        {activeModalProduct && (
          <ProductDetailModal
            product={activeModalProduct}
            onClose={() => setActiveModalProduct(null)}
          />
        )}
      </div>
    </div>
  );
};
