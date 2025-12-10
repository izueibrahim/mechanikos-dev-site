import { getGlobalData } from './strapi'

/**
 * Fetch global data on the server
 * This can be used in Server Components and passed to Client Components
 */
export async function fetchGlobalData() {
  try {
    const globalData = await getGlobalData()
    
    if (!globalData) {
      return null
    }

    return {
      header: globalData.header || null,
      footer: globalData.Footer || null,
      seo: {
        title: globalData.title || '',
        description: globalData.description || '',
      },
    }
  } catch {
    // Silently fail - app will use fallback data
    return null
  }
}

export type GlobalData = Awaited<ReturnType<typeof fetchGlobalData>>

