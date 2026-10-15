# 🏗️ قالب مشروع موقع حديث 2025 — Next.js 16 + TypeScript + Tailwind CSS

قالب احترافي جاهز لبناء مواقع إلكترونية، متاجر إلكترونية، ومواقع حجز باستخدام أحدث التقنيات.

## 🚀 خيارات البدء السريع

### الخيار الأول: موقع عرض أعمال 3D (Static)
```bash
npx create-next-app@latest my-portfolio --typescript --tailwind
cd my-portfolio
pnpm add three @react-three/fiber @react-three/drei gsap @gsap/react lenis
pnpm dev
```

### الخيار الثاني: متجر إلكتروني
```bash
# Next.js Commerce (مجاناً مع Shopify)
npx create-next-app@latest my-store --typescript --tailwind
# أو استخدام قالب جاهز
git clone https://github.com/vercel/commerce
```

### الخيار الثالث: موقع حجز
```bash
# Cal.com (مفتوح المصدر)
git clone https://github.com/calcom/cal.com
# أو القالب المخصص
git clone https://github.com/vladimir-siedykh/booking-calendar
```

## 📁 هيكل الملفات الموصى به

```
project/
├── app/                    # Next.js App Router
│   ├── (auth)/            # مجموعة مسارات المصادقة
│   ├── (public)/          # مجموعة المسارات العامة
│   ├── api/               # API Routes
│   ├── layout.tsx         # التخطيط الجذري
│   ├── page.tsx           # الصفحة الرئيسية
│   └── globals.css
├── components/            # المكونات
│   ├── ui/               # مكوناتshadcn/ui
│   ├── layout/           # الهيدر، فوتر، نافبرة
│   ├── sections/         # أقسام الصفحات
│   └── 3d/              # مكونات Three.js (اختياري)
├── lib/                  # المكتبات المساعدة
│   ├── utils.ts          # دوال مساععة
│   ├── constants.ts      # الثوابت
│   ├── types.ts          # تعريفات الأنواع
│   └── fonts.ts          # الخطوط
├── hooks/                # الخطاص المخصصة
├── styles/               # ملفات CSS
├── public/               # الأصول الثابتة
│   ├── images/
│   ├── icons/
│   └── models/           # نماذج 3D (GLB/GLTF)
├── tests/                # اختبارات E2E
├── vercel.json           # تكوين Vercel
├── next.config.js        # تكوين Next.js
├── tailwind.config.js    # تكوين Tailwind
├── tsconfig.json         # إعدادات TypeScript
├── package.json
└── README.md
```

## ⚙️ التكوينات الأساسية

### 1. vercel.json
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
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/home",
      "destination": "/",
      "permanent": true
    }
  ]
}
```

### 2. next.config.js
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  experimental: {
    turbo: {
      rules: {
        '*.css': {loaders: []},
      },
    },
  },
}

module.exports = nextConfig
```

### 3. tailwind.config.js
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0b0d17',
        accent: '#ff6b6b',
      },
  },
  plugins: [],
}
```

### 4. tsconfig.json
```json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "skipLibCheck": true,
    "target": "es2022",
    "lib": ["dom", "dom.iterable", "es2022"],
    "allowJs": true,
    "jsx": "preserve",
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "incremental": true,
    "plugins": [
      {
        "name": "typescript-pages-plugin",
        "config": {}
      }
    ]
  }
}
```

## 🎨 مكونات جاهزة

### 1. هيدر متكرر (layout.tsx)
```tsx
// app/layout.tsx
import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ADIX MEDIA | تصميم مواقع متميزة',
  description: 'نقدم حلول تصميم ويب، إعلانات، محتوى، وسيو احترافية',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
```

### 2. صفحة رئيسية مع 3D
```tsx
// app/page.tsx
import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import Portfolio from '@/components/sections/Portfolio'
import CTASection from '@/components/sections/CTASection'

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Portfolio />
      <CTASection />
    </main>
  )
}
```

### 3. قسم Hero مع أنيميشن
```tsx
// components/sections/Hero.tsx
'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* الخلفية المتحركة */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-accent/20" />
      
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold mb-6"
        >
          بناء مواقع إلكترونية مذهلة
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl text-gray-300 mb-8"
        >
          نحن شركة ADIX MEDIA نقدم حلول تصميم ويب متميزة وإعلانات رقمية فعّالة
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-accent text-white rounded-full font-semibold text-lg transition-all"
            >
              ابدأ مشروعك الآن
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
```

### 4. مكوّنات UI الأساسية
```tsx
// components/ui/Button.tsx
import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary'
  className?: string
}

export default function Button({ 
  children, 
  onClick, 
  variant = 'primary',
  className = ''
}: ButtonProps) {
  const baseClasses = 'px-6 py-3 rounded-full font-semibold transition-all'
  const variantClasses = {
    primary: 'bg-accent hover:bg-accent/90 text-white',
    secondary: 'bg-transparent border-2 border-accent text-accent hover:bg-accent hover:text-white'
  }
  
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </motion.button>
  )
}
```

## 🔧 أوامر أساسية

```bash
# تطوير
pnpm dev          # تشغيل الخادم المحلي
pnpm build        # بناء المشروع
pnpm start        # تشغيل الإصدار الإنتاجي

# اختبار
pnpm test         # تشغيل الاختبارات
pnpm test:watch   # مراقبة الاختبارات

# صيانة
pnpm lint         # فحص الأخطاء
pnpm format       # تنسيق الكود
pnpm type-check   # فحص الأنواع
```

## 🚀 النشر

1. **إنشاء مستودع على GitHub** (استخدم SSH key)
```bash
git init
git add -A
git commit -m "feat: initial commit"
git remote add origin git@github.com:YOUR_USERNAME/your-repo.git
git push -u origin main
```

2. **الاستيراد إلى Vercel**
- انتقل إلى [vercel.com](https://vercel.com)
- انقر على "New Project"
- استورد المستودع من GitHub
- انقر على "Deploy"

3. **إعداد المتغيرات البيئية**
```bash
# في Vercel Dashboard → Settings → Environment Variables
NEXT_PUBLIC_API_URL=your_api_url
DATABASE_URL=your_database_url
```

## 📊 أدوات المراقبة

### Lighthouse Scores المثلى
- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 100
- **SEO**: 100

### أدوات المراقبة الموصى بها
- **Vercel Analytics** — مراقبة Core Web Vitals
- **Sentry** — مراقبة الأخطاء
- **Google Search Console** — مراقبة الزيارات

## 📚 موارد إضافية

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [React Three Fiber Docs](https://docs.pmnd.rs/react-three-fiber)
- [GSAP Documentation](https://gsap.com/docs/v3)

---

هذا القالب جاهز للاستخدام كأساس لأي مشروع ويب حديث في 2025!