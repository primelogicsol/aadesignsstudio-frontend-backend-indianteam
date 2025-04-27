"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Filter, ChevronDown, X } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { NetworkMember } from "@/types/collaborative-network"

interface NetworkMembersProps {
  members: NetworkMember[]
  onMemberClick?: (memberId: string) => void
  className?: string
}

export function NetworkMembers({ members, onMemberClick, className = "" }: NetworkMembersProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState<"active" | "inactive" | "pending" | null>(null)
  const [sortBy, setSortBy] = useState<"name" | "role" | "contributionScore">("contributionScore")

  // Extract unique departments
  const departments = Array.from(new Set(members.map((member) => member.department).filter(Boolean))) as string[]

  // Filter members
  const filteredMembers = members.filter((member) => {
    // Search filter
    const matchesSearch =
      searchQuery === "" ||
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase())

    // Department filter
    const matchesDepartment = !departmentFilter || member.department === departmentFilter

    // Status filter
    const matchesStatus = !statusFilter || member.status === statusFilter

    return matchesSearch && matchesDepartment && matchesStatus
  })

  // Sort members
  const sortedMembers = [...filteredMembers].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name)
    } else if (sortBy === "role") {
      return a.role.localeCompare(b.role)
    } else {
      return (b.contributionScore || 0) - (a.contributionScore || 0)
    }
  })

  // Reset filters
  const resetFilters = () => {
    setSearchQuery("")
    setDepartmentFilter(null)
    setStatusFilter(null)
  }

  return (
    <div className={`network-members ${className}`}>
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Network Members</CardTitle>
              <CardDescription>
                {filteredMembers.length} of {members.length} members
              </CardDescription>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Search members..."
                  className="pl-9 w-full sm:w-[200px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Department filter */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-1">
                    <Filter className="h-4 w-4 mr-1" />
                    {departmentFilter || "Department"}
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setDepartmentFilter(null)}>All Departments</DropdownMenuItem>
                  {departments.map((dept) => (
                    <DropdownMenuItem key={dept} onClick={() => setDepartmentFilter(dept)}>
                      {dept}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Sort by */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-1">
                    Sort: {sortBy === "contributionScore" ? "Score" : sortBy}
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setSortBy("name")}>Name</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("role")}>Role</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("contributionScore")}>Contribution Score</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Active filters */}
          {(departmentFilter || statusFilter || searchQuery) && (
            <div className="flex flex-wrap gap-2 mt-3">
              {departmentFilter && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Department: {departmentFilter}
                  <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => setDepartmentFilter(null)} />
                </Badge>
              )}
              {statusFilter && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Status: {statusFilter}
                  <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => setStatusFilter(null)} />
                </Badge>
              )}
              {searchQuery && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  Search: {searchQuery}
                  <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => setSearchQuery("")} />
                </Badge>
              )}
              <Button variant="ghost" size="sm" onClick={resetFilters} className="h-6 text-xs">
                Clear all
              </Button>
            </div>
          )}
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence>
              {sortedMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  onClick={() => onMemberClick && onMemberClick(member.id)}
                  className="cursor-pointer"
                >
                  <MemberCard member={member} />
                </motion.div>
              ))}
            </AnimatePresence>

            {sortedMembers.length === 0 && (
              <div className="col-span-full py-8 text-center text-gray-500">
                No members match your filters. Try adjusting your search criteria.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

interface MemberCardProps {
  member: NetworkMember
}

function MemberCard({ member }: MemberCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-gray-100">
            <Image
              src={member.avatar || `/placeholder.svg?height=48&width=48&query=${encodeURIComponent(member.name)}`}
              alt={member.name}
              fill
              className="object-cover"
            />
            <div
              className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
                member.status === "active"
                  ? "bg-green-500"
                  : member.status === "inactive"
                    ? "bg-gray-400"
                    : "bg-yellow-500"
              }`}
            />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-gray-900 truncate">{member.name}</h3>
            <p className="text-sm text-gray-500 truncate">{member.role}</p>
          </div>

          {member.contributionScore !== undefined && (
            <div className="flex flex-col items-center">
              <div
                className={`text-xs font-medium px-2 py-1 rounded-full ${
                  member.contributionScore >= 80
                    ? "bg-green-100 text-green-800"
                    : member.contributionScore >= 60
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800"
                }`}
              >
                {member.contributionScore}
              </div>
              <span className="text-xs text-gray-500 mt-1">Score</span>
            </div>
          )}
        </div>

        <div className="mt-3">
          {member.department && (
            <Badge variant="outline" className="mr-2 mb-2">
              {member.department}
            </Badge>
          )}
          {member.location && (
            <Badge variant="outline" className="mr-2 mb-2 bg-gray-50">
              {member.location}
            </Badge>
          )}
        </div>

        {member.skills && member.skills.length > 0 && (
          <div className="mt-2">
            <div className="flex flex-wrap gap-1">
              {member.skills.slice(0, 2).map((skill) => (
                <span key={skill} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
                  {skill}
                </span>
              ))}
              {member.skills.length > 2 && (
                <span className="text-xs bg-gray-50 text-gray-600 px-2 py-0.5 rounded">
                  +{member.skills.length - 2}
                </span>
              )}
            </div>
          </div>
        )}

        <div className="mt-3 text-xs text-gray-500">
          {new Date(member.joinedAt).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>
      </div>
    </div>
  )
}
