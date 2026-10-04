# مرجع: نماذج المواقع الجاهزة للعملاء

## القاعدة العامة
أي موقع يُرفق كمعاينة أولية يجب أن يكون **ملف واحد مدمّج** (single-file HTML مع CSS+JS داخل ملف واحد). هذا يسمح بإرسال رابط `raw.githubusercontent.com` يعمل فوراً على المتصفح دون الحاجة إلى deployment Vercel.

## الصيغ المتوفرة

### 1. قالب المطاعم (Restaurant Template)
**الملفات:** `restaurant-east-hama.html`, `restaurant-style.css`, `restaurant-script.js`
**النسخة المدمجة:** `restaurant-preview.html`

استخدام: للمطاعم، الكافيهات، مطاعم الشاورما، محلات الطعام.

**البنية:**
- Navbar مع قائمة متحركة
- Hero مع صورة خلفية متدرجة + زر واتساب
- قائمة الطعام (grid ب4 بطاقات)
- عن المطعم (قصة التأسس + شهادة عميل)
- الموقع والمواعيد
- صفحة اتصال مع واتساب مباشر

**التخصيص:**
- غير `الشرك` باسم المطعم
- عدّل القائمة (أسعار، أسماء الأطباق)
- عدّل رابط الواتساب والهاتف والعنوان
- استبدل أيقونات الواجهة (🥙, 🥗, 🔥, 🍳) حسب الفئة

### 2. قالب العيادات (Dental/Clinic Template)
**الملفات:** `dental-clinic-template.html`, `dental-style.css`, `dental-script.js`

استخدام: لعيادات الأسنان، العيادات الجلدية، المراكز الطبية.

### 3. قالب ADIX MEDIA الأساسي (Template Base)
**الملف:** `template-base.html`

قالب عرضي عام يمكن تخصيصه لأي نشاط — مواقع الخدمات، الإعلانات، التمويل.

## كيفية إنشاء المعاينة المدمجة
```bash
# دمج CSS والـ JS داخل ملف HTML واحد
python3 -c "
import sys
html = open('restaurant-east-hama.html').read()
css = open('restaurant-style.css').read()
js = open('restaurant-script.js').read()
html = html.replace('<link rel=\"stylesheet\" href=\"restaurant-style.css\">', f'<style>{css}</style>')
html = html.replace('<script src=\"restaurant-script.js\"></script>', f'<script>{js}</script>')
open('restaurant-preview.html', 'w').write(html)
"

# رفع إلى GitHub
git add restaurant-preview.html && git commit -m 'chore: add inline preview' && git push
# الرابط يصبح: https://raw.githubusercontent.com/ADTIX24/ADIX-MEDIA/master/restaurant-preview.html
```