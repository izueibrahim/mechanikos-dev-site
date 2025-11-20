// Strapi API Response Types

export interface StrapiImage {
  id: number
  attributes: {
    name: string
    alternativeText: string | null
    url: string
    width: number
    height: number
  }
}

export interface StrapiLink {
  id: number
  label: string
  url: string
  newTab: boolean
}

export interface StrapiLogoLink {
  id: number
  label: string
  href: string
  image: {
    id: number
    documentId: string
    name: string
    alternativeText: string | null
    url: string
    width: number
    height: number
    ext: string
    mime: string
  }
}

export interface StrapiHeader {
  id: number
  logo: StrapiLogoLink
  navItems: StrapiLink[]
}

export interface StrapiFooter {
  id: number
  logo: StrapiLogoLink
  text: string
}

export interface StrapiGlobal {
  id: number
  documentId: string
  title: string
  description: string
  header: StrapiHeader
  Footer: StrapiFooter
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface StrapiResponse<T> {
  data: T
  meta: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

