import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, 
  Share2, 
  Leaf, 
  Coffee, 
  Utensils, 
  Info,
  X,
  Sparkles,
  HeartPulse,
  Volume2,
  Loader2,
  StopCircle,
  Globe,
  MapPin,
  Clock,
  Phone
} from 'lucide-react';

// --- TRANSLATIONS ---
const TRANSLATIONS = {
  en: {
    label: "English",
    appTitle: "ORGANIC",
    appSubtitle: "Foods Lanka",
    heroTitle: "Nature's Best,\nDigitally Curated.",
    heroSubtitle: "Explore our premium range of organic teas, spices, and dried fruits from the heart of Sri Lanka.",
    explore: "Explore Collection",
    description: "Description",
    benefits: "View Health Benefits",
    share: "Share Product",
    originTitle: "Pure Ceylon Origin",
    originText: "Sourced directly from our organic gardens in Sri Lanka. Certified free from pesticides and artificial additives.",
    aiLoading: "Consulting the organic database...",
    wellness: "Wellness Insights",
    close: "Close",
    selectLang: "Select Language",
    storeLocator: "Store Locator",
    visitUs: "Visit Our Store",
    directions: "Get Directions",
    storeAddress: "No.548/B Nawala Rd, Sri Jayawardenepura Kotte 10100",

    // Product Translations (English Keys)
    'herbal-teas_title': 'Herbal Teas',
    'herbal-teas_desc': 'Revitalizing blends for mind and body.',
    'ginger-tea_name': 'Ginger & Honey Blend',
    'ginger-tea_desc': 'A warming natural blend of ginger, lemon, and honey crafted to energize your body and boost immunity.',
    'strawberry-tea_name': 'Strawberry Essence Tea',
    'strawberry-tea_desc': 'Delightful pure Ceylon tea fused with ripe strawberry essence.',
    'slim-herb_name': 'Slim Herb Tea',
    'slim-herb_desc': 'Formulated for weight management and metabolic support.',
    'lemon-tea_name': 'Zesty Lemon Tea',
    'lemon-tea_desc': 'Refreshing citrus notes blended with premium tea leaves.',
    
    'organic-snacks_title': 'Dried Fruits & Snacks',
    'organic-snacks_desc': 'Nature’s candy, dehydrated to perfection.',
    'dehydrated-mango_name': 'Dehydrated Mango Slices',
    'dehydrated-mango_desc': '100% natural mango slices with no added sugar.',
    'banana-chips_name': 'Organic Banana Chips',
    'banana-chips_desc': 'Crispy, organic banana chips fried in virgin coconut oil.',
    'mixed-fruit_name': 'Tropical Mixed Fruit',
    'mixed-fruit_desc': 'A vibrant mix of dehydrated pineapple, papaya, and mango.',

    'coconut-products_title': 'Coconut Range',
    'coconut-products_desc': 'Pure goodness from the Sri Lankan coconut triangle.',
    'virgin-oil_name': 'Virgin Coconut Oil',
    'virgin-oil_desc': 'Cold-pressed, unrefined organic coconut oil.',
    'coconut-milk_name': 'Organic Coconut Milk',
    'coconut-milk_desc': 'Rich and creamy milk extracted from fresh organic coconuts.',

    'spices_title': 'Spices & Herbs',
    'spices_desc': 'Aromatic spices to elevate your culinary creations.',
    'cinnamon_name': 'Ceylon Cinnamon Sticks',
    'cinnamon_desc': 'True Ceylon Cinnamon (Alba grade). Sweet, aromatic, and packed with antioxidants.',
    'black-pepper_name': 'Organic Black Pepper',
    'black-pepper_desc': 'Whole black peppercorns sun-dried to retain their bold, spicy heat.'
  },
  si: {
    label: "සිංහල",
    appTitle: "ORGANIC",
    appSubtitle: "Foods Lanka",
    heroTitle: " සොබාදහමේ අග්‍රගණ්‍ය,\nඩිජිටල්කරණය වූ.",
    heroSubtitle: "ශ්‍රී ලංකාවේ හදවතින්ම එන අපගේ වාරික කාබනික තේ, කුළුබඩු සහ වියළි පලතුරු පරාසය ගවේෂණය කරන්න.",
    explore: "එකතුව ගවේෂණය කරන්න",
    description: "විස්තරය",
    benefits: "සෞඛ්‍ය ප්‍රතිලාභ බලන්න",
    share: "බෙදාගන්න",
    originTitle: "ශ්‍රී ලංකාවේ නිෂ්පාදිතයි",
    originText: "අපගේ කාබනික වගාවන්ගෙන් සෘජුවම ලබාගෙන ඇත. කෘමිනාශක සහ කෘතිම එකතු කිරීම් වලින් තොර බවට සහතික කර ඇත.",
    aiLoading: "කාබනික දත්ත පද්ධතිය පරීක්ෂා කරමින්...",
    wellness: "සුවතා තොරතුරු",
    close: "වසන්න",
    selectLang: "භාෂාව තෝරන්න",
    storeLocator: "වෙළඳසැල් සොයන්නා",
    visitUs: "අපගේ වෙළඳසැලට පැමිණෙන්න",
    directions: "මාර්ගෝපදේශ ලබා ගන්න",
    storeAddress: "නො.548/B නාවල පාර, ශ්‍රී ජයවර්ධනපුර කෝට්ටේ 10100",

    // Product Translations (Sinhala)
    'herbal-teas_title': 'ඖෂධීය තේ',
    'herbal-teas_desc': 'කය සහ මනස පුබුදුවාලන මිශ්‍රණ.',
    'ginger-tea_name': 'ඉඟුරු සහ පැණි මිශ්‍රණය',
    'ginger-tea_desc': 'ශරීරය ප්‍රාණවත් කිරීමට සහ ප්‍රතිශක්තිය වැඩි කිරීමට සකස් කරන ලද ඉඟුරු, ලෙමන් සහ පැණි වල ස්වාභාවික මිශ්‍රණයකි.',
    'strawberry-tea_name': 'ස්ට්‍රෝබෙරි තේ',
    'strawberry-tea_desc': 'ඉදුණු ස්ට්‍රෝබෙරි සාරය සමඟ මුසු වූ පිරිසිදු ලංකා තේ.',
    'slim-herb_name': 'සිහින් හැඩය සඳහා තේ',
    'slim-herb_desc': 'බර පාලනය සහ පරිවෘත්තීය ක්‍රියාවලිය සඳහා සකස් කර ඇත.',
    'lemon-tea_name': 'දෙහි මිශ්‍ර තේ',
    'lemon-tea_desc': 'වාරික තේ දළු සමඟ මුසු වූ ප්‍රබෝධමත් දෙහි රසය.',
    
    'organic-snacks_title': 'වියළි පලතුරු සහ කෙටි කෑම',
    'organic-snacks_desc': 'ස්වාභාවික රසයෙන් පිරිපුන්, මනාව වියලන ලද පලතුරු.',
    'dehydrated-mango_name': 'වියලන ලද අඹ',
    'dehydrated-mango_desc': 'සීනි එකතු නොකළ 100% ස්වාභාවික අඹ පෙති.',
    'banana-chips_name': 'කාබනික කෙසෙල් චිප්ස්',
    'banana-chips_desc': 'පිරිසිදු පොල්තෙලෙන් බදින ලද, රසවත් කෙසෙල් පෙති.',
    'mixed-fruit_name': 'පලතුරු මිශ්‍රණය',
    'mixed-fruit_desc': 'වියලන ලද අන්නාසි, පැපොල් සහ අඹ වල රසවත් මිශ්‍රණයක්.',

    'coconut-products_title': 'පොල් ආශ්‍රිත නිෂ්පාදන',
    'coconut-products_desc': 'ලංකා පොල් ත්‍රිකෝණයෙන් එන පිරිසිදු ගුණ.',
    'virgin-oil_name': 'වර්ජින් පොල්තෙල්',
    'virgin-oil_desc': 'තාපය භාවිතා නොකර සිසිල්ව පෙරාගත් පිරිසිදු පොල්තෙල්.',
    'coconut-milk_name': 'කාබනික පොල් කිරි',
    'coconut-milk_desc': 'නැවුම් කාබනික පොල් වලින් ලබාගත් උකු පොල් කිරි.',

    'spices_title': 'කුළුබඩු වර්ග',
    'spices_desc': 'ඔබේ ආහාර රසවත් කිරීමට සුවඳැති කුළුබඩු.',
    'cinnamon_name': 'කුරුඳු පොලු',
    'cinnamon_desc': 'නියම ලංකා කුරුඳු. ප්‍රතිඔක්සිකාරක වලින් පොහොසත්.',
    'black-pepper_name': 'කාබනික ගම්මිරිස්',
    'black-pepper_desc': 'හිරු එළියෙන් වියලන ලද සම්පූර්ණ ගම්මිරිස් ඇට.'
  },
  ta: {
    label: "தமிழ்",
    appTitle: "ORGANIC",
    appSubtitle: "Foods Lanka",
    heroTitle: "இயற்கையின் சிறந்தது,\nஇலக்கமயமாக.",
    heroSubtitle: "இலங்கையின் இதயத்திலிருந்து எங்கள் பிரீமியம் ஆர்கானிக் தேநீர், மசாலா மற்றும் உலர்ந்த பழங்களை ஆராயுங்கள்.",
    explore: "சேகரிப்பை ஆராயுங்கள்",
    description: "விளக்கம்",
    benefits: "சுகாதார நன்மைகள்",
    share: "பகிரவும்",
    originTitle: "இலங்கை வம்சாவளி",
    originText: "இலங்கையில் உள்ள எங்கள் இயற்கை தோட்டங்களிலிருந்து நேரடியாகப் பெறப்பட்டது. பூச்சிக்கொல்லிகள் இல்லாதது.",
    aiLoading: "தரவுத்தளத்தை ஆய்வு செய்கிறது...",
    wellness: "ஆரோக்கிய குறிப்புகள்",
    close: "மூடு",
    selectLang: "மொழியைத் தேர்ந்தெடுக்கவும்",
    storeLocator: "கடை இருப்பிடம்",
    visitUs: "எங்கள் கடைக்குச் செல்லுங்கள்",
    directions: "திசைகளைப் பெறுங்கள்",
    storeAddress: "எண்.548/B நாவல வீதி, ஸ்ரீ ஜயவர்தனபுர கோட்டை 10100",

     // Product Translations (Tamil - Falling back to English structure for demo, update with real Tamil text as needed)
    'herbal-teas_title': 'மூலிகை தேநீர்',
    'herbal-teas_desc': 'மனதிற்கும் உடலுக்கும் புத்துணர்ச்சி அளிக்கும் கலவைகள்.',
    'ginger-tea_name': 'இஞ்சி & தேன் கலவை',
    'ginger-tea_desc': 'உங்கள் உடலை உற்சாகப்படுத்தவும் நோய் எதிர்ப்பு சக்தியை அதிகரிக்கவும் உருவாக்கப்பட்ட இஞ்சி, எலுமிச்சை மற்றும் தேன் ஆகியவற்றின் இயற்கையான கலவை.',
    // ... add more tamil translations here ...
  },
  es: {
    label: "Español",
    appTitle: "ORGANIC",
    appSubtitle: "Foods Lanka",
    heroTitle: "Lo Mejor de la Naturaleza,\nCurado Digitalmente.",
    heroSubtitle: "Explore nuestra gama premium de tés orgánicos, especias y frutas secas desde el corazón de Sri Lanka.",
    explore: "Explorar Colección",
    description: "Descripción",
    benefits: "Ver Beneficios para la Salud",
    share: "Compartir Producto",
    originTitle: "Origen Puro de Ceilán",
    originText: "Obtenido directamente de nuestros jardines orgánicos en Sri Lanka. Certificado libre de pesticidas y aditivos artificiales.",
    aiLoading: "Consultando la base de datos orgánica...",
    wellness: "Perspectivas de Bienestar",
    close: "Cerrar",
    selectLang: "Seleccionar Idioma",
    storeLocator: "Localizador de Tiendas",
    visitUs: "Visita Nuestra Tienda",
    directions: "Obtener Direcciones",
    storeAddress: "No.548/B Nawala Rd, Sri Jayawardenepura Kotte 10100"
  },
  fr: {
    label: "Français",
    appTitle: "ORGANIC",
    appSubtitle: "Foods Lanka",
    heroTitle: "Le Meilleur de la Nature,\nSélectionné Numériquement.",
    heroSubtitle: "Découvrez notre gamme premium de thés biologiques, d'épices et de fruits secs du cœur du Sri Lanka.",
    explore: "Explorer la Collection",
    description: "Description",
    benefits: "Voir les Bienfaits Santé",
    share: "Partager le Produit",
    originTitle: "Origine Pure Ceylan",
    originText: "Provenant directement de nos jardins biologiques au Sri Lanka. Certifié sans pesticides ni additifs artificiels.",
    aiLoading: "Consultation de la base de données biologique...",
    wellness: "Bien-être et Santé",
    close: "Fermer",
    selectLang: "Choisir la Langue",
    storeLocator: "Localisateur de Magasin",
    visitUs: "Visitez Notre Magasin",
    directions: "Obtenir l'Itinéraire",
    storeAddress: "No.548/B Nawala Rd, Sri Jayawardenepura Kotte 10100"
  },
  de: {
    label: "Deutsch",
    appTitle: "ORGANIC",
    appSubtitle: "Foods Lanka",
    heroTitle: "Das Beste der Natur,\nDigital Kuratiert.",
    heroSubtitle: "Entdecken Sie unser Premium-Sortiment an Bio-Tees, Gewürzen und Trockenfrüchten aus dem Herzen Sri Lankas.",
    explore: "Kollektion Entdecken",
    description: "Beschreibung",
    benefits: "Gesundheitsvorteile Anzeigen",
    share: "Produkt Teilen",
    originTitle: "Reiner Ceylon-Ursprung",
    originText: "Direkt aus unseren Bio-Gärten in Sri Lanka bezogen. Zertifiziert frei von Pestiziden und künstlichen Zusatzstoffen.",
    aiLoading: "Durchsuche die Bio-Datenbank...",
    wellness: "Wellness-Einblicke",
    close: "Schließen",
    selectLang: "Sprache Wählen",
    storeLocator: "Filialfinder",
    visitUs: "Besuchen Sie uns",
    directions: "Wegbeschreibung",
    storeAddress: "No.548/B Nawala Rd, Sri Jayawardenepura Kotte 10100"
  },
  zh: {
    label: "中文",
    appTitle: "ORGANIC",
    appSubtitle: "Foods Lanka",
    heroTitle: "大自然的恩赐，\n数字化呈现。",
    heroSubtitle: "探索来自斯里兰卡中心的优质有机茶、香料和干果系列。",
    explore: "探索系列",
    description: "描述",
    benefits: "查看健康益处",
    share: "分享产品",
    originTitle: "纯正锡兰原产",
    originText: "直接采购自我们在斯里兰卡的有机花园。认证无农药和人工添加剂。",
    aiLoading: "正在查询有机数据库...",
    wellness: "健康见解",
    close: "关闭",
    selectLang: "选择语言",
    storeLocator: "商店定位器",
    visitUs: "访问我们的商店",
    directions: "获取路线",
    storeAddress: "No.548/B Nawala Rd, Sri Jayawardenepura Kotte 10100"
  },
  ar: {
    label: "العربية",
    appTitle: "ORGANIC",
    appSubtitle: "Foods Lanka",
    heroTitle: "أفضل ما في الطبيعة،\nمنسقة رقمياً.",
    heroSubtitle: "استكشف مجموعتنا المتميزة من الشاي العضوي والتوابل والفواكه المجففة من قلب سريلانكا.",
    explore: "استكشاف المجموعة",
    description: "الوصف",
    benefits: "عرض الفوائد الصحية",
    share: "مشاركة المنتج",
    originTitle: "أصل سيلاني نقي",
    originText: "مصدرها مباشرة من حدائقنا العضوية في سريلانكا. معتمدة وخالية من المبيدات والإضافات الاصطناعية.",
    aiLoading: "جاري استشارة قاعدة البيانات العضوية...",
    wellness: "رؤى صحية",
    close: "إغلاق",
    selectLang: "اختر اللغة",
    storeLocator: "محدد موقع المتجر",
    visitUs: "قم بزيارة متجرنا",
    directions: "الحصول على الاتجاهات",
    storeAddress: "No.548/B Nawala Rd, Sri Jayawardenepura Kotte 10100"
  },
  ja: {
    label: "日本語",
    appTitle: "ORGANIC",
    appSubtitle: "Foods Lanka",
    heroTitle: "自然の恵みを、\nデジタルで厳選。",
    heroSubtitle: "スリランカの中心部からお届けする、プレミアムなオーガニックティー、スパイス、ドライフルーツをご覧ください。",
    explore: "コレクションを見る",
    description: "説明",
    benefits: "健康効果を見る",
    share: "製品をシェア",
    originTitle: "純粋なセイロン産",
    originText: "スリランカのオーガニック農園から直接調達。農薬や人工添加物不使用の認定済み。",
    aiLoading: "オーガニックデータベースを検索中...",
    wellness: "ウェルネス情報",
    close: "閉じる",
    selectLang: "言語を選択",
    storeLocator: "店舗検索",
    visitUs: "店舗へ行く",
    directions: "道順を表示",
    storeAddress: "No.548/B Nawala Rd, Sri Jayawardenepura Kotte 10100"
  }
};

const getLanguageName = (code) => TRANSLATIONS[code]?.label || "English";

// HELPER: Auto-translate product content
const getLocalizedContent = (item, lang) => {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  return {
    ...item,
    // Try to find a translation key like 'ginger-tea_name', otherwise fallback to original item.name
    title: t[`${item.id}_title`] || item.title,
    description: t[`${item.id}_desc`] || item.description,
    name: t[`${item.id}_name`] || item.name,
  };
};

// --- MOCK DATA ---
const CATALOG_DATA = [
  {
    id: 'herbal-teas',
    title: 'Herbal Teas',
    icon: <Coffee className="w-6 h-6" />,
    description: 'Revitalizing blends for mind and body.',
    theme: { blob1: 'bg-lime-500/20', blob2: 'bg-emerald-500/20' },
    products: [
      {
        id: 'ginger-tea',
        name: 'Ginger & Honey Blend',
        description: 'A warming natural blend of ginger, lemon, and honey crafted to energize your body and boost immunity. Perfect for a morning kickstart.',
        image: 'https://placehold.co/600x600/2a4c2a/fbbf24?text=Ginger+Tea',
        tags: ['Immunity', 'Energy']
      },
      {
        id: 'strawberry-tea',
        name: 'Strawberry Essence Tea',
        description: 'Delightful pure Ceylon tea fused with ripe strawberry essence. A sweet aroma that brightens your day naturally.',
        image: 'https://placehold.co/600x600/4c2a2a/fbbf24?text=Strawberry+Tea',
        tags: ['Fruity', 'Relaxing']
      },
      {
        id: 'slim-herb',
        name: 'Slim Herb Tea',
        description: 'Formulated for weight management and metabolic support. Contains Garcinia and natural herbs to support a healthy lifestyle.',
        image: 'https://placehold.co/600x600/2a4c2a/fbbf24?text=Slim+Herb+Tea',
        tags: ['Wellness', 'Metabolism']
      },
      {
        id: 'lemon-tea',
        name: 'Zesty Lemon Tea',
        description: 'Refreshing citrus notes blended with premium tea leaves. Excellent served hot or as a chilled iced tea.',
        image: 'https://placehold.co/600x600/4c4c2a/fbbf24?text=Lemon+Tea',
        tags: ['Citrus', 'Refresh']
      }
    ]
  },
  {
    id: 'organic-snacks',
    title: 'Dried Fruits & Snacks',
    icon: <Leaf className="w-6 h-6" />,
    description: 'Nature’s candy, dehydrated to perfection.',
    theme: { blob1: 'bg-orange-500/20', blob2: 'bg-yellow-500/20' },
    products: [
      {
        id: 'dehydrated-mango',
        name: 'Dehydrated Mango Slices',
        description: '100% natural mango slices with no added sugar. Chewy, sweet, and packed with tropical flavor.',
        image: 'https://placehold.co/600x600/5c3a1a/fbbf24?text=Mango+Slices',
        tags: ['No Sugar', 'Snack']
      },
      {
        id: 'banana-chips',
        name: 'Organic Banana Chips',
        description: 'Crispy, organic banana chips fried in virgin coconut oil. A guilt-free crunchy snack for any time of day.',
        image: 'https://placehold.co/600x600/5c3a1a/fbbf24?text=Banana+Chips',
        tags: ['Crunchy', 'Organic']
      },
      {
        id: 'mixed-fruit',
        name: 'Tropical Mixed Fruit',
        description: 'A vibrant mix of dehydrated pineapple, papaya, and mango. The perfect trail mix companion.',
        image: 'https://placehold.co/600x600/5c3a1a/fbbf24?text=Mixed+Fruit',
        tags: ['Mix', 'Tropical']
      }
    ]
  },
  {
    id: 'coconut-products',
    title: 'Coconut Range',
    icon: <Leaf className="w-6 h-6" />,
    description: 'Pure goodness from the Sri Lankan coconut triangle.',
    theme: { blob1: 'bg-cyan-500/20', blob2: 'bg-slate-200/10' },
    products: [
      {
        id: 'virgin-oil',
        name: 'Virgin Coconut Oil',
        description: 'Cold-pressed, unrefined organic coconut oil. Ideal for cooking, hair care, and skin moisturizing.',
        image: 'https://placehold.co/600x600/1a3a3a/fbbf24?text=Coconut+Oil',
        tags: ['Superfood', 'Beauty']
      },
      {
        id: 'coconut-milk',
        name: 'Organic Coconut Milk',
        description: 'Rich and creamy milk extracted from fresh organic coconuts. A staple for curries and smoothies.',
        image: 'https://placehold.co/600x600/1a3a3a/fbbf24?text=Coconut+Milk',
        tags: ['Cooking', 'Dairy-Free']
      }
    ]
  },
  {
    id: 'spices',
    title: 'Spices & Herbs',
    icon: <Utensils className="w-6 h-6" />,
    description: 'Aromatic spices to elevate your culinary creations.',
    theme: { blob1: 'bg-red-600/20', blob2: 'bg-amber-600/20' },
    products: [
      {
        id: 'cinnamon',
        name: 'Ceylon Cinnamon Sticks',
        description: 'True Ceylon Cinnamon (Alba grade). Sweet, aromatic, and packed with antioxidants. Distinct from Cassia.',
        image: 'https://placehold.co/600x600/3a1a1a/fbbf24?text=Cinnamon',
        tags: ['Premium', 'Spice']
      },
      {
        id: 'black-pepper',
        name: 'Organic Black Pepper',
        description: 'Whole black peppercorns sun-dried to retain their bold, spicy heat.',
        image: 'https://placehold.co/600x600/1a1a1a/fbbf24?text=Pepper',
        tags: ['Hot', 'Spice']
      }
    ]
  }
];

// --- GEMINI API UTILITIES ---

const apiKey = ""; // Runtime environment provides key

async function callGeminiText(prompt) {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        })
      }
    );
    if (!response.ok) throw new Error('Gemini API Error');
    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "I couldn't generate that right now.";
  } catch (error) {
    console.error(error);
    return "Sorry, I'm having trouble connecting to the AI wellness expert right now.";
  }
}

async function callGeminiTTS(text) {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: text }] }],
          generationConfig: {
            responseModalities: ["AUDIO"],
            speechConfig: {
              voiceConfig: { prebuiltVoiceConfig: { voiceName: "Kore" } }
            }
          }
        })
      }
    );

    if (!response.ok) throw new Error('TTS API Error');
    const data = await response.json();
    const inlineData = data.candidates?.[0]?.content?.parts?.[0]?.inlineData;
    
    if (inlineData) {
      // Decode Base64 to PCM
      const binaryString = atob(inlineData.data);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const pcmData = new Int16Array(bytes.buffer);
      
      // Convert PCM to WAV (Standard 24kHz for Gemini usually)
      const wavBytes = pcmToWav(pcmData, 24000);
      const blob = new Blob([wavBytes], { type: 'audio/wav' });
      return URL.createObjectURL(blob);
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Helper to convert raw PCM16 to WAV format for browser playback
function pcmToWav(pcmData, sampleRate) {
  const numChannels = 1;
  const byteRate = sampleRate * numChannels * 2;
  const blockAlign = numChannels * 2;
  const dataSize = pcmData.length * 2;
  const buffer = new ArrayBuffer(44 + dataSize);
  const view = new DataView(buffer);

  // RIFF chunk descriptor
  writeString(view, 0, 'RIFF');
  view.setUint32(4, 36 + dataSize, true);
  writeString(view, 8, 'WAVE');
  // fmt sub-chunk
  writeString(view, 12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true); // PCM format
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, 16, true); // Bits per sample
  // data sub-chunk
  writeString(view, 36, 'data');
  view.setUint32(40, dataSize, true);

  // Write PCM data
  const offset = 44;
  for (let i = 0; i < pcmData.length; i++) {
    view.setInt16(offset + i * 2, pcmData[i], true);
  }
  return buffer;
}

function writeString(view, offset, string) {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}

// --- NEW COMPONENT: TILT CARD ---
// Handles 3D tilt effects on mouse move and simple touch feedback

const TiltCard = ({ children, onClick, className = "" }) => {
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation (max 15 degrees)
    const rotateY = ((x - centerX) / centerX) * 10; 
    const rotateX = ((centerY - y) / centerY) * 10;

    setRotation({ x: rotateX, y: rotateY });
    setGlare({ x: (x / rect.width) * 100, y: (y / rect.height) * 100, opacity: 1 });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setGlare(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <div 
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative transform-gpu transition-all duration-200 ease-out ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1, 1, 1)`,
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Glare/Shimmer Effect */}
      <div 
        className="absolute inset-0 pointer-events-none z-20 rounded-3xl mix-blend-overlay transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 80%)`,
          opacity: glare.opacity
        }}
      />
      {children}
    </div>
  );
};

// --- COMPONENTS ---

const Branding = ({ lang, setLang, onViewChange }) => {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const [showLangMenu, setShowLangMenu] = useState(false);

  return (
    <div className="flex items-center justify-between mb-8 relative z-50">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => onViewChange('home')}>
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
          <Leaf className="text-white w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight leading-none">{t.appTitle}</h1>
          <p className="text-xs text-amber-400 font-medium tracking-widest uppercase">{t.appSubtitle}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Store Locator Button */}
        <button 
          onClick={() => onViewChange('store-locator')}
          className="bg-white/10 hover:bg-white/20 backdrop-blur-md p-2 rounded-full text-emerald-100 transition-all border border-white/5"
          title={t.storeLocator}
        >
          <MapPin className="w-4 h-4" />
        </button>

        {/* Language Toggle */}
        <div className="relative">
          <button 
            onClick={() => setShowLangMenu(!showLangMenu)}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md px-3 py-2 rounded-full text-xs font-bold text-emerald-100 transition-all border border-white/5"
          >
            <Globe className="w-4 h-4" />
            <span className="uppercase">{lang}</span>
          </button>

          {showLangMenu && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-[#0f1710] border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-fadeIn h-64 overflow-y-auto custom-scrollbar">
              {Object.keys(TRANSLATIONS).map((code) => (
                <button
                  key={code}
                  onClick={() => { setLang(code); setShowLangMenu(false); }}
                  className={`w-full text-left px-4 py-3 text-sm hover:bg-white/10 transition-colors border-b border-white/5 last:border-0 ${lang === code ? 'text-amber-400 font-bold' : 'text-white/60'}`}
                >
                  {TRANSLATIONS[code].label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CategoryCard = ({ category, onClick, lang }) => {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const localCat = getLocalizedContent(category, lang);

  return (
    <TiltCard 
      onClick={() => onClick(category)}
      className="group w-full cursor-pointer"
    >
      <div className="relative w-full text-left overflow-hidden rounded-3xl bg-white/5 border border-white/10 hover:border-amber-500/50 transition-colors duration-500 shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="p-6 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-900/50 to-emerald-800/50 border border-white/5 flex items-center justify-center mb-4 text-emerald-400 group-hover:text-amber-400 group-hover:scale-110 transition-all duration-500">
            {category.icon}
          </div>
          <h3 className="text-2xl font-bold text-white mb-2 translate-z-10 group-hover:translate-x-1 transition-transform">{localCat.title}</h3>
          <p className="text-emerald-200/60 text-sm leading-relaxed">{localCat.description}</p>
          
          <div className="mt-6 flex items-center text-amber-400 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
            <span>{t.explore}</span>
            <ChevronLeft className="w-4 h-4 rotate-180 ml-1" />
          </div>
        </div>
      </div>
    </TiltCard>
  );
};

const ProductCard = ({ product, onClick, lang }) => {
  const localProd = getLocalizedContent(product, lang);
  
  return (
    <TiltCard 
      onClick={() => onClick(product)}
      className="group w-full cursor-pointer"
    >
      <div className="w-full text-left bg-white/5 rounded-2xl border border-white/10 overflow-hidden hover:border-amber-500/30 transition-colors duration-300">
        <div className="aspect-[4/3] overflow-hidden relative">
          <img 
            src={product.image} 
            alt={localProd.name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
          />
          <div className="absolute top-3 left-3 flex gap-2">
            {product.tags.map(tag => (
              <span key={tag} className="px-2 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] uppercase tracking-wider text-amber-400 font-bold border border-white/10">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-bold text-white mb-1 group-hover:text-amber-400 transition-colors">{localProd.name}</h3>
          <p className="text-xs text-white/50 line-clamp-2">{localProd.description}</p>
        </div>
      </div>
    </TiltCard>
  );
};

const AIOutput = ({ type, content, loading, onClose, lang }) => {
  if (!type) return null;
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  return (
    <div className="mt-6 animate-fadeIn">
      <div className="rounded-2xl bg-gradient-to-br from-emerald-900/40 to-black border border-amber-500/30 overflow-hidden shadow-2xl">
        <div className="p-4 bg-white/5 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-amber-400 font-bold">
            <Sparkles className="w-4 h-4" />
            <span>{t.wellness}</span>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/10 rounded-full transition-colors">
            <X className="w-5 h-5 text-white/50" />
          </button>
        </div>
        <div className="p-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-8 gap-3">
              <Loader2 className="w-8 h-8 text-amber-400 animate-spin" />
              <p className="text-sm text-emerald-200/60 animate-pulse">{t.aiLoading}</p>
            </div>
          ) : (
            <div className="prose prose-invert prose-sm max-w-none">
              <div className="whitespace-pre-line text-emerald-100/90 leading-relaxed font-light">
                {content}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ShareToast = ({ show, lang }) => {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  return (
    <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 bg-amber-500 text-black px-6 py-3 rounded-full font-bold shadow-2xl shadow-amber-500/20 transform transition-all duration-300 z-50 flex items-center gap-2 ${show ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
      <Share2 className="w-4 h-4" />
      <span>Link Copied!</span>
    </div>
  );
};

// --- MAIN APP COMPONENT ---

const App = () => {
  // Initialize view to 'language-select' for first-time onboarding
  const [view, setView] = useState('language-select'); 
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeProduct, setActiveProduct] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [lang, setLang] = useState('en');
  
  // Theme State
  const [theme, setTheme] = useState({ blob1: 'bg-emerald-500/10', blob2: 'bg-amber-500/5' });

  // AI State
  const [aiMode, setAiMode] = useState(null); 
  const [aiLoading, setAiLoading] = useState(false);
  const [aiContent, setAiContent] = useState('');
  
  // Audio State
  const [audioUrl, setAudioUrl] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    setIsLoaded(true);
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    setAiMode(null);
    setAiContent('');
    setAudioUrl(null);
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }
  }, [activeProduct]);

  const handleLanguageSelect = (selectedCode) => {
    setLang(selectedCode);
    setView('home');
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    // Apply dynamic theme if it exists in data
    if (category.theme) {
      setTheme(category.theme);
    }
    setView('category');
    window.scrollTo(0, 0);
  };

  const handleProductClick = (product) => {
    setActiveProduct(product);
    setView('product');
    window.scrollTo(0, 0);
  };

  const goBack = () => {
    if (view === 'product') {
      setView('category');
    } else {
      // Revert to default theme when going home
      setTheme({ blob1: 'bg-emerald-500/10', blob2: 'bg-amber-500/5' });
      setView('home');
      setActiveCategory(null);
    }
  };

  // Explicit handler for view changes (for Store Locator nav)
  const handleViewChange = (newView) => {
    if (newView === 'home') {
       setTheme({ blob1: 'bg-emerald-500/10', blob2: 'bg-amber-500/5' });
       setActiveCategory(null);
    }
    setView(newView);
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Organic Foods Lanka',
      text: activeProduct ? `Check out this ${activeProduct.name}` : 'Check out our organic catalog!',
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2000);
      }
    } catch (err) {
      console.log('Share failed', err);
    }
  };

  // --- AI HANDLERS ---

  const handleGenerateBenefits = async () => {
    if (aiMode === 'benefits' && aiContent) return;
    setAiMode('benefits');
    setAiLoading(true);
    
    // Dynamically identify target language for prompt
    const targetLanguage = TRANSLATIONS[lang]?.label || "English";
    
    const prompt = `You are a holistic nutritionist. Explain the key health benefits of '${activeProduct.name}' (Organic). Focus on traditional and scientific wellness properties. Respond in ${targetLanguage}. Use markdown. Keep it friendly and concise.`;
    const text = await callGeminiText(prompt);
    setAiContent(text);
    setAiLoading(false);
  };

  const handleTTS = async () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    if (audioUrl) {
      audioRef.current = new Audio(audioUrl);
      audioRef.current.play();
      setIsPlaying(true);
      audioRef.current.onended = () => setIsPlaying(false);
      return;
    }

    setAiLoading(true); 
    const textToSay = `Introducing ${activeProduct.name}. ${activeProduct.description}`;
    const url = await callGeminiTTS(textToSay);
    
    setAiLoading(false);
    
    if (url) {
      setAudioUrl(url);
      audioRef.current = new Audio(url);
      audioRef.current.play();
      setIsPlaying(true);
      audioRef.current.onended = () => setIsPlaying(false);
    }
  };

  // --- RENDER VIEWS ---

  const renderLanguageSelect = () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4 animate-fadeIn">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20 mb-8 animate-bounce">
          <Leaf className="text-white w-8 h-8" />
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-2 text-center">Welcome</h1>
        <p className="text-emerald-100/60 mb-10 text-center max-w-sm">
          Please select your preferred language to begin your organic journey.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-lg">
          {Object.keys(TRANSLATIONS).map((code) => (
            <button
              key={code}
              onClick={() => handleLanguageSelect(code)}
              className="group relative overflow-hidden rounded-xl bg-white/5 border border-white/10 hover:border-amber-500/50 hover:bg-white/10 transition-all duration-300 p-4 text-center"
            >
              <div className="flex flex-col items-center gap-2 relative z-10">
                <span className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                  {TRANSLATIONS[code].label}
                </span>
                <span className="text-xs text-white/40 uppercase tracking-widest">{code}</span>
              </div>
              
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderHome = () => {
    const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
    return (
      <div className="space-y-4 animate-fadeIn">
        <div className="mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50 mb-4 whitespace-pre-line">
            {t.heroTitle}
          </h2>
          <p className="text-emerald-100/60 max-w-md text-lg">
            {t.heroSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CATALOG_DATA.map((cat) => (
            <CategoryCard key={cat.id} category={cat} onClick={handleCategoryClick} lang={lang} />
          ))}
        </div>
      </div>
    );
  };

  const renderCategory = () => {
    const localCat = getLocalizedContent(activeCategory, lang);
    return (
      <div className="animate-slideUp">
        <div className="flex items-center justify-between mb-8 sticky top-0 bg-[#0f1710]/80 backdrop-blur-xl py-4 z-20 border-b border-white/5">
          <button onClick={goBack} className="p-2 -ml-2 rounded-full hover:bg-white/10 text-white transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h2 className="text-xl font-bold text-white">{localCat.title}</h2>
          <div className="w-10" /> 
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {activeCategory.products.map((product) => (
            <ProductCard key={product.id} product={product} onClick={handleProductClick} lang={lang} />
          ))}
        </div>
        
        <div className="mt-12 p-8 rounded-3xl bg-emerald-900/10 border border-emerald-500/10 text-center">
          <Leaf className="w-8 h-8 text-emerald-500 mx-auto mb-3 opacity-50" />
          <p className="text-emerald-200/40 text-sm">100% Organic Certified • Sustainably Sourced</p>
        </div>
      </div>
    );
  };

  const renderProduct = () => {
    const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
    const localProduct = getLocalizedContent(activeProduct, lang);

    return (
      <div className="animate-fadeIn relative min-h-screen pb-32">
        {/* Floating Back Button */}
        <button 
          onClick={goBack} 
          className="fixed top-6 left-6 z-30 w-12 h-12 rounded-full bg-black/20 backdrop-blur-lg border border-white/10 flex items-center justify-center text-white hover:bg-black/40 transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Hero Image */}
        <div className="relative w-full aspect-[4/5] md:aspect-video rounded-b-[3rem] overflow-hidden shadow-2xl">
          <img 
            src={activeProduct.image} 
            alt={localProduct.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f1710] via-transparent to-transparent opacity-90" />
          
          <div className="absolute bottom-0 left-0 w-full p-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {activeProduct.tags.map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full bg-amber-500 text-black text-xs font-bold uppercase tracking-wider shadow-lg shadow-amber-500/20">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 leading-tight">{localProduct.name}</h1>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 max-w-2xl mx-auto">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div className="prose prose-invert flex-1">
              <h3 className="text-amber-400 text-sm font-bold uppercase tracking-widest mb-4">{t.description}</h3>
              <p className="text-xl text-emerald-100/80 leading-relaxed font-light">
                {localProduct.description}
              </p>
            </div>
            <button 
              onClick={handleTTS}
              className={`flex-shrink-0 w-12 h-12 rounded-full border border-white/10 flex items-center justify-center transition-all ${isPlaying ? 'bg-amber-500 text-black animate-pulse' : 'bg-white/5 text-emerald-400 hover:bg-white/10'}`}
            >
              {isPlaying ? <StopCircle className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
          </div>

          {/* AI Action Buttons */}
          <div className="mb-8">
            <button 
              onClick={handleGenerateBenefits}
              className={`w-full p-4 rounded-xl border border-white/10 flex items-center justify-center gap-3 transition-all ${aiMode === 'benefits' ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'bg-white/5 hover:bg-white/10 text-white'}`}
            >
              <HeartPulse className="w-6 h-6" />
              <span className="text-sm font-bold tracking-wide">{t.benefits}</span>
            </button>
          </div>

          {/* AI Output Area */}
          <AIOutput 
            type={aiMode} 
            content={aiContent} 
            loading={aiLoading} 
            onClose={() => setAiMode(null)} 
            lang={lang}
          />

          <div className="mt-12 p-6 rounded-2xl bg-white/5 border border-white/5 flex items-start gap-4">
              <Info className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
              <div>
                  <h4 className="text-white font-bold text-sm mb-1">{t.originTitle}</h4>
                  <p className="text-white/40 text-xs">{t.originText}</p>
              </div>
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="fixed bottom-0 left-0 w-full p-6 bg-gradient-to-t from-[#0f1710] to-transparent z-30 flex justify-center">
          <button 
            onClick={handleShare}
            className="flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold shadow-[0_0_30px_-10px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95 transition-all"
          >
            <Share2 className="w-5 h-5" />
            <span>{t.share}</span>
          </button>
        </div>
      </div>
    );
  };

  const renderStoreLocator = () => {
    const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
    return (
      <div className="animate-slideUp min-h-screen">
        <div className="flex items-center justify-between mb-8 sticky top-0 bg-[#0f1710]/80 backdrop-blur-xl py-4 z-20 border-b border-white/5">
          <button onClick={() => handleViewChange('home')} className="p-2 -ml-2 rounded-full hover:bg-white/10 text-white transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h2 className="text-xl font-bold text-white">{t.storeLocator}</h2>
          <div className="w-10" /> 
        </div>

        <div className="space-y-6">
          {/* Map Card */}
          <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-white/5">
             <iframe 
               width="100%" 
               height="400" 
               frameBorder="0" 
               scrolling="no" 
               marginHeight="0" 
               marginWidth="0" 
               src="https://maps.google.com/maps?q=No.548%2FB%20Nawala%20Rd%2C%20Sri%20Jayawardenepura%20Kotte%2010100&t=&z=15&ie=UTF8&iwloc=&output=embed"
               className="w-full grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
             ></iframe>
             <div className="p-6">
               <div className="flex items-start gap-4 mb-4">
                 <div className="p-3 rounded-full bg-emerald-500/20 text-emerald-400">
                   <MapPin className="w-6 h-6" />
                 </div>
                 <div>
                   <h3 className="text-lg font-bold text-white mb-1">{t.visitUs}</h3>
                   <p className="text-white/60 text-sm leading-relaxed">{t.storeAddress}</p>
                 </div>
               </div>
               
               <a 
                 href="https://www.google.com/maps/search/?api=1&query=No.548/B+Nawala+Rd,+Sri+Jayawardenepura+Kotte+10100" 
                 target="_blank" 
                 rel="noreferrer"
                 className="w-full py-3 bg-amber-500 text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-amber-400 transition-colors"
               >
                 <MapPin className="w-4 h-4" />
                 {t.directions}
               </a>
             </div>
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 flex items-center gap-4">
              <Clock className="w-8 h-8 text-emerald-400" />
              <div>
                <h4 className="text-white font-bold">Opening Hours</h4>
                <p className="text-white/40 text-sm">Daily: 8:00 AM - 8:00 PM</p>
              </div>
            </div>
            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 flex items-center gap-4">
              <Phone className="w-8 h-8 text-amber-400" />
              <div>
                <h4 className="text-white font-bold">Contact Us</h4>
                <p className="text-white/40 text-sm">+94 11 234 5678</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (!isLoaded) return <div className="min-h-screen bg-[#0f1710]" />;

  return (
    <div className="min-h-screen bg-[#0f1710] text-white font-sans selection:bg-amber-500/30 transition-colors duration-1000">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&display=swap');
        body { font-family: 'Inter', sans-serif; }
        .animate-fadeIn { animation: fadeIn 0.6s ease-out forwards; }
        .animate-slideUp { animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <div className="max-w-4xl mx-auto min-h-screen relative overflow-hidden">
        {/* Dynamic Background Elements */}
        <div className={`fixed top-0 left-0 w-full h-[500px] blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/4 transition-all duration-1000 ${theme.blob1}`} />
        <div className={`fixed bottom-0 right-0 w-full h-[500px] blur-[100px] rounded-full pointer-events-none translate-y-1/2 transition-all duration-1000 ${theme.blob2}`} />

        <div className="relative z-10 p-6 md:p-8">
          {/* Header only shows after language selection */}
          {view !== 'language-select' && <Branding lang={lang} setLang={setLang} onViewChange={handleViewChange} />}
          
          <main>
            {view === 'language-select' && renderLanguageSelect()}
            {view === 'home' && renderHome()}
            {view === 'store-locator' && renderStoreLocator()}
            {view === 'category' && renderCategory()}
            {view === 'product' && renderProduct()}
          </main>
        </div>
      </div>

      <ShareToast show={showToast} lang={lang} />
    </div>
  );
};

export default App;