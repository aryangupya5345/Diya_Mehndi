/**
 * Sakshi Mehndi Atelier - Master Owner Customization Portal
 * Gives the owner 100% full control to upload & remove artworks, list & edit shop items,
 * add & remove services, edit texts/photos, and customize every single detail of the website.
 */

const AdminPortal = {
    DEFAULT_PIN_HASH: "9f3d20c2f85970ad3a2aba841264f134892706adc62e9a70697399677e030930",
  isAuthenticated: false,
  MAX_FAILED_ATTEMPTS: 5,
  LOCKOUT_DURATION_MS: 15 * 60 * 1000, // 15-minute brute-force lockout
  lockoutTimerId: null,

  getSecurityState() {
    try {
      const raw = localStorage.getItem('mehndi_admin_sec_state');
      if (raw) {
        const parsed = JSON.parse(raw);
        return {
          failedAttempts: Number(parsed.failedAttempts) || 0,
          lockedUntil: Number(parsed.lockedUntil) || 0,
          lastAttemptTime: Number(parsed.lastAttemptTime) || 0
        };
      }
    } catch (e) {}
    return { failedAttempts: 0, lockedUntil: 0, lastAttemptTime: 0 };
  },

  saveSecurityState(state) {
    try {
      localStorage.setItem('mehndi_admin_sec_state', JSON.stringify(state));
    } catch (e) {}
  },

  checkLockoutState() {
    const state = this.getSecurityState();
    const now = Date.now();
    if (state.lockedUntil && now < state.lockedUntil) {
      this.applyLockoutUI(state.lockedUntil);
      return true;
    }
    if (state.lockedUntil && now >= state.lockedUntil) {
      this.clearLockoutUI();
      this.saveSecurityState({ failedAttempts: 0, lockedUntil: 0, lastAttemptTime: 0 });
    }
    return false;
  },

  applyLockoutUI(lockedUntil) {
    const input = document.getElementById('admin-pin-input');
    const btn = document.getElementById('admin-pin-submit-btn') || (input ? input.nextElementSibling : null);
    const statusEl = this.getOrCreateStatusEl();

    if (input) {
      input.disabled = true;
      input.style.opacity = '0.55';
      input.style.cursor = 'not-allowed';
    }
    if (btn && btn.tagName === 'BUTTON') {
      btn.disabled = true;
      btn.style.opacity = '0.55';
      btn.style.cursor = 'not-allowed';
    }

    if (this.lockoutTimerId) clearInterval(this.lockoutTimerId);

    const updateTimer = () => {
      const remainingMs = lockedUntil - Date.now();
      if (remainingMs <= 0) {
        clearInterval(this.lockoutTimerId);
        this.lockoutTimerId = null;
        this.clearLockoutUI();
        this.saveSecurityState({ failedAttempts: 0, lockedUntil: 0, lastAttemptTime: 0 });
        if (statusEl) {
          statusEl.innerHTML = '<span style="color: #10b981; font-weight: 600;">Lockout expired. You may now enter your passcode.</span>';
        }
        return;
      }

      const totalSec = Math.ceil(remainingMs / 1000);
      const mins = Math.floor(totalSec / 60);
      const secs = totalSec % 60;
      const formatted = mins + ':' + (secs < 10 ? '0' : '') + secs;

      if (statusEl) {
        statusEl.innerHTML = '<span style="color: #ef4444; font-weight: 600; display: inline-block; padding: 0.4rem 0.75rem; background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.25); border-radius: 6px;">⛔ Locked for security. Try again in <strong>' + formatted + '</strong></span>';
      }
    };

    updateTimer();
    this.lockoutTimerId = setInterval(updateTimer, 1000);
  },

  clearLockoutUI() {
    if (this.lockoutTimerId) {
      clearInterval(this.lockoutTimerId);
      this.lockoutTimerId = null;
    }
    const input = document.getElementById('admin-pin-input');
    const btn = document.getElementById('admin-pin-submit-btn') || (input ? input.nextElementSibling : null);
    const statusEl = document.getElementById('admin-pin-status');

    if (input) {
      input.disabled = false;
      input.style.opacity = '1';
      input.style.cursor = 'auto';
    }
    if (btn && btn.tagName === 'BUTTON') {
      btn.disabled = false;
      btn.style.opacity = '1';
      btn.style.cursor = 'pointer';
    }
    if (statusEl) {
      statusEl.innerHTML = '';
    }
  },

  getOrCreateStatusEl() {
    let statusEl = document.getElementById('admin-pin-status');
    if (!statusEl) {
      const pinView = document.getElementById('admin-pin-view');
      if (pinView) {
        statusEl = document.createElement('div');
        statusEl.id = 'admin-pin-status';
        statusEl.style.minHeight = '1.4rem';
        statusEl.style.fontSize = '0.84rem';
        statusEl.style.margin = '0.65rem 0 0.85rem';
        statusEl.style.textAlign = 'center';
        const cancelBtn = pinView.querySelector('.btn-outline');
        if (cancelBtn) {
          pinView.insertBefore(statusEl, cancelBtn);
        } else {
          pinView.appendChild(statusEl);
        }
      }
    }
    return statusEl;
  },
  /**
   * Cryptographic SHA-256 One-Way Hashing:
   * Hashes the PIN using the browser's native Web Crypto API.
   * Ensures the plain text PIN is never exposed or readable in client-side code.
   */
  async hashPin(pin) {
    const clean = String(pin || '').trim();
    if (window.crypto && crypto.subtle) {
      const encoder = new TextEncoder();
      const data = encoder.encode(clean);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }
    // Fallback hashing for older browsers
    let h = 0;
    for (let i = 0; i < clean.length; i++) {
      h = ((h << 5) - h) + clean.charCodeAt(i);
      h |= 0;
    }
    return String(h);
  },


  init() {
    this.bindEvents();
    // Auto-open PIN prompt immediately upon dynamic loading
    setTimeout(() => this.open(), 120);
  },

  bindEvents() {
    // 1. Exclusive URL-only trigger: Strictly accessible via ?admin=owner
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('admin') === 'owner' || window.location.search.includes('admin=owner')) {
      setTimeout(() => this.open(), 250);
    }

    // 2. Modal Close handlers
    const closeBtn = document.getElementById('admin-modal-close');
    if (closeBtn) closeBtn.addEventListener('click', () => this.close());

    const overlay = document.getElementById('admin-modal-overlay');
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) this.close();
      });
    }

    // 3. Fast Enter-key submit on PIN input
    const pinInput = document.getElementById('admin-pin-input');
    if (pinInput) {
      pinInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          this.verifyPin();
        }
      });
    }

    // 4. Tab Navigation
    document.querySelectorAll('.admin-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');
        this.switchTab(targetTab);
      });
    });

    // 5. Smart Image Upload Handlers with Automatic Compression
    this.setupCompressedImagePicker('hero-image-file', 'admin-hero-image-url', 'admin-hero-img-preview');
    this.setupArtImagePicker();
    this.setupCompressedImagePicker('prod-image-file', 'prod-image-url', 'prod-img-preview');
    this.setupCompressedImagePicker('course-image-file', 'course-image-url', 'course-img-preview');
  },

  open() {
    const overlay = document.getElementById('admin-modal-overlay');
    if (!overlay) return;

    if (!this.isAuthenticated) {
      this.showPinPrompt();
    } else {
      this.showDashboard();
    }

    overlay.classList.add('open');
  },

  close() {
    const overlay = document.getElementById('admin-modal-overlay');
    if (overlay) overlay.classList.remove('open');
  },

    showPinPrompt() {
    const pinView = document.getElementById('admin-pin-view');
    const dashView = document.getElementById('admin-dashboard-view');
    if (pinView) pinView.style.display = 'block';
    if (dashView) dashView.style.display = 'none';

    const isLocked = this.checkLockoutState();
    const pinInput = document.getElementById('admin-pin-input');
    if (pinInput && !isLocked) {
      pinInput.value = '';
      setTimeout(() => pinInput.focus(), 150);
    }
  },

    async verifyPin() {
    const state = this.getSecurityState();
    const now = Date.now();

    // 1. Enforce lockout timer
    if (state.lockedUntil && now < state.lockedUntil) {
      this.applyLockoutUI(state.lockedUntil);
      showToast("Security lockout active. Please wait for the timer to expire.");
      return;
    }

    // 2. Throttle against automated script execution (minimum 750ms between attempts)
    if (now - state.lastAttemptTime < 750) {
      showToast("Please wait a moment before trying again.");
      return;
    }

    const input = document.getElementById('admin-pin-input');
    const entered = input ? input.value.trim() : '';
    if (!entered) return;

    const enteredHash = await this.hashPin(entered);
    const savedHash = localStorage.getItem('mehndi_admin_pin_hash') || this.DEFAULT_PIN_HASH;
    
    // Smooth automatic upgrade if user previously had an unhashed pin in localStorage
    const legacyPin = localStorage.getItem('mehndi_admin_pin');
    const isLegacyMatch = legacyPin && entered === legacyPin;

    if (enteredHash === savedHash || isLegacyMatch) {
      if (isLegacyMatch) {
        localStorage.setItem('mehndi_admin_pin_hash', enteredHash);
        localStorage.removeItem('mehndi_admin_pin');
      }
      // Reset security state on success
      this.saveSecurityState({ failedAttempts: 0, lockedUntil: 0, lastAttemptTime: now });
      this.clearLockoutUI();
      this.isAuthenticated = true;
      this.showDashboard();
      showToast("Access Granted! Welcome to Owner Atelier Dashboard 👑");
    } else {
      const newFailed = state.failedAttempts + 1;
      const statusEl = this.getOrCreateStatusEl();

      if (newFailed >= this.MAX_FAILED_ATTEMPTS) {
        const lockedUntil = now + this.LOCKOUT_DURATION_MS;
        this.saveSecurityState({ failedAttempts: newFailed, lockedUntil, lastAttemptTime: now });
        this.applyLockoutUI(lockedUntil);
        showToast("⛔ Maximum attempts exceeded. Locked for 15 minutes.");
      } else {
        const remaining = this.MAX_FAILED_ATTEMPTS - newFailed;
        this.saveSecurityState({ failedAttempts: newFailed, lockedUntil: 0, lastAttemptTime: now });
        showToast('Incorrect passcode. ' + remaining + ' attempt' + (remaining === 1 ? '' : 's') + ' remaining.');
        if (statusEl) {
          statusEl.innerHTML = '<span style="color: #ef4444; font-size: 0.82rem; font-weight: 600;">Incorrect passcode. ' + remaining + ' attempt' + (remaining === 1 ? '' : 's') + ' remaining before 15-min lockout.</span>';
        }
        if (input) input.select();
      }
    }
  },

  async changePin() {
    const pinInput = document.getElementById('admin-new-pin');
    const newPin = pinInput ? pinInput.value.trim() : '';
    if (!newPin || newPin.length < 4) {
      showToast("Please enter a PIN with at least 4 digits");
      return;
    }

    const hashed = await this.hashPin(newPin);
    localStorage.setItem('mehndi_admin_pin_hash', hashed);
    localStorage.removeItem('mehndi_admin_pin');
    if (pinInput) pinInput.value = '';
    showToast("Owner Passcode updated securely! 🔐");
  },


  /**
   * Optimized Data Sync Engine:
   * Saves to LocalStorage, updates active AppState in memory, and immediately re-renders
   * all website components live without requiring a page reload.
   */
  saveAndSync(currentData, successMessage) {
    if (DataService.save(currentData)) {
      AppState.data = currentData;
      if (typeof renderAllSections === 'function') {
        renderAllSections();
      }
      if (successMessage) {
        showToast(successMessage);
      } else {
        showToast("Saved & Synced Live Worldwide! 🌐");
      }
      return true;
    }
    showToast("Error saving data. Storage might be full.");
    return false;
  },

  showDashboard() {
    const pinView = document.getElementById('admin-pin-view');
    const dashView = document.getElementById('admin-dashboard-view');
    if (pinView) pinView.style.display = 'none';
    if (dashView) dashView.style.display = 'flex';

    // Populate all forms with live data
    this.loadProfileForm();
    this.loadHeroAndTextForm();
    this.renderAdminGalleryList();
    this.renderAdminProductsList();
    this.renderAdminServicesList();
    this.renderAdminCoursesList();
    this.renderAdminReviewsList();

    // Default to active tab
    const activeBtn = document.querySelector('.admin-tab-btn.active');
    const initialTab = activeBtn ? activeBtn.getAttribute('data-tab') : 'profile';
    this.switchTab(initialTab);
  },

  switchTab(tabId) {
    if (!tabId) return;

    // Update Tab Buttons
    document.querySelectorAll('.admin-tab-btn').forEach(btn => {
      const match = btn.getAttribute('data-tab') === tabId;
      btn.classList.toggle('active', match);
      if (match && btn.scrollIntoView) {
        btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    });

    // Update Tab Content Panes
    document.querySelectorAll('.admin-tab-content').forEach(content => {
      content.classList.toggle('active', content.id === `admin-tab-${tabId}`);
    });

    // Synchronize Quick Dropdown Selector
    const select = document.getElementById('admin-quick-select');
    if (select && select.value !== tabId) {
      select.value = tabId;
    }

    // Synchronize Quick Action Pills
    document.querySelectorAll('.admin-quick-pill').forEach(pill => {
      const onclickAttr = pill.getAttribute('onclick') || '';
      pill.classList.toggle('active', onclickAttr.includes(`'${tabId}'`));
    });

    // Reset scroll position to top of content
    const body = document.querySelector('.admin-body');
    if (body) {
      body.scrollTop = 0;
    }
  },

  /**
   * Automatic Image Compressor: converts large photos into lightweight ~100KB Web-optimized JPEGs
   * Prevents LocalStorage Quota limits while maintaining high clarity!
   */
  setupCompressedImagePicker(fileInputId, urlInputId, previewImgId) {
    const fileInput = document.getElementById(fileInputId);
    const urlInput = document.getElementById(urlInputId);
    const preview = document.getElementById(previewImgId);

    if (fileInput) {
      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        showToast("Processing & optimizing photo...");

        const reader = new FileReader();
        reader.onload = (event) => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const maxDim = 1100;
            let width = img.width;
            let height = img.height;

            if (width > maxDim || height > maxDim) {
              if (width > height) {
                height = Math.round((height * maxDim) / width);
                width = maxDim;
              } else {
                width = Math.round((width * maxDim) / height);
                height = maxDim;
              }
            }

            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.84);
            if (urlInput) urlInput.value = compressedDataUrl;
            if (preview) {
              preview.src = compressedDataUrl;
              preview.style.display = 'block';
            }
            showToast("Photo ready! ✨");
          };
          img.src = event.target.result;
        };
        reader.readAsDataURL(file);
      });
    }

    if (urlInput && preview) {
      urlInput.addEventListener('input', () => {
        if (urlInput.value) {
          preview.src = urlInput.value;
          preview.style.display = 'block';
        } else {
          preview.style.display = 'none';
        }
      });
    }
  },

  /* ==========================================================================
     TAB 1: CONTACTS & BRAND PROFILE
     ========================================================================== */
  loadProfileForm() {
    const p = AppState.data.profile || {};
    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.value = val || '';
    };

    setVal('admin-brand-name', p.brandName);
    setVal('admin-artist-name', p.artistName);
    setVal('admin-tagline', p.tagline);
    setVal('admin-phone', p.phone);
    setVal('admin-whatsapp', p.whatsapp);
    setVal('admin-city', p.city);
    setVal('admin-address', p.address);
    setVal('admin-hours', p.workingHours);
    setVal('admin-instagram', p.instagram);
    setVal('admin-ig-handle', p.instagramHandle);
    setVal('admin-maps-url', p.googleMapsUrl);
    setVal('admin-announcement', p.announcement);
    setVal('admin-about-bio', p.aboutBio);
    setVal('admin-stat-years', p.yearsExperience);
    setVal('admin-stat-brides', p.bridesDressed);
  },

  saveProfile() {
    const getVal = (id) => {
      const el = document.getElementById(id);
      return el ? el.value.trim() : '';
    };

    const current = DataService.load();
    current.profile = {
      ...current.profile,
      brandName: getVal('admin-brand-name') || current.profile.brandName,
      artistName: getVal('admin-artist-name') || current.profile.artistName,
      tagline: getVal('admin-tagline') || current.profile.tagline,
      phone: getVal('admin-phone') || current.profile.phone,
      whatsapp: getVal('admin-whatsapp') || current.profile.whatsapp,
      city: getVal('admin-city') || current.profile.city,
      address: getVal('admin-address') || current.profile.address,
      workingHours: getVal('admin-hours') || current.profile.workingHours,
      instagram: getVal('admin-instagram') || current.profile.instagram,
      instagramHandle: getVal('admin-ig-handle') || current.profile.instagramHandle,
      googleMapsUrl: (() => {
        let raw = getVal('admin-maps-url');
        if (!raw) return current.profile.googleMapsUrl;
        // Extract src if iframe was pasted
        const iframeMatch = raw.match(/src=["'](.*?)["']/);
        if (iframeMatch) return iframeMatch[1];
        // Extract URL if full Google Maps share message was pasted
        const urlMatch = raw.match(/(https?:\/\/[^\s]+)/);
        if (urlMatch) return urlMatch[1];
        if (!raw.startsWith('http://') && !raw.startsWith('https://')) {
          return 'https://' + raw;
        }
        return raw;
      })(),
      announcement: getVal('admin-announcement') || current.profile.announcement,
      aboutBio: getVal('admin-about-bio') || current.profile.aboutBio,
      yearsExperience: getVal('admin-stat-years') || current.profile.yearsExperience,
      bridesDressed: getVal('admin-stat-brides') || current.profile.bridesDressed
    };

    this.saveAndSync(current, "Profile & Contact details saved live! 🎉");
  },

  /* ==========================================================================
     TAB 2: HERO & WEBSITE TEXTS (FULL CONTROL)
     ========================================================================== */
  loadHeroAndTextForm() {
    const h = AppState.data.hero || {};
    const setVal = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.value = val || '';
    };

    setVal('admin-hero-tag1', h.tag1);
    setVal('admin-hero-tag2', h.tag2);
    setVal('admin-hero-headline-main', h.headlineMain);
    setVal('admin-hero-headline-highlight', h.headlineHighlight);
    setVal('admin-hero-headline-end', h.headlineEnd);
    setVal('admin-hero-lead', h.lead);
    setVal('admin-hero-image-url', h.image);
    setVal('admin-hero-badge-title', h.badgeTitle);
    setVal('admin-hero-badge-text', h.badgeText);

    const prev = document.getElementById('admin-hero-img-preview');
    if (prev && h.image) {
      prev.src = h.image;
      prev.style.display = 'block';
    }

    // Section Titles
    const sh = AppState.data.sectionHeaders || {};
    setVal('admin-sh-gallery-title', sh.gallery?.title);
    setVal('admin-sh-services-title', sh.services?.title);
    setVal('admin-sh-shop-title', sh.shop?.title);
    setVal('admin-sh-academy-title', sh.academy?.title);
    setVal('admin-sh-reviews-title', sh.reviews?.title);
  },

  saveHeroAndTexts() {
    const getVal = (id) => {
      const el = document.getElementById(id);
      return el ? el.value.trim() : '';
    };

    const current = DataService.load();
    current.hero = {
      ...current.hero,
      tag1: getVal('admin-hero-tag1') || current.hero.tag1,
      tag2: getVal('admin-hero-tag2') || current.hero.tag2,
      headlineMain: getVal('admin-hero-headline-main') || current.hero.headlineMain,
      headlineHighlight: getVal('admin-hero-headline-highlight') || current.hero.headlineHighlight,
      headlineEnd: getVal('admin-hero-headline-end') || current.hero.headlineEnd,
      lead: getVal('admin-hero-lead') || current.hero.lead,
      image: getVal('admin-hero-image-url') || current.hero.image,
      badgeTitle: getVal('admin-hero-badge-title') || current.hero.badgeTitle,
      badgeText: getVal('admin-hero-badge-text') || current.hero.badgeText
    };

    current.sectionHeaders = current.sectionHeaders || {};
    if (getVal('admin-sh-gallery-title')) current.sectionHeaders.gallery.title = getVal('admin-sh-gallery-title');
    if (getVal('admin-sh-services-title')) current.sectionHeaders.services.title = getVal('admin-sh-services-title');
    if (getVal('admin-sh-shop-title')) current.sectionHeaders.shop.title = getVal('admin-sh-shop-title');
    if (getVal('admin-sh-academy-title')) current.sectionHeaders.academy.title = getVal('admin-sh-academy-title');
    if (getVal('admin-sh-reviews-title')) current.sectionHeaders.reviews.title = getVal('admin-sh-reviews-title');

    if (DataService.save(current)) {
      showToast("Hero section & page texts updated live! ✨");
    }
  },

  /* ==========================================================================
     TAB 3: GALLERY ARTS MANAGER (ADD, UPLOAD, EDIT, DELETE)
     ========================================================================== */
  renderAdminGalleryList() {
    const list = document.getElementById('admin-gallery-list');
    if (!list) return;

    const items = AppState.data.gallery || [];
    if (items.length === 0) {
      list.innerHTML = `<tr><td colspan="3" style="text-align:center; padding: 1.5rem; color: var(--theme-text-muted);">No artworks yet. Add your first artwork using the form above!</td></tr>`;
      return;
    }

    list.innerHTML = items.map(item => `
      <tr>
        <td style="width: 70px;">
          <img src="${item.image}" alt="${item.title}" style="width: 58px; height: 58px; border-radius: 8px; object-fit: cover; border: 1px solid var(--theme-border);" />
        </td>
        <td>
          <div style="font-weight: 700; color: var(--theme-text-main); font-size: 0.95rem;">${item.title}</div>
          <div style="font-size: 0.78rem; color: var(--theme-gold); font-weight: 600;">${item.categoryLabel || item.category}</div>
          <div style="font-size: 0.75rem; color: var(--theme-text-muted); margin-top: 0.2rem;">${(item.tags || []).join(', ')}</div>
        </td>
        <td style="width: 140px; text-align: right;">
          <div style="display: flex; gap: 0.45rem; justify-content: flex-end;">
            <button class="btn btn-outline btn-sm" onclick="AdminPortal.editArtwork('${item.id}')" title="Edit artwork details">✏️ Edit</button>
            <button class="btn btn-sm" style="background: #ba1a1a; color: white;" onclick="AdminPortal.deleteArtwork('${item.id}')" title="Remove artwork">🗑️ Delete</button>
          </div>
        </td>
      </tr>
    `).join('');
  },

  pendingArtImages: [],

  setupArtImagePicker() {
    const fileInput = document.getElementById('art-image-file');
    const urlInput = document.getElementById('art-image-url');
    const preview = document.getElementById('art-img-preview');
    const multiPreview = document.getElementById('art-multi-preview');
    const btnText = document.getElementById('art-form-btn-text');

    if (!fileInput) return;

    fileInput.addEventListener('change', async (e) => {
      const files = Array.from(e.target.files || []);
      if (!files.length) return;

      this.pendingArtImages = [];

      if (files.length === 1) {
        showToast("Processing photo...");
        const dataUrl = await this.compressSingleImage(files[0]);
        this.pendingArtImages = [dataUrl];
        if (urlInput) urlInput.value = dataUrl;
        if (preview) {
          preview.src = dataUrl;
          preview.style.display = 'block';
        }
        if (multiPreview) multiPreview.style.display = 'none';
        if (btnText) btnText.textContent = 'Add Artwork';
        showToast("Photo ready! ✨");
      } else {
        showToast(`Processing & optimizing ${files.length} photos...`);
        if (preview) preview.style.display = 'none';
        if (urlInput) urlInput.value = '';

        const compressedList = await Promise.all(
          files.map(file => this.compressSingleImage(file))
        );
        this.pendingArtImages = compressedList;

        if (multiPreview) {
          multiPreview.innerHTML = `
            <div style="font-weight: 700; color: var(--theme-gold); margin-bottom: 0.5rem; font-size: 0.88rem;">
              📸 ${compressedList.length} Photos Selected for Bulk Upload:
            </div>
            <div style="display: flex; gap: 0.5rem; overflow-x: auto; padding-bottom: 0.5rem;">
              ${compressedList.map((url, i) => `
                <img src="${url}" alt="Selected ${i + 1}" style="width: 54px; height: 54px; border-radius: 6px; object-fit: cover; border: 1.5px solid var(--theme-gold); flex-shrink: 0;" />
              `).join('')}
            </div>
          `;
          multiPreview.style.display = 'block';
        }

        if (btnText) {
          btnText.textContent = `+ Upload All ${compressedList.length} Artworks`;
        }
        showToast(`All ${files.length} photos ready for upload! 🎨`);
      }
    });

    if (urlInput && preview) {
      urlInput.addEventListener('input', () => {
        if (urlInput.value) {
          this.pendingArtImages = [urlInput.value];
          preview.src = urlInput.value;
          preview.style.display = 'block';
          if (multiPreview) multiPreview.style.display = 'none';
        } else {
          this.pendingArtImages = [];
          preview.style.display = 'none';
        }
      });
    }
  },

  compressSingleImage(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const maxDim = 720; // Crisp Retina quality while keeping photos to ~35KB
          let width = img.width;
          let height = img.height;

          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', 0.70));
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    });
  },

  resetArtForm() {
    this.pendingArtImages = [];
    document.getElementById('art-edit-id').value = '';
    document.getElementById('art-title-input').value = '';
    document.getElementById('art-category-input').value = 'bridal';
    document.getElementById('art-catlabel-input').value = 'Bridal Couture';
    document.getElementById('art-image-url').value = '';
    const fileEl = document.getElementById('art-image-file');
    if (fileEl) fileEl.value = '';
    document.getElementById('art-desc-input').value = '';
    document.getElementById('art-tags-input').value = 'Bridal, Traditional, Royal Jaal';
    const preview = document.getElementById('art-img-preview');
    if (preview) {
      preview.src = '';
      preview.style.display = 'none';
    }
    const multiPreview = document.getElementById('art-multi-preview');
    if (multiPreview) {
      multiPreview.innerHTML = '';
      multiPreview.style.display = 'none';
    }
    const btnText = document.getElementById('art-form-btn-text');
    if (btnText) btnText.textContent = 'Add Artwork';
    const formTitle = document.getElementById('art-form-title');
    if (formTitle) formTitle.textContent = 'Add New Mehndi Artwork';
  },

  editArtwork(id) {
    const art = (AppState.data.gallery || []).find(a => a.id === id);
    if (!art) return;

    this.pendingArtImages = [];
    document.getElementById('art-edit-id').value = art.id;
    document.getElementById('art-title-input').value = art.title || '';
    document.getElementById('art-category-input').value = art.category || 'bridal';
    document.getElementById('art-catlabel-input').value = art.categoryLabel || '';
    document.getElementById('art-image-url').value = art.image || '';
    document.getElementById('art-desc-input').value = art.description || '';
    document.getElementById('art-tags-input').value = (art.tags || []).join(', ');

    const preview = document.getElementById('art-img-preview');
    if (preview && art.image) {
      preview.src = art.image;
      preview.style.display = 'block';
    }
    const multiPreview = document.getElementById('art-multi-preview');
    if (multiPreview) multiPreview.style.display = 'none';

    const btnText = document.getElementById('art-form-btn-text');
    if (btnText) btnText.textContent = 'Update Artwork';
    const formTitle = document.getElementById('art-form-title');
    if (formTitle) formTitle.textContent = 'Edit Artwork: ' + (art.title || art.categoryLabel || 'Design');

    document.getElementById('art-form-container').scrollIntoView({ behavior: 'smooth' });
  },

  saveArtwork(e) {
    e.preventDefault();
    const editId = document.getElementById('art-edit-id').value;
    const title = document.getElementById('art-title-input').value.trim();
    const category = document.getElementById('art-category-input').value;
    const catLabel = document.getElementById('art-catlabel-input').value.trim() || this.getCategoryLabel(category);
    const manualUrl = document.getElementById('art-image-url').value.trim();
    const desc = document.getElementById('art-desc-input').value.trim();
    const tags = document.getElementById('art-tags-input').value.split(',').map(t => t.trim()).filter(Boolean);

    const current = DataService.load();
    // Hydrate from active memory gallery to preserve all uploaded artworks
    current.gallery = (typeof AppState !== 'undefined' && AppState.data && AppState.data.gallery && AppState.data.gallery.length)
      ? [...AppState.data.gallery]
      : (current.gallery || []);

    if (editId) {
      // Update single existing artwork
      const index = current.gallery.findIndex(a => a.id === editId);
      if (index !== -1) {
        const image = (this.pendingArtImages && this.pendingArtImages[0]) || manualUrl || current.gallery[index].image;
        current.gallery[index] = {
          ...current.gallery[index],
          title: title || current.gallery[index].title || `${catLabel} Design`,
          category,
          categoryLabel: catLabel,
          image,
          description: desc, // Optional
          tags: tags.length ? tags : (current.gallery[index].tags || ["Mehndi"]),
          updatedAt: new Date().toISOString()
        };
        if (typeof window.saveFirestoreArtwork === 'function') {
          window.saveFirestoreArtwork(current.gallery[index]);
        } else {
          window._pendingFirestoreArtworks = window._pendingFirestoreArtworks || [];
          window._pendingFirestoreArtworks.push(current.gallery[index]);
        }
        showToast("Artwork updated successfully! 🎨");
      }
    } else {
      // Add new artwork(s) - Supports bulk multiple images
      const imagesToAdd = (this.pendingArtImages && this.pendingArtImages.length > 0)
        ? this.pendingArtImages
        : [manualUrl || 'assets/images/bridal_hero.jpg'];

      const totalCount = imagesToAdd.length;

      imagesToAdd.forEach((imgUrl, idx) => {
        let artTitle = '';
        if (title) {
          artTitle = totalCount > 1 ? `${title} (${idx + 1})` : title;
        } else {
          artTitle = totalCount > 1 ? `${catLabel} Design #${idx + 1}` : `${catLabel} Design`;
        }

        const newArt = {
          id: `art-${Date.now()}-${idx}`,
          title: artTitle,
          category,
          categoryLabel: catLabel,
          image: imgUrl,
          description: desc, // Completely optional
          tags: tags.length ? tags : ["Handcrafted", "Mehndi", catLabel],
          createdAt: new Date().toISOString(),
          order: Date.now() + (totalCount - idx)
        };
        current.gallery.unshift(newArt);

        // Sync individual artwork to Firestore collection
        if (typeof window.saveFirestoreArtwork === 'function') {
          window.saveFirestoreArtwork(newArt);
        } else {
          window._pendingFirestoreArtworks = window._pendingFirestoreArtworks || [];
          window._pendingFirestoreArtworks.push(newArt);
        }
      });

      if (totalCount > 1) {
        showToast(`Successfully added ${totalCount} artworks to Gallery! 🎨`);
      } else {
        showToast("New Artwork added to Art Gallery! 🎨");
      }
    }

    this.pendingArtImages = [];
    this.saveAndSync(current);
    this.renderAdminGalleryList();
    this.resetArtForm();
  },

  deleteArtwork(id) {
    const art = (typeof AppState !== 'undefined' && AppState.data && AppState.data.gallery ? AppState.data.gallery : []).find(a => a.id === id);
    const title = art ? art.title : 'this artwork';
    if (!confirm(`Are you sure you want to remove "${title}" from the gallery?`)) return;

    const current = DataService.load();
    const activeGallery = (typeof AppState !== 'undefined' && AppState.data && AppState.data.gallery && AppState.data.gallery.length)
      ? AppState.data.gallery
      : (current.gallery || []);

    current.gallery = activeGallery.filter(a => a.id !== id);
    this.saveAndSync(current);
    if (typeof window.deleteFirestoreArtwork === 'function') {
      window.deleteFirestoreArtwork(id);
    }
    this.renderAdminGalleryList();
    showToast("Artwork removed from portfolio");
  },

  getCategoryLabel(cat) {
    const map = {
      bridal: "Bridal Couture",
      arabic: "Arabic & Gulf Flow",
      minimal: "Lotus Mandala & Minimal",
      feet: "Bridal Feet & Payal",
      festive: "Festive & Sangeet",
      customer: "Customer's Gallery",
      jewelry: "Finger & Jewelry Art"
    };
    return map[cat] || cat;
  },

  /* ==========================================================================
     TAB 4: SHOP ITEMS & SUPPLIES MANAGER (ADD, EDIT, REMOVE)
     ========================================================================== */
  renderAdminProductsList() {
    const list = document.getElementById('admin-products-list');
    if (!list) return;

    const items = AppState.data.products || [];
    if (items.length === 0) {
      list.innerHTML = `<tr><td colspan="4" style="text-align:center; padding: 1.5rem; color: var(--theme-text-muted);">No items in shop. Add one above!</td></tr>`;
      return;
    }

    list.innerHTML = items.map(item => `
      <tr>
        <td style="width: 70px;">
          <img src="${item.image}" alt="${item.name}" style="width: 58px; height: 58px; border-radius: 8px; object-fit: cover; border: 1px solid var(--theme-border);" />
        </td>
        <td>
          <strong style="font-size: 0.95rem;">${item.name}</strong>
          <div style="font-size: 0.78rem; color: var(--theme-text-muted); margin-top: 0.2rem;">${item.weight || 'Standard'} • ${item.shelfLife || 'Fresh batch'}</div>
        </td>
        <td style="width: 110px;">
          <span class="badge ${item.inStock !== false ? 'badge-green' : 'badge-gold'}">${item.inStock !== false ? 'In Stock' : 'Out of Stock'}</span>
        </td>
        <td style="width: 140px; text-align: right;">
          <div style="display: flex; gap: 0.45rem; justify-content: flex-end;">
            <button class="btn btn-outline btn-sm" onclick="AdminPortal.editProduct('${item.id}')" title="Edit product details">✏️ Edit</button>
            <button class="btn btn-sm" style="background: #ba1a1a; color: white;" onclick="AdminPortal.deleteProduct('${item.id}')" title="Remove product">🗑️ Delete</button>
          </div>
        </td>
      </tr>
    `).join('');
  },

  resetProductForm() {
    document.getElementById('prod-edit-id').value = '';
    document.getElementById('prod-name-input').value = '';
    const weightEl = document.getElementById('prod-weight-input');
    if (weightEl) weightEl.value = '';
    const shelfEl = document.getElementById('prod-shelf-input');
    if (shelfEl) shelfEl.value = '';
    document.getElementById('prod-category-input').value = 'cones';
    document.getElementById('prod-badge-input').value = 'Bestseller';
    document.getElementById('prod-stock-input').checked = true;
    document.getElementById('prod-image-url').value = '';
    document.getElementById('prod-image-file').value = '';
    document.getElementById('prod-desc-input').value = '';
    const preview = document.getElementById('prod-img-preview');
    if (preview) {
      preview.src = '';
      preview.style.display = 'none';
    }
    const btnText = document.getElementById('prod-form-btn-text');
    if (btnText) btnText.textContent = 'Add Product';
    const formTitle = document.getElementById('prod-form-title');
    if (formTitle) formTitle.textContent = 'Add New Product';
  },

  editProduct(id) {
    const prod = (AppState.data.products || []).find(p => p.id === id);
    if (!prod) return;

    document.getElementById('prod-edit-id').value = prod.id;
    document.getElementById('prod-name-input').value = prod.name;
    const weightEl = document.getElementById('prod-weight-input');
    if (weightEl) weightEl.value = prod.weight || '';
    const shelfEl = document.getElementById('prod-shelf-input');
    if (shelfEl) shelfEl.value = prod.shelfLife || '';
    document.getElementById('prod-category-input').value = prod.category || 'cones';
    document.getElementById('prod-badge-input').value = prod.badge || '';
    document.getElementById('prod-stock-input').checked = prod.inStock !== false;
    document.getElementById('prod-image-url').value = prod.image;
    document.getElementById('prod-desc-input').value = prod.description || '';

    const preview = document.getElementById('prod-img-preview');
    if (preview && prod.image) {
      preview.src = prod.image;
      preview.style.display = 'block';
    }

    const btnText = document.getElementById('prod-form-btn-text');
    if (btnText) btnText.textContent = 'Update Product';
    const formTitle = document.getElementById('prod-form-title');
    if (formTitle) formTitle.textContent = 'Edit Product: ' + prod.name;

    document.getElementById('prod-form-container').scrollIntoView({ behavior: 'smooth' });
  },

  saveProduct(e) {
    e.preventDefault();
    const editId = document.getElementById('prod-edit-id').value;
    const name = document.getElementById('prod-name-input').value.trim();
    const weightEl = document.getElementById('prod-weight-input');
    const weight = weightEl ? weightEl.value.trim() : 'Fresh Batch';
    const shelfEl = document.getElementById('prod-shelf-input');
    const shelfLife = shelfEl ? shelfEl.value.trim() : 'Natural';
    const category = document.getElementById('prod-category-input').value;
    const badge = document.getElementById('prod-badge-input').value.trim();
    const inStock = document.getElementById('prod-stock-input').checked;
    const image = document.getElementById('prod-image-url').value.trim() || 'assets/images/henna_cones.jpg';
    const desc = document.getElementById('prod-desc-input').value.trim();

    if (!name) {
      showToast("Please provide product name");
      return;
    }

    const current = DataService.load();
    current.products = current.products || [];

    if (editId) {
      const index = current.products.findIndex(p => p.id === editId);
      if (index !== -1) {
        current.products[index] = {
          ...current.products[index],
          name, category, badge, inStock, image, description: desc, weight, shelfLife
        };
        showToast("Product updated successfully! 🛍️");
      }
    } else {
      const newProd = {
        id: `prod-${Date.now()}`,
        name,
        category,
        badge: badge || "Pure Organic",
        inStock,
        image,
        description: desc,
        weight,
        shelfLife,
        rating: 5.0,
        reviewsCount: 1
      };
      current.products.unshift(newProd);
      showToast("New Item added to Shop! 🛍️");
    }

    this.saveAndSync(current);
    this.renderAdminProductsList();
    this.resetProductForm();
  },

  deleteProduct(id) {
    const prod = (AppState.data.products || []).find(p => p.id === id);
    const name = prod ? prod.name : 'this product';
    if (!confirm(`Are you sure you want to remove "${name}" from your shop?`)) return;

    const current = DataService.load();
    current.products = (current.products || []).filter(p => p.id !== id);
    DataService.save(current);
    this.renderAdminProductsList();
    showToast("Product removed from shop");
  },

  /* ==========================================================================
     TAB 5: SERVICES MANAGER (ADD, EDIT, REMOVE)
     ========================================================================== */
  renderAdminServicesList() {
    const list = document.getElementById('admin-services-list');
    if (!list) return;

    const items = AppState.data.services || [];
    if (items.length === 0) {
      list.innerHTML = `<tr><td colspan="2" style="text-align:center; padding: 1.5rem; color: var(--theme-text-muted);">No service packages yet. Add one above!</td></tr>`;
      return;
    }

    list.innerHTML = items.map(s => `
      <tr>
        <td>
          <div style="font-weight: 700; color: var(--theme-text-main); font-size: 1rem;">${s.title}</div>
          <div style="font-size: 0.8rem; color: var(--theme-gold); font-weight: 600;">${s.subtitle || ''} • ⏱️ ${s.duration || 'Custom'}</div>
          <div style="font-size: 0.78rem; color: var(--theme-text-muted); margin-top: 0.2rem;">${(s.features || []).length} Inclusions</div>
        </td>
        <td style="width: 140px; text-align: right;">
          <div style="display: flex; gap: 0.45rem; justify-content: flex-end;">
            <button class="btn btn-outline btn-sm" onclick="AdminPortal.editService('${s.id}')" title="Edit service package">✏️ Edit</button>
            <button class="btn btn-sm" style="background: #ba1a1a; color: white;" onclick="AdminPortal.deleteService('${s.id}')" title="Remove service">🗑️ Delete</button>
          </div>
        </td>
      </tr>
    `).join('');
  },

  editService(id) {
    const s = (AppState.data.services || []).find(item => item.id === id);
    if (!s) return;

    document.getElementById('srv-edit-id').value = s.id;
    document.getElementById('srv-title-input').value = s.title;
    const subEl = document.getElementById('srv-subtitle-input');
    if (subEl) subEl.value = s.subtitle || '';
    document.getElementById('srv-duration-input').value = s.duration || '';
    document.getElementById('srv-desc-input').value = s.description || '';
    document.getElementById('srv-features-input').value = (s.features || []).join('\n');

    const btnText = document.getElementById('srv-form-btn-text');
    if (btnText) btnText.textContent = 'Update Service';

    document.getElementById('srv-form-container').scrollIntoView({ behavior: 'smooth' });
  },

  resetServiceForm() {
    document.getElementById('srv-edit-id').value = '';
    document.getElementById('srv-title-input').value = '';
    const subEl = document.getElementById('srv-subtitle-input');
    if (subEl) subEl.value = '';
    document.getElementById('srv-duration-input').value = '';
    document.getElementById('srv-desc-input').value = '';
    document.getElementById('srv-features-input').value = '';

    const btnText = document.getElementById('srv-form-btn-text');
    if (btnText) btnText.textContent = 'Add Service';
  },

  saveService(e) {
    e.preventDefault();
    const editId = document.getElementById('srv-edit-id').value;
    const title = document.getElementById('srv-title-input').value.trim();
    const subEl = document.getElementById('srv-subtitle-input');
    const subtitle = subEl ? subEl.value.trim() : '';
    const duration = document.getElementById('srv-duration-input').value.trim() || 'Custom Duration';
    const description = document.getElementById('srv-desc-input').value.trim();
    const features = document.getElementById('srv-features-input').value.split('\n').map(f => f.trim()).filter(Boolean);

    if (!title) {
      showToast("Please provide Service Title");
      return;
    }

    const current = DataService.load();
    current.services = current.services || [];

    if (editId) {
      const idx = current.services.findIndex(s => s.id === editId);
      if (idx !== -1) {
        current.services[idx] = {
          ...current.services[idx],
          title, subtitle, duration, description, features
        };
        showToast("Service package updated! 💍");
      }
    } else {
      current.services.push({
        id: `srv-${Date.now()}`,
        title,
        subtitle,
        duration,
        description,
        features: features.length ? features : ["Customized Mehndi Application", "Organic Cones Included"],
        category: "Bridal"
      });
      showToast("New Service package added! 💍");
    }

    this.saveAndSync(current);
    this.renderAdminServicesList();
    this.resetServiceForm();
  },

  deleteService(id) {
    const s = (AppState.data.services || []).find(item => item.id === id);
    const title = s ? s.title : 'this service';
    if (!confirm(`Are you sure you want to remove "${title}"?`)) return;

    const current = DataService.load();
    current.services = (current.services || []).filter(s => s.id !== id);
    this.saveAndSync(current, "Service package removed");
    this.renderAdminServicesList();
  },

  /* ==========================================================================
     TAB 6: TEACH / ACADEMY COURSES MANAGER (ADD, EDIT, REMOVE)
     ========================================================================== */
  renderAdminCoursesList() {
    const list = document.getElementById('admin-courses-list');
    if (!list) return;

    const items = AppState.data.courses || [];
    if (items.length === 0) {
      list.innerHTML = `<tr><td colspan="3" style="text-align:center; padding: 1.5rem; color: var(--theme-text-muted);">No masterclasses added yet.</td></tr>`;
      return;
    }

    list.innerHTML = items.map(c => `
      <tr>
        <td style="width: 70px;">
          <img src="${c.image}" alt="${c.title}" style="width: 58px; height: 58px; border-radius: 8px; object-fit: cover; border: 1px solid var(--theme-border);" />
        </td>
        <td>
          <strong style="font-size: 0.95rem;">${c.title}</strong>
          <div style="font-size: 0.78rem; color: var(--theme-gold); font-weight: 600;">${c.mode || "Studio & Online"} ${c.badge ? "• " + c.badge : ""}</div>
        </td>
        <td style="width: 140px; text-align: right;">
          <div style="display: flex; gap: 0.45rem; justify-content: flex-end;">
            <button class="btn btn-outline btn-sm" onclick="AdminPortal.editCourse('${c.id}')">✏️ Edit</button>
            <button class="btn btn-sm" style="background: #ba1a1a; color: white;" onclick="AdminPortal.deleteCourse('${c.id}')">🗑️ Delete</button>
          </div>
        </td>
      </tr>
    `).join('');
  },

  editCourse(id) {
    const course = (AppState.data.courses || []).find(c => c.id === id);
    if (!course) return;

    document.getElementById('course-edit-id').value = course.id;
    document.getElementById('course-title-input').value = course.title;
    const feeEl = document.getElementById('course-fee-input');
    if (feeEl) feeEl.value = course.nextBatch || '';
    document.getElementById('course-duration-input').value = course.duration;
    document.getElementById('course-mode-input').value = course.mode || 'Studio & Online';
    document.getElementById('course-image-url').value = course.image;
    document.getElementById('course-desc-input').value = course.description || '';
    document.getElementById('course-syllabus-input').value = (course.curriculum || []).join('\n');

    const preview = document.getElementById('course-img-preview');
    if (preview && course.image) {
      preview.src = course.image;
      preview.style.display = 'block';
    }

    const btnText = document.getElementById('course-form-btn-text');
    if (btnText) btnText.textContent = 'Update Course';

    document.getElementById('course-form-container').scrollIntoView({ behavior: 'smooth' });
  },

  resetCourseForm() {
    document.getElementById('course-edit-id').value = '';
    document.getElementById('course-title-input').value = '';
    const feeEl = document.getElementById('course-fee-input');
    if (feeEl) feeEl.value = '';
    document.getElementById('course-duration-input').value = '4 Weeks';
    document.getElementById('course-mode-input').value = 'Studio & Online';
    document.getElementById('course-image-url').value = '';
    document.getElementById('course-image-file').value = '';
    document.getElementById('course-desc-input').value = '';
    document.getElementById('course-syllabus-input').value = '';
    const preview = document.getElementById('course-img-preview');
    if (preview) {
      preview.src = '';
      preview.style.display = 'none';
    }
    const btnText = document.getElementById('course-form-btn-text');
    if (btnText) btnText.textContent = 'Add Course';
  },

  saveCourse(e) {
    e.preventDefault();
    const editId = document.getElementById('course-edit-id').value;
    const title = document.getElementById('course-title-input').value.trim();
    const feeEl = document.getElementById('course-fee-input');
    const nextBatch = feeEl ? feeEl.value.trim() : 'Starts 15th of Next Month';
    const duration = document.getElementById('course-duration-input').value.trim() || '4 Weeks';
    const mode = document.getElementById('course-mode-input').value.trim() || 'Studio & Online';
    const image = document.getElementById('course-image-url').value.trim() || 'assets/images/teach_mehndi.jpg';
    const desc = document.getElementById('course-desc-input').value.trim();
    const curriculum = document.getElementById('course-syllabus-input').value.split('\n').map(s => s.trim()).filter(Boolean);

    if (!title) {
      showToast("Please provide course title");
      return;
    }

    const current = DataService.load();
    current.courses = current.courses || [];

    if (editId) {
      const index = current.courses.findIndex(c => c.id === editId);
      if (index !== -1) {
        current.courses[index] = {
          ...current.courses[index],
          title, duration, mode, image, description: desc, nextBatch, curriculum
        };
        showToast("Course masterclass updated! 🎓");
      }
    } else {
      const newCourse = {
        id: `course-${Date.now()}`,
        title,
        level: "All Levels",
        duration,
        badge: "Hands-on Workshop",
        mode,
        nextBatch,
        seats: "Limited seats per batch",
        image,
        description: desc,
        curriculum: curriculum.length ? curriculum : ["Cone control & pressure ergonomics", "Bridal motifs breakdown"],
        includes: ["Complete Practice Kit", "Worksheets", "Certificate of Completion"]
      };
      current.courses.push(newCourse);
      showToast("New Masterclass added! 🎓");
    }

    this.saveAndSync(current);
    this.renderAdminCoursesList();
    this.resetCourseForm();
  },

  deleteCourse(id) {
    const c = (AppState.data.courses || []).find(item => item.id === id);
    const title = c ? c.title : 'this course';
    if (!confirm(`Are you sure you want to remove "${title}"?`)) return;

    const current = DataService.load();
    current.courses = (current.courses || []).filter(c => c.id !== id);
    this.saveAndSync(current, "Course removed");
    this.renderAdminCoursesList();
  },

  /* ==========================================================================
     TAB 7: CUSTOMER REVIEWS MANAGER
     ========================================================================== */
  renderAdminReviewsList() {
    const list = document.getElementById('admin-reviews-list');
    if (!list) return;

    const items = AppState.data.reviews || [];
    list.innerHTML = items.map(r => `
      <tr>
        <td>
          <div style="display: flex; gap: 0.5rem; align-items: center;">
            <strong style="color: var(--theme-primary);">${r.name}</strong>
            <span style="font-size: 0.75rem; color: var(--theme-gold);">★ ${r.rating || 5}</span>
            <span style="font-size: 0.75rem; color: var(--theme-text-muted);">(${r.role} • ${r.city})</span>
          </div>
          <p style="font-size: 0.85rem; color: var(--theme-text-muted); margin-top: 0.25rem;">"${r.comment}"</p>
        </td>
        <td style="width: 90px; text-align: right;">
          <button class="btn btn-sm" style="background: #ba1a1a; color: white;" onclick="AdminPortal.deleteReview('${r.id}')">Delete</button>
        </td>
      </tr>
    `).join('');
  },

  deleteReview(id) {
    if (!confirm("Delete this client review?")) return;
    const current = DataService.load();
    current.reviews = (current.reviews || []).filter(r => r.id !== id);
    this.saveAndSync(current, "Review deleted");
    this.renderAdminReviewsList();
  },

  /* ==========================================================================
     TAB 8: BACKUP, EXPORT & RESTORE
     ========================================================================== */
  exportBackup() {
    const data = DataService.load();
    const str = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const dl = document.createElement('a');
    dl.setAttribute("href", str);
    dl.setAttribute("download", `Sakshi_Mehndi_Data_Backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(dl);
    dl.click();
    dl.remove();
    showToast("Complete Website Backup Downloaded! 💾");
  },

  importBackup(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (parsed && typeof parsed === 'object') {
          DataService.save(parsed);
          AppState.data = DataService.load();
          if (typeof renderAllSections === 'function') {
            renderAllSections();
          }
          this.showDashboard();
          showToast("Backup restored successfully! All pages updated live! ✨");
        } else {
          showToast("Invalid backup file format");
        }
      } catch (err) {
        showToast("Error reading backup JSON file");
      }
    };
    reader.readAsText(file);
  },

  copyDataAsJson() {
    const data = DataService.load();
    const jsonStr = JSON.stringify(data, null, 2);
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(jsonStr).then(() => {
        showToast("Full Site Data copied to clipboard as JSON! 📋");
      }).catch(() => {
        this.fallbackCopyText(jsonStr);
      });
    } else {
      this.fallbackCopyText(jsonStr);
    }
  },

  fallbackCopyText(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      showToast("Full Site Data copied to clipboard as JSON! 📋");
    } catch (err) {
      prompt("Copy your Site JSON manually:", text);
    }
    document.body.removeChild(textarea);
  },

  resetDefaults() {
    if (!confirm("Reset website to default content? All custom edits will be restored to initial state.")) return;
    DataService.reset();
    AppState.data = DataService.load();
    if (typeof renderAllSections === 'function') {
      renderAllSections();
    }
    this.showDashboard();
    showToast("Website reset to initial default state! ✨");
  },

  // Aliases for template buttons
  exportData() { this.exportBackup(); },
  importData(e) { this.importBackup(e); },
  resetAllDefaults() { this.resetDefaults(); }
};

// Initialize Admin Portal on DOM load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => AdminPortal.init());
} else {
  AdminPortal.init();
}
