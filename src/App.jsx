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
  Phone,
  Carrot,
  Droplet,
  Sun
} from 'lucide-react';

// --- TRANSLATIONS ---
const TRANSLATIONS = {
  en: {
    label: "English",
    appTitle: "Everbolt",
    appSubtitle: "Food Products (Pvt) Ltd",
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

    // --- CATEGORY TITLES (English) ---
    'herbal-teas_title': 'Herbal Teas',
    'herbal-teas_desc': 'Revitalizing blends for mind and body.',
    'dried-fruits-snacks_title': 'Dried Fruits & Snacks',
    'dried-fruits-snacks_desc': 'Nature’s candy, dehydrated to perfection.',
    'dried-vegetables_title': 'Dried Vegetables',
    'dried-vegetables_desc': 'Preserved nutrition for your daily meals.',
    'dried-veg-powder_title': 'Dried Vegetable Powder',
    'dried-veg-powder_desc': 'Nutrient-dense powders for smoothies and cooking.',
    'spices_title': 'Spices & Herbs',
    'spices_desc': 'Aromatic spices to elevate your culinary creations.',

    // --- PRODUCT TRANSLATIONS (English) ---
    // Herbal Teas
    'ginger-tea_name': 'Ginger & Honey Blend',
    'ginger-tea_desc': 'A warming natural blend of ginger, lemon, and honey crafted to energize your body and boost immunity.',
    'strawberry-tea_name': 'Strawberry Essence Tea',
    'strawberry-tea_desc': 'Delightful pure Ceylon tea fused with ripe strawberry essence.',
    'slim-herb_name': 'Slim Herb Tea',
    'slim-herb_desc': 'Formulated for weight management and metabolic support.',
    'lemon-tea_name': 'Zesty Lemon Tea',
    'lemon-tea_desc': 'Refreshing citrus notes blended with premium tea leaves.',
    
    // Dried Fruits
    'dehydrated-mango_name': 'Dehydrated Mango Slices',
    'dehydrated-mango_desc': '100% natural mango slices with no added sugar.',
    'banana-chips_name': 'Organic Banana Chips',
    'banana-chips_desc': 'Crispy, organic banana chips fried in virgin coconut oil.',
    'mixed-fruit_name': 'Tropical Mixed Fruit',
    'mixed-fruit_desc': 'A vibrant mix of dehydrated pineapple, papaya, and mango.',

    // Spices
    'cinnamon_name': 'Ceylon Cinnamon Sticks',
    'cinnamon_desc': 'True Ceylon Cinnamon (Alba grade). Sweet, aromatic, and packed with antioxidants.',
    'black-pepper_name': 'Organic Black Pepper',
    'black-pepper_desc': 'Whole black peppercorns sun-dried to retain their bold, spicy heat.'
  },
  si: {
    label: "සිංහල",
    appTitle: "Everbolt",
    appSubtitle: "Food Products (Pvt) Ltd",
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

    // --- CATEGORY TITLES (Sinhala) ---
    'herbal-teas_title': 'ඖෂධීය තේ',
    'herbal-teas_desc': 'කය සහ මනස පුබුදුවාලන මිශ්‍රණ.',
    'dried-fruits-snacks_title': 'වියළි පලතුරු සහ කෙටි කෑම',
    'dried-fruits-snacks_desc': 'ස්වාභාවික රසයෙන් පිරිපුන්, මනාව වියලන ලද පලතුරු.',
    'dried-vegetables_title': 'වියළි එළවළු',
    'dried-vegetables_desc': 'දෛනික ආහාර වේල් සඳහා කල් තබා ගත් පෝෂණය.',
    'dried-veg-powder_title': 'වියළි එළවළු කුඩු',
    'dried-veg-powder_desc': 'සුප් සහ ආහාර පිසීම සඳහා පෝෂ්‍යදායී කුඩු.',
    'spices_title': 'කුළුබඩු වර්ග',
    'spices_desc': 'ඔබේ ආහාර රසවත් කිරීමට සුවඳැති කුළුබඩු.',

    // --- PRODUCT TRANSLATIONS (Sinhala) ---
    'ginger-tea_name': 'ඉඟුරු සහ පැණි මිශ්‍රණය',
    'ginger-tea_desc': 'ශරීරය ප්‍රාණවත් කිරීමට සහ ප්‍රතිශක්තිය වැඩි කිරීමට සකස් කරන ලද ඉඟුරු, ලෙමන් සහ පැණි වල ස්වාභාවික මිශ්‍රණයකි.',
    'strawberry-tea_name': 'ස්ට්‍රෝබෙරි තේ',
    'strawberry-tea_desc': 'ඉදුණු ස්ට්‍රෝබෙරි සාරය සමඟ මුසු වූ පිරිසිදු ලංකා තේ.',
    'slim-herb_name': 'සිහින් හැඩය සඳහා තේ',
    'slim-herb_desc': 'බර පාලනය සහ පරිවෘත්තීය ක්‍රියාවලිය සඳහා සකස් කර ඇත.',
    'lemon-tea_name': 'දෙහි මිශ්‍ර තේ',
    'lemon-tea_desc': 'වාරික තේ දළු සමඟ මුසු වූ ප්‍රබෝධමත් දෙහි රසය.',
    
    'dehydrated-mango_name': 'වියලන ලද අඹ',
    'dehydrated-mango_desc': 'සීනි එකතු නොකළ 100% ස්වාභාවික අඹ පෙති.',
    'banana-chips_name': 'කාබනික කෙසෙල් චිප්ස්',
    'banana-chips_desc': 'පිරිසිදු පොල්තෙලෙන් බදින ලද, රසවත් කෙසෙල් පෙති.',
    'mixed-fruit_name': 'පලතුරු මිශ්‍රණය',
    'mixed-fruit_desc': 'වියලන ලද අන්නාසි, පැපොල් සහ අඹ වල රසවත් මිශ්‍රණයක්.',

    'cinnamon_name': 'කුරුඳු පොලු',
    'cinnamon_desc': 'නියම ලංකා කුරුඳු. ප්‍රතිඔක්සිකාරක වලින් පොහොසත්.',
    'black-pepper_name': 'කාබනික ගම්මිරිස්',
    'black-pepper_desc': 'හිරු එළියෙන් වියලන ලද සම්පූර්ණ ගම්මිරිස් ඇට.'
  },
  ta: {
    label: "தமிழ்",
    appTitle: "Everbolt",
    appSubtitle: "Food Products (Pvt) Ltd",
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

    // --- CATEGORY TITLES (Tamil) ---
    'herbal-teas_title': 'மூலிகை தேநீர்',
    'herbal-teas_desc': 'மனதிற்கும் உடலுக்கும் புத்துணர்ச்சி அளிக்கும் கலவைகள்.',
    'dried-fruits-snacks_title': 'உலர்ந்த பழங்கள் & தின்பண்டங்கள்',
    'dried-fruits-snacks_desc': 'இயற்கையின் இனிப்பு.',
    'dried-vegetables_title': 'உலர்ந்த காய்கறிகள்',
    'dried-vegetables_desc': 'உங்கள் அன்றாட உணவிற்கான ஊட்டச்சத்து.',
    'dried-veg-powder_title': 'உலர்ந்த காய்கறி தூள்',
    'dried-veg-powder_desc': 'சமையலுக்கான சத்தான பொடிகள்.',
    'spices_title': 'மசாலா பொருட்கள்',
    'spices_desc': 'உங்கள் சமையல் படைப்புகளை உயர்த்துவதற்கான நறுமண மசாலா.',

     // Product Translations
    'ginger-tea_name': 'இஞ்சி & தேன் கலவை',
    'ginger-tea_desc': 'உங்கள் உடலை உற்சாகப்படுத்தவும் நோய் எதிர்ப்பு சக்தியை அதிகரிக்கவும் உருவாக்கப்பட்ட இஞ்சி, எலுமிச்சை மற்றும் தேன் ஆகியவற்றின் இயற்கையான கலவை.',
  },
  es: {
    label: "Español",
    appTitle: "Everbolt",
    appSubtitle: "Food Products (Pvt) Ltd",
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
    appTitle: "Everbolt",
    appSubtitle: "Food Products (Pvt) Ltd",
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
    appTitle: "Everbolt",
    appSubtitle: "Food Products (Pvt) Ltd",
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
    appTitle: "Everbolt",
    appSubtitle: "Food Products (Pvt) Ltd",
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
    appTitle: "Everbolt",
    appSubtitle: "Food Products (Pvt) Ltd",
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
    appTitle: "Everbolt",
    appSubtitle: "Food Products (Pvt) Ltd",
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
    title: t[`${item.id}_title`] || item.title,
    description: t[`${item.id}_desc`] || item.description,
    name: t[`${item.id}_name`] || item.name,
  };
};

// --- MOCK DATA ---
const CATALOG_DATA = [
  {
    id: 'dried-vegetables',
    title: 'Dried Vegetables Range',
    icon: <Carrot className="w-6 h-6" />,
    description: 'Preserved nutrition for your daily meals.',
    theme: { blob1: 'bg-green-600/20', blob2: 'bg-emerald-700/20' },
    // Category Image Placeholder
    catImage: '/categories/dryveg.png',
    products: [
      { id: 'jackfruit', name: 'Dried Jackfruit', description: 'Available in 50g, 100g. Pure dehydrated jackfruit.', image: '/products/jackfruit.png', tags: ['50g', '100g'] },
      { id: 'breadfruit', name: 'Dried Breadfruit', description: 'Available in 50g, 100g. Authentic dehydrated breadfruit.', image: '/products/breadfruit.png', tags: ['50g', '100g'] },
      { id: 'bittergourd', name: 'Dried Bitter Gourd', description: 'Available in 50g, 100g. Sun-dried organic bitter gourd slices.', image: '/products/bittergourd.png', tags: ['50g', '100g'] },
      { id: 'curry-leaves-dry', name: 'Dried Curry Leaves', description: 'Available in 50g, 100g. Aromatic dried leaves.', image: '/products/curry-leaves-dry.png', tags: ['50g', '100g'] },
      { id: 'leeks', name: 'Dried Leeks', description: 'Available in 50g, 100g. Dehydrated leeks for soups and garnishing.', image: '/products/leeks.png', tags: ['50g', '100g'] }
    ]
  },
  {
    id: 'dried-fruits',
    title: 'Dried Fruits Range',
    icon: <Sun className="w-6 h-6" />,
    description: 'Nature’s candy, dehydrated to perfection.',
    theme: { blob1: 'bg-orange-500/20', blob2: 'bg-yellow-500/20' },
    catImage: '/categories/dryfood.png',
    products: [
      { id: 'pineapple', name: 'Dried Pineapple', description: 'Available in 50g, 100g. Tropical sweetness in every bite.', image: '/products/pineapple.png', tags: ['50g', '100g'] },
      { id: 'papaya', name: 'Dried Papaya', description: 'Available in 50g, 100g. Naturally sweet dried papaya.', image: '/products/papaya.png', tags: ['50g', '100g'] },
      { id: 'banana', name: 'Dried Banana', description: 'Available in 50g, 100g. Chewy and rich in energy.', image: '/products/banana.png', tags: ['50g', '100g'] },
      { id: 'mango', name: 'Dried Mango', description: 'Available in 50g, 100g. The king of fruits, dehydrated.', image: '/products/mango.png', tags: ['50g', '100g'] }
    ]
  },
  {
    id: 'veg-powder',
    title: 'Vegetable Powder Range',
    icon: <Sparkles className="w-6 h-6" />,
    description: 'Nutrient-dense powders for smoothies and cooking.',
    theme: { blob1: 'bg-pink-600/20', blob2: 'bg-rose-500/20' },
    catImage: '/categories/currypowder.png',
    products: [
      { id: 'beetroot-p', name: 'Beetroot Powder', description: 'Available in 100g, 200g. Natural color and nutrition.', image: '/products/beetroot-p.png', tags: ['100g', '200g'] },
      { id: 'carrot-p', name: 'Carrot Powder', description: 'Available in 100g, 200g. Rich in Vitamin A.', image: '/products/carrot-p.png', tags: ['100g', '200g'] },
      { id: 'moringa-p', name: 'Moringa Powder', description: 'Available in 100g, 200g. The ultimate superfood powder.', image: '/products/moringa-p.png', tags: ['100g', '200g'] },
      { id: 'curry-p', name: 'Curry Leaves Powder', description: 'Available in 100g, 200g. Concentrated aroma and flavor.', image: '/products/curry-p.png', tags: ['100g', '200g'] },
      { id: 'tomato-p', name: 'Tomato Powder', description: 'Available in 100g, 200g. Tangy and versatile.', image: '/products/tomato-p.png', tags: ['100g', '200g'] },
      { id: 'pumpkin-p', name: 'Pumpkin Powder', description: 'Available in 100g, 200g. Sweet and nutritious.', image: '/products/pumpkin-p.png', tags: ['100g', '200g'] }
    ]
  },
  {
    id: 'spices-range',
    title: 'Spices Range',
    icon: <Utensils className="w-6 h-6" />,
    description: 'Aromatic spices in bulk packs.',
    theme: { blob1: 'bg-red-700/20', blob2: 'bg-orange-800/20' },
    catImage: '/categories/packets.jpg',
    products: [
      { id: 'fenugreek', name: 'Fenugreek', description: '100g, 200g. Elevate your dishes with the natural goodness of our high-quality Fenugreek, offering the authentic, preservative-free flavor of premium Sri Lankan quality.', image: '/products/fenugreek.jpg', tags: ['100g', '200g'] },
      { id: 'cumin', name: 'Cumin Seeds', description: '100g, 200g. Experience the natural purity of our Cumin Seeds, delivering the genuine, preservative-free taste of authentic Sri Lankan cuisine.', image: '/products/cumin.jpg', tags: ['100g', '200g'] },
      { id: 'mustard', name: 'Mustard Seeds', description: '100g, 200g. Experience the sharp, natural pungency of our preservative-free Mustard Seeds, essential for the authentic taste of traditional Sri Lankan tempering.', image: '/products/mustard.jpg', tags: ['100g', '200g'] },
      { id: 'turmeric', name: 'Turmeric Powder', description: '100g, 200g, 500g. Experience the golden standard of purity with our natural Turmeric Powder, essential for healthy and authentic Sri Lankan cooking.', image: '/products/turmeric.jpg', tags: ['Bulk'] },
      { id: 'chili-p', name: 'Chili Powder', description: '100g, 200g, 500g, 1kg. Experience the standard of pure Sri Lankan flavor with our natural Chili Powder, delivering consistent heat and vibrant color without preservatives.', image: '/products/chili-p.jpg', tags: ['Bulk'] },
      { id: 'chili-f', name: 'Chili Flakes', description: '100g, 200g, 500g, 1kg. Experience the bold crunch of our natural Chili Flakes, delivering the authentic heat and vibrant color of premium Sri Lankan quality.', image: '/products/chili-f.jpg', tags: ['Bulk'] },
      { id: 'pepper-p', name: 'Black Pepper Powder', description: '100g, 200g, 500g, 1kg. Experience the strength of real spice with our premium Black Pepper, delivering bold heat and rich Sri Lankan flavor with no added colors or preservatives.', image: '/products/pepper-p.jpg', tags: ['Bulk'] },
      { id: 'curry-pwdr', name: 'Curry Powder', description: '100g, 200g, 500g, 1kg. Experience the taste of tradition with our Curry Powder, expertly blended to deliver the authentic flavor, color, and aroma of Sri Lankan cuisine without added preservatives.', image: '/products/curry-pwdr.jpg', tags: ['Bulk'] },
      { id: 'roasted-curry', name: 'Roasted Curry Powder', description: '100g, 200g, 500g, 1kg. Experience the taste of tradition with our Curry Powder, expertly blended to deliver the authentic flavor, color, and aroma of Sri Lankan cuisine without added preservatives.', image: '/products/roasted-curry.jpg', tags: ['Bulk'] },
      { id: 'cinnamon-p', name: 'Cinnamon Powder', description: '100g, 200g, 500g, 1kg. xperience the warmth of Sri Lankan heritage with our finely ground Cinnamon Powder, offering a naturally sweet aroma and smooth flavor with no added colors or preservatives.', image: '/products/cinnamon-p.jpg', tags: ['Bulk'] },
      { id: 'pepper-corns', name: 'Black Pepper Corns', description: '50g, 100g, 200g, 500g, 1kg. Experience the strength of real spice with our premium Black Pepper, delivering bold heat and rich Sri Lankan flavor with no added colors or preservatives.', image: '/products/pepper-corns.jpg', tags: ['Bulk'] },
      { id: 'pepper-cracked', name: 'Black Pepper Cracked', description: '100g, 200g, 500g, 1kg.Experience the strength of real spice with our premium Black Pepper, delivering bold heat and rich Sri Lankan flavor with no added colors or preservatives.', image: '/products/pepper-cracked.jpg', tags: ['Bulk'] }
    ]
  },
  {
    id: 'spices-glass',
    title: 'Spices (Glass Bottle)',
    icon: <Droplet className="w-6 h-6" />,
    description: 'Premium spices in elegant glass packaging.',
    theme: { blob1: 'bg-amber-600/20', blob2: 'bg-yellow-600/20' },
    catImage: '/categories/glassbottles.jpg',
    products: [
      { id: 'cardamom-pods', name: 'Cardamom Pods', description: '30g Bottle.', image: '/products/cardamom-pods.jpg', tags: ['30g'] },
      { id: 'cardamom-seeds', name: 'Cardamom Seeds', description: '45g Bottle.', image: '/products/cardamom-seeds.jpg', tags: ['45g'] },
      { id: 'cinnamon-flakes', name: 'Cinnamon Flakes', description: '30g Bottle.', image: '/products/cinnamon-flakes.jpg', tags: ['30g'] },
      { id: 'citrus-p', name: 'Citrus Powder', description: '35g Bottle.', image: '/products/citrus-p.jpg', tags: ['35g'] },
      { id: 'clove-p', name: 'Clove Powder', description: '35g Bottle.', image: '/products/clove-p.jpg', tags: ['35g'] },
      { id: 'coriander-p', name: 'Coriander Powder', description: '35g Bottle.', image: '/products/coriander-p.jpg', tags: ['35g'] },
      { id: 'cumin-s', name: 'Cumin Seeds', description: '50g Bottle.', image: '/products/cumin-s.jpg', tags: ['50g'] },
      { id: 'curry-p-glass', name: 'Curry Powder', description: '40g Bottle.', image: '/products/curry-p-glass.jpg', tags: ['40g'] },
      { id: 'fennel-p', name: 'Fennel Powder', description: '40g Bottle.', image: '/products/fennel-p.jpg', tags: ['40g'] },
      { id: 'fennel-s', name: 'Fennel Seeds', description: '45g Bottle.', image: '/products/fennel-s.jpg', tags: ['45g'] },
      { id: 'fenugreek-s', name: 'Fenugreek Seeds', description: '80g Bottle.', image: '/products/fenugreek-s.jpg', tags: ['80g'] },
      { id: 'garlic-p', name: 'Garlic Powder', description: '50g Bottle.', image: '/products/garlic-p.jpg', tags: ['50g'] },
      { id: 'garlic-s', name: 'Garlic Slices', description: '30g Bottle.', image: '/products/garlic-s.jpg', tags: ['30g'] },
      { id: 'gotukola', name: 'Gotukola Flakes', description: '10g Bottle.', image: '/products/gotukola.jpg', tags: ['10g'] },
      { id: 'mace-ground', name: 'Ground Mace', description: '35g Bottle.', image: '/products/mace-ground.jpg', tags: ['35g'] },
      { id: 'lemongrass', name: 'Lemon Grass Flakes', description: '35g Bottle.', image: '/products/lemongrass.jpg', tags: ['35g'] },
      { id: 'mint', name: 'Mint Flakes', description: '5g Bottle.', image: '/products/mint.jpg', tags: ['5g'] },
      { id: 'moringa-leaf', name: 'Moringa Leaf Powder', description: '24g Bottle.', image: '/products/moringa-leaf.jpg', tags: ['24g'] },
      { id: 'mustard-s', name: 'Mustard Seeds', description: '70g Bottle.', image: '/products/mustard-s.jpg', tags: ['70g'] },
      { id: 'nutmeg', name: 'Nutmeg Grated', description: '30g Bottle.', image: '/products/nutmeg.jpg', tags: ['30g'] },
      { id: 'roasted-curry-g', name: 'Roasted Curry Powder', description: '50g Bottle.', image: '/products/roasted-curry-g.jpg', tags: ['50g'] },
      { id: 'sesame', name: 'Sesame Seeds', description: '60g Bottle.', image: '/products/sesame.jpg', tags: ['60g'] },
      { id: 'turmeric-g', name: 'Turmeric Powder', description: '50g Bottle.', image: '/products/turmeric-g.jpg', tags: ['50g'] },
      { id: 'uva-bw', name: 'Uva Black & White Peppercorns', description: '50g Bottle.', image: '/products/uva-bw.jpg', tags: ['50g'] },
      { id: 'uva-w', name: 'Uva White Peppercorns', description: '60g Bottle.', image: '/products/uva-w.jpg', tags: ['60g'] },
      { id: 'mace-whole', name: 'Whole Mace', description: '10g Bottle.', image: '/products/mace-whole.jpg', tags: ['10g'] },
      { id: 'chili-g', name: 'Chili Powder', description: '40g Bottle.', image: '/products/chili-g.jpg', tags: ['40g'] }
    ]
  },
  {
    id: 'premium-tea',
    title: 'Premium Tea Collection',
    icon: <Coffee className="w-6 h-6" />,
    description: 'Exquisite teas for the connoisseur.',
    theme: { blob1: 'bg-purple-600/20', blob2: 'bg-indigo-500/20' },
    catImage: '/categories/premium-tea.jpg',
    products: [
      { id: 'chai', name: 'Chai Tea', description: '250g Pack. Aromatic spiced tea blend.', image: '/products/chai.jpg', tags: ['250g'] },
      { id: 'flower-tea', name: 'Flower Tea', description: '250g Pack. Delicate floral notes.', image: '/products/flower-tea.jpg', tags: ['250g'] },
      { id: 'fruit-tea', name: 'Fruit Tea', description: '250g Pack. Infused with natural dried fruits.', image: '/products/fruit-tea.jpg', tags: ['250g'] },
      { id: 'green-tea', name: 'Green Tea', description: '250g Pack. Rich in antioxidants.', image: '/products/green-tea.jpg', tags: ['250g'] },
      { id: 'mango-tea', name: 'Mango Tea', description: '250g Pack. Tropical mango infusion.', image: '/products/mango-tea.jpg', tags: ['250g'] },
      { id: 'purple-tea', name: 'Purple Tea', description: '250g Pack. Rare and exotic.', image: '/products/purple-tea.jpg', tags: ['250g'] },
      { id: 'silver-tips', name: 'Silver Tips', description: '50g Pack. The pinnacle of Ceylon tea.', image: '/products/silver-tips.jpg', tags: ['50g'] }
    ]
  },
  {
    id: 'herbal-tea',
    title: 'Herbal Tea Range',
    icon: <Leaf className="w-6 h-6" />,
    description: 'Traditional wellness brews.',
    theme: { blob1: 'bg-teal-600/20', blob2: 'bg-cyan-600/20' },
    catImage: '/categories/herbal-tea.jpg',
    products: [
      { id: 'bitter-tea', name: 'Bitter Gourd Tea', description: '25 Tea Bags. Supports blood sugar balance.', image: '/products/bitter-tea.jpg', tags: ['25 Bags'] },
      { id: 'hathawariya', name: 'Hathawariya Tea', description: '25 Tea Bags. Asparagus racemosus blend.', image: '/products/hathawariya.jpg', tags: ['25 Bags'] },
      { id: 'heen-bovitiya', name: 'Heen Bovitiya Tea', description: '25 Tea Bags. Osbeckia octandra for liver health.', image: '/products/heen-bovitiya.jpg', tags: ['25 Bags'] },
      { id: 'iramusu', name: 'Iramusu Tea', description: '25 Tea Bags. Sarsaparilla root cooling tea.', image: '/products/iramusu.jpg', tags: ['25 Bags'] },
      { id: 'polpala', name: 'Polpala Tea', description: '25 Tea Bags. Aerva lanata for kidney health.', image: '/products/polpala.jpg', tags: ['25 Bags'] },
      { id: 'thebu', name: 'Thebu Tea', description: '25 Tea Bags. Costus speciosus leaf tea.', image: '/products/thebu.jpg', tags: ['25 Bags'] }
    ]
  }
];

// --- GEMINI API UTILITIES ---

// 🔴 IMPORTANT: PASTE YOUR GOOGLE GEMINI API KEY BELOW 🔴
// Get one here: https://aistudio.google.com/app/apikey
const apiKey = "PASTE_YOUR_API_KEY_HERE"; 

async function callGeminiText(prompt) {
  if (!apiKey || apiKey === "PASTE_YOUR_API_KEY_HERE") {
    return "⚠️ API Key Missing. Please add your Gemini API Key in the code to enable AI features.";
  }

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
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => onViewChange('home')}>
        {/* Logo: Larger, no box, drop shadow */}
        <div className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0">
           <img src="/logo.png" alt="Logo" className="w-full h-full object-contain drop-shadow-2xl brightness-110" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-none drop-shadow-lg">{t.appTitle}</h1>
          <p className="text-[10px] md:text-xs text-red-400 font-bold tracking-[0.2em] uppercase drop-shadow-md mt-1">{t.appSubtitle}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Store Locator Button */}
        <button 
          onClick={() => onViewChange('store-locator')}
          className="bg-white/10 hover:bg-white/20 backdrop-blur-md p-3 rounded-full text-red-100 transition-all border border-white/5 active:scale-95"
          title={t.storeLocator}
        >
          <MapPin className="w-5 h-5" />
        </button>

        {/* Language Toggle */}
        <div className="relative">
          <button 
            onClick={() => setShowLangMenu(!showLangMenu)}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold text-red-100 transition-all border border-white/5 active:scale-95"
          >
            <Globe className="w-4 h-4" />
            <span className="uppercase">{lang}</span>
          </button>

          {showLangMenu && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-[#2a0a0a] border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-fadeIn h-64 overflow-y-auto custom-scrollbar z-50">
              {Object.keys(TRANSLATIONS).map((code) => (
                <button
                  key={code}
                  onClick={() => { setLang(code); setShowLangMenu(false); }}
                  className={`w-full text-left px-4 py-3 text-sm hover:bg-white/10 transition-colors border-b border-white/5 last:border-0 ${lang === code ? 'text-red-400 font-bold' : 'text-white/60'}`}
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
      <div className="relative w-full h-80 text-left overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl shadow-black/50">
        
        {/* Background Image - Zoomed */}
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src={category.catImage || `https://placehold.co/600x400/3f0e0e/red?text=${localCat.title}`} 
            alt={localCat.title} 
            className="w-full h-full object-cover scale-125 group-hover:scale-110 transition-transform duration-[1.5s] ease-in-out filter brightness-75 group-hover:brightness-90" 
          />
          {/* Stronger Gradient for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
        </div>
        
        {/* Content */}
        <div className="absolute inset-0 p-6 flex flex-col justify-end relative z-10">
          <div className="mb-auto">
             <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-lg">
              {category.icon}
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-black text-white mb-2 tracking-tight drop-shadow-lg leading-tight">{localCat.title}</h3>
            <p className="text-white/80 text-xs font-medium leading-relaxed line-clamp-2 mb-3 drop-shadow-md">
              {localCat.description}
            </p>
            
            <div className="flex items-center text-red-400 text-xs font-bold uppercase tracking-wider group-hover:text-red-300 transition-colors">
              <span>{t.explore}</span>
              <ChevronLeft className="w-4 h-4 rotate-180 ml-1" />
            </div>
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
      <div className="w-full text-left bg-white/5 rounded-2xl border border-white/10 overflow-hidden hover:border-red-500/30 transition-colors duration-300">
        <div className="aspect-[4/3] overflow-hidden relative">
          <img 
            src={product.image} 
            alt={localProd.name} 
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
          />
          <div className="absolute top-3 left-3 flex gap-1 flex-wrap max-w-[80%]">
            {product.tags.map(tag => (
              <span key={tag} className="px-2 py-1 rounded-md bg-black/60 backdrop-blur-md text-[9px] uppercase tracking-wider text-red-400 font-bold border border-white/10 shadow-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-base font-bold text-white mb-1 group-hover:text-red-400 transition-colors leading-tight">{localProd.name}</h3>
          <p className="text-[10px] text-white/50 line-clamp-2">{localProd.description}</p>
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
      <div className="rounded-2xl bg-gradient-to-br from-red-900/40 to-black border border-red-500/30 overflow-hidden shadow-2xl">
        <div className="p-4 bg-white/5 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-red-400 font-bold">
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
              <Loader2 className="w-8 h-8 text-red-400 animate-spin" />
              <p className="text-sm text-red-200/60 animate-pulse">{t.aiLoading}</p>
            </div>
          ) : (
            <div className="prose prose-invert prose-sm max-w-none">
              <div className="whitespace-pre-line text-red-100/90 leading-relaxed font-light">
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
    <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded-full font-bold shadow-2xl shadow-red-500/20 transform transition-all duration-300 z-50 flex items-center gap-2 ${show ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
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
  
  // Theme State - Default to Red/Rose theme
  const [theme, setTheme] = useState({ blob1: 'bg-red-500/10', blob2: 'bg-rose-500/5' });

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
    // Apply dynamic theme if it exists in data, otherwise default
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
      setTheme({ blob1: 'bg-red-500/10', blob2: 'bg-rose-500/5' });
      setView('home');
      setActiveCategory(null);
    }
  };

  // Explicit handler for view changes (for Store Locator nav)
  const handleViewChange = (newView) => {
    if (newView === 'home') {
       setTheme({ blob1: 'bg-red-500/10', blob2: 'bg-rose-500/5' });
       setActiveCategory(null);
    }
    setView(newView);
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Everbolt Foods',
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
        {/* Updated Logo using <img> tag */}
        <div className="w-32 h-32 flex-shrink-0 mb-8 animate-bounce">
           <img src="/logo.png" alt="Logo" className="w-full h-full object-contain drop-shadow-2xl brightness-110" />
        </div>
        
        <h1 className="text-4xl font-black text-white mb-2 text-center tracking-tight">Welcome</h1>
        <p className="text-red-200/60 mb-12 text-center max-w-sm text-sm font-medium">
          Select your preferred language to begin your organic journey.
        </p>

        <div className="grid grid-cols-2 gap-4 w-full max-w-md">
          {Object.keys(TRANSLATIONS).map((code) => (
            <button
              key={code}
              onClick={() => handleLanguageSelect(code)}
              className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-red-500/50 hover:bg-white/10 transition-all duration-300 p-6 text-center shadow-lg active:scale-95"
            >
              <div className="flex flex-col items-center gap-2 relative z-10">
                <span className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">
                  {TRANSLATIONS[code].label}
                </span>
                <span className="text-[10px] text-white/40 uppercase tracking-widest font-semibold">{code}</span>
              </div>
              
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
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
        <div className="mb-10 px-2">
          <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50 mb-4 whitespace-pre-line leading-tight">
            {t.heroTitle}
          </h2>
          <p className="text-red-100/60 max-w-md text-sm font-medium leading-relaxed">
            {t.heroSubtitle}
          </p>
        </div>

        <div className="flex flex-col gap-6 pb-20">
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
        <div className="flex items-center justify-between mb-8 sticky top-0 bg-[#2a0a0a]/80 backdrop-blur-xl py-4 z-20 border-b border-white/5">
          <button onClick={goBack} className="p-2 -ml-2 rounded-full hover:bg-white/10 text-white transition-colors active:scale-95">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h2 className="text-lg font-bold text-white tracking-wide">{localCat.title}</h2>
          <div className="w-10" /> 
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pb-20">
          {activeCategory.products.map((product) => (
            <ProductCard key={product.id} product={product} onClick={handleProductClick} lang={lang} />
          ))}
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
          className="fixed top-6 left-6 z-30 w-12 h-12 rounded-full bg-black/20 backdrop-blur-lg border border-white/10 flex items-center justify-center text-white hover:bg-black/40 transition-all active:scale-95"
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
          <div className="absolute inset-0 bg-gradient-to-t from-[#2a0a0a] via-transparent to-transparent opacity-90" />
          
          <div className="absolute bottom-0 left-0 w-full p-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {activeProduct.tags.map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full bg-red-600 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-red-500/20">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-2 leading-none">{localProduct.name}</h1>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 max-w-2xl mx-auto">
          <div className="flex flex-col gap-6 mb-8">
            <div className="prose prose-invert flex-1">
              <h3 className="text-red-400 text-xs font-bold uppercase tracking-widest mb-3">{t.description}</h3>
              <p className="text-lg text-red-100/80 leading-relaxed font-light">
                {localProduct.description}
              </p>
            </div>
            <button 
              onClick={handleTTS}
              className={`w-full py-4 rounded-xl border border-white/10 flex items-center justify-center gap-3 transition-all ${isPlaying ? 'bg-red-600 text-white animate-pulse' : 'bg-white/5 text-red-400 hover:bg-white/10'}`}
            >
              {isPlaying ? <StopCircle className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              <span className="font-bold text-sm">Listen to Description</span>
            </button>
          </div>

          {/* AI Action Buttons */}
          <div className="mb-8">
            <button 
              onClick={handleGenerateBenefits}
              className={`w-full p-5 rounded-2xl border border-white/10 flex items-center justify-center gap-3 transition-all active:scale-95 ${aiMode === 'benefits' ? 'bg-red-500/20 border-red-500 text-red-400' : 'bg-gradient-to-r from-red-900/40 to-black hover:bg-white/10 text-white'}`}
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
              <Info className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
              <div>
                  <h4 className="text-white font-bold text-sm mb-1">{t.originTitle}</h4>
                  <p className="text-white/40 text-xs leading-relaxed">{t.originText}</p>
              </div>
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="fixed bottom-0 left-0 w-full p-6 bg-gradient-to-t from-[#2a0a0a] via-[#2a0a0a] to-transparent z-30 flex justify-center">
          <button 
            onClick={handleShare}
            className="flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold shadow-[0_0_30px_-10px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95 transition-all w-full md:w-auto justify-center"
          >
            <Share2 className="w-5 h-5" />
            <span>{t.share}</span>
          </button>
        </div>
      </div>
    );
  };

  if (!isLoaded) return <div className="min-h-screen bg-[#2a0a0a]" />;

  return (
    <div className="min-h-screen bg-[#2a0a0a] text-white font-sans selection:bg-red-500/30 transition-colors duration-1000">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800;900&display=swap');
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