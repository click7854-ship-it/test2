import { StylingInput, StylingRecommendation } from '../types';

export interface StylingApiResponse {
  success: boolean;
  source: 'gemini' | 'curated_engine';
  data: StylingRecommendation;
  notice?: string;
  error?: string;
}

export async function requestAiStyling(input: StylingInput): Promise<StylingApiResponse> {
  try {
    const res = await fetch('/api/ai/styling', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || `서버 응답 오류 (HTTP ${res.status})`);
    }

    const data: StylingApiResponse = await res.json();
    return data;
  } catch (error: any) {
    console.error('AI Styling request failed:', error);
    throw error;
  }
}
