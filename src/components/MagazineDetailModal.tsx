import React from 'react';
import { useApp } from '../context/AppContext';
import { MagazineArticle } from '../types';
import { X, Bookmark, BookmarkCheck, Clock, Calendar, User, Sparkles } from 'lucide-react';

export const MagazineDetailModal: React.FC<{
  article: MagazineArticle;
  onClose: () => void;
}> = ({ article, onClose }) => {
  const { userSaved, toggleSaveArticle } = useApp();
  const isSaved = userSaved.savedArticles.includes(article.id);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div
        className="relative bg-[#1A1F26] border border-[#D1AA75]/50 w-full max-w-3xl rounded-sm shadow-2xl overflow-hidden my-8"
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

        <div className="max-h-[85vh] overflow-y-auto">
          {/* Cover Image */}
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-black">
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1F26] via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-4 left-6 bg-[#15191E]/90 border border-[#D1AA75]/30 text-[#D1AA75] text-xs font-semibold px-3 py-1 uppercase tracking-wider backdrop-blur-sm">
              {article.category}
            </div>
          </div>

          {/* Article Header */}
          <div className="p-6 sm:p-10 space-y-6">
            <div className="border-b border-[#262D37] pb-6 space-y-3">
              <span className="text-xs font-display tracking-widest text-[#D1AA75] uppercase block">
                STYLE LAB EDITORIAL ESSAY
              </span>
              <h1 className="font-editorial text-2xl sm:text-3xl md:text-4xl font-medium text-[#F7F5F0] leading-tight">
                {article.title}
              </h1>
              <p className="text-sm text-[#D1AA75] font-light italic">
                {article.subtitle}
              </p>

              {/* Author & Meta */}
              <div className="pt-3 flex flex-wrap items-center gap-4 text-xs text-[#D8D4CA]/70">
                <span className="flex items-center gap-1.5 text-[#F7F5F0]">
                  <User className="w-3.5 h-3.5 text-[#D1AA75]" />
                  {article.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {article.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {article.readTime}
                </span>
              </div>
            </div>

            {/* Excerpt Lead */}
            <div className="bg-[#15191E] p-5 rounded-sm border-l-2 border-[#D1AA75] text-xs sm:text-sm text-[#F7F5F0] leading-relaxed font-light italic">
              {article.excerpt}
            </div>

            {/* Article Content Paragraphs */}
            <div className="space-y-5 text-xs sm:text-sm text-[#D8D4CA] font-light leading-relaxed font-editorial">
              {article.content.map((paragraph, idx) => (
                <p key={idx} className="indent-4 leading-loose">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Tags */}
            <div className="pt-6 border-t border-[#262D37] flex flex-wrap gap-2">
              {article.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-[#15191E] text-[#D8D4CA] border border-[#262D37] px-3 py-1 rounded-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Footer Action */}
            <div className="pt-6 border-t border-[#262D37] flex items-center justify-between">
              <span className="text-xs text-[#D8D4CA]/60">
                에디토리얼 칼럼을 MY STYLE에 저장해두고 언제든 다시 읽어보세요.
              </span>
              <button
                onClick={() => toggleSaveArticle(article.id)}
                className={`inline-flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-sm border transition-all ${
                  isSaved
                    ? 'border-[#D1AA75] bg-[#D1AA75] text-[#15191E]'
                    : 'border-[#262D37] bg-[#15191E] text-[#D8D4CA] hover:border-[#D1AA75]'
                }`}
              >
                {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                <span>{isSaved ? '스크랩 완료' : '칼럼 스크랩'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
