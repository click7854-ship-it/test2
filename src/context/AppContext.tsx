import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  TabType,
  ProductItem,
  LookbookItem,
  MagazineArticle,
  StylingRecommendation,
  UserSavedState,
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_LOOKBOOKS,
  INITIAL_MAGAZINE_ARTICLES,
} from '../data/mockData';

interface AppContextType {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  // Modals & details
  selectedProduct: ProductItem | null;
  setSelectedProduct: (p: ProductItem | null) => void;
  selectedLookbook: LookbookItem | null;
  setSelectedLookbook: (l: LookbookItem | null) => void;
  selectedArticle: MagazineArticle | null;
  setSelectedArticle: (a: MagazineArticle | null) => void;
  // Search
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  // Category quick filter
  selectedCategory: string | null;
  setSelectedCategory: (cat: string | null) => void;
  // User Saved data
  userSaved: UserSavedState;
  toggleSaveProduct: (id: string) => void;
  toggleSaveLookbook: (id: string) => void;
  toggleSaveArticle: (id: string) => void;
  addRecommendationHistory: (rec: StylingRecommendation) => void;
  clearRecommendationHistory: () => void;
  // Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
  // Content Management / Admin
  products: ProductItem[];
  lookbooks: LookbookItem[];
  articles: MagazineArticle[];
  addProduct: (product: ProductItem) => void;
  updateProduct: (product: ProductItem) => void;
  deleteProduct: (id: string) => void;
  addLookbook: (lookbook: LookbookItem) => void;
  updateLookbook: (lookbook: LookbookItem) => void;
  deleteLookbook: (id: string) => void;
  addArticle: (article: MagazineArticle) => void;
  updateArticle: (article: MagazineArticle) => void;
  deleteArticle: (id: string) => void;
  resetAllToDefaults: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  SAVED: 'mens_style_lab_saved_v1',
  PRODUCTS: 'mens_style_lab_products_v1',
  LOOKBOOKS: 'mens_style_lab_lookbooks_v1',
  ARTICLES: 'mens_style_lab_articles_v1',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTabState] = useState<TabType>('home');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [selectedLookbook, setSelectedLookbook] = useState<LookbookItem | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<MagazineArticle | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Products
  const [products, setProducts] = useState<ProductItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  // Lookbooks
  const [lookbooks, setLookbooks] = useState<LookbookItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LOOKBOOKS);
      return saved ? JSON.parse(saved) : INITIAL_LOOKBOOKS;
    } catch {
      return INITIAL_LOOKBOOKS;
    }
  });

  // Magazine Articles
  const [articles, setArticles] = useState<MagazineArticle[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ARTICLES);
      return saved ? JSON.parse(saved) : INITIAL_MAGAZINE_ARTICLES;
    } catch {
      return INITIAL_MAGAZINE_ARTICLES;
    }
  });

  // User Saved state
  const [userSaved, setUserSaved] = useState<UserSavedState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SAVED);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to parse saved state:', e);
    }
    return {
      savedProducts: ['prod-01', 'prod-04'],
      savedLookbooks: ['look-01'],
      savedArticles: ['mag-01'],
      recommendationHistory: [],
    };
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LOOKBOOKS, JSON.stringify(lookbooks));
  }, [lookbooks]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SAVED, JSON.stringify(userSaved));
  }, [userSaved]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  const setActiveTab = (tab: TabType) => {
    setActiveTabState(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle Saves
  const toggleSaveProduct = (id: string) => {
    setUserSaved((prev) => {
      const exists = prev.savedProducts.includes(id);
      const updated = exists
        ? prev.savedProducts.filter((item) => item !== id)
        : [...prev.savedProducts, id];
      showToast(exists ? '보관함에서 삭제되었습니다.' : 'MY STYLE에 상품이 저장되었습니다.');
      return { ...prev, savedProducts: updated };
    });
  };

  const toggleSaveLookbook = (id: string) => {
    setUserSaved((prev) => {
      const exists = prev.savedLookbooks.includes(id);
      const updated = exists
        ? prev.savedLookbooks.filter((item) => item !== id)
        : [...prev.savedLookbooks, id];
      showToast(exists ? '보관함에서 삭제되었습니다.' : 'MY STYLE에 룩북이 저장되었습니다.');
      return { ...prev, savedLookbooks: updated };
    });
  };

  const toggleSaveArticle = (id: string) => {
    setUserSaved((prev) => {
      const exists = prev.savedArticles.includes(id);
      const updated = exists
        ? prev.savedArticles.filter((item) => item !== id)
        : [...prev.savedArticles, id];
      showToast(exists ? '보관함에서 삭제되었습니다.' : 'MY STYLE에 아티클이 저장되었습니다.');
      return { ...prev, savedArticles: updated };
    });
  };

  const addRecommendationHistory = (rec: StylingRecommendation) => {
    const enrichedRec: StylingRecommendation = {
      ...rec,
      id: rec.id || `rec-${Date.now()}`,
      createdAt: rec.createdAt || new Date().toISOString(),
    };
    setUserSaved((prev) => ({
      ...prev,
      recommendationHistory: [enrichedRec, ...prev.recommendationHistory],
    }));
  };

  const clearRecommendationHistory = () => {
    setUserSaved((prev) => ({ ...prev, recommendationHistory: [] }));
    showToast('AI 추천 기록이 초기화되었습니다.');
  };

  // Admin Actions
  const addProduct = (p: ProductItem) => {
    setProducts((prev) => [p, ...prev]);
    showToast('새 큐레이션 상품이 등록되었습니다.');
  };

  const updateProduct = (p: ProductItem) => {
    setProducts((prev) => prev.map((item) => (item.id === p.id ? p : item)));
    showToast('상품 정보가 수정되었습니다.');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
    showToast('상품이 삭제되었습니다.');
  };

  const addLookbook = (l: LookbookItem) => {
    setLookbooks((prev) => [l, ...prev]);
    showToast('새 룩북 화보가 등록되었습니다.');
  };

  const updateLookbook = (l: LookbookItem) => {
    setLookbooks((prev) => prev.map((item) => (item.id === l.id ? l : item)));
    showToast('룩북이 수정되었습니다.');
  };

  const deleteLookbook = (id: string) => {
    setLookbooks((prev) => prev.filter((item) => item.id !== id));
    showToast('룩북이 삭제되었습니다.');
  };

  const addArticle = (a: MagazineArticle) => {
    setArticles((prev) => [a, ...prev]);
    showToast('새 매거진 아티클이 등록되었습니다.');
  };

  const updateArticle = (a: MagazineArticle) => {
    setArticles((prev) => prev.map((item) => (item.id === a.id ? a : item)));
    showToast('매거진 아티클이 수정되었습니다.');
  };

  const deleteArticle = (id: string) => {
    setArticles((prev) => prev.filter((item) => item.id !== id));
    showToast('매거진 아티클이 삭제되었습니다.');
  };

  const resetAllToDefaults = () => {
    setProducts(INITIAL_PRODUCTS);
    setLookbooks(INITIAL_LOOKBOOKS);
    setArticles(INITIAL_MAGAZINE_ARTICLES);
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
    localStorage.removeItem(STORAGE_KEYS.LOOKBOOKS);
    localStorage.removeItem(STORAGE_KEYS.ARTICLES);
    showToast('모든 콘텐츠가 기본 샘플 데이터로 복원되었습니다.');
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        selectedProduct,
        setSelectedProduct,
        selectedLookbook,
        setSelectedLookbook,
        selectedArticle,
        setSelectedArticle,
        searchOpen,
        setSearchOpen,
        selectedCategory,
        setSelectedCategory,
        userSaved,
        toggleSaveProduct,
        toggleSaveLookbook,
        toggleSaveArticle,
        addRecommendationHistory,
        clearRecommendationHistory,
        toastMessage,
        showToast,
        products,
        lookbooks,
        articles,
        addProduct,
        updateProduct,
        deleteProduct,
        addLookbook,
        updateLookbook,
        deleteLookbook,
        addArticle,
        updateArticle,
        deleteArticle,
        resetAllToDefaults,
      }}
    >
      {children}
      {/* Global Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#1A1F26] text-[#F7F5F0] border border-[#D1AA75] px-5 py-3 shadow-2xl rounded-sm transition-all duration-300">
          <div className="w-2 h-2 rounded-full bg-[#D1AA75] animate-ping" />
          <span className="text-sm font-medium tracking-wide">{toastMessage}</span>
        </div>
      )}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
