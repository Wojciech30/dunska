const mongoose = require("mongoose");
const Brand = require("./models/Brand");
const BlogPost = require("./models/BlogPost");
const Inspiration = require("./models/Inspiration");
require("dotenv").config();

// Przykładowe zdjęcia (odzieży/mody duńskiej)
const heroImages = [
  "https://images.unsplash.com/photo-1550614000-4b95d4ebfa46?q=80&w=2574&auto=format&fit=crop", // fashion runway/editorial
  "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=2673&auto=format&fit=crop", // minimalist fashion
  "https://images.unsplash.com/photo-1509319117193-57bab727e09d?q=80&w=2574&auto=format&fit=crop", // bright colors
];

const galleryImages = [
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2520&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=2574&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1485230895905-eb56f66378ae?q=80&w=2670&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=2670&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2670&auto=format&fit=crop",
];

const brandData = [
  {
    name: "GANNI",
    description:
      "<p>GANNI to ikona kopenhaskiego stylu. Zamiast sztywnego minimalizmu, marka proponuje <i>Scandi 2.0</i> — pełne luzu, kontrastów i odważnych wzorów.</p><p>Kultowe sukienki w panterkę, duże kołnierzyki i masywne buty to ich znaki rozpoznawcze. GANNI udowadnia, że zrównoważona moda może być zabawna i bezkompromisowa.</p>",
    isPremium: true,
    premiumLabel: "Kultowy Scandi",
    order: 1,
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Ganni_logo.svg/1024px-Ganni_logo.svg.png",
    heroImage: heroImages[0],
    gallery: [galleryImages[0], galleryImages[1]],
  },
  {
    name: "ROTATE Birger Christensen",
    description:
      "<p>ROTATE to marka stworzona przez duetu influencerek (Jeanette Madsen i Thora Valdimars). Jest odpowiedzią na to, czego brakowało im w szafach — ubrań idealnych na imprezę.</p><p>Krótkie sukienki, mocne bufki i lata 80. w nowoczesnym wydaniu. Jeśli szukasz kreacji, która przyciągnie wszystkie spojrzenia, ROTATE jest odpowiedzią.</p>",
    isPremium: false,
    order: 2,
    logo: "https://pl.rotatebirgerchristensen.com/cdn/shop/files/ROTATE_Logo2_190x.png",
    heroImage: heroImages[1],
    gallery: [galleryImages[2], galleryImages[3]],
  },
  {
    name: "Stine Goya",
    description:
      "<p>Od momentu powołania marki w 2006 roku, Stine Goya przełamuje stereotypy o mrocznym skandynawskim deisngie. Jej kolekcje to eksplozja barw, autorskich printów i malarskiego podejścia do mody.</p><p>Ubrania Stine Goya to radosne celebrowanie kobiecości i indywidualizmu, które idealnie kontrastuje z chłodem Kopenhagi.</p>",
    isPremium: true,
    premiumLabel: "Mistrzyni Koloru",
    order: 3,
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Stine_Goya_logo.svg/1024px-Stine_Goya_logo.svg.png",
    heroImage: heroImages[2],
    gallery: [galleryImages[4], galleryImages[0]],
  },
];

const blogData = [
  {
    title: "Czym jest Scandi 2.0?",
    content:
      '<p>Przez lata styl skandynawski kojarzył się wyłącznie z surowym minimalizmem, beżami i architektoniczną formą. Dziś Kopenhaga bawi się modą inaczej.</p><h2>Kolory i kontrasty</h2><p>Dziewczyny z Kopenhagi łączą masywne buciory z romantycznymi sukienkami od GANNI, noszą jaskrawe swetry i nie boją się dużych printów. To styl, w którym wygoda jazdy na rowerze spotyka się z dbałością o każdy detal.</p><blockquote>"Moda w Danii jest stworzona do tego, żeby w niej żyć, nie tylko pozować."</blockquote>',
    excerpt:
      "Kopenhaska moda ewoluuje. Zapomnij o nudnym beżu — poznaj Scandi 2.0, w którym króluje luz, duże kołnierzyki i zwierzęce printy.",
    category: "Trendy",
    coverImage: heroImages[1],
    published: true,
    metaTitle: "Scandi 2.0 - Nowe oblicze duńskiej mody",
    metaDescription:
      "Czym charakteryzuje się nowy styl dziewczyn z Kopenhagi. Przewodnik po modzie Scandi.",
  },
  {
    title: "ROTATE — jak nosić mocne ramiona na co dzień",
    content:
      "<p>Sukienki od ROTATE z charakterystycznymi bufkami to już klasyk imprezowej garderoby. Jak jednak zaadaptować ten mikrotrend na mniej formalne wyjścia?</p><p>Kluczem jest kontrast. Zestaw wyrazistą górę z prostymi, surowymi jeansami vintage lub ciężkimi mokasynami. Przełamanie glamouru codzienną nonszalancją to istota duńskiego stylu.</p>",
    excerpt:
      "Bufki, lata 80. i błysk. Podpowiadamy, jak stylizować najbardziej rozpoznawalne elementy marki ROTATE bez czekania na Sylwestra.",
    category: "Stylizacje",
    coverImage: heroImages[0],
    published: true,
    metaTitle: "Stylizacja sukienek ROTATE - Poradnik",
    metaDescription:
      "Jak nosić bufki i imprezowe sukienki od ROTATE na co dzień. Porady stylistów.",
  },
  {
    title: "Warstwy — sekret kapsułowej szafy na zimę",
    content:
      "<p>Duńska pogoda bywa nieobliczalna. Od silnego wiatru po nagłe słońce nad kanałami Nyhavn. Dlatego kopenhaskie ulice opanowały warstwy.</p><h3>Sztuka łączenia faktur</h3><p>Zacznij od cienkiego swetra z wełny merino. Na to nałóż oversizową koszulę (koniecznie wystający kołnierzyk!), a całość dociąż przeskalowaną marynarką łamigłówką lub pikowaną kamizelką. Kopenhaski <i>layering</i> nie tylko chroni przed zimnem, ale buduje fascynującą, trójwymiarową sylwetkę.</p>",
    excerpt:
      "Jak ubrać się na cebulkę i wyglądać jak z Fashion Weeka? Sekrety skandynawskiego layeringu, łączenia faktur i wełny.",
    category: "Porady",
    coverImage: heroImages[2],
    published: true,
    metaTitle: "Jak budować warstwy w stylizacji - Scandi Layering",
    metaDescription:
      "Sekrety duńskiej zabawy warstwami. Jak łączyć faktury i ocieplać sylwetkę.",
  },
];

const seedDB = async () => {
  try {
    const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/dunska";
    await mongoose.connect(uri);
    console.log("✅ Połączono z bazą danych.");

    // Czyszczenie starych danych
    await Brand.deleteMany({});
    await BlogPost.deleteMany({});
    await Inspiration.deleteMany({});
    console.log("🗑️ Wyczyszczono stare dane (Marki, Blog, Inspiracje).");

    // MOCKOWANIE MAREK
    let createdBrands = [];
    for (const data of brandData) {
      const brand = await Brand.create(data);
      createdBrands.push(brand);
    }
    console.log(`✅ Utworzono ${createdBrands.length} marki.`);

    // MOCKOWANIE BLOGA
    // Przypisz pierwszą markę do pierwszego wpisu, a drugą do drugiego (dla testu relacji)
    if (createdBrands.length > 0) {
      blogData[1].brand = createdBrands[1]._id; // ROTATE wpis
    }

    for (const data of blogData) {
      await BlogPost.create(data);
    }
    console.log(`✅ Utworzono ${blogData.length} wpisów na blogu.`);

    // MOCKOWANIE INSPIRACJI (GALERIA)
    const inspoData = galleryImages.map((img, i) => ({
      image: img,
      order: i,
      // Losowo przypisz markę do niektórych zdjęć
      brand: i % 2 === 0 ? createdBrands[0]._id : null,
    }));

    for (const data of inspoData) {
      await Inspiration.create(data);
    }
    console.log(`✅ Utworzono ${inspoData.length} zdjęć w inspiracjach.`);

    console.log("🎉 Seedowanie zakończone sukcesem!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Błąd podczas seedowania:", error);
    process.exit(1);
  }
};

seedDB();
