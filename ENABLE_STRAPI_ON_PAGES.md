# Enable Strapi on All Pages

## ✅ What's Been Done

1. ✅ Updated `RootLayout` to accept optional `globalData` prop
2. ✅ Updated `Header` and `Footer` to accept optional `globalData` prop
3. ✅ Home page (`/`) now uses Strapi data

## 🔄 Test the Home Page

**Visit:** http://localhost:3000

You should now see:
- ✅ Navigation from Strapi (About, Services, Product, Case Study, Blog, Contact)
- ✅ Footer from Strapi
- ✅ Strapi logo in header/footer

---

## 📝 How to Enable Strapi on Other Pages

For any page that uses `RootLayout`, follow this pattern:

### Before:
```tsx
import { RootLayout } from '@/components/RootLayout'

export default function MyPage() {
  return (
    <RootLayout>
      {/* page content */}
    </RootLayout>
  )
}
```

### After:
```tsx
import { RootLayout } from '@/components/RootLayout'
import { fetchGlobalData } from '@/lib/globalData'

export default async function MyPage() {
  const globalData = await fetchGlobalData()
  
  return (
    <RootLayout globalData={globalData}>
      {/* page content */}
    </RootLayout>
  )
}
```

### Changes Required:
1. Add `import { fetchGlobalData } from '@/lib/globalData'`
2. Make function `async` (add `async` keyword)
3. Add `const globalData = await fetchGlobalData()` before return
4. Pass `globalData={globalData}` to `<RootLayout>`

---

## 🎯 Pages to Update

Update these pages to use Strapi globally:

- ✅ `/` (src/app/page.tsx) - **DONE**
- ⏳ `/about` (src/app/about/page.tsx)
- ⏳ `/services` (src/app/services/page.tsx)
- ⏳ `/process` (src/app/process/page.tsx)
- ⏳ `/case-study` (src/app/case-study/page.tsx)
- ⏳ `/blog` (src/app/blog/page.tsx)
- ⏳ `/contact` (src/app/contact/page.tsx)
- ⏳ Individual case study pages
- ⏳ Individual blog post pages

---

## 📋 Example: Update About Page

Here's a complete example:

**File:** `src/app/about/page.tsx`

```tsx
import { type Metadata } from 'next'
import Image from 'next/image'

import { RootLayout } from '@/components/RootLayout'
import { fetchGlobalData } from '@/lib/globalData'
import { ContactSection } from '@/components/ContactSection'
// ... other imports

export const metadata: Metadata = {
  title: 'About Us',
  description: 'About Mechanikos...',
}

export default async function About() {
  // Fetch global data from Strapi
  const globalData = await fetchGlobalData()

  return (
    <RootLayout globalData={globalData}>
      {/* Your page content here */}
      <div>About page content...</div>
    </RootLayout>
  )
}
```

---

## 🚀 Quick Update Script

To update all pages at once, you can use this pattern for each file:

1. Add import at top of file
2. Make function async
3. Fetch globalData
4. Pass to RootLayout

---

## ⚠️ Important Notes

1. **All pages must be async** to fetch data from Strapi
2. **If Strapi is down**, pages will still work with fallback hardcoded data
3. **The fetchGlobalData function caches** for 1 hour, so it's efficient
4. **Existing pages without globalData** will continue to use hardcoded header/footer

---

## 🧪 Verify It Works

1. Update a page following the pattern above
2. Refresh that page in browser
3. Check that navigation shows data from Strapi
4. Footer should show Strapi data
5. Check browser devtools console for any errors

---

## 🎉 Benefits

Once all pages are updated:
- ✅ One place to manage navigation (Strapi)
- ✅ No need to redeploy when changing menu items
- ✅ Easy to A/B test different navigation
- ✅ Footer text updates without code changes
- ✅ Logo changes managed in Strapi

---

Need help? Check the home page implementation in `src/app/page.tsx` as a reference!



