import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, 
  Share2, 
  Leaf, 
  Coffee, 
  Utensils, 
  Info,
  Globe,
  MapPin,
  Clock,
  Phone,
  Carrot,
  Droplet,
  Sun,
  Sparkles
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
    share: "Share Product",
    originTitle: "Pure Ceylon Origin",
    originText: "Sourced directly from our organic gardens in Sri Lanka. Certified free from pesticides and artificial additives.",
    close: "Close",
    selectLang: "Select Language",
    storeLocator: "Store Locator",
    visitUs: "Visit Our Store",
    directions: "Get Directions",
    storeAddress: "No.548/B Nawala Rd, Sri Jayawardenepura Kotte 10100",

    // --- CATEGORY TITLES (English) ---
    'herbal-teas_title': 'Herbal Teas',
    'herbal-teas_desc': 'Revitalizing blends for mind and body.',
    'dried-fruits_title': 'Dried Fruits Range',
    'dried-fruits_desc': 'Nature’s candy, dehydrated to perfection.',
    'dried-vegetables_title': 'Dried Vegetables Range',
    'dried-vegetables_desc': 'Preserved nutrition for your daily meals.',
    'veg-powder_title': 'Vegetable Powder Range',
    'veg-powder_desc': 'Nutrient-dense powders for smoothies and cooking.',
    'spices-range_title': 'Spices Range',
    'spices-range_desc': 'Aromatic spices in bulk packs.',
    'spices-glass_title': 'Spices (Glass Bottle)',
    'spices-glass_desc': 'Premium spices in elegant glass packaging.',
    'premium-tea_title': 'Premium Tea Collection',
    'premium-tea_desc': 'Exquisite teas for the connoisseur.',
    'artisan-tea_title': 'Artisan Tea Range',
    'artisan-tea_desc': 'Handcrafted teas from high-altitude estates.',
    'canned-food_title': 'Canned Food Range',
    'canned-food_desc': 'Traditional favorites, preserved for convenience.',
    'coffee-range_title': 'Coffee Range',
    'coffee-range_desc': 'Pure Arabica blends for the perfect brew.',
    'herbal-tea_title': 'Herbal Tea Range',
    'herbal-tea_desc': 'Traditional wellness brews.',
    'flavored-tea_title': 'Flavored Tea Range',
    'flavored-tea_desc': 'Exotic fruit and spice infusions.',
    'blooming-tea_title': 'Blooming Tea Range',
    'blooming-tea_desc': 'Hand-tied tea balls that blossom in hot water.',
    'honey-range_title': 'Honey Range',
    'honey-range_desc': 'Pure, natural sweetness from the wild.',
    'fruit-veg-brine_title': 'Fruits / Vegetables in Brine',
    'fruit-veg-brine_desc': 'Preserved tropical goodness.',
    'king-coconut_title': 'King Coconut Water',
    'king-coconut_desc': 'Nature’s refreshing isotonic drink.',
  },
  si: {
    label: "සිංහල",
    appTitle: "Everbolt",
    appSubtitle: "Food Products (Pvt) Ltd",
    heroTitle: " සොබාදහමේ අග්‍රගණ්‍ය,\nඩිජිටල්කරණය වූ.",
    heroSubtitle: "ශ්‍රී ලංකාවේ හදවතින්ම එන අපගේ වාරික කාබනික තේ, කුළුබඩු සහ වියළි පලතුරු පරාසය ගවේෂණය කරන්න.",
    explore: "එකතුව ගවේෂණය කරන්න",
    description: "විස්තරය",
    share: "බෙදාගන්න",
    originTitle: "ශ්‍රී ලංකාවේ නිෂ්පාදිතයි",
    originText: "අපගේ කාබනික වගාවන්ගෙන් සෘජුවම ලබාගෙන ඇත. කෘමිනාශක සහ කෘතිම එකතු කිරීම් වලින් තොර බවට සහතික කර ඇත.",
    close: "වසන්න",
    selectLang: "භාෂාව තෝරන්න",
    storeLocator: "වෙළඳසැල් සොයන්නා",
    visitUs: "අපගේ වෙළඳසැලට පැමිණෙන්න",
    directions: "මාර්ගෝපදේශ ලබා ගන්න",
    storeAddress: "නො.548/B නාවල පාර, ශ්‍රී ජයවර්ධනපුර කෝට්ටේ 10100",
    
    // --- CATEGORY TITLES (Sinhala) ---
    'herbal-teas_title': 'ඖෂධීය තේ',
    'herbal-teas_desc': 'කය සහ මනස පුබුදුවාලන මිශ්‍රණ.',
    'dried-fruits_title': 'වියළි පලතුරු',
    'dried-fruits_desc': 'ස්වාභාවික රසයෙන් පිරිපුන්, මනාව වියලන ලද පලතුරු.',
    'dried-vegetables_title': 'වියළි එළවළු',
    'dried-vegetables_desc': 'දෛනික ආහාර වේල් සඳහා කල් තබා ගත් පෝෂණය.',
    'veg-powder_title': 'වියළි එළවළු කුඩු',
    'veg-powder_desc': 'සුප් සහ ආහාර පිසීම සඳහා පෝෂ්‍යදායී කුඩු.',
    'spices-range_title': 'කුළුබඩු වර්ග',
    'spices-range_desc': 'ඔබේ ආහාර රසවත් කිරීමට සුවඳැති කුළුබඩු.',
    'spices-glass_title': 'කුළුබඩු (වීදුරු බෝතල්)',
    'spices-glass_desc': 'උසස් තත්ත්වයේ කුළුබඩු.',
    'premium-tea_title': 'වාරික තේ එකතුව',
    'premium-tea_desc': 'විශිෂ්ට තේ රස.',
    'artisan-tea_title': 'කලාත්මක තේ පරාසය',
    'artisan-tea_desc': 'උසස් තත්ත්වයේ අත්කම් තේ.',
    'canned-food_title': 'ටින් කළ ආහාර',
    'canned-food_desc': 'පහසුව සඳහා සකස් කළ සාම්ප්‍රදායික ආහාර.',
    'coffee-range_title': 'කෝපි පරාසය',
    'coffee-range_desc': 'පිරිසිදු අරාබිකා කෝපි මිශ්‍රණ.',
    'herbal-tea_title': 'ඔසු තේ වර්ග',
    'herbal-tea_desc': 'සාම්ප්‍රදායික සුවතා පාන.',
    'flavored-tea_title': 'රස කළ තේ',
    'flavored-tea_desc': 'පලතුරු සහ කුළුබඩු මිශ්‍ර තේ.',
    'blooming-tea_title': 'බ්ලූමින් තේ පරාසය',
    'blooming-tea_desc': 'උණු වතුරේ පිපෙන අත්කම් තේ බෝල.',
    'honey-range_title': 'පැණි වර්ග',
    'honey-range_desc': 'ස්වභාවික පැණි රස.',
    'fruit-veg-brine_title': 'ලුණු දමන ලද පලතුරු / එළවළු',
    'fruit-veg-brine_desc': 'කල් තබා ගත් නිවර්තන රසයන්.',
    'king-coconut_title': 'තැඹිලි වතුර',
    'king-coconut_desc': 'ස්වභාවධර්මයේ ප්‍රබෝධමත් පානය.',
  },
  ta: {
    label: "தமிழ்",
    appTitle: "Everbolt",
    appSubtitle: "Food Products (Pvt) Ltd",
    heroTitle: "இயற்கையின் சிறந்தது,\nஇலக்கமயமாக.",
    heroSubtitle: "இலங்கையின் இதயத்திலிருந்து எங்கள் பிரீமியம் ஆர்கானிக் தேநீர், மசாலா மற்றும் உலர்ந்த பழங்களை ஆராயுங்கள்.",
    explore: "சேகரிப்பை ஆராயுங்கள்",
    description: "விளக்கம்",
    share: "பகிரவும்",
    originTitle: "இலங்கை வம்சாவளி",
    originText: "இலங்கையில் உள்ள எங்கள் இயற்கை தோட்டங்களிலிருந்து நேரடியாகப் பெறப்பட்டது. பூச்சிக்கொல்லிகள் இல்லாதது.",
    close: "மூடு",
    selectLang: "மொழியைத் தேர்ந்தெடுக்கவும்",
    storeLocator: "கடை இருப்பிடம்",
    visitUs: "எங்கள் கடைக்குச் செல்லுங்கள்",
    directions: "திசைகளைப் பெறுங்கள்",
    storeAddress: "எண்.548/B நாவல வீதி, ஸ்ரீ ஜயவர்தனபுர கோட்டை 10100",
    
    // --- CATEGORY TITLES (Tamil) ---
    'herbal-teas_title': 'மூலிகை தேநீர்',
    'dried-fruits_title': 'உலர்ந்த பழங்கள்',
    'dried-vegetables_title': 'உலர்ந்த காய்கறிகள்',
    'veg-powder_title': 'காய்கறி தூள்',
    'spices-range_title': 'மசாலா பொருட்கள்',
    'spices-glass_title': 'மசாலா (கண்ணாடி பாட்டில்)',
    'premium-tea_title': 'பிரீமியம் தேநீர்',
    'artisan-tea_title': 'கைவினைத் தேநீர்',
    'canned-food_title': 'பதிவு செய்யப்பட்ட உணவு',
    'coffee-range_title': 'காபி வரம்பு',
    'herbal-tea_title': 'மூலிகை தேநீர்',
    'flavored-tea_title': 'சுவை தேநீர்',
    'blooming-tea_title': 'பூக்கும் தேநீர்',
    'honey-range_title': 'தேன் வரம்பு',
    'fruit-veg-brine_title': 'உப்பு நீரில் பழங்கள் / காய்கறிகள்',
    'king-coconut_title': 'இளநீர்',
  },
  es: {
    label: "Español",
    appTitle: "Everbolt",
    appSubtitle: "Food Products (Pvt) Ltd",
    heroTitle: "Lo Mejor de la Naturaleza,\nCurado Digitalmente.",
    heroSubtitle: "Explore nuestra gama premium de tés orgánicos, especias y frutas secas desde el corazón de Sri Lanka.",
    explore: "Explorar Colección",
    description: "Descripción",
    share: "Compartir Producto",
    originTitle: "Origen Puro de Ceilán",
    originText: "Obtenido directamente de nuestros jardines orgánicos en Sri Lanka. Certificado libre de pesticidas y aditivos artificiales.",
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
    share: "Partager le Produit",
    originTitle: "Origine Pure Ceylan",
    originText: "Provenant directement de nos jardins biologiques au Sri Lanka. Certifié sans pesticides ni additifs artificiels.",
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
    share: "Produkt Teilen",
    originTitle: "Reiner Ceylon-Ursprung",
    originText: "Direkt aus unseren Bio-Gärten in Sri Lanka bezogen. Zertifiziert frei von Pestiziden und künstlichen Zusatzstoffen.",
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
    share: "分享产品",
    originTitle: "纯正锡兰原产",
    originText: "直接采购自我们在斯里兰卡的有机花园。认证无农药和人工添加剂。",
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
    share: "مشاركة المنتج",
    originTitle: "أصل سيلاني نقي",
    originText: "مصدرها مباشرة من حدائقنا العضوية في سريلانكا. معتمدة وخالية من المبيدات والإضافات الاصطناعية.",
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
    share: "製品をシェア",
    originTitle: "純粋なセイロン産",
    originText: "スリランカのオーガニック農園から直接調達。農薬や人工添加物不使用の認定済み。",
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
    catImage: '/categories/dryveg.png',
    products: [
      { id: 'jackfruit', name: 'Dried Jackfruit', description: 'Experience the rich taste of Sri Lankan jackfruit with our Dried Jackfruit, gently dried to preserve its natural flavor and texture without added colors or preservatives.', image: '/products/Dried_Jackfruit.png', tags: ['50g', '100g'] },
      { id: 'breadfruit', name: 'Dried Breadfruit', description: 'Experience the wholesome flavor of Sri Lankan heritage with our Dried Breadfruit; gently dried to preserve its natural taste and texture without added colors or preservatives.', image: '/products/breadfruit.png', tags: ['50g', '100g'] },
      { id: 'bittergourd', name: 'Dried Bitter Gourd', description: 'Experience the authentic taste of Sri Lankan tradition with our Dried Bitter Gourd, gently dried to retain its natural bitterness, color, and nutrients without added colors or preservatives.', image: '/products/bittergourd.png', tags: ['50g', '100g'] },
      { id: 'curry-leaves-dry', name: 'Dried Curry Leaves', description: 'Experience the aroma of Sri Lankan kitchens with our Dried Curry Leaves, gently dried to retain their natural color and flavor without added colors or preservatives.', image: '/products/curry-leaves-dry.png', tags: ['50g', '100g'] },
      { id: 'leeks', name: 'Dried Leeks', description: 'Experience the mild sweetness of natural vegetables with our Dried Leeks, gently dried to retain their natural flavor, aroma, and color without added colors or preservatives.', image: '/products/leeks.png', tags: ['50g', '100g'] }
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
      { id: 'pineapple', name: 'Dried Pineapple', description: 'Experience the refreshing taste of our Dried Pineapple, preserving the natural flavor and aroma without added sugar, colors, or preservatives.', image: '/products/pineapple.png', tags: ['50g', '100g'] },
      { id: 'papaya', name: 'Dried Papaya', description: 'Experience the wholesome goodness of our Dried Papaya, gently dried to maintain its soft texture and pleasant flavor with no added sugar, colors, or preservatives.', image: '/products/papaya.png', tags: ['50g', '100g'] },
      { id: 'banana', name: 'Dried Banana', description: 'Experience the natural goodness of sun-ripened Sri Lankan bananas, gently dried to lock in nutrients and flavor with no added sugar, colors, or preservatives.', image: '/products/banana.png', tags: ['50g', '100g'] },
      { id: 'mango', name: 'Dried Mango', description: 'Experience the vibrant flavor of peak-harvested Sri Lankan mangoes, dried to preserve their natural sweetness with absolutely no added sugar or colors.', image: '/products/mango.png', tags: ['50g', '100g'] }
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
      { id: 'beetroot-p', name: 'Beetroot Powder', description: 'Experience the natural color and goodness of Sri Lanka with our Beetroot Powder, gently dried and ground to preserve nutrients and flavor with no added colors or preservatives.', image: '/products/beetroot-p.png', tags: ['100g', '200g'] },
      { id: 'carrot-p', name: 'Carrot Powder', description: 'Experience the sweetness of natural freshness with our Carrot Powder, carefully milled from premium carrots to retain their mild sweetness and natural color without added colors or preservatives.', image: '/products/carrot-p.png', tags: ['100g', '200g'] },
      { id: 'moringa-p', name: 'Moringa Powder', description: 'Experience the green goodness of Sri Lanka with our Moringa Powder, gently dried to preserve natural nutrients and color without added colors or preservatives.', image: '/products/moringa-p.png', tags: ['100g', '200g'] },
      { id: 'curry-p', name: 'Curry Leaves Powder', description: 'Experience the aroma of Sri Lankan tradition with our Curry Leaf Powder, gently dried to retain its natural flavor, aroma, and color without added colors or preservatives.', image: '/products/curry-p.png', tags: ['100g', '200g'] },
      { id: 'tomato-p', name: 'Tomato Powder', description: 'Experience the rich taste of ripe tomatoes with our Tomato Powder, gently dried to preserve natural color and tangy flavor without added colors or preservatives.', image: '/products/tomato-p.png', tags: ['100g', '200g'] },
      { id: 'pumpkin-p', name: 'Pumpkin Powder', description: 'Experience the mild sweetness of natural vegetables with our Pumpkin Powder, carefully dried to retain its natural flavor and color with no added colors or preservatives.', image: '/products/pumpkin-p.png', tags: ['100g', '200g'] }
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
      { id: 'fenugreek', name: 'Fenugreek', description: 'Elevate your dishes with the natural goodness of our high-quality Fenugreek, offering the authentic, preservative-free flavor of premium Sri Lankan quality.', image: '/products/fenugreek.jpg', tags: ['100g', '200g'] },
      { id: 'cumin', name: 'Cumin Seeds', description: 'Experience the natural purity of our Cumin Seeds, delivering the genuine, preservative-free taste of authentic Sri Lankan cuisine.', image: '/products/cumin.jpg', tags: ['100g', '200g'] },
      { id: 'mustard', name: 'Mustard Seeds', description: 'Experience the sharp, natural pungency of our preservative-free Mustard Seeds, essential for the authentic taste of traditional Sri Lankan tempering.', image: '/products/mustard.jpg', tags: ['100g', '200g'] },
      { id: 'turmeric', name: 'Turmeric Powder', description: 'Experience the golden purity of turmeric with our finely milled Turmeric Powder, offering natural colour and aroma with no added colours or preservatives', image: '/products/turmeric.jpg', tags: ['100g', '200g'] },
      { id: 'chili-p', name: 'Chili Powder', description: 'Experience the intensity of natural chilli with our finely milled Chilli Powder, offering consistent heat and vibrant colour with no added colours or preservatives.', image: '/products/chili-p.jpg', tags: ['100g', '200g'] },
      { id: 'chili-f', name: 'Chili Flakes', description: 'Experience the bold crunch of our natural Chili Flakes, delivering the authentic heat and vibrant color of premium Sri Lankan quality.', image: '/products/chili-f.jpg', tags: ['100g', '200g'] },
      { id: 'pepper-p', name: 'Black Pepper Powder', description: 'Experience the strength of real spice with our premium Black Pepper, delivering bold heat and rich Sri Lankan flavor with no added colors or preservatives.', image: '/products/pepper-p.jpg', tags: ['100g', '200g'] },
      { id: 'curry-pwdr', name: 'Curry Powder', description: 'Experience the taste of tradition with our carefully blended Curry Powder, delivering an authentic aroma, rich flavour, and natural colour with no added colours or preservatives', image: '/products/curry-pwdr.jpg', tags: ['100g', '200g'] },
      { id: 'roasted-curry', name: 'Roasted Curry Powder', description: 'Experience the depth of tradition with our carefully roasted Curry Powder, offering a rich aroma and authentic flavour with no added colours or preservatives', image: '/products/roasted-curry.jpg', tags: ['100g', '200g'] },
      { id: 'cinnamon-p', name: 'Cinnamon Powder', description: 'Experience the warmth of Sri Lankan heritage with our finely ground Cinnamon Powder, offering a naturally sweet aroma and smooth flavor with no added colors or preservatives.', image: '/products/cinnamon-p.jpg', tags: ['100g', '200g'] },
      { id: 'pepper-corns', name: 'Black Pepper Corns', description: 'Experience the strength of real spice with our premium Black Pepper, delivering bold heat and rich Sri Lankan flavor with no added colors or preservatives.', image: '/products/pepper-corns.jpg', tags: ['100g', '200g'] },
      { id: 'pepper-cracked', name: 'Black Pepper Cracked', description: 'Experience the strength of real spice with our premium Black Pepper, delivering bold heat and rich Sri Lankan flavor with no added colors or preservatives.', image: '/products/pepper-cracked.jpg', tags: ['100g', '200g'] }
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
      { id: 'cardamom-pods', name: 'Cardamom Pods', description: 'Experience the rich aroma of Sri Lanka with our premium handpicked Cardamom Pods, delivering a naturally sweet, warm flavor with no added colors or preservatives.', image: '/products/cardamom-pods.jpg', tags: ['30g'] },
      { id: 'cardamom-seeds', name: 'Cardamom Seeds', description: 'Experience concentrated flavor and aroma with our Cardamom Seeds, carefully separated from premium pods to deliver a strong fragrance with no added colors or preservatives.', image: '/products/cardamom-seeds.jpg', tags: ['45g'] },
      { id: 'cinnamon-flakes', name: 'Cinnamon Flakes', description: 'Experience the heritage of Sri Lankan cinnamon with our high-quality Cinnamon Flakes, carefully processed to retain natural sweetness and aroma without added colors or preservatives.', image: '/products/cinnamon-flakes.jpg', tags: ['30g'] },
      { id: 'citrus-p', name: 'Citrus Powder', description: 'Experience the freshness of natural citrus with our finely milled Citrus Powder, offering a bright aroma and balanced zesty flavour, with no added colours or preservatives', image: '/products/citrus-p.jpg', tags: ['35g'] },
      { id: 'clove-p', name: 'Clove Powder', description: 'Experience the warmth of natural spice with our finely ground Clove Powder, delivering a strong aroma and rich, spicy flavor with no added colors or preservatives.', image: '/products/clove-p.jpg', tags: ['35g'] },
      { id: 'coriander-p', name: 'Coriander Powder', description: 'Experience the freshness of tradition with our Coriander Powder, milled from selected seeds to deliver a balanced flavor and mild citrus aroma without added colors or preservatives.', image: '/products/coriander-p.jpg', tags: ['35g'] },
      { id: 'cumin-s', name: 'Cumin Seeds', description: 'Experience the bold aroma of purity with our Cumin Seeds, sourced from selected harvests to deliver an earthy flavor and natural aroma with no added colors or preservatives.', image: '/products/cumin-s.jpg', tags: ['50g'] },
      { id: 'curry-p-glass', name: 'Curry Powder', description: 'Experience the taste of tradition with our carefully blended Curry Powder, delivering an authentic aroma, rich flavour, and natural colour with no added colours or preservatives', image: '/products/curry-p-glass.jpg', tags: ['40g'] },
      { id: 'fennel-p', name: 'Fennel Powder', description: 'Experience gentle sweetness and aroma with our finely ground Fennel Powder, offering a refreshing scent and natural flavor with no added colors or preservatives.', image: '/products/fennel-p.jpg', tags: ['40g'] },
      { id: 'fennel-s', name: 'Fennel Seeds', description: 'Experience the freshness of natural spice with our Fennel Seeds, carefully selected for their clean aroma and mild sweetness without added colors or preservatives.', image: '/products/fennel-s.jpg', tags: ['45g'] },
      { id: 'fenugreek-s', name: 'Fenugreek Seeds', description: 'Experience the depth of authentic flavor with our Fenugreek Seeds, selected for their rich aroma and natural bitterness with no added colors or preservatives.', image: '/products/fenugreek-s.jpg', tags: ['80g'] },
      { id: 'garlic-p', name: 'Garlic Powder', description: 'Experience the convenience of pure flavor with our Garlic Powder, made from fresh cloves gently dried to retain natural aroma without added colors or preservatives.', image: '/products/garlic-p.jpg', tags: ['50g'] },
      { id: 'garlic-s', name: 'Garlic Slices', description: 'Experience the crunch of natural garlic with our Garlic Slices, thinly sliced and dried to preserve flavor and aroma without added colors or preservatives.', image: '/products/garlic-s.jpg', tags: ['30g'] },
      { id: 'gotukola', name: 'Gotukola Flakes', description: 'Experience the goodness of Sri Lankan tradition with our Gotukola Flakes, gently dried to retain nutrients and natural color with no added colors or preservatives.', image: '/products/gotukola.jpg', tags: ['10g'] },
      { id: 'mace-ground', name: 'Ground Mace', description: 'Experience the delicate warmth of spice with our Ground Mace, finely milled to deliver a subtle aroma and smooth flavor with no added colors or preservatives.', image: '/products/mace-ground.jpg', tags: ['35g'] },
      { id: 'lemongrass', name: 'Lemon Grass Flakes', description: 'Experience the refreshing aroma of Sri Lanka with our Lemongrass Flakes, gently dried to retain their citrusy scent and natural color without added colors or preservatives.', image: '/products/lemongrass.jpg', tags: ['35g'] },
      { id: 'mint', name: 'Mint Flakes', description: 'Experience the freshness of natural herbs with our Mint Flakes, gently dried to retain their refreshing aroma and color without added colors or preservatives.', image: '/products/mint.jpg', tags: ['5g'] },
      { id: 'moringa-leaf', name: 'Moringa Leaf Powder', description: 'Experience the natural wellness of Sri Lanka with our Moringa Leaf Powder, gently dried and ground to preserve nutrients and pure green goodness without added colors.', image: '/products/moringa-leaf.jpg', tags: ['24g'] },
      { id: 'mustard-s', name: 'Mustard Seeds', description: 'Experience the sharp bite of tradition with our Mustard Seeds, carefully selected for natural pungency and clean flavor with no added colors or preservatives.', image: '/products/mustard-s.jpg', tags: ['70g'] },
      { id: 'nutmeg', name: 'Nutmeg Grated', description: 'Experience rich, warm aroma with our Grated Nutmeg, finely prepared from premium whole nutmeg to deliver natural flavor with no added colors or preservatives.', image: '/products/nutmeg.jpg', tags: ['30g'] },
      { id: 'roasted-curry-g', name: 'Roasted Curry Powder', description: 'Experience the depth of tradition with our carefully roasted Curry Powder, offering a rich aroma and authentic flavour with no added colours or preservatives', image: '/products/roasted-curry-g.jpg', tags: ['50g'] },
      { id: 'sesame', name: 'Sesame Seeds', description: 'Experience the richness of natural goodness with our Sesame Seeds, carefully selected to deliver freshness and a nutty flavor without added colors or preservatives.', image: '/products/sesame.jpg', tags: ['60g'] },
      { id: 'turmeric-g', name: 'Turmeric Powder', description: 'Experience the golden purity of turmeric with our finely milled Turmeric Powder, offering natural colour and aroma with no added colours or preservatives', image: '/products/turmeric-g.jpg', tags: ['50g'] },
      { id: 'uva-bw', name: 'Uva Black & White Peppercorns', description: 'Experience the power of premium spice with our Black and White Peppercorns, delivering strong aroma and bold heat with no added colors or preservatives.', image: '/products/uva-bw.jpg', tags: ['50g'] },
      { id: 'uva-w', name: 'Uva White Peppercorns', description: 'Experience smooth heat and aroma with our White Peppercorns, processed to deliver a clean, refined flavor perfect for light-colored dishes with no added preservatives.', image: '/products/uva-w.jpg', tags: ['60g'] },
      { id: 'mace-whole', name: 'Whole Mace', description: 'Experience the warmth of natural mace with our premium Whole Mace, offering a delicate aroma and subtly sweet flavour with no added colours or preservatives.', image: '/products/mace-whole.jpg', tags: ['10g'] },
      { id: 'chili-g', name: 'Chili Powder', description: 'Experience the intensity of natural chilli with our finely milled Chilli Powder, offering consistent heat and vibrant colour with no added colours or preservatives.', image: '/products/chili-g.jpg', tags: ['40g'] }
    ]
  },
  {
    id: 'premium-tea',
    title: 'Premium Tea Collection',
    icon: <Coffee className="w-6 h-6" />,
    description: 'Exquisite teas for the connoisseur.',
    theme: { blob1: 'bg-purple-600/20', blob2: 'bg-indigo-500/20' },
    catImage: '/categories/premiumteacover.png',
    products: [
      { id: 'chai-tea', name: 'Chai Tea', description: "Experience a world of exquisite taste. 'Our Premium Tea Collection ranges from exotic fruit and spice blends to rare Silver Tips, delivering authentic Ceylon flavor in every sip'", image: '/products/chaitea.jpg', tags: ['250g'] },
     // { id: 'jasmine-tea', name: 'Jasmine Tea', description: "Experience a world of exquisite taste. 'Our Premium Tea Collection ranges from exotic fruit and spice blends to rare Silver Tips, delivering authentic Ceylon flavor in every sip'", image: '/products/jasmine-tea.jpg', tags: ['250g'] },//no img
      { id: 'earl-grey-tea', name: 'Earl Grey Tea', description: "Experience a world of exquisite taste. 'Our Premium Tea Collection ranges from exotic fruit and spice blends to rare Silver Tips, delivering authentic Ceylon flavor in every sip'", image: '/products/earlgreytea.jpg', tags: ['250g'] },
      { id: 'raspberry-tea', name: 'Raspberry Tea', description: "Experience a world of exquisite taste. 'Our Premium Tea Collection ranges from exotic fruit and spice blends to rare Silver Tips, delivering authentic Ceylon flavor in every sip'", image: '/products/raspberry.jpg', tags: ['250g'] },
      { id: 'mango-passion-tea', name: 'Mango Passion Tea', description: "Experience a world of exquisite taste. 'Our Premium Tea Collection ranges from exotic fruit and spice blends to rare Silver Tips, delivering authentic Ceylon flavor in every sip'", image: '/products/mango.jpg', tags: ['250g'] },
      //{ id: 'ceylon-cinnamon-tea', name: 'Ceylon Cinnamon Tea', description: "Experience a world of exquisite taste. 'Our Premium Tea Collection ranges from exotic fruit and spice blends to rare Silver Tips, delivering authentic Ceylon flavor in every sip'", image: '/products/ceylon-cinnamon-tea.jpg', tags: ['250g'] }, //no img
      { id: 'silver-tips', name: 'Silver Tips', description: "Experience a world of exquisite taste. 'Our Premium Tea Collection ranges from exotic fruit and spice blends to rare Silver Tips, delivering authentic Ceylon flavor in every sip'", image: '/products/silvertips.jpg', tags: ['50g'] },
      { id: 'ringtea-green', name: 'Ringtea Green', description: "Experience the light, refreshing flavor of Eveleaf Pure Ceylon Green Tea, crafted from tender handpicked leaves to deliver a smooth, clean brew naturally rich in antioxidants", image: '/products/ringtea-green.jpg', tags: ['250g'] },
      { id: 'ringtea-black', name: 'Ringtea Black', description: "Experience the bold, full-bodied flavor of Eveleaf Pure Ceylon Tea, crafted from handpicked leaves to deliver a robust, aromatic brew with a smooth, refreshing taste and rich amber color", image: '/products/ringtea-black.jpg', tags: ['250g'] }
    ]
  },
  {
    id: 'artisan-tea',
    title: 'Artisan Tea Range',
    icon: <Sparkles className="w-6 h-6" />,
    description: 'Handcrafted teas from high-altitude estates.',
    theme: { blob1: 'bg-amber-700/20', blob2: 'bg-yellow-800/20' },
    catImage: '/categories/artisancover.png',
    products: [
      { id: 'artisan-black', name: 'Artisan Black Tea', description: 'Experience the soothing richness of our Special Black Tea, handcrafted in the high-altitude estates of Nuwara Eliya to deliver an antioxidant-rich, refreshing taste.', image: '/products/blackk.png', tags: ['50g', '100g'] },
      { id: 'artisan-green', name: 'Artisan Green Tea', description: 'Experience the distinctive richness of the Southern coast with our Galle Special Green Tea, harvested from nutrient-rich lowlands to deliver a bold, full-bodied flavor and unique aroma.', image: '/products/green.png', tags: ['50g', '100g'] },
      { id: 'artisan-white', name: 'Artisan White Tea', description: 'Experience the rare elegance of our Sigiriya Special White Tea, handpicked from Nuwara Eliya’s highlands and naturally sun-dried to deliver subtle floral notes and a smooth, velvety finish.', image: '/products/white.png', tags: ['50g', '100g'] },
      { id: 'artisan-wangedi', name: 'Artisan Wangedi Pekoe Tea', description: 'Experience the bold, smooth flavor of traditional Wangedi Pekoe, pounded to perfection to release a deep, rich hue and robust aroma for a truly authentic tea experience.', image: '/products/pekoee.png', tags: ['50g', '100g'] }
    ]
  },
  {
    id: 'Fruits-Vegetables-in-Brine',
    title: 'Fruits | Vegetables in Brine',
    icon: <Utensils className="w-6 h-6" />,
    description: 'Traditional favorites, preserved for convenience.',
    theme: { blob1: 'bg-slate-600/20', blob2: 'bg-gray-600/20' },
    catImage: '/categories/cannedfoodcover.png',
    products: [
      { id: 'lasia-brine', name: 'Lasia in Brine (Kohila)', description: 'Experience the taste of tradition with our Lasia in Brine, prepared from fresh stems to retain natural texture and flavor with no artificial colors or preservatives.', image: '/products/Lasia.png', tags: ['Standard'] },
      { id: 'baby-jackfruit-brine', name: 'Baby Jackfruit in Brine (Polos)', description: 'Experience the authentic culinary heritage of Sri Lanka with our Baby Jackfruit in Brine, preserved to lock in natural flavor and texture with no added artificial colors or preservatives.', image: '/products/Babyjackfruit.png', tags: ['Standard'] },
      { id: 'breadfruit-brine', name: 'Breadfruit Chunks in Brine', description: 'Experience the distinct taste of tropical tradition with our Breadfruit Chunks in Brine, carefully preserved to maintain their natural texture and flavor without artificial colors or preservatives.', image: '/products/breadfruitchunk.png', tags: ['250g'] },
      { id: 'jackfruit-brine', name: 'Jackfruit in Brine', description: 'Experience the distinct taste of tropical tradition with our Jackfruit in Brine, carefully preserved to maintain their natural texture and flavor without artificial colors or preservatives', image: '/products/Jackfruit.png', tags: ['Standard'] }
    ]
  },
  {
    id: 'coffee-range',
    title: 'Coffee Range',
    icon: <Coffee className="w-6 h-6" />,
    description: 'Pure Arabica blends for the perfect brew.',
    theme: { blob1: 'bg-amber-900/20', blob2: 'bg-orange-950/20' },
    catImage: '/categories/coffeecover.png',
    products: [
      { id: 'coffee-beans', name: 'Pure Arabica Coffee Beans', description: 'Experience the pure form of coffee with our Coffee Beans, carefully selected and roasted to maintain freshness and natural flavor for a fresh, aromatic cup every time. (S9 Wash Process)', image: '/products/coffeebeans.png', tags: ['30g'] },
      { id: 'coffee-powder', name: 'Pure Arabica Coffee Powder', description: 'Experience the smooth convenience of our Coffee Powder, expertly roasted and finely ground from premium Sri Lankan beans for a rich aroma and consistent brew. (S9 Wash Process)', image: '/products/coffeepowder.png', tags: ['30g'] }
    ]
  },
  {
    id: 'flavored-tea',
    title: 'Flavored Tea Range',
    icon: <Coffee className="w-6 h-6" />,
    description: 'Exotic fruit and spice infusions.',
    theme: { blob1: 'bg-pink-500/20', blob2: 'bg-rose-400/20' },
    catImage: '/categories/flavordcover.png',
    products: [
      { id: 'mango-tea', name: 'Mango Flavored Black Tea', description: 'Experience the tropical sweetness of luscious mango blended with our premium black tea for a refreshing fruity flavor.', image: '/products/mangotea.png', tags: ['30g'] },
      { id: 'ginger-tea', name: 'Ginger Flavored Black Tea', description: 'Experience the warming spice of ginger blended with our premium black tea for a soothing, aromatic flavor.', image: '/products/ginger.png', tags: ['30g'] },
      { id: 'caramel-tea', name: 'Caramel Flavored Black Tea', description: 'Experience the rich indulgence of sweet caramel blended with our premium black tea for a smooth, dessert-like flavor.', image: '/products/caramel.png', tags: ['30g'] },
      { id: 'pineapple-tea', name: 'Pineapple Flavored Black Tea', description: 'Experience the refreshing tang of tropical pineapple blended with our premium black tea for a vibrant, zesty flavor.', image: '/products/pineappletea.png', tags: ['30g'] },
      { id: 'strawberry-tea', name: 'Strawberry Flavored Black Tea', description: 'Experience the berry sweetness of ripe strawberries blended with our premium black tea for a bright, delightful flavor.', image: '/products/strawberry.png', tags: ['30g'] },
      { id: 'passion-fruit-tea', name: 'Passion Fruit Flavored Black Tea', description: 'Experience the exotic tang of passion fruit blended with our premium black tea for a bold, refreshing flavor.', image: '/products/passionfruit.png', tags: ['30g'] },
      { id: 'cinnamon-tea', name: 'Cinnamon Flavored Black Tea', description: 'Experience the aromatic warmth of cinnamon blended with our premium black tea for a classic, spicy flavor.', image: '/products/cinnamonteaa.png', tags: ['30g'] },
      { id: 'lemon-green-tea', name: 'Lemon Flavored Green Tea', description: 'Experience the citrusy freshness of lemon blended with our delicate green tea for a light, revitalizing flavor.', image: '/products/lemon.png', tags: ['30g'] }
    ]
  },
  {
  id: 'herbal-tea',
  title: 'Herbal Tea Range',
  icon: <Leaf className="w-6 h-6" />,
  description: 'Traditional wellness brews.',
  theme: { blob1: 'bg-teal-600/20', blob2: 'bg-cyan-600/20' },
  catImage: '/categories/herbalteacover.png',
products: [
  { id: 'efte019', name: 'Ushma', description: 'Experience cooling relief and natural purification. Our Ushma blend is designed to reduce health issues related to body heat while possessing blood-purifying and anti-cancer properties.', image: '/products/ushma.webp', tags: ['25 Tea Bags'] },

  { id: 'efte020', name: 'Island Spicy Fusion', description: 'Experience the heart-healthy benefits of island spices. Our Island Spicy Fusion supports cardiovascular wellness and helps manage blood pressure naturally.', image: '/products/island-spicy.webp', tags: ['25 Tea Bags'] },

  { id: 'efte021', name: 'Herbal Soothe', description: 'Experience soothing relief for your body. This gentle blend helps relieve headaches caused by stress and supports relaxation and overall comfort.', image: '/products/herb-sooth.webp', tags: ['25 Tea Bags'] },

  { id: 'efte022', name: 'Calm Mind', description: 'Experience a moment of tranquility. Our Calm Mind tea helps reduce headaches and stress while supporting mental clarity and emotional balance.', image: '/products/calm-mind.webp', tags: ['25 Tea Bags'] },

  { id: 'efte023', name: 'Love & Energy Blend', description: 'Experience a revitalizing boost of vitality. This blend supports energy, stamina, and overall wellness for a naturally refreshed feeling.', image: '/products/love-energy.webp', tags: ['25 Tea Bags'] },

  { id: 'efte024', name: 'Detox Blend', description: 'Experience the cleansing power of nature. Detox Blend supports internal purification and helps your body feel lighter, cleaner, and refreshed.', image: '/products/detox.webp', tags: ['25 Tea Bags'] },

  { id: 'efte025', name: 'Balance Blend', description: 'Experience harmony within. Balance Blend supports healthy body function and helps maintain equilibrium for day-to-day wellness.', image: '/products/balance.webp', tags: ['25 Tea Bags'] },

  { id: 'efte026', name: 'Citrus Spice Energizer', description: 'Experience an uplifting burst of citrus and spice. This energizer blend supports vitality and keeps you feeling refreshed and active.', image: '/products/citrus.webp', tags: ['25 Tea Bags'] },

  { id: 'efte027', name: 'Slim Herb Tea', description: 'Experience gentle support for weight management. Slim Herb Tea is crafted to support metabolism and help you feel light and energized.', image: '/products/slim-herb.webp', tags: ['25 Tea Bags'] },

  { id: 'efte028', name: 'Harmony Brew', description: 'Experience a well-rounded wellness brew. Harmony Brew supports overall balance and contributes to a calm, healthy lifestyle.', image: '/products/harmony.webp', tags: ['25 Tea Bags'] },

  { id: 'efte029', name: 'Fat Burn', description: 'Experience natural support for burning fat. Fat Burn blend is formulated to help support metabolism and weight goals.', image: '/products/fat-burn.webp', tags: ['25 Tea Bags'] },

  { id: 'efte030', name: 'Special Hibiscus', description: 'Experience the vibrant benefits of hibiscus. Special Hibiscus supports wellness with a refreshing taste and natural antioxidant power.', image: '/products/hibiscus.webp', tags: ['25 Tea Bags'] },

  { id: 'efte031', name: 'Moringa Morning Dew', description: 'Experience a fresh start with moringa goodness. Moringa Morning Dew supports energy, nutrition, and overall vitality.', image: '/products/Moringa-Morning.png', tags: ['25 Tea Bags'] },

  { id: 'efte032', name: 'Immuno Up', description: 'Experience immune support in every cup. Immuno Up is designed to strengthen natural defenses and support daily wellness.', image: '/products/Immuno Up.png', tags: ['25 Tea Bags'] },

  { id: 'efte033', name: 'Glyco Guard', description: 'Experience supportive care for healthy sugar balance. Glyco Guard is crafted to help maintain healthy blood sugar levels naturally.', image: '/products/Glyco-Guard.png', tags: ['25 Tea Bags'] },

  { id: 'efte034', name: 'Green Guard', description: 'Experience green protection for your body. Green Guard supports wellness with plant-powered goodness and natural balance support.', image: '/products/Green-Guard-Balance.png', tags: ['25 Tea Bags'] },

  { id: 'efte035', name: 'Vita Cure', description: 'Experience a revitalizing wellness cure. Vita Cure supports overall health and helps you feel renewed and energized.', image: '/products/VitaCure.png', tags: ['25 Tea Bags'] }
]

},

  {
    id: 'blooming-tea',
    title: 'Blooming Tea Range',
    icon: <Sparkles className="w-6 h-6" />,
    description: 'Hand-tied tea balls that blossom in hot water.',
    theme: { blob1: 'bg-pink-400/20', blob2: 'bg-rose-300/20' },
    catImage: '/categories/bloomingcover.jpg (1).jpeg',
    products: [
      { id: 'ring-tea', name: 'Ring Tea (Green/Black)', description: 'Ring Tea – Green Tea "Experience the artisan craftsmanship of Sri Lanka with our Green Ring Tea, featuring hand-rolled tea leaves that elegantly unfurl in your cup to release a delicate, refreshing flavor."Ring Tea – Black Tea "Experience the visual elegance of tradition with our Black Ring Tea, where premium leaves are expertly hand-rolled into rings to deliver a bold, sophisticated flavor and unique brewing experience."', image: '/products/ringtea-black.jpg', tags: ['5 Balls'] },
      { id: 'rajakapuru-tea', name: 'Rajakapuru Tea', description: 'Experience the aromatic healing of Sri Lankan heritage with our Rajakapuru Tea, a traditional herbal infusion known for its distinct fragrance and soothing wellness properties.', image: '/products/RT.jpg', tags: ['5 Balls'] }
    ]
  },
  {
    id: 'honey-range',
    title: 'Honey Range',
    icon: <Droplet className="w-6 h-6" />,
    description: 'Pure, natural sweetness from the wild.',
    theme: { blob1: 'bg-yellow-500/20', blob2: 'bg-amber-400/20' },
    catImage: '/categories/honeycover.png',
    products: [
  {
    id: 'EFBE001',
    name: 'Bee Honey',
    description:
      'Experience the purity of nature from Sri Lanka with our Pure Bee Honey, carefully harvested to preserve its natural aroma and rich color with no added sugar, colors, or preservatives',
    image: '/products/beehoney.png',
    tags: ['250ml']
  },
  {
    id: 'EFBE002',
    name: 'Bee Honey - Jam',
    description:
      'Experience smooth, natural sweetness with our Bee Honey Jam, prepared from pure Sri Lankan honey to achieve a spreadable texture and natural flavor without artificial colors or preservatives',
    image: '/products/beehoneyjam.png',
    tags: ['250ml']
  },
  {
    id: 'EFKT001',
    name: 'Kithul Treacle',
    description:
      'Experience the natural sweetness of Sri Lankan heritage with our Kithul Treacle, extracted from palm sap to deliver a rich color and deep caramel flavor with no added sugar, colors, or preservatives',
    image: '/products/kithultreacle.png',
    tags: ['250ml']
  },
  {
    id: 'EFKT002',
    name: 'Kithul Powder',
    description:
      'Experience authentic Sri Lankan sweetness in a convenient form with our Kithul Powder, gently dried from pure palm sap to preserve its natural flavor and aroma without additives',
    image: '/products/kithul-suger-powder.png',
    tags: ['250ml']
  },
  {
    id: 'EFKT003',
    name: 'Kithul Sugar Powder',
    description:
      'Experience refined natural sweetness with our Kithul Sugar Powder, processed from pure sap into a fine powder that maintains natural caramel notes with no added sugar or preservatives',
    image: '/products/kithul-sugar-powder.png',
    tags: ['250ml']
  },
  {
    id: 'EFKT004',
    name: 'Kithul Flour',
    description:
      'Experience the traditional goodness of Sri Lanka with our Kithul Flour, finely milled from palm pith to deliver a smooth texture and neutral flavor that is naturally gluten-free',
    image: '/products/kithul-flour.png',
    tags: ['250ml']
  }
]

  }, 
];

// --- COMPONENTS ---

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

const Branding = ({ lang, setLang, onViewChange }) => {
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
  const [showLangMenu, setShowLangMenu] = useState(false);

  return (
    <div className="flex items-center justify-between mb-8 relative z-50">
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => onViewChange('home')}>
        <div className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0">
          <img src="/logo.png" alt="Logo" className="w-full h-full object-contain drop-shadow-2xl brightness-110" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-none drop-shadow-lg">{t.appTitle}</h1>
          <p className="text-[10px] md:text-xs text-red-400 font-bold tracking-[0.2em] uppercase drop-shadow-md mt-1">{t.appSubtitle}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => onViewChange('store-locator')}
          className="bg-white/10 hover:bg-white/20 backdrop-blur-md p-3 rounded-full text-red-100 transition-all border border-white/5 active:scale-95"
          title={t.storeLocator}
        >
          <MapPin className="w-5 h-5" />
        </button>

        <div className="relative">
          <button
            onClick={() => setShowLangMenu(!showLangMenu)}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold text-red-100 transition-all border border-white/5 active:scale-95"
          >
            <Globe className="w-4 h-4" />
            <span className="uppercase">{lang}</span>
          </button>

          {showLangMenu && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-[#2a0a0a] border border-white/10 rounded-xl shadow-2xl overflow-hidden h-64 overflow-y-auto custom-scrollbar z-50">
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
        <div className="absolute inset-0 overflow-hidden bg-white/5">
          <img
            src={category.catImage || `https://placehold.co/600x400/3f0e0e/red?text=${localCat.title}`}
            alt={localCat.title}
            className={`w-full h-full object-cover scale-125 group-hover:scale-110 transition-transform duration-300 filter brightness-75 group-hover:brightness-90 opacity-100`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
        </div>

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
  const tags = Array.isArray(product.tags) ? product.tags : [];

  return (
    <TiltCard
      onClick={() => onClick(product)}
      className="group w-full cursor-pointer"
    >
      <div className="w-full text-left bg-white/5 rounded-2xl border border-white/10 overflow-hidden hover:border-red-500/30 transition-colors duration-300">
        <div className="aspect-[4/3] overflow-hidden relative bg-white/5">
          <img
            src={product.image}
            alt={localProd.name}
            className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 opacity-100`}
          />
          <div className="absolute top-3 left-3 flex gap-1 flex-wrap max-w-[80%]">
            {tags.map(tag => (
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

const ShareToast = ({ show, lang }) => {
  return (
    <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded-full font-bold shadow-2xl shadow-red-500/20 transform transition-all duration-300 z-50 flex items-center gap-2 ${show ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
      <Share2 className="w-4 h-4" />
      <span>Link Copied!</span>
    </div>
  );
};

// --- MAIN APP COMPONENT ---
const App = () => {
  const [view, setView] = useState('language-select');
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeProduct, setActiveProduct] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [lang, setLang] = useState('en');
  const [theme, setTheme] = useState({ blob1: 'bg-red-500/10', blob2: 'bg-rose-500/5' });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleLanguageSelect = (selectedCode) => {
    setLang(selectedCode);
    setView('home');
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
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
      return;
    }
    setTheme({ blob1: 'bg-red-500/10', blob2: 'bg-rose-500/5' });
    setView('home');
    setActiveCategory(null);
    setActiveProduct(null);
  };

  const handleViewChange = (newView) => {
    if (newView === 'home') {
      setTheme({ blob1: 'bg-red-500/10', blob2: 'bg-rose-500/5' });
      setActiveCategory(null);
      setActiveProduct(null);
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

  const renderLanguageSelect = () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
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
      <div className="space-y-4">
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
    if (!activeCategory) return renderHome();
    const localCat = getLocalizedContent(activeCategory, lang);

    return (
      <div>
        <div className="flex items-center justify-between mb-8 sticky top-0 bg-[#2a0a0a]/80 backdrop-blur-xl py-4 z-20 border-b border-white/5">
          <button onClick={goBack} className="p-2 -ml-2 rounded-full hover:bg-white/10 text-white transition-colors active:scale-95">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h2 className="text-lg font-bold text-white tracking-wide">{localCat.title}</h2>
          <div className="w-10" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pb-20">
          {(activeCategory.products || []).map((product) => (
            <ProductCard key={product.id} product={product} onClick={handleProductClick} lang={lang} />
          ))}
        </div>
      </div>
    );
  };

  const renderProduct = () => {
    if (!activeProduct) return renderCategory();

    const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
    const localProduct = getLocalizedContent(activeProduct, lang);
    const tags = Array.isArray(activeProduct.tags) ? activeProduct.tags : [];

    return (
      <div className="relative min-h-screen pb-32">
        <button
          onClick={goBack}
          className="fixed top-6 left-6 z-30 w-12 h-12 rounded-full bg-black/20 backdrop-blur-lg border border-white/10 flex items-center justify-center text-white hover:bg-black/40 transition-all active:scale-95"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="relative w-full aspect-[4/5] md:aspect-video rounded-b-[3rem] overflow-hidden shadow-2xl bg-white/5">
          <img
            src={activeProduct.image}
            alt={localProduct.name}
            className={`w-full h-full object-cover`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2a0a0a] via-transparent to-transparent opacity-90" />

          <div className="absolute bottom-0 left-0 w-full p-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map(tag => (
                <span key={tag} className="px-3 py-1 rounded-full bg-red-600 text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-red-500/20">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-2 leading-none">{localProduct.name}</h1>
          </div>
        </div>

        <div className="p-8 max-w-2xl mx-auto">
          <div className="flex flex-col gap-6 mb-8">
            <div className="prose prose-invert flex-1">
              <h3 className="text-red-400 text-xs font-bold uppercase tracking-widest mb-3">{t.description}</h3>
              <p className="text-lg text-red-100/80 leading-relaxed font-light">
                {localProduct.description}
              </p>
            </div>
          </div>

          <div className="mt-8 p-6 rounded-2xl bg-white/5 border border-white/5 flex items-start gap-4">
            <Info className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
            <div>
              <h4 className="text-white font-bold text-sm mb-1">{t.originTitle}</h4>
              <p className="text-white/40 text-xs leading-relaxed">{t.originText}</p>
            </div>
          </div>
        </div>

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

  const renderStoreLocator = () => {
    const t = TRANSLATIONS[lang] || TRANSLATIONS.en;
    return (
      <div className="min-h-screen">
        <div className="flex items-center justify-between mb-8 sticky top-0 bg-[#2a0a0a]/80 backdrop-blur-xl py-4 z-20 border-b border-white/5">
          <button onClick={() => handleViewChange('home')} className="p-2 -ml-2 rounded-full hover:bg-white/10 text-white transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h2 className="text-xl font-bold text-white">{t.storeLocator}</h2>
          <div className="w-10" />
        </div>

        <div className="space-y-6">
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
                <div className="p-3 rounded-full bg-red-500/20 text-red-400">
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
                className="w-full py-3 bg-red-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-red-500 transition-colors"
              >
                <MapPin className="w-4 h-4" />
                {t.directions}
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 flex items-center gap-4">
              <Clock className="w-8 h-8 text-red-400" />
              <div>
                <h4 className="text-white font-bold">Opening Hours</h4>
                <p className="text-white/40 text-sm">Daily: 8:00 AM - 8:00 PM</p>
              </div>
            </div>
            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 flex items-center gap-4">
              <Phone className="w-8 h-8 text-red-400" />
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

  if (!isLoaded) return <div className="min-h-screen bg-[#2a0a0a]" />;

  return (
    <div className="min-h-screen bg-[#2a0a0a] text-white font-sans selection:bg-red-500/30 transition-colors duration-1000">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800;900&display=swap');
        body { font-family: 'Inter', sans-serif; }
      `}</style>

      <div className="max-w-4xl mx-auto min-h-screen relative overflow-hidden">
        <div className={`fixed top-0 left-0 w-full h-[500px] blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/4 transition-all duration-1000 ${theme.blob1}`} />
        <div className={`fixed bottom-0 right-0 w-full h-[500px] blur-[100px] rounded-full pointer-events-none translate-y-1/2 transition-all duration-1000 ${theme.blob2}`} />

        <div className="relative z-10 p-6 md:p-8">
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