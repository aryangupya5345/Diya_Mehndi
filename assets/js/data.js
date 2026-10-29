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
    workingHours: "Mon - Sun: 9:00 AM - 8:30 PM (By Prior Appointment)",
    instagram: "https://instagram.com/auramehndi.art",
    instagramHandle: "@sakshimehndi.art",
    googleMapsUrl: "https://maps.google.com/?q=Bridal+Mehndi+Artist",
    announcement: "Wedding & Festive Season Bookings Open! Reserve your bridal date early.",
    aboutBio: "Welcome to Sakshi Mehndi Atelier. With over 5+ years of dedicated artistry and 100+ cherished brides adorned, we blend authentic Rajasthani heritage with contemporary floral and Gulf elegance. Every stroke is crafted using 100% natural, triple-sifted Sojat henna powder infused with pure eucalyptus and lavender oils, ensuring a rich, deep mahogany stain for your most magical celebrations.",
    yearsExperience: "5+",
    bridesDressed: "100+",
    rating: "4.9★"
  },

  // HERO & HOMEPAGE TEXTS
  hero: {
    tag1: "Haute Couture Bridal Henna",
    tag2: "100% Pure Organic Sojat Harvest",
    headlineMain: "Sacred Artistry For Your",
    headlineHighlight: "Most Cherished",
    headlineEnd: "Celebrations",
    lead: "Bespoke bridal storytelling motifs, customized love-story elements, and pure organic dark-stain henna crafted to make you look and feel unforgettable.",
    image: "assets/images/bridal_hero.jpg",
    badgeTitle: "Pure Organic Henna Guaranteed",
    badgeText: "Natural Sojat harvest • Therapeutic botanical oils • Zero chemicals"
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
      title: "Curated Mehndi Artworks",
      subtitle: "Explore our signature design categories. Tap any artwork to zoom or tap 'Enquire' to discuss this style for your event."
    },
    services: {
      tag: "Bespoke Celebrations",
      title: "Bridal & Occasion Artistry",
      subtitle: "Every appointment is customized to complement your bridal lehenga, jewelry, and love story. Enquire for personalized pricing."
    },
    shop: {
      tag: "Pure Botanical Supplies",
      title: "The Mehndi Atelier Shop",
      subtitle: "Freshly blended organic bridal cones, triple-filtered Rajasthani powder, essential booster oils, and acrylic practice tools."
    },
    academy: {
      tag: "Learn & Grow",
      title: "Masterclass Programs & Workshops",
      subtitle: "Master the craft of henna with comprehensive hands-on guidance and dedicated personalized mentorship."
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
      title: "Pricing & Booking Enquiry",
      subtitle: "Share your wedding or celebration details below to receive availability and quotation on WhatsApp."
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
      subtitle: "Personalized Wedding Storytelling",
      description: "Elaborate coverage for both hands (elbow-length) and feet (mid-calf). Includes customized groom & bride portrait motifs, wedding date, vows, and sacred wedding symbols.",
      duration: "4 - 6 Hours",
      features: [
        "Custom Portrait & Motifs",
        "Both Hands up to Elbows",
        "Feet up to Mid-calf",
        "100% Organic Dark-Stain Cones Included",
        "Complimentary Aftercare Kit & Sealant"
      ],
      category: "Bridal"
    },
    {
      id: "srv-2",
      title: "Sangeet & Engagement Mehndi",
      subtitle: "Elegance & Modern Charm",
      description: "Exquisite front and back wrist-to-palm coverage designed to highlight your engagement ring and celebratory outfit. Fast-staining and delightfully fragrant.",
      duration: "2 - 3 Hours",
      features: [
        "Front & Back Both Hands",
        "Wrist to Mid-forearm coverage",
        "Floral & Delicate Mandala Patterns",
        "Jewelry Style Ring Bel & Cuffs"
      ],
      category: "Celebration"
    },
    {
      id: "srv-3",
      title: "Guest & Bridesmaid Party Henna",
      subtitle: "Fast, Flawless Designs for Family & Friends",
      description: "Stunning one-side palms or delicate wrist bracelets for wedding guests, cousins, and bridesmaids. Keeps the celebration vibrant and joyful.",
      duration: "15 mins per hand",
      features: [
        "Quick 10-15 min application per guest",
        "Arabic, Indo-Western & Mandala styles",
        "Dedicated assistant artist options for big parties",
        "Ideal for Mehendi & Haldi celebrations"
      ],
      category: "Party"
    },
    {
      id: "srv-4",
      title: "Festive & Occasion Specials",
      subtitle: "Karwa Chauth, Teej, Eid & Diwali",
      description: "Auspicious festive designs featuring moon motifs, traditional blooming flowers, and protective charms. Special festival appointment slots available.",
      duration: "45 - 90 mins",
      features: [
        "Festive Mandalas & Fine Jaali",
        "Dark Mahogany 24-hr Stain",
        "Express Studio Appointments",
        "Natural Herbal Henna Formula"
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
      description: "Intricate bridal artwork combining delicate jaali grids, royal peacocks, and floral cuffs extending up the forearms. Stained with organic Sojat paste.",
      tags: ["Bridal", "Full Hand", "Traditional", "Royal Jaal"]
    },
    {
      id: "art-2",
      title: "Modern Gulf Arabic Shaded Flora",
      category: "arabic",
      categoryLabel: "Arabic & Gulf Flow",
      image: "assets/images/arabic_art.jpg",
      description: "Contemporary Arabic henna with deep gradient shading, bold borders, and graceful vine trails over the back of the hand.",
      tags: ["Arabic", "Back Hand", "Floral Shading", "Modern Flow"]
    },
    {
      id: "art-3",
      title: "Petal Lotus Palm Mandala",
      category: "minimal",
      categoryLabel: "Lotus Mandala & Minimal",
      image: "assets/images/mandala_art.jpg",
      description: "Centered sacred lotus mandala with symmetrical lace rings, delicate finger lace bands, and airy negative space.",
      tags: ["Mandala", "Lotus", "Minimalist", "Front Hand"]
    },
    {
      id: "art-4",
      title: "Ornate Bridal Feet Payal Art",
      category: "feet",
      categoryLabel: "Bridal Feet & Payal",
      image: "assets/images/feet_art.jpg",
      description: "Architectural bridal feet henna replicating an ornate silver payal anklet with delicate jaal and sculpted toe leaf accents.",
      tags: ["Bridal Feet", "Payal Anklet", "Intricate", "Bridal"]
    },
    {
      id: "art-5",
      title: "Haute Couture Bridal Hands",
      category: "bridal",
      categoryLabel: "Bridal Couture",
      image: "assets/images/bridal_hero.jpg",
      description: "High-density bridal mehndi designed for the main wedding day, highlighting wedding rings and bridal jewelry.",
      tags: ["Bridal", "Wedding Day", "Full Arms", "Story Motif"]
    },
    {
      id: "art-6",
      title: "Symmetric Practice Master Mandala",
      category: "festive",
      categoryLabel: "Festive & Sangeet",
      image: "assets/images/teach_mehndi.jpg",
      description: "Geometrically balanced multi-tiered festive mandala designed for Karwa Chauth, Teej, and Sangeet celebrations.",
      tags: ["Festive", "Mandala", "Handcrafted", "Sangeet"]
    },
    {
      id: "art-7",
      title: "Delicate Haathphool Jewelry Glove",
      category: "jewelry",
      categoryLabel: "Jewelry & Finger Art",
      image: "assets/images/arabic_art.jpg",
      description: "Glove-style jewelry mehndi recreating delicate stone chains, ring cuffs, and trailing finger vines for modern bridesmaids.",
      tags: ["Jewelry", "Finger Bel", "Ring Cuffs", "Modern"]
    },
    {
      id: "art-8",
      title: "Dainty Crescent & Pearl Vines",
      category: "minimal",
      categoryLabel: "Lotus Mandala & Minimal",
      image: "assets/images/mandala_art.jpg",
      description: "Soft crescent-shaped floral arch with subtle dot chains and pearl clusters, perfect for minimalist lovers.",
      tags: ["Minimalist", "Crescent", "Dainty", "Back Hand"]
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
      description: "Hand-rolled micro-tip 0.38mm cones filled with 100% pure Rajasthani Sojat henna, therapeutic eucalyptus, cajeput & tea tree oils. Delivers rich, dark mahogany stains within 24-48 hours. No chemical preservatives, no PPD.",
      weight: "30g each cone",
      shelfLife: "Keep frozen up to 6 months"
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
      description: "Complete bridal party pack. 12 fresh organic henna cones formulated specifically for deep bridal color and smooth, unbroken linework. Packed fresh for dispatch.",
      weight: "12 x 30g cones",
      shelfLife: "Keep frozen up to 6 months"
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
      description: "Triple cloth-filtered, ultra-fine body art quality (BAQ) raw henna powder harvested directly from Sojat, Rajasthan. Smooth creamy paste with exceptional dye release.",
      weight: "250 Grams",
      shelfLife: "2 Years in cool dry place"
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
      description: "100% pure steam-distilled eucalyptus and cajeput essential oil blend. High monoterpene content drastically darkens henna stains and provides a relaxing aroma.",
      weight: "30 ml glass dropper bottle",
      shelfLife: "3 Years"
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
      description: "Durable clear acrylic hand mannequin for endless mehndi practice. Wipe clean with a damp cloth or oil. Includes laminated practice grid sheets for lines, checks, and vines.",
      weight: "Life-size hand + sheets",
      shelfLife: "Reusable Lifetime"
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
      description: "Everything a student or enthusiast needs: Acrylic Practice Hand, Fresh Organic Cones, Sojat Henna Powder, Essential Oil, Empty Cello Sheets, and Practice Guidebook.",
      weight: "Complete Kit Box",
      shelfLife: "Complete Set"
    }
  ],

  // TEACH / ACADEMY COURSES (NO FEES - ALL ON ENQUIRY)
  courses: [
    {
      id: "course-1",
      title: "Foundations to Professional Bridal Artist",
      level: "Beginner to Advanced",
      duration: "4 Weeks (16 Live Sessions)",
      badge: "Most Popular",
      mode: "Studio Workshop & Live Online",
      nextBatch: "Starts 15th of Next Month",
      seats: "Limited to 6 students per batch",
      image: "assets/images/teach_mehndi.jpg",
      description: "Our comprehensive mentorship program taking you from holding a cone to independently designing intricate bridal patterns and figures.",
      curriculum: [
        "Cone holding ergonomics & pressure control secrets",
        "Mastering geometric jaali, paisleys & sacred florals",
        "Bridal figure sketching (Doli, Groom, Bride, Shehnai)",
        "Organic henna paste making, filtration & cone rolling",
        "Client consultation, bridal layout & styling secrets"
      ],
      includes: [
        "Complete Practice Kit delivered to your address",
        "Acrylic practice hand & laminated workbook sheets",
        "Certificate of Completion",
        "Lifetime WhatsApp Alumni Mentorship Community",
        "Real bridal client shadowing opportunities"
      ]
    },
    {
      id: "course-2",
      title: "Gulf Arabic & Modern Shading Masterclass",
      level: "Intermediate",
      duration: "2 Weeks (8 Sessions)",
      badge: "High Demand",
      mode: "Live Interactive Hybrid",
      nextBatch: "Upcoming Weekend Batch",
      seats: "Small interactive group",
      image: "assets/images/arabic_art.jpg",
      description: "Master modern Gulf Arabic designs, deep shading techniques, negative space composition, and intricate jewel finger cuffs.",
      curriculum: [
        "Architectural flow & negative space aesthetics",
        "Gradient leaf and rose shading techniques",
        "Trending Dubai & Moroccan fusion patterns",
        "Fast-speed party mehndi execution tips"
      ],
      includes: [
        "Arabic Design Workbook (50+ Motifs)",
        "Fresh Micro-Tip Practice Cones",
        "Individual 1-on-1 critique on all assignments",
        "Certificate of Achievement"
      ]
    },
    {
      id: "course-3",
      title: "Bridal Figure & Dulha-Dulhan Intensive",
      level: "Specialized Masterclass",
      duration: "2-Day Weekend Bootcamp (8 Hours)",
      badge: "Specialized",
      mode: "Studio Workshop & Zoom HD",
      nextBatch: "This Saturday & Sunday",
      seats: "Only 4 seats per batch",
      image: "assets/images/bridal_hero.jpg",
      description: "Master human figure sketching without fear. Learn step-by-step anatomical grid formulas for lifelike bride and groom portraits.",
      curriculum: [
        "Proportions of bridal side-profile & front-profile",
        "Realistic eyes, jewelry detailing & bridal veil jaal",
        "Groom turban, sherwani folds & garland symmetry",
        "Fixing mistakes on bridal skin seamlessly"
      ],
      includes: [
        "Step-by-Step Face Grid Templates",
        "Personalized live correction during workshop",
        "Certificate of Completion"
      ]
    }
  ],

  // CLIENT REVIEWS
  reviews: [
    {
      id: "rev-1",
      name: "Pooja Sharma",
      role: "Bride",
      city: "Hazaribagh",
      rating: 5,
      date: "Last Week",
      comment: "Sakshi Mehndi made my wedding dreams come true! The color was the deepest, richest mahogany I have ever seen, and the organic henna smelled pure and soothing. She customized our love story into the jaal with such finesse. Truly the most talented artist!"
    },
    {
      id: "rev-2",
      name: "Ananya Iyer",
      role: "Bridal Client",
      city: "Ranchi",
      rating: 5,
      date: "2 Weeks Ago",
      comment: "Booked Sakshi for my wedding and my sisters' sangeet. The speed and precision of her lines are unbelievable. Two days later, my hands were a deep dark maroon. All my guests were showering compliments!"
    },
    {
      id: "rev-3",
      name: "Rhea Khurana",
      role: "Sangeet Host",
      city: "Jamshedpur",
      rating: 5,
      date: "1 Month Ago",
      comment: "Ordered fresh cones for my sister's Sangeet night and booked Sakshi. The cones flowed like butter with zero clogging, and the stain turned so dark and gorgeous. Highly recommend her services to every bride!"
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
      q: "How can I enquire about pricing for bridal or guest mehndi?",
      a: "Simply tap any 'Enquire for Pricing' button on our website or message us directly on WhatsApp with your event date and venue. We will promptly share our brochure and customized quotation."
    }
  ]
};

// Data service helper with LocalStorage sync
const DataService = {
  STORAGE_KEY: "mehndi_atelier_data_v2",

  load() {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
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
