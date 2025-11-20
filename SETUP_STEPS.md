# Complete Strapi Setup Steps

## ✅ Already Done
1. ✅ .env.local file created
2. ✅ Strapi is running
3. ✅ Global content type exists and is published

## 🔧 What Needs to Be Done

### Step 1: Restart Next.js Dev Server
**The .env.local file was just created, so you need to restart Next.js to load it.**

```bash
# In your terminal where Next.js is running:
# Press Ctrl+C to stop it, then run:
cd /Users/izzuddin/Desktop/Work\ mechanikos/mech-website-2025/front-end
pnpm run dev
```

### Step 2: Add Header Content in Strapi

1. **Open Strapi Admin:** http://localhost:1337/admin

2. **Go to Content Manager → Single Types → Global**

3. **Add/Edit Header Component:**
   
   Look for the "Header" section. You should see it's already added but might be empty.
   
   Click to expand it, then fill in:
   
   **Logo:**
   - Label: `Mechanikos`
   - Href: `/`
   - Image: Click "Add an entry" → Upload your logo image
   
   **Nav Items:** (Click "Add an entry" for each)
   - Entry 1: Label: `About`, URL: `/about`, New Tab: unchecked
   - Entry 2: Label: `Services`, URL: `/services`, New Tab: unchecked
   - Entry 3: Label: `Product`, URL: `/process`, New Tab: unchecked
   - Entry 4: Label: `Case Study`, URL: `/case-study`, New Tab: unchecked
   - Entry 5: Label: `Blog`, URL: `/blog`, New Tab: unchecked
   - Entry 6: Label: `Contact`, URL: `/contact`, New Tab: unchecked
   
   **CTA (Optional):**
   - Can leave empty or add a call-to-action button

4. **Verify Footer Component:**
   
   The Footer should already have:
   - Text: `© MECHANIKOS SDN BHD - REG.1053509-U 2025`
   
   If not filled:
   - Logo: Label: `Mechanikos`, Href: `/`, Image: Upload logo
   - Text: Enter your copyright text

5. **Save and Publish:**
   - Click **Save** (top right)
   - Click **Publish** (top right)

### Step 3: Enable API Permissions

1. **Go to Settings (⚙️) → Users & Permissions plugin → Roles → Public**

2. **Scroll down to find "Global"**

3. **Check these permissions:**
   - ✅ find
   - ✅ findOne (if available)

4. **Click Save** at the top right

### Step 4: Test the Connection

1. **Refresh the test page:** http://localhost:3000/strapi-test

2. **You should see:**
   - ✅ Successfully connected to Strapi!
   - Your navigation items displayed
   - Footer text displayed
   - Header and footer using Strapi data

## 📸 Visual Guide

### Where to find Global in Strapi:

```
Strapi Admin Panel
├── Content Manager (left sidebar)
    ├── Collection Types
    └── Single Types
        └── Global  ← Click here!
```

### What the Header component should look like:

```
Header
├── Logo
│   ├── Label: "Mechanikos"
│   ├── Href: "/"
│   └── Image: [your-logo.png]
│
├── Nav Items (repeatable - click "Add entry" 6 times)
│   ├── [0] Label: "About"     URL: "/about"
│   ├── [1] Label: "Services"  URL: "/services"
│   ├── [2] Label: "Product"   URL: "/process"
│   ├── [3] Label: "Case Study" URL: "/case-study"
│   ├── [4] Label: "Blog"      URL: "/blog"
│   └── [5] Label: "Contact"   URL: "/contact"
│
└── CTA (optional)
```

### What the Footer component should look like:

```
Footer
├── Logo
│   ├── Label: "Mechanikos"
│   ├── Href: "/"
│   └── Image: [your-logo.png]
│
└── Text: "© MECHANIKOS SDN BHD - REG.1053509-U 2025"
```

## 🐛 Troubleshooting

### Still showing "Failed to connect"?
1. Make sure you **restarted Next.js** after creating .env.local
2. Check the terminal for any error messages
3. Verify Strapi is running: http://localhost:1337

### Can't see Header/Footer fields in Strapi?
The components might be collapsed. Click on them to expand.

### "Permission denied" error?
Make sure you enabled the "find" permission for Global in Public role.

### Images not loading?
Strapi serves images from: http://localhost:1337/uploads/...
The integration will automatically handle this.

## 🎉 Success Criteria

When everything is working, you should see:

1. ✅ Test page shows green success message
2. ✅ Navigation in header comes from Strapi
3. ✅ Footer text comes from Strapi
4. ✅ No errors in browser console
5. ✅ No errors in Next.js terminal

## 📚 Next Steps After Success

Once the test page works:

1. Apply Strapi data to your home page
2. Connect other content types (case studies, blog posts)
3. Add more dynamic content
4. Consider adding an API token for production

Need help? Check the main documentation:
- QUICK_START.md
- STRAPI_INTEGRATION.md
- BUGFIX.md

