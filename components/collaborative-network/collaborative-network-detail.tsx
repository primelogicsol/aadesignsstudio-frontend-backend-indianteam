"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { NetworkVisualization } from "./network-visualization"
import { NetworkStats } from "./network-stats"
import { NetworkMembers } from "./network-members"
import { NetworkProjects } from "./network-projects"
import {
  AlertCircle,
  RefreshCw,
  Share2,
  Download,
  Filter,
  Search,
  Users,
  Network,
  BarChart2,
  Briefcase,
  Activity,
} from "lucide-react"
import type { NetworkDetail, NetworkGraphData } from "@/types/collaborative-network"
import { generateNetworkGraphData } from "@/lib/collaborative-network/fallback-data"
import { networkFallbackData } from "@/lib/collaborative-network/fallback-data"

interface CollaborativeNetworkDetailProps {
  networkId?: string
  networkData?: NetworkDetail
  isLoading?: boolean
  error?: string | null
  onRefresh?: () => void
  className?: string
}

export function CollaborativeNetworkDetail({
  networkId,
  networkData,
  isLoading = false,
  error = null,
  onRefresh,
  className = "",
}: CollaborativeNetworkDetailProps) {
  // Use provided network data or fallback data
  const [network, setNetwork] = useState<NetworkDetail | null>(null)
  const [activeTab, setActiveTab] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")
  const [showSearch, setShowSearch] = useState(false)
  const [filterOpen, setFilterOpen] = useState(false)
  const [selectedMember, setSelectedMember] = useState<string | null>(null)
  const [graphData, setGraphData] = useState<NetworkGraphData>({ nodes: [], links: [] })

  // Initialize network data
  useEffect(() => {
    // Use provided data or fallback
    const data = networkData || networkFallbackData
    setNetwork(data)

    // Generate graph data
    try {
      const generatedGraphData = generateNetworkGraphData(data)
      setGraphData(generatedGraphData)
    } catch (err) {
      console.error("Error generating graph data:", err)
      // Set empty graph data as fallback
      setGraphData({ nodes: [], links: [] })
    }
  }, [networkData])

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  // Handle member click
  const handleMemberClick = (memberId: string) => {
    setSelectedMember(memberId === selectedMember ? null : memberId)
  }

  // Handle node click in visualization
  const handleNodeClick = (nodeId: string) => {
    setSelectedMember(nodeId === selectedMember ? null : nodeId)
    setActiveTab("members")
  }

  // If loading, show skeleton UI
  if (isLoading) {
    return (
      <div className={`w-full max-w-7xl mx-auto p-6 ${className}`}>
        <div className="animate-pulse space-y-6">
          <div className="h-10 bg-gray-200 rounded w-3/4"></div>
          <div className="h-6 bg-gray-200 rounded w-full"></div>
          <div className="h-64 bg-gray-200 rounded w-full"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-40 bg-gray-200 rounded"></div>
            <div className="h-40 bg-gray-200 rounded"></div>
            <div className="h-40 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  // If error, show error message
  if (error) {
    return (
      <div className={`w-full max-w-7xl mx-auto p-6 ${className}`}>
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription className="flex flex-col sm:flex-row sm:items-center gap-4">
            <span>{error}</span>
            {onRefresh && (
              <Button variant="outline" size="sm" onClick={onRefresh} className="whitespace-nowrap">
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
            )}
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  // If no network data, show empty state
  if (!network) {
    return (
      <div className={`w-full max-w-7xl mx-auto p-6 text-center ${className}`}>
        <div className="py-12">
          <h2 className="text-2xl font-bold mb-4">Network Not Found</h2>
          <p className="text-gray-600 mb-8">
            The collaborative network you're looking for doesn't exist or has been removed.
          </p>
          <Button>View All Networks</Button>
        </div>
      </div>
    )
  }

  // Animation variants for page elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  }

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  }

  return (
    <motion.div
      className={`w-full max-w-7xl mx-auto p-4 md:p-6 ${className}`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header Section */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{network.name}</h1>
            <p className="text-gray-600 mt-2">{network.description}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              <span className="hidden sm:inline">Share</span>
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>
            {onRefresh && (
              <Button variant="outline" size="sm" onClick={onRefresh} className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4" />
                <span className="hidden sm:inline">Refresh</span>
              </Button>
            )}
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 bg-gray-50 p-4 rounded-lg">
          <div className="text-sm text-gray-500">
            <span className="font-medium">{network.stats.totalMembers}</span> members ·{" "}
            <span className="font-medium">{network.stats.totalProjects}</span> projects · Last updated{" "}
            <span className="font-medium">{new Date(network.updatedAt).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {showSearch ? (
              <div className="relative w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Search network..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <button
                  onClick={() => {
                    setShowSearch(false)
                    setSearchQuery("")
                  }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ) : (
              <Button variant="outline" size="sm" onClick={() => setShowSearch(true)}>
                <Search className="h-4 w-4 mr-2" /> Search
              </Button>
            )}
            <Button variant={filterOpen ? "default" : "outline"} size="sm" onClick={() => setFilterOpen(!filterOpen)}>
              <Filter className="h-4 w-4 mr-2" /> Filter
            </Button>
          </div>
        </div>

        {/* Filter Panel (conditionally rendered) */}
        <AnimatePresence>
          {filterOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mb-6"
            >
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Member Status</h3>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded text-blue-600 mr-2" defaultChecked />
                        <span>Active</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded text-blue-600 mr-2" />
                        <span>Inactive</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded text-blue-600 mr-2" />
                        <span>Pending</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">Project Status</h3>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded text-blue-600 mr-2" defaultChecked />
                        <span>Active</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded text-blue-600 mr-2" defaultChecked />
                        <span>Planning</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded text-blue-600 mr-2" />
                        <span>Completed</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded text-blue-600 mr-2" />
                        <span>On Hold</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">Department</h3>
                    <div className="space-y-2">
                      {Array.from(new Set(network.members.map((m) => m.department).filter(Boolean))).map(
                        (department) => (
                          <label key={department} className="flex items-center">
                            <input type="checkbox" className="rounded text-blue-600 mr-2" defaultChecked />
                            <span>{department}</span>
                          </label>
                        ),
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <Button variant="outline" size="sm" className="mr-2">
                    Reset
                  </Button>
                  <Button size="sm" onClick={() => setFilterOpen(false)}>
                    Apply Filters
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Tabs Navigation */}
      <motion.div variants={itemVariants}>
        <Tabs defaultValue="overview" value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Network className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="members" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Members</span>
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              <span>Projects</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart2 className="h-4 w-4" />
              <span>Analytics</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-8">
            <motion.div variants={fadeInVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle>Network Visualization</CardTitle>
                  <CardDescription>Interactive visualization of network connections and relationships</CardDescription>
                </CardHeader>
                <CardContent className="h-[400px]">
                  <NetworkVisualization
                    graphData={graphData}
                    onNodeClick={handleNodeClick}
                    height={400}
                    className="w-full h-full"
                  />
                </CardContent>
              </Card>
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Network Statistics</CardTitle>
                  <CardDescription>Key metrics and performance indicators</CardDescription>
                </CardHeader>
                <CardContent>
                  <NetworkStats stats={network.stats} />
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Contributors</CardTitle>
                  <CardDescription>Members with highest contribution scores</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {network.members
                      .sort((a, b) => (b.contributionScore || 0) - (a.contributionScore || 0))
                      .slice(0, 5)
                      .map((member, index) => (
                        <div
                          key={member.id}
                          className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                          onClick={() => handleMemberClick(member.id)}
                        >
                          <div className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden bg-gray-100">
                            <img
                              src={
                                member.avatar ||
                                `/placeholder.svg?height=40&width=40&query=${encodeURIComponent(member.name) || "/placeholder.svg"}`
                              }
                              alt={member.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-grow">
                            <div className="flex justify-between items-center">
                              <h4 className="font-medium">{member.name}</h4>
                              <span className="text-sm font-semibold">{member.contributionScore}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${member.contributionScore}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Active Projects</CardTitle>
                  <CardDescription>Currently active projects in the network</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {network.projects
                      .filter((project) => project.status === "active")
                      .map((project) => (
                        <div key={project.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium">{project.title}</h4>
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                              {project.progress}% Complete
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                          <div className="flex items-center mt-2 text-xs text-gray-500">
                            <span>{project.members.length} members</span>
                            <span className="mx-2">•</span>
                            <span>
                              Due {project.endDate ? new Date(project.endDate).toLocaleDateString() : "Not specified"}
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInVariants}>
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                  <CardDescription>Latest updates and activities in the network</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {network.activities.slice(0, 5).map((activity) => {
                      const member = network.members.find((m) => m.id === activity.memberId)
                      return (
                        <div key={activity.id} className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden bg-gray-100">
                            <img
                              src={
                                member?.avatar ||
                                `/placeholder.svg?height=40&width=40&query=${encodeURIComponent(
                                  member?.name || "User",
                                )}`
                              }
                              alt={member?.name || "User"}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-sm">
                              <span className="font-medium">{member?.name || "Unknown User"}</span>{" "}
                              <span className="text-gray-600">{activity.content}</span>
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(activity.timestamp).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Members Tab */}
          <TabsContent value="members">
            <motion.div variants={fadeInVariants}>
              <NetworkMembers
                members={network.members.filter(
                  (member) =>
                    !searchQuery ||
                    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    member.department?.toLowerCase().includes(searchQuery.toLowerCase()),
                )}
                onMemberClick={handleMemberClick}
              />
            </motion.div>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects">
            <motion.div variants={fadeInVariants}>
              <NetworkProjects
                projects={network.projects.filter(
                  (project) =>
                    !searchQuery ||
                    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
                )}
                members={network.members}
                onProjectClick={(projectId) => console.log("Project clicked:", projectId)}
              />
            </motion.div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <motion.div variants={fadeInVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Activity Trend</CardTitle>
                  <CardDescription>Network activity over the past week</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <div className="w-full h-full flex items-end justify-between px-2">
                    {network.stats.activityTrend.map((item, index) => {
                      const maxValue = Math.max(...network.stats.activityTrend.map((d) => d.count))
                      const height = (item.count / maxValue) * 100

                      return (
                        <div key={index} className="relative flex flex-col items-center w-1/8">
                          <motion.div
                            className="w-full max-w-[40px] bg-blue-500 rounded-t-md"
                            initial={{ height: 0 }}
                            animate={{ height: `${height}%` }}
                            transition={{ duration: 0.8, delay: 0.1 * index, ease: "easeOut" }}
                          />
                          <div className="mt-2 text-xs text-gray-500">
                            {new Date(item.date).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Collaboration Score</CardTitle>
                  <CardDescription>Overall network collaboration metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center h-[300px]">
                    <div className="relative w-48 h-48">
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        {/* Background circle */}
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="#e5e7eb"
                          strokeWidth="10"
                          strokeLinecap="round"
                        />
                        {/* Progress circle */}
                        <motion.circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="#3b82f6"
                          strokeWidth="10"
                          strokeLinecap="round"
                          strokeDasharray="282.7"
                          strokeDashoffset="282.7"
                          initial={{ strokeDashoffset: 282.7 }}
                          animate={{
                            strokeDashoffset: 282.7 - (network.stats.collaborationScore / 100) * 282.7,
                          }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          transform="rotate(-90 50 50)"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <motion.div
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5, duration: 0.5 }}
                        >
                          <div className="text-4xl font-bold text-gray-900">{network.stats.collaborationScore}</div>
                          <div className="text-sm text-gray-500 text-center">Collaboration Score</div>
                        </motion.div>
                      </div>
                    </div>
                    <div className="mt-6 text-center">
                      <p className="text-sm text-gray-600">
                        {network.stats.collaborationScore >= 80
                          ? "Excellent collaboration across the network"
                          : network.stats.collaborationScore >= 60
                            ? "Good collaboration with room for improvement"
                            : "Needs improvement in collaboration"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Network Health</CardTitle>
                  <CardDescription>Key performance indicators for network health</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium text-gray-500">Member Engagement</h3>
                        <Activity className="h-5 w-5 text-blue-500" />
                      </div>
                      <div className="text-2xl font-bold">
                        {Math.round((network.stats.activeMembers / network.stats.totalMembers) * 100)}%
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {network.stats.activeMembers} of {network.stats.totalMembers} members active
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium text-gray-500">Project Completion</h3>
                        <Briefcase className="h-5 w-5 text-green-500" />
                      </div>
                      <div className="text-2xl font-bold">
                        {Math.round((network.stats.completedProjects / network.stats.totalProjects) * 100)}%
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {network.stats.completedProjects} of {network.stats.totalProjects} projects completed
                      </p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium text-gray-500">Avg. Connections</h3>
                        <Network className="h-5 w-5 text-purple-500" />
                      </div>
                      <div className="text-2xl font-bold">{network.stats.averageConnections.toFixed(1)}</div>
                      <p className="text-xs text-gray-500 mt-1">Connections per member</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium text-gray-500">Active Projects</h3>
                        <Activity className="h-5 w-5 text-amber-500" />
                      </div>
                      <div className="text-2xl font-bold">{network.stats.activeProjects}</div>
                      <p className="text-xs text-gray-500 mt-1">Currently in progress</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  )
}
