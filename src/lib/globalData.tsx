import { getGlobalData } from './strapi'

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
    return null
  }
}

export type GlobalData = Awaited<ReturnType<typeof fetchGlobalData>>
