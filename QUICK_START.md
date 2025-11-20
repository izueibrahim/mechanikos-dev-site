# Quick Start: Connect Frontend to Strapi

Follow these steps to connect your Next.js frontend with Strapi:

## 1. Create Environment File

```bash
cd /Users/izzuddin/Desktop/Work\ mechanikos/mech-website-2025/front-end

# Create .env.local file
cat > .env.local << 'EOF'
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_STRAPI_API_TOKEN=
EOF
```

## 2. Start Both Servers

**Terminal 1 - Start Strapi:**
```bash
cd /Users/izzuddin/Desktop/Work\ mechanikos/mech-website-2025/strapi
pnpm run dev
```

**Terminal 2 - Start Next.js:**
```bash
cd /Users/izzuddin/Desktop/Work\ mechanikos/mech-website-2025/front-end
pnpm run dev
```

## 3. Configure Strapi Permissions

1. Open Strapi admin: http://localhost:1337/admin
2. Login or create your first admin user
3. Go to **Settings** (⚙️) → **Users & Permissions plugin** → **Roles** → **Public**
4. Scroll to **Global** section
5. Check the **find** permission
6. Click **Save** at the top right

## 4. Add Content in Strapi

1. Go to **Content Manager** → **Single Types** → **Global**
2. Fill in the content:

   **Title:** `Mechanikos - Performance Digital Agency`
   
   **Description:** `Leading digital agency specializing in 360 marketing and AI technology`
   
   **Header:**
   - Click **Add Component**
   - **Logo:**
     - Label: `Mechanikos`
     - Href: `/`
     - Upload your logo image
   - **Nav Items:** (Click "Add entry" for each)
     - `{ label: "About", url: "/about" }`
     - `{ label: "Services", url: "/services" }`
     - `{ label: "Product", url: "/process" }`
     - `{ label: "Case Study", url: "/case-study" }`
     - `{ label: "Blog", url: "/blog" }`
     - `{ label: "Contact", url: "/contact" }`
   
   **Footer:**
   - Click **Add Component**
   - **Logo:**
     - Label: `Mechanikos`
     - Href: `/`
     - Upload your logo
   - **Text:** `© MECHANIKOS SDN BHD - REG.1053509-U 2024`

3. Click **Save**
4. Click **Publish**

## 5. Test the Integration

Visit the test page: http://localhost:3000/strapi-test

You should see:
- ✅ Successfully connected message
- Your navigation items from Strapi
- Footer text from Strapi
- Header and footer are using Strapi data

## 6. Update Your Pages

To use Strapi data on other pages, update them like this:

```tsx
// Before (hardcoded)
import { RootLayout } from '@/components/RootLayout'

export default function Page() {
  return <RootLayout>{/* content */}</RootLayout>
}

// After (with Strapi)
import { fetchGlobalData } from '@/lib/globalData'
import { RootLayoutWithStrapi } from '@/components/RootLayoutWithStrapi'

export default async function Page() {
  const globalData = await fetchGlobalData()
  return <RootLayoutWithStrapi globalData={globalData}>{/* content */}</RootLayoutWithStrapi>
}
```

## Files Created

✅ `/src/types/strapi.ts` - TypeScript types
✅ `/src/lib/strapi.ts` - API utilities
✅ `/src/lib/globalData.tsx` - Data fetcher
✅ `/src/components/HeaderWithStrapi.tsx` - Header with Strapi
✅ `/src/components/FooterWithStrapi.tsx` - Footer with Strapi
✅ `/src/components/RootLayoutWithStrapi.tsx` - Layout wrapper
✅ `/src/app/strapi-test/page.tsx` - Test page
✅ `/.env.local` - Environment variables (you need to create this)

## Troubleshooting

### "Failed to fetch" error
- Make sure Strapi is running on port 1337
- Check `.env.local` has the correct URL

### No data showing
- Verify you've **published** the Global content in Strapi
- Check permissions are set correctly

### CORS errors
- Strapi should allow localhost:3000 by default
- If issues persist, check `strapi/config/middlewares.ts`

## Next Steps

Once this is working, you can:
1. Connect case studies from Strapi
2. Connect blog posts
3. Connect services
4. Add more dynamic content

See `STRAPI_INTEGRATION.md` for more details!


