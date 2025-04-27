"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, CheckCircle, Clock3, PauseCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { NetworkProject, NetworkMember } from "@/types/collaborative-network"

interface NetworkProjectsProps {
  projects: NetworkProject[]
  members: NetworkMember[]
  onProjectClick?: (projectId: string) => void
  className?: string
}

export function NetworkProjects({ projects, members, onProjectClick, className = "" }: NetworkProjectsProps) {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)

  // Filter projects by status
  const filteredProjects = selectedStatus ? projects.filter((project) => project.status === selectedStatus) : projects

  // Get status counts
  const statusCounts = projects.reduce(
    (acc, project) => {
      acc[project.status] = (acc[project.status] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  return (
    <div className={`network-projects ${className}`}>
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Network Projects</CardTitle>
              <CardDescription>
                {filteredProjects.length} of {projects.length} projects
              </CardDescription>
            </div>

            <div className="flex flex-wrap gap-2">
              <StatusFilter
                label="All"
                count={projects.length}
                isActive={selectedStatus === null}
                onClick={() => setSelectedStatus(null)}
              />
              <StatusFilter
                label="Active"
                count={statusCounts.active || 0}
                isActive={selectedStatus === "active"}
                color="green"
                onClick={() => setSelectedStatus("active")}
              />
              <StatusFilter
                label="Planning"
                count={statusCounts.planning || 0}
                isActive={selectedStatus === "planning"}
                color="blue"
                onClick={() => setSelectedStatus("planning")}
              />
              <StatusFilter
                label="Completed"
                count={statusCounts.completed || 0}
                isActive={selectedStatus === "completed"}
                color="purple"
                onClick={() => setSelectedStatus("completed")}
              />
              <StatusFilter
                label="On Hold"
                count={statusCounts["on-hold"] || 0}
                isActive={selectedStatus === "on-hold"}
                color="amber"
                onClick={() => setSelectedStatus("on-hold")}
              />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                onClick={() => onProjectClick && onProjectClick(project.id)}
                className="cursor-pointer"
              >
                <ProjectCard project={project} members={members} />
              </motion.div>
            ))}

            {filteredProjects.length === 0 && (
              <div className="col-span-full py-8 text-center text-gray-500">No projects match the selected filter.</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

interface StatusFilterProps {
  label: string
  count: number
  isActive: boolean
  color?: "blue" | "green" | "purple" | "amber" | "gray"
  onClick: () => void
}

function StatusFilter({ label, count, isActive, color = "gray", onClick }: StatusFilterProps) {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-800 border-blue-200",
    green: "bg-green-100 text-green-800 border-green-200",
    purple: "bg-purple-100 text-purple-800 border-purple-200",
    amber: "bg-amber-100 text-amber-800 border-amber-200",
    gray: "bg-gray-100 text-gray-800 border-gray-200",
  }

  const activeClasses = isActive
    ? `ring-2 ring-offset-1 ${color === "gray" ? "ring-gray-400" : `ring-${color}-400`}`
    : ""

  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-full border text-sm font-medium transition-all ${colorClasses[color]} ${activeClasses}`}
    >
      {label} ({count})
    </button>
  )
}

interface ProjectCardProps {
  project: NetworkProject
  members: NetworkMember[]
}

function ProjectCard({ project, members }: ProjectCardProps) {
  // Find project members
  const projectMembers = members.filter((member) => project.members.includes(member.id))

  // Get status icon and color
  const statusConfig = {
    planning: {
      icon: <Clock3 className="h-5 w-5 text-blue-600" />,
      color: "bg-blue-100 text-blue-800",
    },
    active: {
      icon: <CheckCircle className="h-5 w-5 text-green-600" />,
      color: "bg-green-100 text-green-800",
    },
    completed: {
      icon: <CheckCircle className="h-5 w-5 text-purple-600" />,
      color: "bg-purple-100 text-purple-800",
    },
    "on-hold": {
      icon: <PauseCircle className="h-5 w-5 text-amber-600" />,
      color: "bg-amber-100 text-amber-800",
    },
  }

  const { icon, color } = statusConfig[project.status as keyof typeof statusConfig]

  // Calculate days remaining
  const daysRemaining = project.endDate
    ? Math.ceil((new Date(project.endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : null

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
          <Badge className={color}>
            <div className="flex items-center gap-1">
              {icon}
              <span className="capitalize">{project.status}</span>
            </div>
          </Badge>
        </div>

        <p className="mt-2 text-gray-600 text-sm line-clamp-2">{project.description}</p>

        <div className="mt-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm font-medium text-gray-700">{project.progress}%</span>
          </div>
          <Progress value={project.progress} className="h-2" />
        </div>

        <div className="mt-4 flex flex-wrap gap-4">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-1" />
            <span>
              {new Date(project.startDate).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
              })}
              {project.endDate &&
                ` - ${new Date(project.endDate).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                })}`}
            </span>
          </div>

          {daysRemaining !== null && (
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="h-4 w-4 mr-1" />
              <span>
                {daysRemaining > 0
                  ? `${daysRemaining} days remaining`
                  : daysRemaining === 0
                    ? "Due today"
                    : `${Math.abs(daysRemaining)} days overdue`}
              </span>
            </div>
          )}
        </div>

        <div className="mt-4 flex justify-between items-center">
          <div className="flex -space-x-2">
            {projectMembers.slice(0, 5).map((member) => (
              <div
                key={member.id}
                className="h-8 w-8 rounded-full border-2 border-white overflow-hidden relative"
                title={member.name}
              >
                <img
                  src={member.avatar || `/placeholder.svg?height=32&width=32&query=${encodeURIComponent(member.name)}`}
                  alt={member.name}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
            {project.members.length > 5 && (
              <div className="h-8 w-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600">
                +{project.members.length - 5}
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-1">
            {project.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {project.tags.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{project.tags.length - 2}
              </Badge>
            )}
          </div>
        </div>

        {project.milestones && project.milestones.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Upcoming Milestones</h4>
            <div className="space-y-2">
              {project.milestones
                .filter((m) => !m.completed)
                .slice(0, 2)
                .map((milestone) => (
                  <div key={milestone.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
                      <span className="text-sm">{milestone.title}</span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {new Date(milestone.dueDate).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}
