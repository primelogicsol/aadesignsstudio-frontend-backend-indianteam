/**
 * Design Trend Category
 */
export interface DesignTrendCategory {
  name: string
  slug: string
  count?: number
}

/**
 * Design Trend
 */
export interface DesignTrend {
  id: string
  title: string
  description: string
  image: string
  category: string
  date?: string
  author?: string
  readTime?: string
  tags?: string[]
  url?: string
  featured?: boolean
  content?: string
}

/**
 * Design Trend API Response
 */
export interface DesignTrendResponse {
  trends: DesignTrend[]
  categories: DesignTrendCategory[]
  hasMore: boolean
  total: number
}

/**
 * Design Trend Detail
 */
export interface DesignTrendDetail extends DesignTrend {
  content: string
  relatedTrends?: string[]
  authorInfo?: {
    name: string
    avatar: string
    bio: string
  }
}
