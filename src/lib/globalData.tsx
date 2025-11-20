import { getGlobalData } from './strapi'

/**
 * Fetch global data on the server
 * This can be used in Server Components and passed to Client Components
 */
export async function fetchGlobalData() {
  try {
    console.log('Fetching global data from Strapi...')
    const globalData = await getGlobalData()
    
    if (!globalData) {
      console.warn('Global data not available from Strapi')
      return null
    }

    console.log('Successfully fetched global data:', {
      hasHeader: !!globalData.header,
      hasFooter: !!globalData.Footer,
      title: globalData.title,
    })

    return {
      header: globalData.header || null,
      footer: globalData.Footer || null,
      seo: {
        title: globalData.title || '',
        description: globalData.description || '',
      },
    }
  } catch (error) {
    console.error('Error in fetchGlobalData:', error)
    return null
  }
}

export type GlobalData = Awaited<ReturnType<typeof fetchGlobalData>>

