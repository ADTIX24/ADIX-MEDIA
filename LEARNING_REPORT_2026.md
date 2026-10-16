# 📘 التقرير النهائي الشامل — بناء مواقع إلكترونية احترافية 2026

## 🎯 ملخص التنفيذ

تم إجراء تحليل عميق وشامل لموقعين مرجعيتين (21st.dev و motionsites.ai) ووثائق رسمية (Next.js 15/16، Vercel، React 19، Three.js، shadcn/ui، GSAP، Stripe، Sentry، GitHub Actions)، ثم دمج كل ما تمت تعلمته في خطة تنفيذية ملموسة تشمل:
- **لغات برمجة** مطلوب تخليها للموقع يشتغل أون لاين بصورة احترافية
- **بنية ملفات مشروع** جاهزة للرفع على GitHub و Vercel
- **أدوات CI/CD** كاملة
- **نماذج جاهزة** لمواقع portfolio، متجر إلكتروني، وموقع حجز

---

## 1️⃣ تحليل موقع 21st.dev — "المكتبة الحية"

### نموذج الأعمال (Registry Model — اختيار ذهبي)

| الجانب | التفاصيل |
|--------|-----------|
| **الفكرة الأساسية** | كل مكوّن يُنسخ كـ source code مباشرة لريبوك — وليس كـ npm dependency |
| **آلية التوزيع** | صيغة Prompt جاهزة → الصقها في Claude Code / Cursor / v0 → يبنيها الأداة في مشروعك |
| **التكنولوجيا** | Next.js + TypeScript + Tailwind CSS + Framer Motion + GSAP |
| **عدد المكوّنات** | 12,000+ مكوّن، شخصية 4,091,932 مهندس تصميم |
| **العملاء** | Google, Meta, NVIDIA, ByteDance, Shopify, Vercel, Lovable, Webflow، وغيرها |
| **التسعير** | تصفّح مجاني + 2 نسخ يومياً، العضوية تفتح النسخ غير المحدودة |

### الدرس المهم: التوزيع عبر Prompt
```javascript
// النمط الذهبي اللي 21st.dev يستخدمه:
// 1. تختار مكوّن (مثلاً: Animated Hero)
// 2. تضغط "Copy Prompt" 
// 3. تلصقه في Claude Code / Cursor
// 4. الأداة تبنيه في مشروعك، مألوف على theme الخاص بك
```

### أفضل المكوّنات (أكثرها تحميلاً):
- **Scroll Media Expansion Hero** — 8.8k نسخة
- **Container Scroll Animation** — 8.7k نسخة
- **Number Ticker** — 12.4k نسخة

---

## 2️⃣ تحليل موقع motionsites.ai — "محرك المواقع ثلاثية الأبعاد"

### خط سير العمل الكامل (Full Workflow):

**المرحلة 1 — التصميم بالذكاء الاصطناعي:**
1. صورة مرجعية → **GPT Image 2.5 (Gemini)** → إنشاء 8 إصدارات بزوايا مختلفة
2. الإصدارات → **Figma** لتنظيم وتحديد الأفضل

**المرحلة 2 — تحويل الصورة إلى نموذج 3D:**
3. الصورة → **AI Image-to-3D (Higgsfield)** → تصدير GLB
4. النطاق المثالي: أبعاد نصية 1K-2K

**المرحلة 3 — البناء التلقائي:**
5. GLB + React/Tailwind + Three.js + GSAP → **Claude Code / Codex** يبني الموقع
6. استخدام `@splinetool/react-spline` أو `r3f` مباشرة

**المرحلة 4 — الإنقاذ النهائي:**
7. إصلاح tone mapping → تلميع GSAP → Deploy على Vercel

### المشاكل الشائعة الموثقة (TRAPS):
| المشكلة | الحل |
|---------|------|
| **Tone mapping** | لازم `gl.toneMapping = ACESFilmicToneMapping` وإلا النموذج يصبح مظلم |
| **ارتفاع body قصير** | لازم يكون > 100vh للـ scroll يشتغل |
| **حجم GLB كبير** | لازم 1-3MB مع Draco + KTX2 ضغط |

---

## 3️⃣ اللغات والتقنيات المطلوب تعلمها

### الأساسيات (أولوية عالية — إلزامية لكل موقع):

| الرقم | اللغة/التقنية | مستوى الإتقان | ملاحظات |
|-------|---------------|-------------|---------|
| 1 | **HTML5** | متوسط → متقدم | عناصر semantic (`<header>`, `<section>`, `<article>`، `<nav>`)، SEO-friendly structure |
| 2 | **CSS3** | متوسط → متقدم | Grid + Flexbox + Custom Properties + Container Queries + `@starting-style` |
| 3 | **JavaScript ES6+** | متوسط → متقدم | `async/await`، `modules`، `Array.reduce/map/filter`، DOM manipulation، `IntersectionObserver` |
| 4 | **TypeScript** | متوسط → متقدم | Strict Mode، `generics`، `utility types` (`Partial<T>`، `Omit<T>`...) |
| 5 | **Sass/SCSS** | متوسط | Variables، Mixins، Nesting — كل موقع professional بيستخدمه |

### الإطارات والأدوات (أولوية عالية — إلزامية للمواقع الحديثة):

| الرقم | الأداة | النسخة | ملاحظات |
|-------|--------|--------|---------|
| 6 | **React** | 19.x | `useState`، `useEffect`، `useRef`، `useContext`، `useReducer`، `use` (React 19) |
| 7 | **Next.js** | 15.x / 16.x | App Router، Server Components، Server Actions، `generateMetadata`، ISR |
| 8 | **Tailwind CSS** | v4 | CSS-first config (`@theme`), JIT built-in، Container queries |
| 9 | **Vite** | 6.x | أسرع من Webpack بكثير، default للـ Next.js و Vite |

### التخصص المتقدم (أولوية متوسطة-عالية — للتميزة):

| الرقم | الأداة | الملاحظات |
|-------|--------|-----------|
| 10 | **Three.js** | مكتبة WebGL للـ3D — التحكم الكامل |
| 11 | **React Three Fiber (R3F)** | React renderer للـ Three.js — الاختيار الأفضل إذا كنت تستخدم React |
| 12 | **@react-three/drei** | مكتبة مساعدات R3F (OrbitControls، Text3D، shaders جاهزة) |
| 13 | **GSAP** | GreenSock — الملك للأنيميشن المعقد والـ ScrollTrigger |
| 14 | **Framer Motion** | بديل أسهل من GSAP للـ UI micro-interactions |
| 15 | **Lenis** | التمرير الناعم — يجب يكون أول أداة تركّبها لكل موقع فيه scroll |

### الأدوات الإضافية (أولوية متوسطة — تحسين وتطوير):

| الرقم | الأداة | الاستخدام |
|-------|--------|-----------|
| 16 | **shadcn/ui** | مكوّنات UI مبنية على Radix — قاعدة قوية لكل مشروع |
| 17 | **React Hook Form** | إدارة state النماذج — خفيف جداً |
| 18 | **Zod** | validation schema — TypeScript-first |
| 19 | **Framer Motion** | micro-interactions، page transitions |
| 20 | **Spline** | تصميم نماذج 3D — سهل للمصممين |

### أدوات النشر والـOps (أولوية عالية — أساسي للرفع أون لاين):

| الرقم | الأداة | الملاحظات |
|-------|--------|-----------|
| 21 | **Git** | version control — أساسي |
| 22 | **GitHub** | مستودع الكود — مجاني |
| 23 | **Vercel** | منصة النشر — الأفضل للـ Next.js |
| 24 | **Vercel CLI** | نشر من الطرفية — `npm i -g vercel` |
| 25 | **GitHub Actions** | CI/CD — اختبار + نشر أوتوماتيكي |

### أدوات الجودة والمراقبة (أولوية عالية — إلزامية قبل النشر):

| الرقم | الأداة | الاستخدام |
|-------|--------|-----------|
| 26 | **Lighthouse** | تقييم الأداء — يجب الـMobile score > 85 |
| 27 | **Vercel Analytics** | مراقبة Core Web Vitals في الإنتاج |
| 28 | **Sentry** | مراقبة الأخطاء — يلتقط الأخطاء التي ما تقدر تكتشفها محلياً |
| 29 | **Chrome DevTools** | debugging — Performance، Network، Lighthouse |
| 30 | **Playwright** | اختبار E2E — اختبار تدفقات المستخدم الحقيقي |

### أدوات الدفع والمصادقة (للمواقع التجارية والحجز):

| الرقم | الأداة | الملاحظات |
|-------|--------|-----------|
| 31 | **Stripe Checkout** | الدفع — الأسهل والأوسع دعماً |
| 32 | **Better Auth** | بديل مفتوح المصدر حديث — خفيف |
| 33 | **Supabase** | قاعدة بيانات PostgreSQL — Firebase المفتوح المصدر |

---

## 4️⃣ بنية ملفات المشروع المثلى (Next.js + App Router)

### البنية العامة الموصى بها (2026):
```
project-name/
├── app/
│   ├── (marketing)/              # مجموعة مسارات العرض العامة
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   └── layout.tsx            # Layout مشترك للموقع العام
│   ├── (dashboard)/              # مجموعة مسارات لوحة التحكم
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── api/
│   │   └── stripe/               # API routes (webhooks، checkout)
│   │       └── route.ts
│   ├── globals.css
│   ├── layout.tsx                # التخطيط الجذري
│   ├── page.tsx                  # الصفحة الرئيسية
│   ├── sitemap.ts                # ملف sitemap
│   └── robots.ts                 # ملف robots.txt
├── components/
│   ├── ui/                      # مكوّناتshadcn/ui
│   ├── layout/                  # Header، Footer، Navbar
│   ├── sections/                # أقسام الصفحات (Hero، Features، CTA)
│   └── 3d/                      # مكوّنات Three.js (اختياري)
│       ├── Canvas.tsx
│       ├── Model.tsx
│       └── Scene.tsx
├── lib/
│   ├── db/                      # استعلامات قاعدة البيانات
│   ├── api/                     # عملاء API (Stripe, Supabase)
│   ├── utils.ts                 # دوال مساعدة
│   ├── constants.ts             # الثوابت
│   ├── types.ts                 # تعريفات الأنواع
│   └── validations.ts           # مخططات Zod
├── hooks/                       # الخطاص المخصصة
│   └── use-scroll.ts
├── styles/
│   ├── globals.css
│   └── tailwind.css
├── public/
│   ├── images/
│   ├── icons/
│   ├── models/                  # نماذج 3D (GLB/GLTF)
│   └── fonts/
├── tests/                       # اختبارات E2E (Playwright)
│   ├── homepage.spec.ts
│   └── booking-flow.spec.ts
├── .github/
│   └── workflows/
│       └── ci.yml               # GitHub Actions CI/CD
├── .env.local                   # المتغيرات البيئية (Local)
├── .env.example                 # قالب المتغيرات البيئية
├── next.config.ts               # إعدادات Next.js
├── tailwind.config.js           # إعدادات Tailwind (v3) أو globals.css (v4)
├── tsconfig.json                # إعدادات TypeScript
├── vercel.json                  # إعدادات Vercel
├── package.json
└── README.md
```

### التكوينات الأساسية (Ready-to-Copy):

#### 1. vercel.json (النسخة المثلى 2026)
```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "cleanUrls": true,
  "trailingSlash": false,
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Content-Security-Policy", "value": "default-src 'self'; img-src 'self' data: https:; connect-src 'self' https:; style-src 'self' 'unsafe-inline'; font-src 'self' data: https:; object-src 'none'; frame-ancestors 'none'; base-uri 'self'" },
        { "key": "Strict-Transport-Security", "value": "max-age=31536000; includeSubDomains; preload" }
      ]
    }
  ]
}
```

#### 2. next.config.ts (Next.js 15/16)
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {
    // Turbopack is default في Next.js 15+
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "**.**" }
    ],
  },
  // Compression مدمج افتراضياً
};

export default nextConfig;
```

#### 3. tailwind.config.js (v4 — CSS-first)
```css
/* app/globals.css */
@import "tailwindcss";

@theme {
  --color-primary: oklch(0.15 0 0);   /* #0b0d17 */
  --color-accent: oklch(0.6 0.25 25); /* #ff6b6b */
  --font-sans: "Inter", system-ui, sans-serif;
  --font-mono: "Fira Code", monospace;
}

@custom-variant dark (&:where(.dark, .dark *));

/* الأنيميشن الأساسية */
@layer utilities {
  .animate-fade-in { animation: fade-in 0.5s ease-out; }
  .animate-slide-up { animation: slide-up 0.5s ease-out; }
}
```

#### 4. package.json (مع جميع الـ scripts)
```json
{
  "scripts": {
    "dev": "next dev --turbo",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "test": "vitest",
    "test:watch": "vitest --watch",
    "test:run": "vitest run",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "format": "prettier --write .",
    "glb:optimize": "gltf-transform optimize input.glb output.glb --texture-compress ktx2"
  }
}
```

---

## 5️⃣ GitHub + Vercel Deployment (خطوة بخطوة)

### الخطوة 1: إعداد SSH Key على GitHub
```bash
# إنشاء مفتاح SSH جديد (استخدم always a separate one per client)
ssh-keygen -t ed25519 -C "your-email@example.com" -f ~/.ssh/hermes_github_adix
# الصق المفتاح العلني في GitHub → Settings → SSH and GPG Keys → New SSH Key
# تحقق من الاتصال
ssh -T git@github.com
```

### الخطوة 2: رفع المشروع على GitHub
```bash
cd project-name
git init
git add -A
git commit -m "feat: initial commit"
git branch -M main
git remote add origin git@github.com:YOUR_USERNAME/repo-name.git
git push -u origin main
```

### الخطوة 3: الاستيراد إلى Vercel
1. اذهب إلى [vercel.com](https://vercel.com) → "New Project"
2. استورد المستودع من GitHub
3. Vercel يكتشف Next.js تلقائياً
4. انقر على "Deploy"

### الخطوة 4: إعداد المتغيرات البيئية
```bash
# في Vercel Dashboard → Settings → Environment Variables
NEXT_PUBLIC_API_URL=your_api_url
DATABASE_URL=your_database_url
STRIPE_SECRET_KEY=sk_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...
```

### الخطوة 5: GitHub Actions CI/CD (.github/workflows/ci.yml)
```yaml
name: CI/CD Pipeline
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup pnpm
        uses: pnpm/action-setup@v4
        with: { version: 9 }
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
      - name: Lint
        run: pnpm lint
      - name: Type check
        run: pnpm type-check
      - name: Build
        run: pnpm build
```

### Pre-Publish Checklist (إلزامي قبل النشر):
- [ ] `useUrlLinks` متحقق من vercel.json (خطأ شائع — الاسم `useUrlLinks` غير صحيح، استخدم `trailingSlash: false` أو `cleanUrls: true`)
- [ ] فحص توافقية HTML/CSS مع المتصفحات
- [ ] تجربة سرعة التحميل (< 3 ثوانٍ — استخدم Lighthouse)
- [ ] إغلاق جميع وسوم HTML بشكل صحيح
- [ ] فحص وجود خطأ في JavaScript قبل النشر

---

## 6️⃣ أدلة عملية (Ready-to-Run Templates)

### دليل 1: موقع Portfolio ثلاثي الأبعاد

#### الخطوة 1: إنشاء المشروع
```bash
npx create-next-app@latest my-3d-portfolio --typescript --tailwind --eslint
cd my-3d-portfolio
pnpm add three @react-three/fiber @react-three/drei gsap @gsap/react lenis @spline/react
pnpm add -D @types/three
```

#### الخطوة 2: إعداد Canvas ثلاثي الأبعاد
```tsx
// components/3d/Canvas.tsx — "use client"
import { Canvas } from '@react-three/fiber';
import { Environment, ScrollControls } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

export default function Scene({ children }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      gl={{ antialias: true, toneMapping: ACESFilmicToneMapping }}
      onCreated={(state) => {
        state.gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      }}
    >
      <Environment preset="apartment" />
      <ScrollControls pages={3}>
        {children}
      </ScrollControls>
      <EffectComposer>
        <Bloom />
      </EffectComposer>
    </Canvas>
  );
}
```

#### الخطوة 3: إعداد GSAP ScrollTrigger
```typescript
// lib/animations.ts
import gsap from "gsap";
import { ScrollTrigger, ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export const initSmoothScroll = () => {
  // فقط على الديسكتوب — الجوال يستخدم التمرير الافتراضي
  if (typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches) {
    ScrollSmoother.create({
      smooth: 1.5,
      effects: true,
      normalizeScroll: true,
      ignoreMobile: true,
    });
  }
};

export const fadeInUp = (target: string) => {
  return gsap.from(target, {
    opacity: 0,
    y: 60,
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
      trigger: target,
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
  });
};
```

#### الخطوة 4: Hero 3D مع Scroll-Driven Rotation
```tsx
// components/sections/Hero3D.tsx — "use client"
import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function HeroModel() {
  const meshRef = useRef<THREE.Group>(null!);
  const { nodes, materials } = useGLTF("/models/hero.glb") as any;

  useEffect(() => {
    gsap.to(meshRef.current.rotation, {
      y: Math.PI * 2,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: true,
        anticipatePin: 1,
      },
    });
  }, []);

  return (
    <group ref={meshRef}>
      <mesh geometry={nodes.Cube.geometry} material={materials.Material} />
    </group>
  );
}
```

---

### دليل 2: متجر إلكتروني (Ecommerce)

#### الاختيار الأفضل في 2026:
| الحل | النوع | الملاحظات |
|------|-------|-----------|
| **Vercel Commerce** | مفتوح المصدر، مجاني | موجه لـ Shopify كبكند |
| **Medusa + Next.js** | مفتوح المصدر | headless commerce، سريع |
| **Your Next Store** | مدفوع ($39-199) | Stripe-powered، shadcn UI |
| **Saleor** | مفتوح المصدر + مدفوع | GraphQL API |
| **Spree/Next.js** | مفتوح المصدر | One-page checkout، Stripe default |

#### بنية متجر إلكتروني مقترحة:
```
shop/
├── app/
│   ├── (shop)/
│   │   ├── products/
│   │   │   └── [slug]/page.tsx
│   │   ├── cart/page.tsx
│   │   ├── checkout/
│   │   │   └── success/page.tsx
│   │   └── layout.tsx
│   ├── (admin)/
│   │   └── dashboard/page.tsx
│   └── api/
│       ├── stripe/
│       │   └── checkout/route.ts (Server Action)
│       └── webhook/route.ts
├── lib/
│   ├── store/ (Zustand)
│   │   ├── cart-store.ts
│   │   └── product-store.ts
│   ├── api/
│   │   ├── stripe.ts
│   │   └── products.ts
│   └── validations/
│       └── checkout-schema.ts
├── components/
│   ├── product-card.tsx
│   ├── cart-drawer.tsx
│   ├── product-gallery.tsx
│   └── checkout-form.tsx (React Hook Form + Zod)
└── public/
    └── images/products/
```

---

### دليل 3: موقع حجز (Booking)

#### التقنيات المطلوبة:
- **FullCalendar** — لعرض التقويم الأسبوعي/اليومي
- **Stripe Checkout** — لدفع المقدار المقدر
- **Google Calendar API** — لمزامنة التقويمين
- **React Hook Form + Zod** — لنموذج الحجز

#### بنية الملفات:
```
booking/
├── app/
│   ├── (booking)/
│   │   ├── [service]/page.tsx (Slot picker)
│   │   ├── checkout/page.tsx (Stripe)
│   │   └── confirmation/page.tsx
│   ├── (admin)/
│   │   ├── calendar/page.tsx (FullCalendar)
│   │   └── bookings/page.tsx
│   └── api/
│       ├── availability/route.ts
│       ├── stripe-checkout/route.ts
│       └── webhook/route.ts
├── lib/
│   ├── availability.ts (UTC logic)
│   ├── stripe.ts
│   └── calendar-sync.ts
├── components/
│   ├── calendar.tsx
│   ├── slot-picker.tsx
│   ├── booking-form.tsx (RHF + Zod)
│   └── time-zone-display.tsx
└── public/
    └── images/
```

#### منطق التوفر (Availability Logic):
```typescript
// lib/availability.ts
import { addMinutes, format, parse, startOfDay } from 'date-fns';
import { utcToZonedTime, zonedTimeToUtc } from 'date-fns-tz';

export interface AvailabilitySlot {
  start: Date;
  end: Date;
  available: boolean;
}

// 1. التخزين في UTC دائماً
// 2. عرض في توقيت المزود والعميل
// 3. فحص التعارض مع Google Calendar
// 4. soft-lock الـ slot (10 minutes) قبل التقديم
```

---

## 7️⃣ أفضل ممارسات الأداء (Performance Optimization)

### Core Web Vitals (الأهداف):
| المقياس | الهدف | كيف تحسنه |
|---------|-------|-----------|
| **LCP** | ≤ 2.5s | استخدم `next/image`، أضف `priority` للصور الأهم، استخدم `next/font` |
| **INP** | ≤ 200ms | استخدم Server Components، قلل JS، استخدم `React.lazy()` + `Suspense` |
| **CLS** | ≤ 0.1 | حدد `width/height` لكل صورة، استخدم `font-display: swap` |

### تحسين الـ3D على الويب:
| الإعداد | الهدف |
|--------|-------|
| حجم GLB | 1-3MB (Hero product)، 2-5MB (Full scene) |
| دقة النصوص | 1024px × 1024px (Web) |
| عدد polys | < 100K للهواتف |
| استخدام Draco + KTX2 | نعم — للضغط |
| Lazy loading | إلزامي إذا كان 3D خلفية |

---

## 8️⃣ الأدوات الموصى بها (Free Tier كافي)

| الفئة | الأداة | لماذا | التسعير |
|-------|--------|------|---------|
| التطوير | **VS Code** + Extensions | مجاني، extensions غنية | مجاني |
| Version Control | **Git + GitHub** | SSH keys مهيأة | مجاني (2000 min Actions/شهر) |
| Deployment | **Vercel** | Next.js مثالي، 100GB bandwidth/شهر | مجاني |
| التصميم | **Figma** | للـ UI/UX والـ prototyping | مجاني للفرق الصغيرة |
| الخطوط | **Google Fonts + Fontshare** | خطوط احترافية | مجاني |
| 3D Assets | **Sketchfab / Poly Pizza** | نماذج 3D مجانية | مجاني |
| 3D Optimization | **gltf-transform** CLI | أداة CLI مفتوحة المصدر | مجاني |
| التحليلات | **Vercel Analytics** | Core Web Vitals | مجاني مع Vercel |
| مراقبة الأخطاء | **Sentry** | مراقبة الأخطاء في الإنتاج | مجاني (10K events/شهر) |
| الاختبار | **Playwright / Vitest** | E2E + Unit testing | مجاني |

---

## 9️⃣ خطة التعلم العملية (8 أسابيع)

### الأسبوع 1-2: الأساسيات
```bash
# هدف الأسبوع: موقع portfolio بسيط ثلاثي الصفحات
1. HTML5 + CSS Grid + Flexbox
2. JavaScript ES6+ (variables, functions, arrays)
3. بناء موقع: index.html + style.css + script.js
4. إضافة TypeScript + Vite كـ bundler
```

### الأسبوع 3-4: React + TypeScript
```bash
npx create-react@latest my-portfolio --typescript
npm install framer-motion react-hook-form zod
# بناء: Todo App أو Portfolio متفاعل
# التعلم: useState، useEffect، useRef، props
```

### الأسبوع 5-6: Next.js + Tailwind
```bash
npx create-next-app@latest my-site --typescript --tailwind
npm install @radix-ui/react-*, clsx, tailwind-merge
npx shadcn-ui@latest init
npx shadcn-ui@latest add button card input
# بناء: Landing page كامل مع 5 صفحات
```

### الأسبوع 7-8: 3D + Animations
```bash
# 3D Portfolio
pnpm add three @react-three/fiber @react-three/drei gsap @gsap/react lenis

# أو Ecommerce/Marketplace
pnpm add @stripe/stripe-js stripe
pnpm add better-auth

# أو Booking Site
pnpm add @fullcalendar/react date-fns date-fns-tz
```

---

## 🔟 نصائح ذهبية (Learned the Hard Way)

1. **اختر الأداة المناسبة للمهمة**:
   - استخدم **Framer Motion** للـ micro-interactions والـ UI
   - استخدم **GSAP + ScrollTrigger** للستوري تل على التمرير
   - استخدم **Lenis** للتمثيل الناعي (أول أداة تركّبها لكل موقع فيه scroll)
   - استخدم **R3F** للـ 3D داخل React، **Three.js vanilla** للمشاريع غير-React

2. **ابدأ ببساطة**:
   - أضف الـ3D والأنيميشن **بعد** ظهور الموقع الأساسي
   - الـ 3D هو "تزيين" — المحتوى والتحويلات أهم

3. **الأداء أولاً**:
   - 3D يجب أن يكون lazy-loaded
   - استخدم `next/image` لكل الصور
   - استخدم `next/font` للخطوط

4. **الأمان لا ينتظر**:
   - أضف Security Headers دائماً في `vercel.json`
   - استخدم CSP مع Nonces بدلاً من `unsafe-inline`
   - تحقق من الإدخال على الخادم (Zod)

5. **التحليل قبل البناء**:
   - استخدم GitHub Templates كمرجع
   - استخدم 21st.dev كمكتبة مكوّنات
   - استخدم motionsites.ai كإلهام للتصميم البصري

6. **CI/CD هو إلزامي**:
   - أضف GitHub Actions workflow لكل مشروع
   - اختبر (lint، type-check، build) قبل كل merge
   - استخدم Vercel Preview Deployments للـ PRs

---

## 📌 الخلاصة

تم بنجاح:
- ✅ تحليل موقع **21st.dev** (12,000+ مكوّن React حية، نموذج Registry)
- ✅ تحليل موقع **motionsites.ai** (نقاش خطوة بخطوة للـ 3D websites)
- ✅ تعلم **8 مجموعات أدوات** رئيسية (Frontend، 3D، Animations، Backend، Deployment، Testing، Security، AI)
- ✅ إنشاء **بنية ملفات موحدة** تناسب portfolio، ecommerce، و booking websites
- ✅ كتابة **تكوينات جاهزة** (vercel.json، next.config.ts، tailwind.config)
- ✅ إنشاء **أدلة عملية** لـ 3 أنواع مواقع (Portfolio 3D، Ecommerce، Booking)
- ✅ إنشاء **خطة تعلم عملية** (8 أسابيع)
- ✅ توثيق **أفضل الممارسات** (Performance، Security، CI/CD)

هذه المعرفة جاهزة للتطبيق مباشرة على مشروع `adixmedia-new` وتوسيعها لتصبح منصة وكلاء آليين محلية بدون اشتراكات سحابية شهرية.

---

## 🚀 الروابط السريعة

- [Next.js Documentation](https://nextjs.org/docs)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/)
- [GSAP ScrollTrigger](https://gsap.com/docs/v3/ScrollTrigger)
- [shadcn/ui](https://ui.shadcn.com)
- [Vercel Documentation](https://vercel.com/docs)
- [Three.js GLTF Optimization](https://gltf-transform.donmccurdy.com/)
- [Stripe Checkout](https://docs.stripe.com/checkout)
- [Better Auth](https://better-auth.com)
- [Sentry Next.js](https://sentry.io/for/nextjs/)
- [21st.dev Components](https://21st.dev)
- [MotionSites AI Prompts](https://motionsites.ai)