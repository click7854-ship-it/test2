import { StylingInput, StylingRecommendation } from '../types';

export function generateCuratedStyling(input: StylingInput): StylingRecommendation {
  const { ageGroup, bodyType, occasion, budget, preferredStyle, notes = '' } = input;

  // 1. Age-specific nuances
  let ageNuance = '';
  if (ageGroup.includes('30대')) {
    ageNuance = '트렌드와 전통의 균형을 맞추어 너무 보수적이지 않으면서도 스마트한 인상을 주는 실루엣';
  } else if (ageGroup.includes('40대 초반')) {
    ageNuance = '조직과 비즈니스에서 신뢰감 있는 리더십을 드러내며 활동성을 보장하는 테일러링';
  } else if (ageGroup.includes('40대 후반')) {
    ageNuance = '원숙한 중후함과 절제미, 체형의 자연스러운 여유를 고급스럽게 살리는 핏';
  } else {
    ageNuance = '최고급 천연 원사와 클래식 복식 에티켓을 존중하는 기품 있는 하이엔드 무드';
  }

  // 2. Body-type tailoring rules
  let bodyTailoringTip = '';
  let bottomFit = '';
  let topSilhouette = '';

  if (bodyType.includes('복부')) {
    bodyTailoringTip = '복부 압박을 없애기 위해 벨트 대신 사이드 어드저스터와 깊은 원턱(One Pleat)을 적용하고, 자켓의 허리 라인을 너무 조이지 않는 내추럴 핏으로 정돈합니다.';
    bottomFit = '미드 라이즈 원턱 테이퍼드 슬랙스 (사이드 어드저스터 사양)';
    topSilhouette = '라펠 폭 8.5cm의 하프 캔버스 2버튼 블레이저 (소프트 숄더 패드)';
  } else if (bodyType.includes('어깨') || bodyType.includes('상체')) {
    bodyTailoringTip = '어깨 패드가 전혀 없는 나폴리탄 언컨스트럭티드(마니카 카미치아) 숄더로 상체의 부한 느낌을 덜어내고 유연한 드레이프를 형성합니다.';
    bottomFit = '여유로운 밑위의 레귤러 스트레이트 트라우저';
    topSilhouette = '패드가 생략된 언컨 캐시미어 울 블레이저';
  } else if (bodyType.includes('슬림')) {
    bodyTailoringTip = '마른 체형이 왜소해 보이지 않도록 탄탄한 중량감(300g 이상)의 원단과 적당한 가슴 볼륨 캔버스를 갖춘 셋업을 추천합니다.';
    bottomFit = '적당한 여유분이 있는 슬림 스트레이트 울 트라우저';
    topSilhouette = '체스트 볼륨을 살려주는 구조화된 테일러드 자켓 & 하이게이지 니트 레이어링';
  } else if (bodyType.includes('아담')) {
    bodyTailoringTip = '신발 발등을 덮지 않는 노브레이크(No-break) 기장과 상·하의 톤온톤 배색으로 시선을 상체로 끌어올려 다리가 한층 길어 보입니다.';
    bottomFit = '복사뼈 상단에 떨어지는 테이퍼드 크롭 슬랙스';
    topSilhouette = '총장이 엉덩이 3분의 2를 덮는 경쾌한 밸런스의 하프 자켓';
  } else {
    bodyTailoringTip = '신체의 자연스러운 곡선을 살리는 정통 이탈리안 테일러드 핏으로 단정함과 세련미를 동시에 극대화합니다.';
    bottomFit = '구두 발등을 살짝 스치는 하프 브레이크 스트레이트 울 슬랙스';
    topSilhouette = '단단한 가슴 캔버스와 유려한 롤링 라펠의 2버튼 싱글 자켓';
  }

  // 3. Style Profiles
  const baseCatalog: Record<string, any> = {
    '모던 클래식': {
      title: `${ageGroup} 남성을 위한 테일러드 모던 클래식 셋업`,
      concept: `35~55세 남성의 원숙한 기품과 신뢰감을 극대화한 정통 클래식 셋업입니다. ${ageNuance}을 바탕으로 언제 어디서나 단단한 존재감을 완성합니다.`,
      topItem: `${topSilhouette} (다크 네이비 / 차콜)`,
      topTip: '셔츠 대신 18게이지의 얇고 매끄러운 파인 메리노 울 니트를 이너로 매치해 격식은 지키면서 한층 부드럽고 여유로운 인상을 줍니다.',
      topColor: '다크 네이비 / 딥 차콜',
      bottomItem: bottomFit,
      bottomTip: '허리 라인을 깔끔하게 정돈하고, 복부 압박감 없이 곧게 뻗는 실루엣으로 다리가 길어 보입니다.',
      bottomColor: '미드 그레이 / 슬레이트 차콜',
      shoesItem: '다크 브라운 굿이어 웰트 페니 로퍼 또는 에이프런 토 드레스 슈즈',
      shoesTip: '블랙보다 다크 브라운 가죽이 울 수트의 품격을 부드럽게 감싸주며, 웰트 제법의 단단한 밑창이 안정적인 보행감을 선사합니다.',
      shoesColor: '에스프레소 브라운',
      accessories: [
        '38mm 클래식 화이트 다이얼 레더 스트랩 워치',
        '톤온톤 실크 린넨 포켓 스퀘어',
        '미니멀한 그레인 레더 브리프케이스',
      ],
      palette: {
        primary: '#15191E (미드나잇 차콜/네이비)',
        secondary: '#5C636E (클래식 슬레이트 그레이)',
        accent: '#D1AA75 (앤틱 샌드 골드)',
        rationale: '클래식 남성복의 황금 비율인 네이비-그레이-브라운을 베이스로 하여 피부 톤을 화사하게 정돈하고 안정된 품격을 선사합니다.',
      },
      dos: [
        '소매 기장은 셔츠나 니트 커프스가 1~1.5cm 살짝 보이도록 수선할 것',
        '울 100% 또는 캐시미어 혼방 원단의 은은한 윤기감에 투자할 것',
      ],
      donts: [
        '복부가 조이는 타이트한 스키니 슬림핏 팬츠 피하기',
        '광택이 지나치거나 합성섬유 비율이 높은 겉옷 피하기',
      ],
    },
    '스마트 캐주얼': {
      title: `${ageGroup}을 위한 콰이어트 스마트 캐주얼 & 캐시미어 레이어링`,
      concept: `포멀함과 캐주얼의 절묘한 균형으로 비즈니스 미팅부터 주말 모임까지 자연스럽게 아우르는 세련된 룩입니다.`,
      topItem: '토프 브라운 언컨스트럭티드 캐시미어 블렌드 블레이저 & 오프화이트 모크넥 니트',
      topTip: '안감이 없는 언컨 자켓으로 활동성을 높이고, 목선을 부드럽게 감싸는 모크넥으로 품위와 계절감을 동시에 챙겼습니다.',
      topColor: '토프 브라운 / 웜 오프화이트',
      bottomItem: '에크루 아이보리 프리미엄 셀비지 데님 또는 스트레이트 코튼 트라우저',
      bottomTip: '너무 밝지 않은 차분한 크림 아이보리 톤으로 하체를 맑게 밝혀주며, 밑위가 적당히 높은 레귤러 스트레이트 핏으로 다리 라인을 보정합니다.',
      bottomColor: '크림 아이보리',
      shoesItem: '스웨이드 처카 부츠 또는 미니멀 화이트 카프스킨 스니커즈',
      shoesTip: '발등이 날렵하면서도 쿠셔닝이 좋은 이탈리안 스웨이드 슈즈로 마무리하여 룩의 전체 무게중심을 정돈합니다.',
      shoesColor: '샌드 스웨이드 / 오프화이트',
      accessories: [
        '밀라니즈 루프 또는 레더 밴드 드레스 워치',
        '캐시미어 실크 혼방 머플러',
        '스웨이드 토트백',
      ],
      palette: {
        primary: '#423A33 (웜 토프 브라운)',
        secondary: '#F7F5F0 (소프트 아이보리)',
        accent: '#D1AA75 (샌드 골드)',
        rationale: '자연에서 온 어스(Earth) 톤을 기반으로 부드러우면서도 도시적인 성숙함을 표현했습니다.',
      },
      dos: [
        '밑단을 1~2회 얇게 롤업하거나 딱 떨어지는 기장 유지',
        '이너는 밝은 아이보리로 얼굴 톤 살리기',
      ],
      donts: [
        '요란한 디스트로이드 데님이나 커다란 로고 티셔츠 금지',
        '운동용 러닝화를 스마트 캐주얼에 매치하기',
      ],
    },
    '콰이어트 럭셔리': {
      title: `${ageGroup} 남성을 위한 은은한 미학, 콰이어트 럭셔리 앙상블`,
      concept: `로고 없이도 극상의 원단과 정교한 패턴으로 존재감을 드러내는 하이엔드 미니멀리즘 스타일입니다.`,
      topItem: '딥 차콜 더블 페이스 캐시미어 오버셔츠 & 샌드 베이지 하이게이지 실크 블렌드 니트',
      topTip: '자켓처럼 걸칠 수 있는 도톰한 캐시미어 오버셔츠를 아우터로 활용해 현대적이고 여유로운 실루엣을 완성합니다.',
      topColor: '딥 차콜 / 샌드 베이지',
      bottomItem: '올리브 그레이 캐시미어 플란넬 이지 트라우저',
      bottomTip: '허리 부분에 보이지 않는 히든 밴딩이 적용되어 장시간 앉아있는 일정에도 구김이 덜하고 편안함을 유지합니다.',
      bottomColor: '올리브 그레이',
      shoesItem: '벨벳 감촉의 스웨이드 로로 로퍼 또는 레더 슬립온',
      shoesTip: '밑창이 얇고 유연한 로퍼로 걸음걸이에 가벼움과 여유를 부여합니다.',
      shoesColor: '다크 초콜릿 브라운',
      accessories: [
        '골드 케이스의 앤틱 오토매틱 워치',
        '그레인 레더 도큐먼트 홀더',
      ],
      palette: {
        primary: '#1A1F26 (미드나잇 차콜)',
        secondary: '#6E726D (뮤트 올리브)',
        accent: '#D1AA75 (소프트 샌드 골드)',
        rationale: '눈에 띄는 원색 대신 채도를 낮춘 뉴트럴 톤들의 깊이감 있는 층위로 은근한 럭셔리를 전달합니다.',
      },
      dos: [
        '원단 텍스처의 고급스러움을 부각하는 미니멀 코디',
        '자연광에서 은은하게 빛나는 천연 자개 단추 체크',
      ],
      donts: [
        '눈에 띄는 빅 로고나 인위적인 광택감',
        '소재감이 서로 부딪히는 과도한 믹스매치',
      ],
    },
    '비즈니스 포멀': {
      title: `${ageGroup} 리더를 위한 브리티시 차콜 쓰리피스 수트`,
      concept: `중요한 프레젠테이션과 공식 석상에서 결단력과 확고한 신뢰감을 전하는 정통 비즈니스 포멀입니다.`,
      topItem: '영국산 320g 차콜 그레이 2버튼 수트 & 140수 화이트 핀포인트 셔츠',
      topTip: '단단한 캔버스가 어깨와 가슴 체형을 바로잡아주며, 베스트를 함께 갖춰 입으면 자켓을 열었을 때도 복부가 가려집니다.',
      topColor: '차콜 그레이 / 퓨어 화이트',
      bottomItem: bottomFit,
      bottomTip: '벨트루프가 없는 사이드 어드저스터 사양으로 수트 상하의의 연결선이 매끄럽게 흐릅니다.',
      bottomColor: '다크 차콜',
      shoesItem: '블랙 캡토 옥스퍼드 드레스 슈즈 (거트웰트 카프스킨)',
      shoesTip: '비즈니스 포멀의 기준이 되는 캡토 옥스퍼드로 발끝까지 정갈하게 마감합니다.',
      shoesColor: '클래식 블랙',
      accessories: [
        '다크 네이비 실크 자카드 타이',
        '화이트 린넨 포켓치프 (TV 폴드)',
        '하드 레더 브리프케이스',
      ],
      palette: {
        primary: '#1C2026 (헤비 차콜)',
        secondary: '#FFFFFF (크리스프 화이트)',
        accent: '#2B3A4A (딥 네이비)',
        rationale: '가장 강력한 비즈니스 대비감을 주는 차콜-화이트-네이비 삼총사로 흐트러짐 없는 권위를 부여합니다.',
      },
      dos: ['타이 대검 끝이 벨트 버클 중앙에 닿도록 정확히 매기', '구두 가죽은 항상 깨끗하게 폴리싱 상태 유지'],
      donts: ['광택이 나는 저가 폴리에스터 타이 착용', '발목 양말이나 흰색 양말 매치 금지'],
    },
    '릴랙스드 위켄드': {
      title: `${ageGroup}을 위한 프리미엄 니트웨어 & 스트레이트 치노 주말 룩`,
      concept: `주말 교외 드라이브와 편안한 가족 모임에서도 흐트러지지 않는 세련된 캐주얼의 정석입니다.`,
      topItem: '올리브 헤리티지 린넨 블렌드 필드 자켓 & 밀라노 립 오픈카라 니트',
      topTip: '목선이 시원하게 트인 오픈카라 니트로 답답함을 없애고, 자켓 소매를 살짝 걷어 자연스러운 멋을 냅니다.',
      topColor: '올리브 그린 / 샌드 오트밀',
      bottomItem: '테이퍼드 원턱 카키 코튼 치노',
      bottomTip: '신축성이 있는 고밀도 트윌 코튼으로 긴 보행과 운전에도 주름이 적고 편안합니다.',
      bottomColor: '웜 카키 베이지',
      shoesItem: '올 화이트 카프스킨 미니멀 스니커즈',
      shoesTip: '로고가 없는 유려한 가죽 스니커즈로 주말 룩의 경쾌함을 살립니다.',
      shoesColor: '초크 화이트',
      accessories: [
        '나토 밴드 필드 워치',
        '캔버스 레더 콤비 토트백',
      ],
      palette: {
        primary: '#3D4538 (올리브 드랩)',
        secondary: '#C8BEAF (오트밀 베이지)',
        accent: '#D1AA75 (소프트 골드)',
        rationale: '자연의 흙과 나무를 닮은 컬러로 보는 사람에게도 편안하고 친근한 인상을 남깁니다.',
      },
      dos: ['구김이 자연스러운 천연 원단(린넨, 코튼) 활용', '발목이 살짝 드러나는 깔끔한 바지 기장'],
      donts: ['낡은 등산복이나 골프웨어를 일상복으로 입기', '과도하게 늘어난 무릎이나 후줄근한 티셔츠'],
    },
    '헤리티지 & 아우터': {
      title: `${ageGroup}을 위한 타임리스 헤리티지 발마칸 & 코듀로이 룩`,
      concept: `세월이 흐를수록 멋이 깊어지는 래글런 코트와 묵직한 텍스처로 클래식 무드의 정점을 보여줍니다.`,
      topItem: '헤비 울 캐시미어 발마칸 롱 코트 & 케이블 니트 크루넥',
      topTip: '풍성한 A라인 코트 안쪽에 두툼한 니트를 레이어드하여 든든한 보온성과 중후한 분위기를 완성합니다.',
      topColor: '다크 차콜 / 모카 브라운',
      bottomItem: '헤비 코듀로이 원턱 팬츠',
      bottomTip: '굵은 골의 코듀로이 원단이 하체의 군살을 탄탄하게 감싸줍니다.',
      bottomColor: '딥 브라운 / 웜 토프',
      shoesItem: '다크 탄 굿이어 웰트 더비 슈즈 (다이나이트 러버 솔)',
      shoesTip: '빗길과 눈길에도 미끄러지지 않는 견고한 영국식 웰트 슈즈입니다.',
      shoesColor: '다크 탄 브라운',
      accessories: [
        '타탄 체크 울 캐시미어 머플러',
        '페커리 가죽 드라이빙 장갑',
      ],
      palette: {
        primary: '#2A2521 (딥 에스프레소)',
        secondary: '#6E6157 (웜 차콜)',
        accent: '#D1AA75 (샌드 골드)',
        rationale: '클래식 헤리티지의 깊이감을 살려주는 브라운 계열의 톤온톤 레이어드입니다.',
      },
      dos: ['코트 소매와 밑단 기장을 넉넉히 두어 클래식 실루엣 유지', '가죽 소품의 톤을 신발과 일치시키기'],
      donts: ['너무 얇은 비닐 광택 패딩 겉옷 매치', '부조화스러운 네온 컬러 포인트'],
    },
  };

  const selected = baseCatalog[preferredStyle] || baseCatalog['모던 클래식'];

  // Personalize with custom notes
  let personalizedReason = `${bodyType} 체형의 특성을 반영하여 ${bodyTailoringTip} ${occasion} 상황에 적합한 격식과 활동성을 완벽히 조화시켰습니다.`;

  if (notes && notes.trim()) {
    personalizedReason += ` 고객님의 특별 요청("${notes.trim()}")을 반영하여 네크라인과 허리 마감에 한층 더 세심한 디테일을 더했습니다.`;
  }

  return {
    id: `rec-${Date.now()}`,
    createdAt: new Date().toISOString(),
    title: selected.title,
    concept: selected.concept,
    top: {
      item: selected.topItem,
      stylingTip: selected.topTip,
      color: selected.topColor,
    },
    bottom: {
      item: selected.bottomItem,
      fitPoint: selected.bottomTip,
      color: selected.bottomColor,
    },
    shoes: {
      item: selected.shoesItem,
      stylingTip: selected.shoesTip,
      color: selected.shoesColor,
    },
    accessories: selected.accessories,
    colorPalette: selected.palette,
    recommendationReason: personalizedReason,
    ageFitGuide: `${ageGroup} 남성은 무리한 슬림핏보다 '내 몸에 맞춘 여유(Drape)'를 허용할 때 가장 우아해 보입니다. 원턱 팬츠와 어깨 패드를 줄인 자켓이 품격 유지의 핵심입니다.`,
    stylingDos: selected.dos,
    stylingDonts: selected.donts,
    inputSnapshot: input,
  };
}
