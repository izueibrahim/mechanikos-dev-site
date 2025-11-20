# Strapi Integration Guide

This guide explains how to connect your Next.js frontend with your Strapi backend API.

## Setup Steps

### 1. Create Environment Variables

Create a `.env.local` file in the `front-end` directory:

```bash
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_STRAPI_API_TOKEN=
```

**Note:** The API token is optional for public data. To create an API token in Strapi:
1. Go to Settings → API Tokens
2. Create New API Token
3. Set type to "Read-only" or "Full access"
4. Copy the token and add it to `.env.local`

### 2. Configure Strapi Permissions

In your Strapi admin panel (http://localhost:1337/admin):

1. Go to **Settings → Users & Permissions plugin → Roles → Public**
2. Find **Global** in the permissions list
3. Enable **find** permission
4. Save

This allows the frontend to fetch global data without authentication.

### 3. Add Data in Strapi

1. Go to **Content Manager → Global** (Single Type)
2. Fill in the following:
   - **Title**: Your site title
   - **Description**: Your site description
   - **Header**:
     - **Logo**: Upload your logo image
     - **Nav Items**: Add navigation links (label + url)
       - Example: `{ label: "About", url: "/about" }`
       - Example: `{ label: "Services", url: "/services" }`
   - **Footer**:
     - **Logo**: Upload footer logo
     - **Text**: Footer copyright text
3. Click **Save** and then **Publish**

## Using Strapi Data in Your Pages

### Option 1: Update Existing Pages (Recommended)

Update any page to use Strapi data. Here's an example for `page.tsx`:

```tsx
import { fetchGlobalData } from '@/lib/globalData'
import { RootLayoutWithStrapi } from '@/components/RootLayoutWithStrapi'

export default async function HomePage() {
  // Fetch global data from Strapi
  const globalData = await fetchGlobalData()

  return (
    <RootLayoutWithStrapi globalData={globalData}>
      {/* Your existing page content */}
      <h1>Welcome to Mechanikos</h1>
    </RootLayoutWithStrapi>
  )
}
```

### Option 2: Keep Using Original Components (Fallback)

If you want to keep the original hardcoded data, just continue using `RootLayout`:

```tsx
import { RootLayout } from '@/components/RootLayout'

export default function HomePage() {
  return (
    <RootLayout>
      {/* Your page content */}
    </RootLayout>
  )
}
```

## File Structure

```
front-end/
├── .env.local (create this - not in git)
├── src/
│   ├── types/
│   │   └── strapi.ts              # TypeScript types for Strapi API
│   ├── lib/
│   │   ├── strapi.ts              # Strapi API utilities
│   │   └── globalData.tsx         # Helper to fetch global data
│   └── components/
│       ├── HeaderWithStrapi.tsx   # Header with Strapi support
│       ├── FooterWithStrapi.tsx   # Footer with Strapi support
│       ├── RootLayoutWithStrapi.tsx # Layout with Strapi support
│       ├── Header.tsx             # Original header (fallback)
│       ├── Footer.tsx             # Original footer (fallback)
│       └── RootLayout.tsx         # Original layout (fallback)
```

## Testing the Integration

1. **Start Strapi** (in the `strapi` directory):
   ```bash
   cd strapi
   pnpm run dev
   ```

2. **Start Next.js** (in the `front-end` directory):
   ```bash
   cd front-end
   pnpm run dev
   ```

3. **Check the API**:
   Open in browser: http://localhost:1337/api/global?populate=deep

   You should see JSON data with your header/footer content.

4. **View your site**:
   Open http://localhost:3000 - your navigation should now come from Strapi!

## Troubleshooting

### CORS Errors
If you get CORS errors, update `strapi/config/middlewares.ts`:

```ts
export default [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'http://localhost:3000'],
          'media-src': ["'self'", 'data:', 'blob:'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    },
  },
  // ... other middlewares
]
```

### No Data Appearing
1. Make sure Strapi is running
2. Check that you've published the Global content in Strapi
3. Verify the API URL in `.env.local`
4. Check browser console for errors

### Images Not Loading
Strapi images are served from: `http://localhost:1337/uploads/...`

The `getStrapiMediaUrl()` helper function automatically prepends the Strapi URL.

## Next Steps

Once header and footer are working, you can extend this pattern to:

1. **Case Studies**: Fetch from `/api/case-studies`
2. **Blog Posts**: Fetch from `/api/blog-posts`
3. **Services**: Fetch from `/api/services-collections`
4. **Home Page Content**: Fetch from `/api/home-page`

Each follows the same pattern:
1. Create TypeScript types
2. Create fetch function in `lib/strapi.ts`
3. Use in Server Components
4. Pass data to Client Components as props


