# Bug Fix: Strapi Integration Error

## Error Fixed
```
TypeError: Cannot read properties of undefined (reading 'header')
at fetchGlobalData (src/lib/globalData.tsx:15:35)
```

## Root Cause
1. The Strapi API wasn't returning the nested `header` and `Footer` component data
2. The populate query wasn't using the correct Strapi v5 syntax
3. Missing null checks for `globalData.attributes`

## Changes Made

### 1. Updated `/src/lib/globalData.tsx`
- Added null check for `globalData.attributes`
- Added fallback values (`|| null`) for header and footer
- Added console warning when data is unavailable

### 2. Updated `/src/lib/strapi.ts`
- Fixed populate query to use proper Strapi v5 syntax
- Used `URLSearchParams` to build the query string correctly
- Populate nested components: logo, logo.image, navItems, cta

## Testing

**Restart the Next.js dev server:**
```bash
cd /Users/izzuddin/Desktop/Work\ mechanikos/mech-website-2025/front-end

# Stop the current server (Ctrl+C) then:
pnpm run dev
```

**Visit the test page:**
http://localhost:3000/strapi-test

## Expected Behavior

### If Strapi has data:
✅ Page loads successfully
✅ Shows header navigation from Strapi
✅ Shows footer text from Strapi
✅ No errors in console

### If Strapi is empty/not configured:
✅ Page loads with default/fallback values
✅ Shows warning in server console: "Global data not available from Strapi"
✅ Components render with hardcoded defaults

## Next Steps

1. **Make sure Strapi is running:**
   ```bash
   cd ../strapi
   pnpm run dev
   ```

2. **Add content in Strapi admin:**
   - Go to http://localhost:1337/admin
   - Content Manager → Global
   - Add Header component with:
     - Logo (upload image)
     - Nav Items (add multiple: About, Services, etc.)
   - Add Footer component with:
     - Logo (upload image)
     - Text (copyright text)
   - Save and Publish

3. **Enable API permissions:**
   - Settings → Users & Permissions → Roles → Public
   - Check "find" for Global
   - Save

4. **Refresh the test page** - data should now appear!

## Technical Details

### Strapi v5 Populate Syntax
The correct way to populate nested components in Strapi v5:

```typescript
const populateQuery = new URLSearchParams({
  'populate[header][populate][0]': 'logo',
  'populate[header][populate][1]': 'logo.image',
  'populate[header][populate][2]': 'navItems',
  'populate[Footer][populate][0]': 'logo',
}).toString()
```

This generates:
```
populate[header][populate][0]=logo&populate[header][populate][1]=logo.image...
```

Which tells Strapi to include the nested component data in the response.


