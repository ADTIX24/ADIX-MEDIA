# 🎯 AI Prompt Templates لبناء المواقع (2025)

مجموعة من الـprompts الجاهزة لبناء أنواع مختلفة من المواقع باستخدام أدوات AI مثل v0.dev، Lovable، Bolt.new، Cursor و Claude Code.

## 🏠 1. موقع عرض أعمال / بورتفوليو

### Prompt أساسي ل v0.dev / Lovable:
```
Build a modern, dark-mode portfolio website for a digital agency called ADIX MEDIA. The company provides web design, digital advertising, content creation, and SEO services. 

Key requirements:
- Modern dark theme (primary color #0b0d17, accent color #ff6b6b)
- Responsive design for all devices
- Hero section with animated 3D background (geometric shapes floating)
- Services section with 4 cards (Web Design, Digital Ads, Content, SEO)
- Portfolio showcase with 3D project previews
- Contact form with smooth validation
- Scroll animations throughout (GSAP/Framer Motion)
- Built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui

Make it look premium and professional, similar to betternights.com and aether1.ai aesthetics.
```

### Prompt لإضافة 3D:
```
Add a 3D interactive background to the hero section using React Three Fiber. 
The scene should include:
- Floating geometric shapes (octahedron, torus knot, icosahedron)
- Slow rotation and gentle floating animation
- Smooth performance on mobile (under 100KB)
- Wireframe materials with accent color glow
- Camera that slowly pans for depth

Use @react-three/fiber and @react-three/drei. Implement with React Server Components where possible.
```

### Prompt للأنيميشن على التمرير:
```
Add scroll-triggered animations to the services section:
- Each service card fades in from the bottom with a stagger effect
- Cards have a subtle hover scale effect
- Use Framer Motion's AnimatePresence
- Add parallax effect to the background elements
- Ensure animations respect prefers-reduced-motion

Implement in Next.js with TypeScript. Use the scrollYProgress hook from Framer Motion.
```

## 🛒 2. متجر إلكتروني

### Prompt أساسي:
```
Create a modern e-commerce website for selling premium digital services. The store should have:

1. Product listing page with:
   - Grid layout (3 products per row on desktop, 1 on mobile)
   - Filter sidebar (price range, category, rating)
   - Sort dropdown (price low-high, popularity, newest)
   - Each product shows: image, title, price, rating, short description

2. Product detail page with:
   - Large image gallery with thumbnail navigation
   - Product title, price, description
   - Variant selection (dropdown or color swatches)
   - Quantity selector
   - Add to cart button with animation
   - Related products section

3. Cart page with:
   - List of cart items with remove button
   - Price breakdown (subtotal, tax, shipping)
   - Checkout button

Use Next.js, TypeScript, Tailwind CSS, and a cart state management solution.
Include smooth animations and a premium dark theme.
```

### Prompt مع Stripe:
```
Integrate Stripe payment processing into the e-commerce checkout flow:

1. Set up Stripe checkout session creation
2. Create a checkout page with:
   - Form for customer details (name, email, address)
   - Payment form using @stripe/react-stripe-js
   - Order summary on the right side
   - Secure payment button

3. Add success and cancel pages
4. Handle payment webhook for order confirmation
5. Add loading states during checkout

Use Next.js API routes for server-side Stripe integration.
Include proper error handling and user feedback.
```

## 📅 3. موقع حجز ومواعيد

### Prompt أساسي:
```
Build a complete appointment booking website for a medical clinic. Features needed:

1. Landing page with:
   - Hero section introducing the clinic
   - Services overview
   - Doctor profiles with photos
   - Testimonials/reviews
   - Contact information

2. Booking flow:
   - Step 1: Service selection (dropdown or cards)
   - Step 2: Doctor selection
   - Step 3: Date and time picker (show available slots)
   - Step 4: Patient details form
   - Step 5: Confirmation page with booking details
   - Email confirmation integration

3. Admin dashboard:
   - Calendar view (week/month/day)
   - Manage appointments
   - Manage doctors and availability
   - Patient management

Use Next.js, TypeScript, Tailwind CSS, and a calendar library (FullCalendar or react-big-calendar).
Include form validation with react-hook-form and Zod.
```

### Prompt للتقويم:
```
Add a modern calendar/time-slot picker component:

1. Month view with day selection
2. Time slots displayed in 30-minute intervals
3. Available slots shown in accent color, unavailable in gray
4. Click to select a slot (with visual feedback)
5. Mobile-friendly responsive design
6. Keyboard navigation support

Use React Day Picker or a custom solution.
Ensure accessibility with proper ARIA labels and focus management.
```

## 🎨 4. موقع إبداعي / دريم كور

### Prompt للـ3D Interactive:
```
Create an immersive 3D product showcase page with:

1. Full-screen 3D canvas using React Three Fiber
2. 3D product model (sneakers) that users can rotate and inspect
3. Interactive hotspots showing product features (material, design, comfort)
4. Color configurator (change product colors instantly)
5. Realistic lighting with environment map
6. AR button for mobile (model-viewer component)
7. Parallax scroll effect connecting 3D scene to content below

Use @react-three/fiber, @react-three/drei, and @react-three/cannon.
Models should be optimized GLB format.
Include loading screen with progress bar.

Performance target: 60fps on mobile, under 2MB total assets.
```

### Prompt للخلفية المتحركة:
```
Create an animated background with particle effects:

1. Canvas with floating particles (circles of varying sizes)
2. Mouse interaction (particles follow cursor with slight delay)
3. Connection lines between nearby particles
4. Color scheme matching dark theme (primary #0b0d17, accent #ff6b6b)
5. Performance optimized (max 100 particles, requestIdleCallback)
6. Responsive (fewer particles on mobile)

Use vanilla JavaScript or Three.js for performance.
Include option to disable on low-end devices.
```

## 📊 5. لوحة تحكم / Dashboard

### Prompt أساسي:
```
Build a modern admin dashboard with:

1. Sidebar navigation (collapsed on mobile):
   - Dashboard
   - Analytics
   - Orders
   - Products
   - Customers
   - Settings

2. Main dashboard with:
   - Stats cards (revenue, orders, customers, conversion)
   - Revenue chart (line chart)
   - Recent orders table
   - Top products list

3. Orders page:
   - Filter by status (pending, processing, shipped, delivered)
   - Search functionality
   - Order detail view modal
   - Export to CSV button

4. Settings page:
   - Profile settings form
   - Password change form
   - Theme customization (light/dark/system)

Use Next.js, TypeScript, Tailwind CSS, and a charting library (Chart.js or Recharts).
Include dark mode toggle with localStorage persistence.
Add proper table sorting and pagination.
```

## 🚀 6. موقع SaaS / Landing Page

### Prompt أساسي:
```
Create a premium SaaS landing page with:

1. Hero section:
   - Headline (max 12 words)
   - Subheadline (25-30 words)
   - CTA buttons (primary and secondary)
   - Hero image or illustration
   - Trust badges (customers, funding, security)

2. Problem section:
   - Illustration or icon
   - Headline and description

3. Solution section:
   - Key features (3-4 with icons)
   - Use case examples with screenshots

4. Testimonial section:
   - Carousel with customer quotes
   - Customer photos and details

5. Pricing section:
   - 3-tier comparison table
   - Annual/monthly toggle
   - FAQ section

6. CTA section:
   - Final call to action
   - Contact information

Use Tailwind CSS and include:
- Smooth scroll navigation
- Sticky header with blur effect
- Animated counters for stats
- Form validation for newsletter signup
- Mobile-responsive design
- SEO optimized with proper meta tags

Make it look premium like Linear, Figma, or Notion marketing pages.
```

## 📱 7. تطبيق React Native (Mobile)

### Prompt:
```
Convert the web landing page to a React Native mobile app:

1. Home screen with hero section and services carousel
2. Service detail screen
3. Booking/contact screen with forms
4. Profile screen with settings
5. Dark mode support

Use Expo for cross-platform compatibility.
Include smooth animations with React Native Reanimated.
Ensure proper spacing and touch targets for mobile UX.
Use native components for best performance.
```

## 🎯 8. موقع تطبيقات طبية

### Prompt أساسي:
```
Build a medical clinic website with appointment booking:

1. Homepage with:
   - Hero section with call-to-action
   - Our doctors section (photos, specialties)
   - Services overview
   - Why choose us (trust factors)
   - Patient testimonials
   - Contact form

2. Services pages (for each service):
   - Detailed description
   - Doctor information
   - Pricing
   - Booking CTA

3. Doctors page:
   - Grid of all doctors with photos
   - Filter by specialty
   - Individual doctor profiles

4. Appointment booking system:
   - Multi-step form
   - Date/time picker
   - Form validation
   - Confirmation

Requirements:
- Medical aesthetic (clean, professional, trustworthy)
- WCAG 2.1 AA compliant
- HIPAA considerations (no patient data stored)
- Mobile-first responsive design
- SEO optimized

Color palette: whites, light blues, and professional grays.
```

## 🛠️ أدوات النشر والتكوين

### Prompt للـVercel Configuration:
```
Set up Vercel deployment configuration for a Next.js application:

1. Create vercel.json with:
   - Clean URLs
   - Security headers (CSP, X-Frame-Options, etc.)
   - Redirects for old URLs
   - Image optimization settings

2. Create .github/workflows/ci.yml for:
   - Linting on push
   - Type checking
   - Build verification
   - Preview deployments for PRs

3. Ensure environment variables are properly configured:
   - NEXT_PUBLIC_API_URL
   - Database connection strings
   - Third-party API keys (Stripe, etc.)

4. Set up performance monitoring:
   - Vercel Analytics
   - Error tracking with Sentry
   - Performance budgets

Include instructions for both GitHub integration and manual deployment.
```

## 📋 نماذج الأوامر السريعة

### أوامر Next.js:
```bash
# إنشاء مشروع جديد
npx create-next-app@latest my-project --typescript --tailwind

# تشغيل التطوير
pnpm dev

# البناء للإنتاج
pnpm build

# تشغيل الإصدار الإنتاجي
pnpm start

# فحص الأخطاء
pnpm lint

# فحص الأنواع
pnpm type-check
```

### أوامر النشر على Vercel:
```bash
# تثبيت Vercel CLI
npm install -g vercel

# ربط المشروع
vercel link

# النشر
vercel --prod

# سحب المتغيرات البيئية
vercel env pull .env.local
```

### أوامر GitHub:
```bash
# تهيئة المستودع
git init
git add -A
git commit -m "feat: initial commit"

# ربط بـ GitHub
git remote add origin git@github.com:username/repo.git
git branch -M main
git push -u origin main

# إنشاء فرع
git checkout -b feature/new-feature
```

---

هذه الـprompts جاهزة للنسخ واللصق في أدوات مثل v0.dev، Lovable، Bolt.new، أو Cursor. عدّل التفاصيل حسب احتياجات مشروعك.