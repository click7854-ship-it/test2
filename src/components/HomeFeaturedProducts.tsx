import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProductItem } from '../types';
import { ProductDetailModal } from './ProductDetailModal';
import { Sparkles, ArrowRight, Bookmark } from 'lucide-react';

export const HomeFeaturedProducts: React.FC = () => {
  const { products, userSaved, toggleSaveProduct, setActiveTab } = useApp();
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  const featured = products.filter((p) => p.isCurated).slice(0, 4);

  return (
    <section className="py-20 bg-[#15191E] border-b border-[#212730]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-xs font-bold tracking-[0.25em] text-[#D1AA75] uppercase flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              CURATED ESSENTIALS
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#F7F5F0] font-light mt-1">
              에디터스 추천 <span className="font-semibold text-gold-gradient">큐레이션 피스</span>
            </h2>
            <p className="text-sm text-[#D8D4CA]/80 font-light mt-1">
              35~55세 남성의 옷장에 반드시 갖추어야 할 소재와 테일러링 중심의 대표 샘플 아이템
            </p>
          </div>

          <button
            onClick={() => setActiveTab('shop')}
            className="text-xs tracking-widest text-[#D1AA75] hover:text-[#E2BD8A] flex items-center gap-1 uppercase transition-colors self-start md:self-end group"
          >
            <span>큐레이션 샵 전체 보기</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((prod) => {
            const isSaved = userSaved.savedProducts.includes(prod.id);
            return (
              <div
                key={prod.id}
                className="group bg-[#1A1F26] border border-[#262D37] hover:border-[#D1AA75]/60 transition-all duration-300 rounded-sm overflow-hidden flex flex-col justify-between shadow-lg"
              >
                <div
                  onClick={() => setSelectedProduct(prod)}
                  className="relative aspect-square overflow-hidden bg-black cursor-pointer"
                >
                  <img
                    src={prod.imageUrl}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 bg-[#15191E]/90 border border-[#D1AA75]/30 text-[#D1AA75] text-[9px] font-semibold px-2 py-0.5 uppercase tracking-wider backdrop-blur-sm">
                    샘플 큐레이션
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSaveProduct(prod.id);
                    }}
                    className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-sm transition-all ${
                      isSaved
                        ? 'bg-[#D1AA75] text-[#15191E]'
                        : 'bg-[#15191E]/80 text-[#D8D4CA] hover:text-[#F7F5F0]'
                    }`}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div onClick={() => setSelectedProduct(prod)} className="cursor-pointer space-y-1">
                    <span className="text-[10px] font-display uppercase tracking-widest text-[#D1AA75] block">
                      {prod.brand}
                    </span>
                    <h3 className="font-editorial text-sm font-medium text-[#F7F5F0] group-hover:text-[#D1AA75] transition-colors truncate">
                      {prod.name}
                    </h3>
                    <p className="text-[11px] text-[#D8D4CA]/70 font-light line-clamp-2">
                      {prod.fabricDetails}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#262D37] flex items-center justify-between">
                    <span className="text-xs font-bold text-[#F7F5F0]">
                      {prod.samplePriceDisplay}
                    </span>
                    <button
                      onClick={() => setSelectedProduct(prod)}
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

        {selectedProduct && (
          <ProductDetailModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </div>
    </section>
  );
};
