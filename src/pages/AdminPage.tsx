import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProductItem, LookbookItem, MagazineArticle } from '../types';
import {
  Settings,
  Plus,
  Edit2,
  Trash2,
  RotateCcw,
  ShoppingBag,
  Layers,
  BookOpen,
  Check,
  X,
  AlertTriangle,
  ShieldAlert,
} from 'lucide-react';

export const AdminPage: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    lookbooks,
    addLookbook,
    updateLookbook,
    deleteLookbook,
    articles,
    addArticle,
    updateArticle,
    deleteArticle,
    resetAllToDefaults,
    showToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'products' | 'lookbooks' | 'articles'>('products');

  // Product Form Modal state
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [isNewProduct, setIsNewProduct] = useState(false);
  const [productForm, setProductForm] = useState<Partial<ProductItem>>({});

  // Lookbook Form Modal state
  const [editingLookbook, setEditingLookbook] = useState<LookbookItem | null>(null);
  const [isNewLookbook, setIsNewLookbook] = useState(false);
  const [lookbookForm, setLookbookForm] = useState<Partial<LookbookItem>>({});

  // Article Form Modal state
  const [editingArticle, setEditingArticle] = useState<MagazineArticle | null>(null);
  const [isNewArticle, setIsNewArticle] = useState(false);
  const [articleForm, setArticleForm] = useState<Partial<MagazineArticle>>({});

  // Product Handlers
  const handleOpenAddProduct = () => {
    setIsNewProduct(true);
    setProductForm({
      id: `prod-${Date.now()}`,
      name: '',
      brand: 'Sartoria Novo [샘플 브랜딩]',
      category: 'jacket',
      categoryLabel: '아우터 & 자켓',
      price: 450000,
      samplePriceDisplay: '450,000원 (샘플 기준가)',
      imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
      description: '',
      fabricDetails: '울 100%',
      stylingNotes: '',
      styleTags: ['모던 클래식'],
      isCurated: true,
    });
    setEditingProduct({} as ProductItem);
  };

  const handleOpenEditProduct = (p: ProductItem) => {
    setIsNewProduct(false);
    setProductForm({ ...p });
    setEditingProduct(p);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name || !productForm.imageUrl) {
      showToast('상품명과 이미지 URL을 입력해주세요.');
      return;
    }
    const itemToSave: ProductItem = {
      id: productForm.id || `prod-${Date.now()}`,
      name: productForm.name,
      brand: productForm.brand || 'Sartoria Novo [샘플 브랜딩]',
      category: (productForm.category as any) || 'jacket',
      categoryLabel: productForm.categoryLabel || '아우터 & 자켓',
      price: Number(productForm.price) || 0,
      samplePriceDisplay: `${Number(productForm.price || 0).toLocaleString()}원 (샘플 기준가)`,
      imageUrl: productForm.imageUrl,
      description: productForm.description || '',
      fabricDetails: productForm.fabricDetails || '',
      stylingNotes: productForm.stylingNotes || '',
      styleTags: productForm.styleTags || ['클래식'],
      isCurated: !!productForm.isCurated,
    };

    if (isNewProduct) {
      addProduct(itemToSave);
    } else {
      updateProduct(itemToSave);
    }
    setEditingProduct(null);
  };

  // Lookbook Handlers
  const handleOpenAddLookbook = () => {
    setIsNewLookbook(true);
    setLookbookForm({
      id: `look-${Date.now()}`,
      title: '',
      subtitle: '',
      category: '모던 클래식',
      season: '2026 F/W',
      imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
      description: '',
      stylingConcept: '',
      ageRecommendation: '38 ~ 52세',
      tpo: '비즈니스 및 다이닝',
      palette: ['#15191E', '#D1AA75'],
      items: [
        { part: 'Outer', name: '자켓 [샘플]', description: '상세 설명' },
        { part: 'Top', name: '니트웨어 [샘플]', description: '상세 설명' },
        { part: 'Bottom', name: '트라우저 [샘플]', description: '상세 설명' },
      ],
    });
    setEditingLookbook({} as LookbookItem);
  };

  const handleOpenEditLookbook = (l: LookbookItem) => {
    setIsNewLookbook(false);
    setLookbookForm({ ...l });
    setEditingLookbook(l);
  };

  const handleSaveLookbook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lookbookForm.title || !lookbookForm.imageUrl) {
      showToast('룩북 타이틀과 이미지 URL을 입력해주세요.');
      return;
    }
    const itemToSave: LookbookItem = {
      id: lookbookForm.id || `look-${Date.now()}`,
      title: lookbookForm.title,
      subtitle: lookbookForm.subtitle || '',
      category: lookbookForm.category || '모던 클래식',
      season: lookbookForm.season || '2026 F/W',
      imageUrl: lookbookForm.imageUrl,
      description: lookbookForm.description || '',
      stylingConcept: lookbookForm.stylingConcept || '',
      ageRecommendation: lookbookForm.ageRecommendation || '35 ~ 55세',
      tpo: lookbookForm.tpo || '비즈니스 및 데일리',
      palette: lookbookForm.palette || ['#15191E', '#D1AA75'],
      items: lookbookForm.items || [],
    };

    if (isNewLookbook) {
      addLookbook(itemToSave);
    } else {
      updateLookbook(itemToSave);
    }
    setEditingLookbook(null);
  };

  // Article Handlers
  const handleOpenAddArticle = () => {
    setIsNewArticle(true);
    setArticleForm({
      id: `mag-${Date.now()}`,
      title: '',
      subtitle: '',
      category: 'Styling',
      author: '에디터 한진우',
      date: new Date().toLocaleDateString('ko-KR'),
      readTime: '5분 소요',
      coverImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
      excerpt: '',
      content: ['본문 내용을 여기에 작성합니다.'],
      tags: ['남성패션', '스타일링'],
    });
    setEditingArticle({} as MagazineArticle);
  };

  const handleOpenEditArticle = (a: MagazineArticle) => {
    setIsNewArticle(false);
    setArticleForm({ ...a });
    setEditingArticle(a);
  };

  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!articleForm.title || !articleForm.coverImage) {
      showToast('글 제목과 커버 이미지를 입력해주세요.');
      return;
    }
    const itemToSave: MagazineArticle = {
      id: articleForm.id || `mag-${Date.now()}`,
      title: articleForm.title,
      subtitle: articleForm.subtitle || '',
      category: (articleForm.category as any) || 'Styling',
      author: articleForm.author || '에디터 한진우',
      date: articleForm.date || new Date().toLocaleDateString('ko-KR'),
      readTime: articleForm.readTime || '5분 소요',
      coverImage: articleForm.coverImage,
      excerpt: articleForm.excerpt || '',
      content: articleForm.content || [],
      tags: articleForm.tags || ['패션'],
    };

    if (isNewArticle) {
      addArticle(itemToSave);
    } else {
      updateArticle(itemToSave);
    }
    setEditingArticle(null);
  };

  return (
    <div className="py-12 bg-[#15191E] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Admin Header */}
        <div className="border-b border-[#212730] pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A1F26] border border-[#D1AA75]/40">
              <Settings className="w-3.5 h-3.5 text-[#D1AA75]" />
              <span className="text-[11px] font-semibold tracking-widest uppercase text-[#D1AA75]">
                CONTENT MANAGEMENT SYSTEM
              </span>
            </div>
            <h1 className="font-editorial text-3xl sm:text-5xl text-[#F7F5F0] font-light">
              콘텐츠 & 상품 <span className="font-semibold text-gold-gradient">관리자 포털</span>
            </h1>
            <p className="text-sm text-[#D8D4CA]/80 font-light max-w-2xl leading-relaxed">
              웹사이트에 노출되는 큐레이션 상품, 룩북 화보, 매거진 아티클을 실시간 등록, 수정, 삭제할 수 있는 관리자 화면입니다.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (window.confirm('모든 콘텐츠를 기본 샘플 데이터로 복원하시겠습니까?')) {
                  resetAllToDefaults();
                }
              }}
              className="inline-flex items-center gap-2 border border-[#262D37] hover:border-rose-400 text-rose-300 text-xs px-4 py-3 rounded-sm transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>기본 데이터로 초기화</span>
            </button>
          </div>
        </div>

        {/* Notice on Real authentication boundary */}
        <div className="bg-[#1A1F26] border border-amber-500/30 p-4 rounded-sm flex items-start gap-3 text-xs text-[#D8D4CA]">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p>
            [안내] 본 관리자 콘솔은 데모 환경에서 바로 조작해 볼 수 있도록 개방되어 있습니다. 실제 엔터프라이즈 환경에서의 관리자 인증(SSO/RBAC)과 외부 상거래 제휴 API 연동은 미구현 상태이며, 브라우저 로컬 저장소를 통해 실시간 변경사항이 유지됩니다.
          </p>
        </div>

        {/* Section Tabs */}
        <div className="flex items-center gap-2 border-b border-[#212730] pb-2">
          <button
            onClick={() => setActiveTab('products')}
            className={`text-xs px-4 py-2.5 rounded-sm border whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'products'
                ? 'border-[#D1AA75] bg-[#D1AA75] text-[#15191E] font-bold'
                : 'border-[#262D37] bg-[#1A1F26] text-[#D8D4CA] hover:text-[#F7F5F0]'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>큐레이션 상품 관리 ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('lookbooks')}
            className={`text-xs px-4 py-2.5 rounded-sm border whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'lookbooks'
                ? 'border-[#D1AA75] bg-[#D1AA75] text-[#15191E] font-bold'
                : 'border-[#262D37] bg-[#1A1F26] text-[#D8D4CA] hover:text-[#F7F5F0]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>룩북 화보 관리 ({lookbooks.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('articles')}
            className={`text-xs px-4 py-2.5 rounded-sm border whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'articles'
                ? 'border-[#D1AA75] bg-[#D1AA75] text-[#15191E] font-bold'
                : 'border-[#262D37] bg-[#1A1F26] text-[#D8D4CA] hover:text-[#F7F5F0]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>매거진 아티클 관리 ({articles.length})</span>
          </button>
        </div>

        {/* TAB 1: PRODUCTS */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#F7F5F0]">
                등록된 상품 목록
              </h3>
              <button
                onClick={handleOpenAddProduct}
                className="inline-flex items-center gap-2 bg-[#D1AA75] hover:bg-[#E2BD8A] text-[#15191E] text-xs font-bold px-4 py-2.5 rounded-sm uppercase tracking-wider"
              >
                <Plus className="w-4 h-4" />
                <span>신규 상품 등록</span>
              </button>
            </div>

            <div className="bg-[#1A1F26] border border-[#262D37] rounded-sm overflow-x-auto">
              <table className="w-full text-left text-xs text-[#D8D4CA]">
                <thead className="bg-[#15191E] text-[#D1AA75] font-semibold border-b border-[#262D37]">
                  <tr>
                    <th className="p-3.5">이미지</th>
                    <th className="p-3.5">상품명</th>
                    <th className="p-3.5">브랜드 (샘플)</th>
                    <th className="p-3.5">카테고리</th>
                    <th className="p-3.5">기준 가격</th>
                    <th className="p-3.5 text-right">관리</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#262D37]">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-[#15191E]/50">
                      <td className="p-3.5">
                        <img
                          src={p.imageUrl}
                          alt={p.name}
                          className="w-12 h-12 object-cover rounded-sm bg-black"
                        />
                      </td>
                      <td className="p-3.5 font-medium text-[#F7F5F0] max-w-xs truncate">
                        {p.name}
                      </td>
                      <td className="p-3.5 text-[#D1AA75]">{p.brand}</td>
                      <td className="p-3.5">{p.categoryLabel}</td>
                      <td className="p-3.5 font-mono">{p.samplePriceDisplay}</td>
                      <td className="p-3.5 text-right space-x-2">
                        <button
                          onClick={() => handleOpenEditProduct(p)}
                          className="p-1.5 hover:text-[#D1AA75] transition-colors"
                          title="수정"
                        >
                          <Edit2 className="w-4 h-4 inline" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`'${p.name}' 상품을 삭제하시겠습니까?`)) {
                              deleteProduct(p.id);
                            }
                          }}
                          className="p-1.5 hover:text-rose-400 transition-colors"
                          title="삭제"
                        >
                          <Trash2 className="w-4 h-4 inline" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: LOOKBOOKS */}
        {activeTab === 'lookbooks' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#F7F5F0]">
                등록된 룩북 화보 목록
              </h3>
              <button
                onClick={handleOpenAddLookbook}
                className="inline-flex items-center gap-2 bg-[#D1AA75] hover:bg-[#E2BD8A] text-[#15191E] text-xs font-bold px-4 py-2.5 rounded-sm uppercase tracking-wider"
              >
                <Plus className="w-4 h-4" />
                <span>신규 룩북 등록</span>
              </button>
            </div>

            <div className="bg-[#1A1F26] border border-[#262D37] rounded-sm overflow-x-auto">
              <table className="w-full text-left text-xs text-[#D8D4CA]">
                <thead className="bg-[#15191E] text-[#D1AA75] font-semibold border-b border-[#262D37]">
                  <tr>
                    <th className="p-3.5">화보</th>
                    <th className="p-3.5">타이틀</th>
                    <th className="p-3.5">스타일 카테고리</th>
                    <th className="p-3.5">시즌</th>
                    <th className="p-3.5">추천 타깃</th>
                    <th className="p-3.5 text-right">관리</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#262D37]">
                  {lookbooks.map((l) => (
                    <tr key={l.id} className="hover:bg-[#15191E]/50">
                      <td className="p-3.5">
                        <img
                          src={l.imageUrl}
                          alt={l.title}
                          className="w-12 h-14 object-cover rounded-sm bg-black"
                        />
                      </td>
                      <td className="p-3.5 font-medium text-[#F7F5F0] max-w-xs truncate">
                        {l.title}
                      </td>
                      <td className="p-3.5 text-[#D1AA75]">{l.category}</td>
                      <td className="p-3.5">{l.season}</td>
                      <td className="p-3.5">{l.ageRecommendation}</td>
                      <td className="p-3.5 text-right space-x-2">
                        <button
                          onClick={() => handleOpenEditLookbook(l)}
                          className="p-1.5 hover:text-[#D1AA75] transition-colors"
                          title="수정"
                        >
                          <Edit2 className="w-4 h-4 inline" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`'${l.title}' 룩북을 삭제하시겠습니까?`)) {
                              deleteLookbook(l.id);
                            }
                          }}
                          className="p-1.5 hover:text-rose-400 transition-colors"
                          title="삭제"
                        >
                          <Trash2 className="w-4 h-4 inline" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: ARTICLES */}
        {activeTab === 'articles' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#F7F5F0]">
                등록된 매거진 칼럼 목록
              </h3>
              <button
                onClick={handleOpenAddArticle}
                className="inline-flex items-center gap-2 bg-[#D1AA75] hover:bg-[#E2BD8A] text-[#15191E] text-xs font-bold px-4 py-2.5 rounded-sm uppercase tracking-wider"
              >
                <Plus className="w-4 h-4" />
                <span>신규 아티클 등록</span>
              </button>
            </div>

            <div className="bg-[#1A1F26] border border-[#262D37] rounded-sm overflow-x-auto">
              <table className="w-full text-left text-xs text-[#D8D4CA]">
                <thead className="bg-[#15191E] text-[#D1AA75] font-semibold border-b border-[#262D37]">
                  <tr>
                    <th className="p-3.5">커버</th>
                    <th className="p-3.5">아티클 제목</th>
                    <th className="p-3.5">카테고리</th>
                    <th className="p-3.5">작성자</th>
                    <th className="p-3.5">작성일</th>
                    <th className="p-3.5 text-right">관리</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#262D37]">
                  {articles.map((a) => (
                    <tr key={a.id} className="hover:bg-[#15191E]/50">
                      <td className="p-3.5">
                        <img
                          src={a.coverImage}
                          alt={a.title}
                          className="w-14 h-10 object-cover rounded-sm bg-black"
                        />
                      </td>
                      <td className="p-3.5 font-medium text-[#F7F5F0] max-w-xs truncate">
                        {a.title}
                      </td>
                      <td className="p-3.5 text-[#D1AA75]">{a.category}</td>
                      <td className="p-3.5">{a.author}</td>
                      <td className="p-3.5">{a.date}</td>
                      <td className="p-3.5 text-right space-x-2">
                        <button
                          onClick={() => handleOpenEditArticle(a)}
                          className="p-1.5 hover:text-[#D1AA75] transition-colors"
                          title="수정"
                        >
                          <Edit2 className="w-4 h-4 inline" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`'${a.title}' 글을 삭제하시겠습니까?`)) {
                              deleteArticle(a.id);
                            }
                          }}
                          className="p-1.5 hover:text-rose-400 transition-colors"
                          title="삭제"
                        >
                          <Trash2 className="w-4 h-4 inline" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Product Edit / Add Modal */}
        {editingProduct && (
          <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4">
            <div className="bg-[#1A1F26] border border-[#D1AA75]/50 w-full max-w-2xl rounded-sm p-6 space-y-5 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-[#262D37] pb-3">
                <h3 className="font-editorial text-xl text-[#F7F5F0]">
                  {isNewProduct ? '신규 큐레이션 상품 등록' : '상품 정보 수정'}
                </h3>
                <button
                  onClick={() => setEditingProduct(null)}
                  className="text-[#D8D4CA] hover:text-[#F7F5F0]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[#D1AA75] font-semibold mb-1">상품명</label>
                  <input
                    type="text"
                    required
                    value={productForm.name || ''}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    className="w-full bg-[#15191E] border border-[#262D37] p-2.5 rounded-sm text-[#F7F5F0]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#D1AA75] font-semibold mb-1">브랜드 (샘플 표기 포함)</label>
                    <input
                      type="text"
                      value={productForm.brand || ''}
                      onChange={(e) => setProductForm({ ...productForm, brand: e.target.value })}
                      className="w-full bg-[#15191E] border border-[#262D37] p-2.5 rounded-sm text-[#F7F5F0]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#D1AA75] font-semibold mb-1">카테고리</label>
                    <select
                      value={productForm.category || 'jacket'}
                      onChange={(e) => {
                        const labels: any = {
                          jacket: '아우터 & 자켓',
                          knitwear: '니트웨어',
                          shirts: '셔츠',
                          trousers: '팬츠 & 슬랙스',
                          shoes: '슈즈',
                          accessories: '악세서리 & 레더',
                        };
                        setProductForm({
                          ...productForm,
                          category: e.target.value as any,
                          categoryLabel: labels[e.target.value],
                        });
                      }}
                      className="w-full bg-[#15191E] border border-[#262D37] p-2.5 rounded-sm text-[#F7F5F0]"
                    >
                      <option value="jacket">아우터 & 자켓</option>
                      <option value="knitwear">니트웨어</option>
                      <option value="shirts">셔츠</option>
                      <option value="trousers">팬츠 & 슬랙스</option>
                      <option value="shoes">슈즈</option>
                      <option value="accessories">악세서리 & 레더</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#D1AA75] font-semibold mb-1">샘플 기준 가격 (원)</label>
                    <input
                      type="number"
                      value={productForm.price || ''}
                      onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                      className="w-full bg-[#15191E] border border-[#262D37] p-2.5 rounded-sm text-[#F7F5F0]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#D1AA75] font-semibold mb-1">이미지 URL</label>
                    <input
                      type="text"
                      required
                      value={productForm.imageUrl || ''}
                      onChange={(e) => setProductForm({ ...productForm, imageUrl: e.target.value })}
                      className="w-full bg-[#15191E] border border-[#262D37] p-2.5 rounded-sm text-[#F7F5F0]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#D1AA75] font-semibold mb-1">원단 및 소재 정보</label>
                  <input
                    type="text"
                    value={productForm.fabricDetails || ''}
                    onChange={(e) => setProductForm({ ...productForm, fabricDetails: e.target.value })}
                    className="w-full bg-[#15191E] border border-[#262D37] p-2.5 rounded-sm text-[#F7F5F0]"
                  />
                </div>

                <div>
                  <label className="block text-[#D1AA75] font-semibold mb-1">상품 설명</label>
                  <textarea
                    rows={3}
                    value={productForm.description || ''}
                    onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                    className="w-full bg-[#15191E] border border-[#262D37] p-2.5 rounded-sm text-[#F7F5F0]"
                  />
                </div>

                <div>
                  <label className="block text-[#D1AA75] font-semibold mb-1">스타일링 코멘트</label>
                  <input
                    type="text"
                    value={productForm.stylingNotes || ''}
                    onChange={(e) => setProductForm({ ...productForm, stylingNotes: e.target.value })}
                    className="w-full bg-[#15191E] border border-[#262D37] p-2.5 rounded-sm text-[#F7F5F0]"
                  />
                </div>

                <div className="pt-3 border-t border-[#262D37] flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    className="px-4 py-2 border border-[#262D37] rounded-sm text-[#D8D4CA]"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#D1AA75] text-[#15191E] font-bold rounded-sm"
                  >
                    저장 완료
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Lookbook Edit / Add Modal */}
        {editingLookbook && (
          <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4">
            <div className="bg-[#1A1F26] border border-[#D1AA75]/50 w-full max-w-2xl rounded-sm p-6 space-y-5 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-[#262D37] pb-3">
                <h3 className="font-editorial text-xl text-[#F7F5F0]">
                  {isNewLookbook ? '신규 룩북 화보 등록' : '룩북 정보 수정'}
                </h3>
                <button
                  onClick={() => setEditingLookbook(null)}
                  className="text-[#D8D4CA] hover:text-[#F7F5F0]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveLookbook} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[#D1AA75] font-semibold mb-1">타이틀</label>
                  <input
                    type="text"
                    required
                    value={lookbookForm.title || ''}
                    onChange={(e) => setLookbookForm({ ...lookbookForm, title: e.target.value })}
                    className="w-full bg-[#15191E] border border-[#262D37] p-2.5 rounded-sm text-[#F7F5F0]"
                  />
                </div>
                <div>
                  <label className="block text-[#D1AA75] font-semibold mb-1">부제목</label>
                  <input
                    type="text"
                    value={lookbookForm.subtitle || ''}
                    onChange={(e) => setLookbookForm({ ...lookbookForm, subtitle: e.target.value })}
                    className="w-full bg-[#15191E] border border-[#262D37] p-2.5 rounded-sm text-[#F7F5F0]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#D1AA75] font-semibold mb-1">스타일 카테고리</label>
                    <input
                      type="text"
                      value={lookbookForm.category || ''}
                      onChange={(e) => setLookbookForm({ ...lookbookForm, category: e.target.value })}
                      className="w-full bg-[#15191E] border border-[#262D37] p-2.5 rounded-sm text-[#F7F5F0]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#D1AA75] font-semibold mb-1">시즌</label>
                    <input
                      type="text"
                      value={lookbookForm.season || ''}
                      onChange={(e) => setLookbookForm({ ...lookbookForm, season: e.target.value })}
                      className="w-full bg-[#15191E] border border-[#262D37] p-2.5 rounded-sm text-[#F7F5F0]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[#D1AA75] font-semibold mb-1">메인 화보 이미지 URL</label>
                  <input
                    type="text"
                    required
                    value={lookbookForm.imageUrl || ''}
                    onChange={(e) => setLookbookForm({ ...lookbookForm, imageUrl: e.target.value })}
                    className="w-full bg-[#15191E] border border-[#262D37] p-2.5 rounded-sm text-[#F7F5F0]"
                  />
                </div>
                <div>
                  <label className="block text-[#D1AA75] font-semibold mb-1">룩북 설명</label>
                  <textarea
                    rows={3}
                    value={lookbookForm.description || ''}
                    onChange={(e) => setLookbookForm({ ...lookbookForm, description: e.target.value })}
                    className="w-full bg-[#15191E] border border-[#262D37] p-2.5 rounded-sm text-[#F7F5F0]"
                  />
                </div>
                <div className="pt-3 border-t border-[#262D37] flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingLookbook(null)}
                    className="px-4 py-2 border border-[#262D37] rounded-sm text-[#D8D4CA]"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#D1AA75] text-[#15191E] font-bold rounded-sm"
                  >
                    저장 완료
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Article Edit / Add Modal */}
        {editingArticle && (
          <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4">
            <div className="bg-[#1A1F26] border border-[#D1AA75]/50 w-full max-w-2xl rounded-sm p-6 space-y-5 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-[#262D37] pb-3">
                <h3 className="font-editorial text-xl text-[#F7F5F0]">
                  {isNewArticle ? '신규 매거진 아티클 등록' : '아티클 수정'}
                </h3>
                <button
                  onClick={() => setEditingArticle(null)}
                  className="text-[#D8D4CA] hover:text-[#F7F5F0]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveArticle} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[#D1AA75] font-semibold mb-1">제목</label>
                  <input
                    type="text"
                    required
                    value={articleForm.title || ''}
                    onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })}
                    className="w-full bg-[#15191E] border border-[#262D37] p-2.5 rounded-sm text-[#F7F5F0]"
                  />
                </div>
                <div>
                  <label className="block text-[#D1AA75] font-semibold mb-1">부제목</label>
                  <input
                    type="text"
                    value={articleForm.subtitle || ''}
                    onChange={(e) => setArticleForm({ ...articleForm, subtitle: e.target.value })}
                    className="w-full bg-[#15191E] border border-[#262D37] p-2.5 rounded-sm text-[#F7F5F0]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#D1AA75] font-semibold mb-1">카테고리</label>
                    <select
                      value={articleForm.category || 'Styling'}
                      onChange={(e) => setArticleForm({ ...articleForm, category: e.target.value as any })}
                      className="w-full bg-[#15191E] border border-[#262D37] p-2.5 rounded-sm text-[#F7F5F0]"
                    >
                      <option value="Styling">Styling</option>
                      <option value="Material">Material</option>
                      <option value="Watch & Shoes">Watch & Shoes</option>
                      <option value="Grooming">Grooming</option>
                      <option value="Lifestyle">Lifestyle</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[#D1AA75] font-semibold mb-1">작성자 / 에디터</label>
                    <input
                      type="text"
                      value={articleForm.author || ''}
                      onChange={(e) => setArticleForm({ ...articleForm, author: e.target.value })}
                      className="w-full bg-[#15191E] border border-[#262D37] p-2.5 rounded-sm text-[#F7F5F0]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[#D1AA75] font-semibold mb-1">커버 이미지 URL</label>
                  <input
                    type="text"
                    required
                    value={articleForm.coverImage || ''}
                    onChange={(e) => setArticleForm({ ...articleForm, coverImage: e.target.value })}
                    className="w-full bg-[#15191E] border border-[#262D37] p-2.5 rounded-sm text-[#F7F5F0]"
                  />
                </div>
                <div>
                  <label className="block text-[#D1AA75] font-semibold mb-1">요약문 (Excerpt)</label>
                  <textarea
                    rows={2}
                    value={articleForm.excerpt || ''}
                    onChange={(e) => setArticleForm({ ...articleForm, excerpt: e.target.value })}
                    className="w-full bg-[#15191E] border border-[#262D37] p-2.5 rounded-sm text-[#F7F5F0]"
                  />
                </div>
                <div className="pt-3 border-t border-[#262D37] flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingArticle(null)}
                    className="px-4 py-2 border border-[#262D37] rounded-sm text-[#D8D4CA]"
                  >
                    취소
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#D1AA75] text-[#15191E] font-bold rounded-sm"
                  >
                    저장 완료
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
