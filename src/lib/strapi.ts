import { StrapiResponse, StrapiGlobal } from '@/types/strapi'

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
const STRAPI_API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN

interface FetchOptions extends RequestInit {
  headers?: HeadersInit
}

/**
 * Fetch data from Strapi API
 */
async function fetchAPI<T>(
  path: string,
  options: FetchOptions = {}
): Promise<T> {
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  }

  // Add authorization token if available
  if (STRAPI_API_TOKEN) {
    defaultHeaders['Authorization'] = `Bearer ${STRAPI_API_TOKEN}`
  }

  const mergedOptions: FetchOptions = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  }

  const url = `${STRAPI_URL}/api${path}`

  try {
    const response = await fetch(url, mergedOptions)

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`Strapi API error (${response.status}):`, errorText)
      throw new Error(`API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error(`Error fetching from Strapi: ${url}`, error)
    if (error instanceof Error) {
      console.error('Error details:', error.message)
    }
    throw error
  }
}

/**
 * Get the full URL for a Strapi media file
 */
export function getStrapiMediaUrl(url: string | null | undefined): string {
  if (!url) return ''
  
  // If it's already a full URL, return it
  if (url.startsWith('http')) return url
  
  // Otherwise, prepend the Strapi URL
  return `${STRAPI_URL}${url}`
}

/**
 * Fetch global data (header, footer, SEO)
 * Using Strapi v5 populate syntax
 */
export async function getGlobalData(): Promise<StrapiGlobal | null> {
  try {
    // Build the populate query for Strapi v5
    // We need to populate header (with logo, navItems) and Footer (with logo)
    const populateQuery = new URLSearchParams({
      'populate[header][populate][0]': 'logo',
      'populate[header][populate][1]': 'logo.image',
      'populate[header][populate][2]': 'navItems',
      'populate[Footer][populate][0]': 'logo',
      'populate[Footer][populate][1]': 'logo.image',
    }).toString()

    const response = await fetchAPI<StrapiResponse<StrapiGlobal>>(
      `/global?${populateQuery}`,
      {
        // Use Next.js caching - revalidate every hour
        next: { revalidate: 3600 },
      }
    )

    return response.data
  } catch (error) {
    console.error('Error fetching global data:', error)
    return null
  }
}

/**
 * Helper to build Strapi populate query strings
 */
export function buildPopulateQuery(fields: string[]): string {
  return fields.map((field, index) => `populate[${index}]=${field}`).join('&')
}

