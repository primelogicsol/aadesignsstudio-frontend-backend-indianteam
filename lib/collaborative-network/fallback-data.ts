import type { NetworkDetail } from "@/types/collaborative-network"

/**
 * Fallback data for collaborative network when API fails
 */
export const networkFallbackData: NetworkDetail = {
  id: "network-1",
  name: "Global Innovation Collaborative",
  description: "A cross-functional team of experts collaborating on cutting-edge projects across multiple disciplines.",
  createdAt: "2023-01-15T08:00:00Z",
  updatedAt: "2023-04-22T14:30:00Z",
  type: "organization",
  visibility: "public",
  tags: ["Innovation", "Research", "Technology", "Design", "Development"],
  logo: "/collaborative-network/network-logo.png",
  coverImage: "/collaborative-network/network-cover.jpg",

  members: [
    {
      id: "member-1",
      name: "Alex Morgan",
      role: "Network Lead",
      avatar: "/collaborative-network/avatars/alex-morgan.jpg",
      department: "Leadership",
      location: "San Francisco, CA",
      skills: ["Strategic Planning", "Team Leadership", "Innovation Management"],
      connections: ["member-2", "member-3", "member-4", "member-5", "member-6"],
      contributionScore: 95,
      joinedAt: "2023-01-15T08:00:00Z",
      status: "active",
      bio: "Innovation strategist with 10+ years of experience leading cross-functional teams.",
      email: "alex.morgan@example.com",
      socialLinks: {
        linkedin: "https://linkedin.com/in/alexmorgan",
        twitter: "https://twitter.com/alexmorgan",
      },
    },
    {
      id: "member-2",
      name: "Jamie Chen",
      role: "Technical Architect",
      avatar: "/collaborative-network/avatars/jamie-chen.jpg",
      department: "Engineering",
      location: "Seattle, WA",
      skills: ["System Architecture", "Cloud Infrastructure", "DevOps"],
      connections: ["member-1", "member-3", "member-7", "member-8"],
      contributionScore: 88,
      joinedAt: "2023-01-20T10:15:00Z",
      status: "active",
      bio: "Technical architect specializing in scalable cloud solutions.",
      email: "jamie.chen@example.com",
      socialLinks: {
        github: "https://github.com/jamiechen",
      },
    },
    {
      id: "member-3",
      name: "Taylor Reed",
      role: "UX Research Lead",
      avatar: "/collaborative-network/avatars/taylor-reed.jpg",
      department: "Design",
      location: "Austin, TX",
      skills: ["User Research", "Usability Testing", "Design Thinking"],
      connections: ["member-1", "member-2", "member-4", "member-9"],
      contributionScore: 82,
      joinedAt: "2023-01-22T09:30:00Z",
      status: "active",
      bio: "Human-centered design advocate focused on creating meaningful user experiences.",
      email: "taylor.reed@example.com",
    },
    {
      id: "member-4",
      name: "Jordan Lee",
      role: "Data Scientist",
      avatar: "/collaborative-network/avatars/jordan-lee.jpg",
      department: "Analytics",
      location: "Boston, MA",
      skills: ["Machine Learning", "Data Visualization", "Statistical Analysis"],
      connections: ["member-1", "member-3", "member-5", "member-10"],
      contributionScore: 79,
      joinedAt: "2023-01-25T14:45:00Z",
      status: "active",
      bio: "Data scientist with expertise in predictive modeling and machine learning algorithms.",
      email: "jordan.lee@example.com",
    },
    {
      id: "member-5",
      name: "Casey Kim",
      role: "Product Manager",
      avatar: "/collaborative-network/avatars/casey-kim.jpg",
      department: "Product",
      location: "Chicago, IL",
      skills: ["Product Strategy", "Roadmapping", "Agile Methodologies"],
      connections: ["member-1", "member-4", "member-6", "member-8"],
      contributionScore: 85,
      joinedAt: "2023-01-18T11:20:00Z",
      status: "active",
      bio: "Product manager passionate about building user-centric solutions.",
      email: "casey.kim@example.com",
    },
    {
      id: "member-6",
      name: "Riley Johnson",
      role: "Marketing Strategist",
      avatar: "/collaborative-network/avatars/riley-johnson.jpg",
      department: "Marketing",
      location: "New York, NY",
      skills: ["Brand Strategy", "Content Marketing", "Growth Hacking"],
      connections: ["member-1", "member-5", "member-9"],
      contributionScore: 76,
      joinedAt: "2023-01-30T08:15:00Z",
      status: "active",
      bio: "Creative marketer with a data-driven approach to brand building.",
      email: "riley.johnson@example.com",
    },
    {
      id: "member-7",
      name: "Morgan Smith",
      role: "Backend Developer",
      avatar: "/collaborative-network/avatars/morgan-smith.jpg",
      department: "Engineering",
      location: "Denver, CO",
      skills: ["API Development", "Database Design", "Microservices"],
      connections: ["member-2", "member-8", "member-10"],
      contributionScore: 81,
      joinedAt: "2023-02-05T09:45:00Z",
      status: "active",
      bio: "Backend developer focused on building scalable and maintainable systems.",
      email: "morgan.smith@example.com",
    },
    {
      id: "member-8",
      name: "Sam Rivera",
      role: "Frontend Developer",
      avatar: "/collaborative-network/avatars/sam-rivera.jpg",
      department: "Engineering",
      location: "Portland, OR",
      skills: ["React", "UI Animation", "Responsive Design"],
      connections: ["member-2", "member-5", "member-7", "member-9"],
      contributionScore: 78,
      joinedAt: "2023-02-10T13:30:00Z",
      status: "active",
      bio: "Frontend developer with a passion for creating beautiful, interactive interfaces.",
      email: "sam.rivera@example.com",
    },
    {
      id: "member-9",
      name: "Quinn Taylor",
      role: "UI Designer",
      avatar: "/collaborative-network/avatars/quinn-taylor.jpg",
      department: "Design",
      location: "Los Angeles, CA",
      skills: ["Visual Design", "Design Systems", "Prototyping"],
      connections: ["member-3", "member-6", "member-8"],
      contributionScore: 80,
      joinedAt: "2023-02-15T10:00:00Z",
      status: "active",
      bio: "UI designer focused on creating cohesive and accessible design systems.",
      email: "quinn.taylor@example.com",
    },
    {
      id: "member-10",
      name: "Avery Williams",
      role: "QA Engineer",
      avatar: "/collaborative-network/avatars/avery-williams.jpg",
      department: "Engineering",
      location: "Atlanta, GA",
      skills: ["Test Automation", "Quality Assurance", "Performance Testing"],
      connections: ["member-4", "member-7"],
      contributionScore: 75,
      joinedAt: "2023-02-20T14:15:00Z",
      status: "active",
      bio: "QA engineer dedicated to ensuring high-quality software delivery.",
      email: "avery.williams@example.com",
    },
  ],

  projects: [
    {
      id: "project-1",
      title: "Next-Gen Analytics Platform",
      description:
        "Building a comprehensive analytics platform with advanced visualization capabilities and machine learning insights.",
      status: "active",
      progress: 65,
      startDate: "2023-02-01T00:00:00Z",
      endDate: "2023-07-30T00:00:00Z",
      members: ["member-1", "member-2", "member-4", "member-7", "member-10"],
      tags: ["Analytics", "Machine Learning", "Data Visualization"],
      milestones: [
        {
          id: "milestone-1-1",
          title: "Requirements Gathering",
          dueDate: "2023-02-15T00:00:00Z",
          completed: true,
        },
        {
          id: "milestone-1-2",
          title: "Architecture Design",
          dueDate: "2023-03-15T00:00:00Z",
          completed: true,
        },
        {
          id: "milestone-1-3",
          title: "MVP Development",
          dueDate: "2023-05-30T00:00:00Z",
          completed: false,
        },
        {
          id: "milestone-1-4",
          title: "Beta Release",
          dueDate: "2023-06-30T00:00:00Z",
          completed: false,
        },
      ],
    },
    {
      id: "project-2",
      title: "User Experience Redesign",
      description:
        "Comprehensive redesign of the user experience for our flagship product, focusing on accessibility and user satisfaction.",
      status: "active",
      progress: 40,
      startDate: "2023-03-01T00:00:00Z",
      endDate: "2023-08-15T00:00:00Z",
      members: ["member-3", "member-5", "member-6", "member-8", "member-9"],
      tags: ["UX Design", "Accessibility", "User Research"],
      milestones: [
        {
          id: "milestone-2-1",
          title: "User Research",
          dueDate: "2023-03-30T00:00:00Z",
          completed: true,
        },
        {
          id: "milestone-2-2",
          title: "Design Concepts",
          dueDate: "2023-04-30T00:00:00Z",
          completed: true,
        },
        {
          id: "milestone-2-3",
          title: "Prototype Development",
          dueDate: "2023-06-15T00:00:00Z",
          completed: false,
        },
        {
          id: "milestone-2-4",
          title: "User Testing",
          dueDate: "2023-07-15T00:00:00Z",
          completed: false,
        },
      ],
    },
    {
      id: "project-3",
      title: "Cloud Infrastructure Migration",
      description:
        "Migrating our core infrastructure to a cloud-native architecture to improve scalability and reliability.",
      status: "planning",
      progress: 15,
      startDate: "2023-04-15T00:00:00Z",
      endDate: "2023-10-30T00:00:00Z",
      members: ["member-1", "member-2", "member-7", "member-10"],
      tags: ["Cloud", "Infrastructure", "DevOps"],
      milestones: [
        {
          id: "milestone-3-1",
          title: "Assessment & Planning",
          dueDate: "2023-05-15T00:00:00Z",
          completed: true,
        },
        {
          id: "milestone-3-2",
          title: "Architecture Design",
          dueDate: "2023-06-30T00:00:00Z",
          completed: false,
        },
        {
          id: "milestone-3-3",
          title: "Pilot Migration",
          dueDate: "2023-08-15T00:00:00Z",
          completed: false,
        },
        {
          id: "milestone-3-4",
          title: "Full Migration",
          dueDate: "2023-10-15T00:00:00Z",
          completed: false,
        },
      ],
    },
  ],

  activities: [
    {
      id: "activity-1",
      type: "milestone",
      timestamp: "2023-04-15T14:30:00Z",
      memberId: "member-1",
      projectId: "project-1",
      content: "Completed the Architecture Design milestone for Next-Gen Analytics Platform",
    },
    {
      id: "activity-2",
      type: "message",
      timestamp: "2023-04-14T10:15:00Z",
      memberId: "member-3",
      projectId: "project-2",
      content: "Shared user research findings with the team",
    },
    {
      id: "activity-3",
      type: "update",
      timestamp: "2023-04-13T16:45:00Z",
      memberId: "member-2",
      projectId: "project-3",
      content: "Updated the migration strategy document",
    },
    {
      id: "activity-4",
      type: "join",
      timestamp: "2023-04-12T09:30:00Z",
      memberId: "member-10",
      projectId: "project-1",
      content: "Joined the Next-Gen Analytics Platform project",
    },
    {
      id: "activity-5",
      type: "contribution",
      timestamp: "2023-04-11T15:20:00Z",
      memberId: "member-8",
      projectId: "project-2",
      content: "Created initial wireframes for the new dashboard",
    },
    {
      id: "activity-6",
      type: "update",
      timestamp: "2023-04-10T11:05:00Z",
      memberId: "member-4",
      projectId: "project-1",
      content: "Refined the machine learning model for predictive analytics",
    },
    {
      id: "activity-7",
      type: "milestone",
      timestamp: "2023-04-09T14:00:00Z",
      memberId: "member-5",
      projectId: "project-2",
      content: "Completed the Design Concepts milestone for User Experience Redesign",
    },
    {
      id: "activity-8",
      type: "message",
      timestamp: "2023-04-08T10:30:00Z",
      memberId: "member-1",
      content: "Scheduled the monthly network sync meeting for next week",
    },
    {
      id: "activity-9",
      type: "update",
      timestamp: "2023-04-07T16:15:00Z",
      memberId: "member-7",
      projectId: "project-3",
      content: "Created the initial infrastructure as code templates",
    },
    {
      id: "activity-10",
      type: "contribution",
      timestamp: "2023-04-06T13:45:00Z",
      memberId: "member-9",
      projectId: "project-2",
      content: "Finalized the color palette for the new design system",
    },
  ],

  stats: {
    totalMembers: 10,
    activeMembers: 10,
    totalProjects: 3,
    activeProjects: 2,
    completedProjects: 0,
    averageConnections: 3.6,
    topContributors: ["member-1", "member-2", "member-3", "member-5"],
    mostActiveProject: "project-1",
    activityTrend: [
      { date: "2023-04-09", count: 12 },
      { date: "2023-04-10", count: 15 },
      { date: "2023-04-11", count: 10 },
      { date: "2023-04-12", count: 18 },
      { date: "2023-04-13", count: 14 },
      { date: "2023-04-14", count: 20 },
      { date: "2023-04-15", count: 16 },
    ],
    collaborationScore: 78,
  },
}

/**
 * Generate network graph data from network detail
 */
export function generateNetworkGraphData(network: NetworkDetail) {
  const nodes = network.members.map((member) => ({
    id: member.id,
    name: member.name,
    val: member.contributionScore || 5,
    color: getDepartmentColor(member.department),
    group: member.department || "Other",
    avatar: member.avatar,
  }))

  const links: { source: string; target: string; value: number }[] = []

  // Create links based on member connections
  network.members.forEach((member) => {
    member.connections.forEach((connectionId) => {
      // Avoid duplicate links (only add if source id < target id)
      if (member.id < connectionId) {
        links.push({
          source: member.id,
          target: connectionId,
          value: 1,
        })
      }
    })
  })

  // Add project-based connections
  network.projects.forEach((project) => {
    const projectMembers = project.members
    for (let i = 0; i < projectMembers.length; i++) {
      for (let j = i + 1; j < projectMembers.length; j++) {
        // Check if this connection already exists
        const existingLink = links.find(
          (link) =>
            (link.source === projectMembers[i] && link.target === projectMembers[j]) ||
            (link.source === projectMembers[j] && link.target === projectMembers[i]),
        )

        if (existingLink) {
          // Strengthen existing connection
          existingLink.value += 0.5
        } else {
          // Create new project-based connection
          links.push({
            source: projectMembers[i],
            target: projectMembers[j],
            value: 0.5,
          })
        }
      }
    }
  })

  return { nodes, links }
}

/**
 * Get color based on department
 */
function getDepartmentColor(department?: string): string {
  switch (department) {
    case "Leadership":
      return "#4f46e5" // Indigo
    case "Engineering":
      return "#0891b2" // Cyan
    case "Design":
      return "#f59e0b" // Amber
    case "Analytics":
      return "#10b981" // Emerald
    case "Product":
      return "#8b5cf6" // Violet
    case "Marketing":
      return "#ef4444" // Red
    default:
      return "#6b7280" // Gray
  }
}
