import { StylingInput, StylingRecommendation } from '../types';
import { generateCuratedStyling } from './curatedStylingEngine';

export interface StylingApiResponse {
  success: boolean;
  source: 'gemini' | 'curated_engine';
  data: StylingRecommendation;
  notice?: string;
  error?: string;
}

export async function requestAiStyling(input: StylingInput): Promise<StylingApiResponse> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const res = await fetch('/api/ai/styling', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (res.ok) {
      const data: StylingApiResponse = await res.json();
      return data;
    }
  } catch {
    // Network unavailable or serverless route not mounted on static Vercel build
    // Gracefully handle without throwing an error to the user
  }

  // Smooth client-side fallback delay for realistic styling analysis experience
  await new Promise((resolve) => setTimeout(resolve, 600));

  return {
    success: true,
    source: 'curated_engine',
    data: generateCuratedStyling(input),
    notice: '35~55세 남성 전문 지능형 큐레이션 엔진으로 생성되었습니다.',
  };
}
