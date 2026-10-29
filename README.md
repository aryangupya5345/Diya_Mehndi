# Sakshi Mehndi Atelier & Academy - Ultra-Luxury Glass Web Platform

An ultra-luxurious, glassmorphic web application built for a professional Mehndi (Henna) Artist business. Engineered for Google Search visibility, direct client bookings, e-commerce sales of mehndi items, dedicated learning masterclasses, customer reviews, and complete real-time customization for the website owner.

---

## 🌟 Key Features

### 1. 💎 Ultra-Luxury Glassmorphism & Professional Finish
- Multi-layer frosted glass cards with `backdrop-filter: blur(16px - 24px)`.
- Specular edge highlights and subtle golden rim gradients.
- Floating glass badges and frosted modals.

### 2. 🔤 Clean, Legible & Royal Typography
- **Headings & Titles**: `'Cormorant Garamond'` — a breathtaking, majestic luxury bridal serif font that is graceful yet crystal clear.
- **Brand Accents & Badges**: `'Cinzel'` — timeless imperial aesthetic.
- **Body & UI Controls**: `'Plus Jakarta Sans'` — ultra-modern geometric font engineered for effortless reading on both mobile and desktop screens.

### 3. 🌗 Seamless Dark & Light Theme Switcher
- Dedicated toggle button (`☀️` / `🌙`) in the sticky header and mobile navigation drawer.
- **Light Theme**: Warm pearl champagne linen, rose gold accents, and frosted glass cards.
- **Dark Theme**: Deep royal midnight velvet noir (`#0f0a0c`), luminous imperial gold borders, and glowing accents.
- Remembers customer preference automatically via `localStorage`.

### 4. 🎓 Dedicated "Learn Mehndi" Top Button & Masterclasses
- Prominently featured in the top header with an animated pulsing notification badge: **"🎓 Learn Mehndi"**.
- Dedicated Academy section showcasing:
  - **Foundations to Professional Bridal Artist Certification** (4 Weeks, with free practice kit delivered)
  - **Gulf Arabic & Modern Shading Masterclass**
  - **Weekend Bridal Figure & Dulha-Dulhan Intensive**
- Syllabus highlights, free kit perks, batch schedules, and instant 1-tap **WhatsApp Enrollment**.

### 5. ⭐ Customer Review Feature
- Public **"Share Your Review & Experience"** button in the reviews section.
- Interactive modal with 5-star rating selector, client name, service/occasion dropdown, city, and review message.
- Submissions appear live on the website immediately and are stored persistently.
- In the **Owner Admin Portal**, the website owner can view, manage, and delete customer reviews.

### 6. 👑 Full Admin Control Over Every Text, Image & Detail
- Protected Owner Atelier Portal (**PIN:** `1234`) accessible from the header or floating button.
- Gives the owner complete control to edit:
  - **Brand & Contacts**: Brand name, artist name, phone, WhatsApp number (for orders & inquiries), email, address, studio hours, Instagram.
  - **Hero & All Section Texts**: Change every heading, highlight word, lead paragraph, section titles, and upload a new hero photo from your device.
  - **Mehndi Arts Gallery**: Add new artworks with local photo upload (automatically converted to base64 DataURL so images work immediately without extra hosting!) or image URL, edit titles, categories, and tags, or delete older designs.
  - **Shop Items & Cones**: Add products, change prices, discounts, stock availability (**In Stock** vs. **Sold Out**), and photos.
  - **Services & Packages**: Add and customize bridal packages, prices, duration, and included features.
  - **Teach / Academy**: Add and edit masterclasses, fees, duration, syllabus topics, and images.
  - **Customer Reviews**: Moderate, edit, or delete reviews.
  - **Backup & Google Hub**: 1-click JSON backup export/import and Google Search Console & Google Maps listing checklist.
- All changes apply live immediately without reloading the page!

### 7. 🛍️ E-Commerce Shop & 1-Tap WhatsApp Checkout
- Fresh organic Rajasthani Sojat cones, triple-filtered powder, eucalyptus essential oils, and acrylic practice boards.
- Slide-out Cart Drawer with item count badge, quantity adjustment, real-time subtotal, and **WhatsApp Checkout** that formats full customer details and order list.

---

## 🚀 How to Run Locally

You can preview the website locally in two ways:

### Option A: Open Directly
Double-click [`index.html`](file:///c:/Users/aryan/OneDrive/Desktop/Mehndi/index.html) in your file explorer to open it in Google Chrome or any browser.

### Option B: Local Server (Recommended)
Open PowerShell in this directory and run:
```powershell
python -m http.server 8080
```
Then visit `http://localhost:8080` in your web browser.

---

## 👑 Owner Portal Passcode
- **Default PIN:** `1234`
