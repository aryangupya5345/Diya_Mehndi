/**
 * Sakshi Mehndi Atelier & Academy - Client-facing Application Logic
 * Supports Glassmorphic UI, Light/Dark Theme Switching, Customer Reviews, and Dynamic Section Sync
 */

// Global Application State
const AppState = {
  data: null,
  cart: [],
  activeGalleryCategory: 'all',
  selectedArt: null,
  currentTheme: 'dark',
  userReviewRating: 5
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  AppState.data = DataService.load();

  // Render all dynamic components
  renderAllSections();

  // UI Event Listeners
  initNavigation();
  initModals();
  initReviewSubmission();
  initHorizontalWheelScroll();
  initScrollRevealAnimations();

  // Listen for Live Admin Updates
  window.addEventListener('mehndi_data_updated', (e) => {
    AppState.data = e.detail;
    renderAllSections();
    showToast("✨ Website updated with your latest changes!");
  });
});

/* ==========================================================================
   THEME SWITCHER (LIGHT & DARK MODES)
   ========================================================================== */
function getSystemTheme() {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function initTheme() {
  const userSet = localStorage.getItem('mehndi_theme_user_set');
  const saved = userSet ? localStorage.getItem('mehndi_theme') : null;
  const initialTheme = saved || getSystemTheme();
  setTheme(initialTheme, false);

  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('mehndi_theme_user_set')) {
        setTheme(e.matches ? 'dark' : 'light', false);
      }
    });
  }

  document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
    btn.addEventListener('click', toggleTheme);
  });
}

function toggleTheme() {
  const next = AppState.currentTheme === 'light' ? 'dark' : 'light';
  setTheme(next, true);
  showToast(`Switched to ${next === 'dark' ? 'Royal Midnight Dark' : 'Pearl Champagne Light'} theme! 🎨`);
}

function setTheme(theme, persist = false) {
  AppState.currentTheme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  if (persist) {
    localStorage.setItem('mehndi_theme_user_set', 'true');
    localStorage.setItem('mehndi_theme', theme);
  }

  document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
    btn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
    btn.setAttribute('title', `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`);
  });
}

/* ==========================================================================
   RENDER ALL DYNAMIC SECTIONS
   ========================================================================== */
function renderAllSections() {
  renderProfileData();
  renderHero();
  renderTrustPillars();
  renderSectionHeaders();
  renderAcademyBanner();
  renderAftercareSteps();
  renderGallery();
  renderServices();
  renderProducts();
  renderCourses();
  renderReviews();
}

/* --------------------------------------------------------------------------
   PROFILE & BRAND DETAILS
   -------------------------------------------------------------------------- */
function renderProfileData() {
  const p = AppState.data.profile;
  if (!p) return;

  // Announcement Bar
  const announceEl = document.getElementById('announcement-text');
  if (announceEl) announceEl.textContent = p.announcement || '';
  const announceDup = document.querySelector('.announcement-text-content-dup');
  if (announceDup) announceDup.textContent = p.announcement || '';

  // Dynamic Brand Text
  document.querySelectorAll('.brand-dynamic-name').forEach(el => el.textContent = p.brandName);
  document.querySelectorAll('.brand-dynamic-artist').forEach(el => el.textContent = p.artistName);
  document.querySelectorAll('.brand-dynamic-tagline').forEach(el => el.textContent = p.tagline);
  document.querySelectorAll('.brand-dynamic-city').forEach(el => el.textContent = p.city);
  document.querySelectorAll('.brand-dynamic-address').forEach(el => el.textContent = p.address);
  document.querySelectorAll('.brand-dynamic-phone').forEach(el => {
    el.textContent = p.phone;
    if (el.tagName === 'A') el.href = `tel:${p.phone.replace(/[^0-9+]/g, '')}`;
  });
  document.querySelectorAll('.brand-dynamic-phone-link').forEach(el => {
    el.href = `tel:${(p.phone || '+917564969450').replace(/[^0-9+]/g, '')}`;
  });
  document.querySelectorAll('.brand-dynamic-whatsapp-link').forEach(el => {
    const num = (p.whatsapp || '917564969450').replace(/[^0-9]/g, '');
    el.href = `https://wa.me/${num}?text=Hi%2C%20I'd%20like%20to%20inquire%20about%20bridal%20mehndi%20dates%20and%20rates%20in%20Hazaribagh.`;
  });

  const bioEl = document.getElementById('about-bio-text');
  if (bioEl) bioEl.textContent = p.aboutBio;

  // Stats (100+ Brides, 5+ Years)
  const statYears = document.getElementById('stat-years');
  const statBrides = document.getElementById('stat-brides');
  if (statYears) statYears.textContent = p.yearsExperience || '5+';
  if (statBrides) statBrides.textContent = p.bridesDressed || '100+';

  // Social & Maps Links
  document.querySelectorAll('.dynamic-instagram-link').forEach(link => {
    link.href = p.instagram;
    const txt = link.querySelector('.ig-handle-text');
    if (txt) txt.textContent = p.instagramHandle;
  });

  document.querySelectorAll('.dynamic-map-link').forEach(link => link.href = p.googleMapsUrl);

  updateWhatsAppLinks();
}

function updateWhatsAppLinks() {
  const p = AppState.data.profile;
  const whatsappNum = (p.whatsapp || '917564969450').replace(/[^0-9]/g, '');

  const heroWa = document.getElementById('hero-whatsapp-btn');
  if (heroWa) {
    const text = encodeURIComponent(`Hello ${p.brandName}! I want to book bridal mehndi for my upcoming wedding/function in Hazaribagh. Please check date availability and package details.`);
    heroWa.href = `https://wa.me/${whatsappNum}?text=${text}`;
  }

  const floatWa = document.getElementById('floating-whatsapp-btn');
  if (floatWa) {
    const text = encodeURIComponent(`Hello ${p.brandName}! I visited your website and would like to book a Mehndi appointment in Hazaribagh.`);
    floatWa.href = `https://wa.me/${whatsappNum}?text=${text}`;
  }

  const mobCall = document.getElementById('mobile-call-btn');
  if (mobCall) {
    mobCall.href = `tel:${(p.phone || '+917564969450').replace(/[^0-9+]/g, '')}`;
  }

  const mobWa = document.getElementById('mobile-wa-btn');
  if (mobWa) {
    const text = encodeURIComponent(`Hi ${p.brandName}! I'd like to check date availability and package rates in Hazaribagh.`);
    mobWa.href = `https://wa.me/${whatsappNum}?text=${text}`;
  }
}

/* --------------------------------------------------------------------------
   HERO SECTION
   -------------------------------------------------------------------------- */
function renderHero() {
  const h = AppState.data.hero;
  if (!h) return;

  const tag1El = document.getElementById('hero-tag-1');
  const tag2El = document.getElementById('hero-tag-2');
  const leadEl = document.getElementById('hero-lead-text');
  const imgEl = document.getElementById('hero-showcase-img');
  const badgeTitleEl = document.getElementById('hero-badge-title');
  const badgeTextEl = document.getElementById('hero-badge-text');

  if (tag1El) tag1El.textContent = h.tag1;
  if (tag2El) tag2El.textContent = h.tag2;
  if (leadEl) leadEl.textContent = h.lead;
  if (imgEl && h.image) imgEl.src = h.image;
  if (badgeTitleEl) badgeTitleEl.textContent = h.badgeTitle;
  if (badgeTextEl) badgeTextEl.textContent = h.badgeText;

  const headlineEl = document.getElementById('hero-headline-title');
  if (headlineEl) {
    headlineEl.innerHTML = `${h.headlineMain} <span class="text-gold">${h.headlineHighlight}</span> ${h.headlineEnd}`;
  }
}

/* --------------------------------------------------------------------------
   TRUST PILLARS
   -------------------------------------------------------------------------- */
function renderTrustPillars() {
  const container = document.getElementById('trust-grid');
  if (!container) return;

  const pillars = AppState.data.trustPillars || [];
  container.innerHTML = pillars.map(tp => `
    <div class="trust-card glass-card">
      <div class="trust-icon">${tp.icon}</div>
      <div>
        <h4 class="trust-title">${tp.title}</h4>
        <p class="trust-desc">${tp.desc}</p>
      </div>
    </div>
  `).join('');
}

/* --------------------------------------------------------------------------
   SECTION HEADERS
   -------------------------------------------------------------------------- */
function renderSectionHeaders() {
  const sh = AppState.data.sectionHeaders || {};

  const setHeader = (prefix, data) => {
    if (!data) return;
    const tagEl = document.getElementById(`${prefix}-tag`);
    const titleEl = document.getElementById(`${prefix}-title`);
    const subEl = document.getElementById(`${prefix}-subtitle`);
    if (tagEl) tagEl.textContent = data.tag;
    if (titleEl) {
      if (prefix === 'academy') {
        titleEl.innerHTML = `<a href="#contact" onclick="scrollToContactForm('Academy / Learn Mehndi Course'); return false;" class="masterclass-title-link" style="color: inherit; text-decoration: none; cursor: pointer;">${data.title}</a>`;
      } else {
        titleEl.textContent = data.title;
      }
    }
    if (subEl) subEl.textContent = data.subtitle;
  };

  setHeader('gallery', sh.gallery);
  setHeader('services', sh.services);
  setHeader('shop', sh.shop);
  setHeader('academy', sh.academy);
  setHeader('aftercare', sh.aftercare);
  setHeader('reviews', sh.reviews);
  setHeader('contact', sh.contact);

  const formTitle = document.getElementById('contact-form-title');
  if (formTitle && sh.contact?.title) {
    formTitle.textContent = sh.contact.title;
  }
}

/* --------------------------------------------------------------------------
   ACADEMY PROMO BANNER
   -------------------------------------------------------------------------- */
function renderAcademyBanner() {
  const ab = AppState.data.academyBanner;
  if (!ab) return;

  const badgeEl = document.getElementById('academy-promo-badge');
  const titleEl = document.getElementById('academy-promo-title');
  const leadEl = document.getElementById('academy-promo-lead');
  const imgEl = document.getElementById('academy-promo-img');
  const perksEl = document.getElementById('academy-promo-perks');

  if (badgeEl) badgeEl.textContent = ab.badge;
  if (titleEl) titleEl.innerHTML = ab.title.replace('Build Your Creative Passion', '<span>Build Your Creative Passion</span>');
  if (leadEl) leadEl.textContent = ab.lead;
  if (imgEl && ab.image) imgEl.src = ab.image;

  if (perksEl && ab.perks) {
    perksEl.innerHTML = ab.perks.map(p => `
      <div class="academy-perk-item">
        <span>✦</span> ${p}
      </div>
    `).join('');
  }
}

/* --------------------------------------------------------------------------
   AFTERCARE STEPS
   -------------------------------------------------------------------------- */
function renderAftercareSteps() {
  const container = document.getElementById('aftercare-grid');
  if (!container) return;

  const steps = AppState.data.aftercareSteps || [];
  container.innerHTML = steps.map(s => `
    <div class="aftercare-step-card glass-card">
      <div class="step-num">${s.num}</div>
      <h4 class="step-title">${s.title}</h4>
      <p class="step-desc">${s.desc}</p>
    </div>
  `).join('');
}

/* --------------------------------------------------------------------------
   GALLERY RENDER & FILTERING (PREVIEW ON HOME, FULL ON GALLERY.HTML)
   -------------------------------------------------------------------------- */
function renderGallery() {
  const items = AppState.data.gallery || [];
  const fullContainer = document.getElementById('gallery-grid');
  const previewContainer = document.getElementById('gallery-preview-grid');

  // Render curated preview on index.html
  if (previewContainer) {
    const previewItems = items.slice(0, 6);
    previewContainer.innerHTML = previewItems.map(item => `
      <article class="art-card glass-card" data-category="${item.category}">
        <div class="art-thumb-wrap" onclick="openLightbox('${item.id}')" role="button" tabindex="0" title="Click photo to preview" onkeydown="if(event.key==='Enter'||event.key===' '){openLightbox('${item.id}');event.preventDefault();}">
          <img src="${item.image}" alt="${item.title}" loading="lazy" decoding="async" />
          <span class="art-badge">${item.categoryLabel || item.category}</span>
          <button class="art-zoom-btn" onclick="event.stopPropagation(); openLightbox('${item.id}')" aria-label="Zoom Art" title="Zoom Photo">
            🔍
          </button>
        </div>
        <div class="art-body">
          <h3 class="art-title">${item.title}</h3>
          <p class="art-desc">${item.description || ''}</p>
          <div class="art-actions">
            <button class="btn btn-primary btn-sm" style="flex: 1;" onclick="bookArtViaWhatsApp('${item.title}', '${item.id}')">
              <span>💬 Book on WhatsApp</span>
            </button>
            <button class="btn btn-outline btn-sm" onclick="openLightbox('${item.id}')" title="Zoom Preview">
              <span>Preview</span>
            </button>
          </div>
        </div>
      </article>
    `).join('');
  }

  // Render complete gallery with search & categories on gallery.html
  if (fullContainer) {
    let filtered = AppState.activeGalleryCategory === 'all'
      ? items
      : items.filter(item => (item.category || '').toLowerCase() === AppState.activeGalleryCategory.toLowerCase());

    if (AppState.gallerySearchQuery) {
      const q = AppState.gallerySearchQuery.toLowerCase();
      filtered = filtered.filter(item =>
        (item.title || '').toLowerCase().includes(q) ||
        (item.description || '').toLowerCase().includes(q) ||
        (item.categoryLabel || '').toLowerCase().includes(q) ||
        (item.tags || []).some(t => t.toLowerCase().includes(q))
      );
    }

    if (filtered.length === 0) {
      fullContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; background: var(--theme-bg-subtle); border-radius: var(--radius-md);">
          <p style="color: var(--theme-text-muted); font-size: 1.1rem;">No artworks found matching your selection.</p>
          <button class="btn btn-gold btn-sm" style="margin-top: 1rem;" onclick="filterGallery('all'); const input = document.getElementById('gallery-search-input'); if(input) input.value='';">Reset Filter &amp; Show All</button>
        </div>
      `;
      return;
    }

    fullContainer.innerHTML = filtered.map(item => `
      <article class="art-card glass-card" data-category="${item.category}">
        <div class="art-thumb-wrap" onclick="openLightbox('${item.id}')" role="button" tabindex="0" title="Click photo to preview" onkeydown="if(event.key==='Enter'||event.key===' '){openLightbox('${item.id}');event.preventDefault();}">
          <img src="${item.image}" alt="${item.title}" loading="lazy" decoding="async" />
          <span class="art-badge">${item.categoryLabel || item.category}</span>
          <button class="art-zoom-btn" onclick="event.stopPropagation(); openLightbox('${item.id}')" aria-label="Zoom Art" title="Zoom Photo">
            🔍
          </button>
        </div>
        <div class="art-body">
          <h3 class="art-title">${item.title}</h3>
          <p class="art-desc">${item.description || ''}</p>
          <div class="art-actions">
            <button class="btn btn-primary btn-sm" style="flex: 1;" onclick="bookArtViaWhatsApp('${item.title}', '${item.id}')">
              <span>💬 Book on WhatsApp</span>
            </button>
            <button class="btn btn-outline btn-sm" onclick="openLightbox('${item.id}')" title="Zoom Preview">
              <span>Preview</span>
            </button>
          </div>
        </div>
      </article>
    `).join('');
  }
}

function handleGallerySearch(query) {
  AppState.gallerySearchQuery = (query || '').trim();
  renderGallery();
}

function filterGallery(category, btnElement) {
  AppState.activeGalleryCategory = category;

  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
  if (btnElement) {
    btnElement.classList.add('active');
  } else {
    const matched = document.querySelector(`.filter-btn[data-category="${category}"]`);
    if (matched) matched.classList.add('active');
  }

  renderGallery();
}

function bookArtViaWhatsApp(artTitle, artId) {
  const p = AppState.data.profile;
  const num = (p.whatsapp || '').replace(/[^0-9]/g, '');
  const msg = encodeURIComponent(`Hello ${p.brandName}! I want to book this design from your gallery: "${artTitle}" (Ref: ${artId}) for my upcoming function in Hazaribagh. Please confirm availability and booking details.`);
  window.open(`https://wa.me/${num}?text=${msg}`, '_blank');
}

/* --------------------------------------------------------------------------
   LIGHTBOX MODAL
   -------------------------------------------------------------------------- */
function openLightbox(artId) {
  const art = (AppState.data.gallery || []).find(a => a.id === artId);
  if (!art) return;

  AppState.selectedArt = art;
  const modal = document.getElementById('lightbox-modal');
  const img = document.getElementById('lightbox-img');
  const title = document.getElementById('lightbox-title');
  const desc = document.getElementById('lightbox-desc');

  if (img) img.src = art.image;
  if (title) title.textContent = art.title;
  if (desc) desc.textContent = art.description;

  modal.classList.add('open');
}

function closeLightbox() {
  const modal = document.getElementById('lightbox-modal');
  if (modal) modal.classList.remove('open');
}

function bookCurrentLightboxArt() {
  if (AppState.selectedArt) {
    bookArtViaWhatsApp(AppState.selectedArt.title, AppState.selectedArt.id);
  }
}

/* --------------------------------------------------------------------------
   SERVICES SECTION (ALL PRICES REMOVED - ENQUIRY OPTION)
   -------------------------------------------------------------------------- */
function renderServices() {
  const container = document.getElementById('services-grid');
  if (!container) return;

  const services = AppState.data.services || [];
  container.innerHTML = services.map(srv => `
    <div class="service-card glass-card">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.15rem;">
        <div class="service-icon-box" style="margin-bottom: 0;">⚜</div>
        <span class="quote-badge">Custom Bespoke Quote</span>
      </div>
      <h3 class="service-title">${srv.title}</h3>
      <p class="service-subtitle-text">${srv.subtitle || ''}</p>
      <p class="service-desc">${srv.description}</p>
      <ul class="service-features">
        ${(srv.features || []).map(f => `<li><span>✓</span> ${f}</li>`).join('')}
      </ul>
      <div style="margin-top: auto; padding-top: 1rem; width: 100%;">
        <button class="btn btn-primary" onclick="requestRateCardWhatsApp('${srv.title}')" style="width: 100%;">
          <span>Request Rate Card on WhatsApp</span>
        </button>
      </div>
    </div>
  `).join('');
}

function requestRateCardWhatsApp(serviceName) {
  const p = AppState.data.profile;
  const num = (p.whatsapp || '917564969450').replace(/[^0-9]/g, '');
  const encodedName = encodeURIComponent(serviceName);
  const url = `https://wa.me/${num}?text=Hi%2C%20I'd%20like%20to%20request%20the%20rate%20card%20and%20availability%20for%20the%20${encodedName}%20package.`;
  window.open(url, '_blank');
}

function enquireServiceWhatsApp(serviceName) {
  requestRateCardWhatsApp(serviceName);
}

/* --------------------------------------------------------------------------
   SELL MEHNDI ITEMS - SHOP SECTION (NO PRICES - ENQUIRY TO ORDER)
   -------------------------------------------------------------------------- */
function renderProducts() {
  const container = document.getElementById('shop-grid');
  if (!container) return;

  const products = AppState.data.products || [];
  container.innerHTML = products.map(prod => `
    <article class="product-card glass-card">
      <div class="product-thumb">
        <img src="${prod.image}" alt="${prod.name}" loading="lazy" decoding="async" />
        ${prod.badge ? `<span class="product-badge">${prod.badge}</span>` : ''}
      </div>
      <div class="product-info">
        <div class="product-rating">
          <span>★ ${prod.rating || '5.0'}</span>
          <span style="color: var(--theme-text-subtle); font-weight: normal;">(${prod.reviewsCount || 40}+ reviews)</span>
        </div>
        <h3 class="product-name">${prod.name}</h3>
        <p class="product-desc">${prod.description}</p>
        ${prod.weight ? `<div style="font-size: 0.78rem; color: var(--theme-text-muted); margin-bottom: 0.65rem;"><span>📦 ${prod.weight}</span></div>` : ''}
        <div style="margin-top: auto; padding-top: 0.85rem;">
          <button class="btn btn-primary btn-sm" style="width: 100%;" onclick="enquireProductWhatsApp('${prod.id}')">
            <span>🛍️ Order on WhatsApp</span>
          </button>
        </div>
      </div>
    </article>
  `).join('');
}

function enquireProductWhatsApp(productId) {
  const product = (AppState.data.products || []).find(p => p.id === productId);
  if (!product) return;
  const p = AppState.data.profile;
  const num = (p.whatsapp || '').replace(/[^0-9]/g, '');
  const msg = encodeURIComponent(`Hello ${p.brandName}! I want to order "${product.name}" in Hazaribagh. Please share delivery details and confirm my order.`);
  window.open(`https://wa.me/${num}?text=${msg}`, '_blank');
}

/* --------------------------------------------------------------------------
   TEACH & ACADEMY MASTERCLASSES (ONLINE & OFFLINE)
   -------------------------------------------------------------------------- */
function scrollToContactForm(occasion) {
  if (occasion) {
    const eventSelect = document.getElementById('inquiry-event');
    if (eventSelect) {
      eventSelect.value = occasion;
    }
  }
  const contactEl = document.getElementById('contact');
  if (contactEl) {
    contactEl.scrollIntoView({ behavior: 'smooth' });
    const nameInput = document.getElementById('inquiry-name');
    if (nameInput) setTimeout(() => nameInput.focus(), 600);
  } else {
    window.location.hash = '#contact';
  }
}

function renderCourses() {
  const container = document.getElementById('courses-grid');
  if (!container) return;

  const courses = AppState.data.courses || [];
  if (courses.length === 0) return;

  container.innerHTML = courses.map(course => {
    const isOnline = course.id === 'course-online' || (course.title && course.title.toLowerCase().includes('online'));
    const btnClass = isOnline ? 'online-class-enquiry-btn' : 'offline-class-enquiry-btn';
    const btnAction = isOnline ? `enquireOnlineCourse('${course.title.replace(/'/g, "\\'")}')` : `enquireOfflineCourse('${course.title.replace(/'/g, "\\'")}')`;
    const btnLabel = isOnline ? 'Enquire Online Classes on WhatsApp 🎓' : 'Enquire Offline Classes on WhatsApp 📍';
    const formOccasion = isOnline ? 'Online Mehndi Classes' : 'Offline Mehndi Classes (Hurhuru Studio)';

    return `
    <article class="course-card glass-card masterclass-card-item" onclick="${btnAction}" style="cursor: pointer;" title="Click to enquire on WhatsApp">
      <div class="course-thumb">
        <img src="${course.image || 'assets/images/teach_mehndi.jpg'}" alt="${course.title}" loading="lazy" decoding="async" />
        <span class="course-badge">${course.badge || (isOnline ? 'Online Classes' : 'Studio Classes')}</span>
      </div>
      <div class="course-body">
        <div class="course-meta">
          <span>${isOnline ? '🌐 ' + (course.mode || 'Online Instruction') : '📍 ' + (course.mode || 'Hurhuru Studio, Hazaribagh')}</span>
          <span>🎓 All Skill Levels Welcome</span>
        </div>
        <h3 class="course-title">${course.title}</h3>
        <p class="course-desc">${course.description}</p>
        
        <h5 style="font-size: 0.82rem; font-weight: 700; color: var(--theme-gold); text-transform: uppercase; margin-bottom: 0.5rem; letter-spacing: 0.05em;">Curriculum Highlights:</h5>
        <ul class="curriculum-list">
          ${(course.curriculum || []).map(c => `<li><span>✦</span> ${c}</li>`).join('')}
        </ul>

        <div style="background: var(--theme-bg-subtle); padding: 0.85rem 1rem; border-radius: var(--radius-sm); margin-bottom: 1.25rem; font-size: 0.82rem; color: var(--theme-text-muted); border: 1px solid var(--theme-border-subtle);">
          <strong>${isOnline ? '💻 Learning Materials:' : '🎁 Studio Practice Kit:'}</strong> ${course.kitText || 'Digital curriculum guides & practice templates.'}
        </div>

        <div class="course-footer" style="margin-top: auto; display: flex; flex-direction: column; gap: 0.75rem;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 0.82rem; color: var(--theme-gold); font-weight: 700;">${isOnline ? 'Flexible Schedule' : 'Hurhuru Studio Batches'}</span>
            <a href="#contact" onclick="event.stopPropagation(); scrollToContactForm('${formOccasion}'); return false;" style="font-size: 0.78rem; color: var(--theme-text-muted); text-decoration: underline;">Or fill inquiry form</a>
          </div>
          <button class="btn btn-gold btn-sm ${btnClass}" style="width: 100%;" onclick="event.stopPropagation(); ${btnAction}">
            <span>${btnLabel}</span>
          </button>
        </div>
      </div>
    </article>
    `;
  }).join('');
}

function enquireOnlineCourse(courseTitle) {
  const p = AppState.data.profile || {};
  const num = (p.whatsapp || '917564969450').replace(/[^0-9]/g, '');
  const msg = encodeURIComponent("Hello Sakshi Mehndi Academy, I am interested in joining your Online Mehndi Classes. Please share the course details.");
  window.open(`https://wa.me/${num}?text=${msg}`, '_blank');
}

function enquireOfflineCourse(courseTitle) {
  const p = AppState.data.profile || {};
  const num = (p.whatsapp || '917564969450').replace(/[^0-9]/g, '');
  const msg = encodeURIComponent("Hello Sakshi Mehndi Academy, I am interested in joining your Offline Mehndi Classes. Please share the course details and location.");
  window.open(`https://wa.me/${num}?text=${msg}`, '_blank');
}

function enrollInCourse(courseTitle) {
  if (courseTitle && courseTitle.toLowerCase().includes('online')) {
    enquireOnlineCourse(courseTitle);
  } else {
    enquireOfflineCourse(courseTitle);
  }
}

/* --------------------------------------------------------------------------
   CUSTOMER REVIEWS & USER REVIEW SUBMISSION
   -------------------------------------------------------------------------- */
function renderReviews() {
  const container = document.getElementById('reviews-grid');
  if (!container) return;

  const reviews = AppState.data.reviews || [];
  container.innerHTML = reviews.map(r => `
    <div class="review-card glass-card">
      <div class="review-stars">
        ${'★'.repeat(r.rating || 5)}
      </div>
      <p class="review-text">"${r.comment}"</p>
      <div class="review-author">
        <div class="author-avatar">${(r.name || 'B').charAt(0)}</div>
        <div>
          <div class="author-name">${r.name}</div>
          <div class="author-role">${r.role} • ${r.city}</div>
        </div>
      </div>
    </div>
  `).join('');
}

function initReviewSubmission() {
  const stars = document.querySelectorAll('#review-stars-select span');
  stars.forEach(star => {
    star.addEventListener('click', () => {
      const rating = parseInt(star.getAttribute('data-rating'), 10);
      AppState.userReviewRating = rating;
      stars.forEach(s => {
        const r = parseInt(s.getAttribute('data-rating'), 10);
        s.classList.toggle('active', r <= rating);
      });
    });
  });

  const openBtn = document.getElementById('open-review-modal-btn');
  const closeBtn = document.getElementById('close-review-modal-btn');
  const overlay = document.getElementById('review-modal-overlay');

  if (openBtn && overlay) {
    openBtn.addEventListener('click', () => overlay.classList.add('open'));
  }
  if (closeBtn && overlay) {
    closeBtn.addEventListener('click', () => overlay.classList.remove('open'));
  }
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.classList.remove('open');
    });
  }
}

function handleCustomerReviewSubmit(event) {
  event.preventDefault();

  const name = document.getElementById('review-user-name').value.trim();
  const role = document.getElementById('review-user-role').value.trim();
  const city = document.getElementById('review-user-city').value.trim();
  const comment = document.getElementById('review-user-comment').value.trim();

  if (!name || !comment) {
    showToast("Please provide your name and your review message.");
    return;
  }

  const newReview = {
    name,
    role: role || "Verified Bride",
    city: city || "India",
    rating: AppState.userReviewRating || 5,
    comment
  };

  DataService.addReview(newReview);

  const overlay = document.getElementById('review-modal-overlay');
  if (overlay) overlay.classList.remove('open');
  event.target.reset();

  showToast("Thank you for your lovely review! It has been posted. ⭐");
}

/* --------------------------------------------------------------------------
   BRIDAL INQUIRY FORM
   -------------------------------------------------------------------------- */
function handleBridalInquirySubmit(event) {
  event.preventDefault();
  const name = document.getElementById('inquiry-name').value;
  const phone = document.getElementById('inquiry-phone').value;
  const date = document.getElementById('inquiry-date').value;
  const eventType = document.getElementById('inquiry-event').value;
  const city = document.getElementById('inquiry-city').value;
  const notes = document.getElementById('inquiry-notes').value;

  const p = AppState.data.profile;
  const num = (p.whatsapp || '').replace(/[^0-9]/g, '');

  const msg = encodeURIComponent(
    `*👰 NEW BRIDAL MEHNDI BOOKING - HAZARIBAGH - ${p.brandName}*\n\n` +
    `• *Client Name:* ${name}\n` +
    `• *Phone:* ${phone}\n` +
    `• *Occasion / Event:* ${eventType}\n` +
    `• *Preferred Date:* ${date}\n` +
    `• *City / Venue:* ${city}\n` +
    `• *Special Requests / Motifs:* ${notes || 'None'}\n\n` +
    `Please confirm date availability and booking details for Hazaribagh!`
  );

  window.open(`https://wa.me/${num}?text=${msg}`, '_blank');
  showToast("Booking request ready! Opening WhatsApp directly... 💬 ✨");
}

function openConsultationModal(serviceName) {
  const el = document.getElementById('inquiry-event');
  if (el) el.value = serviceName;
  const formSection = document.getElementById('contact');
  if (formSection) formSection.scrollIntoView({ behavior: 'smooth' });
}

/* --------------------------------------------------------------------------
   NAVIGATION & UI CONTROLS
   -------------------------------------------------------------------------- */
function initNavigation() {
  const header = document.querySelector('.site-header');
  const navLinks = document.querySelectorAll('.main-nav .nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (header) {
      if (window.scrollY > 20) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    }

    // Scroll spy for main-nav links
    let currentId = '';
    const scrollPos = window.scrollY + 180;
    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    if (currentId && navLinks.length > 0) {
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === `#${currentId}`) {
          link.classList.add('active');
        } else if (href && href.startsWith('#')) {
          link.classList.remove('active');
        }
      });
    }
  });

  const openBtn = document.getElementById('mobile-menu-open');
  const closeBtn = document.getElementById('mobile-menu-close');
  const drawer = document.getElementById('mobile-drawer');

  if (openBtn && drawer) openBtn.addEventListener('click', () => drawer.classList.add('open'));
  if (closeBtn && drawer) closeBtn.addEventListener('click', () => drawer.classList.remove('open'));
  if (drawer) {
    drawer.addEventListener('click', (e) => {
      if (e.target === drawer) drawer.classList.remove('open');
    });
  }
}

function initModals() {
  const lb = document.getElementById('lightbox-modal');
  if (lb) {
    lb.addEventListener('click', (e) => {
      if (e.target === lb) closeLightbox();
    });
  }
}

function showToast(message) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>✨</span><span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}


/* --------------------------------------------------------------------------
   HORIZONTAL WHEEL SCROLL & SCROLL REVEAL ANIMATIONS
   -------------------------------------------------------------------------- */
function initHorizontalWheelScroll() {
  const tracks = document.querySelectorAll('#gallery-preview-grid, .services-grid, .shop-grid, .reviews-grid');
  tracks.forEach(track => {
    track.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && track.scrollWidth > track.clientWidth) {
        const canScrollLeft = track.scrollLeft > 0;
        const canScrollRight = track.scrollLeft < (track.scrollWidth - track.clientWidth - 1);
        if ((e.deltaY > 0 && canScrollRight) || (e.deltaY < 0 && canScrollLeft)) {
          e.preventDefault();
          track.scrollBy({ left: e.deltaY, behavior: 'smooth' });
        }
      }
    }, { passive: false });
  });
}

function initScrollRevealAnimations() {
  if (!('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.glass-card, .section-header, .trust-pillar-card, .aftercare-step').forEach(el => {
    el.classList.add('reveal-on-scroll');
    observer.observe(el);
  });
}
