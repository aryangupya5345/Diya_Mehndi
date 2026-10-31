/**
 * Default Data Store for Mehndi Atelier & Academy
 * Fully editable by website owner via the Admin Dashboard.
 * Automatically synchronizes with localStorage ('mehndi_atelier_data_v2').
 */

const DEFAULT_MEHNDI_DATA = {
  // ATELIER PROFILE & CONTACT DETAILS
  profile: {
    brandName: "Sakshi Mehndi",
    artistName: "Diya Sakshi",
    tagline: "Bespoke Bridal Henna • 100% Organic Sojat Cones • Artistry Masterclasses",
    phone: "+91 98765 43210",
    whatsapp: "919876543210",
    email: "Diya@gmail.com",
    city: "Hazaribagh",
    address: "Baba Path, Hurhuru, Hazaribagh, Jharkhand 825301",
    instagram: "https://instagram.com/sakshimehndi.art",
    instagramHandle: "@sakshimehndi.art",
    googleMapsUrl: "https://maps.google.com/?q=Bridal+Mehndi+Artist",
    announcement: "Wedding & Festive Season Bookings Open! Reserve your bridal date early.",
    aboutBio: "Welcome to Sakshi Mehndi Atelier, Hazaribagh. We are proud to be your local city's premier bridal mehndi artist. With 5+ years of dedicated artistry and 100+ happy brides adorned in Hazaribagh and nearby districts, we specialize in intricate bridal jaal, royal portrait motifs, and modern Gulf Arabic flows. Every cone is freshly hand-made in our studio using 100% pure Sojat henna for a rich, guaranteed deep-dark stain. Available for studio appointments and doorstep home visits in Hurhuru, Matwari, Korrah, Babugaon, and all Hazaribagh.",
    yearsExperience: "5+",
    bridesDressed: "100+",
    rating: "4.9★"
  },

  // HERO & HOMEPAGE TEXTS
  hero: {
    tag1: "Best Bridal Mehndi Artist in Hazaribagh",
    tag2: "100% Pure Organic Sojat Cones • Deep Dark Stain",
    headlineMain: "Best Bridal Mehndi Artist in Your City,",
    headlineHighlight: "Hazaribagh",
    headlineEnd: "• Har Dulhan Ka Sapna",
    lead: "Khushiyon Ka Gehra Rang, Hazaribagh Ki Har Dulhan Ke Sang! Bespoke bridal storytelling motifs, customized love-story elements, and pure organic dark-stain henna crafted to make you look and feel unforgettable. Available for home visits and studio bookings across Hurhuru, Matwari, Korrah, Babugaon, and all Hazaribagh.",
    image: "assets/images/bridal_hero.jpg",
    badgeTitle: "Hazaribagh's #1 Bridal Henna Artist",
    badgeText: "100+ Brides Adorned in Hazaribagh • 100% Organic Sojat Harvest • Zero Chemicals"
  },

  // TRUST PILLARS
  trustPillars: [
    {
      id: "tp-1",
      icon: "🌿",
      title: "100% Organic Sojat Cones",
      desc: "Triple-sifted Rajasthani henna paste infused with pure lavender and eucalyptus oils."
    },
    {
      id: "tp-2",
      icon: "✨",
      title: "Deep Mahogany 48h Stain",
      desc: "Rich, long-lasting bridal color tested and loved by 100+ happy brides."
    },
    {
      id: "tp-3",
      icon: "🎓",
      title: "Hands-on Masterclasses",
      desc: "Step-by-step guidance on bridal figures, jaali, and symmetric cone pressure."
    },
    {
      id: "tp-4",
      icon: "🚚",
      title: "Pan-India Fresh Dispatch",
      desc: "Freshly rolled organic cones and practice kits delivered right to your doorstep."
    }
  ],

  // SECTION HEADERS
  sectionHeaders: {
    gallery: {
      tag: "Art Gallery & Portfolio",
      title: "Curated Mehndi Artworks in Hazaribagh",
      subtitle: "Explore signature bridal and festive designs handcrafted for local brides in Hazaribagh. Swipe horizontally to browse or view the full gallery."
    },
    services: {
      tag: "Bespoke Celebrations",
      title: "Bridal & Occasion Artistry",
      subtitle: "Affordable & luxury bridal packages for your Mehndi, Sangeet, and Reception anywhere in Hazaribagh. Book directly on WhatsApp."
    },
    shop: {
      tag: "Pure Botanical Supplies",
      title: "The Mehndi Atelier Shop (Hazaribagh)",
      subtitle: "Fresh organic cones and practice kits prepared in our Hazaribagh studio with same-day local pickup and delivery across Jharkhand."
    },
    academy: {
      tag: "Learn & Grow",
      title: "Masterclass Programs & Workshops",
      subtitle: "Master the craft of henna right here in Hazaribagh with hands-on practice, personalized feedback, and full starter kits."
    },
    aftercare: {
      tag: "Artist Secrets",
      title: "How To Get The Darkest Mahogany Stain",
      subtitle: "Follow these proven bridal steps to transform fresh orange paste into deep, breathtaking maroon."
    },
    reviews: {
      tag: "Bride & Student Stories",
      title: "Loved By Discerning Brides",
      subtitle: "Read real experiences from our recent weddings, festive celebrations, and workshop attendees."
    },
    contact: {
      tag: "Reserve Your Date",
      title: "Book Your Bridal Date on WhatsApp",
      subtitle: "Share your wedding or celebration date in Hazaribagh below to immediately reserve your slot on WhatsApp."
    }
  },

  // ACADEMY BANNER PROMO
  academyBanner: {
    badge: "Sakshi Mehndi Academy",
    title: "Master The Art of Mehndi & Build Your Creative Passion",
    lead: "Whether you are holding a cone for the very first time or an artist looking to master complex bridal figurines and symmetry, our hands-on masterclasses provide step-by-step guidance, personal feedback, and complete starter kits.",
    image: "assets/images/teach_mehndi.jpg",
    perks: [
      "Physical Practice Kit Delivered",
      "1-on-1 Personalized Work Critique",
      "Step-by-Step Motif & Figure Breakdown",
      "Lifetime WhatsApp Mentorship Community"
    ]
  },

  // AFTERCARE STEPS
  aftercareSteps: [
    {
      num: "01",
      title: "Keep Henna On 6-8 Hours",
      desc: "Allow the natural lawsone dye to bond deeply with your skin keratin. Overnight is ideal for brides."
    },
    {
      num: "02",
      title: "Lemon & Sugar Glaze",
      desc: "Dab a warm mixture of lemon juice and sugar once dried to seal the henna paste firmly against cracking."
    },
    {
      num: "03",
      title: "No Water for 12-24 Hours",
      desc: "Gently scrape off the crust using coconut oil or balm. Strictly avoid direct water or soap on day one."
    },
    {
      num: "04",
      title: "Apply Gentle Clove Heat",
      desc: "Hover hands gently over warm roasted cloves or apply natural balm. Stain peaks within 48 hours!"
    }
  ],

  // SERVICES (NO HARDCODED PRICES - ALL ON ENQUIRY)
  services: [
    {
      id: "srv-1",
      title: "Haute Couture Bridal Mehndi",
      subtitle: "Custom Wedding Storytelling",
      description: "Elaborate bridal jaal, portrait silhouettes, wedding dates, and vows for hands and feet.",
      features: [
        "Hands up to elbows & feet up to calves",
        "Custom portrait motifs & wedding date",
        "100% organic dark-stain henna cones",
        "Complimentary aftercare sealant"
      ],
      category: "Bridal"
    },
    {
      id: "srv-2",
      title: "Sangeet & Engagement Mehndi",
      subtitle: "Modern Festive Elegance",
      description: "Wrist-to-palm coverage designed to highlight your engagement ring and celebratory outfit.",
      features: [
        "Front & back both hands",
        "Wrist to forearm coverage",
        "Delicate lotus mandalas & vines"
      ],
      category: "Celebration"
    },
    {
      id: "srv-3",
      title: "Guest & Bridesmaid Henna",
      subtitle: "Family & Celebration Henna",
      description: "Delicate palm patterns and wrist bracelets for wedding guests, cousins, and bridesmaids.",
      features: [
        "Quick, clean application per guest",
        "Arabic, Indo-Western & mandalas",
        "Assistant artist available for big groups"
      ],
      category: "Party"
    },
    {
      id: "srv-4",
      title: "Festive & Occasion Specials",
      subtitle: "Teej, Karwa Chauth & Festivals",
      description: "Auspicious traditional designs, blooming florals, and sacred protective charms.",
      features: [
        "Festive mandalas & fine jaali",
        "Guaranteed dark mahogany stain",
        "Studio & doorstep visits in Hazaribagh"
      ],
      category: "Festive"
    }
  ],

  // GALLERY ARTWORKS (EXPANDED RICH CATEGORIES)
  gallery: [
    {
      id: "art-1",
      title: "Royal Velvet Bridal Jaal",
      category: "bridal",
      categoryLabel: "Bridal Couture",
      image: "assets/images/bridal_hero.jpg",
      description: "Intricate bridal jaali with royal peacocks and floral cuffs."
    },
    {
      id: "art-2",
      title: "Modern Gulf Arabic Shaded Flora",
      category: "arabic",
      categoryLabel: "Arabic & Gulf Flow",
      image: "assets/images/arabic_art.jpg",
      description: "Contemporary Gulf Arabic with deep gradient shading and vines."
    },
    {
      id: "art-3",
      title: "Petal Lotus Palm Mandala",
      category: "minimal",
      categoryLabel: "Lotus Mandala & Minimal",
      image: "assets/images/mandala_art.jpg",
      description: "Symmetrical lotus mandala with delicate finger lace bands."
    },
    {
      id: "art-4",
      title: "Ornate Bridal Feet Payal Art",
      category: "feet",
      categoryLabel: "Bridal Feet & Payal",
      image: "assets/images/feet_art.jpg",
      description: "Architectural bridal feet henna replicating an ornate silver payal."
    },
    {
      id: "art-5",
      title: "Haute Couture Bridal Hands",
      category: "bridal",
      categoryLabel: "Bridal Couture",
      image: "assets/images/bridal_hero.jpg",
      description: "Full forearm bridal mehndi with custom wedding motifs."
    },
    {
      id: "art-6",
      title: "Symmetric Practice Master Mandala",
      category: "festive",
      categoryLabel: "Festive & Sangeet",
      image: "assets/images/teach_mehndi.jpg",
      description: "Geometrically balanced multi-tiered festive mandala."
    },
    {
      id: "art-7",
      title: "Delicate Haathphool Jewelry Glove",
      category: "jewelry",
      categoryLabel: "Jewelry & Finger Art",
      image: "assets/images/arabic_art.jpg",
      description: "Glove-style jewelry henna with ring cuffs and trailing finger vines."
    },
    {
      id: "art-8",
      title: "Dainty Crescent & Pearl Vines",
      category: "minimal",
      categoryLabel: "Lotus Mandala & Minimal",
      image: "assets/images/mandala_art.jpg",
      description: "Soft crescent-shaped floral arch with subtle dot chains."
    }
  ],

  // STORE PRODUCTS / MEHNDI ITEMS (NO HARDCODED PRICES - ALL ON ENQUIRY)
  products: [
    {
      id: "prod-1",
      name: "Organic Sojat Bridal Henna Cones (Pack of 5)",
      category: "cones",
      rating: 4.9,
      reviewsCount: 142,
      badge: "Bestseller",
      inStock: true,
      image: "assets/images/henna_cones.jpg",
      description: "Hand-rolled 0.38mm micro-tip cones with pure Sojat henna and essential oils for rich dark stain.",
      weight: "5 x 30g cones"
    },
    {
      id: "prod-2",
      name: "Deluxe Bridal Cones Master Box (Pack of 12)",
      category: "cones",
      rating: 5.0,
      reviewsCount: 88,
      badge: "Best Value",
      inStock: true,
      image: "assets/images/henna_cones.jpg",
      description: "Bridal party pack of 12 fresh organic cones formulated for smooth, unbroken bridal linework.",
      weight: "12 x 30g cones"
    },
    {
      id: "prod-3",
      name: "Pure Rajasthani Sojat Henna Powder (250g Pouch)",
      category: "powder",
      rating: 4.8,
      reviewsCount: 96,
      badge: "100% Pure",
      inStock: true,
      image: "assets/images/henna_powder.jpg",
      description: "Triple cloth-filtered, body art quality (BAQ) raw henna powder with high natural dye release.",
      weight: "250 Grams"
    },
    {
      id: "prod-4",
      name: "Eucalyptus & Cajeput Stain Booster Oil (30ml)",
      category: "oils",
      rating: 4.9,
      reviewsCount: 65,
      badge: "Natural Booster",
      inStock: true,
      image: "assets/images/henna_powder.jpg",
      description: "Pure steam-distilled essential oil blend to naturally deepen and darken henna stains.",
      weight: "30 ml dropper"
    },
    {
      id: "prod-5",
      name: "Acrylic Reusable Practice Hand & Grid Sheets",
      category: "tools",
      rating: 4.9,
      reviewsCount: 110,
      badge: "Workshop Favorite",
      inStock: true,
      image: "assets/images/practice_board.jpg",
      description: "Durable clear acrylic hand mannequin with laminated grid sheets for endless practice. Wipe clean.",
      weight: "Life-size board"
    },
    {
      id: "prod-6",
      name: "Henna Artist Starter Practice Toolkit",
      category: "kits",
      rating: 5.0,
      reviewsCount: 52,
      badge: "Complete Set",
      inStock: true,
      image: "assets/images/teach_mehndi.jpg",
      description: "Complete practice set: Acrylic hand, organic cones, Sojat henna powder, oil, and design sheets.",
      weight: "Complete Kit Box"
    }
  ],

  // TEACH / ACADEMY COURSES (NO FEES - ALL ON ENQUIRY)
  courses: [
    {
      id: "masterclass-pro",
      title: "Professional Mehndi Artistry Masterclass",
      badge: "Hands-on Masterclass",
      mode: "Hazaribagh Studio Workshop",
      image: "assets/images/teach_mehndi.jpg",
      description: "Comprehensive hands-on training taking you from cone holding and pressure control to intricate bridal jaal, Gulf Arabic flow, and figure compositions. Open to beginners and passionate learners.",
      curriculum: [
        "Cone grip ergonomics, pressure control & line precision",
        "Traditional bridal jaali, peacocks & sacred florals",
        "Modern Gulf Arabic shading & negative space flow",
        "100% natural organic henna paste preparation & cone rolling"
      ],
      kitText: "Complete Practice Kit Included: Acrylic practice board, fresh organic cones, worksheets & Certificate."
    }
  ],

  // CLIENT REVIEWS
  reviews: [
    {
      id: "rev-1",
      name: "Pooja Verma",
      role: "Bride",
      city: "Matwari, Hazaribagh",
      rating: 5,
      date: "Wedding Client",
      comment: "Sakshi did my bridal mehndi for my wedding at Canary Inn. The dulha-dulhan portrait and fine jaal were so neat, sabhi rishtedaar tareef kar rahe the. The dark brown color came out so rich and lasted over two weeks with zero chemical smell!"
    },
    {
      id: "rev-2",
      name: "Neha Gupta",
      role: "Bride",
      city: "Babugaon, Hazaribagh",
      rating: 5,
      date: "Bridal Client",
      comment: "Booked Diya Sakshi for my wedding at our home in Babugaon. She is so polite, calm, and patient. The peacock artwork was stunning, and her clove steam aftercare tip gave the darkest maroon stain. Best mehndi artist in Hazaribagh!"
    },
    {
      id: "rev-3",
      name: "Priyanka Singh",
      role: "Sangeet Host",
      city: "Korrah, Hazaribagh",
      rating: 5,
      date: "Family Event",
      comment: "Diya and her assistant applied mehndi for all our cousins and family during my sister's Sangeet. Unka speed aur neatness dono kamaal ka tha. Hazaribagh me aisi professional artist milna sach me bahut badi baat hai."
    },
    {
      id: "rev-4",
      name: "Shreya Sinha",
      role: "Bride",
      city: "Hurhuru, Hazaribagh",
      rating: 5,
      date: "Wedding Client",
      comment: "I visited her studio in Hurhuru for bridal consultation and she customized the design exactly as I wanted. Her cones are 100% natural, no itching or skin reaction at all, and the stain color was pure dark mahogany on my wedding day!"
    }
  ],

  // FAQ ITEMS FOR SEO SCHEMA
  faqs: [
    {
      q: "How far in advance should I book my bridal mehndi?",
      a: "For wedding season, we recommend reserving your bridal date 2 to 3 months in advance to ensure our lead artist's availability."
    },
    {
      q: "Are your henna cones 100% natural and safe?",
      a: "Yes, absolutely! We strictly hand-blend our cones using organic Rajasthani Sojat henna powder, lemon juice, sugar, and pure therapeutic essential oils (eucalyptus, lavender, cajeput). We NEVER use black henna, PPD, or chemical dye boosters."
    },
    {
      q: "How do I get the darkest mehndi stain for my wedding day?",
      a: "Keep the paste on your skin for at least 6-8 hours (or overnight). Apply a light lemon-sugar glaze once dry. When removing, scrape it off gently without using water for the first 12-24 hours. Rub mustard oil or coconut balm and avoid soap exposure."
    },
    {
      q: "How can I book bridal or guest mehndi in Hazaribagh?",
      a: "Simply tap any 'Book on WhatsApp' button on our website or message us directly on WhatsApp with your event date and venue in Hazaribagh. We will promptly confirm our availability and share our bridal packages!"
    }
  ]
};

// Data service helper with LocalStorage sync
const DataService = {
  STORAGE_KEY: "mehndi_atelier_data_v4",

  load() {
    try {
      // Clean up legacy keys that may have old sample data
      ['mehndi_atelier_data', 'mehndi_atelier_data_v2', 'mehndi_atelier_data_v3'].forEach(key => {
        const val = localStorage.getItem(key);
        if (val && (val.includes("Aura") || val.includes("aura") || val.includes("Sacred Artistry"))) {
          localStorage.removeItem(key);
        }
      });

      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        // Discard cache if it contains any legacy sample text
        if (stored.toLowerCase().includes("aura")) {
          localStorage.removeItem(this.STORAGE_KEY);
          return DEFAULT_MEHNDI_DATA;
        }
        const parsed = JSON.parse(stored);
        return {
          ...DEFAULT_MEHNDI_DATA,
          ...parsed,
          profile: { ...DEFAULT_MEHNDI_DATA.profile, ...(parsed.profile || {}) },
          hero: { ...DEFAULT_MEHNDI_DATA.hero, ...(parsed.hero || {}) },
          sectionHeaders: { ...DEFAULT_MEHNDI_DATA.sectionHeaders, ...(parsed.sectionHeaders || {}) },
          academyBanner: { ...DEFAULT_MEHNDI_DATA.academyBanner, ...(parsed.academyBanner || {}) }
        };
      }
    } catch (e) {
      console.warn("Failed to read from localStorage:", e);
    }
    return DEFAULT_MEHNDI_DATA;
  },

  save(data) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
      window.dispatchEvent(new CustomEvent("mehndi_data_updated", { detail: data }));
      return true;
    } catch (e) {
      console.error("Failed to save to localStorage:", e);
      return false;
    }
  },

  reset() {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
      localStorage.removeItem("mehndi_atelier_data_v3");
      localStorage.removeItem("mehndi_atelier_data_v2");
      localStorage.removeItem("mehndi_atelier_data");
      window.dispatchEvent(new CustomEvent("mehndi_data_updated", { detail: DEFAULT_MEHNDI_DATA }));
      return true;
    } catch (e) {
      console.error("Failed to reset localStorage:", e);
      return false;
    }
  },

  // Add a Customer Review
  addReview(newReview) {
    const data = this.load();
    data.reviews = data.reviews || [];
    data.reviews.unshift({
      id: `rev-${Date.now()}`,
      ...newReview,
      date: "Just Now"
    });
    this.save(data);
    return true;
  }
};
