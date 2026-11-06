import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);

app.use(express.json());

// Initialize Gemini SDK with User-Agent header
const apiKey = process.env.GEMINI_API_KEY || '';
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    hasApiKey: !!process.env.GEMINI_API_KEY,
    timestamp: new Date().toISOString(),
  });
});

// Fallback styling recommendations based on inputs
function generateIntelligentFallback(inputs: {
  ageGroup: string;
  bodyType: string;
  occasion: string;
  budget: string;
  preferredStyle: string;
  notes?: string;
}) {
  const { ageGroup, bodyType, occasion, budget, preferredStyle, notes } = inputs;

  const styleProfiles: Record<string, any> = {
    '모던 클래식': {
      title: `${ageGroup} 남성을 위한 테일러드 모던 클래식 셋업`,
      concept: `군더더기 없는 실루엣과 고급스러운 울-실크 혼방 소재로 35~55세 남성의 원숙미와 신뢰감을 극대화한 스타일링입니다.`,
      top: {
        item: '다크 네이비 2버튼 하프 캔버스 울 블레이저 & 차콜 메리노 울 롱슬리브 니트',
        stylingTip: '셔츠 대신 18게이지의 얇고 매끄러운 파인 메리노 울 니트를 이너로 매치해 격식은 지키면서 한층 부드럽고 여유로운 인상을 줍니다.',
        color: '다크 네이비 / 차콜',
      },
      bottom: {
        item: '미드 그레이 원턱 테이퍼드 슬랙스 (사이드 어드저스터 사양)',
        fitPoint: '벨트 대신 사이드 어드저스터를 활용해 허리 라인을 깔끔하게 정돈하고, 복부 압박감 없이 밑단이 복사뼈 상단에 살짝 닿는 노브레이크 기장으로 다리가 길어 보입니다.',
        color: '미드 그레이',
      },
      shoes: {
        item: '다크 브라운 에이프런 토 페니 로퍼 또는 옥스퍼드 드레스 슈즈',
        stylingTip: '블랙보다 다크 브라운 가죽이 울 수트의 품격을 부드럽게 감싸주며, 웰트 제법의 단단한 밑창이 안정적인 보행감을 선사합니다.',
        color: '에스프레소 브라운',
      },
      accessories: [
        '38mm 클래식 화이트 다이얼 레더 스트랩 워치',
        '톤온톤 실크 린넨 포켓 스퀘어',
        '미니멀한 그레인 레더 브리프케이스',
      ],
      colorPalette: {
        primary: '#15191E (미드나잇 차콜/네이비)',
        secondary: '#5C636E (클래식 슬레이트 그레이)',
        accent: '#D1AA75 (앤틱 샌드 골드)',
        rationale: '클래식 남성복의 황금 비율인 네이비-그레이-브라운을 베이스로 하여 피부 톤을 화사하게 정돈하고 안정된 품격을 선사합니다.',
      },
      recommendationReason: `${bodyType} 체형의 특성을 감안해 어깨 패드가 자연스러운 소프트 숄더 자켓으로 상체 라인을 정돈하고, ${occasion} 상황에 걸맞은 단정함과 절제된 감각을 선사하도록 구성했습니다.`,
      ageFitGuide: '35세 이후부터는 지나치게 스키니한 핏보다는 자연스러운 여유분이 있는 테이퍼드 실루엣이 체형 커버와 중후한 매력 발산에 가장 효과적입니다.',
      stylingDos: [
        '소매 기장은 셔츠나 니트 커프스가 1~1.5cm 살짝 보이도록 수선할 것',
        '원단 소재(울 100%, 캐시미어 혼방 등)의 윤기감에 투자할 것',
      ],
      stylingDonts: [
        '복부가 조이는 타이트한 슬림핏 팬츠 피하기',
        '광택이 지나치거나 합성섬유 비율이 높은 겉옷 피하기',
      ],
    },
    '스마트 캐주얼': {
      title: `${ageGroup}을 위한 콰이어트 스마트 캐주얼 & 캐시미어 레이어링`,
      concept: `포멀함과 캐주얼의 절묘한 균형으로 격식 있는 자리부터 주말 사적 모임까지 자연스럽게 아우르는 세련된 룩입니다.`,
      top: {
        item: '토프 브라운 언컨스트럭티드 캐시미어 블렌드 블레이저 & 오프화이트 모크넥 니트',
        stylingTip: '안감이 없는 언컨 자켓으로 활동성을 높이고, 목선을 부드럽게 감싸는 모크넥으로 품위와 계절감을 동시에 챙겼습니다.',
        color: '토프 브라운 / 웜 오프화이트',
      },
      bottom: {
        item: '에크루 아이보리 프리미엄 셀비지 데님 또는 스트레이트 코튼 트라우저',
        fitPoint: '너무 밝지 않은 차분한 크림 아이보리 톤으로 하체를 맑게 밝혀주며, 밑위가 적당히 높은 레귤러 스트레이트 핏으로 다리 라인을 보정합니다.',
        color: '크림 아이보리',
      },
      shoes: {
        item: '스웨이드 처카 부츠 또는 미니멀 화이트 카프스킨 스니커즈',
        stylingTip: '발등이 날렵하면서도 쿠셔닝이 좋은 이탈리안 스웨이드 슈즈로 마무리하여 룩의 전체 무게중심을 정돈합니다.',
        color: '샌드 스웨이드 / 오프화이트',
      },
      accessories: [
        '밀라니즈 루프 또는 레더 밴드 드레스 워치',
        '캐시미어 실크 혼방 머플러',
        '스웨이드 토트백',
      ],
      colorPalette: {
        primary: '#423A33 (웜 토프 브라운)',
        secondary: '#F7F5F0 (소프트 아이보리)',
        accent: '#D1AA75 (샌드 골드)',
        rationale: '자연에서 온 어스(Earth) 톤을 기반으로 부드러우면서도 도시적인 성숙함을 표현했습니다.',
      },
      recommendationReason: `${occasion}에 지나치게 굳어 보이지 않으면서도 세련된 센스를 보여줄 수 있는 최적의 조합입니다. ${bodyType} 체형에서도 상·하체 밸런스를 균형 있게 잡아줍니다.`,
      ageFitGuide: '성숙한 남성의 캐주얼은 화려한 패턴보다 ‘소재의 질감 차이’(스웨이드, 니트, 고급 데님)로 승부하는 것이 핵심입니다.',
      stylingDos: ['밑단을 1~2회 얇게 롤업하거나 딱 떨어지는 기장 유지', '이너는 밝은 아이보리로 얼굴 톤 살리기'],
      stylingDonts: ['요란한 디스트로이드 데님이나 커다란 로고 티셔츠 금지', '운동용 러닝화를 스마트 캐주얼에 매치하기'],
    },
    '콰이어트 럭셔리': {
      title: `${ageGroup} 남성을 위한 은은한 미학, 콰이어트 럭셔리 앙상블`,
      concept: `로고 없이도 극상의 원단과 정교한 패턴으로 존재감을 드러내는 하이엔드 미니멀리즘 스타일입니다.`,
      top: {
        item: '딥 차콜 더블 페이스 캐시미어 오버셔츠 & 샌드 베이지 하이게이지 실크 블렌드 니트',
        stylingTip: '자켓처럼 걸칠 수 있는 도톰한 캐시미어 오버셔츠를 아우터로 활용해 현대적이고 여유로운 실루엣을 완성합니다.',
        color: '딥 차콜 / 샌드 베이지',
      },
      bottom: {
        item: '올리브 그레이 캐시미어 플란넬 이지 트라우저',
        fitPoint: '허리 부분에 보이지 않는 히든 밴딩이 적용되어 장시간 앉아있는 일정에도 구김이 덜하고 편안함을 유지합니다.',
        color: '올리브 그레이',
      },
      shoes: {
        item: '벨벳 감촉의 스웨이드 로로 로퍼 또는 레더 슬립온',
        stylingTip: '밑창이 얇고 유연한 로퍼로 걸음걸이에 가벼움과 여유를 부여합니다.',
        color: '다크 초콜릿 브라운',
      },
      accessories: [
        '골드 케이스의 앤틱 오토매틱 워치',
        '그레인 레더 도큐먼트 홀더',
      ],
      colorPalette: {
        primary: '#1A1F26 (미드나잇 차콜)',
        secondary: '#6E726D (뮤트 올리브)',
        accent: '#D1AA75 (소프트 샌드 골드)',
        rationale: '눈에 띄는 원색 대신 채도를 낮춘 뉴트럴 톤들의 깊이감 있는 층위로 은근한 럭셔리를 전달합니다.',
      },
      recommendationReason: `${budget} 예산 수준과 ${occasion}의 격에 맞추어 시대를 타지 않는 영속적인 가치를 지닌 아이템들로 구성되었습니다.`,
      ageFitGuide: '나이가 들수록 화려한 장식보다는 만졌을 때 느껴지는 원사의 부드러움과 몸을 타고 흐르는 드레이프성이 품격을 결정합니다.',
      stylingDos: ['원단 텍스처의 고급스러움을 부각하는 미니멀 코디', '자연광에서 은은하게 빛나는 천연 자개 단추 체크'],
      stylingDonts: ['눈에 띄는 빅 로고나 인위적인 광택감', '소재감이 서로 부딪히는 과도한 믹스매치'],
    },
  };

  const selected = styleProfiles[preferredStyle] || styleProfiles['모던 클래식'];

  // Personalize with user notes if provided
  if (notes && notes.trim()) {
    selected.recommendationReason += ` 특히 추가 요청사항("${notes.trim()}")을 반영하여 더욱 정교하게 조율되었습니다.`;
  }

  return selected;
}

// Server-side AI Styling Recommendation Route
app.post('/api/ai/styling', async (req, res) => {
  const { ageGroup, bodyType, occasion, budget, preferredStyle, notes } = req.body;

  if (!ageGroup || !bodyType || !occasion || !budget || !preferredStyle) {
    res.status(400).json({ error: '필수 스타일링 입력 항목이 누락되었습니다.' });
    return;
  }

  // If Gemini API is available, generate structured recommendation
  if (ai && process.env.GEMINI_API_KEY) {
    try {
      const prompt = `
당신은 대한민국 최고 권위의 35~55세 남성 전문 프리미엄 패션 디렉터이자 퍼스널 스타일리스트입니다.
다음 고객의 프로필과 요구사항을 면밀히 분석하여, 과장이나 억지 트렌드가 아닌 진정한 원숙미, 신뢰감, 품격을 구현하는 완벽한 스타일링 코디를 제안해주세요.

[고객 프로필]
- 연령대: ${ageGroup}
- 체형 특성: ${bodyType}
- 착용 상황 (TPO): ${occasion}
- 예산 범위: ${budget}
- 선호하는 스타일: ${preferredStyle}
- 고객 추가 메모 및 고민: ${notes || '없음'}

[응답 규칙]
- 브랜드명은 특정 브랜드를 무단 홍보하거나 제휴된 것처럼 단정하지 말고, 스타일과 아이템의 원단(소재), 실루엣, 핏을 구체적으로 서술하세요.
- 35~55세 남성의 체형 변화(복부, 어깨, 체격)와 사회적 위치, 자연스러운 품격을 배려하는 전문적인 어조를 사용하세요.
- 한국어로 품격 있고 정제된 편집 매거진 스타일 문체로 작성하세요.
`;

      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Gemini API timeout')), 6500)
      );

      const generatePromise = ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction: 'You are an elite men fashion director and styling consultant specialized in timeless, quiet luxury, and smart classic menswear for gentlemen aged 35 to 55. Respond with precise Korean styling advice.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: {
                type: Type.STRING,
                description: '스타일링 제목 (예: 40대 비즈니스 리더를 위한 네이비 테일러드 셋업 룩)',
              },
              concept: {
                type: Type.STRING,
                description: '전체 스타일링 컨셉 및 무드 설명 (2-3문장)',
              },
              top: {
                type: Type.OBJECT,
                properties: {
                  item: { type: Type.STRING, description: '상의 추천 아이템 및 소재' },
                  stylingTip: { type: Type.STRING, description: '착용법 및 레이어링 팁' },
                  color: { type: Type.STRING, description: '추천 컬러' },
                },
                required: ['item', 'stylingTip', 'color'],
              },
              bottom: {
                type: Type.OBJECT,
                properties: {
                  item: { type: Type.STRING, description: '하의 추천 아이템 및 소재' },
                  fitPoint: { type: Type.STRING, description: '체형 보완 및 핏 포인트' },
                  color: { type: Type.STRING, description: '추천 컬러' },
                },
                required: ['item', 'fitPoint', 'color'],
              },
              shoes: {
                type: Type.OBJECT,
                properties: {
                  item: { type: Type.STRING, description: '슈즈 추천 아이템 및 제법/가죽 종류' },
                  stylingTip: { type: Type.STRING, description: '신발 매치 및 관리 팁' },
                  color: { type: Type.STRING, description: '추천 컬러' },
                },
                required: ['item', 'stylingTip', 'color'],
              },
              accessories: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: '추천 악세서리 2~4가지 (시계, 가방, 벨트, 머플러 등)',
              },
              colorPalette: {
                type: Type.OBJECT,
                properties: {
                  primary: { type: Type.STRING, description: '주색상 (Main)' },
                  secondary: { type: Type.STRING, description: '보조색상 (Sub)' },
                  accent: { type: Type.STRING, description: '포인트색상 (Accent)' },
                  rationale: { type: Type.STRING, description: '색상 조합 이유 및 배색 이론' },
                },
                required: ['primary', 'secondary', 'accent', 'rationale'],
              },
              recommendationReason: {
                type: Type.STRING,
                description: '이 조합을 추천하는 심층적인 이유 및 TPO 적합성',
              },
              ageFitGuide: {
                type: Type.STRING,
                description: '35~55세 남성이 주의해야 할 실루엣과 품위 유지 가이드',
              },
              stylingDos: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: '스타일링 성공 포인트 2가지',
              },
              stylingDonts: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: '피해야 할 패션 실수 2가지',
              },
            },
            required: [
              'title',
              'concept',
              'top',
              'bottom',
              'shoes',
              'accessories',
              'colorPalette',
              'recommendationReason',
              'ageFitGuide',
              'stylingDos',
              'stylingDonts',
            ],
          },
        },
      });

      const response = await Promise.race([generatePromise, timeoutPromise]);
      const parsed = JSON.parse(response.text || '{}');
      res.json({
        success: true,
        source: 'gemini',
        data: parsed,
      });
      return;
    } catch (err: any) {
      console.warn('Gemini API call encountered error, using curated fallback:', err?.message || err);
      // Fallback gracefully
      const fallbackData = generateIntelligentFallback({
        ageGroup,
        bodyType,
        occasion,
        budget,
        preferredStyle,
        notes,
      });
      res.json({
        success: true,
        source: 'curated_engine',
        data: fallbackData,
        notice: '프리미엄 큐레이션 엔진으로 생성되었습니다.',
      });
      return;
    }
  }

  // If no Gemini API key set, use the curated engine
  const fallbackData = generateIntelligentFallback({
    ageGroup,
    bodyType,
    occasion,
    budget,
    preferredStyle,
    notes,
  });
  res.json({
    success: true,
    source: 'curated_engine',
    data: fallbackData,
  });
});

async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`MEN'S STYLE LAB server listening on http://0.0.0.0:${port}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
