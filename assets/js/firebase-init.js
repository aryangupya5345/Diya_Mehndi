/**
 * Sakshi Mehndi Atelier - Google Firebase Integration
 * Initializes Firebase App, Google Analytics, and Cloud Firestore for worldwide instant data syncing.
 * Kept isolated in this separate module to preserve site modularity and performance.
 */

import { initializeApp, getApps } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAnalytics, logEvent, isSupported } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-analytics.js";
import { getFirestore, doc, getDoc, setDoc, deleteDoc, collection, onSnapshot } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Protected configuration payload (encoded to safeguard from raw inspection)
const _0xfbEnc = "eyJhcGlLZXkiOiJBSXphU3lDQW9QQzZkRllqY1FQemtqYVFKNmY1N3BmSFZXNGdOcFUiLCJhdXRoRG9tYWluIjoibWVobmRpLWJ5LXNha3NoaS5maXJlYmFzZWFwcC5jb20iLCJwcm9qZWN0SWQiOiJtZWhuZGktYnktc2Frc2hpIiwic3RvcmFnZUJ1Y2tldCI6Im1laG5kaS1ieS1zYWtzaGkuZmlyZWJhc2VzdG9yYWdlLmFwcCIsIm1lc3NhZ2luZ1NlbmRlcklkIjoiODA5MzU5Njk2OTUiLCJhcHBJZCI6IjE6ODA5MzU5Njk2OTU6d2ViOmU2OTMxOTlhMjY1MDZlZDk5NDEzYWEiLCJtZWFzdXJlbWVudElkIjoiRy0yS0s4RjFCSlBKIn0=";

(async function initFirebase() {
  try {
    // 1. Decode Firebase configuration
    const config = JSON.parse(atob(_0xfbEnc));

    // 2. Initialize Firebase strictly once
    let app;
    if (getApps().length === 0) {
      app = initializeApp(config);
    } else {
      app = getApps()[0];
    }

    // --------------------------------------------------------------------------
    // 3. CLOUD FIRESTORE REAL-TIME SYNCHRONIZATION ENGINE
    // --------------------------------------------------------------------------
    const db = getFirestore(app);
    const liveDataDocRef = doc(db, "site_content", "live_data");
    let isSavingFromThisClient = false;

    // Global save function callable by DataService & AdminPortal
    window.saveFirestoreData = async function(data) {
      try {
        isSavingFromThisClient = true;
        // Strip gallery so live_data never exceeds the 1MB Firestore limit
        const { gallery: ignoredGallery, ...settingsData } = data;
        const cleanData = JSON.parse(JSON.stringify(settingsData));
        await setDoc(liveDataDocRef, cleanData);
        setTimeout(() => { isSavingFromThisClient = false; }, 1200);
        return { success: true };
      } catch (err) {
        isSavingFromThisClient = false;
        console.error("Firestore sync error:", err);
        return { success: false, error: err };
      }
    };

    // Save individual artwork to high-capacity Firestore collection
    window.saveFirestoreArtwork = async function(art) {
      if (!art || !art.id) return { success: false, error: 'Missing artwork id' };
      try {
        const cleanArt = JSON.parse(JSON.stringify(art));
        const artDocRef = doc(db, "gallery_artworks", String(art.id));
        await setDoc(artDocRef, cleanArt);
        return { success: true };
      } catch (err) {
        console.error("Firestore artwork sync error:", err);
        return { success: false, error: err };
      }
    };

    // Delete artwork from Firestore collection
    window.deleteFirestoreArtwork = async function(artId) {
      if (!artId) return { success: false };
      try {
        const artDocRef = doc(db, "gallery_artworks", String(artId));
        await deleteDoc(artDocRef);
        return { success: true };
      } catch (err) {
        console.error("Firestore artwork delete error:", err);
        return { success: false, error: err };
      }
    };

    // Flush any pending sync queued before Firestore initialized
    if (window._pendingFirestoreSync) {
      const pendingData = window._pendingFirestoreSync;
      window._pendingFirestoreSync = null;
      window.saveFirestoreData(pendingData);
    }

    // Flush any pending artworks queued before Firestore initialized
    if (window._pendingFirestoreArtworks && Array.isArray(window._pendingFirestoreArtworks)) {
      const pendingArts = [...window._pendingFirestoreArtworks];
      window._pendingFirestoreArtworks = [];
      pendingArts.forEach(art => window.saveFirestoreArtwork(art));
    }

    // --------------------------------------------------------------------------
    // A. Real-time collection listener for Artworks (Instant cross-device gallery sync)
    // --------------------------------------------------------------------------
    const galleryColRef = collection(db, "gallery_artworks");
    onSnapshot(galleryColRef, (colSnap) => {
      if (isSavingFromThisClient) return;

      if (!colSnap.empty) {
        const cloudArtworks = [];
        colSnap.forEach((docSnap) => {
          const item = docSnap.data();
          if (item && item.id) {
            cloudArtworks.push(item);
          }
        });

        // Sort chronologically (newest first)
        cloudArtworks.sort((a, b) => {
          const timeA = new Date(a.createdAt || 0).getTime();
          const timeB = new Date(b.createdAt || 0).getTime();
          if (timeB !== timeA) return timeB - timeA;
          return (Number(b.order) || 0) - (Number(a.order) || 0);
        });

        if (typeof AppState !== 'undefined') {
          AppState.data.gallery = cloudArtworks;
        }
        if (typeof LocalDB !== 'undefined') {
          LocalDB.set('mehndi_gallery_artworks', cloudArtworks);
        }
        localStorage.setItem('mehndi_has_custom_gallery', 'true');
        try {
          localStorage.setItem('mehndi_gallery_cache', JSON.stringify(cloudArtworks));
        } catch (e) {}

        if (typeof renderGallery === 'function') {
          renderGallery();
        }
        if (typeof AdminPortal !== 'undefined' && AdminPortal.isAuthenticated && typeof AdminPortal.renderAdminGalleryList === 'function') {
          AdminPortal.renderAdminGalleryList();
        }
      }
    }, (error) => {
      console.warn("Firestore gallery collection sync notice:", error);
    });

    // --------------------------------------------------------------------------
    // B. Real-time settings listener (profile, text, hero, services, courses, reviews)
    // --------------------------------------------------------------------------
    onSnapshot(liveDataDocRef, (docSnap) => {
      if (isSavingFromThisClient) return;

      if (docSnap.exists()) {
        const cloudData = docSnap.data();
        if (cloudData && typeof cloudData === 'object') {
          const base = (typeof DEFAULT_MEHNDI_DATA !== 'undefined') ? DEFAULT_MEHNDI_DATA : {};
          const { gallery: ignoredOldGallery, ...cloudSettings } = cloudData;

          // Preserve currently active gallery (never overwrite user uploads with sample defaults)
          const activeGallery = (typeof AppState !== 'undefined' && AppState.data && AppState.data.gallery && AppState.data.gallery.length > 0)
            ? AppState.data.gallery
            : ((typeof DEFAULT_MEHNDI_DATA !== 'undefined' && localStorage.getItem('mehndi_has_custom_gallery') !== 'true') ? DEFAULT_MEHNDI_DATA.gallery : []);

          const mergedData = {
            ...base,
            ...cloudSettings,
            gallery: activeGallery,
            profile: { ...(base.profile || {}), ...(cloudSettings.profile || {}) },
            hero: { ...(base.hero || {}), ...(cloudSettings.hero || {}) },
            sectionHeaders: { ...(base.sectionHeaders || {}), ...(cloudSettings.sectionHeaders || {}) },
            academyBanner: { ...(base.academyBanner || {}), ...(cloudSettings.academyBanner || {}) }
          };

          const storageKey = (typeof DataService !== 'undefined' && DataService.STORAGE_KEY) || "mehndi_atelier_data_v6";
          try {
            const { gallery: g, ...settingsOnly } = mergedData;
            localStorage.setItem(storageKey, JSON.stringify(settingsOnly));
          } catch (e) {}

          if (typeof AppState !== 'undefined') {
            AppState.data = mergedData;
          }
          if (typeof renderAllSections === 'function') {
            renderAllSections();
          }

          if (typeof AdminPortal !== 'undefined' && AdminPortal.isAuthenticated) {
            if (typeof AdminPortal.loadProfileForm === 'function') AdminPortal.loadProfileForm();
            if (typeof AdminPortal.loadHeroAndTextForm === 'function') AdminPortal.loadHeroAndTextForm();
            if (typeof AdminPortal.renderAdminGalleryList === 'function') AdminPortal.renderAdminGalleryList();
            if (typeof AdminPortal.renderAdminProductsList === 'function') AdminPortal.renderAdminProductsList();
            if (typeof AdminPortal.renderAdminCoursesList === 'function') AdminPortal.renderAdminCoursesList();
          }
        }
      } else {
        // Initial setup: Seed Firestore with default settings if empty
        const initialData = (typeof AppState !== 'undefined' && AppState.data) || 
                            (typeof DEFAULT_MEHNDI_DATA !== 'undefined' ? DEFAULT_MEHNDI_DATA : null);
        if (initialData) {
          const { gallery: g, ...settingsOnly } = initialData;
          setDoc(liveDataDocRef, settingsOnly).then(() => {
            console.log("Cloud Firestore seeded with initial atelier settings.");
          }).catch(err => {
            console.warn("Could not seed Firestore initial data:", err);
          });
        }
      }
    }, (error) => {
      console.warn("Firestore real-time sync notice:", error);
    });

    // --------------------------------------------------------------------------
    // 4. FIREBASE ANALYTICS (TRAFFIC & PAGE VIEWS)
    // --------------------------------------------------------------------------
    const supported = await isSupported().catch(() => false);
    if (supported) {
      const analytics = getAnalytics(app);

      // Track initial page view and traffic metrics
      logEvent(analytics, 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: window.location.pathname
      });

      // Global helper for tracking custom business conversion events
      window.trackMehndiEvent = function(eventName, params = {}) {
        if (!analytics) return;
        try {
          logEvent(analytics, eventName, {
            ...params,
            timestamp: new Date().toISOString()
          });
        } catch (err) {}
      };

      // Automatic tracking for high-value visitor conversion events
      document.addEventListener('click', (e) => {
        const target = e.target.closest('a, button');
        if (!target) return;

        const href = target.getAttribute('href') || '';
        const text = (target.textContent || '').trim().slice(0, 40);

        // WhatsApp booking & inquiry clicks
        if (href.includes('wa.me') || href.includes('api.whatsapp.com')) {
          window.trackMehndiEvent('whatsapp_inquiry', {
            action_label: text || 'WhatsApp Link',
            page: window.location.pathname
          });
        }
        // Direct phone call clicks
        else if (href.startsWith('tel:')) {
          window.trackMehndiEvent('phone_call_click', {
            phone_number: href.replace('tel:', ''),
            page: window.location.pathname
          });
        }
        // Instagram profile visits
        else if (href.includes('instagram.com')) {
          window.trackMehndiEvent('instagram_visit', {
            page: window.location.pathname
          });
        }
        // Bridal & Academy booking buttons
        else if (target.id === 'hero-book-btn' || (target.classList.contains('btn-primary') && text.toLowerCase().includes('book'))) {
          window.trackMehndiEvent('booking_intent_click', {
            button_text: text,
            page: window.location.pathname
          });
        }
        // Gallery category filter clicks
        else if (target.classList.contains('filter-btn')) {
          window.trackMehndiEvent('gallery_filter_click', {
            category: target.getAttribute('data-filter') || text
          });
        }
      }, { passive: true });

      // Track appointment/booking form submissions
      const bookingForm = document.getElementById('appointment-form');
      if (bookingForm) {
        bookingForm.addEventListener('submit', () => {
          window.trackMehndiEvent('booking_form_submit', {
            page: window.location.pathname
          });
        }, { passive: true });
      }
    } else {
      console.info("Firebase Analytics: Environment does not support tracking (e.g. ad-blocker or private session).");
    }

  } catch (error) {
    console.warn("Firebase initialization notice:", error);
  }
})();
