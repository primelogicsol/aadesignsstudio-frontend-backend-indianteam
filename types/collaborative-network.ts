/**
 * Network Member
 */
export interface NetworkMember {
  id: string
  name: string
  role: string
  avatar: string
  department?: string
  location?: string
  skills?: string[]
  connections: string[] // IDs of connected members
  contributionScore?: number
  joinedAt: string
  status: "active" | "inactive" | "pending"
  bio?: string
  email?: string
  phone?: string
  socialLinks?: {
    linkedin?: string
    twitter?: string
    github?: string
    website?: string
  }
}

/**
 * Network Project
 */
export interface NetworkProject {
  id: string
  title: string
  description: string
  status: "planning" | "active" | "completed" | "on-hold"
  progress: number // 0-100
  startDate: string
  endDate?: string
  members: string[] // IDs of members
  tags: string[]
  milestones?: {
    id: string
    title: string
    dueDate: string
    completed: boolean
  }[]
  resources?: {
    id: string
    title: string
    type: "document" | "link" | "image" | "video"
    url: string
  }[]
}

/**
 * Network Activity
 */
export interface NetworkActivity {
  id: string
  type: "message" | "update" | "milestone" | "join" | "leave" | "contribution"
  timestamp: string
  memberId: string
  projectId?: string
  content: string
  relatedMembers?: string[]
}

/**
 * Network Stats
 */
export interface NetworkStats {
  totalMembers: number
  activeMembers: number
  totalProjects: number
  activeProjects: number
  completedProjects: number
  averageConnections: number
  topContributors: string[] // IDs of top contributors
  mostActiveProject?: string // ID of most active project
  activityTrend: {
    date: string
    count: number
  }[]
  collaborationScore: number // 0-100
}

/**
 * Network Detail
 */
export interface NetworkDetail {
  id: string
  name: string
  description: string
  createdAt: string
  updatedAt: string
  type: "team" | "organization" | "community" | "project-based"
  visibility: "public" | "private" | "invite-only"
  members: NetworkMember[]
  projects: NetworkProject[]
  activities: NetworkActivity[]
  stats: NetworkStats
  tags: string[]
  logo?: string
  coverImage?: string
}

/**
 * Network Graph Node
 */
export interface NetworkGraphNode {
  id: string
  name: string
  val: number // Size of node
  color?: string
  group?: string
  avatar?: string
}

/**
 * Network Graph Link
 */
export interface NetworkGraphLink {
  source: string
  target: string
  value: number // Strength of connection
  type?: string
}

/**
 * Network Graph Data
 */
export interface NetworkGraphData {
  nodes: NetworkGraphNode[]
  links: NetworkGraphLink[]
}
